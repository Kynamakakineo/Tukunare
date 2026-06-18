//passo o evento por parâmetro pq eu sei que
//que vai chamar é o form
function login(event){
    event.preventDefault(); //Previne o recarregamento da página
    const email = getElementValue("email");
    const senha = getElementValue("senha");
    const warning_username = document.getElementById("warning-username");

    // if(email.length <4)
    //     warning_username.style.display = "inline";
    // else
    //     warning_username.style.display = "none";

    if(email === "admin@adm.com" &&
        senha === "123"
    ){
        //vai ser como se fosse um token
        //localStorage.setItem("logado", "true");
        window.location.href = "./recicleAgora/recicleAgora.html"
        return true;
    }
    else{
        showErrorLoginMessage();
        return false;
    }
}

function logout(){
    //localStorage.removeItem("logado");
    window.location.href = "login.html"
}

// function verificarLogado(){
//     if(localStorage.getItem("logado") === "true")
//         return true;
//     else 
//         return false;
// }

function getElementValue(element){
    return document.getElementById(element).value;
}

function showErrorLoginMessage() {
    setElementText("mensagem", "Usuário e/ou senha incorretos");
    setElementDisplay("overlay","flex");
}

function setElementText(element, text){
    document.getElementById(element).textContent = text;
}

function setElementDisplay(element, display){
    document.getElementById(element).style.display = display;
}