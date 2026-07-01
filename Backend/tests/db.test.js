require("dotenv").config();

const mysql = require("mysql2/promise");
const fs = require("fs");

describe("Teste de conexão com banco de dados", () => {

    let connection;

    beforeAll(async () => {

        connection = await mysql.createConnection({

            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,

            ssl: {
                ca: fs.readFileSync("./ca.pem")
            }

        });

    });

    afterAll(async () => {

        if (connection) {
            await connection.end();
        }

    });

    test("Deve conectar ao banco com sucesso", async () => {

        expect(connection).toBeDefined();

    });

    test("Deve executar uma query simples", async () => {

        const [rows] = await connection.execute(
            "SELECT 1 + 1 AS resultado"
        );

        expect(rows[0].resultado).toBe(2);

    });

});