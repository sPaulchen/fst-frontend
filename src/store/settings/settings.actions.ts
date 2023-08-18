import settingsActionCreatorFactory from 'typescript-fsa'
import { Theme } from '@mui/material'

export const settingsActionCreator = settingsActionCreatorFactory('SETTINGS')

/**
 * Actions
 */

// settings actions
export const setPrefersDarkMode = settingsActionCreator<boolean>('SET_DARK_MODE')
export const setTheme = settingsActionCreator<Theme>('SET_THEME')
