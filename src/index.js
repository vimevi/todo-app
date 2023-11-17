import { createRoot } from 'react-dom/client'

import App from './components/app'

const rootElement = document.getElementById('root')

const root = createRoot(rootElement) // createRoot(rootElement!) if you use TypeScript
root.render(<App />)
