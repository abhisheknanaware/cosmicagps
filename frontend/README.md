# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

## Backend Setup

The backend is built with Express and MongoDB.

### Prerequisite

- [MongoDB](https://www.mongodb.com/try/download/community) installed and running locally on `mongodb://localhost:27017/`. Or use your MongoDB Atlas URI.

### Environment Variables

Located in `backend/.env`:
- `PORT`: Server port (default: 5000)
- `MONGO_URI`: MongoDB connection string
- `NODE_ENV`: Environment mode (development/production)

### Running the Backend

```bash
cd backend
npm run dev
```

The server will run on [http://localhost:5000](http://localhost:5000).

## Frontend Setup

```bash
npm install
npm run dev
```

