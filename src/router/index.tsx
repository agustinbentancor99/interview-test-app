import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { CharacterDetailScreen, CharacterListScreen } from '@/features/characters'
import { ROUTES } from './routes'

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <Navigate to={ROUTES.CHARACTERS} replace />,
  },
  {
    path: ROUTES.CHARACTERS,
    element: <CharacterListScreen />,
  },
  {
    path: ROUTES.CHARACTER_DETAIL,
    element: <CharacterDetailScreen />,
  },
])

export function Router() {
  return <RouterProvider router={router} />
}
