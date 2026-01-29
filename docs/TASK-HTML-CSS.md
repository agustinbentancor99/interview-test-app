# Prueba 1: HTML y CSS (maquetación y Flexbox)

**Primera prueba** del proceso: maquetación con HTML semántico y CSS (flexbox, responsive).

En esta rama la página de personajes tiene **problemas de maquetación** que debes corregir. No cambies la lógica de React ni los datos; solo markup y estilos.

---

## Pasos a corregir

### 1. Lista de cards: arreglar los textos

En cada card de personaje de la lista, el **nombre** y el **texto de especie/género** están marcados con `<div>`, sin jerarquía semántica.

**Objetivo:** Sustituir esos `<div>` por **etiquetas adecuadas**: por ejemplo, el nombre del personaje por un encabezado (p. ej. `<h3>`) y la línea de especie/género por un párrafo (`<p>`), para mejorar la semántica y la accesibilidad.

**Dónde:** Componente de la card de personaje en la lista, en `src/features/characters/components/CharacterCard.tsx`.

---

### 2. Filtros: maquetar con Flexbox

Los controles de filtro (Name, Status, Species y el botón Apply) se ven apilados o desordenados.

**Objetivo:** Que los filtros se muestren en una **fila horizontal** en desktop, con **espacio entre ellos**, y que **hagan wrap** en pantallas estrechas (varios elementos por fila o uno debajo de otro).

**Dónde:** Estilos del contenedor con clase `.filters` en `src/index.css`.

**Pistas:** Usa `display: flex`, `flex-wrap: wrap`, `gap` y alineación si hace falta.

---

### 3. Lista de cards: espacio entre elementos

La lista de personajes no tiene **espacio entre las cards**: quedan pegadas entre sí.

**Objetivo:** Añadir **espacio horizontal y vertical** entre cada card (por ejemplo `gap` en el contenedor de la lista).

**Dónde:** Estilos de `.character-list` en `src/index.css`.

---

### 4. Lista de cards: cantidad de columnas según pantalla

La lista muestra **siempre 4 columnas**, también en pantallas pequeñas, donde se ve mal (cards muy estrechas o overflow).

**Objetivo:** Hacer que el **número de columnas cambie según el ancho de pantalla**, por ejemplo:

- Pantallas **estrechas** (móvil): 1 columna.
- Pantallas **medianas** (tablet): 2 columnas.
- Pantallas **grandes** (desktop): 3 o 4 columnas.

**Dónde:** Estilos de `.character-list` en `src/index.css`.

**Pistas:** Usa **media queries** (`@media (min-width: ...)`) y cambia `grid-template-columns` (o la propiedad equivalente si usas flex) en cada breakpoint.

---

### 5. Cards: hover con color más oscuro

Al pasar el ratón sobre una card de personaje no hay ningún cambio visual.

**Objetivo:** Que al hacer **hover** sobre una card, esta cambie a un **color de fondo más oscuro** (o más claro en tema light) para indicar que es clickeable.

**Dónde:** Estilos de `.character-card`, `.character-card-link` o `.card` dentro de las cards de personaje en `src/index.css`. La card usa la clase `.character-card` y dentro tiene `.card`.

**Pistas:** Usa la pseudoclase **`:hover`** sobre el enlace o la card y cambia `background-color` (por ejemplo un tono más oscuro que el actual).

---

### 6. (Opcional) Revisar HTML semántico

- La lista de personajes debería usar `<ul>` y `<li>`.
- Los filtros deberían estar dentro de un `<form>`.

Si algo de esto no está así, puedes mejorarlo en los componentes de la feature `characters`.

---

## Criterios de evaluación

Al revisar tu entrega se tendrá en cuenta:

- [ ] **Textos en cards:** Nombre y especie/género con etiquetas semánticas (p. ej. h3, p) en la lista.
- [ ] **Filtros:** Maquetados con flex (fila, wrap, espacio entre controles).
- [ ] **Cards:** Espacio entre cada card (gap o márgenes coherentes).
- [ ] **Columnas responsive:** La cantidad de columnas cambia según el ancho de pantalla (p. ej. 1 en móvil, 2 en tablet, 3–4 en desktop).
- [ ] **Hover en cards:** Al pasar el ratón, la card cambia a un color más oscuro (o más claro en tema light).
- [ ] **Sin overflow:** El contenido no se sale por la derecha; márgenes/padding coherentes.
- [ ] **(Opcional)** Uso de HTML semántico (listas, form) donde corresponda.

---

## Cómo probar

1. `pnpm install` y `pnpm dev`.
2. Ir a `/characters`.
3. Comprobar que los filtros se ven en fila con espacio y que las cards tienen separación entre sí.
4. **Reducir el ancho del navegador:** debe cambiar el número de columnas (menos columnas en pantallas estrechas).
5. **Hover sobre una card:** el fondo debe volverse más oscuro (o más claro en tema light).
6. Comprobar que no hay scroll horizontal en ningún ancho.
