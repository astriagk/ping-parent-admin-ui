# API Integration Context - Admin List Feature

## Overview
This document provides context for the Admin List feature API integration using NgRx state management pattern in the Ping Parent Admin UI application.

## Architecture Pattern

### NgRx Flow
```
Component → Action → Effect → Service → API
                ↓
            Reducer → Selector → Component
```

## API Details

### Endpoint
- **URL**: `/admin`
- **Method**: GET
- **Constant**: `ApiEndpoints.ADMIN_LIST`
- **Location**: [src/app/shared/constants/api-endpoints.ts](../../src/app/shared/constants/api-endpoints.ts)

### Request
No request body required. This is a simple GET request.

### Response Structure
```typescript
{
  success: boolean;
  data?: AdminListItem[];
  message?: string;
  error?: string;
}
```

### Admin List Item Model
```typescript
interface AdminListItem {
  admin_id: string;          // Unique identifier (e.g., "ADM-VzHpMNey")
  username: string;          // Admin username
  email: string;             // Admin email address
  phone_number: string;      // Contact phone number
  admin_role: string;        // Role: "superadmin" | "admin"
  is_active: boolean;        // Account status
  created_at: string;        // ISO 8601 date string
  updated_at: string;        // ISO 8601 date string
  last_login?: string;       // ISO 8601 date string (optional)
}
```

### Example Response
```json
{
  "success": true,
  "data": [
    {
      "admin_id": "ADM-VzHpMNey",
      "username": "admin_super",
      "email": "admin@pingparent.com",
      "phone_number": "8867347448",
      "admin_role": "superadmin",
      "is_active": true,
      "created_at": "2025-12-31T06:12:30.396Z",
      "updated_at": "2025-12-31T06:12:30.396Z",
      "last_login": "2025-12-31T14:28:56.871Z"
    },
    {
      "admin_id": "ADM-1uxicMGl",
      "username": "Gowtham Admin",
      "email": "admin1@pingparent.com",
      "phone_number": "8867347448",
      "admin_role": "admin",
      "is_active": false,
      "created_at": "2025-12-31T06:33:08.618Z",
      "updated_at": "2025-12-31T06:38:02.757Z"
    }
  ]
}
```

## Implementation Files

### 1. Service Layer
**File**: [src/app/shared/services/admin.service.ts](../../src/app/shared/services/admin.service.ts)

```typescript
@Injectable({ providedIn: 'root' })
export class AdminService {
  constructor(private api: ApiService) {}

  getAdminList(): Observable<AdminListResponse> {
    return this.api.get<AdminListResponse>(ApiEndpoints.ADMIN_LIST);
  }
}
```

### 2. NgRx Actions
**File**: [src/app/store/actions/admin.actions.ts](../../src/app/store/actions/admin.actions.ts)

```typescript
// Trigger action
export const loadAdminList = createAction(ADMIN_LOAD_LIST);

// Success action
export const loadAdminListSuccess = createAction(
  ADMIN_LOAD_LIST_SUCCESS,
  props<{ admins: AdminListItem[] }>()
);

// Failure action
export const loadAdminListFailure = createAction(
  ADMIN_LOAD_LIST_FAILURE,
  props<{ error: AdminError }>()
);
```

### 3. NgRx Effects
**File**: [src/app/store/effects/admin.effects.ts](../../src/app/store/effects/admin.effects.ts)

```typescript
@Injectable()
export class AdminEffects {
  loadAdminList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.loadAdminList),
      mergeMap(() =>
        this.adminService.getAdminList().pipe(
          map((response) => {
            if (response.success && response.data) {
              return AdminActions.loadAdminListSuccess({
                admins: response.data,
              });
            } else {
              return AdminActions.loadAdminListFailure({
                error: { error: response.error || 'Failed to load admins' },
              });
            }
          }),
          catchError((error) =>
            of(AdminActions.loadAdminListFailure({ error }))
          )
        )
      )
    )
  );
}
```

### 4. NgRx Reducer
**File**: [src/app/store/reducers/admin.reducer.ts](../../src/app/store/reducers/admin.reducer.ts)

