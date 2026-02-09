# Backend Specification - Todo App API

## Overview
RESTful API backend for Todo application built with FastAPI, SQLModel, and PostgreSQL.

---

## Technology Stack

- **Framework:** FastAPI 0.128.5
- **Server:** Uvicorn 0.40.0
- **ORM:** SQLModel 0.0.32
- **Database:** Neon PostgreSQL (Serverless)
- **Database Driver:** asyncpg 0.29.0
- **Authentication:** JWT (python-jose)
- **Password Hashing:** Passlib with bcrypt
- **Validation:** Pydantic 2.12.5
- **Testing:** Pytest 9.0.2
- **Migration:** Alembic 1.18.3 (optional)

---

## Architecture

### Layered Architecture
```
Routes (API Layer)
    ↓
Services (Business Logic)
    ↓
Models (Data Layer)
    ↓
Database (PostgreSQL)
```

---

## Project Structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py                 # FastAPI app initialization
│   ├── config/
│   │   ├── __init__.py
│   │   ├── settings.py         # Configuration management
│   │   └── logging.py          # Logging configuration
│   ├── db/
│   │   ├── __init__.py
│   │   ├── engine.py           # Database engine
│   │   ├── session.py          # Session management
│   │   └── init_db.py          # Database initialization
│   ├── models/
│   │   ├── __init__.py
│   │   ├── user.py             # User model
│   │   └── task.py             # Task model
│   ├── schemas/
│   │   ├── __init__.py
│   │   ├── user.py             # User schemas
│   │   ├── task.py             # Task schemas
│   │   ├── auth.py             # Auth schemas
│   │   └── error.py            # Error schemas
│   ├── routes/
│   │   ├── __init__.py
│   │   ├── auth.py             # Auth endpoints
│   │   └── tasks.py            # Task endpoints
│   ├── services/
│   │   ├── __init__.py
│   │   ├── user_service.py     # User business logic
│   │   └── task_service.py     # Task business logic
│   ├── auth/
│   │   ├── __init__.py
│   │   ├── jwt.py              # JWT utilities
│   │   ├── password.py         # Password utilities
│   │   ├── dependencies.py     # Auth dependencies
│   │   └── better_auth.py      # Better Auth integration
│   ├── middleware/
│   │   ├── __init__.py
│   │   ├── exceptions.py       # Exception handlers
│   │   └── logging.py          # Logging middleware
│   ├── utils/
│   │   ├── __init__.py
│   │   ├── validators.py       # Custom validators
│   │   ├── helpers.py          # Helper functions
│   │   └── constants.py        # Constants
│   └── tests/
│       ├── __init__.py
│       ├── conftest.py         # Test fixtures
│       ├── test_auth.py        # Auth tests
│       ├── test_services.py    # Service tests
│       └── test_api.py         # API tests
├── venv/                       # Virtual environment
├── .env                        # Environment variables
├── requirements.txt            # Dependencies
└── README.md                   # Documentation
```

---

## Database Schema

### User Model
```python
class User(SQLModel, table=True):
    __tablename__ = "users"
    
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    email: str = Field(unique=True, index=True, max_length=255)
    hashed_password: str = Field(max_length=255)
    full_name: Optional[str] = Field(default=None, max_length=255)
    is_active: bool = Field(default=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    
    # Relationships
    tasks: List["Task"] = Relationship(back_populates="user")
```

### Task Model
```python
class Task(SQLModel, table=True):
    __tablename__ = "tasks"
    
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str = Field(max_length=255, nullable=False)
    completed: bool = Field(default=False)
    priority: str = Field(default="medium")  # low, medium, high
    user_id: UUID = Field(foreign_key="users.id", nullable=False)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    
    # Relationships
    user: Optional[User] = Relationship(back_populates="tasks")
```

### Indexes
- `users.email` - Unique index for fast lookup
- `tasks.user_id` - Index for filtering tasks by user
- `tasks.completed` - Index for filtering by status

---

## API Endpoints

### Base URL
```
http://localhost:8000
```

### Authentication Endpoints

#### POST /auth/register
Register a new user.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "securepassword",
  "full_name": "John Doe"
}
```

**Response:** `201 Created`
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "full_name": "John Doe",
  "created_at": "2026-02-09T00:00:00Z"
}
```

#### POST /auth/login
Authenticate user and get access token.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

**Response:** `200 OK`
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer"
}
```

