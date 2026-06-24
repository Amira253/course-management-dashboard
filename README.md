# Course Management Dashboard

## Overview

Course Management Dashboard is a responsive web application built with Angular 19 that allows users to manage courses efficiently through a modern and user-friendly interface.

The application supports creating, viewing, updating, and deleting courses, along with search, filtering, sorting, and pagination features.

---

## Features

### Core Features

- View all courses in a data table
- Add a new course
- Edit existing courses
- Delete courses
- View course details
- Search courses by name
- Filter courses by status
- Form validation using Reactive Forms

### Additional Features

- Lazy Loaded Routes
- Angular Material UI
- Pagination
- Sorting
- Snackbar Notifications
- Confirmation Dialog before Delete
- Loading State
- Empty State
- Responsive Design

---

## Technologies Used

- Angular 19
- TypeScript
- Angular Material
- RxJS
- SCSS
- JSON Server

---

## Project Structure
src/app
│
├── features
│   └── courses
│       ├── components
│       ├── models
│       ├── pages
│       ├── services
│       └── courses.routes.ts
│
├── shared
│   └── components
│
├── app.config.ts
├── app.routes.ts

---

## Installation

Clone the repository:
git clone <repository-url>

Navigate to the project folder:
cd course-management-dashboard

Install dependencies:
npm install

---

## Running the Application

### Start Mock API
npm run mock-api

The API will run on:
http://localhost:3000

### Start Angular Application
ng serve

The application will be available at:
http://localhost:4200

---

## Available Functionality

| Feature 
|----------|----------|
| View Courses 
| Add Course 
| Edit Course 
| Delete Course 
| Course Details 
| Search 
| Filter 
| Pagination 
| Sorting 
| Snackbar Notifications 
| Confirmation Dialog 
| Loading State 
| Empty State 
| Lazy Loading 

---

## Screenshots

![Dashboard](./screenshots/Dashboard.png)

![Course Form](./screenshots/Course-form.png)

![Course details](./screenshots/Course-details.png)

![Edit Course](./screenshots/Edit-Course.png)

![Confirm dialog](./screenshots/Confirm-dialog.png)




---

## Author

Amira Ibrahim

Frontend Developer

---