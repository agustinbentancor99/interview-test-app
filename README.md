# Interview Test App – React Semi-Senior

Aplicación de referencia para pruebas técnicas de desarrolladores **React semi-senior**. Consume la [Rick and Morty API](https://rickandmortyapi.com/documentation) y sigue una arquitectura por features con **core**, **shared** y **features**.

## Stack

- **React 19** + **TypeScript**
- **Vite 7**
- **React Router 7**
- API REST: [Rick and Morty API](https://rickandmortyapi.com/api)

## Requisitos

- Node.js 18+
- pnpm (recomendado) o npm

## Instalación y ejecución

```bash
# Instalar dependencias
pnpm install

# Desarrollo
pnpm dev

# Build
pnpm build

# Preview del build
pnpm preview

# Lint
pnpm lint
```

La app corre en **http://localhost:5173**. Rutas:

- `/` → redirige a `/characters`
- `/characters` → listado de personajes con filtros y paginación
- `/characters/:id` → detalle de un personaje

## Estructura del proyecto

```
src/
├── core/                 # Base compartida (no por feature)
│   ├── components/       # Atomic design: atoms → molecules
│   └── models/          # Tipos de dominio (Character, etc.)
├── features/            # Módulos por feature
│   └── characters/      # Listado, filtros, detalle
│       ├── components/
│       ├── hooks/
│       └── screens/
├── shared/
│   └── api/             # Cliente REST y hooks por dominio
│       └── characters/   # useCharacters, useCharacterById, types
├── router/              # Rutas y constantes
├── App.tsx
├── main.tsx
└── index.css
```

La guía de arquitectura y cómo añadir una nueva feature está en **`.cursor/rules/architecture-and-new-feature.mdc`**.

## Uso como prueba técnica

- **Solución de referencia**: esta versión implementa los criterios esperados (TypeScript, hooks, composición, estado, estructura, API en `shared`, loading/error/empty, keys estables).
- **Criterios de evaluación**: ver [docs/EVALUATION-CRITERIA.md](docs/EVALUATION-CRITERIA.md) para la checklist al revisar entregas de candidatos.
- **Ejercicio sugerido**: dar el repo sin la feature `characters` y pedir implementar una feature similar siguiendo la arquitectura del proyecto.

## Scripts

| Script   | Descripción              |
|----------|--------------------------|
| `pnpm dev`    | Servidor de desarrollo   |
| `pnpm build`  | Build de producción      |
| `pnpm preview`| Sirve el build localmente|
| `pnpm lint`   | Ejecuta ESLint           |
