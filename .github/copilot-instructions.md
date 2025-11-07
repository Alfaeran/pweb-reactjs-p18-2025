# Hogwarts Library & Bookshop - Copilot Instructions

## Project Overview

This is a React + TypeScript + Tailwind CSS application for a magical bookshop inspired by Harry Potter's dark academia aesthetic. The application consists of three main modules: **Authentication**, **Book Management**, and **Transaction Management**.

**Key Stack:**

- React 18.2.0 + TypeScript 5.3.0
- React Router 6.20.0 for navigation
- Axios 1.6.0 for API calls
- Tailwind CSS (via custom CSS variables)
- Vite 5.0.0 for bundling

## Architecture Overview

```
Frontend (React) ↔ REST API (Backend)
├─ Components (Reusable UI)
├─ Pages (Route-based components)
├─ Services (API integration)
├─ Context (Global state - Auth)
└─ Utils (Helpers, validation)
```

## Design System

### Color Palette (Use CSS Variables)

```css
--burgundy: #8B0000       /* Primary accent, headers */
--gold: #FFD700           /* CTAs, highlights, borders */
--emerald: #50C878        /* Success states */
--dark-wood: #3E2723      /* Main background */
--parchment: #F4E8C1      /* Text on dark backgrounds */
--parchment-dark: #E8D4A0 /* Darker parchment variant */
--sepia: #704214          /* Secondary text */
--cream: #FFF8DC          /* Light backgrounds */
```

### Typography (From globals.css)

- **Headers (h1-h6):** Cinzel font family, weights 400-700
- **Body text (p, span):** Crimson Text font family, weights 400/600
- **Never override** default sizes/weights from globals.css

### Magical CSS Classes

```css
.magical-glow       /* Pulsing gold glow animation */
/* Pulsing gold glow animation */
.float-animation    /* Gentle vertical motion */
.shimmer-animation  /* Opacity pulse */
.parchment-bg       /* Parchment texture */
.golden-border      /* Gold border + glow + shadow */
.wax-seal; /* Burgundy circular seal effect */
```

## Team Task Division

### Member 1: Authentication & Navigation

**Files:**

- `pages/auth/Login.tsx` - Dark library theme, floating candles, golden card
- `pages/auth/Register.tsx` - Parchment theme, wax seal, decorative quill
- `context/AuthContext.tsx` - Auth state management
- `components/common/Navbar.tsx` - Dark wood navbar with gold accents
- `components/common/Footer.tsx` - Consistent theming
- `components/common/ProtectedRoute.tsx` - Route protection logic
- `components/forms/LoginForm.tsx` - Form component with validation
- `components/forms/RegisterForm.tsx` - Form component with validation

**Key Implementation:**

- Token stored in `auth_token` key in localStorage
- User object stored in `auth_user` key
- ProtectedRoute blocks unauth users, redirects to `/login`
- Navbar shows user email and logout button
- Implement form validation using `utils/validation.ts`

### Member 2: Book Management

**Files:**

- `pages/books/BooksList.tsx` - Library grid, search, filter, sort, pagination
- `pages/books/BookDetail.tsx` - Single book with details, floating decorations
- `pages/books/AddBook.tsx` - Form with parchment theme, wax seal
- `services/bookService.ts` - API calls for CRUD operations
- `components/cards/BookCard.tsx` - Reusable book card component
- `components/forms/BookForm.tsx` - Book form (for Add/Edit)
- `components/ui/Button.tsx` - Custom button component
- `components/ui/Input.tsx` - Custom input component
- `components/ui/Pagination.tsx` - Pagination controls
- `components/ui/Loader.tsx` - Loading state component

**Key Implementation:**

- BooksList: 1 col mobile, 2 tablet, 3-4 desktop
- Book covers: 3:4 aspect ratio with hover scale
- Genre badges: burgundy; Condition badges: emerald outline
- Floating action button (bottom right) for "Add Book"
- Support search, filter by condition, sort by title/date
- Implement pagination with limit=10 items/page

### Member 3: Transactions & App Setup

**Files:**

