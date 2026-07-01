require("dotenv").config();
const mysql = require("mysql2");

// Alterado de 'createConnection' para 'createPool'
const db = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: {
        rejectUnauthorized: false 
    },
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Com Pool, usamos getConnection para testar a saúde inicial do banco
db.getConnection((erro, connection) => {
    if (erro) {
        console.error("Erro ao conectar no Pool:");
        console.error(erro);
        return;
    }
    console.log("Banco conectado com sucesso via Pool!");
    connection.release(); // Libera a conexão de volta para o Pool
});

module.exports = db;