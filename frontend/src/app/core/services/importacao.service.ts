import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { Decisao, PreviaDaImportacao, ResultadoDaImportacao } from '../models/importacao.model';

const API = '/api/importacoes';

@Injectable({ providedIn: 'root' })
export class ImportacaoService {
  private readonly http = inject(HttpClient);

  /** Lê e classifica a fatura sem gravar nada. */
  previa(fonte: number, arquivo: File, competencia?: string): Observable<PreviaDaImportacao> {
    const envio = this.envio(fonte, arquivo);
    if (competencia) {
      envio.append('competencia', competencia);
    }
    return this.http.post<PreviaDaImportacao>(`${API}/previa/`, envio);
  }

  /** Importa de fato; as linhas fora de `decisoes` seguem a decisão padrão. */
  importar(
    fonte: number,
    arquivo: File,
    competencia: string,
    decisoes: Record<number, Decisao>,
  ): Observable<ResultadoDaImportacao> {
    const envio = this.envio(fonte, arquivo);
    envio.append('competencia', competencia);
    envio.append('decisoes', JSON.stringify(decisoes));
    return this.http.post<ResultadoDaImportacao>(`${API}/`, envio);
  }

  private envio(fonte: number, arquivo: File): FormData {
    const envio = new FormData();
    envio.append('fonte', String(fonte));
    envio.append('arquivo', arquivo, arquivo.name);
    return envio;
  }
}
