const { spawn } = require("child_process");
const { Builder, By, until } = require("selenium-webdriver");
require("chromedriver");

jest.setTimeout(30000);

describe("Tela de Login", () => {

    let server;
    let driver;

    beforeAll(async () => {

        // Inicia o servidor
        server = spawn("node", ["server.js"]);

        // Aguarda o servidor iniciar
        await new Promise(resolve => setTimeout(resolve, 3000));

        // Abre o Chrome
        driver = await new Builder()
            .forBrowser("chrome")
            .build();

    });

    afterAll(async () => {

        // Fecha o navegador
        await driver.quit();

        // Encerra o servidor
        server.kill();

    });

    test("Campos de login existem", async () => {

        // Acessa a aplicação
        await driver.get("http://localhost:3000");

        // Aguarda os campos aparecerem
        await driver.wait(
            until.elementLocated(By.id("email")),
            5000
        );

        // Localiza os elementos
        const email = await driver.findElement(By.id("email"));
        const senha = await driver.findElement(By.id("senha"));

        // Verifica se estão visíveis
        expect(await email.isDisplayed()).toBe(true);
        expect(await senha.isDisplayed()).toBe(true);

    });

});