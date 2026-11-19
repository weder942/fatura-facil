import factory
from django.contrib.auth import get_user_model
from factory.django import DjangoModelFactory

__all__ = ["SENHA_PADRAO", "UsuarioFactory"]

SENHA_PADRAO = "senha-de-teste-123"


class UsuarioFactory(DjangoModelFactory):
    class Meta:
        model = get_user_model()
        skip_postgeneration_save = True

    username = factory.Sequence(lambda n: f"usuario{n}")
    password = factory.PostGenerationMethodCall("set_password", SENHA_PADRAO)

    @factory.post_generation
    def salvar(obj, create, extracted, **kwargs):
        if create:
            obj.save()
