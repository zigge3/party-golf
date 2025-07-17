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
    // New dark theme colors
    neutral: {
      50: '#18181b',
      100: '#27272a',
      200: '#3f3f46',
      300: '#52525b',
      400: '#71717a',
      500: '#a1a1aa',
      600: '#d4d4d8',
      700: '#e4e4e7',
      800: '#f4f4f5',
      900: '#fafafa',
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
  
  // Golf-themed wheel colors with high contrast and neon vibes
  wheelColors: [
    '#10b981', // Emerald 500
    '#f59e0b', // Amber 500
    '#8b5cf6', // Violet 500
    '#06b6d4', // Cyan 500
    '#ef4444', // Red 500
    '#f97316', // Orange 500
    '#ec4899', // Pink 500
    '#84cc16', // Lime 500
  ],
  
  // Semantic colors with neon accents
  semantic: {
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#06b6d4',
    
    // High contrast versions
    successContrast: '#ffffff',
    warningContrast: '#000000',
    errorContrast: '#ffffff',
    infoContrast: '#ffffff',
  },
  
  // Component specific colors - Dark theme
  components: {
    card: {
      background: '#1f2937',
      border: '#374151',
      shadow: '0 10px 15px -3px rgb(0 0 0 / 0.3), 0 4px 6px -2px rgb(0 0 0 / 0.1)',
    },
    button: {
      primary: {
        background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
        backgroundHover: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
        text: '#ffffff',
        border: '#22c55e',
      },
      secondary: {
        background: 'linear-gradient(135deg, #a855f7 0%, #9333ea 100%)',
        backgroundHover: 'linear-gradient(135deg, #9333ea 0%, #7c3aed 100%)',
        text: '#ffffff',
        border: '#a855f7',
      },
      accent: {
        background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
        backgroundHover: 'linear-gradient(135deg, #d97706 0%, #b45309 100%)',
        text: '#ffffff',
        border: '#f59e0b',
      },
      warning: {
        background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
        backgroundHover: 'linear-gradient(135deg, #d97706 0%, #b45309 100%)',
        text: '#ffffff',
        border: '#f59e0b',
      },
      info: {
        background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
        backgroundHover: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
        text: '#ffffff',
        border: '#0ea5e9',
      },
    },
    input: {
      background: '#374151',
      border: '#4b5563',
      borderFocus: '#10b981',
      text: '#e5e7eb',
      placeholder: '#9ca3af',
    },
    scoreboard: {
      header: '#374151',
      leader: '#065f46',
      leaderBorder: '#10b981',
      row: '#1f2937',
      rowHover: '#374151',
    },
    penalty: {
      active: '#1e293b',
      activeBorder: '#ef4444',
      activeText: '#f87171',
      shot: '#1e1b4b',
      shotBorder: '#8b5cf6',
      hole: '#164e63',
      holeBorder: '#06b6d4',
      persistent: '#4c1d95',
      persistentBorder: '#a855f7',
    }
  }
}

export const getWheelColor = (index: number) => {
  return theme.wheelColors[index % theme.wheelColors.length]
}