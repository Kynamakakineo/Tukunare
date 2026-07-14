// Mock do localStorage
const localStorageMock = (() => {

    let store = {};

    return {

        getItem: (key) => store[key] || null,

        setItem: (key, value) => {
            store[key] = value;
        },

        removeItem: (key) => {
            delete store[key];
        },

        clear: () => {
            store = {};
        }

    };

})();

Object.defineProperty(global, "localStorage", {
    value: localStorageMock
});

// Mock do document
global.document = {

    getElementById: jest.fn(() => null)

};

// Mock do window
global.window = {

    location: {
        href: ""
    },

    onload: null

};

// Importa somente depois dos mocks
const {

    verificarLogin,
    verificarJaLogado,
    verificarAdministrador

} = require("../../Frontend/auth");

describe("Autenticação", () => {

    beforeEach(() => {

        localStorage.clear();

        window.location.href = "";

    });

    test("Usuário não logado deve voltar para o login", () => {

        verificarLogin();

        expect(window.location.href).toBe("/index.html");

    });

    test("Usuário comum logado vai para Recicle Agora", () => {

        localStorage.setItem("logado", "true");
        localStorage.setItem("perfil", "usuario");

        verificarJaLogado();

        expect(window.location.href)
            .toBe("/recicleAgora/recicleAgora.html");

    });

    test("Administrador logado vai para Admin", () => {

        localStorage.setItem("logado", "true");
        localStorage.setItem("perfil", "admin");

        verificarJaLogado();

        expect(window.location.href)
            .toBe("/admin/admin.html");

    });

    test("Usuário comum não pode acessar página do administrador", () => {

        localStorage.setItem("logado", "true");
        localStorage.setItem("perfil", "usuario");

        verificarAdministrador();

        expect(window.location.href)
            .toBe("/index.html");

    });

    test("Administrador pode acessar página do administrador", () => {

        localStorage.setItem("logado", "true");
        localStorage.setItem("perfil", "admin");

        verificarAdministrador();

        expect(window.location.href).toBe("");

    });

});