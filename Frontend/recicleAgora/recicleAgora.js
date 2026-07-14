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
            body: JSON.stringify({ email, senha })
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
| EXIBE O MENU ADMIN (Inicia após carregamento total da página)
|--------------------------------------------------------------------------
*/
window.addEventListener("load", () => {
    const menu = document.getElementById("menuAdmin");
    if (!menu) return;

    if (localStorage.getItem("perfil") === "admin") {
        menu.style.display = "inline";
    }
});

/*
|--------------------------------------------------------------------------
| ENVIO DO FORMULÁRIO DE RECICLAGEM
|--------------------------------------------------------------------------
*/
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".recycle-form");

    if (form) {
        form.addEventListener("submit", async (event) => {
            event.preventDefault(); // Impede o recarregamento automático da página

            // Captura os elementos e valores corretos do formulário
            const componentes = document.getElementById("componentes").value;
            const perifericos = document.getElementById("perifericos").value;
            const estado = document.getElementById("estado").value;
            const modelo = document.getElementById("modelo").value;

            try {
                const resposta = await fetch("/recicle-agora", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        componentes,
                        perifericos,
                        estado,
                        modelo
                    })
                });

                const resultado = await resposta.json();

                if (resultado.sucesso) {
                    alert(resultado.mensagem);
                    form.reset(); // Reseta os campos de texto do formulário

                    // Dispara o evento "change" para reativar visualmente os seletores bloqueados
                    const changeEvent = new Event('change');
                    document.getElementById("componentes").dispatchEvent(changeEvent);
                    document.getElementById("perifericos").dispatchEvent(changeEvent);
                } else {
                    alert("Erro: " + resultado.mensagem);
                }
            } catch (error) {
                console.error("Erro de comunicação com o servidor:", error);
                alert("Não foi possível conectar ao servidor.");
            }
        });
    }
});

/*
|--------------------------------------------------------------------------
| EXPORTAÇÃO PARA TESTES (Node.js/Jest se aplicável)
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