import { useEffect, useState } from 'react';
import { config } from './Stitches';

type Queries = keyof typeof config.media;

export function useMediaQuery(query: Queries): boolean {
  const getMatches = (query: Queries): boolean => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(config.media[query]).matches;
    }
    return false;
  };

  const [matches, setMatches] = useState<boolean>(getMatches(query));

  function handleChange() {
    setMatches(getMatches(query));
  }

  useEffect(() => {
    const matchMedia = window.matchMedia(config.media[query]);
    handleChange();
    matchMedia.addEventListener('media-query-change', handleChange);
    return () => {
      matchMedia.removeEventListener('media-query-change', handleChange);
    };
  }, [query]);

  return matches;
}
