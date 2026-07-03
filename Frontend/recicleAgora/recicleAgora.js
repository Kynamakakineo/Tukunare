document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".recycle-form");

    if (form) {
        form.addEventListener("submit", async (event) => {
            event.preventDefault(); // Impede a atualização automática da tela

            // Captura os elementos correspondentes aos IDs do HTML
            const componentes = document.getElementById("componentes").value;
            const perifericos = document.getElementById("perifericos").value;
            const estado = document.getElementById("estado").value;
            const modelo = document.getElementById("modelo").value;
            // ... código anterior de capturar as variáveis ...

            try {
                // Certifique-se de que as variáveis capturadas nas linhas 9 a 12 batam com os nomes usados aqui embaixo
                const componentes = document.getElementById("componentes").value;
                const perifericos = document.getElementById("perifericos").value;
                const estado = document.getElementById("estado").value;
                const modelo = document.getElementById("modelo").value;

                const resposta = await fetch("/recicle-agora", {
                    method: "POST",         // Estava "ethod" no print
                    headers: {              // Estava "eaders" no print
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({  // Estava "ody" no print
                        componentes: componentes,
                        perifericos: perifericos,
                        estado: estado,
                        modelo: modelo
                    })
                });

                const resultado = await resposta.json();

                if (resultado.sucesso) {
                    alert(resultado.mensagem);
                    form.reset();

                    // Dispara o reset visual dos selects
                    const changeEvent = new Event('change');
                    document.getElementById("componentes").dispatchEvent(changeEvent);
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