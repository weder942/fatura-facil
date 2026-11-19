from rest_framework import status
from rest_framework.exceptions import APIException

__all__ = ["RegraDeNegocioError"]


class RegraDeNegocioError(APIException):
    """Erro de validação geral, respondido como {"detail": "..."} com status 400.

    Use para regras que não pertencem a um campo específico (credenciais
    inválidas, mês consolidado, estorno em competência fechada...).
    """

    status_code = status.HTTP_400_BAD_REQUEST
    default_detail = "Requisição inválida."
    default_code = "regra_de_negocio"
