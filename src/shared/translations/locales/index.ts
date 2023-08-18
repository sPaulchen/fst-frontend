import de from './de.json'
import en from './en.json'

localStorage.setItem('language', 'de-DE')

const resources = {
  de: Object.assign(de),
  en: Object.assign(en),
}

export default resources
