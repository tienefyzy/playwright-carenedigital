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
  
//Chargement

  await page.goto(`${baseUrl}${vendor}/mrh/parcours/quote/`);

//Cookies

  await expect(async () => {
    await expect(page.getByLabel('Decline cookies')).toBeVisible();
    }).toPass({
      timeout: 20000
    });
  await page.getByLabel('Decline cookies').click();

//Step 1 : choixHabitation

  await expect(page.getByRole('heading', { name: 'Votre situation' })).toBeVisible();

  await expect(page.getByText('Quel bien souhaitez-vous assurer ?')).toBeVisible();

  switch(journey)
  {
    case 'CLA':
      switch(useCase)
      {
        case 'appartement':
          await page.getByRole('button', { name: 'Une résidence secondaire' }).click();
          break;
        case 'maison':
          await page.getByRole('button', { name: 'Une résidence principale' }).click();
          break;
      }  
      break;
    case 'CNO':
      await page.getByRole('button', { name: 'Un bien donné en location' }).click();
      break;
    case 'PS':
      await page.getByRole('button', { name: 'Une résidence principale' }).click();
      break;
  }

  await expect(page.getByText('Il s\'agit de')).toBeVisible();

  switch(journey)
  {
    case 'CLA':
      switch(useCase)
      {
        case 'appartement':
          await page.getByRole('button', { name: 'Un appartement' }).click();
          break;
        case 'maison':
          await page.getByRole('button', { name: 'Une maison' }).click();
          break;
      }
      break;
    case 'CNO':
      await page.getByRole('button', { name: 'Un loft' }).click();
      break;
    case 'PS':
      await page.getByRole('button', { name: 'Un appartement' }).click();
      break;
  }
  
  switch(journey)
  {
    case 'CLA':
      await expect(page.getByText('Vous êtes')).toBeVisible();
      switch(useCase)
      {
        case 'appartement':
          await page.getByRole('button', { name: 'Locataire' }).click();
          break;
        case 'maison':
          await page.getByRole('button', { name: 'Propriétaire' }).click();
          break;
      }
      break;
    case 'PS':
      await expect(page.getByText('Vous êtes')).toBeVisible();
      await page.getByRole('button', { name: 'Locataire' }).click();
      break;
  }

  await page.getByRole('button', { name: 'Suivant' }).click();

//Step spécifique aux CNO

  if(journey == 'CNO')
  {
    await expect(page.getByRole('heading', { name: 'Votre situation' })).toBeVisible();

    await expect(page.getByText('Vous louez votre bien en meublé ?')).toBeVisible();

    switch(useCase)
    {
      case 'meuble':
        await page.getByRole('button', { name: 'Oui' }).click();
        break;
      case 'nonMeuble':
        await page.getByRole('button', { name: 'Non' }).click();
        break;
    }

    await page.getByRole('button', { name: 'Suivant' }).click();
  }

  

//Step 2 : nbPiecesStep

await expect(async () => {
  await expect(page.getByRole('heading', { name: 'Votre habitation' })).toBeVisible();
}).toPass({
  timeout: 10000
});
  

  await expect(page.getByText('Nombre de pièces')).toBeVisible();

  if(journey == 'PS')
  {
    await page.locator('select').selectOption('2');
  }
  else
  {
    await page.locator('select').selectOption('5');
  }

  if(journey == 'CLA')
  {
    await expect(page.getByText('Code postal')).toBeVisible();
    await page.getByPlaceholder('Code postal, nom de la ville').click();
    await page.getByPlaceholder('Code postal, nom de la ville').fill('75001');
    await page.getByRole('option', { name: '- Paris 1er Arrondissement' }).click();
  }

  await page.getByRole('button', { name: 'Suivant' }).click();

//Step 3 : coordonneesFQ

  await expect(page.getByRole('heading', { name: 'Vos coordonnées' })).toBeVisible();

  //await page.getByLabel('Civilité').selectOption('M.');
  await page.getByRole('combobox').selectOption('M.');

  //await page.getByLabel('Nom', { exact: true }).click();
  
  await page.getByRole('textbox').first().fill('FAIVRE');
  await page.getByRole('textbox').first().press('Tab');

  await page.getByRole('textbox').nth(1).fill('Thomas');
  await page.getByRole('textbox').nth(1).press('Tab');

  await page.locator('input[type="email"]').fill('geronimo@yopmail.com');

  await page.getByRole('textbox').nth(3).click();
  await page.getByRole('textbox').nth(3).fill('0613371337');
