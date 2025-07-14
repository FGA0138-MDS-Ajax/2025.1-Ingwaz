# Instruções Gerais para Rodar o Projeto

> Compatível com Linux. No Windows, os comandos de ambiente virtual podem mudar.

---

## 🚀 Iniciar Backend

```bash
python -m venv venv
source venv/bin/activate
cd backend
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

---

## 🔄 Atualizar Dados do Banco (Opcional)

Caso as páginas de **Cotações** e **Calendário** estejam vazias:

1. Crie uma conta de administrador via:

   * Interface do Django,
   * Insomnia ou cURL.

2. Com o token de autenticação, faça um `POST` para os seguintes endpoints:

```http
/api/quotes/update/
/api/calendario/update/
```

(Somente uma vez)

---

## 🎨 Iniciar Frontend

```bash
cd frontend
npm install
```

Abra o arquivo `.env` e ajuste a URL base para o backend (web ou emulador).

---

## 📱 Iniciar Aplicativo

```bash
npx expo run:android
```

**Ou:**

```bash
npx expo start --clear
```

* Se estiver usando emulador com `run:android`, ele abrirá automaticamente.
* Com `expo start`, pressione:

  * `a` para abrir no Android,
  * `w` para abrir no navegador (web).

---

Tudo pronto! ✅
