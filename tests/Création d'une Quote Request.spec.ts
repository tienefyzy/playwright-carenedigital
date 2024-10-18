import { test } from '@playwright/test';
import { createPersonInEdeal, createOpportunityAndQuoteRequest } from './utils';

test('Create person and opportunity', async () => {
    // Créer une personne dans EDEAL et obtenir le bean_id
    const bean_id_person = await createPersonInEdeal();
    console.log('Person created with bean_id:', bean_id_person);

    // Utiliser le bean_id pour créer une opportunité et une demande de devis
    await createOpportunityAndQuoteRequest('DIRECT', bean_id_person);
});