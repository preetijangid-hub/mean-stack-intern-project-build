# Day 27 - TaskFlow Live CRUD

Completely new standalone folder. It does not use Day 25/26 source files.

Features: JWT register/login, route guard, live GET/POST/PUT/DELETE tasks, loading states, error states, refresh and logout.

## API

```powershell
cd api
npm install
Copy-Item .env.example .env
# edit .env with MongoDB Atlas URI and JWT_SECRET
npm run dev
```

## Client (second terminal)

```powershell
cd taskflow-client
npm install
npm start
```

Open http://localhost:4200

## Deployment later
Deploy `api` as a Node service and `taskflow-client` as an Angular static site. After the API is deployed, change `taskflow-client/src/environments/environment.ts` to the live API base URL and build again.
