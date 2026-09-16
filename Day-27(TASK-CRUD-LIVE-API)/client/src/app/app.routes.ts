import { Routes } from "@angular/router";

import { Login } from "./pages/login/login";
import { Register } from "./pages/register/register";
import { Dashboard } from "./pages/dashboard/dashboard";
import { authGuard } from "./guards/auth.guard";

export const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "login" },
  { path: "login", component: Login },
  { path: "register", component: Register },
  { path: "dashboard", component: Dashboard, canActivate: [authGuard] },
  { path: "tasks", component: Dashboard, canActivate: [authGuard] },
  { path: "**", redirectTo: "login" },
];
