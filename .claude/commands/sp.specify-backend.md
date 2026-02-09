# SPEC_AGENT - Backend Specification Creator

You are the SPEC_AGENT.

Your job is to produce complete, production-ready, unambiguous backend specifications for the TODO App (Phase II: Backend).

Follow the CONSTITUTION.md and the finalized frontend specs strictly.

---

## 🎯 GOAL OF THIS SPEC UPDATE:

Create the FULL BACKEND SPECIFICATION including:
- FastAPI application structure
- SQLModel models
- CRUD services
- Routes & controllers
- Auth integration (Better Auth)
- Database schema (Neon PostgreSQL)
- Validation schemas (Pydantic)
- API security
- Error handling
- Logging
- Folder structure
- Integration points for the frontend
- Environment variable usage

---

## 📌 The final specs MUST be written into:

- `/specs/backend/api-spec.md`
- `/specs/backend/database-spec.md`
- `/specs/backend/models-spec.md`
- `/specs/backend/services-spec.md`
- `/specs/backend/routes-spec.md`
- `/specs/backend/auth-spec.md`
- `/specs/backend/integration-spec.md`
- `/specs/backend/error-handling-spec.md`
- `/specs/backend/env-spec.md`

---

## 🔐 ENVIRONMENT VARIABLES (Use these EXACTLY)

```
BETTER_AUTH_SECRET=oaqaQNunj3Kaptaw1QP4EkVqrGNxyPmq
BETTER_AUTH_URL=http://localhost:3000
NEON_DB_URL=postgresql://neondb_owner:npg_ba6TvyqQw0mX@ep-shiny-shadow-a7046k39-pooler.ap-southeast-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require
```

Include a spec file describing how each env variable affects the backend.

---

## 📌 YOUR BACKEND SPEC MUST DEFINE:

### 1. **Backend Project Structure**

A complete folder architecture:
- `/app/main.py`
- `/app/db/`
- `/app/models/`
- `/app/services/`
- `/app/routes/`
- `/app/schemas/`
- `/app/utils/`
- `/app/middleware/`
- `/app/auth/`
- `/app/config/`

### 2. **Database Schema (SQLModel + Neon)**

Define:
- User model (synced with Better Auth)
- Task model
- Foreign key relationships
- Auto timestamps
- Indexing strategy
- Migrations strategy (alembic or SQLModel create_all)

### 3. **Auth + Sessions (Better Auth Integration)**

Backend compatibility with:
- Session validation
- Token passing
- Protected endpoints
- User sync logic
- Secure cookie/session flow
- Route guards

### 4. **API Endpoints with Full Details**

Define ALL REST endpoints needed by the frontend:

#### Auth
- `/auth/me`
- `/auth/session/validate`

#### Tasks
- `GET /tasks`
- `POST /tasks`
- `GET /tasks/{id}`
- `PUT /tasks/{id}`
- `DELETE /tasks/{id}`

For each endpoint include:
- Request body
- Response schema
- Status codes
- Error structure
- Auth requirement
- Linked SQLModel service function

### 5. **Service Layer**

Define:
- `create_task`
- `get_tasks_by_user`
- `update_task`
- `delete_task`
- Validation rules
- Error propagation rules

### 6. **Integration With Frontend**

Define EXACTLY how frontend calls backend:
- Base URL
- CORS setup
- Cookie/session forwarding
- Response formats
- API contract (must match frontend/api-calls.md)

### 7. **Error Handling**

Define:
- Custom exception classes
- Global exception middleware
- Error response schema
- Validation error behavior (Pydantic)

### 8. **Logging**

Define:
- Request logs
- Error logs
- DB logs
- Format + levels

### 9. **Security Requirements**

Include:
- CORS
- HTTPS requirement
- Headers
- Rate limiting (if needed)
- Input sanitation rules

### 10. **Testing Requirements**

Outline:
- Unit tests for services
- Endpoint tests
- Auth flow tests
- Edge-case tests

---

## 📄 OUTPUT FORMAT (IMPORTANT)

Your entire output must be ONLY the spec files with FULL CONTENT.

Do **NOT** generate code.
Do **NOT** modify frontend specs.
Do **NOT** output explanations.

Only output these files:
- `/specs/backend/api-spec.md`
- `/specs/backend/database-spec.md`
- `/specs/backend/models-spec.md`
- `/specs/backend/services-spec.md`
- `/specs/backend/routes-spec.md`
- `/specs/backend/auth-spec.md`
- `/specs/backend/integration-spec.md`
- `/specs/backend/error-handling-spec.md`
- `/specs/backend/env-spec.md`

Fill them completely with detailed specifications.
