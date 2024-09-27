export function getVendor(product: string): string | undefined {
  switch (product) {
      case 'auto':
          return 'wtw';
      case 'mrh':
          return 'carene';
      default:
          return undefined; // Explicitly return undefined for unhandled cases
  }
}

export function getBaseUrl(env: string): string | undefined {
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
          return undefined; // Explicitly return undefined for unhandled cases
  }
}
