export const theme = {
  colors: {
    primary: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#22c55e',
      600: '#16a34a',
      700: '#15803d',
      800: '#166534',
      900: '#14532d',
    },
    secondary: {
      50: '#fef3c7',
      100: '#fde68a',
      200: '#fcd34d',
      300: '#fbbf24',
      400: '#f59e0b',
      500: '#d97706',
      600: '#b45309',
      700: '#92400e',
      800: '#78350f',
      900: '#451a03',
    },
    accent: {
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#ef4444',
      600: '#dc2626',
      700: '#b91c1c',
      800: '#991b1b',
      900: '#7f1d1d',
    },
    neutral: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#e5e5e5',
      300: '#d4d4d4',
      400: '#a3a3a3',
      500: '#737373',
      600: '#525252',
      700: '#404040',
      800: '#262626',
      900: '#171717',
    },
    blue: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
    },
    purple: {
      50: '#faf5ff',
      100: '#f3e8ff',
      200: '#e9d5ff',
      300: '#d8b4fe',
      400: '#c084fc',
      500: '#a855f7',
      600: '#9333ea',
      700: '#7c3aed',
      800: '#6b21a8',
      900: '#581c87',
    }
  },
  
  // Golf-themed wheel colors with high contrast
  wheelColors: [
    '#16a34a', // Green 600
    '#dc2626', // Red 600
    '#2563eb', // Blue 600
    '#d97706', // Orange 600
    '#9333ea', // Purple 600
    '#0891b2', // Cyan 600
    '#be123c', // Rose 600
    '#7c2d12', // Orange 800
  ],
  
  // Semantic colors
  semantic: {
    success: '#22c55e',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
    
    // High contrast versions
    successContrast: '#ffffff',
    warningContrast: '#ffffff',
    errorContrast: '#ffffff',
    infoContrast: '#ffffff',
  },
  
  // Component specific colors
  components: {
    card: {
      background: '#ffffff',
      border: '#e5e5e5',
      shadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    },
    button: {
      primary: {
        background: '#16a34a',
        backgroundHover: '#15803d',
        text: '#ffffff',
        border: '#16a34a',
      },
      secondary: {
        background: '#f5f5f5',
        backgroundHover: '#e5e5e5',
        text: '#404040',
        border: '#d4d4d4',
      },
      accent: {
        background: '#ef4444',
        backgroundHover: '#dc2626',
        text: '#ffffff',
        border: '#ef4444',
      },
      warning: {
        background: '#f59e0b',
        backgroundHover: '#d97706',
        text: '#ffffff',
        border: '#f59e0b',
      },
      info: {
        background: '#3b82f6',
        backgroundHover: '#2563eb',
        text: '#ffffff',
        border: '#3b82f6',
      },
    },
    input: {
      background: '#ffffff',
      border: '#d4d4d4',
      borderFocus: '#16a34a',
      text: '#171717',
      placeholder: '#737373',
    },
    scoreboard: {
      header: '#f5f5f5',
      leader: '#f0fdf4',
      leaderBorder: '#bbf7d0',
      row: '#ffffff',
      rowHover: '#fafafa',
    },
    penalty: {
      active: '#fef2f2',
      activeBorder: '#fecaca',
      activeText: '#991b1b',
      shot: '#fef3c7',
      shotBorder: '#fde68a',
      hole: '#eff6ff',
      holeBorder: '#bfdbfe',
      persistent: '#faf5ff',
      persistentBorder: '#e9d5ff',
    }
  }
}

export const getWheelColor = (index: number) => {
  return theme.wheelColors[index % theme.wheelColors.length]
}