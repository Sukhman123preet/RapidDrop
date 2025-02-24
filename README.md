# MINOR_PROJECT Setup Guide

## 📌 Prerequisites

Make sure you have the following installed:

* [Node.js](https://nodejs.org/) (Latest LTS version recommended)
* [Git](https://git-scm.com/)

## 🚀 Getting Started

### 1️⃣ Clone the Repository

```
git clone https://github.com/Sukhman123preet/RapidDrop
cd MINOR_PROJECT
```

---

### 2️⃣ Setup Backend

Navigate to the backend folder:

```
cd backend
```

Install dependencies:

```
npm install
```

Run the backend server:

```
node server.js
```

(Or if using `<span>nodemon</span>` for auto-restart)

```
npx nodemon server.js
```

---

### 3️⃣ Setup Frontend

Open a new terminal and navigate to the frontend folder:

```
cd front_end
```

Install dependencies:

```
npm install
```

Start the frontend:

```
npm run dev
```

---

### 4️⃣ Environment Variables (Optional)

If your project requires **environment variables**, create a `<span>.env</span>` file inside both **backend** and **frontend** folders and configure them accordingly.

---

### 5️⃣ Check `<span>.gitignore</span>`

Ensure unnecessary files like `<span>node_modules</span>`, `<span>downloads</span>`, and `<span>.env</span>` are ignored.

---

### 6️⃣ Run the Project

Once both backend and frontend are running:

* **Backend** runs on `<span>http://localhost:5000</span>` (or your configured port)
* **Frontend** runs on `<span>http://localhost:5173</span>` (or your configured port)

Now your project is up and running! 🚀🎉
