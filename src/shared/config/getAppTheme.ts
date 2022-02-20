import { createTheme, Theme } from '@mui/material'

export function getAppTheme (): Theme {
  const customTheme = {
    typography: {
      fontSize: 12,
    },
    palette: {
      primary: {
        main: '#1c7899',
      },
      secondary: {
        main: '#d1d1d1',
      },
    },
  }

  const theme: Theme = createTheme(customTheme)

  return theme
}
