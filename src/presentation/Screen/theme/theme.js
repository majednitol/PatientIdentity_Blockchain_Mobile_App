
import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';
export const lightMode = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#8D68F6',
    background: '#F6F6F6',
    "elevation": {
      "level0": "transparent",
      "level1": "rgb(222, 220, 255)",
      "level2": "rgb(44, 40, 48)",
      "level3": "rgb(50, 44, 55)",
      "level4": "rgb(52, 46, 57)",
      "level5": "rgb(56, 49, 62)"
    },
  }
}

export const darkMode = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: 'rgb(108, 99, 255)',
    background: 'rgb(19, 18, 44)',
    "elevation": {
      "level0": "transparent",
      "level1": " rgb(28, 26, 65)",
      "level2": "rgb(44, 40, 48)",
      "level3": "rgb(50, 44, 55)",
      "level4": "rgb(52, 46, 57)",
      "level5": "rgb(56, 49, 62)"
    },
    
  },
};