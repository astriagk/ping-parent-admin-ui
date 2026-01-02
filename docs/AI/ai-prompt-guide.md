# AI Prompt Guide - Admin Feature Development

## Overview
This guide provides AI prompts and examples for developing admin-related features in the Ping Parent Admin UI application following the established NgRx architecture pattern.

## Table of Contents
1. [Quick Reference](#quick-reference)
2. [Creating New API Integrations](#creating-new-api-integrations)
3. [Feature Development Prompts](#feature-development-prompts)
4. [Common Use Cases](#common-use-cases)
5. [Best Practices](#best-practices)

---

## Quick Reference

### Project Structure
```
src/app/
├── admin/                          # Admin feature module
│   └── admin-list/                 # List component
│       ├── admin-list.component.ts
│       ├── admin-list.component.html
│       └── admin-list.component.scss
├── shared/
│   ├── constants/
│   │   └── api-endpoints.ts        # API endpoint constants
│   ├── services/
│   │   └── admin.service.ts        # Admin API service
│   ├── types/Pages/
│   │   └── admin.types.ts          # TypeScript interfaces
│   └── utils/
│       └── helpers.ts              # Utility functions
└── store/
    ├── actions/
    │   ├── admin.actions.ts        # NgRx actions
    │   └── admin.action-types.ts   # Action type constants
    ├── effects/
    │   └── admin.effects.ts        # Side effects
    ├── reducers/
    │   └── admin.reducer.ts        # State reducer
    └── selectors/
        └── admin.selectors.ts      # State selectors
```

### Architecture Pattern
```
Component → Dispatch Action → Effect → Service → API
                                ↓
                            Reducer → Selector → Component
```

---

## Creating New API Integrations

### Prompt Template: New GET Endpoint

```
Create a new API integration for [FEATURE_NAME] following the NgRx pattern used in the admin list feature.

API Details:
- Endpoint: [ENDPOINT_URL]
- Method: GET
- Response structure:
  {
    "success": boolean,
    "data": [DATA_STRUCTURE],
    "message"?: string,
    "error"?: string
  }

Requirements:
1. Create TypeScript interfaces in @shared/types/Pages/[feature].types.ts
2. Add endpoint constant to @shared/constants/api-endpoints.ts
3. Create service method in @shared/services/[feature].service.ts
4. Create NgRx actions (load, success, failure) in @store/actions/[feature].actions.ts
5. Create NgRx effect in @store/effects/[feature].effects.ts
6. Create reducer in @store/reducers/[feature].reducer.ts
7. Create selectors in @store/selectors/[feature].selectors.ts
8. Implement component integration with loading and error handling

Follow the same pattern as:
- @src/app/admin/admin-list/admin-list.component.ts
- @src/app/store/effects/admin.effects.ts
- @src/app/shared/services/admin.service.ts
```

### Example: Create Admin Detail Endpoint

```
Create a new API integration for fetching admin details by ID following the NgRx pattern.

API Details:
- Endpoint: /admin/:id
- Method: GET
- Response structure:
  {
    "success": boolean,
    "data": {
      "admin_id": string,
      "username": string,
      "email": string,
      "phone_number": string,
      "admin_role": string,
      "is_active": boolean,
      "created_at": string,
      "updated_at": string,
      "last_login": string,
      "permissions": string[]
    },
    "error"?: string
  }

Requirements:
1. Extend admin.types.ts with AdminDetail interface
2. Add ADMIN_DETAIL endpoint constant
3. Add getAdminById(id: string) method to AdminService
4. Create actions: loadAdminDetail, loadAdminDetailSuccess, loadAdminDetailFailure
5. Create effect to handle the API call
6. Update AdminState to include selectedAdmin and extend reducer
7. Create selectors: selectSelectedAdmin, selectAdminDetailLoading
8. Create admin-detail component with proper error handling
```

---

## Feature Development Prompts

### 1. Create New List Feature

```
Create a complete [ENTITY] list feature with the following requirements:

Data Model:
[PROVIDE_INTERFACE_STRUCTURE]

Features:
- Display list in a table format
- Show loading indicator
- Handle errors with toast notifications
- Click row to view details
- Format dates and status badges
- Pagination (if needed)

Follow the architecture pattern from:
- @src/app/admin/admin-list/admin-list.component.ts
- @src/app/admin/admin-list/admin-list.component.html
- @src/app/admin/admin-list/admin-list.component.scss

Include:
1. Full NgRx setup (actions, effects, reducer, selectors)
2. Service layer
3. Component with TypeScript, HTML, and SCSS
4. Proper typing with TypeScript interfaces
5. Error handling with Toastr
6. Subscription management with ngOnDestroy
```

### 2. Add CRUD Operations

```
Add CRUD operations to the existing [ENTITY] feature:

Operations:
- Create: POST /[endpoint]
- Read: GET /[endpoint]/:id (already exists)
- Update: PUT /[endpoint]/:id
- Delete: DELETE /[endpoint]/:id

For each operation:
1. Add endpoint constant to api-endpoints.ts
2. Add service method with proper typing
3. Create NgRx actions (trigger, success, failure)
4. Create effects to handle API calls
5. Update reducer to handle state changes
6. Create/update selectors
7. Add UI components (forms, buttons, modals)
8. Implement optimistic updates where appropriate
9. Add proper error handling and user feedback

Reference the admin list pattern for structure and error handling.
```

### 3. Add Form with Validation

```
Create a form for [CREATING/EDITING] [ENTITY] with validation:

Form Fields:
[LIST_FIELDS_WITH_VALIDATION_RULES]

Requirements:
1. Use Angular Reactive Forms
2. Implement field validations
3. Display validation errors
4. Submit using NgRx actions
5. Show loading state during submission
6. Handle success/error responses
7. Navigate on success
8. Use Toastr for notifications

Form submission should:
- Dispatch action: [actionName]
- Call service method: [serviceName].[methodName]
- Update state via reducer
- Show success/error messages

Reference patterns from the admin list component for state management.
```

### 4. Add Filtering and Search

```
Add filtering and search capabilities to the [ENTITY] list:

Filter Options:
- [FILTER_1]: dropdown/input
- [FILTER_2]: date range
- [FILTER_3]: status toggle

Search:
- Search by: [FIELD_1], [FIELD_2]
- Debounce input (300ms)

Implementation:
1. Add filter state to reducer
2. Create filter actions (setFilter, clearFilters)
3. Update selectors to apply filters
4. Add search input component
5. Add filter UI controls
6. Implement client-side or server-side filtering

Follow the NgRx pattern used in admin list for state management.
```

### 5. Extend Existing Store with New Endpoint

```
I have an existing NgRx store for [ENTITY] with a list endpoint already implemented.
I need to add a new endpoint to the existing store for [ENDPOINT_PURPOSE].

Current Store Setup:
- Types: @shared/types/Pages/[entity].types.ts
- Service: @shared/services/[entity].service.ts
- Actions: @store/actions/[entity].actions.ts
- Effects: @store/effects/[entity].effects.ts
- Reducer: @store/reducers/[entity].reducer.ts
- Selectors: @store/selectors/[entity].selectors.ts

New Endpoint Details:
- Endpoint: [ENDPOINT_URL]
- Method: [GET/POST/PUT/PATCH/DELETE]
- Purpose: [DESCRIPTION]
- Request payload (if applicable): [STRUCTURE]
- Response structure:
  {
    "success": boolean,
    "data": [DATA_STRUCTURE],
    "message"?: string,
    "error"?: string
  }

Requirements:
1. Extend existing types file with new interfaces
2. Add new endpoint constant to existing constants
3. Add new service method to existing service
4. Create new actions (trigger, success, failure) in existing actions file
5. Add new effect to existing effects file
6. Update existing state interface and reducer to handle new data
7. Create new selectors for the new data
8. Implement component integration with loading and error handling

DO NOT create new files - extend the existing store structure.
Follow the same pattern as the existing [ENTITY] implementation.
```

### 6. Extend Existing Store - Detail View Example

```
I have an existing NgRx store for admin with a list endpoint already implemented.
I need to add an endpoint to fetch individual admin details by ID.

Current Store Setup:
- Types: @shared/types/Pages/admin.types.ts
- Service: @shared/services/admin.service.ts
- Actions: @store/actions/admin.actions.ts
- Effects: @store/effects/admin.effects.ts
- Reducer: @store/reducers/admin.reducer.ts
- Selectors: @store/selectors/admin.selectors.ts

New Endpoint Details:
- Endpoint: /admin/:id
- Method: GET
- Purpose: Fetch detailed information for a specific admin
- Response structure:
  {
    "success": boolean,
    "data": {
      "admin_id": string,
      "username": string,
      "email": string,
      "phone_number": string,
      "admin_role": string,
      "is_active": boolean,
      "created_at": string,
      "updated_at": string,
      "last_login": string,
      "permissions": string[]
    },
    "error"?: string
  }

Requirements:
1. Extend admin.types.ts with AdminDetail interface
2. Add ADMIN_DETAIL endpoint constant to existing api-endpoints.ts
3. Add getAdminById(id: string) method to existing AdminService
4. Create new actions in admin.actions.ts: loadAdminDetail, loadAdminDetailSuccess, loadAdminDetailFailure
5. Add new effect to admin.effects.ts to handle the detail API call
6. Update AdminState interface to include selectedAdmin and detailLoading
7. Extend admin.reducer.ts to handle detail actions
8. Create new selectors: selectSelectedAdmin, selectAdminDetailLoading
9. Create/update admin-detail component with proper error handling

DO NOT create separate files - extend the existing admin store.
Follow the same NgRx pattern as the admin list implementation.
```

---

## Common Use Cases

### Use Case 1: Fetch and Display Data List

**Scenario**: Display a paginated list of items from an API

**Prompt**:
```
Implement a feature to fetch and display [ENTITY_NAME] list following the admin list pattern.

API: GET /[endpoint]
Response: Array of items with pagination metadata

Requirements:
- Table display with sortable columns
- Loading state indicator
- Error handling with toasts
- Click to view details
- Follow NgRx pattern from admin list feature
```

### Use Case 2: Create New Record

**Scenario**: Form to create a new entity

**Prompt**:
```
Create a form component to add new [ENTITY_NAME] with the following fields:
[FIELD_LIST]

API: POST /[endpoint]

Requirements:
- Reactive form with validation
- Submit via NgRx action
- Success/error notifications
- Navigate to list on success
- Follow the NgRx pattern
```

### Use Case 3: Update Existing Record

**Scenario**: Edit form for existing entity

**Prompt**:
```
Create an edit form for [ENTITY_NAME]:

Steps:
1. Fetch existing data via GET /[endpoint]/:id
2. Populate form with current values
3. Submit updates via PUT /[endpoint]/:id
4. Handle success/error states

Follow NgRx pattern with:
- Load action to fetch data
- Update action to save changes
- Proper state management
- Toast notifications
```

### Use Case 4: Delete Record with Confirmation

**Scenario**: Delete functionality with user confirmation

**Prompt**:
```
Add delete functionality to [ENTITY_NAME] list:

Requirements:
- Confirmation dialog before delete
- API: DELETE /[endpoint]/:id
- Remove from state on success
- Optimistic UI update
- Error rollback on failure
- Toast notifications

Follow NgRx pattern with delete actions and effects.
```

### Use Case 5: Toggle Status (Activate/Deactivate)

**Scenario**: Toggle boolean status field

**Prompt**:
```
Add status toggle functionality for [ENTITY_NAME]:

API: PATCH /[endpoint]/:id/status
Body: { "is_active": boolean }

Requirements:
- Toggle button in list view
- Optimistic UI update
- Revert on API failure
- Success/error toasts
- Update state via NgRx

Reference admin list status badge implementation.
```

---

## Best Practices

### 1. Type Safety
- Always define TypeScript interfaces for API responses
- Use strict typing for actions with props
- Type all observables and return values
- Reference: admin.types.ts for interface structure

### 2. Error Handling
- Handle errors in effects with catchError operator
- Always dispatch failure actions on errors
- Show user-friendly error messages via Toastr
- Log errors for debugging purposes
- Reference: admin.effects.ts error handling pattern

### 3. Loading States
- Set loading state when action dispatches
- Clear loading state on success or failure
- Use async pipe in templates for observables
- Reference: admin-list.component.html loading display

### 4. Subscriptions Management
- Always unsubscribe in ngOnDestroy
- Use Subscription container for multiple subscriptions
- Prefer async pipe to avoid manual subscriptions
- Reference: admin-list.component.ts subscription pattern

### 5. State Management
- Keep state normalized (avoid deep nesting)
- Use selectors for derived state
- Never mutate state directly (use spread operators)
- One source of truth for each data entity
- Reference: admin.reducer.ts for state structure

### 6. Naming Conventions
- Actions: [Entity] Action Description
- Selectors: select[Entity][Property]
- Effects: [actionName]$
- Services: [entity].service.ts
- Reference: admin.actions.ts for naming pattern

### 7. File Organization
```
feature/
├── components/          # UI components
├── services/           # API services (in shared/services/)
├── store/
│   ├── actions/       # NgRx actions
│   ├── effects/       # Side effects
│   ├── reducers/      # State reducers
│   └── selectors/     # State selectors
└── types/             # TypeScript interfaces (in shared/types/)
```

### 8. Component Structure
- Separate presentation from logic
- Use OnInit for initialization
- Use OnDestroy for cleanup
- Keep components focused and single-purpose
- Reference: admin-list.component.ts structure

---

## AI Prompt Examples

### Example 1: Debug API Integration
```
I'm getting an error when loading the admin list. The error message is: [ERROR_MESSAGE]

Current implementation:
- Component: @src/app/admin/admin-list/admin-list.component.ts
- Effect: @src/app/store/effects/admin.effects.ts
- Service: @src/app/shared/services/admin.service.ts

Please help me debug this issue following the established NgRx pattern.
```

### Example 2: Add New Feature Module
```
Add a new feature to manage school administrators with the following requirements:

1. List all school administrators
2. View individual administrator details
3. Create new administrator
4. Update existing administrator
5. Activate/deactivate administrator

API Endpoints:
- GET /school-admins - List all
- GET /school-admins/:id - Get details
- POST /school-admins - Create
- PUT /school-admins/:id - Update
- PATCH /school-admins/:id/status - Toggle status

Data Model:
{
  "school_admin_id": string,
  "name": string,
  "email": string,
  "school_id": string,
  "school_name": string,
  "phone_number": string,
  "is_active": boolean,
  "created_at": string,
  "last_login": string
}

Follow the same architecture pattern as the admin list feature including:
- Full NgRx setup
- Error handling
- Loading states
- Toastr notifications
- Proper routing
```

### Example 3: Enhance Existing Feature
```
Update the admin list feature to include:

1. Search functionality (search by username or email)
2. Filter by role (superadmin, admin)
3. Filter by status (active, inactive)
4. Sort by columns (username, email, created_at)

Implement using:
- Client-side filtering (data already loaded)
- Add filter controls to the UI
- Update selectors to apply filters
- Maintain current NgRx pattern
- Keep existing functionality intact

Reference: @src/app/admin/admin-list/
```

### Example 4: Add Export Functionality
```
Add CSV export functionality to admin list:

Requirements:
- Export button in the UI
- Export current filtered/searched data
- Include all columns from the table
- Format dates properly
- Download as CSV file
- Use existing admin list data from state

Reference the admin list component for data access.
```

### Example 5: Implement Bulk Actions
```
Add bulk action capabilities to admin list:

Features:
- Checkbox selection for multiple items
- Select all/deselect all
- Bulk activate/deactivate
- Bulk delete with confirmation

Implementation:
- Add selection state to reducer
- Create bulk action NgRx actions
- Update UI with checkboxes
- Add bulk action buttons
- Confirm before destructive actions

Follow NgRx pattern from admin list feature.
```

### Example 6: Extend Existing Store with Detail Endpoint
```
I have an existing NgRx store for admin with a list endpoint already implemented.
I need to add an endpoint to fetch individual admin details by ID.

Current Store Setup:
- Types: @shared/types/Pages/admin.types.ts
- Service: @shared/services/admin.service.ts
- Actions: @store/actions/admin.actions.ts
- Effects: @store/effects/admin.effects.ts
- Reducer: @store/reducers/admin.reducer.ts
- Selectors: @store/selectors/admin.selectors.ts

New Endpoint Details:
- Endpoint: /admin/:id
- Method: GET
- Purpose: Fetch detailed information for a specific admin
- Response structure:
  {
    "success": boolean,
    "data": {
      "admin_id": string,
      "username": string,
      "email": string,
      "phone_number": string,
      "admin_role": string,
      "is_active": boolean,
      "created_at": string,
      "updated_at": string,
      "last_login": string,
      "permissions": string[]
    },
    "error"?: string
  }

Requirements:
1. Extend admin.types.ts with AdminDetail interface and AdminDetailResponse
2. Add ADMIN_DETAIL endpoint constant to api-endpoints.ts
3. Add getAdminById(id: string) method to AdminService
4. Create actions: loadAdminDetail, loadAdminDetailSuccess, loadAdminDetailFailure
5. Add effect loadAdminDetail$ to handle the API call
6. Update AdminState to include selectedAdmin and detailLoading properties
7. Extend reducer to handle all detail actions
8. Create selectors: selectSelectedAdmin, selectAdminDetailLoading
9. Create admin-detail component with error handling and toast notifications

DO NOT create separate files - extend the existing admin store.
Use the same error handling pattern with catchError and Toastr.
```

---

## Troubleshooting Guide

### Common Issues and Solutions

1. **"Cannot find module" errors**
   - Check path aliases in tsconfig.json
   - Verify import paths use @ prefix for aliases
   - Ensure module is exported properly

2. **State not updating in UI**
   - Verify action is being dispatched
   - Check effect is registered in EffectsModule
   - Ensure reducer is added to StoreModule
   - Confirm selector is correctly defined

3. **API errors not displaying**
   - Check error subscription in component
   - Verify Toastr service is imported and injected
   - Ensure error selector is properly defined
   - Check error handling in effects

4. **Loading state stuck on true**
   - Ensure both success and failure actions set loading to false
   - Verify effect completes properly (map/catchError)
   - Check for uncaught errors in effect

5. **Memory leaks from subscriptions**
   - Always unsubscribe in ngOnDestroy
   - Use Subscription container
   - Prefer async pipe over manual subscriptions

---

## Quick Command Reference

### Angular CLI Commands
```bash
# Generate component
ng generate component admin/[feature-name] --module=admin

# Generate service
ng generate service shared/services/[feature-name]

# Generate module
ng generate module admin/[feature-name] --routing
```

### File Reference Patterns
- Component: Based on admin-list.component.ts
- Service: Based on admin.service.ts
- Types: Based on admin.types.ts
- Actions: Based on admin.actions.ts
- Effects: Based on admin.effects.ts
- Reducer: Based on admin.reducer.ts
- Selectors: Based on admin.selectors.ts

---

## Related Resources

- [API Integration Context Document](./api-integration-context.md)
- [NgRx Official Documentation](https://ngrx.io/)
- [RxJS Operators Guide](https://rxjs.dev/guide/operators)
- [Angular Best Practices](https://angular.io/guide/styleguide)
- Admin List Reference Implementation:
  - Component: src/app/admin/admin-list/admin-list.component.ts
  - Template: src/app/admin/admin-list/admin-list.component.html
  - Styles: src/app/admin/admin-list/admin-list.component.scss
  - Service: src/app/shared/services/admin.service.ts
  - Store: src/app/store/actions|effects|reducers|selectors/admin.*
