// tests/floristeria.spec.ts
import { test, expect } from '@playwright/test';
import { AmorPage } from '../pages/AmorPage';
import { CumpleanosPage } from '../pages/CumpleanosPage';

test('Agregar dos productos de Amor al carrito', async ({ page }) => {
    const amorPage = new AmorPage(page);
    await amorPage.navigateToAmor();
    await amorPage.addFirstProduct();
    await amorPage.continueShopping();
    await amorPage.addSecondProduct();
    await amorPage.verifyTotalPrice();
});

test('Agregar y eliminar producto de Cumpleaños', async ({ page }) => {
    const cumpleanosPage = new CumpleanosPage(page);
    await cumpleanosPage.navigateToCumpleanos();
    await cumpleanosPage.sortProductsByPrice();
    await cumpleanosPage.addProductToCart();
    await cumpleanosPage.removeProductFromCart();
    await cumpleanosPage.verifyRemovedItemMessage();
});
