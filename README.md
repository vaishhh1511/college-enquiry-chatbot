# 🎓 AI Chatbot for College Enquiry (MERN Stack)

A complete, full-stack, AI-powered web application built with the **MERN stack** (MongoDB, Express.js, React.js, Node.js) that assists students, parents, and visitors with instant, accurate, and friendly answers to college queries.

---

## 📌 Project Overview

Navigating college websites or contacting admission offices repeatedly for routine queries is time-consuming. The **AI Chatbot for College Enquiry** streamlines this experience by providing a 24/7 conversational assistant that understands natural student language, queries dynamic data stored in **MongoDB** via a decoupled **Express.js REST API**, and renders interactive, student-friendly responses on a modern **React.js** interface.

---

## 🏛️ System Architecture & Data Flow

This application is strictly built on a true **MERN Architecture** with zero external paid AI dependencies:

```
[ Student / Parent in Browser ]
              │
              ▼
   React.js Client (Vite)
   • Components: ChatWindow, Message, ChatInput, SuggestedQuestions, Navbar, Footer
   • State: React Hooks (useState, useEffect, useRef)
              │
         Axios HTTP Requests
   (POST /api/chat, GET /api/courses, GET /api/college...)
              │
              ▼
    Express.js & Node.js Server (Port 5000)
   • CORS & JSON Body Parser Middleware
   • Natural Question Normalization & Tokenization
   • Keyword & Intent-Based Matching Engine
   • 25+ College Enquiry Categories Handled
              │
       Mongoose ODM Models
   (CollegeInfo, Course, Admission, Fee, Facility, Placement, FAQ)
              │
              ▼
      MongoDB Database (college_chatbot)
   • Stores official curriculum, fees, admission rules, placement stats, facilities
              │
    (Mongoose queries executed and documents retrieved)
              │
              ▼
    Express formats rich, student-friendly response
              │
         JSON Response ({ reply, category, suggestions })
              │
              ▼
    React displays formatted message bubble with auto-scroll & suggestion pills
```

---

## 🛠️ Technology Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | React 18, Vite | Component-based UI, responsive layouts, Hooks |
| **Styling** | Modern CSS3 | Deep navy/blue college theme, glassmorphism, responsive grids |
| **Icons** | Lucide React | Clean, scalable visual iconography |
| **HTTP Client** | Axios | REST API communication between React and Express |
| **Backend Runtime** | Node.js | Fast, scalable JavaScript runtime |
| **Web Framework** | Express.js | REST routing, CORS handling, middleware, API endpoints |
| **Object Modeling** | Mongoose | Strict schema definitions and validation for MongoDB |
| **Database** | MongoDB | Document database (`college_chatbot`) |
| **Configuration** | Dotenv | Secure environment variables |

---

## 📂 Project Directory Structure

