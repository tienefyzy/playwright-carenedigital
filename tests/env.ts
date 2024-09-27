export function getVendor(product : any): string {
  switch (product) {
    case 'auto':
      return 'wtw';
    case 'mrh':
      return 'carene';
    default:
      throw new Error(`Unknown product: ${product}`);
  }
}

export function getBaseUrl(env : any): string {
  switch (env) {
    case 'local':
      return 'http://localhost:3000';
    case 'dev':
      return 'https://dev.parcours.carene.fr';
    case 'staging':
      return 'https://staging.parcours.carene.fr';
    case 'preprod':
      return 'https://preprod.parcours.carene.fr';
    case 'prod':
      return 'https://parcours.carene.fr';
    default:
      throw new Error(`Unknown environment: ${env}`);
  }
}