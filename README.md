# React + TypeScript + Ant Design boilerplate

[![CI](https://github.com/espinacs/ant-design-boilerplate/actions/workflows/ci.yml/badge.svg?style=flat-square)](https://github.com/espinacs/ant-design-boilerplate/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](./LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D18-339933?style=flat-square&logo=nodedotjs&logoColor=white)](https://nodejs.org)
[![npm](https://img.shields.io/badge/npm-%3E%3D9-CB3837?style=flat-square&logo=npm)](https://www.npmjs.com/)

[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Ant Design](https://img.shields.io/badge/Ant_Design-4-0170FE?style=flat-square&logo=antdesign&logoColor=white)](https://ant.design/)
[![Redux](https://img.shields.io/badge/Redux-5-764ABC?style=flat-square&logo=redux&logoColor=white)](https://redux.js.org/)
[![Vitest](https://img.shields.io/badge/Vitest-2-6E9F18?style=flat-square&logo=vitest&logoColor=white)](https://vitest.dev/)
[![ESLint](https://img.shields.io/badge/ESLint-8-4B32C3?style=flat-square&logo=eslint&logoColor=white)](https://eslint.org/)

Minimal app: fetch data, list and filter with Ant Design Table. Stack: **React 18**, **TypeScript**, **Vite**, **Redux** + **Redux-Saga**, **Reselect**, **Ant Design**. Git hooks (Lefthook): pre-commit and pre-push run lint + tests.

## Quick start

Node ≥18, npm ≥9.

```bash
git clone https://github.com/espinacs/ant-design-boilerplate
cd ant-design-boilerplate
npm install
npm start
```

Open [http://localhost:8080](http://localhost:8080).

## Environment

| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | API base URL for data (default: `https://randomuser.me/api`). Set when using a custom backend. |

## Commands

| Command | Description |
|---------|-------------|
| `npm start` | Dev server (Vite) |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Preview production build |
| `npm run clean` | Remove `dist/` |
| `npm run lint` | ESLint (`.ts`, `.tsx`) |
| `npm run lint:fix` | ESLint with auto-fix |
| `npm test` | Vitest (single run) |
| `npm run test:watch` | Vitest watch mode |
| `npm run coverage` | Coverage report → `coverage/` |

## Testing

- **Single run:** `npm test` (used in CI).
- **Watch mode:** `npm run test:watch` for development.
- **Coverage:** `npm run coverage`; open `coverage/index.html`. Config in `vite.config.ts` (Vitest + v8). CI runs coverage on Node 18 and 22.

## Project structure

- **Types:** `app/types/index.ts` — shared interfaces (e.g. `RootState`, `MainState`, `RandomUserPerson`).
- **Redux slice:** `app/containers/Main/` — reducer (`module.ts`), actions, selectors, sagas; Main container is the only slice.
- **Config:** `app/config/` — store, router, global sagas, constants.

## Architecture

- **React** — UI: Main container + SearchBar + Ant Design Table.
- **Redux** — Global state; single slice under `state.app`.
- **Redux-Saga** — Listens for `GET_API_DATA`; fetches from API; dispatches `GET_API_DATA_LOADED` or `GET_API_DATA_ERROR`.
- **Reselect** — Selectors (`getFilteredDataArray`, `isDataLoading`, `getSearchText`, `getApiDataError`) keep components decoupled from state shape.
- **Flow** — User action (e.g. search, table change) → dispatch action → saga (if API) → API call → dispatch result → reducer updates state → selectors → UI re-renders.

## Production

`server.js` is a CommonJS Express server that serves `dist/` with security headers (Helmet) and `Cache-Control` (long-lived for assets, no-store for HTML). Run after `npm run build` with `node server.js` (or use `PORT`). Ant Design 5 is a possible future upgrade (theming and bundle size differ); this boilerplate stays on Ant Design 4 for now.

## License

MIT.
