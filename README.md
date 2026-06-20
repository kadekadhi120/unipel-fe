# Shop FE - Restaurant Frontend

A modern Next.js application for restaurant management built with TypeScript, Tailwind CSS, and Zustand.

## Features

- 🛒 Product management
- 👤 User authentication
- 📦 Order management
- 🎨 Modern UI with Tailwind CSS
- 🔄 State management with Zustand
- 📡 API integration with Axios
- ✅ TypeScript support
- 🧪 Testing with Jest
- 🎯 ESLint & Prettier for code quality

## Tech Stack

- **Framework**: Next.js 16
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Testing**: Jest + Testing Library
- **Linting**: ESLint
- **Formatting**: Prettier

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd shop-fe
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
```

Edit `.env.local` and update the API base URL:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001/api
```

4. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage
- `npm run type-check` - Run TypeScript type checking

## Project Structure

```
src/
├── components/     # Reusable UI components
├── hooks/         # Custom React hooks
├── lib/           # Utility libraries (API, config)
├── pages/         # Next.js pages (Pages Router)
├── stores/        # Zustand state stores
├── styles/        # Global styles
├── types/         # TypeScript type definitions
└── utils/         # Utility functions
```

## API Configuration

API endpoints are configured in `src/lib/api.ts`. To change the API base URL, update the `NEXT_PUBLIC_API_BASE_URL` environment variable in `.env.local`.

## State Management

The app uses Zustand for state management. Stores are located in `src/stores/`.

## Testing

Tests are written with Jest and Testing Library. Run tests with:

```bash
npm run test
```

## Code Quality

- **ESLint**: Configured for Next.js and TypeScript
- **Prettier**: Code formatting
- Run `npm run lint:fix && npm run format` before committing

## Deployment

Build the app for production:

```bash
npm run build
npm run start
```

## Contributing

1. Follow the existing code style
2. Run tests and linting before submitting PR
3. Update documentation as needed

## License

This project is private and proprietary.