#### GET /auth/me
Get current authenticated user.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** `200 OK`
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "full_name": "John Doe",
  "created_at": "2026-02-09T00:00:00Z"
}
```

---

### Task Endpoints

#### GET /api/tasks
Get all tasks for authenticated user.

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `skip` (int, optional): Number of tasks to skip (default: 0)
- `limit` (int, optional): Maximum tasks to return (default: 100)
- `filter` (string, optional): Filter by status (all, active, completed)

**Response:** `200 OK`
```json
{
  "tasks": [
    {
      "id": 1,
      "title": "Complete project",
      "completed": false,
      "priority": "high",
      "user_id": "uuid",
      "created_at": "2026-02-09T00:00:00Z",
      "updated_at": "2026-02-09T00:00:00Z"
    }
  ],
  "total": 1
}
```

#### POST /api/tasks
Create a new task.

**Headers:**
```
Authorization: Bearer <token>
```

**Request:**
```json
{
  "title": "New task",
  "priority": "medium"
}
```

**Response:** `201 Created`
```json
{
  "id": 1,
  "title": "New task",
  "completed": false,
  "priority": "medium",
  "user_id": "uuid",
  "created_at": "2026-02-09T00:00:00Z",
  "updated_at": "2026-02-09T00:00:00Z"
}
```

#### GET /api/tasks/{id}
Get a specific task.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** `200 OK` or `404 Not Found`
```json
{
  "id": 1,
  "title": "Task title",
  "completed": false,
  "priority": "medium",
  "user_id": "uuid",
  "created_at": "2026-02-09T00:00:00Z",
  "updated_at": "2026-02-09T00:00:00Z"
}
```

#### PUT /api/tasks/{id}
Update a task.

**Headers:**
```
Authorization: Bearer <token>
```

**Request:**
```json
{
  "title": "Updated title",
  "completed": true,
  "priority": "low"
}
```

**Response:** `200 OK` or `404 Not Found`
```json
{
  "id": 1,
  "title": "Updated title",
  "completed": true,
  "priority": "low",
  "user_id": "uuid",
  "created_at": "2026-02-09T00:00:00Z",
  "updated_at": "2026-02-09T00:00:00Z"
}
```

#### DELETE /api/tasks/{id}
Delete a task.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** `200 OK` or `404 Not Found`
```json
{
  "message": "Task deleted successfully"
}
```

#### DELETE /api/tasks/completed
Delete all completed tasks for user.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** `200 OK`
```json
{
  "deleted_count": 5
}
```

---

### Health Endpoints

#### GET /
Welcome message.

**Response:** `200 OK`
```json
{
  "message": "Welcome to Todo App API",
  "version": "1.0.0",
  "status": "running"
}
```

#### GET /health
Health check.

**Response:** `200 OK`
```json
{
  "status": "healthy",
  "service": "todo-api"
}
```

---

## Authentication & Security

### JWT Configuration
- **Algorithm:** HS256
- **Secret:** From `BETTER_AUTH_SECRET` environment variable
- **Token Expiration:** 24 hours
- **Token Type:** Bearer

### Password Security
- **Hashing:** bcrypt
- **Rounds:** 12
- **Validation:** Minimum 6 characters

### CORS Configuration
- **Allowed Origins:** From `CORS_ORIGINS` environment variable
- **Allowed Methods:** GET, POST, PUT, DELETE, OPTIONS
- **Allowed Headers:** *
- **Allow Credentials:** True

---

## Error Handling

### Error Response Format
```json
{
  "detail": "Error message",
  "status_code": 400,
  "timestamp": "2026-02-09T00:00:00Z"
}
```

### HTTP Status Codes
- `200 OK` - Successful request
- `201 Created` - Resource created
- `400 Bad Request` - Invalid request data
- `401 Unauthorized` - Missing or invalid token
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource not found
- `422 Unprocessable Entity` - Validation error
- `500 Internal Server Error` - Server error

---

## Environment Variables

```env
# Better Auth Configuration
BETTER_AUTH_SECRET=oaqaQNunj3Kaptaw1QP4EkVqrGNxyPmq
BETTER_AUTH_URL=http://localhost:3000

# Database Configuration
NEON_DB_URL=postgresql://neondb_owner:npg_ba6TvyqQw0mX@ep-shiny-shadow-a7046k39-pooler.ap-southeast-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require

# API Configuration
API_HOST=0.0.0.0
API_PORT=8000
DEBUG=True

# CORS Configuration
CORS_ORIGINS=http://localhost:3000,http://localhost:3001

# JWT Configuration
JWT_SECRET_KEY=${BETTER_AUTH_SECRET}
JWT_ALGORITHM=HS256
JWT_EXPIRATION_HOURS=24
```

---

## Logging

### Log Levels
- **DEBUG:** Development debugging
- **INFO:** General information
- **WARNING:** Warning messages
- **ERROR:** Error messages
- **CRITICAL:** Critical errors

### Log Format
```
[%(asctime)s] %(levelname)s [%(name)s:%(lineno)s] %(message)s
```

### Logged Events
- All incoming requests
- Response status and time
- Authentication attempts
- Database queries (in debug mode)
- Errors with stack traces

---

## Testing

### Test Coverage Goals
- Unit tests: >80%
- Integration tests: >70%
- E2E tests: Critical paths

### Test Database
- Separate test database
- Reset before each test
- Use fixtures for common data

---

## Performance Considerations

- Async/await for all I/O operations
- Database connection pooling
- Query optimization with indexes
- Pagination for large result sets
- Caching (future enhancement)

---

## Security Best Practices

- ✅ Password hashing with bcrypt
- ✅ JWT token authentication
- ✅ CORS configuration
- ✅ SQL injection prevention (SQLModel)
- ✅ Input validation (Pydantic)
- ✅ Environment variable management
- ⏳ Rate limiting (planned)
- ⏳ HTTPS enforcement (production)

---

## Future Enhancements

1. Rate limiting
2. Caching with Redis
3. WebSocket support for real-time updates
4. Task categories/tags
5. Task sharing between users
6. Email notifications
7. File attachments
8. Task comments
9. Activity logs
10. Admin panel

---

## End of Specification
