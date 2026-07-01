// Banco de dados temporário de cupons
const cupons = {
    "AB#12CD$34EF56": {
        loja: "Lojas Americanas",
        valor: "Vale R$20,00 nas",
        codigo: "HLFF876AAOP8LCRYA96",
        logo: "https://tse1.mm.bing.net/th/id/OIP.f7VLZbgU0yGuNXnpHumc5QHaMW?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
        utilizado: false
    },

    "XY@98ZT!65LM43": {
        loja: "Steam",
        valor: "Vale R$50,00 na",
        codigo: "STEAM5589QWER",
        logo: "https://www.freeiconspng.com/uploads/steam-logo-icon-7.png",
        utilizado: false
    },

    "EC&20HD*26BR01": {
        loja: "KaBuM!",
        valor: "Vale R$100,00 na",
        codigo: "KBM99885544",
        logo: "https://logodownload.org/wp-content/uploads/2017/03/kabum-logo-1.png",
        utilizado: false
    }
};

// Elementos da página
const botao = document.getElementById("btn-resgatar");
const input = document.getElementById("token-input");
const card = document.getElementById("coupon-card");

// Função para resgatar
function resgatarCupom() {

    const token = input.value.trim();

    if (token === "") {
        alert("Digite um token.");
        return;
    }

    const cupom = cupons[token];

    if (!cupom) {
        alert("Cupom inválido.");
        return;
    }

    if (cupom.utilizado) {
        alert("Esse cupom já foi utilizado.");
        return;
    }

    // Marca como utilizado
    cupom.utilizado = true;

    // Atualiza as informações do cupom
    document.getElementById("cupom-valor").textContent = cupom.valor;
    document.getElementById("cupom-loja").textContent = cupom.loja;
    document.getElementById("cupom-codigo").textContent = cupom.codigo;

    // Atualiza a logo
    const logo = document.getElementById("cupom-logo");
    logo.src = cupom.logo;
    logo.alt = cupom.loja;

    // Exibe o cartão
    card.style.display = "block";

    // Limpa o campo
    input.value = "";
    input.focus();
}

// Clique no botão
botao.addEventListener("click", resgatarCupom);

// Enter
input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        resgatarCupom();
    }
});