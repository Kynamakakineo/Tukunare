require("dotenv").config();

const express = require("express");
const path = require("path");
const db = require("./db");

const app = express();

app.use(express.json());

app.use(express.static(
    path.join(__dirname, "public")
));

/*
|--------------------------------------------------------------------------
| LOGIN
|--------------------------------------------------------------------------
*/

app.post("/login", (req, res) => {

    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({
            sucesso: false,
            mensagem: "Preencha todos os campos"
        });
    }

    const sql = `
        SELECT *
        FROM usuarios
        WHERE email = ?
        AND senha = ?
    `;

    db.query(
        sql,
        [email, senha],
        (err, resultado) => {

            if (err) {
                console.error(err);

                return res.status(500).json({
                    sucesso: false,
                    mensagem: "Erro interno"
                });
            }

            if (resultado.length > 0) {

                return res.json({
                    sucesso: true,
                    mensagem: "Login realizado"
                });

            } else {

                return res.json({
                    sucesso: false,
                    mensagem: "Email ou senha inválidos"
                });

            }
        }
    );
});

/*
|--------------------------------------------------------------------------
| CADASTRO DE USUÁRIO
|--------------------------------------------------------------------------
*/

app.post("/cadastro", (req, res) => {

    const {
        nome,
        email,
        senha
    } = req.body;

    if (!nome || !email || !senha) {

        return res.status(400).json({
            sucesso: false,
            mensagem: "Preencha todos os campos"
        });

    }

    const verificaEmail = `
        SELECT id
        FROM usuarios
        WHERE email = ?
    `;

    db.query(
        verificaEmail,
        [email],
        (erroEmail, resultadoEmail) => {

            if (erroEmail) {

                console.error(erroEmail);

                return res.status(500).json({
                    sucesso: false
                });

            }

            if (resultadoEmail.length > 0) {

                return res.json({
                    sucesso: false,
                    mensagem: "Email já cadastrado"
                });

            }

            const sql = `
                INSERT INTO usuarios
                (
                    nome,
                    email,
                    senha
                )
                VALUES (?, ?, ?)
            `;

            db.query(
                sql,
                [nome, email, senha],
                (err) => {

                    if (err) {

                        console.error(err);

                        return res.status(500).json({
                            sucesso: false
                        });

                    }

                    return res.json({
                        sucesso: true,
                        mensagem: "Usuário cadastrado com sucesso"
                    });

                }
            );
        }
    );
});

/*
|--------------------------------------------------------------------------
| INICIALIZAÇÃO
|--------------------------------------------------------------------------
*/

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(
        `🚀 Servidor rodando em http://localhost:${PORT}`
    );
});