- `pages/transactions/TransactionsList.tsx` - **ALREADY IMPLEMENTED** ✅
- `pages/transactions/TransactionDetail.tsx` - Receipt card, watermark, ledger style
- `pages/transactions/Checkout.tsx` - Shopping cart, Gringotts vault aesthetic
- `services/transactionService.ts` - API calls for transactions
- `components/cards/TransactionCard.tsx` - Transaction row/card component
- `App.tsx` - Main routing setup (with Navbar/Footer layout)
- `main.tsx` - Entry point with ReactDOM render
- `utils/constants.ts` - App constants, routes, messages
- `utils/validation.ts` - Form validation functions
- `types/index.ts` - TypeScript interfaces for all entities

**Key Implementation:**

- TransactionsList: Parchment background with ruled lines, ledger aesthetic
- TransactionDetail: Receipt card with wax seal, sepia watermark
- Checkout: Gold coins aesthetic, vault-like design, order summary sticky
- Support search by ID, sort by date/amount/price, pagination
- Implement loading/error/empty states

## Critical Developer Workflows

### Setup & Running

```bash
npm install
npm run dev        # Start dev server on http://localhost:5174
npm run build      # Build for production
npm run type-check # Check TypeScript errors
npm run lint       # Run ESLint
```

### API Integration Pattern

```typescript
// In services/yourService.ts
import { apiRequest } from "./api";

export const yourService = {
  getItems: async (page: number, limit: number) => {
    return apiRequest<ItemListResponse>(
      "GET",
      `/items?page=${page}&limit=${limit}`
    );
  },
  createItem: async (data: ItemCreateRequest) => {
    return apiRequest<Item>("POST", "/items", { data });
  },
};

// In your component
import { yourService } from "@/services/yourService";

try {
  const response = await yourService.getItems(1, 10);
  setItems(response.data);
} catch (error) {
  setError("Failed to load items");
}
```

### State Management Pattern

- **Local state:** useState for component-specific data
- **Global state:** AuthContext for authentication (user, token)
- **API state:** Use useState with useEffect + try/catch
- **Always include:** loading, error, empty states

### Component Structure Pattern

```typescript
interface Props {
  // Props here
}

const MyComponent: React.FC<Props> = ({ prop1, prop2 }) => {
  const [state, setState] = useState<Type>(initialValue)

  useEffect(() => {
    // Side effects here
  }, [dependencies])

  return (
    // JSX here
  )
}

export default MyComponent
```

## Project Conventions

### Routing Paths

- `/login` - Login page (public)
- `/register` - Register page (public)
- `/books` - Books list (protected)
- `/books/:id` - Book detail (protected)
- `/books/add` - Add book form (protected)
- `/transactions` - Transactions list (protected)
- `/transactions/:id` - Transaction detail (protected)
- `/checkout` - Checkout page (protected)

### LocalStorage Keys

- `auth_token` - JWT authentication token
- `auth_user` - User object JSON string

### API Base URL

- Development: `http://localhost:3000/api`
- Configured in `services/api.ts`

### Naming Conventions

- **Components:** PascalCase (e.g., `BookCard.tsx`)
- **Files:** PascalCase for components, camelCase for utils
- **CSS:** BEM-like naming (e.g., `book-card__title`)
- **Types:** PascalCase ending with required suffix (e.g., `BookResponse`, `BookCreateRequest`)

### Forms & Validation

All forms use validation utils from `utils/validation.ts`:

```typescript
import { validateEmail, validateBookForm } from "@/utils/validation";

const errors = validateBookForm(title, writer, price, stock, genreId);
if (!errors.isValid) {
  setFormErrors(errors.errors);
  return;
}
```

## Cross-Component Communication

### ProtectedRoute

```typescript
<ProtectedRoute>
  <SomeProtectedPage />
</ProtectedRoute>
```

Automatically sets dev token if missing, redirects to `/login` if no auth.

### AuthContext (When implemented by Member 1)

```typescript
const { user, token, login, logout } = useContext(AuthContext);
```

### Shared Types

All team members must agree on types in `src/types/index.ts` before coding:

- `User`, `LoginRequest`, `RegisterRequest`, `AuthResponse`
- `Book`, `BookCreateRequest`, `BookListResponse`
- `Transaction`, `TransactionCreateRequest`, `TransactionListResponse`
- `Genre`, `ApiResponse`

## Design System Application Examples

### Buttons

