import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { Character } from "@/core/models/character";
import { apiGet } from "@/shared/api/client";
import type { CharacterApi } from "@/shared/api/characters";
import { ROUTES } from "@/router/routes";



function getEpisodeIdFromUrl(url: string): number | null {
  const segment = url.split("/").filter(Boolean).pop();
  if (segment == null) return null;
  const n = parseInt(segment, 10);
  return Number.isNaN(n) ? null : n;
}

export function CharacterDetailScreen() {
  const { id } = useParams<{ id: string }>();
  const numId = id != null && id !== "" ? parseInt(id, 10) : null;
  const validId = numId != null && !Number.isNaN(numId) ? numId : null;

  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [selectedEpisodeId, setSelectedEpisodeId] = useState<number | null>(null);
  const [selectedEpisode, setSelectedEpisode] = useState<any>(null);
  const [episodeLoading, setEpisodeLoading] = useState(false);

  let characerName = "";

  useEffect(() => {
    if (selectedEpisodeId == null) {
      setSelectedEpisode(null);
      return;
    }
    setSelectedEpisode(null);
    setEpisodeLoading(true);
    apiGet(`/episode/${selectedEpisodeId}`)
      .then((res) => setSelectedEpisode(res))
      .finally(() => setEpisodeLoading(false));
  }, [selectedEpisodeId]);

  useEffect(() => {
    if (selectedEpisode != null) {
      const t = setTimeout(() => setEpisodeLoading(true), 100);
      return () => clearTimeout(t);
    }
  }, [selectedEpisode]);

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

  useEffect(() => {
    if (validId == null) return;
    setCharacter(null);
    setError(null);
  }, [validId]);

  useEffect(() => {
    if (character?.name != null) {
      characerName = `${character.name} | Rick and Morty`;
    }
    return () => {
      characerName = "Rick and Morty";
    };
  }, [character?.name]);

  useEffect(() => {
    if (character != null) {
      setCharacter({ ...character });
    }
  }, [character]);


  if (validId == null) {
    return (
      <div className="character-detail-screen">
        <p>Invalid character ID.</p>
        <Link to={ROUTES.CHARACTERS}>← Back to list</Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="character-detail-screen" aria-busy="true">
        <p>Loading…</p>
      </div>
    );
  }

  if (error != null) {
    return (
      <div className="character-detail-screen" role="alert">
        <p>Error: {error.message}</p>
        <Link to={ROUTES.CHARACTERS}>← Back to list</Link>
      </div>
    );
  }

  if (character == null) {
    return (
      <div className="character-detail-screen">
        <p>Character not found.</p>
        <Link to={ROUTES.CHARACTERS}>← Back to list</Link>
      </div>
    );
  }

  const episodeCount = character.episode?.length ?? 0;
  const episodeIds = (character.episode ?? [])
    .map(getEpisodeIdFromUrl)
    .filter((id): id is number => id != null);
  const createdDate =
    character.created != null
      ? new Date(character.created).toLocaleDateString(undefined, {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : null;

  return (
    <div className="character-detail-screen">
      <Link to={ROUTES.CHARACTERS} className="back-link">
        ← Back to list
      </Link>
      <article className="character-detail">
        <img
          src={character.image}
          alt={character.name}
          width={300}
          height={300}
        />
        <div className="character-detail-info">
          <h1>{characerName}</h1>
          <p>
            {character.status} · {character.species} · {character.gender}
          </p>
          {character.type != null && character.type !== "" && (
            <p>Type: {character.type}</p>
          )}
          <p>Origin: {character.origin.name}</p>
          <p>Location: {character.location.name}</p>
          <p>Appears in {episodeCount} episode{episodeCount !== 1 ? "s" : ""}</p>
          {createdDate != null && <p>Created: {createdDate}</p>}
          {episodeIds.length > 0 && (
            <div className="character-episodes">
              <h2>Episodes</h2>
              <ul className="episode-list">
                {episodeIds.map((epId) => (
                  <li key={epId}>
                    <button
                      type="button"
                      className="episode-trigger"
                      onClick={() => setSelectedEpisodeId((prev) => (prev === epId ? null : epId))}
                      aria-expanded={selectedEpisodeId === epId}
                    >
                      Episode {epId}
                    </button>
                    {selectedEpisodeId === epId && (
                      <div className="episode-detail" role="region" aria-label="Episode details">
                        {episodeLoading ? (
                          <p className="episode-loading">Loading episode…</p>
                        ) : selectedEpisode != null && selectedEpisode.id === epId ? (
                          <div className="episode-info">
                            <p><strong>{selectedEpisode.name}</strong></p>
                            <p>{selectedEpisode.episode} · {selectedEpisode.air_date}</p>
                          </div>
                        ) : null}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </article>
    </div>
  );
}
