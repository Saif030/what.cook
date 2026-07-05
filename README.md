# What.Cook

An AI-powered cooking assistant that suggests recipes based on available ingredients. Simply input your ingredients, and get detailed cooking instructions with nutritional information.

## Features

- **AI Recipe Generation**: Uses NVIDIA's AI API to generate unique recipes based on your ingredients
- **Nutritional Information**: Provides calorie count, protein, carbs, and fat content
- **Step-by-Step Instructions**: Detailed cooking steps for easy preparation
- **User Authentication**: Secure authentication via Appwrite
- **Category Tags**: Recipes categorized as vegan, vegetarian, keto, gluten-free, or seafood
- **Modern UI**: Built with React, TailwindCSS, and Lucide icons

## Tech Stack

### Frontend (`what.cook/`)
- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **TailwindCSS 4** - Styling
- **Appwrite** - Authentication and backend services
- **React Router** - Navigation
- **Axios** - HTTP client
- **Lucide React** - Icons
- **React Hot Toast** - Notifications

### Backend (`cook-backend/`)
- **Express.js** - Web framework
- **OpenAI SDK** - AI API integration
- **NVIDIA API** - AI model hosting
- **Appwrite** - User authentication
- **CORS** - Cross-origin resource sharing

## Project Structure

```
what.cooks/
├── what.cook/           # Frontend React application
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── context/     # React context providers
│   │   └── App.jsx      # Main app component
│   └── package.json
├── cook-backend/        # Express backend API
│   ├── src/
│   │   ├── controllers/ # Route controllers
│   │   ├── middlewares/ # Express middlewares
│   │   ├── utils/       # Utility functions
│   │   └── lib/         # Library configurations
│   └── package.json
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Appwrite account
- NVIDIA API key

### Backend Setup

1. Navigate to the backend directory:
```bash
cd cook-backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the `cook-backend/` directory:
```env
PORT=3000
NVIDIA_API_KEY=your_nvidia_api_key
APPWRITE_ENDPOINT=your_appwrite_endpoint
APPWRITE_PROJECT_ID=your_appwrite_project_id
```

4. Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:3000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd what.cook
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the `what.cook/` directory:
```env
VITE_APPWRITE_ENDPOINT=your_appwrite_endpoint
VITE_APPWRITE_PROJECT_ID=your_appwrite_project_id
VITE_API_URL=http://localhost:3000
```

4. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## API Endpoints

### POST `/user`
Generate a cooking recipe based on ingredients.

**Authentication**: Required (Bearer token)

**Request Body**:
```json
{
  "prompt": "I have chicken, rice, and broccoli"
}
```

**Response**:
```json
{
  "success": true,
  "response": {
    "prompt": "I have chicken, rice, and broccoli",
    "aiResponse": ["Step 1: ...", "Step 2: ..."],
    "dish_name": "Chicken and Rice Bowl",
    "calories": 450,
    "protein": 35,
    "carbs": 45,
    "fat": 12,
    "time_require": "30 minutes",
    "ingredients": ["chicken", "rice", "broccoli"],
    "category": "gluten-free"
  }
}
```

## Environment Variables

### Backend (.env)
- `PORT` - Server port (default: 3000)
- `NVIDIA_API_KEY` - NVIDIA API key for AI model access
- `APPWRITE_ENDPOINT` - Appwrite server endpoint
- `APPWRITE_PROJECT_ID` - Appwrite project ID

### Frontend (.env)
- `VITE_APPWRITE_ENDPOINT` - Appwrite server endpoint
- `VITE_APPWRITE_PROJECT_ID` - Appwrite project ID
- `VITE_API_URL` - Backend API URL

## Getting API Keys

### NVIDIA API Key
1. Visit [NVIDIA API Catalog](https://build.nvidia.com/)
2. Sign up and create an account
3. Generate an API key
4. Add it to your backend `.env` file

### Appwrite Setup
1. Visit [Appwrite Console](https://cloud.appwrite.io/)
2. Create a new project
3. Note down your Project ID and Endpoint
4. Enable authentication providers as needed
5. Add credentials to both frontend and backend `.env` files

## Development

### Backend Scripts
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

### Frontend Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

ISC
