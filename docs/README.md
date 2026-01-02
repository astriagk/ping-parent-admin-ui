# Ping Parent Admin UI

This project is an Angular-based admin UI for the Ping Parent platform. It is organized for scalability and maintainability, with a modular structure and shared resources for rapid development.

## Project Structure

```
root/
│  angular.json
│  package.json
│  tsconfig*.json
│  README.md
│
├─ docs/                # Documentation (this folder)
├─ src/
│   ├─ index.html
│   ├─ main.ts
│   ├─ styles.scss
│   └─ app/
│       ├─ app.module.ts
│       ├─ app-routing.module.ts
│       ├─ app.component.*
│       ├─ home/        # Home page modules
│       ├─ pages/       # Feature pages (login, register, blog, etc.)
│       ├─ shared/      # Shared modules, components, services, types
│       └─ shop/        # E-commerce/shop related modules
│
├─ assets/              # Static assets (images, fonts, css, scss)
```

### Key Folders

- **src/app/pages/**: Contains feature modules for each page (login, register, blog, etc.).
- **@shared/**: Shared resources:
  - `components/`: Reusable UI components (breadcrumb, header, footer, etc.)
  - `services/`: Shared Angular services
  - `types/`: TypeScript interfaces and types
  - `ui/`: UI utilities and widgets
- **src/app/shop/**: Shop and product-related modules and components.
- **src/app/home/**: Home page modules and components.

## State Management: Should You Use NgRx?

### When to Use NgRx (or Store Libraries)

- **Complex State**: If your app has complex, shared, or deeply nested state (e.g., user authentication, cart, global notifications).
- **Predictable State Flow**: When you want a single source of truth and time-travel debugging.
- **Scalability**: For large teams or apps with many developers, NgRx enforces best practices and maintainability.

### When Not to Use NgRx

- **Simple Apps**: If your state is mostly local to components or simple services suffice, NgRx may be overkill.
- **Learning Curve**: NgRx introduces boilerplate and a learning curve.

### Best Practice for This Project

- **Recommended**: Use NgRx for global state such as authentication, user profile, shopping cart, and notifications.
- **Services for Simplicity**: For isolated or simple state, Angular services with RxJS are sufficient.
- **Hybrid Approach**: Start with services, and migrate to NgRx as complexity grows.

## NgRx Store Integration

This project is compatible with NgRx for advanced state management. Below is a recommended structure for integrating NgRx into the existing codebase:

### Suggested NgRx Folder Structure

```
src/app/
  ├─ store/                # NgRx root state management
  │    ├─ actions/         # All NgRx actions
  │    ├─ reducers/        # All NgRx reducers
  │    ├─ effects/         # All NgRx effects (side effects, API calls)
  │    ├─ selectors/       # All NgRx selectors
  │    └─ app.state.ts     # Root state interface
  ├─ shared/services/      # Angular services (can interact with store)
  └─ ...
```

### How to Add NgRx

1. **Install NgRx packages:**
   ```sh
   npm install @ngrx/store @ngrx/effects @ngrx/entity @ngrx/store-devtools
   ```
2. **Create the `@store/` folder** in `src/app/` as shown above.
3. **Register StoreModule and EffectsModule** in `app.module.ts`:

   ```typescript
   import { StoreModule } from "@ngrx/store";
   import { EffectsModule } from "@ngrx/effects";
   import { reducers } from "@store/reducers";

   @NgModule({
     imports: [
       // ...existing imports
       StoreModule.forRoot(reducers),
       EffectsModule.forRoot([]),
     ],
   })
   export class AppModule {}
   ```

4. **Organize state by feature** (e.g., auth, cart, products) in the `@store/` folder.
5. **Use selectors and effects** for efficient state querying and side effects.

### Where to Use NgRx

- **Authentication**: Manage user login state, tokens, and profile.
- **Cart/Shop**: Store cart items, product lists, and checkout state.
- **Notifications**: Global alerts and messages.
- **Any shared/global state**: Anything accessed by multiple modules or components.

### Best Practices

- Keep business logic in effects and reducers, not components.
- Use selectors for all state access in components.
- Use Angular services for API calls, called from effects.

For more, see the [NgRx Documentation](https://ngrx.io/docs).

## Getting Started

1. **Install dependencies**
   ```sh
   npm install
   ```
2. **Run the app**
   ```sh
   ng serve
   ```
3. **Build for production**
   ```sh
   ng build --prod
   ```

## Running in Different Environments

### Development (uses `environment.dev.ts`)

- Start the app in dev mode:
  ```sh
  ng serve --configuration=dev
  ```
- The dev environment uses `apiUrl` and settings from `src/environments/environment.dev.ts`.

### Production

- Start or build the app for production:
  ```sh
  ng serve --configuration=production
  ng build --configuration=production
  ```
- The production environment uses `src/environments/environment.prod.ts`.

### How it works

- The `angular.json` file is configured to replace `environment.ts` with the correct file for each configuration.
- You can add more environment files and configurations as needed.

## Contributing

- Follow Angular style guide.
- Use shared modules/components for reusability.
- Write unit tests for new features.

## Further Reading

- [Angular Docs](https://angular.io/docs)
- [NgRx Docs](https://ngrx.io/docs)

---

For more details, see the code comments and explore the `src/app` folder for feature-specific logic.

---

### AuthService Usage with NgRx Effects

- AuthService is placed in `@shared/services/auth.service.ts`
- It is providedIn: 'root' for global access.
- Use it in effects for authentication API calls.
