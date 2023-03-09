import { useState, useMemo } from 'react';

const computeParamObject = () => {
  console.log('compute function');
  const hash = structuredClone(window.location.hash);
  const params = {};
  if (hash !== '') {
    hash
      ?.slice(1)
      ?.split('&')
      ?.forEach((h) => {
        const [key, value] = h?.split('=');
        params[key] = value;
      });
  }
  return params;
};

export default (): [
  params: any,
  setHashParam: (key: string, value: string | null) => void
] => {
  const [params, setParams] = useState(computeParamObject());

  useMemo(() => {
    window.addEventListener('hashchange', () => {
      console.log('event listener trigger');
      const params = computeParamObject();
      setParams(params);
      return;
    });
  }, []);

  const setHashParam = (key: string, value: string | null): void => {
    console.log('setHashParam fuction');
    if (key == '') {
      return;
    }
    if (value == null) {
      delete params[key];
    } else {
      params[key] = value;
    }
    const newHash = `#${Object.keys(params)
      .map((k) => `${k}=${params[k]}`)
      .join('&')}`;
    window.location.hash = newHash;
    return;
  };

  return [params, setHashParam];
};
