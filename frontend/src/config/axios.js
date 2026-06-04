import axios from 'axios'

const baseURL = process.env.REACT_APP_BASE_URL

if (!baseURL && process.env.NODE_ENV === 'production') {
  console.error(
    'REACT_APP_BASE_URL is not set. API calls will hit the Vercel frontend and break list rendering. Add it in Vercel → Settings → Environment Variables.'
  )
}

export const axiosi = axios.create({ withCredentials: true, baseURL })