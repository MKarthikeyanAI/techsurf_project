Techsurf 2024 - Prompt to Component
This project is a full-stack web application that generates Figma design files, web components, and Content Types from user prompts using Contentstack. The project consists of a React frontend and a Flask backend.

Project Structure:
my-app: React frontend.
backend: Flask backend.

Setup Instructions
Prerequisites
**Node.js and npm (for frontend)
Python and pip (for backend)
Contentstack account for API credentials**

**Frontend Setup (React)**

1. Navigate to the frontend folder:

cd my-app

2. Create a .env.local file in the my-app folder with the following contents:

# Backend URL for API requests
REACT_APP_BACKEND_URL=http://127.0.0.1:5000/

# Contentstack credentials
REACT_APP_CONTENTSTACK_CLIENT_ID=your-contentstack-client-id
REACT_APP_CONTENTSTACK_CLIENT_SECRET=your-contentstack-client-secret

# OAuth redirect URI for Contentstack
REACT_APP_CONTENTSTACK_REDIRECT_URI=https://techsurf-project.onrender.com/oauth/callback/

Replace the placeholder values (your-contentstack-client-id, your-contentstack-client-secret) with your actual Contentstack credentials.

3. Install dependencies:

npm install

4.Modify package.json for development:

In the my-app folder, locate the package.json file and ensure that the following line is present in the scripts section:
"scripts": {
   "start": "react-scripts start"
}


5. Run the frontend:

npm start.

This will run the React app in development mode. Open http://localhost:3000 to view it in the browser.

The page will reload when changes are made. You may also see linting errors in the console if there are any.

**Backend Setup (Flask)**

1. Navigate to the backend folder:

cd backend

2. Install the required Python packages:

pip install -r requirements.txt

3. Run the backend server:

python app.py

The Flask backend will start running at http://127.0.0.1:5000.

