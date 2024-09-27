import { sharedTest } from '../template MRH';
import { claMrh } from '../template MRH';
import * as path from 'path';
import { getBaseUrl } from '../env';
import { getVendor } from '../env';

// Get the folder name dynamically
const currentDir = path.basename(__dirname);
const parentFolderName = path.basename(path.dirname(__dirname));

const environment = currentDir
const baseUrl = getBaseUrl(environment);
const device = grandparentFolderName;

let vendor;
if(environment == 'local')
{
  vendor = ''
}
else
{
  vendor = '/' + parentFolderName
}

sharedTest.use({ baseUrl: baseUrl });
sharedTest.use({ vendor: vendor });

sharedTest(`${parentFolderName} mrh ${device} ${environment} test`, async ({ page, baseUrl, vendor, device }) => {
  await claMrhTest({ page, baseUrl, vendor, device });
  // Add any additional steps or override steps here if necessary
});