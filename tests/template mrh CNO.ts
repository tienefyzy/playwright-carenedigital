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
  await page.goto(`${baseUrl}${vendor}/mrh/parcours/quote`);
  await page.goto(`${baseUrl}${vendor}/mrh/parcours/quote/choixHabitation`);
  await expect(page.getByLabel('Decline cookies')).toBeVisible();
  await page.getByLabel('Decline cookies').click();
  await expect(page.getByRole('heading', { name: 'Assurance habitation' })).toBeVisible();
  await expect(page.getByText('Je souhaite assurer ?')).toBeVisible();
  await page.getByRole('button', { name: 'Un bien donné en location' }).click();
  await expect(page.getByText('Type de bien')).toBeVisible();
  await page.getByRole('button', { name: 'Un loft' }).click();
  await page.getByRole('button', { name: 'Suivant' }).click();
  await expect(page.getByRole('heading', { name: 'Nombre de pièces à assurer' })).toBeVisible();
  await page.getByLabel('', { exact: true }).selectOption('5');
  await page.getByRole('button', { name: 'Suivant' }).click();
  await expect(page.getByRole('heading', { name: 'Je loue mon bien en meublé ?' })).toBeVisible();
  await page.getByRole('button', { name: 'Oui' }).click();
  await expect(page.getByText('Je souhaite assurer mon')).toBeVisible();
  await page.getByRole('button', { name: 'Oui' }).nth(1).click();
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
  await page.getByRole('button', { name: 'Suivant' }).click();
  await expect(page.getByRole('heading', { name: 'Mon habitation' })).toBeVisible();
  await expect(page.getByText('Parmi ces pièces, combien')).toBeVisible();
  await page.getByLabel('Parmi ces pièces, combien').selectOption('3');
  await page.getByRole('button', { name: 'Suivant' }).click();
  await expect(page.getByText('Le bien à assurer est situé')).toBeVisible();
  await page.getByPlaceholder('rue de la gare, ...').click();
  await page.getByPlaceholder('rue de la gare, ...').fill('5 rue de la gare');
  await page.getByRole('option', { name: 'Rue de la Gare 97490 Saint-Denis' }).click();
  await page.getByRole('button', { name: 'Suivant' }).click();
  await expect(page.getByRole('heading', { name: 'Questions complémentaires' })).toBeVisible();
  await expect(page.getByText('Je suis')).toBeVisible();
  await page.getByRole('button', { name: 'employé(e)' }).click();
  await page.getByRole('button', { name: 'Suivant' }).click();
  await page.getByRole('button', { name: 'Non' }).first().click();
  await page.getByLabel('Je souhaite être assuré(e) à').fill('2025-01-01');
  await page.getByRole('button', { name: 'Non' }).nth(1).click();
  await page.getByRole('button', { name: 'Non' }).nth(2).click();
  await expect(page.getByRole('heading', { name: 'Antécédents' })).toBeVisible();
  await page.getByRole('button', { name: 'Suivant' }).click();
  await page.getByLabel('Ma date de naissance est le').fill('1980-01-10');
  await page.getByRole('button', { name: 'Non' }).first().click();
  await page.locator('div:nth-child(4) > .chakra-form-control').click();
  await page.getByLabel('Dans la ville de').fill('Montréal');
  await page.getByRole('button', { name: 'Oui' }).nth(1).click();
  await page.getByRole('button', { name: 'Suivant' }).click();
  await expect(page.getByRole('heading', { name: 'Notre proposition tarifaire' })).toBeVisible();
};