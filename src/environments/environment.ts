export const environment = {
  isProduction: true,
  baseUrl: new URL(window.location.origin),
  // baseUrl: new URL('https://p.villsource.tk'),
  authIssuer: window.location.origin + '/api/auth/v2'
};
