# CareBridge

> **Next-generation telehealth platform enabling seamless doctor–patient interaction through real-time communication, intelligent workflows, and scalable healthcare infrastructure.**

[![Node.js](https://img.shields.io/badge/Node.js-v18+-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-TypeScript-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb&logoColor=white)](https://mongodb.com/)
[![Socket.IO](https://img.shields.io/badge/Socket.IO-Real--time-010101?logo=socket.io)](https://socket.io/)
[![License](https://img.shields.io/badge/License-Unspecified-lightgrey)](./LICENSE)

---

## Table of Contents

- [Executive Summary](#executive-summary)
- [The Problem](#the-problem)
- [The Solution](#the-solution)
- [System Architecture](#system-architecture)
- [Core Features](#core-features)
- [Technology Stack](#technology-stack)
- [Repository Structure](#repository-structure)
- [Key Design Principles](#key-design-principles)
- [API Reference](#api-reference)
- [Environment Variables](#environment-variables)
- [Getting Started](#getting-started)
- [Production Build](#production-build)
- [Security](#security)
- [Performance](#performance)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)

---

## Executive Summary

CareBridge is a **full-stack telehealth platform** designed to bridge the gap between healthcare providers and patients through a unified digital ecosystem. It eliminates the need for fragmented third-party tools by providing an all-in-one solution for the complete healthcare delivery lifecycle.

The platform delivers **end-to-end healthcare workflows** covering every touchpoint of a clinical interaction:

- **Appointment Management** — Patients can request, schedule, reschedule, and track appointments in real time. Doctors receive instant notifications and can confirm or modify bookings from their dashboard.
- **Real-Time Video Consultations** — Secure, high-quality video sessions powered by VideoSDK, enabling face-to-face remote consultations without leaving the platform.
- **Electronic Health Records (EHR)** — A structured, persistent record system allowing doctors to document findings and patients to review their complete medical history.
- **Secure Messaging** — A real-time messaging layer for pre- and post-consultation communication between doctors and patients.
- **Prescription Handling** — Digital prescription creation, storage, and patient-accessible medication tracking.

All workflows are powered by a **scalable and modular architecture** built on battle-tested modern technologies — Node.js, React, MongoDB, and Socket.IO — and deployable on cloud infrastructure.

---

## The Problem

### Fragmented Digital Healthcare

Modern healthcare delivery has struggled to keep pace with the demands of digital-first users. Most clinical environments rely on a patchwork of disconnected tools that fail to communicate with each other, creating friction at every step:

- **Disconnected communication channels** — Appointment booking happens via phone, follow-up via email, prescriptions via fax, and consultations via third-party video tools. Patients must navigate multiple systems to complete a single care episode.
- **Inefficient appointment workflows** — Manual scheduling systems lead to double-bookings, missed slots, and no-shows. There is no real-time visibility for either the doctor or patient.
- **Limited real-time interaction** — Async-only communication between consultations leaves patients waiting days for simple answers that could be resolved in minutes.
- **Poor accessibility to medical records** — Health data is locked in siloed systems that patients cannot access, forcing them to re-explain their medical history at every appointment.
- **Weak system integration** — Labs, pharmacies, and primary care providers operate independently, with no shared data layer connecting them to the patient's care journey.

### Operational Bottlenecks

These fragmentation issues cascade into real operational costs for both providers and patients:

- **Doctors juggle multiple platforms** — A physician may use one tool for scheduling, another for video calls, a third for prescriptions, and a fourth for messages. Context-switching is costly and error-prone.
- **Patients face delays and confusion** — Without a single interface, patients struggle to understand their care status, recall their prescription history, or locate their past test results.
- **Lack of real-time systems slows everything down** — Batch-processed or async systems mean that a change in appointment status, a new prescription, or an urgent message may not reach the recipient until hours later.

---

## The Solution

CareBridge provides a **centralized telehealth infrastructure** that consolidates every aspect of the care delivery lifecycle into a single, cohesive platform:

- **Real-Time Doctor–Patient Interaction** — WebSocket-driven communication ensures that messages, appointment updates, and status changes propagate instantly to all connected parties. There is no polling, no page refreshes, and no delays.
- **Structured EHR Management** — Health records are stored in a structured schema in MongoDB, making them queryable, auditable, and accessible to the appropriate role. Doctors write; patients read. Data is versioned and persisted.
- **Seamless Appointment Lifecycle** — From initial patient request through doctor confirmation, rescheduling, consultation, and follow-up — every state transition is tracked and visible in real time on both dashboards.
- **Integrated Notifications and Messaging** — Socket.IO powers a persistent notification and messaging layer. Users are alerted in-app for every relevant event — new messages, appointment confirmations, prescription updates — without needing to poll for changes.
- **Secure Prescriptions and Document Handling** — Doctors generate and sign digital prescriptions within the platform. Files (lab reports, imaging, referrals) are uploaded securely to AWS S3 and linked to the patient's EHR record.

---

## System Architecture

CareBridge follows a **layered, service-oriented architecture** with clear separation between the frontend presentation layer, the backend API and business logic layer, the real-time communication layer, and the data persistence layer.

```
┌─────────────────────────────────────────────────────────────────┐
│                         Frontend Layer                          │
│           Doctor App (React/TS)    Patient App (React/TS)       │
│                    Vite + Tailwind CSS + React Query            │
└────────────────────────────┬────────────────────────────────────┘
                             │ HTTP / WebSocket
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                          API Gateway                            │
│                      Node.js + Express.js                       │
│              Route handling, middleware, validation             │
└────────────────┬───────────────────────────────┬───────────────┘
                 │                               │
     ┌───────────▼──────────┐       ┌────────────▼───────────┐
     │   Auth Middleware     │       │    Real-Time Layer      │
     │   JWT Verification   │       │      Socket.IO          │
     │   Role-Based Guards  │       │  Events, Rooms, Presence│
     └───────────┬──────────┘       └────────────┬───────────┘
                 │                               │
     ┌───────────▼───────────────────────────────▼───────────┐
     │                    Core Services                       │
     │   Appointments · EHR · Prescriptions · Messaging      │
     │              Controllers + Business Logic              │
     └────────────────────────────┬───────────────────────────┘
                                  │
                    ┌─────────────▼──────────────┐
                    │        Database Layer        │
                    │    MongoDB via Mongoose      │
                    │  Schema Validation + ODM     │
                    └─────────────────────────────┘
                                  │
               ┌──────────────────┼──────────────────┐
               ▼                  ▼                  ▼
        VideoSDK API          AWS S3           Nodemailer
     (Video Sessions)    (File Storage)   (Email Notifications)
```

### Layer Descriptions

| Layer | Technology | Responsibility |
|-------|-----------|----------------|
| Frontend | React + TypeScript + Vite | Role-specific UI for Doctors and Patients |
| API Gateway | Node.js + Express.js | Request routing, middleware, input validation |
| Authentication | JWT | Stateless auth tokens, role-based route guards |
| Real-Time | Socket.IO | Bidirectional event streaming, presence, rooms |
| Core Services | Node.js Controllers | Business logic, data transformation |
| Database | MongoDB + Mongoose | Persistent storage, schema enforcement |
| File Storage | AWS S3 | Secure cloud storage for medical documents |
| Video | VideoSDK | Managed WebRTC infrastructure for consultations |
| Email | Nodemailer | Transactional email notifications |

---

## Core Features

### Authentication and Authorization

CareBridge uses **JWT (JSON Web Token)** based authentication to handle secure, stateless session management across both frontend applications.

- **Secure Login and Registration** — Users register with role-specific credentials. Passwords are hashed before storage. On successful login, a signed JWT is issued and stored client-side.
- **Role-Based Access Control (RBAC)** — Every API route is protected by middleware that verifies the JWT and checks the user's role (`doctor` or `patient`). A patient cannot access doctor-specific endpoints and vice versa.
- **Protected API Routes** — All non-public routes require a valid, unexpired JWT in the `Authorization` header. Token expiry is enforced server-side, and clients are redirected to login on 401 responses.
- **Token Lifecycle** — JWTs are issued with configurable expiration. Refresh token logic can be implemented to extend sessions without re-authentication.

---

### Appointment Management

The appointment system handles the full lifecycle of a clinical booking, from initial request to post-consultation follow-up.

- **Patient Request Workflow** — Patients submit appointment requests by selecting a doctor, preferred date/time, and reason for visit. The request is immediately visible on the doctor's dashboard.
- **Doctor Confirmation and Management** — Doctors can accept, reschedule, or cancel appointments from their dashboard. All state changes are broadcast in real time via Socket.IO.
- **Real-Time Status Updates** — Patients receive instant in-app notifications when their appointment status changes — no polling, no manual refresh required.
- **Appointment History** — Both doctors and patients can view complete historical and upcoming appointment records, filterable by date and status.
- **Conflict Prevention** — The backend validates appointment slots against existing bookings to prevent double-scheduling.

---

### Real-Time Video Consultations

Video consultations are powered by **VideoSDK**, a managed WebRTC infrastructure provider, ensuring reliable, low-latency video with minimal backend complexity.

- **Session Token Generation** — The backend generates secure, short-lived session tokens using the VideoSDK API key and secret. Tokens are scoped to a specific meeting and participant, preventing unauthorized access.
- **In-App Video Interface** — The VideoSDK React SDK renders a fully featured video UI within the Patient and Doctor apps — camera, microphone controls, screen sharing, and participant management are all included.
- **Session Lifecycle** — Sessions are created on appointment confirmation and destroyed on completion. Meeting IDs are stored in the appointment record for traceability.
- **Secure by Default** — No video session can be joined without a valid server-generated token, ensuring only the scheduled participants can enter a consultation.

---

### Electronic Health Records (EHR)

The EHR system is the persistent clinical record of each patient, updated by doctors and accessible (read-only) by patients.

- **Centralized Medical History** — Every consultation outcome, diagnosis, and clinical note is stored in the patient's EHR. Records are chronological and structured by encounter.
- **Doctor-Authored Updates** — Only authenticated doctors can write to a patient's EHR. Entries are timestamped and attributed to the authoring physician.
- **Patient Read Access** — Patients can view their complete health record, including past diagnoses, medications, and clinical notes, from their dashboard.
- **Structured Data Schema** — Records are stored as structured documents in MongoDB using a well-defined Mongoose schema, making them queryable and consistent across all entries.
- **Document Attachments** — Lab reports, imaging results, and referral letters can be uploaded and attached to specific EHR entries via the file upload system.

---

### Messaging System

The in-platform messaging system enables asynchronous and near-synchronous communication between doctors and patients outside of video consultations.

- **Real-Time Chat via Socket.IO** — Messages are delivered instantly using WebSocket connections managed by Socket.IO. Both parties see messages appear without any page interaction.
- **Persistent Conversations** — All messages are stored in MongoDB and loaded on conversation open, ensuring full message history is preserved across sessions and devices.
- **In-App Notifications** — New messages trigger real-time notification events on the recipient's dashboard, regardless of which page they are currently viewing.
- **User Presence and Status** — Online/offline status indicators are maintained via Socket.IO room presence, letting users know when the other party is active.
- **Conversation Threading** — Conversations are scoped to a doctor–patient pair, ensuring messages are private and contextually organized.

---

### Prescription Management

The prescription module gives doctors a digital tool for creating and managing patient medications, replacing paper-based or fax-based workflows.

- **Doctor-Authored Prescriptions** — Doctors create prescriptions from within the patient's profile, specifying medication name, dosage, frequency, duration, and any clinical notes.
- **Prescription Storage** — Prescriptions are stored in MongoDB and linked to the patient's record and the specific appointment or encounter that generated them.
- **Patient Medication Tracking** — Patients can view all active and historical prescriptions from their dashboard, with full details on dosage and instructions.
- **Audit Trail** — Every prescription is timestamped and attributed to the issuing doctor, creating a complete audit trail for compliance and patient safety.

---

### File Upload System

CareBridge provides secure, cloud-backed file upload capabilities for medical documents, imaging, and reports.

- **Multer Middleware** — Incoming file uploads are handled by Multer on the Express backend, with file type validation and size limits enforced before any processing occurs.
- **AWS S3 Storage** — Validated files are uploaded directly to AWS S3 buckets, ensuring durable, scalable cloud storage with fine-grained access controls.
- **EHR Integration** — Uploaded files are linked to specific EHR entries or appointments, making them immediately accessible in context within the patient's health record.
- **Secure Access** — File URLs returned to the frontend are either pre-signed S3 URLs (time-limited, scoped to the requesting user) or routed through the backend for access control enforcement.

---

### Dashboards and Analytics

Both user roles have dedicated dashboards providing role-appropriate overviews, KPIs, and actionable items.

**Doctor Dashboard:**
- Upcoming appointments for the day and week
- Pending appointment requests requiring action
- Recent patient messages and notifications
- Patient list with quick access to EHR records
- Consultation history and patient activity

**Patient Dashboard:**
- Upcoming appointments with status indicators
- Active prescriptions and medication schedule
- Recent messages from their doctor
- Quick access to health records and uploaded documents
- Appointment request and rebooking flows

**Data Visualization:**
- Recharts is used for rendering interactive charts and graphs within dashboards — appointment frequency, health metric trends, and consultation history are all visualizable.

---

## Technology Stack

### Frontend

| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 18+ | Component-based UI framework |
| TypeScript | 5+ | Static typing, improved DX and safety |
| Vite | 5+ | Fast build tool and dev server with HMR |
| Tailwind CSS | 3+ | Utility-first CSS framework for rapid styling |
| React Query | 5+ | Server state management, caching, and sync |
| React Router | 6+ | Client-side routing and navigation |
| Formik | 2+ | Form state management and submission handling |
| Yup | 1+ | Schema-based form validation |
| Recharts | 2+ | Composable chart library built on D3 |
| VideoSDK React SDK | Latest | WebRTC video consultation UI components |

### Backend

| Technology | Version | Purpose |
|-----------|---------|---------|
| Node.js | 18+ | JavaScript runtime for the API server |
| Express.js | 4+ | HTTP server framework, routing, middleware |
| MongoDB | 6+ | Document-oriented NoSQL database |
| Mongoose | 7+ | MongoDB ODM — schema, validation, queries |
| Socket.IO | 4+ | Bidirectional WebSocket event layer |
| JSON Web Token | 9+ | Stateless authentication token issuance and validation |
| bcryptjs | 2+ | Password hashing before storage |
| Multer | 1+ | Multipart form data and file upload handling |
| Nodemailer | 6+ | SMTP-based transactional email sending |

### Infrastructure and External Integrations

| Service | Purpose |
|---------|---------|
| VideoSDK | Managed WebRTC infrastructure for video consultations |
| AWS S3 | Cloud object storage for medical documents and uploads |
| Nodemailer (SMTP) | Email notifications for appointment confirmations and alerts |
| MongoDB Atlas (recommended) | Managed cloud MongoDB hosting |

---

## Repository Structure

```
CareBridge/
│
├── backend/                        # Node.js + Express API server
│   ├── controllers/                # Route handler logic (business logic layer)
│   │   ├── authController.ts       # Registration, login, JWT issuance
│   │   ├── appointmentController.ts
│   │   ├── ehrController.ts
│   │   ├── messageController.ts
│   │   └── prescriptionController.ts
│   │
│   ├── models/                     # Mongoose schema definitions
│   │   ├── User.ts                 # Shared user model (doctor + patient)
│   │   ├── Appointment.ts
│   │   ├── HealthRecord.ts
│   │   ├── Message.ts
│   │   └── Prescription.ts
│   │
│   ├── routes/                     # Express route declarations
│   │   ├── authRoutes.ts
│   │   ├── appointmentRoutes.ts
│   │   ├── ehrRoutes.ts
│   │   └── messageRoutes.ts
│   │
│   ├── middleware/                 # Reusable middleware
│   │   ├── authMiddleware.ts       # JWT verification + role guard
│   │   └── uploadMiddleware.ts     # Multer + S3 integration
│   │
│   ├── utils/                      # Helpers and utilities
│   │   ├── generateToken.ts
│   │   ├── emailService.ts
│   │   └── s3Service.ts
│   │
│   ├── socket/                     # Socket.IO event handlers
│   │   └── socketHandlers.ts
│   │
│   └── app.ts                      # Express app entry point, middleware registration
│
│
├── frontend/
│   │
│   ├── Doctor/                     # Doctor-specific React application
│   │   ├── pages/                  # Top-level route components
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Appointments.tsx
│   │   │   ├── PatientRecords.tsx
│   │   │   ├── Consultation.tsx    # Video call page
│   │   │   └── Prescriptions.tsx
│   │   │
│   │   ├── components/             # Doctor-specific UI components
│   │   │   ├── AppointmentCard.tsx
│   │   │   ├── PatientList.tsx
│   │   │   └── EHREditor.tsx
│   │   │
│   │   └── hooks/                  # Custom hooks for data fetching
│   │       ├── useAppointments.ts
│   │       └── usePatients.ts
│   │
│   ├── Patient/                    # Patient-specific React application
│   │   ├── pages/
│   │   │   ├── Dashboard.tsx
│   │   │   ├── BookAppointment.tsx
│   │   │   ├── HealthRecords.tsx
│   │   │   ├── Consultation.tsx
│   │   │   └── Prescriptions.tsx
│   │   │
│   │   ├── components/
│   │   │   ├── AppointmentStatus.tsx
│   │   │   ├── MedicationList.tsx
│   │   │   └── RecordViewer.tsx
│   │   │
│   │   └── hooks/
│   │       ├── useMyAppointments.ts
│   │       └── useHealthRecords.ts
│   │
│   └── shared-modules/             # Code shared between Doctor and Patient apps
│       ├── components/             # Shared UI components (Button, Modal, Input, etc.)
│       ├── hooks/                  # Shared hooks (useAuth, useSocket, useNotifications)
│       ├── api/                    # Axios instance + API call functions
│       ├── types/                  # Shared TypeScript interfaces and types
│       └── utils/                  # Shared utility functions
```

---

## Key Design Principles

### Separation of Concerns

CareBridge enforces a strict boundary between the backend (business logic, data, security) and the frontend (presentation, user interaction). The backend exposes only what is needed via REST and WebSocket APIs. The frontend is purely a consumer of those APIs — it holds no business logic, no database access, and no sensitive secrets.

This separation means each layer can evolve independently. The frontend can be redesigned without touching the backend, and backend services can be refactored or replaced without breaking the UI contract, as long as the API surface remains consistent.

### Role-Based Architecture

The platform is designed from the ground up around two distinct user roles — **Doctor** and **Patient** — each with fundamentally different capabilities, workflows, and data access rights.

Rather than building one monolithic frontend with conditional rendering, CareBridge ships **two separate React applications** — one optimized for clinical workflows (Doctor) and one for patient self-service (Patient). Both consume the same backend API but are independently deployable and maintainable.

Shared UI components, hooks, and API utilities live in `shared-modules`, preventing duplication while preserving the role boundary at the application level.

### Real-Time First

Every feature that benefits from live updates uses Socket.IO rather than polling. Appointment status changes, new messages, and notification events are all pushed to connected clients the moment they occur. This design reduces server load (no repeated polling), improves perceived performance, and enables collaborative interaction patterns (such as live typing indicators) in the future.

The event-driven architecture also decouples producers and consumers — the backend emits events without needing to know which clients are listening, and clients subscribe to only the event streams they care about.

### Scalability

The backend is built as a collection of independent, loosely coupled services (Auth, Appointments, EHR, Messaging, Prescriptions) organized by domain. Each service has its own controller, route, and model — meaning any single service can be extracted into a standalone microservice in the future without restructuring the rest of the system.

The two independent frontend applications can be deployed and scaled separately, allowing resources to be allocated based on actual traffic patterns for each user type.

---

## API Reference

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/api/auth/register` | Register a new user (doctor or patient) with role assignment | No |
| `POST` | `/api/auth/login` | Authenticate with email and password, returns a signed JWT | No |

**Request body — Register:**
```json
{
  "name": "Dr. Jane Smith",
  "email": "jane@clinic.com",
  "password": "securePassword123",
  "role": "doctor"
}
```

**Request body — Login:**
```json
{
  "email": "jane@clinic.com",
  "password": "securePassword123"
}
```

**Response — Login:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "64f2a...",
    "name": "Dr. Jane Smith",
    "role": "doctor"
  }
}
```

---

### Appointments

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/appointments` | Fetch all appointments for the authenticated user (scoped by role) | Yes |
| `POST` | `/api/appointments` | Create a new appointment request | Yes (Patient) |
| `PUT` | `/api/appointments/:id` | Update appointment status (confirm, reschedule, cancel) | Yes (Doctor) |

**Request body — Create Appointment:**
```json
{
  "doctorId": "64f2b...",
  "date": "2025-09-15T10:00:00Z",
  "reason": "Routine checkup"
}
```

---

### Health Records

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/health-records` | Retrieve health records for the authenticated patient | Yes |
| `POST` | `/api/health-records` | Create or update a health record entry for a patient | Yes (Doctor) |

**Request body — Create Record:**
```json
{
  "patientId": "64f3c...",
  "appointmentId": "64f4d...",
  "diagnosis": "Hypertension - Stage 1",
  "notes": "Advised lifestyle changes. Prescribed Amlodipine 5mg.",
  "attachments": []
}
```

---

### Prescriptions

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/prescriptions` | Retrieve all prescriptions for the authenticated patient | Yes |
| `POST` | `/api/prescriptions` | Create a new prescription for a patient | Yes (Doctor) |

---

### WebSocket Events

All real-time communication is handled through Socket.IO. Clients connect to the server with their JWT and join user-specific rooms.

| Event | Direction | Payload | Description |
|-------|-----------|---------|-------------|
| `send_message` | Client → Server | `{ receiverId, content }` | Send a chat message to another user |
| `receive_message` | Server → Client | `{ senderId, content, timestamp }` | Incoming message from another user |
| `appointment_updated` | Server → Client | `{ appointmentId, status }` | Broadcast when appointment status changes |
| `user_status` | Server → Client | `{ userId, status: 'online' | 'offline' }` | Presence update for connected users |
| `new_notification` | Server → Client | `{ type, message, referenceId }` | Generic notification event |

---

## Environment Variables

Create a `.env` file in the `backend/` directory before starting the server. All variables listed below are required for full functionality.

```env
# ── Database ─────────────────────────────────────────────
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/carebridge

# ── Server ───────────────────────────────────────────────
PORT=3000
NODE_ENV=development

# ── Authentication ────────────────────────────────────────
JWT_SECRET=your_long_random_secret_key_here
JWT_EXPIRES_IN=7d

# ── VideoSDK ─────────────────────────────────────────────
VIDEOSDK_API_KEY=your_videosdk_api_key
VIDEOSDK_SECRET_KEY=your_videosdk_secret_key

# ── AWS S3 ────────────────────────────────────────────────
AWS_ACCESS_KEY_ID=your_aws_access_key_id
AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
AWS_REGION=us-east-1
AWS_S3_BUCKET_NAME=carebridge-uploads

# ── Email ─────────────────────────────────────────────────
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
```

Create a `.env` file in each frontend directory (`frontend/Doctor/` and `frontend/Patient/`):

```env
# ── API ───────────────────────────────────────────────────
VITE_API_URL=http://localhost:3000

# ── VideoSDK ─────────────────────────────────────────────
VITE_VIDEOSDK_API_KEY=your_videosdk_api_key
```

> **Security Warning:** Never commit `.env` files to version control. Add them to `.gitignore` immediately. Rotate any credentials that are accidentally exposed.

---

## Getting Started

### Prerequisites

Ensure the following are installed on your development machine before proceeding:

| Requirement | Minimum Version | Purpose |
|-------------|----------------|---------|
| Node.js | v18.0.0 | Runtime for backend and build tools |
| npm | v9.0.0 | Package management |
| MongoDB | v6.0 (or MongoDB Atlas) | Database |
| VideoSDK Account | — | API keys for video consultations |
| AWS Account | — | S3 bucket for file storage |

---

### Installation

Clone the repository to your local machine:

```bash
git clone https://github.com/Vineetpandey0/CareBridge.git
cd CareBridge
```

---

### Backend Setup

```bash
# Navigate to the backend directory
cd backend

# Install all dependencies
npm install

# Copy the example environment file and fill in your values
cp .env.example .env

# Start the development server with hot reload
npm run dev
```

The API server will start on `http://localhost:3000` by default.

---

### Frontend Setup

CareBridge ships two independent frontend applications. Both must be started separately during development.

**Doctor Application:**
```bash
cd frontend/Doctor

# Install dependencies
npm install

# Copy and configure environment variables
cp .env.example .env

# Start the Vite development server
npm run dev
```

The Doctor app will be available at `http://localhost:5173`.

**Patient Application:**
```bash
cd frontend/Patient

# Install dependencies
npm install

# Copy and configure environment variables
cp .env.example .env

# Start the Vite development server
npm run dev
```

The Patient app will be available at `http://localhost:5174`.

---

## Production Build

### Backend

```bash
cd backend

# Compile TypeScript to JavaScript
npm run build

# Start the production server
npm start
```

### Frontend

Build both frontend applications for production deployment:

```bash
# Doctor App
cd frontend/Doctor
npm run build
# Output: frontend/Doctor/dist/

# Patient App
cd frontend/Patient
npm run build
# Output: frontend/Patient/dist/
```

The `dist/` directories contain fully static, optimized builds that can be deployed to any static hosting provider (e.g., AWS S3 + CloudFront, Vercel, Netlify) or served directly by the backend Express server.

---

## Security

CareBridge is built with security as a first-class concern across every layer of the stack:

- **JWT Authentication** — All API routes (except `/auth/register` and `/auth/login`) require a valid, server-signed JWT. Tokens are verified on every request using the `JWT_SECRET` environment variable. Tampered or expired tokens are rejected with a `401 Unauthorized` response.
- **Role-Based Route Guards** — Middleware validates not just token authenticity but also the user's role before allowing access to role-specific endpoints. A patient JWT cannot authorize doctor-only actions, and vice versa.
- **Password Hashing** — User passwords are never stored in plaintext. They are hashed using `bcryptjs` with a configurable salt round before being persisted to the database.
- **Input Validation and Sanitization** — All incoming request bodies are validated before reaching business logic. Mongoose schemas enforce data types and constraints at the database level. This prevents malformed data and guards against NoSQL injection patterns.
- **File Upload Restrictions** — Multer middleware enforces file type allowlists (e.g., PDF, JPEG, PNG) and maximum file size limits. Files are renamed to prevent path traversal attacks.
- **CORS Policy** — The Express server is configured with a strict CORS policy that only allows requests from known frontend origins, preventing unauthorized cross-origin API access.
- **XSS Prevention** — The React frontend escapes all dynamic content by default. No `dangerouslySetInnerHTML` patterns are used without explicit sanitization.
- **Environment Secret Management** — All secrets (JWT keys, AWS credentials, API keys) are stored in environment variables and never hardcoded or committed to the repository.

---

## Performance

CareBridge is designed for responsiveness and efficiency from day one:

- **Optimized API Design** — Endpoints return only the data required by the requesting client. Mongoose queries use `.select()` and `.lean()` where appropriate to reduce memory overhead and serialization cost.
- **Client-Side Caching with React Query** — React Query manages all server state on the frontend, caching responses, deduplicating concurrent requests, and automatically refetching stale data in the background. Network requests are minimized without sacrificing data freshness.
- **Lazy Loading** — React Router's `lazy()` and `Suspense` patterns are used to split the application bundle by route. Users only download the JavaScript for the pages they actually visit, dramatically reducing initial load time.
- **Efficient WebSocket Handling** — Socket.IO rooms ensure that events are delivered only to relevant subscribers. A message between a doctor and patient is not broadcast globally — it is emitted only to the room shared by those two users.
- **Database Indexing** — Mongoose models define indexes on frequently queried fields (e.g., `userId`, `appointmentDate`, `status`) to ensure fast lookups even as data volume grows.
- **S3 for Static Assets** — Medical files and uploads are served directly from AWS S3, offloading bandwidth and storage from the application server entirely.

---

## Future Enhancements

The following features are planned for future releases:

- **AI-Based Symptom Checker** — An AI-powered pre-consultation flow that guides patients through symptom collection and provides a preliminary triage assessment before their appointment, helping doctors prioritize and prepare.
- **Smart Appointment Prioritization** — Machine learning-based urgency scoring that automatically surfaces high-priority appointments to doctors based on patient-reported symptoms and historical health data.
- **Mobile Application** — A React Native mobile app or Progressive Web App (PWA) delivering the full CareBridge experience to iOS and Android users, with offline support for health record access.
- **Multi-Language Support** — Internationalization (i18n) support using `react-i18next`, enabling CareBridge to serve non-English-speaking patient and doctor populations.
- **FHIR-Based EHR Integration** — Implementation of the HL7 FHIR (Fast Healthcare Interoperability Resources) standard to enable bidirectional data exchange with hospital EMR systems, external labs, and pharmacies.
- **Pharmacy Integration** — Direct e-prescription transmission to partner pharmacies, enabling patients to have prescriptions fulfilled without a physical paper copy.
- **Wearable Device Sync** — Integration with Apple Health, Google Fit, and other wearable data sources to automatically populate patient health records with real-time metrics.

---

## Contributing

Contributions are welcome. Please follow the workflow below to maintain code quality and review standards.

1. **Fork the repository** — Create your own fork of CareBridge on GitHub.
2. **Create a feature branch** — Branch off from `main` with a descriptive name:
   ```bash
   git checkout -b feature/appointment-reminders
   ```
3. **Implement your changes** — Follow the existing code style. TypeScript is required for all new files. Add comments for non-obvious logic.
4. **Test your changes** — Ensure existing functionality is not broken and that new features work as expected across both frontend apps and the backend.
5. **Commit with a descriptive message** — Follow conventional commit format:
   ```bash
   git commit -m "feat: add appointment reminder email notifications"
   ```
6. **Open a Pull Request** — Submit a PR against the `main` branch. Describe what the PR does, why the change is needed, and any relevant testing steps.

---

## License

No license is currently specified for this project. All rights are reserved by the author until a license is added. If you intend to use, fork, or contribute to this project, please contact the repository owner for permission.

---

> **CareBridge** is not just a project — it is a scalable healthcare ecosystem built with modern engineering practices.  
> Built to bridge the gap between patients and doctors — efficiently, securely, and at scale.
