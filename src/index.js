import ReactDOM from 'react-dom'
import App from './components/App'
import { BrowserRouter as Router } from 'react-router-dom'

const app = document.getElementById('app')
ReactDOM.render(
  <Router>
    <App />
  </Router>,
  app
)
