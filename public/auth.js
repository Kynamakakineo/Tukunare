async function login(event) {

    event.preventDefault();

    const email =
        document.getElementById("email").value;

    const senha =
        document.getElementById("senha").value;

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

            window.location.href =
                "/recicleAgora/recicleAgora.html";

        } else {

            alert(dados.mensagem);
        }

    } catch (erro) {

        console.error(erro);

    }
}