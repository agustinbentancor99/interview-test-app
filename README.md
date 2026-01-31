
### ELIMINO- YA ESTOY USANDO SELETEDEPISODEID NO NECESITO ESTA LOGICA
```typescript
useEffect(() => {
    if (selectedEpisode != null) {
      const t = setTimeout(() => setEpisodeLoading(true), 100);
      return () => clearTimeout(t);
    }
  }, [selectedEpisode]);
```
### ELIMINO- ESTA REPETIDO 
```typescript
  useEffect(() => {
    if (validId == null) return;
    setLoading(true);
    setError(null);
    apiGet<CharacterApi>(`/character/${validId}`)
      .then((res) => {
        setCharacter({
          ...res,
          status: res.status,
        } as Character);
      })
      .catch((e) => {
        setError(e instanceof Error ? e : new Error("Unknown error"));
      })
      .finally(() => {
        setLoading(false);
      });
  }, [validId]);
```
### ELIMINO- ESTO YA LO ES PARTE DE OTRA FUNCION NO LO NECESITO DUPLICADO
```typescript
  useEffect(() => {
    if (validId == null) return;
    setCharacter(null);
    setError(null);
  }, [validId]);
```
### ELIMINO- ES UN BUCLE INFINITO 
```typescript
  useEffect(() => {
    if (character != null) {
      setCharacter({ ...character });
    }
  }, [character]);
```
### ELIMINO- NO LE VEO SENTIDO USAR TODA ESTA LOGICA CUANDO PUEDO LLMARLO DIRECTAMENTE ASI h1>{`${character.name} | Rick and Morty`}</h1
  ```typescript
  let characerName = "";
    useEffect(() => {
    if (character?.name != null) {
      characerName = `${character.name} | Rick and Morty`;
    }
    return () => {
      characerName = "Rick and Morty";
    };
  }, [character?.name]);
```

### Creo hooks/useCharacterDetailChar.ts con los para manejar todo lo relacionado al estado de character, loading y error, usando las funciones del archivo original
  ```typescript
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const { character, loading, error, setCharacterById } = useCharacterDetailChar();
```
### Creo hooks/useCharacterDetailEpisode.ts con los para manejar todo lo relacionado al estado de Episode, episodeLoading, usando las funciones del archivo original
  ```typescript
  const [selectedEpisode, setSelectedEpisode] = useState<any>(null);
  const [episodeLoading, setEpisodeLoading] = useState(false);
  
  const { selectedEpisode, episodeLoading, setSelectedEpisodeById } = useCharacterDetailEpisode();
```
