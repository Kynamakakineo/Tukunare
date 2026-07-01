/*
|--------------------------------------------------------------------------
| LOGIN
|--------------------------------------------------------------------------
*/

async function login(event) {

    event.preventDefault();

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    try {

        const resposta = await fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                senha
            })
        });

        const dados = await resposta.json();

        if (dados.sucesso) {

            // Salva autenticação
            localStorage.setItem("logado", "true");
            localStorage.setItem("perfil", dados.usuario.perfil);

            if (dados.usuario.perfil === "admin") {

                window.location.href = "/admin/admin.html";

            } else {

                window.location.href = "/recicleAgora/recicleAgora.html";

            }

        } else {

            alert(dados.mensagem);

        }

    } catch (erro) {

        console.error(erro);
        alert("Erro ao conectar ao servidor");

    }

}

/*
|--------------------------------------------------------------------------
| LOGOUT
|--------------------------------------------------------------------------
*/

function logout() {

    localStorage.clear();

    window.location.href = "/index.html";

}

/*
|--------------------------------------------------------------------------
| PROTEGE AS PÁGINAS
|--------------------------------------------------------------------------
*/

function verificarLogin() {

    const logado = localStorage.getItem("logado");

    if (logado !== "true") {

        window.location.href = "/index.html";

    }

}

/*
|--------------------------------------------------------------------------
| PROTEGE A PÁGINA DO ADMINISTRADOR
|--------------------------------------------------------------------------
*/

function verificarAdministrador() {

    const logado = localStorage.getItem("logado");
    const perfil = localStorage.getItem("perfil");

    if (logado !== "true" || perfil !== "admin") {

        window.location.href = "/index.html";

    }

}

/*
|--------------------------------------------------------------------------
| SE JÁ ESTIVER LOGADO NÃO VOLTA PARA LOGIN
|--------------------------------------------------------------------------
*/

function verificarJaLogado() {

    const logado = localStorage.getItem("logado");
    const perfil = localStorage.getItem("perfil");

    if (logado === "true") {

        if (perfil === "admin") {

            window.location.href = "/admin/admin.html";

        } else {

            window.location.href = "/recicleAgora/recicleAgora.html";

        }

    }

}

/*
|--------------------------------------------------------------------------
| EXIBE O MENU ADMIN
|--------------------------------------------------------------------------
*/

window.onload = () => {

    const menu = document.getElementById("menuAdmin");

    if (!menu) return;

    if (localStorage.getItem("perfil") === "admin") {

        menu.style.display = "inline";

    }

};

/*
|--------------------------------------------------------------------------
| EXPORTAÇÃO PARA TESTES
|--------------------------------------------------------------------------
*/

if (typeof module !== "undefined") {

    module.exports = {
        login,
        logout,
        verificarLogin,
        verificarAdministrador,
        verificarJaLogado
    };

}