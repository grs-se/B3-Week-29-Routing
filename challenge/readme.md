# 🚀 Angular Routing + Auth & Deactivation Guards

## 🏁 Objective
Build a feature-rich Angular app that demonstrates **routing**, **programmatic navigation**, **route parameters**, **Auth Guards (CanActivate)**, and **Deactivation Guards (CanDeactivate)**.

---

## 🧩 What You'll Build

1. Multiple components: Home, About, Dashboard, Product, and Form.
2. Navigation via links and programmatic routing.
3. Dynamic route parameters for product pages.
4. AuthGuard to protect the dashboard.
5. DeactivateGuard to prevent data loss on the form.
6. A complete and interactive routing setup.

---

## 🧰 Prerequisites

- Angular CLI installed
- Basic Angular experience

---

## 🛠 Steps

### 1️⃣ Create a New Angular Project

```bash
ng new routing-challenge --routing
cd routing-challenge
```

---

### 2️⃣ Generate Components

```bash
ng generate component home
ng generate component about
ng generate component dashboard
ng generate component product
ng generate component form
```

---

### 3️⃣ Setup Navigation UI

**`app.component.html`**

```html
<nav>
  <a routerLink="/home">Home</a> |
  <a routerLink="/about">About</a> |
  <a routerLink="/dashboard">Dashboard</a> |
  <a routerLink="/product/42">Product</a> |
  <a routerLink="/form">Form</a>
</nav>
<router-outlet></router-outlet>
```

---

### 4️⃣ Setup Routes

**`app-routing.module.ts`**

```ts
const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'product/:id', component: ProductComponent },
  { path: 'form', component: FormComponent, canDeactivate: [DeactivateGuard] },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];
```

---

### 5️⃣ Add Programmatic Navigation (e.g., after login)

**`home.component.ts`**

```ts
constructor(private router: Router) {}

goToDashboard() {
  this.router.navigate(['/dashboard']);
}
```

**`home.component.html`**

```html
<h2>Welcome Home</h2>
<button (click)="goToDashboard()">Login & Go to Dashboard</button>
```

---

### 6️⃣ Access Route Parameters

**`product.component.ts`**

```ts
constructor(private route: ActivatedRoute) {}

ngOnInit() {
  const productId = this.route.snapshot.paramMap.get('id');
  console.log("Product ID:", productId);
}
```

**Example URL**: `/product/42` will log `Product ID: 42`

---

### 7️⃣ Auth Guard (CanActivate)

```bash
ng generate guard auth
```

**`auth.guard.ts`**

```ts
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  canActivate(): boolean {
    return confirm('Are you logged in?');
  }
}
```

---

### 8️⃣ Deactivation Guard Setup

#### Step 1: Interface

**`can-deactivate.interface.ts`**

```ts
export interface CanComponentDeactivate {
  canDeactivate: () => boolean | Observable<boolean>;
}
```

#### Step 2: Implement in FormComponent

**`form.component.ts`**

```ts
export class FormComponent implements CanComponentDeactivate {
  unsavedChanges = true;

  canDeactivate(): boolean {
    return !this.unsavedChanges || confirm('You have unsaved changes. Leave anyway?');
  }
}
```

#### Step 3: Guard Implementation

```bash
ng generate guard deactivate
```

**`deactivate.guard.ts`**

```ts
@Injectable({ providedIn: 'root' })
export class DeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
  canDeactivate(component: CanComponentDeactivate): boolean {
    return component.canDeactivate();
  }
}
```

---

### 9️⃣ Bonus UI for Form

**`form.component.html`**

```html
<h2>Form Page</h2>
<input type="text" placeholder="Enter some text..." (input)="unsavedChanges = true">
```

---

## 🧪 Final Test Checklist

- ✅ Can navigate with `<a routerLink>`
- ✅ Navigates programmatically with `.navigate()`
- ✅ Product page accepts a dynamic ID
- ✅ Dashboard is protected (user must confirm login)
- ✅ Form prompts before leaving if unsaved

---

## 💡 Optional Extensions

- Add login/logout feature with route state management.
- Replace confirm boxes with custom modal dialogs.
- Group routes and explore `canActivateChild`, `canLoad`.

---