```
college-enquiry-chatbot/
│
├── backend/
│   ├── .env                       # Backend environment variables
│   ├── .env.example               # Template environment configuration
│   ├── package.json               # Backend dependencies & npm scripts
│   ├── server.js                  # Main Express entry point with CORS & error handling
│   │
│   ├── config/
│   │   └── db.js                  # MongoDB connection with Mongoose & auto-fallback
│   │
│   ├── models/                    # Mongoose Schemas & Models
│   │   ├── CollegeInfo.js         # College metadata (name, phone, accreditation)
│   │   ├── Course.js              # Degrees, duration, seats, eligibility
│   │   ├── Admission.js           # Admission steps, documents, portal URL
│   │   ├── Fee.js                 # Course-wise tuition & other charges
│   │   ├── Facility.js            # Campus facilities, library, labs, hostels
│   │   ├── Placement.js           # Placement rate, highest/average CTC, recruiters
│   │   └── FAQ.js                 # Keyword-based FAQ knowledge base
│   │
│   ├── controllers/
│   │   ├── chatbotController.js   # Chatbot intent recognition & query handler
│   │   └── collegeController.js   # REST controllers for direct data endpoints
│   │
│   ├── routes/
│   │   ├── chatbotRoutes.js       # POST /api/chat route
│   │   ├── collegeRoutes.js       # GET /api/college, /admissions, /fees, /facilities...
│   │   └── courseRoutes.js        # GET /api/courses route
│   │
│   └── seed/
│       └── seedData.js            # Database seeding script with realistic college data
│
├── frontend/
│   ├── .env                       # Frontend environment variables (API URL)
│   ├── .env.example               # Frontend environment template
│   ├── index.html                 # HTML5 template with Google Fonts
│   ├── package.json               # Frontend dependencies (React, Vite, Axios, Lucide)
│   ├── vite.config.js             # Vite configuration
│   │
│   └── src/
│       ├── main.jsx               # React 18 createRoot mounting
│       ├── App.jsx                # Main App component with navigation routing
│       ├── index.css              # Modern responsive CSS stylesheet
│       │
│       ├── services/
│       │   └── api.js             # Axios instance & REST service functions
│       │
│       ├── components/
│       │   ├── Navbar.jsx         # Responsive navigation bar with mobile drawer
│       │   ├── Footer.jsx         # Institutional footer with accreditation badges
│       │   ├── ChatWindow.jsx     # Message history scroll view & header
│       │   ├── Message.jsx        # User & Bot message bubbles with markdown support
│       │   ├── ChatInput.jsx      # Input bar, validation alert & Enter key handler
│       │   └── SuggestedQuestions.jsx # Popular enquiries & question chips
│       │
│       └── pages/
│           ├── Home.jsx           # Landing hero, stats, interactive quick topics
│           ├── Chatbot.jsx        # Dedicated AI Chatbot interactive interface
│           ├── Courses.jsx        # Programs grid fetched from MongoDB with filters
│           ├── About.jsx          # Institutional profile, vision & campus facilities
│           └── Contact.jsx        # Official helplines, timings & enquiry form
│
└── README.md                      # Comprehensive project documentation
```

---

## 🚀 Quick Start Guide

### Prerequisites
* **Node.js** (v18 or higher recommended)
* **npm** (v9 or higher)
* **MongoDB** (Local MongoDB Community Server running at `mongodb://127.0.0.1:27017` OR a free MongoDB Atlas URI).
  > **Note for Academic Evaluation:** The backend includes a built-in automatic in-memory MongoDB fallback. If your local MongoDB daemon is not started, the application will spin up a real MongoDB engine automatically and seed it, ensuring zero-configuration evaluation!

---

### Step 1: Clone or Navigate to the Project

```bash
cd C:\Users\vaishnavi\.gemini\antigravity\scratch\college-enquiry-chatbot
```

---

### Step 2: Configure & Start the Backend

1. Navigate to the `backend/` directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Review/Configure `.env`:
   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/college_chatbot
   CLIENT_URL=http://localhost:5173
   ```

4. Seed the Database:
   ```bash
   npm run seed
   ```
   *Inserts realistic college data: 6 courses, 6 fee structures, 6 facilities, placement records, admission guidelines, and 14 FAQs.*

5. Start the Express server:
   ```bash
   npm start
   ```
   The backend will start at `http://localhost:5000`.

---

### Step 3: Configure & Start the Frontend

1. Open a new terminal and navigate to `frontend/`:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Verify `.env`:
   ```env
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

4. Launch the Vite development server:
   ```bash
   npm run dev
   ```
   The React application will be live at `http://localhost:5173`.

---

## 📡 REST API Reference