/*
  await page.getByRole('textbox').first().click();
  await page.getByRole('textbox').first().fill('FAIVRE');
  await page.getByRole('textbox').first().press('Tab');

  await page.getByLabel('Prénom').fill('Thomas');

  await page.getByLabel('E-mail').click();
  await page.getByLabel('E-mail').fill('geronimo@yopmail.com');

  await page.getByLabel('Numéro de téléphone').click();
  await page.getByLabel('Numéro de téléphone').fill('0613371337');
*/
  //await expect(page.getByText('J’accepte que mes données')).toBeVisible();
  await page.locator('label').filter({ hasText: 'J’accepte que mes données' }).locator('span').first().click();

  await page.getByRole('button', { name: 'Suivant' }).click();

//Step 4 : propositionTarifaire

  await expect(page.getByRole('heading', { name: 'Notre proposition tarifaire' })).toBeVisible();
  
  //Bouchon tarif
  await expect(async () => {
    await page.getByRole('button', { name: 'Suivant' }).click();
  }).toPass({
    timeout: 5000
  });
  

//Step 5 : questionsHabitation1

  await expect(page.getByRole('heading', { name: 'Quelques précisions' })).toBeVisible();
  
  await expect(page.getByText('Parmi les pièces à assurer,')).toBeVisible();

  if(journey == 'PS')
    {
      //await page.getByLabel('Parmi les pièces à assurer,').selectOption('0');
      await page.getByRole('combobox').selectOption('0');
    }
    else
    {
      //await page.getByLabel('Parmi les pièces à assurer,').selectOption('2');
      await page.getByRole('combobox').selectOption('2');
    }

  await page.getByRole('button', { name: 'Suivant' }).click();

//Step 6 : questionsHabitation2

  await expect(page.getByRole('heading', { name: 'Quelques précisions' })).toBeVisible();

  await expect(page.getByText('Le bien à assurer est situé')).toBeVisible();
  await page.getByPlaceholder('rue de la gare, ...').click();
  await page.getByPlaceholder('rue de la gare, ...').fill('1 rue de la gare');
  await page.getByRole('option', { name: 'Rue de la Gare 79000 Niort' }).click();

  if(journey == 'CLA')
  {
    await expect(page.getByText('Le bâtiment a')).toBeVisible();
    await page.getByRole('button', { name: 'Moins de 10 ans' }).click();

    if(useCase == 'appartement')
    {
      await expect(page.getByText('L\'appartement / loft se situe')).toBeVisible();
      await page.getByRole('button', { name: 'Rez-de-chaussée' }).click();
    }

    await expect(page.getByText('Votre habitation possède-t-')).toBeVisible();
    await page.getByRole('button', { name: 'Oui' }).click();
    await expect(page.getByText('Les dépendances se situent-')).toBeVisible();
    await page.getByRole('button', { name: 'Non' }).nth(1).click();
    await expect(page.getByText('La surface totale des dé')).toBeVisible();
    await page.getByRole('button', { name: 'Oui' }).nth(2).click();
    await expect(page.getByText('Quelle est la surface totale')).toBeVisible();
    //await page.getByLabel('Quelle est la surface totale').selectOption('101a200');
    await page.locator('select').selectOption('101a200');
    await expect(page.getByText('Quel nombre de dépendances')).toBeVisible();
    await page.getByRole('button', { name: '2', exact: true }).click();
    await expect(page.getByText('Quelle est l\'adresse de votre 1ère dépendance ?')).toBeVisible();
    await page.getByPlaceholder('rue de la gare, ...').nth(1).click();
    await page.getByPlaceholder('rue de la gare, ...').nth(1).fill('10 rue de la gare');
    await page.getByRole('option', { name: 'Rue de la Gare 79000 Niort' }).click();
    await page.getByPlaceholder('rue de la gare, ...').nth(2).click();
    await expect(page.getByText('Quelle est l\'adresse de votre 2ème dépendance ?')).toBeVisible();
    await page.getByPlaceholder('rue de la gare, ...').nth(2).click();
    await page.getByPlaceholder('rue de la gare, ...').nth(2).fill('20 rue de la gare');
    await page.getByRole('option', { name: 'Rue de la Gare 79000 Niort' }).click();

    if(useCase == 'maison')
    {
      await expect(page.getByText('Votre habitation est-elle équipée')).toBeVisible();
      await page.getByRole('button', { name: 'une cheminée avec foyer ferm' }).click();

      await expect(page.getByText('Votre cheminée a-t-elle été')).toBeVisible();
      await page.getByRole('button', { name: 'vous ne savez pas' }).click();

      await expect(page.getByText('Une piscine ?')).toBeVisible();
      await page.locator('div:nth-child(13) > .chakra-form-control > .css-1wx0u01 > button:nth-child(2)').click();

      await expect(page.getByText('Des panneaux solaires ou une')).toBeVisible();
      await page.locator('div:nth-child(14) > .chakra-form-control > .css-1wx0u01 > button').first().click();

      await expect(page.getByText('Un jardin ou un espace exté')).toBeVisible();
      await page.locator('div:nth-child(15) > .chakra-form-control > .css-1wx0u01 > button').first().click();
    }

    await expect(page.getByText('Un système d\'alarme ou de tél')).toBeVisible();
    await page.getByRole('button', { name: 'Alarme' }).click();

    await expect(page.getByText('Vous souhaitez que les biens')).toBeVisible();
    //await page.getByLabel('Vous souhaitez que les biens').selectOption('50000');
    await page.locator('div').filter({ hasText: /^Choisir\.\.\.25 000 €50 000 €75 000 €100 000 €$/ }).getByRole('combobox').selectOption('50000');
    
    await expect(page.getByText('Souhaitez-vous assurer vos objets')).toBeVisible();
    //await page.getByLabel('Souhaitez-vous assurer vos objets').selectOption('5000');
    await page.locator('div').filter({ hasText: /^Choisir\.\.\.NonOui, pour 5 000 € \(soit 10% de votre capital mobilier\)$/ }).getByRole('combobox').selectOption('5000');

  }

  await page.getByRole('button', { name: 'Suivant' }).click();

