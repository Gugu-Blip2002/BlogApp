# InsightfulBlogs - Modern Blog Platform

A full-stack blog application built with React, TypeScript, and Supabase. This app allows users to create, view, edit, and delete blog posts with a beautiful, responsive interface.

## Features

- User authentication (email/password signup and login)
- Create, read, update, and delete blog posts
- Public blog listing with pagination
- Beautiful, responsive UI built with Tailwind CSS
- Secure data storage with Supabase
- Row-level security for blog posts

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, React Router, React Hook Form
- **Backend**: Supabase (Authentication, Database, Storage)
- **Deployment**: Netlify (or your preferred hosting platform)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Supabase account

### Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Connect to Supabase:
   - Click the "Connect to Supabase" button in the StackBlitz UI
   - Create a new Supabase project or connect to an existing one
   - Once connected, the environment variables will be automatically added to the `.env` file

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open the application in your browser

## Project Structure

```
/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable UI components
│   ├── contexts/        # React context providers
│   ├── lib/             # Utilities and API functions
│   ├── pages/           # Application pages
│   ├── types/           # TypeScript type definitions
│   ├── App.tsx          # Main App component
│   └── main.tsx         # Application entry point
├── supabase/
│   └── migrations/      # Database migrations
└── README.md            # Project documentation
```

## Deployment

To deploy this application to production:

1. Build the application:
   ```bash
   npm run build
   ```

2. Deploy to your preferred hosting platform (Netlify, Vercel, etc.)

## License

This project is licensed under the MIT License.