/**
 * Development environment (swapped in for `ng serve` / development builds
 * via the `fileReplacements` entry in angular.json).
 *
 * By default the dev server talks to the same deployed Render API, which
 * allows any localhost origin (CORS `*`), so the app works on whatever
 * port `ng serve` picks. To run against a locally started backend
 * (Day-25/28 `api` project, PORT=5000), point `apiUrl` at
 * http://localhost:5000/api and restart the dev server.
 */
export const environment = {
  production: false,
  apiUrl: 'https://capstone-9pn7.onrender.com/api',
};
