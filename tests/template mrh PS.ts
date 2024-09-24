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

export const psMrhTest = async ({ page, baseUrl, vendor, device }: { page: Page, baseUrl: string, vendor: string, device: string }) => {
  await page.goto('http://localhost:3000/mrh/parcours/quote');
  await page.goto('http://localhost:3000/mrh/parcours/quote/choixHabitation');
  await expect(page.getByLabel('Decline cookies')).toBeVisible();
  await page.getByLabel('Decline cookies').click();
  await expect(page.getByRole('heading', { name: 'Assurance habitation' })).toBeVisible();
  await expect(page.getByText('Je souhaite assurer')).toBeVisible();
  await page.getByRole('button', { name: 'Ma résidence secondaire' }).click();
  await page.getByRole('button', { name: 'Un appartement' }).click();
  await page.getByRole('button', { name: 'Locataire' }).click();
  await page.getByRole('button', { name: 'Suivant' }).click();
  await expect(page.getByText('Le nombre de pièces à assurer')).toBeVisible();
  await page.getByLabel('Le nombre de pièces à assurer est').selectOption('1');
  await page.getByRole('button', { name: 'Suivant' }).click();
  await expect(page.getByRole('heading', { name: 'Coordonnées' })).toBeVisible();
  await page.getByLabel('Civilité').selectOption('M.');
  await page.getByLabel('Nom', { exact: true }).click();
  await page.getByLabel('Nom', { exact: true }).fill('PANETTONE');
  await page.getByLabel('Nom', { exact: true }).press('Tab');
  await page.getByLabel('Prénom').fill('Robert-Patrick');
  await page.getByLabel('Prénom').press('Tab');
  await page.getByLabel('E-mail').fill('geronimo@yopmail.com');
  await page.getByLabel('E-mail').press('Tab');
  await page.getByLabel('Votre numéro de téléphone').fill('0613371337');
  await page.getByRole('button', { name: 'Suivant' }).click();
  await expect(page.getByRole('heading', { name: 'Notre proposition tarifaire' })).toBeVisible();
  await page.getByRole('button', { name: 'Suivant' }).click();
  await expect(page.getByText('Parmi les pièces à assurer,')).toBeVisible();
  await page.getByLabel('Parmi les pièces à assurer,').selectOption('1');
  await page.getByRole('button', { name: 'Suivant' }).click();
  await expect(page.getByText('Le bien à assurer est situé')).toBeVisible();
  await page.getByPlaceholder('rue de la gare, ...').click();
  await page.getByPlaceholder('rue de la gare, ...').fill('3 rue de l\'impasse');
  await page.getByRole('option', { name: 'L’Oasis 83580 Gassin' }).click();
  await page.getByRole('button', { name: 'Suivant' }).click();
  await expect(page.getByRole('heading', { name: 'Questions complémentaires' })).toBeVisible();
  await page.getByLabel('En tant que locataire, je suis').selectOption('locataireMeuble');
  await page.getByRole('button', { name: 'Suivant' }).click();
  await expect(page.getByRole('heading', { name: 'Antécédents' })).toBeVisible();
  await page.getByRole('button', { name: 'Oui' }).first().click();
  await page.getByRole('button', { name: 'moins d\'un an' }).click();
  await page.getByLabel('Je souhaite être assuré(e) à').fill('2026-01-01');
  await page.getByRole('button', { name: 'Non' }).nth(1).click();
  await page.getByRole('button', { name: 'Non' }).nth(2).click();
  await page.getByRole('button', { name: 'Suivant' }).click();
  await page.getByLabel('Ma date de naissance est le').fill('1990-01-01');
  await page.getByRole('button', { name: 'Non' }).click();
  await page.getByPlaceholder('rue de la gare, ...').click();
  await page.getByPlaceholder('rue de la gare, ...').fill('1 rue de la tra');
  await page.getByRole('option', { name: '1 Rue la Traverse 34480' }).click();
  await page.getByRole('button', { name: 'Suivant' }).click();
};