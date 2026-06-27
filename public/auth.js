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

            window.location.href = "/recicleAgora/recicleAgora.html";

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

    localStorage.removeItem("logado");

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
| SE JÁ ESTIVER LOGADO NÃO VOLTA PARA LOGIN
|--------------------------------------------------------------------------
*/

function verificarJaLogado() {

    const logado = localStorage.getItem("logado");

    if (logado === "true") {

        window.location.href = "/recicleAgora/recicleAgora.html";

    }
}

if (typeof module !== "undefined") {
    module.exports = {
        logout,
        verificarLogin,
        verificarJaLogado
    };
}