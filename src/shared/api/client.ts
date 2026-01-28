const BASE = 'https://rickandmortyapi.com/api'

export async function apiGet<T>(
  path: string,
  params?: Record<string, string | number>,
): Promise<T> {
  const pathWithoutLeadingSlash = path.startsWith('/') ? path.slice(1) : path
  const url = new URL(pathWithoutLeadingSlash, `${BASE}/`)
  if (params != null) {
    for (const [k, v] of Object.entries(params)) {
      if (v !== '' && v != null) {
        url.searchParams.set(k, String(v))
      }
    }
  }
  const res = await fetch(url.toString())
  if (!res.ok) {
    throw new Error(`API error: ${res.status}`)
  }
  return res.json() as Promise<T>
}
