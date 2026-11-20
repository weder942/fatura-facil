from django.contrib import admin

from fatura_facil.models import Compra, Fonte, Lancamento


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
