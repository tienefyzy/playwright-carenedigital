import { test, expect } from '@playwright/test';
import testData from './testData.json';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();
const FRONT_QUOTE_REQUEST_URL = process.env.FRONT_QUOTE_REQUEST_URL!;
const USER_PASSWORD = process.env.USER_PASSWORD!;

test('test', async ({ page }) => {
  await page.goto(`${FRONT_QUOTE_REQUEST_URL}`);
  await expect(page.getByRole('heading', { name: 'Carene Back' })).toBeVisible();
  await page.getByRole('button', { name: 'Connexion' }).click();
  await page.getByPlaceholder('Email, phone, or Skype').click();
  await page.getByPlaceholder('Email, phone, or Skype').fill('user-e2e@yzydigital.com');
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill(`${USER_PASSWORD}`);
  await page.getByRole('button', { name: 'Sign in' }).click();
});