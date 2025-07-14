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

# Screenshots

<img width="526" height="1076" alt="Captura de tela de 2025-07-14 11-34-14" src="https://github.com/user-attachments/assets/a13f61fa-d38b-442b-935f-f4848a2f94fd" />
<img width="526" height="1076" alt="Captura de tela de 2025-07-14 11-34-17" src="https://github.com/user-attachments/assets/1e4ad749-1044-4069-a611-a126113cc11e" />
<img width="526" height="1076" alt="Captura de tela de 2025-07-14 11-34-20" src="https://github.com/user-attachments/assets/67296c80-82af-43c0-b887-2fad8fe5f2b8" />
<img width="526" height="1076" alt="Captura de tela de 2025-07-14 11-34-25" src="https://github.com/user-attachments/assets/24b9630d-ad6b-4d0a-a681-f00d1e70378a" />
<img width="526" height="1076" alt="Captura de tela de 2025-07-14 11-34-39" src="https://github.com/user-attachments/assets/dc206b41-99df-4de4-90b0-a97bf8559531" />
<img width="526" height="1076" alt="Captura de tela de 2025-07-14 11-34-43" src="https://github.com/user-attachments/assets/c6f21cf4-94b4-4167-b7b5-1cc815e8dcbd" />
<img width="526" height="1076" alt="Captura de tela de 2025-07-14 11-34-49" src="https://github.com/user-attachments/assets/d38d12cf-18c4-48dc-85a5-7dc580029a71" />
<img width="526" height="1076" alt="Captura de tela de 2025-07-14 11-34-54" src="https://github.com/user-attachments/assets/7bdc9f7a-158e-4eeb-90f0-8895f2550b83" />
<img width="526" height="1076" alt="Captura de tela de 2025-07-14 11-35-00" src="https://github.com/user-attachments/assets/66a14ff7-9320-4ad7-853c-02b3c4b12140" />
<img width="526" height="1076" alt="Captura de tela de 2025-07-14 11-35-06" src="https://github.com/user-attachments/assets/4c54bb29-e078-4a4a-8271-0e123e47d0fd" />
<img width="526" height="1076" alt="Captura de tela de 2025-07-14 11-35-12" src="https://github.com/user-attachments/assets/dcd51907-68f4-4956-9345-bea2c60c69ba" />
<img width="526" height="1076" alt="Captura de tela de 2025-07-14 11-35-20" src="https://github.com/user-attachments/assets/6e51f44c-21c6-4b29-9efc-b956b4b68e34" />
<img width="526" height="1076" alt="Captura de tela de 2025-07-14 11-35-29" src="https://github.com/user-attachments/assets/609a3fb6-fbaf-4185-b082-96ddd7a2a1a9" />
<img width="526" height="1076" alt="Captura de tela de 2025-07-14 11-35-40" src="https://github.com/user-attachments/assets/75d6f00d-826e-43ac-a5c6-f3de83533470" />
<img width="526" height="1076" alt="Captura de tela de 2025-07-14 11-35-47" src="https://github.com/user-attachments/assets/95aec2bb-8bee-4a99-9d20-941d23466314" />
<img width="526" height="1076" alt="Captura de tela de 2025-07-14 11-35-52" src="https://github.com/user-attachments/assets/c1e64b20-5d3a-4af8-90be-74887a1f9f97" />
<img width="526" height="1076" alt="Captura de tela de 2025-07-14 11-35-55" src="https://github.com/user-attachments/assets/1668d942-6661-45d5-99d9-a72e89c7322d" />
<img width="526" height="1076" alt="Captura de tela de 2025-07-14 11-36-07" src="https://github.com/user-attachments/assets/3aa3ba53-8f4c-44c7-b89c-fd2a00b38fba" />
<img width="526" height="1076" alt="Captura de tela de 2025-07-14 11-36-13" src="https://github.com/user-attachments/assets/245600f2-4cfb-4e35-862e-909acae64b66" />
<img width="526" height="1076" alt="Captura de tela de 2025-07-14 11-36-30" src="https://github.com/user-attachments/assets/b42417b7-93f6-47bb-a555-dd527da8c33e" />
<img width="528" height="1079" alt="Captura de tela de 2025-07-14 01-38-31" src="https://github.com/user-attachments/assets/4778fda2-69c6-4bd9-a207-e6fce40dffc5" />
