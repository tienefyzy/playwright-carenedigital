import { test } from '@playwright/test';
import { createPersonInEdeal, createOpportunityAndQuoteRequest } from './utils';
import testData from './testData.json';

test('Create person and opportunity', async () => {
    await createOpportunityAndQuoteRequest('DIRECT', testData.bean_id_person);
});