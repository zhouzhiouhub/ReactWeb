import { ConfigProvider, theme as antdTheme } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import { ThemeMode, ThemeModeContext } from './hooks/useThemeMode';
import router from './router';

const storageKey = 'react-company-demo-theme';

export default function App() {
  const [mode, setMode] = useState<ThemeMode>(() => {
    const storedMode = window.localStorage.getItem(storageKey);
    return storedMode === 'dark' ? 'dark' : 'light';
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', mode === 'dark');
    window.localStorage.setItem(storageKey, mode);
  }, [mode]);

  const themeValue = useMemo(
    () => ({
      mode,
      toggleMode: () => setMode((current) => (current === 'light' ? 'dark' : 'light')),
    }),
    [mode],
  );

  return (
    <ThemeModeContext.Provider value={themeValue}>
      <ConfigProvider
        theme={{
          algorithm: mode === 'dark' ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
          token: {
            borderRadius: 8,
            colorPrimary: '#0f766e',
            fontFamily:
              "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          },
        }}
      >
        <RouterProvider router={router} />
      </ConfigProvider>
    </ThemeModeContext.Provider>
  );
}