//Step 7 : questionsComplementaires

  await expect(page.getByRole('heading', { name: 'Questions complémentaires' })).toBeVisible();

  if(journey == 'CLA' && useCase == 'appartement')
  {
    await expect(page.getByText('En tant que locataire, vous ê')).toBeVisible();
    await page.getByLabel('En tant que locataire, vous ê').selectOption('usufruitier');
  }
  else if(journey == 'PS')
  {
    await expect(page.getByText('En tant que locataire, vous ê')).toBeVisible();
    await page.getByLabel('En tant que locataire, vous ê').selectOption('locataireMeuble');
  }

  if((journey == 'CLA') || (journey == 'CNO'))
  {
    await expect(page.getByText('Vous êtes', { exact: true })).toBeVisible();
    //await page.getByRole('combobox').selectOption('liberal');
    await page.getByLabel('Vous êtes', { exact: true }).selectOption('enseignant');
  }

  await expect(async () => {
    await page.getByRole('button', { name: 'Suivant' }).click();
  }).toPass();

//Step 8 : antecedents

  await expect(page.getByRole('heading', { name: 'Vos antécédents d\'assurance' })).toBeVisible();

  await expect(page.getByText('Êtes-vous déjà assuré(e) pour ce bien ?', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Oui' }).first().click();

  await expect(page.getByText('Vous avez souscrit votre contrat actuel depuis :', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'un an et plus' }).click();

  await expect(page.getByText('Souhaitez-vous résilier votre contrat actuel dans le cadre de la Loi Hamon ?', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Oui' }).nth(1).click();

  await expect(page.getByText('Au cours des 2 dernières années, avez-vous été responsable ou victime d\'un sinistre réglé ?', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Oui' }).nth(2).click();

  await expect(page.getByText('Combien de sinistre(s) réglé(s) avez-vous eu lors de ces 2 dernières années ?', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: '1' }).click();

  await expect(page.getByText('Au cours des 2 dernières années, avez-vous fait l\'objet d\'une suspension de garantie ou')).toBeVisible();
  await page.getByRole('button', { name: 'Non' }).nth(3).click();

  await expect(page.getByText('Au cours des 2 dernières années, avez-vous fait l\'objet d\'une résiliation par un précédent')).toBeVisible();
  await page.getByRole('button', { name: 'Non' }).nth(4).click();

  await page.getByRole('button', { name: 'Suivant' }).click();
  
//Step 9 : coordonneesFQ

  //await page.getByLabel('Ma date de naissance est le').fill('1983-07-16');
  await page.locator('input[type="date"]').fill('1983-07-16');

  if((journey == 'CNO')||(useCase == 'appartement')) //Le vrai critère est : CNO ou résidence secondaire
  {
    await expect(page.getByText('L\'adresse concernant votre habitation à assurer est :')).toBeVisible();
    await expect(page.getByText('Souhaitez vous utiliser cette adresse comme adresse postale')).toBeVisible();
    await expect(async () => {
      await page.getByRole('button', { name: 'Oui' }).click();
    }).toPass();
  }

  await page.getByRole('button', { name: 'Suivant' }).click();

};