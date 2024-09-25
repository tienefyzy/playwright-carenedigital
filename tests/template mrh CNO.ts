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

export const cnoMrhTest = async ({ page, baseUrl, vendor, device }: { page: Page, baseUrl: string, vendor: string, device: string }) => {
  await page.goto(`${baseUrl}${vendor}/mrh/parcours/quote/`);
  await expect(page.getByLabel('Decline cookies')).toBeVisible();
  await page.getByLabel('Decline cookies').click();
  await expect(page.getByRole('heading', { name: 'Assurance habitation' })).toBeVisible();
  await expect(page.getByText('Je souhaite assurer')).toBeVisible();
  await page.getByRole('button', { name: 'Un bien donné en location' }).click();
  await page.getByRole('button', { name: 'Un loft' }).click();
  await page.getByRole('button', { name: 'Suivant' }).click();
  await expect(page.getByText('Le nombre de pièces à assurer')).toBeVisible();
  await page.getByLabel('Le nombre de pièces à assurer').selectOption('7');
  await page.getByRole('button', { name: 'Suivant' }).click();
  await expect(page.getByText('Je loue mon bien en meublé ?')).toBeVisible();
  await page.getByRole('button', { name: 'Oui' }).click();
  await expect(page.getByText('Je souhaite assurer mon')).toBeVisible();
  await page.getByRole('button', { name: 'Oui' }).nth(1).click();
  await page.getByRole('button', { name: 'Suivant' }).click();
  await expect(page.getByRole('heading', { name: 'Coordonnées' })).toBeVisible();
  await page.getByLabel('Civilité').selectOption('MME');
  await page.getByLabel('Nom', { exact: true }).click();
  await page.getByLabel('Nom', { exact: true }).fill('MASCARPONE');
  await page.getByLabel('Nom', { exact: true }).press('Tab');
  await page.getByLabel('Prénom').fill('Irène');
  await page.getByLabel('E-mail').click();
  await page.getByLabel('E-mail').fill('geronimo@yopmail.com');
  await page.getByLabel('Votre numéro de téléphone').click();
  await page.getByLabel('Votre numéro de téléphone').fill('0613371337');
  await page.getByRole('button', { name: 'Suivant' }).click();
  await expect(page.getByRole('heading', { name: 'Notre proposition tarifaire' })).toBeVisible();
  await page.getByRole('button', { name: 'Suivant' }).click();
  await expect(page.getByRole('heading', { name: 'Mon habitation' })).toBeVisible();
  await expect(page.getByText('Parmi les pièces à assurer,')).toBeVisible();
  await page.getByLabel('Parmi les pièces à assurer,').selectOption('0');
  await page.getByRole('button', { name: 'Suivant' }).click();
  await expect(page.getByText('Le bien à assurer est situé')).toBeVisible();
  await page.getByPlaceholder('rue de la gare, ...').click();
  await page.getByPlaceholder('rue de la gare, ...').fill('1 rue ');
  await page.getByRole('option', { name: 'Rue Lecourbe 75015 Paris' }).click();
  await page.getByRole('button', { name: 'Suivant' }).click();
  await expect(page.getByRole('heading', { name: 'Questions complémentaires' })).toBeVisible();
  await expect(page.getByText('Je suis')).toBeVisible();
  await page.getByLabel('Je suis').selectOption('etudiant');
  await page.getByRole('button', { name: 'Suivant' }).click();
  await expect(page.getByRole('heading', { name: 'Antécédents' })).toBeVisible();
  await expect(page.getByText('Je suis déjà assuré(e) pour')).toBeVisible();
  await page.getByRole('button', { name: 'Oui' }).first().click();
  await page.getByRole('button', { name: 'un an et plus' }).click();
  await page.getByRole('button', { name: 'Oui' }).nth(1).click();
  await expect(page.getByText('Au cours des 2 dernières anné')).toBeVisible();
  await page.getByRole('button', { name: 'Non' }).nth(2).click();
  await page.getByRole('button', { name: 'Oui' }).nth(2).click();
  await page.getByRole('button', { name: '1' }).click();
  await expect(page.getByText('Combien de sinistres avez-')).toBeVisible();
  await expect(page.getByText('Faites-vous l\'objet d\'une')).toBeVisible();
  await page.getByRole('button', { name: 'Non' }).nth(3).click();
  await page.getByRole('button', { name: 'Suivant' }).click();
  await page.getByLabel('Ma date de naissance est le').fill('2000-01-01');
  await expect(page.getByText('L\'adresse concernant votre')).toBeVisible();
  await expect(page.getByText('Souhaitez vous utiliser cette')).toBeVisible();
  await page.getByRole('button', { name: 'Oui' }).click();
  await page.getByRole('button', { name: 'Suivant' }).click();
};