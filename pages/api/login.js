import { API_URL } from "../../config"
import FormData from 'form-data'
import cookie from 'cookie'


export default async (req, res) => {
  if (req.method === 'POST') {
    const { username, password } = req.body

    let formdata = new FormData();
    formdata.append("username", username);
    formdata.append("password", password);

    const requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };

    const uxcandyRes = await fetch(`${API_URL('login/')}`, requestOptions)
    const data = await uxcandyRes.json()

    if (data.status === "ok") {
      res.setHeader('Set-Cookie', cookie.serialize(
        'token', data.message.token, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== 'development',
          maxAge: 60 * 60 * 24,
          sameSite: 'strict',
          path: '/'
        }
      ))
      res.status(200).json(data)
    } else {
      res.status(401).json(data)
    }

  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).json({message: 'only POST requests'})
  }
}
