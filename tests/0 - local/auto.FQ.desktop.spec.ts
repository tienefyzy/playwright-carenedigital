import { sharedTest } from '../template auto';
import { Test } from '../template auto';
import * as path from 'path';
import { getBaseUrl } from '../env';
import { getVendor } from '../env';


// Get the environment
const environment = path.basename(__dirname).replace(/^\d+\s*-\s*/, '');
const baseUrl = getBaseUrl(environment);
console.log(environment);

// Get the business use case
const parts = __filename.split('.');
const product = parts[0];  // "auto"
const journey = parts[1];  // "FQ"
const device = parts[2];   // "desktop"
const vendor = getVendor(product)

sharedTest.use({ baseUrl: baseUrl });
sharedTest.use({ vendor: vendor });

sharedTest(`${environment} ${vendor} ${product} ${journey} ${device}`, async ({ page, baseUrl, vendor, device, journey }) => {
  await Test({ page, baseUrl, vendor, device, journey });
  // Add any additional steps or override steps here if necessary
});