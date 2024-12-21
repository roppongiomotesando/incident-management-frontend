# Incident Management Frontend

A React-based frontend for managing incidents, timelines, and artifacts with Prometheus, Grafana, and OpenSearch integration.

## Features

- Collapsible timeline cards
- Tag-based filtering
- Dark theme UI
- Responsive design
- Integration with:
  - Prometheus charts
  - Grafana panels
  - OpenSearch logs

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables in `.env`:
```
VITE_API_URL=http://localhost:3000
VITE_NODE_ENV=development
```

3. Start the development server:
```bash
npm run dev
```

## Development

- Built with React + TypeScript
- Uses Vite for fast development
- Tailwind CSS for styling
- Framer Motion for animations

## Project Structure

```
src/
├── components/    # Reusable UI components
├── pages/         # Route components
├── hooks/         # Custom React hooks
├── api/          # API integration
├── types/        # TypeScript types
├── utils/        # Shared utilities
└── theme/        # Theme configuration
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run test` - Run tests (when added)

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

## License

MIT
