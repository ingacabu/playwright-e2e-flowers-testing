
import { Page, Locator, expect } from '@playwright/test';

export class AmorPage {
    readonly page: Page;
    readonly menuButton: Locator;
    readonly addToCartButton1: Locator;
    readonly addToCartButton2: Locator;
    readonly continueShoppingButton: Locator;
    readonly totalPrice: Locator;

    constructor(page: Page) {
        this.page = page;
        this.menuButton = page.getByRole('button', { name: '' });
        this.addToCartButton1 = page.getByRole('link', { name: 'Añadir al carrito: “MDF 0001”' });
        this.addToCartButton2 = page.getByRole('link', { name: 'Añadir al carrito: “MDF 00016”' });
        this.continueShoppingButton = page.getByRole('link', { name: 'Seguir comprando' });
        this.totalPrice = page.locator("//*[@id='cart']/a/span[2]/span/bdi") //page.getByText('289.000');
    }

    async navigateToAmor() {
        await this.page.goto('https://www.floristeriamundoflor.com/');
        await this.page.waitForTimeout(5000);
        await this.page.locator('#primary-menu').getByRole('link', { name: 'Amor' }).click();
    }

    async addFirstProduct() {
        await this.menuButton.click();
        await this.addToCartButton1.click();
        //await this.page.waitForTimeout(5000);
    }

    async continueShopping() {
        await this.continueShoppingButton.click();
        //await this.page.waitForTimeout(5000);
    }

    async addSecondProduct() {
        await this.menuButton.click();
        await this.addToCartButton2.click();
    }

    async verifyTotalPrice() {
        await expect(this.totalPrice).toContainText("289") //.toBeVisible();
        await this.page.screenshot({path: "./captures/" + Date.now() + "Capture.png"});
    }
}
