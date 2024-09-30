import { test, expect, Page } from '@playwright/test';

type TestParams = {
  baseUrl: string;
  vendor: string;
  journey: string;
  useCase: string;
  device: string;
  product: string;
};

export const sharedTest = test.extend<TestParams>({
  baseUrl: '',
  vendor: '',
  product: '',
  journey: '',
  useCase: '',
  device: '',
});

export const Test = async ({ page, baseUrl, vendor, product, journey, useCase, device }: { page: Page, baseUrl: string, vendor: string, product: string, journey: string, useCase: string, device: string }) => {
  if(journey == 'FQ')
  {
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
  }
  else
  {
    await page.goto(`${baseUrl}${vendor}/auto/parcours`);
    await page.goto(`${baseUrl}${vendor}/auto/parcours/nq/vehicule`);
    await page.getByLabel('Decline cookies').click();
    if(device == 'desktop')
    {
      await expect(page.locator('li').filter({ hasText: 'Assurance auto' })).toBeVisible();
    }
    await expect(page.getByRole('heading', { name: 'Recherche de votre véhicule' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Je recherche par marque' })).toBeVisible();
    await page.getByPlaceholder('AA-123-XX').click();
    await page.getByPlaceholder('AA-123-XX').fill('AY782HV');
    await page.getByPlaceholder('AA-123-XX').press('Enter');
    await expect(page.getByRole('heading', { name: 'Recherche de votre véhicule' })).toBeVisible();
    await expect(page.getByText('PEUGEOT - 308 - AY782HV')).toBeVisible();
    await expect(page.getByText('CC 2.0 HDI 16V SPORT PACK')).toBeVisible();
    await page.getByLabel('Selectionner').first().click();
    await expect(page.getByRole('heading', { name: 'Recherche de votre véhicule' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'CC 2.0 HDI 16V SPORT PACK' })).toBeVisible();
    await expect(page.getByText('Cabriolet')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Valider' })).toBeVisible();
    await page.getByRole('button', { name: 'Valider' }).click();
    await expect(page.getByRole('heading', { name: 'Acquisition du véhicule' })).toBeVisible();
    await page.getByRole('button', { name: 'Oui' }).click();
    await page.getByLabel('A quelle date avez-vous achet').fill('2024-01-01');
    await page.getByRole('button', { name: 'Oui' }).nth(1).click();
    await page.getByRole('button', { name: 'Non' }).nth(1).click();
    await page.getByRole('button', { name: 'Oui' }).nth(1).click();
    await expect(page.getByText('Loi Hamon')).toBeVisible();
    await page.getByRole('button', { name: 'Non' }).nth(1).click();
    await expect(page.getByText('Comment avez-vous acheté le v')).toBeVisible();
    await page.getByRole('button', { name: 'Au comptant' }).click();
    await page.getByRole('button', { name: 'Suivant' }).click();
    await expect(page.getByRole('heading', { name: 'Où garez-vous habituellement' })).toBeVisible();
    await page.getByRole('button', { name: 'Oui' }).click();
    await expect(page.getByText('Votre garage ou votre parking')).toBeVisible();
    await page.getByRole('button', { name: 'Oui' }).nth(1).click();
    await expect(page.getByText('Dans quelle ville garez-vous')).toBeVisible();
    await page.getByPlaceholder('Code postal, nom de la ville').click();
    await page.getByPlaceholder('Code postal, nom de la ville').fill('13100');
    await page.getByRole('option', { name: '- Le Tholonet' }).click();
    await page.getByRole('button', { name: 'Suivant' }).click();
    await page.getByRole('button', { name: 'En votre nom' }).click();
    await page.getByRole('button', { name: 'Suivant' }).click();
    await page.getByRole('button', { name: 'Vous êtes le seul conducteur' }).click();
    await page.getByRole('button', { name: 'Suivant' }).click();
    await page.getByLabel('Votre date de naissance').fill('1983-01-10');
    await expect(page.getByText(' date de naissance')).toBeVisible();
    await expect(page.getByText('Quelle est votre activité')).toBeVisible();
    await page.getByLabel('Quelle est votre activité').selectOption('5');
    await expect(page.getByText('Vous êtes titulaire d\'un')).toBeVisible();
    await page.getByRole('button', { name: 'Oui' }).click();
    await expect(page.getByText('Notre offre en ligne est ré')).toBeVisible();
    await expect(page.getByText('Votre date d\'obtention du')).toBeVisible();
    await page.getByLabel('Votre date d\'obtention du').fill('2002-01-01');
    await page.getByRole('button', { name: 'Suivant' }).click();
    await expect(page.getByRole('heading', { name: 'Complètez votre profil en' })).toBeVisible();
    await page.getByRole('button', { name: 'mois et plus' }).click();
    await expect(page.getByText('Depuis quand votre bonus est')).toBeVisible();
    await expect(page.getByText('Vous êtes assuré sans')).toBeVisible();
    await page.getByLabel('Vous êtes assuré sans').selectOption('36');
    await expect(page.getByText('Au cours des 36 derniers mois, avez-vous fait l\'objet d\'une résiliation par un')).toBeVisible();
    await page.getByRole('button', { name: 'Non' }).first().click();
    await expect(page.getByText('Le véhicule est-il utilisé')).toBeVisible();
    await page.getByRole('button', { name: 'Non' }).nth(1).click();
    await expect(page.getByText('Au cours des 36 derniers mois, avez-vous fait l\'objet de l\'un des évènements')).toBeVisible();
    await page.getByRole('button', { name: 'Aucun de ces évènements' }).click();
    await page.getByRole('button', { name: 'Suivant', exact: true }).click();
    await expect(page.getByRole('heading', { name: 'Combien de sinistres ont été' })).toBeVisible();
    await page.getByRole('button', { name: '0', exact: true }).click();
    await expect(page.getByText('Sont à comptabiliser l\'')).toBeVisible();
    await page.getByRole('button', { name: 'Suivant' }).click();
    await expect(page.getByRole('heading', { name: 'Précisez la nature de vos dé' })).toBeVisible();
    await page.getByRole('button', { name: 'Déplacements privés', exact: true }).click();
    await page.getByRole('button', { name: 'Suivant' }).click();
    await expect(page.getByRole('heading', { name: 'Êtes-vous amené à prêter' })).toBeVisible();
    await page.getByRole('button', { name: 'Non' }).click();
    await page.getByRole('button', { name: 'Suivant' }).click();
    await page.getByLabel('Civilité').selectOption('M.');
    await page.getByLabel('Nom', { exact: true }).click();
    await page.getByLabel('Nom', { exact: true }).fill('Provolone');
    await page.getByLabel('E-mail').click();
    await page.getByLabel('E-mail').fill('geronimo@yopmail.com');
    await page.getByLabel('Prénom').click();
    await page.getByLabel('Prénom').fill('Jean-Robert');
    await page.getByLabel('Votre numéro de téléphone').click();
    await page.getByLabel('Votre numéro de téléphone').fill('0613371337');
    await page.getByLabel('Votre employeur actuel').click();
    await page.getByLabel('Votre employeur actuel').fill('YZY');
    await page.getByPlaceholder('rue de la gare, ...').click();
    await page.getByPlaceholder('rue de la gare, ...').fill('1 rue de la');
    await page.getByRole('option', { name: '1 La Rue 50440 La Hague' }).click();
    await page.getByRole('button', { name: 'Suivant' }).click();
    await expect(page.getByRole('heading', { name: 'Choisissez votre formule' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Responsabilité Civile, Vol &' })).toBeVisible();
    await page.getByRole('button', { name: 'Choisir cette formule' }).nth(1).click();
  }
};