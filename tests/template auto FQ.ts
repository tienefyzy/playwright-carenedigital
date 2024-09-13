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

export const fqAutoTest = async ({ page, baseUrl, vendor, device }: { page: Page, baseUrl: string, vendor: string, device: string }) => {
  await page.goto(`${baseUrl}${vendor}/auto/parcours`);
  await page.goto(`${baseUrl}${vendor}/auto/parcours/fq/vehicule`);
  await expect(page.getByLabel('Decline cookies')).toBeVisible();
  await page.getByLabel('Decline cookies').click();
  if(device == 'desktop')
  {
    await expect(page.locator('li').filter({ hasText: 'Assurance auto' })).toBeVisible();
  }
  await expect(page.locator('li').filter({ hasText: 'Vos informations' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Recherche de votre véhicule' })).toBeVisible();
  await expect(page.getByText('Comment souhaitez-vous')).toBeVisible();
  await page.getByPlaceholder('AA-123-XX').click();
  await page.getByPlaceholder('AA-123-XX').fill('AY782HV');
  await page.getByPlaceholder('AA-123-XX').press('Enter');
  await expect(page.getByRole('heading', { name: 'Recherche de votre véhicule' })).toBeVisible();
  await expect(page.getByText('PEUGEOT - 308 - AY782HV')).toBeVisible();
  await expect(page.locator('div').filter({ hasText: /^CC 2\.0 HDI 16V SPORT PACK$/ }).nth(2)).toBeVisible();
  await page.getByLabel('Selectionner').first().click();
  await expect(page.getByRole('heading', { name: 'CC 2.0 HDI 16V SPORT PACK' })).toBeVisible();
  await page.getByRole('button', { name: 'Valider' }).click();
  await expect(page.getByRole('heading', { name: 'Dans quelle ville garez-vous' })).toBeVisible();
  await page.getByPlaceholder('Code postal, nom de la ville').click();
  await page.getByPlaceholder('Code postal, nom de la ville').fill('13100');
  await page.getByRole('option', { name: '- Le Tholonet' }).click();
  await page.getByRole('button', { name: 'Suivant' }).click();
  await expect(page.getByRole('heading', { name: 'Informations sur le conducteur' })).toBeVisible();
  await expect(page.getByText('Votre date de naissance')).toBeVisible();
  await page.getByLabel('Votre date de naissance').fill('1983-01-01');
  await page.getByRole('button', { name: 'Suivant' }).click();
  await expect(page.getByText('Votre date d\'obtention du')).toBeVisible();
  await page.getByLabel('Votre date d\'obtention du').fill('2002-01-01');
  await page.getByRole('button', { name: 'Suivant' }).click();
  await expect(page.getByText('Votre bonus / malus')).toBeVisible();
  await expect(page.getByText('Il majore ou réduit votre')).toBeVisible();
  await page.getByRole('button', { name: 'Suivant' }).click();
  await expect(page.getByText('Depuis quand votre bonus est')).toBeVisible();
  await expect(page.getByRole('button', { name: 'mois et plus' })).toBeVisible();
  await page.getByRole('button', { name: 'mois et plus' }).click();
  await page.getByRole('button', { name: 'Suivant' }).click();
  await expect(page.getByRole('heading', { name: 'Vos coordonnées' })).toBeVisible();
  await page.getByLabel('Civilité').selectOption('M.');
  await page.getByLabel('Nom', { exact: true }).click();
  await page.getByLabel('Nom', { exact: true }).fill('Provolone');
  await page.getByLabel('Nom', { exact: true }).press('Tab');
  await page.getByLabel('Prénom').fill('Jean-Robert');
  await page.getByLabel('Prénom').press('Tab');
  await page.getByLabel('E-mail').fill('geronimo@yopmail.com');
  await page.getByLabel('E-mail').click();
  await page.getByLabel('Votre numéro de téléphone').click();
  await page.getByLabel('Votre numéro de téléphone').fill('0613371337');
  await page.getByLabel('Votre employeur actuel').click();
  await page.getByLabel('Votre employeur actuel').fill('Yzy');
  await page.locator('label').filter({ hasText: 'J’accepte que mes données' }).locator('span').first().click();
  await page.getByRole('button', { name: 'Suivant' }).click();
  await expect(page.getByRole('heading', { name: 'Votre estimation de tarif :' })).toBeVisible();
  await expect(page.getByText('Responsabilité Civile, Vol & Incendie65,41 €/ moisSoit 784,97 € / anChoisir')).toBeVisible();
};