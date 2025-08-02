import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { SWRConfig } from 'swr'
import { fetcher } from './lib/fetcher'

import './index.css'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <SWRConfig value={{ fetcher }}>
            <App />
        </SWRConfig>
    </StrictMode>,
)
