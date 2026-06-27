const { spawn } = require("child_process");


let server;
let driver;

beforeAll(async () => {

    server = spawn("node", ["server.js"]);

    await new Promise(resolve => setTimeout(resolve, 3000));

    driver = await new Builder()
        .forBrowser("chrome")
        .build();

});


const { Builder, By, until } = require("selenium-webdriver");
require("chromedriver");

jest.setTimeout(30000);

describe("Tela de Login", () => {

    let driver;

    beforeAll(async () => {
        driver = await new Builder()
            .forBrowser("chrome")
            .build();
    });

    afterAll(async () => {
        await driver.quit();
    });

    test("Campos de login existem", async () => {

        await driver.get("http://localhost:3000");

        await driver.wait(until.elementLocated(By.id("email")), 5000);

        const email = await driver.findElement(By.id("email"));
        const senha = await driver.findElement(By.id("senha"));

        expect(await email.isDisplayed()).toBe(true);
        expect(await senha.isDisplayed()).toBe(true);

    });

});

afterAll(async () => {

    await driver.quit();

    server.kill();

});