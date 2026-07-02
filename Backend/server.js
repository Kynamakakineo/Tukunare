require("dotenv").config();

const express = require("express");
const path = require("path");
const db = require("./db");

const app = express();

/*
|--------------------------------------------------------------------------
| MIDDLEWARES
|--------------------------------------------------------------------------
*/

app.use(express.json());

app.use(express.static(path.join(__dirname, "../Frontend")));

/*
|--------------------------------------------------------------------------
| ROTA INICIAL  
|--------------------------------------------------------------------------
*/

app.get("/", (_, res) => {

    res.sendFile(

        path.join(__dirname, "../Frontend/index.html")

    );

});

/*
|--------------------------------------------------------------------------
| LOGIN
|--------------------------------------------------------------------------
*/

app.post("/login", (req, res) => {

    const email = (req.body.email || "").trim().toLowerCase();
    const senha = (req.body.senha || "").trim();

    if (!email || !senha) {

        return res.status(400).json({
            sucesso: false,
            mensagem: "Preencha todos os campos."
        });

    }

    const sql = `
        SELECT id, nome, email, perfil
        FROM usuarios
        WHERE email = ?
        AND senha = ?
    `;

    db.query(sql, [email, senha], (erro, resultado) => {

        if (erro) {

            console.error(erro);

            return res.status(500).json({
                sucesso: false,
                mensagem: "Erro interno do servidor."
            });

        }

        if (resultado.length === 0) {

            return res.json({
                sucesso: false,
                mensagem: "E-mail ou senha inválidos."
            });

        }

        return res.json({

            sucesso: true,

            mensagem: "Login realizado com sucesso.",

            usuario: {

                id: resultado[0].id,
                nome: resultado[0].nome,
                email: resultado[0].email,
                perfil: resultado[0].perfil

            }

        });

    });

});

/*
|--------------------------------------------------------------------------
| CADASTRO
|--------------------------------------------------------------------------
*/

app.post("/cadastro", (req, res) => {

    const nome = req.body.nome.trim();
    const email = req.body.email.trim().toLowerCase();
    const senha = req.body.senha.trim();

    if (!nome || !email || !senha) {

        return res.status(400).json({

            sucesso: false,
            mensagem: "Preencha todos os campos."

        });

    }

    if (nome.length < 3) {

        return res.status(400).json({

            sucesso: false,
            mensagem: "Informe um nome válido."

        });

    }

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regexEmail.test(email)) {

        return res.status(400).json({

            sucesso: false,
            mensagem: "E-mail inválido."

        });

    }

    if (senha.length < 6) {

        return res.status(400).json({

            sucesso: false,
            mensagem: "A senha deve possuir pelo menos 6 caracteres."

        });

    }

    const verificaEmail = `
        SELECT id
        FROM usuarios
        WHERE email = ?
    `;

    db.query(verificaEmail, [email], (erro, resultado) => {

        if (erro) {

            console.error(erro);

            return res.status(500).json({

                sucesso: false,
                mensagem: "Erro interno do servidor."

            });

        }

        if (resultado.length > 0) {

            return res.json({

                sucesso: false,
                mensagem: "Este e-mail já está cadastrado."

            });

        }

        const sql = `
            INSERT INTO usuarios
            (
                nome,
                email,
                senha,
                perfil
            )
            VALUES (?, ?, ?, ?)
        `;

        db.query(

            sql,

            [

                nome.trim(),

                email.trim().toLowerCase(),

                senha.trim(),

                "usuario"

            ],

            (erroInsert) => {

                if (erroInsert) {

                    console.error(erroInsert);

                    return res.status(500).json({

                        sucesso: false,
                        mensagem: "Erro ao cadastrar usuário."

                    });

                }

                return res.json({

                    sucesso: true,
                    mensagem: "Usuário cadastrado com sucesso."

                });

            });

    });

});

/*
|--------------------------------------------------------------------------
| LOGOUT
|--------------------------------------------------------------------------
*/

app.post("/logout", (req, res) => {

    return res.json({

        sucesso: true,
        mensagem: "Logout realizado."

    });

});


/*
|--------------------------------------------------------------------------
| LISTAR
|--------------------------------------------------------------------------
*/

app.get("/usuarios", (req, res) => {

    db.query(

        `
        SELECT
        id,
        nome,
        email,
        perfil
        FROM usuarios
        ORDER BY nome ASC
        `,

        (erro, resultado) => {

            if (erro) {

                return res.status(500).json({
                    sucesso: false
                });

            }

            res.json(resultado);

        }

    );

});

/*
|--------------------------------------------------------------------------
| CADASTRAR PELO ADMIN
|--------------------------------------------------------------------------
*/

app.post("/usuarios", (req, res) => {

    const {
        nome,
        email,
        senha,
        perfil
    } = req.body;

    if (!nome || !email || !senha || !perfil) {

        return res.json({

            sucesso: false,
            mensagem: "Preencha todos os campos."

        });

    }

    db.query(

        "SELECT id FROM usuarios WHERE email = ?",

        [email],

        (erro, resultado) => {

            if (erro) {

                return res.status(500).json({

                    sucesso: false

                });

            }

            if (resultado.length > 0) {

                return res.json({

                    sucesso: false,
                    mensagem: "E-mail já cadastrado."

                });

            }

            db.query(

                `
                INSERT INTO usuarios
                (
                    nome,
                    email,
                    senha,
                    perfil
                )
                VALUES (?, ?, ?, ?)
                `,

                [
                    nome.trim(),
                    email.trim().toLowerCase(),
                    senha.trim(),
                    perfil
                ],

                erroInsert => {

                    if (erroInsert) {

                        return res.status(500).json({

                            sucesso: false

                        });

                    }

                    res.json({

                        sucesso: true

                    });

                }

            );

        }

    );

});


/*
|--------------------------------------------------------------------------
| EDITAR
|--------------------------------------------------------------------------
*/
app.put("/usuarios/:id", (req, res) => {

    const id = req.params.id;

    const nome = req.body.nome.trim();

    const email = req.body.email.trim().toLowerCase();

    const perfil = req.body.perfil;

    db.query(

        `
        UPDATE usuarios
        SET
            nome=?,
            email=?,
            perfil=?
        WHERE id=?
        `,

        [

            nome,
            email,
            perfil,
            id

        ],

        erro => {

            if (erro) {

                return res.status(500).json({

                    sucesso: false

                });

            }

            res.json({

                sucesso: true

            });

        }

    );

});

/*
|--------------------------------------------------------------------------
| EXCLUIR
|--------------------------------------------------------------------------
*/
app.delete("/usuarios/:id", (req, res) => {

    const id = req.params.id;

    if (id == 1) {

        return res.json({

            sucesso: false,

            mensagem: "O administrador principal não pode ser excluído."

        });

    }

    db.query(

        "DELETE FROM usuarios WHERE id=?",

        [id],

        erro => {

            if (erro) {

                return res.status(500).json({

                    sucesso: false

                });

            }

            res.json({

                sucesso: true

            });

        }

    );

});


/*
|--------------------------------------------------------------------------
| SERVIDOR
|--------------------------------------------------------------------------
*/

const PORT = process.env.PORT || 3000;

if (require.main === module) {

    app.listen(PORT, () => {

        console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);

    });

}

module.exports = app;