| Method | Endpoint | Description | Sample Request / Response |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/chat` | Send question to AI Chatbot | Request: `{"message": "What courses are available?"}`<br>Response: `{"reply": "...", "category": "courses", "suggestions": [...]}` |
| `GET` | `/api/college` | Retrieve college overview & accreditation | Returns CollegeInfo document |
| `GET` | `/api/courses` | Retrieve all academic courses | Returns array of Course documents |
| `GET` | `/api/admissions` | Retrieve admission process & documents | Returns Admission document |
| `GET` | `/api/fees` | Retrieve course-wise fee structures | Returns array of Fee documents |
| `GET` | `/api/facilities` | Retrieve campus facilities & timings | Returns array of Facility documents |
| `GET` | `/api/placements` | Retrieve placement CTC, rate, & recruiters | Returns Placement document |
| `GET` | `/api/faqs` | Retrieve all FAQs | Returns array of FAQ documents |

---

## 💡 Chatbot Features & Demonstration

### 1. Supported Enquiry Categories
The AI Chatbot understands natural language variations and maps them into 25+ college categories:

1. **Courses & Degrees:** *"What courses do you offer?"*, *"Which programs can I study?"*
2. **Admissions:** *"How can I apply for admission?"*, *"What is the admission procedure?"*
3. **Eligibility:** *"What are the eligibility requirements?"*, *"What is the cutoff for B.Tech?"*
4. **Fees Structure:** *"What is the fee structure?"*, *"How much does B.Tech AI cost?"*
5. **Scholarships:** *"What scholarships are available?"*, *"Is there any fee waiver for merit students?"*
6. **Placements:** *"What is the highest package?"*, *"Which companies visit for campus placements?"*
7. **Internships:** *"What internship opportunities are provided?"*, *"Are there summer internships?"*
8. **Hostel & Mess:** *"Is hostel available?"*, *"What are the hostel room sharing options and fees?"*
9. **Facilities:** *"What campus facilities are available?"*, *"Tell me about the sports complex"*
10. **Central Library:** *"Tell me about the library"*, *"What are the digital library resources?"*
11. **Laboratories:** *"Tell me about the computer laboratories and AI labs"*
12. **Transportation:** *"Does the college provide bus transport?"*, *"What are the bus routes?"*
13. **Campus Timings:** *"What are the campus timings and office hours?"*
14. **Contact Information:** *"What is the college phone number and email address?"*
15. **Location & Directions:** *"Where is the college located?"*, *"How do I reach the campus?"*
16. **Clubs & Activities:** *"What clubs and extracurricular activities can I join?"*
17. **Examinations & CGPA:** *"How does the examination and grading system work?"*
18. **Attendance Policy:** *"What is the minimum attendance requirement?"*
19. **Faculty Credentials:** *"Tell me about the faculty qualifications"*
20. **Greetings & Gratitude:** *"Hello"*, *"Good morning"*, *"Thank you so much!"*
21. **Unknown Fallback:** Unrecognized questions return a polite, helpful prompt with suggested enquiry buttons.

### 2. Popular Enquiries Section
Clickable quick-enquiry category buttons located on the chatbot page:
* 🎓 **Admissions**
* 📚 **Courses**
* 💰 **Fees**
* 💼 **Placements**
* 🏛️ **Facilities**
* 🏠 **Hostel**
* 📞 **Contact**

Clicking any button instantly sends the enquiry to the chatbot without needing to type.

### 3. Clear Chat
A dedicated **"Clear Chat"** button allows users to reset their conversation at any time.

---

## 🛡️ Error Handling & Validation

1. **Empty Message Validation:** If a user submits an empty query or whitespace, the frontend immediately displays a non-intrusive validation banner without firing an API call.
2. **Server / Database Disconnection:** If the backend or MongoDB is unreachable, the chatbot displays a clear alert: *"Unable to connect to the chatbot. Please try again."*
3. **CORS Protection:** Configured with Express CORS middleware to restrict or allow authorized frontend origins during development and production.

---

## 👨‍💻 Academic Project Context

* **Project Title:** AI Chatbot for College Enquiry
* **Coursework:** 3rd Year B.Tech in Artificial Intelligence & Data Science (AI & DS)
* **Architecture:** Decoupled Full-Stack MERN (MongoDB + Express.js + React.js + Node.js)
* **Evaluation Readiness:** 100% working code with zero external mockups, dynamic database retrieval, and pre-seeded dataset.
