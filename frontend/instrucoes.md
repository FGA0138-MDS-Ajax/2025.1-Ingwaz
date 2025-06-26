## Instalar as bibliotecas necessárias(BACK)

    pip install -r requirements.txt

## Criar coisas no banco de dados (tipo depois de criar um models):(BACK)

    python manage.py makemigrations
    
## Sincronizar banco de dados(BACK)

    python manage.py migrate

## Iniciar server (BACK)

    python manage.py runserver 0.0.0.0:8000

## Altere o arquivo .env (FRONT)

    API_URL=http://IP_LOCAL:8000

## Para ver o IP local no LINUX (TERMINAL)

   ifconfig

-  Procure a interface que está conectada (por exemplo, wlp1s0, wlan0, eth0, enp3s0, etc.) 
- Veja o campo inet que indica o IP 

- inet 192.XXX.X.4 
- O IP é 192.XXX.X.4
    
## Instalar dependências (FRONT)

    npm install 

## Iniciar server EXPO (FRONT)

    npx expo start 

