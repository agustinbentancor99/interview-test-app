# Criterios de evaluación – Prueba React Semi-Senior

Esta carpeta contiene la **solución de referencia** que implementa todos los puntos que se esperan de un desarrollador React semi-senior. Usa esta lista al revisar entregas de candidatos.

## Checklist de evaluación

| Criterio | Dónde se ve en la referencia |
|----------|------------------------------|
| **TypeScript** | Tipado en `core/models`, `shared/api/characters/types`, props de componentes y hooks sin `any`. |
| **Hooks** | `useCharacters`, `useCharacterById` (API), `useCharacterFilters` (feature) con dependencias correctas. |
| **Composición** | Atoms (Button, Badge) → molecules (Card, Input) → feature components (CharacterCard, CharacterList). |
| **Estado** | Estado local en hooks; loading/error en la capa API; filtros en la feature; params aplicados en la screen. |
| **Estructura** | `core/`, `shared/api/`, `features/characters/`, `router/` según la guía del proyecto. |
| **API fuera de features** | Tipos y fetch solo en `shared/api`; features consumen hooks de `shared/api/characters`. |
| **Loading / error / empty** | En `CharacterList` y en `CharacterDetailScreen`. |
| **Keys estables** | `key={c.id}` en la lista de personajes. |
| **Custom hooks** | `useCharacterFilters` (orquestación UI) y hooks en `shared/api/characters/hooks` (datos). |
| **Accesibilidad** | `aria-busy`, `aria-live`, `role="alert"`, `aria-label` en paginación, labels en formularios. |

## Cómo usar esta referencia en entrevistas

1. **Como baseline**: Compara la entrega del candidato con esta estructura y criterios.
2. **Como ejercicio**: Puedes dar el repo sin la feature `characters` y pedir que implementen algo similar siguiendo `.cursor/rules/architecture-and-new-feature.mdc`.
3. **Como corrección**: Usa esta versión como “respuesta correcta” al diseñar la rúbrica de la prueba.

API usada: [Rick and Morty API](https://rickandmortyapi.com/documentation) (REST).