```jsx
{
  /* Primary CTA */
}
<button className="magical-glow" style={{ backgroundColor: "var(--gold)" }}>
  Submit
</button>;

{
  /* Destructive */
}
<button
  style={{ backgroundColor: "var(--burgundy)", color: "var(--parchment)" }}
>
  Delete
</button>;

{
  /* Secondary */
}
<button
  style={{ border: "2px solid var(--burgundy)", color: "var(--burgundy)" }}
>
  Cancel
</button>;
```

### Cards

```jsx
<div className="golden-border parchment-bg">
  <h2 style={{ color: "var(--burgundy)" }}>Card Title</h2>
  <p style={{ color: "var(--sepia)" }}>Card content</p>
</div>
```

### Decorative Elements

```jsx
{
  /* Floating book icon */
}
<div className="float-animation" style={{ fontSize: "4rem", opacity: 0.1 }}>
  📚
</div>;

{
  /* Shimmer effect */
}
<div className="shimmer-animation" style={{ color: "var(--gold)" }}>
  ✨
</div>;
```

## State Management by Feature

### Authentication State

```typescript
// Stored in AuthContext (Member 1)
interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
}
```

### Books Feature State

```typescript
interface BooksState {
  books: Book[];
  currentBook: Book | null;
  isLoading: boolean;
  error: string | null;
  page: number;
  filters: BookFilter;
}
```

### Transactions Feature State

```typescript
interface TransactionsState {
  transactions: Transaction[];
  currentTransaction: Transaction | null;
  isLoading: boolean;
  error: string | null;
  page: number;
}
```

## Error Handling Pattern

```typescript
try {
  setLoading(true);
  const data = await serviceCall();
  setData(data);
  setError(null);
} catch (err) {
  setError(err instanceof Error ? err.message : "An error occurred");
} finally {
  setLoading(false);
}
```

## Key Files Reference

| File                          | Purpose                                   |
| ----------------------------- | ----------------------------------------- |
| `src/App.tsx`                 | Main routing setup                        |
| `src/main.tsx`                | Entry point                               |
| `src/styles/globals.css`      | Global styles + theme colors              |
| `src/types/index.ts`          | TypeScript interfaces (team coordination) |
| `src/context/AuthContext.tsx` | Global auth state                         |
| `src/services/api.ts`         | Axios instance + interceptors             |
| `src/utils/constants.ts`      | App constants                             |
| `src/utils/validation.ts`     | Form validation functions                 |

## Testing Workflow

1. **TypeScript Check:** `npm run type-check`
2. **Lint Check:** `npm run lint`
3. **Manual Testing:**
   - Mobile (< 640px) - Chrome DevTools
   - Tablet (640-1024px)
   - Desktop (> 1024px)
4. **Form Testing:** Test all validation scenarios
5. **Auth Flow:** Test login → redirect → protected route

## Performance Considerations

- Use `useCallback` for event handlers in list items
- Use `useMemo` for expensive computations
- Implement pagination to avoid loading large datasets
- Lazy load images with fallbacks
- Code split route components if bundle grows

## Accessibility Standards

- All interactive elements must have `aria-label` or semantic HTML
- Use semantic elements: `<button>`, `<nav>`, `<main>`, `<footer>`
- Ensure 4.5:1 contrast ratio for text (gold on dark meets this)
- All images need `alt` text
- Form labels connected to inputs via `htmlFor`

## Troubleshooting

| Issue                  | Solution                                                  |
| ---------------------- | --------------------------------------------------------- |
| Navigation not working | Check ProtectedRoute has token in localStorage            |
| Styles not applying    | Verify CSS variable names, check globals.css loaded       |
| API calls failing      | Check backend running on localhost:3000, verify endpoints |
| Types not found        | Check types/index.ts exported, used correct import path   |
| Components not found   | Check file naming PascalCase, correct import path         |

## Next Steps for New Tasks

1. **Coordinate Types:** Discuss `types/index.ts` structure
2. **Agree on API Shape:** Member 3 defines endpoints
3. **Implement Services:** Members follow the pattern
4. **Build Components:** Use provided design system
5. **Test Integration:** Full flow across modules
6. **Polish Styling:** Apply magical effects consistently
7. **Deploy:** Run build, verify no errors

---

**Last Updated:** November 6, 2025  
**Project:** IT Literature Shop - Hogwarts Library Edition  
**Team Members:** 3 (Auth, Books, Transactions + App)
