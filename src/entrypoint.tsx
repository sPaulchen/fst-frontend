
import 'regenerator-runtime/runtime'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import '~shared/translations/i18next'
import App from './screens/App/App'
import { rootReducer } from './store/root.reducer'

const store = createStore(
  rootReducer,
)

export default function Bootstrap (): React.ReactElement {
  return (
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  )
}

ReactDOM.render(<Bootstrap />, window.document.getElementById('root'))
