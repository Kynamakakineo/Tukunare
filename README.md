# ♻️ Tukunare

Sistema web desenvolvido para incentivar o descarte correto de resíduos eletrônicos, promovendo a conscientização ambiental e oferecendo uma plataforma para gerenciamento de usuários e acesso a informações sobre reciclagem.

## 📌 Sobre o projeto

O **Tukunare** foi desenvolvido com o objetivo de aproximar usuários de práticas sustentáveis relacionadas ao descarte de lixo eletrônico. A aplicação oferece uma interface intuitiva para navegação pelas informações do projeto, além de possuir um sistema de autenticação com diferentes níveis de acesso.

O sistema é composto por um **Frontend** desenvolvido em HTML, CSS e JavaScript e um **Backend** desenvolvido em Node.js com Express, responsável pela autenticação, comunicação com o banco de dados e gerenciamento dos usuários.

---

## ✨ Funcionalidades

* Login de usuários
* Cadastro de novos usuários
* Controle de acesso por perfil (Administrador e Usuário)
* Área administrativa
* Página "Recicle Agora"
* Página "Resgate"
* Página "Sobre Nós"
* Página de Contato
* Integração com banco de dados MySQL
* Testes automatizados utilizando Jest, Supertest e Selenium

---

## 🛠 Tecnologias utilizadas

### Frontend

* HTML5
* CSS3
* JavaScript

### Backend

* Node.js
* Express
* MySQL2
* Express Session
* BCrypt
* Dotenv
* CORS

### Testes

* Jest
* Supertest
* Selenium WebDriver

---

## 📂 Estrutura do projeto

```text
Tukunare/
│
├── Backend/
│   ├── server.js
│   ├── db.js
│   ├── tests/
│   └── package.json
│
├── Frontend/
│   ├── admin/
│   ├── cadastro/
│   ├── contato/
│   ├── recicleAgora/
│   ├── resgate/
│   ├── sobreNos/
│   ├── img/
│   ├── auth.js
│   ├── index.html
│   └── style.css
│
└── README.md
```

---

## ⚙️ Pré-requisitos

Antes de executar o projeto, tenha instalado:

* Node.js 18 ou superior
* MySQL Server
* Git

---

## 🚀 Como executar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/Kynamakakineo/Tukunare.git
```

### 2. Acesse a pasta do backend

```bash
cd Backend
```

### 3. Instale as dependências

```bash
npm install
```

### 4. Configure o arquivo `.env`

Crie um arquivo chamado `.env` na pasta **Backend** contendo as configurações do banco de dados.

Exemplo:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=nome_do_banco
SESSION_SECRET=sua_chave_secreta
```

> Ajuste a porta conforme a configuração do seu MySQL.

### 5. Execute o servidor

```bash
npm start
```

Ou, durante o desenvolvimento:

```bash
npm run dev
```

---

## 🧪 Executando os testes

Executar todos os testes:

```bash
npm test
```

Executar apenas os testes da API:

```bash
npm run api.test
```

Executar os testes do banco de dados:

```bash
npm run testdb
```

---

## 🔐 Controle de acesso

O sistema utiliza autenticação de usuários e diferencia permissões por perfil.

### Usuário

* Acesso às páginas públicas
* Acesso às funcionalidades disponíveis para usuários autenticados

### Administrador

Além das permissões de usuário:

* Gerenciamento de usuários
* Acesso ao painel administrativo

---

## 🌱 Objetivo

O projeto busca incentivar práticas sustentáveis relacionadas ao descarte de equipamentos eletrônicos, fornecendo uma plataforma simples e acessível para conscientização ambiental e gerenciamento de usuários.

---

## 📖 Próximas melhorias

* Criptografia completa das senhas
* Recuperação de senha
* Painel administrativo mais completo
* Dashboard com indicadores
* Histórico de atividades
* Responsividade aprimorada
* Implantação em ambiente de produção

---

## 👥 Equipe

Projeto desenvolvido para fins acadêmicos.

---

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais.
