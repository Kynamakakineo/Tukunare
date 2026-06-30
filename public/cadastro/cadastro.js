async function cadastrar(event){

    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();

    const email = document.getElementById("email").value.trim();

    const senha = document.getElementById("senha").value;

    const confirmarSenha =
        document.getElementById("confirmarSenha").value;

    if(nome.length < 3){

        alert("Informe um nome válido.");

        return;

    }

    if(senha.length < 6){

        alert("A senha deve possuir pelo menos 6 caracteres.");

        return;

    }

    if(senha !== confirmarSenha){

        alert("As senhas não coincidem.");

        return;

    }

    try{

        const resposta = await fetch("/cadastro",{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({

                nome,
                email,
                senha

            })

        });

        const dados = await resposta.json();

        if(dados.sucesso){

            alert("Cadastro realizado com sucesso!");

            window.location.href="/index.html";

        }else{

            alert(dados.mensagem);

        }

    }catch(erro){

        console.error(erro);

        alert("Erro ao cadastrar usuário.");

    }

}