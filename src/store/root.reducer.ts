import { combineReducers } from 'redux'
import { SettingsState, settingsStateReducer } from './settings/settings.reducer'

export interface SettingsRootState {
  settingsStore: SettingsState
}

export const rootReducer = combineReducers<SettingsRootState>({
  settingsStore: settingsStateReducer,
})
