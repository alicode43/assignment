# **Role-Based Access Control (RBAC) Dashboard**

## **Overview**
The **Role-Based Access Control (RBAC) Dashboard** is a web application built with **Next.js 15**, **TypeScript**, and **Tailwind CSS**. It enables administrators to efficiently manage users, roles, and permissions through a secure and intuitive interface. This project demonstrates core RBAC functionality, including CRUD operations, role assignment, and dynamic permissions.

---

## **Features**
### **Core Functionality**
- **User Management**: Add, edit, delete users, and assign roles or statuses (Active/Inactive).
- **Role Management**: Create and edit roles, and assign permissions dynamically.
- **Permission Management**: Manage a list of permissions like Read, Write, Delete, and more.

### **Technical Highlights**
- **Next.js File-Based Routing**: Intuitive and scalable routing structure.
- **TypeScript**: Ensures type safety and maintainability.
- **Tailwind CSS**: Delivers a clean, responsive, and modern UI.
- **Reusable Components**: Simplifies code with modular components for tables, modals, and navigation.

---

Getting Started
Follow these instructions to set up and run the project locally.

## Prerequisites

Node.js (v18 or later)
npm or Yarn

Installation

## Clone the Repository

git clone https://github.com/alicode43/assignment
cd rbac-dashboard 


## Install Dependencies
npm install
(note if it not work)


## Run the Development Server
npm run dev

## **Folder Structure**
```plaintext
src/
├── app/
│   ├── api/
│   │   ├── users/
│   │   │   └── route.ts
│   │   ├── roles/
│   │   │   └── route.ts
│   │   ├── permissions/
│   │   │   └── route.ts
│   ├── users/
│   │   └── page.tsx
│   ├── roles/
│   │   └── page.tsx
│   ├── permissions/
│   │   └── page.tsx
│   └── layout.tsx
├── components/
│   ├── UserTable.tsx
│   ├── RoleTable.tsx
│   ├── PermissionTable.tsx
│   ├── Modal.tsx
│   └── NavBar.tsx
├── styles/
│   └── globals.css
└── README.md
