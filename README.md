# ChatApp
This project is a real-time chat application with video and audio capabilities. It consists of a React frontend and a Django backend, utilizing WebSockets for real-time communication and WebRTC for video and audio streaming. Redis is used as the channel layer backend for Django Channels.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Frontend Setup](#frontend-setup)
- [Backend Setup](#backend-setup)
- [Running the Application](#running-the-application)
- [Development](#development)
- [Deployment](#deployment)
- [License](#license)

## Prerequisites

Ensure you have the following installed:

- Node.js (v14 or later)
- Python (v3.8 or later)
- pip
- virtualenv
- Redis

## Frontend Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/your-repo.git
   cd your-repo/frontend
   ```

2. **Install Dependencies**

   Navigate to the `frontend` directory and install the required Node.js packages:

   ```bash
   npm install
   ```

3. **Start the Development Server**

   ```bash
   npm run dev
   ```

   This will start the Vite development server at `http://localhost:3000`.

## Backend Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/your-repo.git
   cd your-repo/backend
   ```

2. **Create and Activate a Virtual Environment**

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. **Install Dependencies**

   ```bash
   pip install -r requirements.txt
   ```

4. **Run Database Migrations**

   ```bash
   python manage.py migrate
   ```

5. **Start Redis Server**

   Ensure that Redis is installed and running. You can typically start Redis with:

   ```bash
   redis-server
   ```

6. **Start the Django Development Server**

   ```bash
   python manage.py runserver
   ```

   This will start the Django development server at `http://localhost:8000`.

## Running the Application

1. **Frontend**
   
   Open a browser and navigate to `http://localhost:3000` to access the React application.

2. **Backend**
   
   Ensure the Django server is running at `http://localhost:8000`.

## Development

### Frontend

- **Dependencies**: `react`, `react-dom`, `react-router-dom`, `axios`, `react-use-websocket`
- **Commands**:
  - `npm run dev` - Start the development server with Vite.
  - `npm run build` - Build the application for production.

### Backend

- **Dependencies**: `django`, `djangorestframework`, `channels`, `websockets`, `redis`
- **Commands**:
  - `python manage.py runserver` - Start the Django server.
  - `python manage.py migrate` - Apply database migrations.
  - Ensure Redis is running as the channel layer backend.
