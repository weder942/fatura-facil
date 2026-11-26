from django.contrib import admin

from fatura_facil.models import (
    Avulso,
    Compra,
    Familia,
    Fonte,
    Lancamento,
    MembroDaFamilia,
    Recorrente,
    ValorDoMes,
    ValorRecorrente,
)


@admin.register(Fonte)
class FonteAdmin(admin.ModelAdmin):
    list_display = ["nome", "tipo", "dia_fechamento", "dia_vencimento", "ativa", "ordem"]
    list_filter = ["tipo", "ativa"]


class LancamentoInline(admin.TabularInline):
    model = Lancamento
    extra = 0
    fields = ["parcela", "competencia", "valor", "tipo", "status", "origem"]


@admin.register(Compra)
class CompraAdmin(admin.ModelAdmin):
    list_display = ["descricao", "fonte", "data", "valor_total", "n_parcelas", "competencia_inicial", "origem"]
    list_filter = ["fonte", "origem"]
    search_fields = ["descricao", "descricao_original"]
    inlines = [LancamentoInline]


@admin.register(Lancamento)
class LancamentoAdmin(admin.ModelAdmin):
    list_display = ["__str__", "fonte", "competencia", "tipo", "status", "origem"]
    list_filter = ["fonte", "tipo", "status", "origem", "competencia"]


class ValorRecorrenteInline(admin.TabularInline):
    model = ValorRecorrente
    extra = 0


class ValorDoMesInline(admin.TabularInline):
    model = ValorDoMes
    extra = 0


@admin.register(Recorrente)
class RecorrenteAdmin(admin.ModelAdmin):
    list_display = ["nome", "grupo", "variavel", "ordem", "origem"]
    list_filter = ["grupo", "variavel", "origem"]
    inlines = [ValorRecorrenteInline, ValorDoMesInline]


@admin.register(Avulso)
class AvulsoAdmin(admin.ModelAdmin):
    list_display = ["descricao", "grupo", "competencia", "valor", "origem"]
    list_filter = ["grupo", "origem", "competencia"]
    search_fields = ["descricao"]


class MembroDaFamiliaInline(admin.TabularInline):
    model = MembroDaFamilia
    extra = 0


@admin.register(Familia)
class FamiliaAdmin(admin.ModelAdmin):
    list_display = ["nome", "fonte", "valor", "inicio", "ate", "gerado_ate"]
    inlines = [MembroDaFamiliaInline]
