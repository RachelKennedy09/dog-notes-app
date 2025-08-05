# 🐾 Rocky Mountain Tails: Dog Notes App

Welcome to the **Dog Notes App**, a secure and user-friendly note-taking system built for dog walkers at **Rocky Mountain Tails**. Walkers can log in to write and review personalized notes after each walk. The app features full CRUD functionality, authentication, and database integration.

---

## 📂 Project Structure

- **Frontend**: HTML, CSS (GitHub Pages)
- **Backend**: Node.js, Express, MongoDB 
- **Authentication**: Session-based login
- **Database**: MongoDB with Mongoose models
- **Views**: EJS templates
- **Routing**: Express routes for login, notes, and logout
- **Project Folder**: `dog-notes-app` 

---

## 🚀 How to Run the App Locally

### 🧰 Prerequisites

- Node.js & npm installed
- MongoDB (Atlas or local MongoDB)
- Git

### 📦 Installation


-git clone[Rocky Mountain Tails](https://github.com/RachelKennedy09/PortfolioMAIN)
-cd RockyMountainTails/dog-notes-app
-npm install


### 🔑 Setup Environment Variables

Create a `.env` file in `dog-notes-app/` with:

```
MONGODB_URI=your-mongodb-connection-uri
SESSION_SECRET=your-secret-key
```

### 🖥 Start the Server


npm run dev

Visit: homepage → WalkerLogin or WalkerRegister
<<<<<<< HEAD
👉 https://github.com/RachelKennedy09/PortfolioMAIN/tree/main/projects/DogWalking_Finderapp
=======
👉[Rocky Mountain Tails](https://github.com/RachelKennedy09/PortfolioMAIN/tree/main/projects/DogWalking_Finderapp)

To log in: visit [http://localhost:3000](http://localhost:3000)
>>>>>>> f7d2a8039ed89290cd48602b48ce22f6d0ec68dc

To log in: visit [http://localhost:3000](http://localhost:3000)
To log out: Logout button takes you to the home page
---

## 🧪 API Overview

| Method | Endpoint         | Description               |
|--------|------------------|---------------------------|
| GET    | `/notes`         | View all notes for user   |
| POST   | `/notes`         | Create new note           |
| GET    | `/notes/:id/edit`| Edit form for a note      |
| PUT    | `/notes/:id`     | Update a note             |
| DELETE | `/notes/:id`     | Delete a note             |
| GET    | `/login`         | Show login form           |
| POST   | `/login`         | Authenticate user         |
| GET    | `/logout`        | End session + redirect    |

> All notes are **user-specific**. A user only sees their own notes.

---

## 🔐 Authentication

- Users must log in to access their notes.
- Sessions are securely stored.
- Logout clears the session and redirects to the homepage.

---

## 🧠 Challenges & What I Learned

This project was an incredible learning experience. Here are some of the **wins** and **challenges** I encountered:

### ✅ Wins:
- Built a full-stack app with **backend + frontend integration**
- Created RESTful routes and used MongoDB effectively
- Added **authentication** using session-based login
- Deployed my homepage with **GitHub Pages**
- Used GitHub version control and learned how to organize my project properly

### 😅 Challenges:
- Had to reorganize my entire project mid-way to clean up file paths and folders
- Originally forgot to redirect logout properly to the homepage (fixed it by switching from `req.logout()` to `req.session.destroy()`)
- Learned how to separate my backend app from the GitHub Pages frontend and connect them cleanly
- Debugged image paths and GitHub Pages issues due to incorrect nesting
- Accidentally initialized Git inside a subfolder and had to reset `.git` and remote origin

### 💡 Key Takeaways:
- **Organization is everything** — it's easier to build and debug when the project is clean
- Deploying static sites vs server-side apps requires different strategies (GitHub Pages vs Render)
- I'm now confident with RESTful routes, Express setup, and Git workflow

---

## 📎 Submission Summary

- ✅ GitHub Repo: [https://github.com/RachelKennedy09/portfolioMAIN](https://github.com/RachelKennedy09/portfolioMAIN)
- ✅ Note-Taking App: `dog-notes-app` folder with backend logic
