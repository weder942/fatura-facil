from decimal import Decimal

import pytest

from fatura_facil.services.tributacao_service import aliquota_iof, aliquota_ir, taxa_diaria


@pytest.mark.parametrize(
    ("dias", "aliquota"),
    [(0, "0.96"), (1, "0.96"), (2, "0.93"), (4, "0.86"), (15, "0.50"), (29, "0.03"), (30, "0"), (400, "0")],
)
def test_iof_regressivo(dias, aliquota):
    assert aliquota_iof(dias) == Decimal(aliquota)


@pytest.mark.parametrize(
    ("dias", "aliquota"),
    [(0, "0.225"), (180, "0.225"), (181, "0.20"), (360, "0.20"), (361, "0.175"), (720, "0.175"), (721, "0.15")],
)
def test_ir_regressivo(dias, aliquota):
    assert aliquota_ir(dias) == Decimal(aliquota)


def test_taxa_diaria_aplica_o_percentual_sobre_a_taxa_de_um_dia():
    # (1,1365)^(1/252) − 1 = 0,00050788 (8 casas, como a B3)
    assert taxa_diaria(Decimal("13.65"), Decimal(100)) == Decimal("0.00050788")
    assert taxa_diaria(Decimal("13.65"), Decimal(102)) == Decimal("0.0005180376")
    # e não sobre a anual: 13,65% × 102% = 13,923% a.a. daria outra taxa
    assert taxa_diaria(Decimal("13.923"), Decimal(100)) != taxa_diaria(Decimal("13.65"), Decimal(102))
