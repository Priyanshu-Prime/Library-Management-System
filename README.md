# Library Management System

A comprehensive Library Management System built using React for the frontend and Node.js with Prisma for the backend. This project is designed to manage books, students, and issued books efficiently, with features for both users and administrators.

## Features

### User Features
- Login using Google OAuth.
- View available books and their details.
- Search for books by keywords.
- View issued books and their return status.

### Admin Features
- Add, update, and delete books.
- Manage student records.
- View and manage issued books.
- Mark books as returned.
- Send email reminders for overdue books.

## Project Structure
Library-Management-System/  
├── backend/  
│   ├── controllers/       # Backend logic for handling requests  
│   ├── models/            # Prisma models and database queries  
│   ├── routes/            # API routes  
│   ├── schedulers/        # Cron jobs for email reminders  
│   ├── tests/             # Unit tests for backend  
│   ├── prisma/            # Prisma schema and migrations  
│   ├── server.js          # Main server file  
│   └── config/            # Configuration files (e.g., database, nodemailer)  
├── client/  
│   ├── public/            # Static assets  
│   ├── src/  
│   │   ├── components/    # Reusable React components  
│   │   ├── pages/         # React pages for different views  
│   │   ├── App.jsx        # Main React app  
│   │   ├── main.jsx       # React entry point  
│   │   └── index.css      # Global styles  
├── DataFiles/             # CSV files for initial data  
├── Design/                # UML diagrams and design documents  
└── package.json           # Project dependencies and scripts  

## Installation

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL
- Prisma CLI

### Backend Setup
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up the `.env` file with the following variables:
   ```env
   PORT=3001
   DATABASE_URL=postgresql://<username>:<password>@localhost:5432/<database>?schema=public
   MY_EMAIL=<your-email>
   MY_PASSWORD=<your-email-password>
   JWT_SECRET=<your-jwt-secret>
   ```
4. Run Prisma migrations:
   ```bash
   npx prisma migrate dev
   ```
5. Start the backend server:
   ```bash
   npm start
   ```

### Frontend Setup
1. Navigate to the `client` directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up the `.env` file with the following variable:
   ```env
   VITE_ADDRESS=localhost:3001
   ```
4. Start the frontend development server:
   ```bash
   npm run dev
   ```

### Running the Full Application
1. Navigate to the root directory and run:
   ```bash
   npm run start
   ```
   This will concurrently start both the backend and frontend servers.

## Usage

### Admin Dashboard
- Navigate to `/adminDashboard` to access the admin dashboard.
- Manage books, students, and issued records.

### User Dashboard
- Navigate to `/dashboard` to access the user dashboard.
- Search for books and view issued records.

## Testing
- Backend tests are located in the `backend/tests` directory.
- Run tests using:
   ```bash
   npm vitest
   ```

## UML Diagrams
- Activity and sequence diagrams are available in the `Design` folder.

## Data Files
- Sample data for books, students, and issued books are available in the `DataFiles` folder.

## Technologies Used

### Frontend
- React
- Tailwind CSS
- Vite

### Backend
- Node.js
- Express.js
- Prisma ORM
- PostgreSQL
- Nodemailer
- Cron Jobs

### Testing
- Vitest
- Supertest

## Acknowledgments
- [Prisma Documentation](https://www.prisma.io/docs)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
