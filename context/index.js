import React, { createContext, useState, useEffect } from 'react';
import { Colors } from '@/constants/color';
import { Appearance } from 'react-native';

export const ThemeContext = createContext({});

export const ThemeProvider = ({ children }) => {
  const [colorSchema, setColorSchema] = useState(Appearance.getColorScheme());
  const theme = colorSchema === 'dark' ? Colors.dark : Colors.light;

  useEffect(() => {
    const listener = Appearance.addChangeListener(({ colorScheme }) => {
      setColorSchema(colorScheme);
    });
    return () => listener.remove();
  }, []);

  return (
    <ThemeContext.Provider value={{ colorSchema, setColorSchema, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};
