from fatura_facil.models import Familia, MembroDaFamilia


def test_str():
    familia = Familia(nome="Apple icloud")

    assert str(familia) == "Apple icloud"
    assert str(MembroDaFamilia(familia=familia, nome="Gustavo", ordem=1)) == "Gustavo"
