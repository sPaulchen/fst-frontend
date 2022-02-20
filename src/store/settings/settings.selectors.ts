import { createSelector } from 'reselect'
import { SettingsRootState } from '../root.reducer'

export const getPrefersDarkMode = createSelector(
  (state: SettingsRootState) => state.settingsStore.prefersDarkMode,
  (state) => state,
)

export const getTheme = createSelector(
  (state: SettingsRootState) => state.settingsStore.theme,
  (state) => state,
)

export const getUser = createSelector(
  (state: SettingsRootState) => state.settingsStore.user,
  (state) => state,
)
