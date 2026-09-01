/**
 * Global application environment (used for production builds).
 *
 * `apiUrl` points at the deployed TaskFlow REST API (Render).
 * Secrets (MongoDB URI, JWT secret) live only in the backend's
 * environment variables on Render — never in this frontend repository.
 */
export const environment = {
  production: true,
  apiUrl: 'https://capstone-9pn7.onrender.com/api',
};
