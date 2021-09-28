import { API_URL } from "../../config"

export default async(req, res) => {
  if (req.method === 'GET') {
    if (req.headers.cookie) {
      res.status(200).json({user: 'admin'})
    } else {
      res.status(200).json({message: 'Not authorized'})
      return
    }
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).json({message: `Method ${req.method} is not allowed`})
  }
}