```typescript
export interface AdminState {
  admins: AdminListItem[];
  loading: boolean;
  error: AdminError | null;
}

export const adminReducer = createReducer(
  initialState,
  on(AdminActions.loadAdminList, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(AdminActions.loadAdminListSuccess, (state, { admins }) => ({
    ...state,
    admins,
    loading: false,
  })),
  on(AdminActions.loadAdminListFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
```

### 5. NgRx Selectors
**File**: [src/app/store/selectors/admin.selectors.ts](../../src/app/store/selectors/admin.selectors.ts)

```typescript
export const selectAdmins = createSelector(
  selectAdminState,
  (state: AdminState) => state.admins
);

export const selectAdminLoading = createSelector(
  selectAdminState,
  (state: AdminState) => state.loading
);

export const selectAdminError = createSelector(
  selectAdminState,
  (state: AdminState) => state.error
);
```

### 6. Component
**File**: [src/app/admin/admin-list/admin-list.component.ts](../../src/app/admin/admin-list/admin-list.component.ts)

```typescript
export class AdminListComponent implements OnInit, OnDestroy {
  admins: AdminListItem[] = [];
  loading$ = this.store.select(selectAdminLoading);
  error$ = this.store.select(selectAdminError);

  loadAdmins(): void {
    // Dispatch action to load admins
    this.store.dispatch(AdminActions.loadAdminList());

    // Subscribe to admin list updates
    this.subscriptions.add(
      this.store.select(selectAdmins).subscribe((admins) => {
        this.admins = admins;
      })
    );

    // Handle errors
    this.subscriptions.add(
      this.error$.pipe(filter((err) => !!err)).subscribe((err: any) => {
        if (err?.error || err?.message) {
          this.toastrService.error(err.error || err.message);
        } else if (typeof err === 'string') {
          this.toastrService.error(err);
        }
      })
    );
  }
}
```

## State Management Flow

### 1. Component Initialization
```typescript
ngOnInit() {
  this.loadAdmins();
}
```

### 2. Dispatch Action
```typescript
this.store.dispatch(AdminActions.loadAdminList());
```

### 3. Effect Intercepts Action
- Calls `adminService.getAdminList()`
- Waits for API response

### 4. Success Path
- Effect dispatches `loadAdminListSuccess({ admins })`
- Reducer updates state with admin list
- Selector emits new data to component
- Component displays admin list

### 5. Error Path
- Effect dispatches `loadAdminListFailure({ error })`
- Reducer updates state with error
- Error selector emits error to component
- Component shows error message via Toastr

## Error Handling

### Error Types
```typescript
interface AdminError {
  error?: string;
  message?: string;
  [key: string]: any;
}
```

### Error Display Strategy
1. Check for `err.error` or `err.message`
2. Display using Toastr service
3. Fallback to string error if available

## Helper Functions

The component uses utility functions for formatting:

```typescript
public getRoleLabel = getRoleLabel;       // Format role display
public getStatusClass = getUserStatusClass; // Get CSS class for status
public getStatusLabel = getUserStatusLabel; // Get status label text
```

**Location**: [src/app/shared/utils/helpers.ts](../../src/app/shared/utils/helpers.ts)

## UI Display

### Template Features
- Loading indicator using `loading$ | async`
- Table with columns: Admin ID (Index), Username, Email, Phone, Role, Status, Last Login, Actions
- Click-to-view details functionality
- Status badges with color coding
- Date formatting for timestamps

**File**: [src/app/admin/admin-list/admin-list.component.html](../../src/app/admin/admin-list/admin-list.component.html)

## Key Patterns

### 1. Observable Pattern
- Uses RxJS observables for reactive state management
- Async pipe in template for automatic subscription management

### 2. Unsubscribe Pattern
```typescript
private subscriptions = new Subscription();

ngOnDestroy(): void {
  this.subscriptions.unsubscribe();
}
```

### 3. Separation of Concerns
- Service: API communication
- Effects: Side effects and async operations
- Reducer: State mutations
- Selectors: State queries
- Component: UI logic and user interaction

## Dependencies

- **@ngrx/store**: State management
- **@ngrx/effects**: Side effects handling
- **rxjs**: Reactive programming
- **ngx-toastr**: Toast notifications

## Related Documentation
- [AI Prompt Guide](./ai-prompt-guide.md)
- [NgRx Best Practices](https://ngrx.io/guide/store)
- [RxJS Operators](https://rxjs.dev/guide/operators)
