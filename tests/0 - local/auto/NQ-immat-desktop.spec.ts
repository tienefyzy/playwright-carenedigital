import * as path from 'path';
import { getBaseUrl, getVendor } from '../../env';
import { sharedTest } from '../../template auto';
import { Test } from '../../template auto';

// Get the environment
const product = path.basename(__dirname)
const environment = path.basename(path.basename(__dirname)).replace(/^\d+\s*-\s*/, '');
const baseUrl = getBaseUrl(environment); // "https://dev.parcours.carene.fr"
console.log(environment);

// Get the business use case
const filename = path.basename(__filename); // Extracts just the filename
const parts = filename.split('-'); // Now split the filename

// Make sure to remove the file extension before splitting
const [journey, useCase, device] = parts.map(part => part.split('.')[0]); // Extracting the part and ignoring the extension
console.log("Product:", product);  // Should log "auto"
console.log("Journey:", journey);  // Should log "FQ"
console.log("Use Case:", useCase);  // Should log "immat"
console.log("Device:", device);    // Should log "desktop"
const vendor = '';

//local tests don't have vendor in URL
if(environment != 'local')
{
    const vendor = getVendor(product);
}

sharedTest.use({ baseUrl: baseUrl, vendor: vendor, useCase: useCase, device: device, product: product, journey: journey });

sharedTest(`${environment} ${vendor} ${product} ${journey} ${useCase} ${device}`, async ({ page, baseUrl, vendor, product, journey, useCase, device }) => {
    console.log("Running the test with:", { baseUrl, vendor, product, journey, useCase, device });
    await Test({ page, baseUrl, vendor, product, journey, useCase, device });
    // Add any additional steps or override steps here if necessary
});