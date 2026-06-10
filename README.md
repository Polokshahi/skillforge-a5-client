# 🎓 SkillForge Academy - Client Frontend

SkillForge Academy is a modern, full-stack e-learning and course-selling platform. This repository contains the frontend client application built using **Next.js 15 (App Router)**, **React 19**, **TypeScript**, and **Tailwind CSS v4**.

## 🚀 Live Links & Assignment Deliverables
- **Frontend Live URL:** https://skillforge-a5-client.netlify.app/
- **Backend API Live URL:** https://skillforge-a5-server.vercel.app/
- **Backend Repository:** https://github.com/Polokshahi/skillforge-a5-server

---

## 🔑 Test Credentials (RBAC Evaluation)

To test the Role-Based Access Control (RBAC) features, please use the following credentials:

### 👨‍💼 Administrator Account
- **Email:** `admin@skillforge.academy`
- **Password:** `Admin@12345`
- *Access:* Full access to Admin Dashboard, course management (CRUD), sales analytics, and student overviews.

### 🧑‍🎓 Student Account
- **Email:** `student@skillforge.academy`
- **Password:** `Student@12345`
- *Access:* Browsing catalog, checking out via Stripe, accessing enrolled courses, and checking progress.

---

## 🌟 Key Features Implemented

1. **Homepage Design (4+ Sections):** A professional layout consisting of a polished Navbar, Hero Section, Feature Highlights, Testimonial sliders, Course Pricing layout, and a comprehensive Footer.
2. **Advanced UI/UX Quality:** Powered by Radix UI primitives, ensuring accessible, fluid, and fully responsive layouts across all device viewports. Enhanced with **Framer Motion** for subtle entrance animations.
3. **Robust Form Handling & Validation:** Built using `react-hook-form` paired with `zod` for real-time validation, preventing incorrect schema submissions before reaching the server.
4. **State Management:** Handled locally and globally via `zustand` to persistently maintain authentication states, persistent user sessions, and shopping workflows.
5. **Interactive Data Analytics:** Features dynamic charts powered by `recharts` on the Admin dashboard to review course performance metrics visually.
6. **Polished Feedback System:** Implements global interactive toasts via `sonner` and `@radix-ui/react-toast` for real-time error and success states.

---

## 🛠️ Technology Stack Used

- **Core Framework:** Next.js 15 (App Router) & React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 & Class Variance Authority (CVA)
- **UI Components:** Radix UI UI primitives (Accordion, Avatar, Dialog, Dropdown, Tabs, Progress, Select, Separator)
- **State Management:** Zustand
- **Data Fetching:** Axios
- **Animations:** Framer Motion
- **Icons:** Lucide React

---

## ⚙️ Local Setup Instructions

Follow these steps to run the client-side application in your local environment:

1. **Clone the repository:**
```bash
   git clone [your-frontend-repo-url]
   cd [repo-folder-name]
