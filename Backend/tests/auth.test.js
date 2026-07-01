const {
    verificarLogin,
    verificarJaLogado
} = require("../public/auth");

// Mock do localStorag, cria um localStorage falso.
const localStorageMock = (() => {
    let store = {};

    return {
        getItem: key => store[key] || null,
        setItem: (key, value) => store[key] = value,
        removeItem: key => delete store[key],
        clear: () => store = {}
    };
})();

Object.defineProperty(global, "localStorage", {
    value: localStorageMock
});

// Mock do window
delete global.window;

global.window = {
    location: {
        href: ""
    }
};

describe("Auth", () => {

    beforeEach(() => {
        localStorage.clear();
        window.location.href = "";
    });
//teste para verificar login se ele está logado.
    test("Usuário não logado é redirecionado", () => {

        verificarLogin();

        expect(window.location.href).toBe("/index.html");

    });
// teste para verificar se ele está logado e enviar para a pagina recicleAgora.
    test("Usuário logado é redirecionado para Recicle Agora", () => {

        localStorage.setItem("logado", "true");

        verificarJaLogado();

        expect(window.location.href)
            .toBe("/recicleAgora/recicleAgora.html");

    });

});