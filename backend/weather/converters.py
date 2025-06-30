class BoolConverter:
    """
    Este conversor customizado lida com valores booleanos em URLs do Django.
    Ele permite que a URL aceite algumas variações de true, false, 0 e 1,
    e os converte para um valor booleano Python (True/False) antes de
    passá-los para a view.
    """

    regex = 'true|True|TRUE|false|False|FALSE|1|0'

    def to_python(self, value):
        """
        Este método converte a string capturada da URL em um valor Bool.
        """
        value = value.lower()
        if value in ['true', '1']:
            return True
        elif value in ['false', '0']:
            return False

        return None

    def to_url(self, value):
        """
        Este método faz o inverso: converte um valor Python para sua
        representação em string na URL.
        """
        if value:
            return 'true'
        else:
            return 'false'