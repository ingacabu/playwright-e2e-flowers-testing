
import { Page, Locator, expect } from '@playwright/test';

export class CumpleanosPage {
    readonly page: Page;
    readonly menuButton: Locator;
    readonly sortByPrice: Locator;
    readonly addToCartButton: Locator;
    readonly removeButton: Locator;
    readonly removedItemMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.menuButton = page.getByRole('button', { name: '' });
        this.sortByPrice = page.getByLabel('Pedido de la tienda');
        this.addToCartButton = page.getByRole('link', { name: 'Añadir al carrito: “MDF 00023”' });
        this.removeButton = page.getByRole('link', { name: 'Remove this item' });
        this.removedItemMessage = page.getByText('“MDF 00023” eliminado. ¿');
    }

    async navigateToCumpleanos() {
        await this.page.goto('https://www.floristeriamundoflor.com/');
        await this.page.waitForTimeout(5000);
        await this.page.locator('#primary-menu').getByRole('link', { name: 'Cumpleaños' }).click();
    }

    async sortProductsByPrice() {
        await this.sortByPrice.selectOption('price');
        await this.page.goto('https://www.floristeriamundoflor.com/product-category/cumpleanos/?orderby=price');
        //await this.page.waitForTimeout(5000);
    }

    async addProductToCart() {
        await this.menuButton.click();
        await this.addToCartButton.click();
        //await this.page.waitForTimeout(5000);
    }

    async removeProductFromCart() {
        await this.removeButton.click();
        //await this.page.waitForTimeout(5000);
    }

    async verifyRemovedItemMessage() {
        await expect(this.removedItemMessage).toBeVisible();
        await this.page.screenshot({path: "./captures/" + Date.now() + "Capture.png"});
    }
}
