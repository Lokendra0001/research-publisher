# IJARMY Frontend: Academic Publishing User Interface 

The IJARMY Frontend is a high-performance, responsive Single Page Application (SPA) built with **Next.js 14**. It is designed to provide a seamless and intuitive experience for authors, researchers, peer-reviewers, and journal publishers.

---

## 📑 Table of Contents

- [Project Overview](#project-overview)
- [Core Technologies](#core-technologies)
- [Dashboard Architecture](#dashboard-architecture)
  - [Author Dashboard](#author-dashboard)
  - [Reviewer Dashboard](#reviewer-dashboard)
  - [Publisher Dashboard](#publisher-dashboard)
- [Directory Structure](#directory-structure)
- [State Management & Data Flow](#state-management--data-flow)
- [Routing & Security](#routing--security)
- [Setup & Installation](#setup--installation)
- [Styling & UI Components](#styling--ui-components)
- [API Communication](#api-communication)

---

## 🚀 Project Overview

The primary goal of the IJARMY frontend is to simplify the complex workflow of academic publishing. The UI is built to handle heavy data entry (submissions), complex decision-making (reviews), and document management (manuscripts/certificates) while maintaining a clean, professional aesthetic.

Key UI Features:

- **Dynamic Dashboards:** Each user role has a tailored workspace.
- **Client-Side Navigation:** Fast transitions between views using Next.js App Router and URL Query Params.
- **Robust Forms:** Managed with `react-hook-form` to handle multi-author logic and file uploads.
- **Real-time Feedback:** Integrated toast notifications and loading skeletons for a smooth UX.

---

## 💻 Core Technologies

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router Architecture)
- **Library:** React.js
- **Styling:** Vanilla CSS & Tailwind CSS (for utility-first responsiveness)
- **State Management:** Redux Toolkit (for global Auth/User state)
- **Icons:** Lucide-React
- **HTTP Client:** Axios
- **Form Handling:** React-Hook-Form

---

## 🏛️ Dashboard Architecture

The platform is logically split into three major protected workspaces:

### **1. ✍️ Author Dashboard** (`/author/role`)

- **Multi-step Submission:** Handles paper titles, abstracts, multi-author arrays, and reviewer nominations.
- **Tracking System:** Visual status indicators for all submitted manuscripts.
- **Payment Portal:** Redirects and callback handling for successful paper fee processing.
- **Downloads:** Access to manuscripts and generated certificates.

### **2. 🧐 Reviewer Dashboard** (`/reviewer/role`)

- **Invitation Hub:** A simplified list for accepting or declining new peer-review requests.
- **Manuscript Reviewer:** Integrated manuscript viewer and decision submission form.
- **Performance Tracking:** History of reviews, recommended decisions, and deadline compliance.

### **3. 🛠️ Publisher Dashboard** (`/publisher/role`)

- **Global Control:** Management of all reviewers, papers, and homepage content.
- **Publication Engine:** Tools to assign papers to specific Volumes and Issues.
- **Certification Manager:** Interface to trigger and verify the issuance of digital certificates.
- **Financial Board:** Monitoring refunds and payment successes across the site.

---

## 📂 Directory Structure

```bash
client/
├── public/                 # Static assets (images, fonts, global icons)
├── src/
│   ├── app/                # Next.js App Router folders (layout.js, page.js)
│   │   ├── author/         # Author-specific sub-routes
│   │   ├── reviewer/       # Reviewer-specific sub-routes
│   │   └── publisher/      # Publisher-specific sub-routes
│   ├── components/         # Reusable Component Library
│   │   ├── author/        # UI pieces specific to Authors
│   │   ├── reviewer/      # UI pieces specific to Reviewers
│   │   ├── publisher/     # UI pieces specific to Publishers
│   │   └── common/        # Generic UI (Buttons, Modals, Skeletons)
│   ├── redux/             # Global Store configuration and Auth slices
│   ├── customHooks/       # Shared logic (useAuth, useLocalStorage, etc.)
│   ├── utils/             # API instances, constants, and toast configs
│   └── styles/            # Global and modular CSS files
```

---

## 🔄 State Management & Data Flow

The application uses a hybrid approach to state management:

1. **Redux Toolkit:** Used exclusively for **Global Persistence**—specifically the authenticated user's profile, roles, and session tokens.
2. **URL Query Parameters:** Used for **Dashboard Navigation**. The `?page=...` param determines which view component is rendered in the dashboard layout.
3. **Local State (React Hooks):** Used for **Component-Specific Data**, such as form inputs, local filters, and modal toggles.
4. **Context API:** Used for theme management and global toast notification instances.

---

## 🔐 Routing & Security

- **Role-Based Guards:** Middleware and client-side checks ensure that an Author cannot access the Publisher dashboard.
- **Protected Routes:** Every route under `/author`, `/reviewer`, and `/publisher` requires a valid JWT stored in HTTP-only cookies or Redux state.
- **Axios Interceptors:** Automatically attaches the JWT to the header of every outgoing request for seamless security.

---

## ⚙️ Setup & Installation

### **1. Prerequisites**

- Node.js (v18.0.0+)
- npm or yarn

### **2. Installation**

```bash
git clone <repository-url>
cd ijarmy/client
npm install
```

### **3. Configuration**

Create a `.env` file in the `client/` root:

```env
NEXT_PUBLIC_SERVER_URL=http://localhost:3002/api/v1
NEXT_PUBLIC_PAYMENT_URL=https://secure.payu.in/_payment
```

### **4. Run Development Server**

```bash
npm run dev
```

Open `http://localhost:3000` to view the application.

---

## 🎨 Styling & UI Components

The UI follows a professional academic aesthetic:

- **Consistency:** All tables, buttons, and badges are derived from a `common/` component library.
- **Feedback:** Use of `Skeleton` components ensures that users see a layout while data is being fetched.
- **Validation:** Visual error messages integrated with `react-hook-form` and `notify` (Toastify).

---

## 📡 API Communication

The frontend communicates exclusively with the RESTful backend. All API interactions are simplified through the `utils/api.js` helper, which handles base URLs and default configurations.

- **Example Fetch:**
  ```javascript
  const res = await axios.get(`${constant.SERVER_URL}/papers?status=accepted`);
  ```

---

© 2026 IJARMY Development Team. All Rights Reserved.
