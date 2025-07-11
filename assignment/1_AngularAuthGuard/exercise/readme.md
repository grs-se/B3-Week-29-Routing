# 🔐 Angular Challenge: Route Protection Using CanActivate Guard

## 🎯 Objective
Build a secure Angular app where the **Dashboard** route is protected using a **CanActivate Auth Guard**. Users must confirm access before viewing the dashboard.

---

## 🧩 What You'll Build

1. A **LoginComponent** with a login button (fake login).
2. A **DashboardComponent** that's only accessible when confirmed.
3. An **AuthGuard** that prompts the user before navigation.
4. Route protection using `canActivate`.
5. A **NotFoundComponent** for unmatched routes.

---

## ✅ Prerequisites

- Angular CLI installed
- Understanding of basic Angular routing
- Familiarity with components and services

---

## 🏗 Steps

### 1️⃣ Create a New Angular App

```bash
ng new auth-guard-challenge --routing
cd auth-guard-challenge
```

---

### 2️⃣ Generate Components

```bash
ng generate component login
ng generate component dashboard
ng generate component not-found
```

---

### 3️⃣ Generate the Guard

```bash
ng generate guard auth
```

---

### 4️⃣ Implement the Auth Guard

**`auth.guard.ts`**

```ts
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  canActivate(): boolean {
    return confirm('Are you logged in?');
  }
}
```

✅ If the user confirms, the route loads; otherwise, navigation is cancelled.

---

### 5️⃣ Setup Routing in `app-routing.module.ts`

```ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

---

### 6️⃣ Build a Fake Login Page

**`login.component.html`**

```html
<h2>Login Page</h2>
<a routerLink="/dashboard">Go to Dashboard</a>
```

---

### 7️⃣ Create the Dashboard and NotFound Views

**`dashboard.component.html`**

```html
<h2>Welcome to the Dashboard</h2>
```

**`not-found.component.html`**

```html
<h2>404 - Page Not Found</h2>
<a routerLink="/login">Go Back</a>
```

---

## ✅ Test Your App

- Navigate to `/dashboard`
- The browser shows a confirmation prompt: "Are you logged in?"
- If you click "OK", you’re redirected to the dashboard.
- If you click "Cancel", you stay on the current route.
- Invalid URLs show the NotFound page.

---

## 💡 Bonus

- Store login state in a shared AuthService.
- Replace `confirm()` with custom modal or toast.
- Use a route guard to auto-redirect unauthenticated users.

---

Protect those routes like a pro! 🛡️🚀