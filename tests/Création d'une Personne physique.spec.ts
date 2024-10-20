import { test } from '@playwright/test';
import { createPersonInEdeal } from './utils';

test('Create person', async () => {
    // Créer une personne dans EDEAL et obtenir le bean_id
    const bean_id_person = await createPersonInEdeal();
    console.log('Person created with bean_id:', bean_id_person);
});