export function API_URL (req='') {
  return `https://uxcandy.com/~shapoval/test-task-backend/v2/${req}?developer=q`
}

export const NEXT_URL = process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3000'
