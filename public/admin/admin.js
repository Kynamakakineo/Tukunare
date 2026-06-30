/*
|--------------------------------------------------------------------------
| CARREGA TODOS OS USUÁRIOS
|--------------------------------------------------------------------------
*/

async function carregarUsuarios() {

    try {

        const resposta = await fetch("/usuarios");

        const usuarios = await resposta.json();

        const tabela = document.getElementById("tabelaUsuarios");

        tabela.innerHTML = "";

        usuarios.forEach(usuario => {

            tabela.innerHTML += `

                <tr>

                    <td>${usuario.id}</td>

                    <td>${usuario.nome}</td>

                    <td>${usuario.email}</td>

                    <td>${usuario.perfil}</td>

                    <td>

                        <button onclick="editarUsuario(
                            ${usuario.id},
                            '${usuario.nome}',
                            '${usuario.email}',
                            '${usuario.perfil}'
                        )">

                            Editar

                        </button>

                        <button onclick="excluirUsuario(${usuario.id})">

                            Excluir

                        </button>

                    </td>

                </tr>

            `;

        });

    } catch (erro) {

        console.error(erro);

        alert("Erro ao carregar usuários.");

    }

}

/*
|--------------------------------------------------------------------------
| SALVAR USUÁRIO
|--------------------------------------------------------------------------
*/

async function salvarUsuario() {

    const id = document.getElementById("id").value;

    const nome = document.getElementById("nome").value;

    const email = document.getElementById("email").value;

    const senha = document.getElementById("senha").value;

    const perfil = document.getElementById("perfil").value;

    if (

        nome === "" ||

        email === "" ||

        (!id && senha === "")

    ) {

        alert("Preencha todos os campos.");

        return;

    }

    try {

        let resposta;

        /*
        |--------------------------------------------------------------------------
        | NOVO USUÁRIO
        |--------------------------------------------------------------------------
        */

        if (id === "") {

            resposta = await fetch("/usuarios", {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify({

                    nome,
                    email,
                    senha,
                    perfil

                })

            });

        }

        /*
        |--------------------------------------------------------------------------
        | EDITAR USUÁRIO
        |--------------------------------------------------------------------------
        */

        else {

            resposta = await fetch(`/usuarios/${id}`, {

                method: "PUT",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify({

                    nome,
                    email,
                    perfil

                })

            });

        }

        const dados = await resposta.json();

        if (dados.sucesso) {

            alert("Operação realizada com sucesso!");

            limparFormulario();

            carregarUsuarios();

        } else {

            alert("Erro ao salvar usuário.");

        }

    } catch (erro) {

        console.error(erro);

        alert("Erro ao conectar ao servidor.");

    }

}

/*
|--------------------------------------------------------------------------
| EDITAR
|--------------------------------------------------------------------------
*/

function editarUsuario(

    id,

    nome,

    email,

    perfil

) {

    document.getElementById("id").value = id;

    document.getElementById("nome").value = nome;

    document.getElementById("email").value = email;

    document.getElementById("senha").value = "";

    document.getElementById("perfil").value = perfil;

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}

/*
|--------------------------------------------------------------------------
| EXCLUIR
|--------------------------------------------------------------------------
*/

async function excluirUsuario(id) {

    const confirmar = confirm(

        "Deseja realmente excluir este usuário?"

    );

    if (!confirmar) {

        return;

    }

    try {

        const resposta = await fetch(

            `/usuarios/${id}`,

            {

                method: "DELETE"

            }

        );

        const dados = await resposta.json();

        if (dados.sucesso) {

            alert("Usuário excluído.");

            carregarUsuarios();

        } else {

            alert("Não foi possível excluir.");

        }

    } catch (erro) {

        console.error(erro);

        alert("Erro ao excluir usuário.");

    }

}

/*
|--------------------------------------------------------------------------
| LIMPA FORMULÁRIO
|--------------------------------------------------------------------------
*/

function limparFormulario() {

    document.getElementById("id").value = "";

    document.getElementById("nome").value = "";

    document.getElementById("email").value = "";

    document.getElementById("senha").value = "";

    document.getElementById("perfil").value = "usuario";

}

document.getElementById("formUsuario").addEventListener(

    "reset",

    limparFormulario

);