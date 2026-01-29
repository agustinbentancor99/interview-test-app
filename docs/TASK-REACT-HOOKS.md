# Prueba 2: React y Hooks (pantalla de detalle)

**Segunda prueba** del proceso: custom hooks, `useEffect` y composición.

La pantalla de **detalle de personaje** (`/characters/:id`) tiene actualmente **toda la lógica inline** (estado + fetch dentro del componente), **varios `useEffect`** que hacen cosas distintas (fetch, reset al cambiar id, “actualizar” el nombre del personaje para el `<h1>`), **bugs** (el nombre no se muestra bien en el título porque se usa una variable local actualizada en un efecto; otro efecto provoca bucle infinito o loading infinito) y **dos hooks** en el código que también obtienen un personaje por id. Tu tarea es refactorizar.

La pantalla ya muestra datos extra de la API: **type** (si existe), **número de episodios** y fecha de **created**. Mantén esos datos visibles después del refactor.

**Otras cosas a mejorar (detectadas en el componente):**
- **Uso de `any`:** El estado del episodio seleccionado está tipado como `useState<any>(null)`. Debe reemplazarse por un tipo adecuado (p. ej. una interfaz para el episodio que devuelve la API: `id`, `name`, `air_date`, `episode`, etc.).
- **Fetch del personaje duplicado:** Hay **dos** `useEffect` idénticos que hacen el mismo fetch del personaje cuando cambia `validId`; el personaje se pide dos veces. Eliminar la duplicación.
- **Efecto de episodio que “rompe” la UI:** Un efecto reacciona a `selectedEpisode` y tras 100 ms pone `episodeLoading` en `true`, así que al abrir un episodio la info se sustituye por "Loading episode…" y no se ve el resultado. Corregir o eliminar ese efecto si no es intencional.

---

## Pasos a completar

### 1. Consolidar y organizar los useEffects

La pantalla de detalle tiene **varios `useEffect`** con responsabilidades distintas:

- Uno **obtiene** el personaje por id y actualiza `character`, `loading`, `error`.
- Uno **resetea** `character` y `error` cuando cambia `validId` (para mostrar loading del nuevo id).
- Uno que **asigna el nombre del personaje** a una variable (`characerName`) para mostrarlo en el `<h1>`, pero está mal implementado: la variable es un `let` que se actualiza dentro del efecto y no provoca re-render, así que el título (nombre en pantalla) puede quedar vacío o no actualizarse. Además hay un **typo** en el nombre de la variable (`characerName`).
- Uno que **provoca un bucle infinito** (depende de `character` y vuelve a hacer `setCharacter`), dejando la app colgada.
- **Fetch del personaje duplicado:** el mismo fetch (setLoading, setError, apiGet, then/catch/finally) está repetido en dos efectos con `[validId]`.
- En la parte de episodios: **`selectedEpisode` está tipado como `any`** y la llamada `apiGet(\`/episode/...\`)` no usa genérico; conviene definir un tipo para el episodio (p. ej. `EpisodeApi`) y usarlo en el estado y en `apiGet<EpisodeApi>`.

**Objetivo:** (1) **Corregir los bugs:** (a) El efecto que “actualiza el nombre” no hace que el nombre se vea en el `<h1>` — hay que mostrar correctamente el nombre del personaje en la UI (y, si se desea, sincronizar también `document.title` con ese nombre y restaurarlo en el cleanup). (b) Uno de los efectos hace que el detalle se quede en "Loading…" para siempre o que la app entre en bucle infinito — localízalos y elimínalos o corrígelos. (2) Mantener el comportamiento (fetch, reset al cambiar id, nombre/título visible) pero **organizarlo mejor**: concentra el fetch (y el reset asociado) en **un solo sitio** (p. ej. un custom hook o un único efecto). Deja el efecto del nombre/`document.title` donde tenga sentido. Elimina redundancia (p. ej. el efecto de "reset" puede integrarse en la lógica del fetch).

---

### 2. Extraer la lógica a un custom hook

La pantalla de detalle tiene estado inline (`character`, `loading`, `error`) y la lógica del fetch en un `useEffect`.

**Objetivo:** Mover esa lógica a un **custom hook** (p. ej. `useCharacterById` o similar) que reciba el id del personaje y devuelva `{ character, loading, error }`. Usa ese hook en `CharacterDetailScreen` para que la pantalla solo se encargue del render.

**Dónde:**  
- Crear o reutilizar un hook (p. ej. en `src/shared/api/characters/hooks/` o en la feature).  
- Refactorizar `src/features/characters/screens/CharacterDetail.screen.tsx` para usar el hook en lugar de la lógica inline.

**Pistas:** El hook debe usar `useState` y `useEffect` (o `useCallback` para el fetch). Las dependencias del `useEffect` deben incluir el id para que, al cambiar el parámetro de la ruta, se vuelva a pedir el personaje.

---

### 3. Eliminar el hook duplicado

Hay **dos hooks** que obtienen un personaje por id:

- Uno en `src/shared/api/characters/hooks/` (p. ej. `useCharacterById`).
- Otro en `src/features/characters/hooks/` (p. ej. `useCharacterDetail`).

**Objetivo:** Quedarse con **uno** (preferiblemente el de `shared/api` para mantener la capa de API en un solo lugar) y **eliminar o dejar de usar** el otro. La pantalla de detalle debe usar solo el hook elegido.

**Dónde:**  
- `src/features/characters/hooks/useCharacterDetail.ts`  
- `src/shared/api/characters/hooks/useCharacterById.ts`  
- Cualquier import que use el hook eliminado.

---

## Criterios de evaluación

- [ ] **Bugs corregidos:** La pantalla de detalle carga y muestra el personaje (no se queda en loading infinito ni en bucle infinito). El **nombre del personaje** se muestra correctamente en el `<h1>` (y, si se mantiene, `document.title` se sincroniza con el nombre).
- [ ] **Fetch en un solo lugar:** El fetch del personaje (y el reset asociado) vive en un único efecto o hook; no hay lógica de fetch duplicada; el efecto del nombre/`document.title` puede seguir aparte o moverse al hook.
- [ ] **Custom hook:** La pantalla de detalle usa un hook que encapsula fetch + estado (sin lógica de fetch inline en el componente).
- [ ] **Una sola fuente de verdad:** Solo se usa un hook para "obtener personaje por id"; el hook duplicado en el código se ha eliminado.
- [ ] **Dependencias correctas:** El `useEffect` (o equivalente) depende del id de forma que al cambiar la ruta se vuelve a hacer fetch.
- [ ] **Loading / error / vacío:** La pantalla sigue mostrando correctamente los estados de carga, error y "no encontrado".
- [ ] **Sin `any`:** El estado del episodio (y la respuesta del API de episodios) está tipado con una interfaz adecuada, no con `any`.
- [ ] **Sin fetch duplicado:** Solo hay un efecto (o un hook) que hace el fetch del personaje cuando cambia el id; no hay dos efectos idénticos.

---

## Cómo probar

1. `pnpm install` y `pnpm dev`.
2. Ir a `/characters`, hacer clic en un personaje para abrir `/characters/:id`.
3. Comprobar que el detalle carga, que el **nombre del personaje** se ve en el título de la página (el `<h1>`) y que el personaje es el correcto.
4. Cambiar el id en la URL (p. ej. `/characters/1` → `/characters/2`): debe cargar el nuevo personaje.
5. Probar un id inválido (p. ej. `/characters/abc`): debe mostrarse "Invalid character ID" o similar.
