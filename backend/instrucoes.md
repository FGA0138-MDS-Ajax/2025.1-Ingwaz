## Caso você queira crie um ambiente virtual

    python -m venv venv
    
## Ativar ambiente virtual (linux)

    source venv/bin/activate

## Ativar ambiente virtual (windows, no terminal cmd)

    venv/Scripts/activate.bat

## Instalar as bibliotecas necessárias

    pip install -r requirements.txt
    
## Criar coisas no banco de dados (tipo depois de criar um models):

    python manage.py makemigrations
    
## Sincronizar banco de dados

    python manage.py migrate
    
## Iniciar servidor

    python manage.py runserver
