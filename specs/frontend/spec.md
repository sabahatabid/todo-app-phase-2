# Frontend Specification - Todo App

## Overview
Professional Todo application frontend built with Next.js 16 App Router, TypeScript, and Tailwind CSS.

---

## Technology Stack

- **Framework:** Next.js 16.1.6 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Authentication:** Better Auth (configured)
- **State Management:** React Hooks + localStorage (temporary)
- **HTTP Client:** Fetch API
- **Form Handling:** React Hook Form + Zod (planned)

---

## Features

### 1. Authentication System
- Sign-in page with email/password
- Sign-up page with registration form
- Demo account for quick testing
- Social login UI (Google, GitHub)
- Session management
- Protected routes
- Auto-redirect based on auth status

### 2. Todo Management
- Create tasks with priority levels
- Mark tasks as complete/incomplete
- Delete tasks
- Filter tasks (All, Active, Completed)
- Clear completed tasks
- Task statistics and counters
- Timestamps for each task

### 3. UI/UX Features
- Premium gradient backgrounds
- Glassmorphism effects
- Dark mode support
- Responsive design (mobile, tablet, desktop)
- Smooth animations and transitions
- Empty states with helpful messages
- Loading states
- Custom checkboxes
- Priority color indicators
- Hover effects

---

## Page Structure

### `/` (Root)
- Auto-routing logic
- Redirects to `/dashboard` if authenticated
- Redirects to `/auth/signin` if not authenticated

### `/auth/signin`
- Email and password inputs
- Remember me checkbox
- Forgot password link
- Demo account button
- Social login buttons
- Link to sign-up page

### `/auth/signup`
- Full name input
- Email input
- Password input
- Confirm password input
- Terms and conditions checkbox
- Link to sign-in page

### `/dashboard`
- Protected route (requires authentication)
- Header with user info and sign-out button
- Todo app component
- Task management interface

---

## Component Structure

### `TodoApp.tsx`
Main todo application component with:
- Task input with priority selector
- Filter tabs (All, Active, Completed)
- Stats bar (active count, completed count)
- Task list with cards
- Empty states
- Clear completed button

---

## Data Models

### Task
```typescript
interface Todo {
  id: number;
  text: string;
  completed: boolean;
  createdAt: Date;
  priority: 'low' | 'medium' | 'high';
}
```

---

## Styling Guidelines

### Colors
- Primary: Blue (600-700)
- Secondary: Indigo (600-700)
- Success: Green (500)
- Warning: Yellow (500)
- Danger: Red (500-600)
- Background: Gradient (slate-50 to indigo-50)
- Dark mode: Gradient (slate-950 to slate-900)

### Spacing
- Container: max-w-4xl
- Padding: p-6 to p-8
- Gap: gap-2 to gap-6
- Rounded: rounded-xl to rounded-3xl

### Typography
- Headings: font-bold, text-3xl to text-4xl
- Body: text-base to text-lg
- Small: text-sm to text-xs

---

## Responsive Breakpoints

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

---

## Accessibility

- ARIA labels on interactive elements
- Keyboard navigation support
- Focus states on all inputs
- Semantic HTML
- Alt text for icons (via SVG)

---

## State Management

Currently using:
- React useState for component state
- localStorage for session persistence
- Planned: Backend API integration

---

## API Integration (Planned)

### Endpoints to consume:
- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `GET /auth/me` - Get current user
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

---

## Environment Variables

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
BETTER_AUTH_SECRET=oaqaQNunj3Kaptaw1QP4EkVqrGNxyPmq
BETTER_AUTH_URL=http://localhost:3000
```

---

## Performance Optimizations

- Server Components by default
- Client Components only when needed
- Image optimization with next/image
- Code splitting
- Lazy loading
- Optimistic updates (planned)

---

## Security

- Client-side session validation
- Protected routes with middleware
- XSS prevention
- CSRF protection (planned)
- Secure cookie handling

---

## Testing (Planned)

- Unit tests for components
- Integration tests for user flows
- E2E tests with Playwright
- Accessibility tests

---

## Future Enhancements

1. Real-time updates with WebSockets
2. Task categories/tags
3. Due dates and reminders
4. Task search and sorting
5. Bulk operations
6. Task sharing
7. Offline support with PWA
8. Mobile app with React Native

---

## End of Specification
