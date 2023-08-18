import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { Theme } from '@mui/material/styles'

import {
  setPrefersDarkMode,
  setTheme, setUser,
} from './settings.actions'
import { createTheme } from '@mui/material'
import { Message } from '~shared/types'

export interface SettingsState {
  prefersDarkMode: boolean
  theme: Theme
  messages: Message[]
  user?: any
}

const INITIAL_SETTINGS_STATE: SettingsState = {
  prefersDarkMode: localStorage.getItem('darkMode') === 'true',
  theme: createTheme(),
  messages: [],
}

export const settingsStateReducer = reducerWithInitialState(INITIAL_SETTINGS_STATE)
  .case(setPrefersDarkMode, (state, prefersDarkMode) => {
    return ({ ...state, prefersDarkMode })
  })
  .case(setTheme, (state, theme) => {
    return ({ ...state, theme })
  })
