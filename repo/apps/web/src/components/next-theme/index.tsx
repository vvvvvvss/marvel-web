"use client";
import React, {
  Fragment,
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  memo,
  useCallback,
} from "react";
import type { UseThemeProps, ThemeProviderProps, ValueObject } from "./types";

const colorSchemes = ["light", "dark"];
const MEDIA = "(prefers-color-scheme: dark)";
const isServer = typeof window === "undefined";
const ThemeContext = createContext<UseThemeProps | undefined>(undefined);
const defaultContext: UseThemeProps = { setTheme: (_) => {}, themes: [] };

export const useTheme = () => useContext(ThemeContext) ?? defaultContext;

export const ThemeProvider: React.FC<ThemeProviderProps> = (props) => {
  const context = useContext(ThemeContext);

  // Ignore nested context providers, just passthrough children
  if (context) return <Fragment>{props.children}</Fragment>;
  return <Theme {...props} />;
};

const defaultThemes = ["light", "dark"];

const Theme: React.FC<ThemeProviderProps> = ({
  forcedTheme,
  disableTransitionOnChange = false,
  enableSystem = true,
  enableColorScheme = true,
  storageKey = "theme",
  defaultTheme = enableSystem ? "system" : "dark",
  value = {},
  children,
  nonce,
}) => {
  const [theme, setThemeState] = useState(() =>
    getTheme(storageKey, defaultTheme)
  );
  const [resolvedTheme, setResolvedTheme] = useState(() =>
    getTheme(storageKey)
  );
  const attrs: string[][] = !value
    ? Object.values(value)
    : Object.values(value);

  const applyTheme = useCallback(
    (theme) => {
      let resolved: string = theme;
      if (!resolved) return;

      // If theme is system, resolve it before setting theme
      if (theme === "system" && enableSystem) {
        resolved = getSystemTheme();
      }

      const classes = value[resolved];
      const enable = disableTransitionOnChange ? disableAnimation() : null;
      const d = document.documentElement;

      // Remove previous theme classes
      d.classList.remove(...attrs.flat());

      if (classes) {
        d.classList.add(...classes);
      }

      if (enableColorScheme) {
        const fallback = colorSchemes.includes(defaultTheme)
          ? defaultTheme
          : null;
        const colorScheme = colorSchemes.includes(resolved)
          ? resolved
          : fallback;
        // @ts-ignore
        d.style.colorScheme = colorScheme;
      }

      enable?.();
    },
    [value, enableSystem, disableTransitionOnChange, attrs, defaultTheme]
  );

  const setTheme = (theme: string) => {
    setThemeState(theme);

    // Save to storage
    try {
      localStorage.setItem(storageKey, theme);
    } catch (e) {
      // Unsupported
    }
  };

  const handleMediaQuery = (e: MediaQueryListEvent | MediaQueryList) => {
    const resolved = getSystemTheme(e);
    setResolvedTheme(resolved);

    if (theme === "system" && enableSystem && !forcedTheme) {
      applyTheme("system");
    }
  };

  // Always listen to System preference
  useEffect(() => {
    const media = window.matchMedia(MEDIA);

    const handleMediaChange = (e: MediaQueryListEvent | MediaQueryList) => {
      handleMediaQuery(e);
    };

    // Intentionally use deprecated listener methods to support iOS & old browsers
    media.addListener(handleMediaChange);
    handleMediaQuery(media);

    return () => media.removeListener(handleMediaChange);
  }, [handleMediaQuery]);

  // localStorage event handling
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key !== storageKey) {
        return;
      }

      // If default theme set, use it if localstorage === null (happens on local storage manual deletion)
      const theme = e.newValue || defaultTheme;
      setTheme(theme);
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [setTheme, storageKey, defaultTheme]);

  // Whenever theme or forcedTheme changes, apply it
  useEffect(() => {
    applyTheme(forcedTheme ?? theme);
  }, [forcedTheme, theme, applyTheme]);

  const providerValue = useMemo(() => {
    const systemTheme = enableSystem ? resolvedTheme : undefined;

    return {
      theme,
      setTheme,
      forcedTheme,
      resolvedTheme: theme === "system" ? resolvedTheme : theme,
      themes: enableSystem ? [...defaultThemes, "system"] : defaultThemes,
      systemTheme,
    };
  }, [theme, setTheme, forcedTheme, resolvedTheme, enableSystem]);

  return (
    <ThemeContext.Provider value={providerValue}>
      <ThemeScript
        {...{
          forcedTheme,
          disableTransitionOnChange,
          enableSystem,
          enableColorScheme,
          storageKey,
          defaultTheme,
          value,
          attrs,
          nonce,
        }}
      />
      {children}
    </ThemeContext.Provider>
  );
};

