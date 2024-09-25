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
  await page.goto(`${baseUrl}${vendor}/mrh/parcours/quote/`);
  await expect(page.getByLabel('Decline cookies')).toBeVisible();
  await page.getByLabel('Decline cookies').click();
  await expect(page.getByRole('heading', { name: 'Assurance habitation' })).toBeVisible();
  await expect(page.getByText('Je souhaite assurer')).toBeVisible();
  await page.getByRole('button', { name: 'Ma résidence principale' }).click();
  await expect(page.getByText('C\'est')).toBeVisible();
  await page.getByRole('button', { name: 'Un appartement' }).click();
  await expect(page.getByText('Dont je suis')).toBeVisible();
  await page.getByRole('button', { name: 'Locataire' }).click();
  await page.getByRole('button', { name: 'Suivant' }).click();
  await expect(page.getByText('Le nombre de pièces à assurer')).toBeVisible();
  await page.getByLabel('Le nombre de pièces à assurer').selectOption('5');
  await expect(page.getByText('Code postal')).toBeVisible();
  await page.getByPlaceholder('Code postal, nom de la ville').click();
  await page.getByPlaceholder('Code postal, nom de la ville').fill('75001');
  await page.getByRole('option', { name: '- Paris 1er Arrondissement' }).click();
  await page.getByRole('button', { name: 'Suivant' }).click();
  await expect(page.getByRole('heading', { name: 'Coordonnées' })).toBeVisible();
  await page.getByLabel('Civilité').selectOption('M.');
  await page.getByLabel('Nom', { exact: true }).click();
  await page.getByLabel('Nom', { exact: true }).fill('PROVOLONE');
  await page.getByLabel('Nom', { exact: true }).press('Tab');
  await page.getByLabel('Prénom').fill('Jean-Robert');
  await page.getByLabel('E-mail').click();
  await page.getByLabel('E-mail').fill('geronimo@yopmail.com');
  await page.getByLabel('Votre numéro de téléphone').click();
  await page.getByLabel('Votre numéro de téléphone').fill('0613371337');
  await page.getByRole('button', { name: 'Suivant' }).click();
  await expect(page.getByRole('heading', { name: 'Notre proposition tarifaire' })).toBeVisible();
  await page.getByRole('button', { name: 'Suivant' }).click();
  await expect(page.getByText('Parmi les pièces à assurer,')).toBeVisible();
  await page.getByLabel('Parmi les pièces à assurer,').selectOption('2');
  await page.getByRole('button', { name: 'Suivant' }).click();
  await expect(page.getByText('Le bien à assurer est situé')).toBeVisible();
  await page.getByPlaceholder('rue de la gare, ...').click();
  await page.getByPlaceholder('rue de la gare, ...').fill('1 rue de la gare');
  await page.getByRole('option', { name: 'Rue de la Gare 14000 Caen' }).click();
  await page.getByRole('button', { name: 'Moins de 10 ans' }).click();
  await page.getByRole('button', { name: 'Rez-de-chaussée' }).click();
  await page.getByRole('button', { name: 'Non' }).click();
  await page.getByRole('button', { name: 'Non' }).nth(1).click();
  await page.getByLabel('Je souhaite que les biens pré').selectOption('25000');
  await page.getByLabel('Le montant de mes objets de').selectOption('2500');
  await page.getByRole('button', { name: 'Suivant' }).click();
  await page.getByLabel('Je suis').selectOption('usufruitier');
  await expect(page.getByText('Je suis', { exact: true })).toBeVisible();
  await page.getByLabel('Je suis', { exact: true }).selectOption('ceo');
  await page.getByRole('button', { name: 'Suivant' }).click();
  await page.getByRole('button', { name: 'Non' }).first().click();
  await page.getByRole('button', { name: 'Oui' }).first().click();
  await page.getByRole('button', { name: 'un an et plus' }).click();
  await page.getByRole('button', { name: 'Oui' }).nth(1).click();
  await page.getByRole('button', { name: 'Non' }).nth(2).click();
  await page.getByRole('button', { name: 'Non' }).nth(3).click();
  await page.getByRole('button', { name: 'Suivant' }).click();
  await page.getByLabel('Ma date de naissance est le').fill('2000-01-01');
  await page.getByRole('button', { name: 'Suivant' }).click();
};