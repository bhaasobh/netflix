# Netflix-Inspired Streaming Platform

A modern React application inspired by Netflix, built to demonstrate a complete streaming experience with authentication, profile switching, content browsing, personal lists, media reviews, and an admin content-management flow.

This project was designed as a full frontend experience with real API integration and a strong focus on user experience, product thinking, and clean component architecture.

## Overview

The app allows users to:
- Sign in and sign up
- Create and manage multiple profiles
- Browse movies and TV content from TMDB
- View a home page with featured media and category-based rows
- Add media to a personal "My List"
- Review favorite titles
- Access an admin panel to add new titles to the platform

---

## Key Features

### User Authentication
- Login and registration flow
- Session persistence with local storage
- Protected user context for application-wide state

### Profile Management
- Create multiple user profiles
- Select a profile before entering the app
- Personalize content based on the active profile

### Media Discovery
- Netflix-style horizontal movie/TV rows
- Featured hero section with rotating media cards
- TMDB-powered content and posters

### Personalization
- My List feature
- Review-related media tracking
- Personalized home experience per user profile

### Admin Experience
- Add new movies or TV shows through a dedicated admin screen
- Simple modal form to submit media metadata

### UI/UX
- Dark theme inspired by streaming platforms
- Responsive layout
- Reusable row and modal components

---

## Tech Stack

- React.js
- React Router
- JavaScript (ES6+)
- Bootstrap / React-Bootstrap
- TMDB API integration
- REST API communication
- LocalStorage for auth/profile state

---

## Project Structure

```bash
src/
├── App.js
├── config.js
├── components/
│   ├── AddMediaForm.jsx
│   ├── Footer.jsx
│   ├── Header.jsx
│   ├── HeaderHome.jsx
│   ├── HomeCover.jsx
│   ├── MoreInfoModal.jsx
│   ├── ProfileCard.jsx
│   ├── RowComponent.jsx
│   ├── SignInForm.jsx
│   ├── SignUpForm.jsx
│   └── SuccessModal.jsx
├── context/
│   └── AuthContext.js
├── css/
│   ├── Footer.css
│   ├── SignIn.css
│   └── WhoIsWatching.css
├── pages/
│   ├── Admin.jsx
│   ├── Home.jsx
│   ├── MyListPage.jsx
│   ├── ReviewPage.jsx
│   ├── SignIn.jsx
│   ├── SignUp.jsx
│   └── whoswatching.jsx
└── index.js
```

---

## How the App Works

1. The user signs in or creates an account.
2. They choose or create a profile.
3. The home page loads featured and trending media from TMDB.
4. Users can browse rows by category and open a title detail modal.
5. Media can be saved to the user's list and reviewed.
6. Admin users can add new titles through the admin panel.

---

## Important Notes

This project is connected to:
- TMDB for movie and show data
- A backend API service for authentication, profiles, reviews, and media storage

The app configuration is centralized in the file `src/config.js`, which contains the API endpoints and the TMDB token.

> For a real production environment, credentials and API keys should be moved to environment variables instead of being stored directly in the client code.

---

## Getting Started

### Prerequisites

- Node.js v18+
- npm or yarn

### Installation

```bash
npm install
```

### Run locally

```bash
npm start
```

Then open:

```bash
http://localhost:3000
```

### Production build

```bash
npm run build
```

---

## Why This Project Is Strong for Interviews

This project demonstrates multiple important software engineering skills:

- Frontend development with React and routing
- State management using React context
- API integration with third-party services
- User flow design and content personalization
- UI implementation inspired by a real-world product
- Full-stack product thinking through user, profile, and media data

It shows practical experience in building a product-like interface that looks and behaves like a real streaming service while also emphasizing data flow and user experience.

---

## Future Improvements

- Add search and filters
- Implement real favorites/reviews persistence with better validation
- Add dark/light theme toggle
- Create a more advanced admin dashboard
- Improve performance with lazy loading, caching, and optimization
- Move secrets to environment variables and secure the backend flow

---

## Project Status

This is a functional frontend prototype and product-style demo that highlights product design, API integration, and user-centered interaction patterns.

---

## Author

Built as a portfolio-style project to demonstrate frontend development, product thinking, and real-world app workflow design.

