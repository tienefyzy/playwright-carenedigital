import { test, expect, Page } from '@playwright/test';

type TestParams = {
  baseUrl: string;
  vendor: string;
  device: string;
};

export const sharedTest = test.extend<TestParams>({
  baseUrl: '',
  vendor: '',
  device: '',
});

export const claMrhTest = async ({ page, baseUrl, vendor, device }: { page: Page, baseUrl: string, vendor: string, device: string }) => {
  await page.goto(`${baseUrl}${vendor}/mrh/parcours/quote`);
  await page.goto(`${baseUrl}${vendor}/mrh/parcours/quote/choixHabitation`);
  await expect(page.getByLabel('Decline cookies')).toBeVisible();
  await page.getByLabel('Decline cookies').click();
  await expect(page.getByRole('heading', { name: 'Assurance habitation' })).toBeVisible();
  await expect(page.getByText('Je souhaite assurer ?')).toBeVisible();
  await page.getByRole('button', { name: 'Ma résidence principale' }).click();
  await expect(page.getByRole('button', { name: 'Un appartement' })).toBeVisible();
  await page.getByRole('button', { name: 'Un appartement' }).click();
  await page.getByRole('button', { name: 'Suivant' }).click();
  await expect(page.getByRole('heading', { name: 'Je suis' })).toBeVisible();
  await page.getByRole('button', { name: 'Locataire' }).click();
  await page.getByRole('button', { name: 'Suivant' }).click();
  await expect(page.getByRole('heading', { name: 'Nombre de pièces à assurer' })).toBeVisible();
  await page.getByLabel('Nombre de pièces à assurer').selectOption('5');
  await page.getByRole('button', { name: 'Suivant' }).click();
  await expect(page.getByRole('heading', { name: 'Coordonnées' })).toBeVisible();
  await page.getByLabel('Civilité').selectOption('M.');
  await page.getByLabel('Nom', { exact: true }).click();
  await page.getByLabel('Nom', { exact: true }).fill('Mascarpone');
  await page.getByLabel('Nom', { exact: true }).press('Tab');
  await page.getByLabel('Prénom').fill('Pierre-François');
  await page.getByLabel('E-mail').click();
  await page.getByLabel('E-mail').fill('journeycarene+devcarenemrhparcours@yopmail.com');
  await page.getByLabel('Votre numéro de téléphone').click();
  await page.getByLabel('Votre numéro de téléphone').fill('0613371337');
  await page.getByRole('button', { name: 'Suivant' }).click();
  await expect(page.getByRole('heading', { name: 'Notre proposition tarifaire' })).toBeVisible();
};