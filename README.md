# Task Manager - React + TypeScript

A comprehensive task management application built with React and TypeScript. This project demonstrates modern React development practices and patterns, including hooks, context API, TypeScript integration, and more.

![Vite _ React _ TS](https://github.com/user-attachments/assets/5e4e4071-499f-401c-a96f-ac64fd16f687)


## Features

- ✅ Create, read, update, and delete tasks
- ✅ Mark tasks as complete/incomplete
- ✅ Filter tasks by status (all, active, completed)
- ✅ Task statistics dashboard
- ✅ Responsive design
- ✅ Local storage persistence
- ✅ Keyboard navigation support
- ✅ Accessibility features

## Tech Stack

- **React** - UI library
- **TypeScript** - Static typing
- **Vite** - Build tool and development server
- **CSS** - Styling
- **LocalStorage API** - Data persistence

## Live Demo

[View Live Demo](https://glistening-liger-c03e6c.netlify.app/)

## Getting Started

### Prerequisites

- Node.js (v18.0.0 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/jsalguero94/react-task-manager.git
   cd react-task-manager
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── components/           # UI components
│   ├── Header.tsx        # App header with statistics
│   ├── TaskForm.tsx      # Form for creating new tasks
│   ├── TaskList.tsx      # Container for rendering tasks
│   ├── TaskItem.tsx      # Individual task component
│   └── TaskFilter.tsx    # Filter controls
├── context/
│   └── TaskContext.tsx   # Global state management
├── hooks/
│   └── useLocalStorage.tsx  # Custom hook for localStorage
├── types/
│   └── index.ts          # TypeScript type definitions
├── App.tsx               # Main application component
├── main.tsx              # Entry point
└── index.css             # Global styles
```

## Key React Features Demonstrated

- **Function Components**
- **React Hooks**
  - useState - Local component state
  - useEffect - Side effects and lifecycle management
  - useRef - DOM references and imperative actions
  - useContext - Global state consumption
  - useReducer - Complex state logic
  - useMemo - Computed values optimization
  - useCallback - Function memoization
- **Custom Hooks** - Reusable stateful logic
- **Context API** - Global state management
- **TypeScript Integration**
  - Type definitions
  - Interfaces
  - Generics
  - Type guards
- **Accessibility**
  - Semantic HTML
  - ARIA attributes
  - Keyboard controls

## Building for Production

```bash
npm run build
# or
yarn build
```

The build artifacts will be in the `dist` directory.

## Testing

```bash
npm run test
# or
yarn test
```

## Deployment

This application can be deployed to any static hosting service:

- Vercel
- Netlify
- GitHub Pages
- AWS S3
- Firebase Hosting

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Julio Salguero - jsalguero94@gmail.com

## Acknowledgments

- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite](https://vitejs.dev/)
