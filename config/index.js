export function API_URL (req='', developer='c') {
  return `https://uxcandy.com/~shapoval/test-task-backend/v2/${req}?developer=${developer}`
}

export const NEXT_URL = process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3000'
