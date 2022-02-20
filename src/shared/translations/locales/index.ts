import de from './de.json'
import en from './en.json'

import crudeDE from '@3m5/crude-frontend/dist/shared/translations/locales/de-DE.json'
import crudeEN from '@3m5/crude-frontend/dist/shared/translations/locales/en-US.json'

localStorage.setItem('language', 'de-DE')

const resources = {
  de: Object.assign(de, crudeDE),
  en: Object.assign(en, crudeEN),
}

export default resources
