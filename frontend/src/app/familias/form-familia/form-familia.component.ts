import { Component, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  AbstractControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Observable, filter, switchMap } from 'rxjs';

import { Familia } from '../../core/models/familia.model';
import { Fonte } from '../../core/models/fonte.model';
import { FamiliaService } from '../../core/services/familia.service';
import { FonteService } from '../../core/services/fonte.service';
import { ConfirmacaoDialogComponent } from '../../shared/confirmacao-dialog/confirmacao-dialog.component';
import { CompetenciaPipe } from '../../shared/pipes/competencia.pipe';
import { nomeDaCompetencia } from '../../shared/utils/competencia';
import { emCentavos, paraCampo, paraValorDaApi } from '../../shared/utils/dinheiro';
import { mensagemDeErro } from '../../shared/utils/erro-da-api';
import { competenciaValida } from '../../shared/utils/validadores';
import { MembrosDaFamiliaComponent } from '../membros-da-familia/membros-da-familia.component';
import {
  FormDeMembros,
  campoDeMembro,
  criarFormDeMembros,
  membrosAPartirDe,
  membrosDoForm,
} from '../membros-da-familia/membros-da-familia';

export interface DadosDoFormFamilia {
  familiaId: number;
}

function valorEmReais(controle: AbstractControl<string>): ValidationErrors | null {
  const valor = paraValorDaApi(controle.value ?? '');
  return valor === null || emCentavos(valor) === 0 ? { valor: true } : null;
}

/**
 * Muda ou encerra uma família a partir de um mês. Os meses antes dele (e os
 * já fechados) ficam como estão. Fecha com `true` se algo mudou.
 */
@Component({
  selector: 'app-form-familia',
  imports: [
    CompetenciaPipe,
    MembrosDaFamiliaComponent,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './form-familia.component.html',
  styleUrl: './form-familia.component.scss',
})
export class FormFamiliaComponent {
  private readonly familias = inject(FamiliaService);
  private readonly dialog = inject(MatDialog);
  private readonly dialogRef = inject<MatDialogRef<FormFamiliaComponent, boolean>>(MatDialogRef);
  private readonly familiaId = inject<DadosDoFormFamilia>(MAT_DIALOG_DATA).familiaId;

  protected readonly familia = signal<Familia | null>(null);
  protected readonly fontes = signal<Fonte[]>([]);
  protected readonly salvando = signal(false);
  protected readonly erro = signal<string | null>(null);

  protected readonly fontesDisponiveis = computed(() =>
    this.fontes().filter((fonte) => fonte.ativa || fonte.id === this.familia()?.fonte),
  );

  protected readonly form = inject(NonNullableFormBuilder).group({
    a_partir_de: ['', [Validators.required, competenciaValida]],
    fonte: [null as number | null, Validators.required],
    nome: ['', [Validators.required, Validators.maxLength(80)]],
    valor: ['', [Validators.required, valorEmReais]],
  });
  protected readonly membros: FormDeMembros = criarFormDeMembros([]);

  constructor() {
    inject(FonteService)
      .listar()
      .subscribe((fontes) => this.fontes.set(fontes));
    this.familias.obter(this.familiaId).subscribe({
      next: (familia) => this.carregar(familia),
      error: (erro) => this.erro.set(mensagemDeErro(erro)),
    });

    // Enquanto os membros não forem mexidos, a lista começa por quem paga no mês escolhido.
    this.form.controls.a_partir_de.valueChanges.pipe(takeUntilDestroyed()).subscribe(() => {
      if (!this.membros.nomes.dirty && this.familia()) {
        this.preencherMembros(this.familia()!);
      }
    });
  }

  /** Antes do primeiro mês editável, a mudança alcançaria meses fechados. */
  protected antesDoPermitido(): boolean {
    const familia = this.familia();
    const mes = this.form.controls.a_partir_de.value;
    return !!familia && competenciaValida(this.form.controls.a_partir_de) === null
      ? mes < familia.primeira_editavel
      : false;
  }

  protected salvar(): void {
    const familia = this.familia();
    if (!familia || familia.ate || this.salvando()) {
      return; // encerrada: o form fica desabilitado, e desabilitado não é inválido
    }
    if (this.form.invalid || this.membros.nomes.invalid || this.antesDoPermitido()) {
      this.form.markAllAsTouched();
      this.membros.nomes.markAllAsTouched();
      return;
    }
    const valores = this.form.getRawValue();
    this.executar(
      this.familias.alterar(familia.id, {
        a_partir_de: valores.a_partir_de,
        fonte: valores.fonte!,
        nome: valores.nome.trim(),
        valor: paraValorDaApi(valores.valor)!,
        membros: membrosDoForm(this.membros),
      }),
    );
  }

  protected encerrar(): void {
    const familia = this.familia();
    const mes = this.form.controls.a_partir_de;
    if (!familia || mes.invalid || this.antesDoPermitido()) {
      mes.markAsTouched();
      return;
    }
    this.dialog
      .open(ConfirmacaoDialogComponent, {
        data: {
          titulo: `Encerrar "${familia.nome}"?`,
          mensagem:
            `Sem mensalidade nem rendimento a partir de ${nomeDaCompetencia(mes.value)}.` +
            ' Os meses anteriores continuam como estão.',
          confirmar: 'Encerrar',
        },
      })
      .afterClosed()
      .pipe(filter(Boolean))
      .subscribe(() => this.executar(this.familias.encerrar(familia.id, mes.value)));
  }

  private executar(requisicao: Observable<unknown>): void {
    this.salvando.set(true);
    this.erro.set(null);
    requisicao.subscribe({
      next: () => this.dialogRef.close(true),
      error: (erro) => {
        this.salvando.set(false);
        this.erro.set(mensagemDeErro(erro));
      },
    });
  }

  private carregar(familia: Familia): void {
    this.familia.set(familia);
    this.form.setValue(
      {
        a_partir_de: familia.primeira_editavel,
        fonte: familia.fonte,
        nome: familia.nome,
        valor: paraCampo(familia.valor),
      },
      { emitEvent: false },
    );
    this.preencherMembros(familia);
    if (familia.ate) {
      this.form.disable();
      this.membros.nomes.disable();
      this.membros.administrador.disable();
    }
  }

  private preencherMembros(familia: Familia): void {
    const mes = this.form.controls.a_partir_de.value;
    const membros =
      competenciaValida(this.form.controls.a_partir_de) === null
        ? membrosAPartirDe(familia.membros, familia.inicio, mes)
        : familia.membros;
    this.membros.nomes.clear({ emitEvent: false });
    membros.forEach((membro) => this.membros.nomes.push(campoDeMembro(membro.nome)));
    const administrador = membros.findIndex((membro) => membro.administrador);
    this.membros.administrador.setValue(administrador === -1 ? null : administrador);
    this.membros.nomes.markAsPristine();
  }
}
