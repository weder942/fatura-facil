from pathlib import Path

from django.core.management.base import BaseCommand, CommandError
from django.db import transaction

from fatura_facil.exceptions import RegraDeNegocioError
from fatura_facil.services.planilha.importador import ImportadorDePlanilha, ResultadoDaImportacao
from fatura_facil.services.planilha.leitura import ler_planilha


class _Simulacao(Exception):
    """Desfaz a transação no fim de uma simulação."""


class Command(BaseCommand):
    help = (
        "Importa o histórico das planilhas 'Contas AAAA.xlsx' (uma aba por mês): recorrentes, avulsos, "
        "compras com parcelas e créditos. Confere os totais de cada coluna com a planilha."
    )

    def add_arguments(self, parser):
        parser.add_argument("arquivos", nargs="+", type=Path, help="Uma ou mais planilhas, ex.: 'Contas 2025.xlsx'.")
        parser.add_argument(
            "--fonte",
            action="append",
            default=[],
            metavar="COLUNA=FONTE",
            help='Liga um cabeçalho da planilha a uma fonte cadastrada, ex.: --fonte "Em dinheiro=Dinheiro".',
        )
        parser.add_argument("--substituir", action="store_true", help="Apaga o que veio da planilha antes.")
        parser.add_argument("--simular", action="store_true", help="Mostra o relatório sem gravar nada.")

    def handle(self, *args, arquivos, fonte, substituir, simular, **options):
        apelidos = {}
        for par in fonte:
            coluna, separador, nome = par.partition("=")
            if not separador or not coluna.strip() or not nome.strip():
                raise CommandError(f"Use --fonte COLUNA=FONTE (recebido: {par!r}).")
            apelidos[coluna.strip()] = nome.strip()

        for arquivo in arquivos:
            if not arquivo.is_file():
                raise CommandError(f"Arquivo não encontrado: {arquivo}")

        try:
            leituras = [ler_planilha(arquivo) for arquivo in arquivos]
            with transaction.atomic():
                resultado = ImportadorDePlanilha(apelidos).importar(leituras, substituir=substituir)
                self._relatar(resultado, simular)
                if simular:
                    raise _Simulacao
        except _Simulacao:
            self.stdout.write(self.style.WARNING("Simulação: nada foi gravado."))
        except (RegraDeNegocioError, ValueError) as erro:
            raise CommandError(str(getattr(erro, "detail", erro))) from erro

    def _relatar(self, resultado: ResultadoDaImportacao, simular: bool) -> None:
        escrever = self.stdout.write
        escrever(f"Meses lidos: {resultado.meses}")
        escrever(
            f"Recorrentes: {resultado.recorrentes} ({resultado.vigencias} vigências, "
            f"{resultado.valores_do_mes} valores de mês)"
        )
        escrever(f"Avulsos: {resultado.avulsos}")
        escrever(
            f"Compras: {resultado.compras} ({resultado.parcelas} parcelas, "
            f"{resultado.parcelas_projetadas} projetadas depois da planilha)"
        )
        escrever(f"Créditos (estornos, descontos, ajustes): {resultado.creditos}")

        divergencias = resultado.divergencias
        if divergencias:
            escrever(self.style.ERROR(f"\nTotais que não batem ({len(divergencias)}):"))
            for conferencia in divergencias:
                escrever(
                    f"  {conferencia.competencia:%Y-%m} {conferencia.coluna}: planilha {conferencia.na_planilha}, "
                    f"sistema {conferencia.no_sistema}"
                )
        else:
            escrever(self.style.SUCCESS(f"\nTodos os {len(resultado.conferencias)} totais batem com a planilha."))

        if resultado.problemas:
            escrever(f"\nPontos de atenção ({len(resultado.problemas)}):")
            for problema in resultado.problemas:
                escrever(f"  {problema}")
        if not simular:
            escrever(self.style.SUCCESS("\nImportação gravada."))