const ThemeScript = memo(
  ({
    forcedTheme,
    storageKey,
    enableSystem,
    enableColorScheme,
    defaultTheme,
    value,
    nonce,
  }: ThemeProviderProps & {
    defaultTheme: string;
    value: ValueObject;
  }) => {
    const defaultSystem = defaultTheme === "system";

    const optimization = (() => {
      const removeClasses = Object.values(value)
        .flatMap((classes) => classes)
        .map((c) => `c.remove('${c}');`)
        .join("");
      return `var d=document.documentElement,c=d.classList;${removeClasses}`;
    })();

    const fallbackColorScheme = (() => {
      if (!enableColorScheme) {
        return "";
      }

      const fallback = colorSchemes.includes(defaultTheme)
        ? defaultTheme
        : null;

      if (fallback) {
        return `if(e==='light'||e==='dark'||!e)d.style.colorScheme=e||'${defaultTheme}'`;
      } else {
        return `if(e==='light'||e==='dark')d.style.colorScheme=e`;
      }
    })();

    const updateDOM = (name: string) => {
      const classes = value[name];
      const val = JSON.stringify(classes);

      let text = "";

      if (enableColorScheme && colorSchemes.includes(name)) {
        text += `d.style.colorScheme = '${name}';`;
      }

      if (classes && classes.length > 0) {
        text += `c.add(${val})`;
      } else {
        text += `null`;
      }

      return text;
    };

    const scriptSrc = (() => {
      if (forcedTheme) {
        return `!function(){${optimization}${updateDOM(forcedTheme)}}()`;
      }

      if (enableSystem) {
        return `!function(){try{${optimization}var e=localStorage.getItem('${storageKey}');if('system'===e||(!e&&${defaultSystem})){var t='${MEDIA}',m=window.matchMedia(t);if(m.media!==t||m.matches){${updateDOM(
          "dark"
        )}}else{${updateDOM("light")}}}else if(e){${updateDOM(
          `JSON.parse(e)`
        )}}${
          !defaultSystem ? `else{${updateDOM(defaultTheme)}}` : ""
        }${fallbackColorScheme}}catch(e){}}()`;
      }

      return `!function(){try{${optimization}var e=localStorage.getItem('${storageKey}');if(e){${updateDOM(
        `JSON.parse(e)`
      )}}else{${updateDOM(
        defaultTheme
      )};}${fallbackColorScheme}}catch(t){}}();`;
    })();

    return (
      <script nonce={nonce} dangerouslySetInnerHTML={{ __html: scriptSrc }} />
    );
  },
  () => true
);

// Helpers
const getTheme = (key: string, fallback?: string) => {
  if (isServer) return undefined;
  let theme;
  try {
    theme = localStorage.getItem(key) || undefined;
  } catch (e) {
    // Unsupported
  }
  return theme || fallback;
};

const disableAnimation = () => {
  const css = document.createElement("style");
  css.appendChild(
    document.createTextNode(
      `*{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}`
    )
  );
  document.head.appendChild(css);

  return () => {
    // Force restyle
    (() => window.getComputedStyle(document.body))();

    // Wait for next tick before removing
    setTimeout(() => {
      document.head.removeChild(css);
    }, 1);
  };
};

const getSystemTheme = (e?: MediaQueryList | MediaQueryListEvent) => {
  if (!e) e = window.matchMedia(MEDIA);
  const isDark = e.matches;
  const systemTheme = isDark ? "dark" : "light";
  return systemTheme;
};
