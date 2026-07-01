require("dotenv").config();
const mysql = require("mysql2");
const fs = require("fs");
const path = require("path"); // 1. Importa o módulo path nativo do Node

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: {
        // 2. Altera para process.cwd() se o ca.pem estiver na pasta raiz do projeto. 
        // Se ele estiver dentro de uma pasta junto com db.js, use path.join(__dirname, "ca.pem")
        ca: fs.readFileSync(path.join(process.cwd(), "ca.pem")) 
    }
});

db.connect((erro) => {
    if (erro) {
        console.error("Erro ao conectar:");
        console.error(erro);
        return;
    }
    console.log("Banco conectado com sucesso!");
});

module.exports = db;