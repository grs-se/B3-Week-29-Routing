# 🛑 Angular Challenge: Prevent Accidental Navigation with CanDeactivate Guard

## 🎯 Objective
Create a form-driven Angular app where users are **prompted before navigating away** from a form with unsaved changes.

---

## 🧩 What You'll Build

1. A **FormComponent** with a simple input field.
2. A **CanDeactivate Guard** to warn before leaving the form.
3. A **Deactivation Interface** for reusable logic.
4. Route setup that applies the guard on the form route.
5. A **HomeComponent** to navigate between routes.

---

## ✅ Prerequisites

- Angular CLI installed
- Familiarity with routing and forms in Angular

---

## 🏗 Steps

### 1️⃣ Create a New Angular App

```bash
ng new deactivate-guard-challenge --routing
cd deactivate-guard-challenge
```

---

### 2️⃣ Generate Components

```bash
ng generate component form
ng generate component home
```

---

### 3️⃣ Create the Deactivation Interface

**`can-deactivate.interface.ts`**

```ts
export interface CanComponentDeactivate {
  canDeactivate: () => boolean | Observable<boolean>;
}
```

---

### 4️⃣ Implement canDeactivate in FormComponent

**`form.component.ts`**

```ts
import { Component } from '@angular/core';
import { CanComponentDeactivate } from '../can-deactivate.interface';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements CanComponentDeactivate {
  unsavedChanges = true;

  canDeactivate(): boolean {
    return !this.unsavedChanges || confirm('You have unsaved changes. Leave anyway?');
  }
}
```

**`form.component.html`**

```html
<h2>Form Page</h2>
<input type="text" placeholder="Enter something..." (input)="unsavedChanges = true">
```

---

### 5️⃣ Generate and Implement the Guard

```bash
ng generate guard deactivate
```

**`deactivate.guard.ts`**

```ts
import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { CanComponentDeactivate } from './can-deactivate.interface';

@Injectable({ providedIn: 'root' })
export class DeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
  canDeactivate(component: CanComponentDeactivate): boolean {
    return component.canDeactivate();
  }
}
```

---

### 6️⃣ Setup Routing with the Guard

**`app-routing.module.ts`**

```ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './form/form.component';
import { HomeComponent } from './home/home.component';
import { DeactivateGuard } from './deactivate.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'form', component: FormComponent, canDeactivate: [DeactivateGuard] },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
```

---

### 7️⃣ Add Navigation UI

**`home.component.html`**

```html
<h2>Home</h2>
<a routerLink="/form">Go to Form</a>
```

**`app.component.html`**

```html
<nav>
  <a routerLink="/home">Home</a> |
  <a routerLink="/form">Form</a>
</nav>
<router-outlet></router-outlet>
```

---

## 🧪 Test the Guard

1. Go to `/form`
2. Type something in the input field
3. Navigate to `/home`
4. You should see a prompt: “You have unsaved changes...”

---

## 💡 Bonus Ideas

- Store form state in a service
- Improve prompt with a custom modal
- Reuse the interface for multiple components

---

Avoid accidental form loss like a pro! 🧠📝