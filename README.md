# OralVis Healthcare - Frontend (React)

This is the **frontend** for the OralVis Healthcare full-stack assignment.  
It is built with **React (Create React App)**, **React Router v5**, and **Axios**.  

The frontend communicates with the OralVis **backend API** for authentication, scan upload (with Cloudinary), and dentist PDF reports.

---

## 🚀 Live Demo

- **Frontend (Vercel):** [https://oralvis-frontend-git-main-kalva-vinays-projects.vercel.app/login](https://oralvis-frontend-git-main-kalva-vinays-projects.vercel.app/login)  
- **Backend (Render):** [https://oralvis-backend-dftl.onrender.com](https://oralvis-backend-dftl.onrender.com)

---

## ✨ Features

- **Authentication**
  - Login (JWT-based)
  - Register (Technician or Dentist role)

- **Technician Dashboard**
  - Upload patient scans (image + metadata)
  - View last uploaded scan with preview

- **Dentist Dashboard**
  - View all uploaded scans in a responsive grid
  - Open scan images in full size
  - Download PDF reports of scans

- **Role-based routing**
  - Technicians → `/upload`
  - Dentists → `/scans`
  - Unauthorized users redirected to `/login`

- **Responsive design**
  - Works across mobile, tablet, and desktop

---

## 🛠️ Tech Stack

- **React 18 (CRA)**
- **React Router v5.3.4**
- **Axios** (API communication)
- **Context API** (Auth state)
- **CSS (custom styles, responsive)**

---

## 📂 Project Structure

```

src/
api/api.js               # Axios instance (points to backend API)
context/AuthContext.js   # Auth provider & state
pages/
LoginPage.js           # Login form
RegisterPage.js        # Register form
TechnicianUpload.js    # Technician upload dashboard
DentistViewer.js       # Dentist dashboard (scan list)
components/
UploadForm.js          # Reusable scan upload form
ScanList.js            # Reusable scan list + PDF download
App.js                   # Routes and navigation
index.js                 # App entry point
styles.css               # Global styles

````

---

## ⚙️ Installation & Local Development

1. **Clone repo**
   ```bash
   git clone <repo_url>
   cd oralvis-frontend
````

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure backend URL**
   The frontend is preconfigured to use the deployed backend:

   ```
   https://oralvis-backend-dftl.onrender.com/api
   ```

   If you want to use a local backend, create a `.env` file in the project root:

   ```
   REACT_APP_API_URL=http://localhost:8080/api
   ```

4. **Run locally**

   ```bash
   npm start
   ```

   Visit → [http://localhost:3000](http://localhost:3000)

---

## 🧪 API Endpoints Used

* `POST /api/auth/register` → Register new user
* `POST /api/auth/login` → Login (returns `{ user, token }`)
* `POST /api/scans` → Upload scan (Technician only)
* `GET /api/scans` → List all scans (Dentist only)
* `GET /api/scans/:id/pdf` → Download scan PDF

---

## 🔑 Default Test Users

You can use these accounts (pre-seeded in backend):

* Technician →
  **Email:** `tech@oralvis.com`
  **Password:** `password123`

* Dentist →
  **Email:** `dentist@oralvis.com`
  **Password:** `password123`

Or register new accounts via the **Register** page.

---

## 📱 Responsive Design

The frontend is styled to work across:

* Desktop (wide grid, full navbar)
* Tablets (2-column scan grid, stacked navbar)
* Mobile (single-column scan grid, collapsible navbar)

---

## 🚀 Deployment

### Frontend

Deployed on **Vercel**:
[https://oralvis-frontend-git-main-kalva-vinays-projects.vercel.app/login](https://oralvis-frontend-git-main-kalva-vinays-projects.vercel.app/login)

### Backend

Deployed on **Render**:
[https://oralvis-backend-dftl.onrender.com](https://oralvis-backend-dftl.onrender.com)

The frontend communicates with the backend via `/api/*` routes.

---

## 🐞 Troubleshooting

* **Blank page after `npm start`**

  * Ensure `react` and `react-dom` are version **18.2.0**

    ```bash
    npm uninstall react react-dom
    npm install react@18.2.0 react-dom@18.2.0
    ```

* **CORS error**

  * Ensure backend `cors` middleware allows `http://localhost:3000` or `*`.

* **Login/Register fails**

  * Check API response in DevTools → Network tab.
  * Errors from backend (like *"Invalid credentials"* or *"User already exists"*) are displayed on UI.

* **PDF download not working**

  * Ensure `/api/scans/:id/pdf` returns `application/pdf`.

---

## 📌 Notes

* Auth token is stored in `localStorage` under key `oralvis_auth`.
* Routes are protected with a `PrivateRoute` component.
* The project uses **React Router v5** (`Switch`, `Route`, `Redirect`).

---

## 👨‍💻 Author

Developed by **Vinay Kalva**
Full-stack developer & cybersecurity enthusiast
