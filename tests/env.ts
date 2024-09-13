export function getBaseUrl(env : any): string {
  switch (env) {
    case 'local':
      return 'http://localhost:3000';
    case 'dev':
      return 'https://dev.parcours.carene.fr';
    case 'staging':
      return 'https://staging.parcours.carene.fr';
    default:
      throw new Error(`Unknown environment: ${env}`);
  }
}
