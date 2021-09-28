import { API_URL } from "../../config"
import FormData from 'form-data'

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
    // console.log(data.message.token)

    if (uxcandyRes.ok) {
      res.status(200).json(data)
    } else {
      res.json(data.message)
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).json({message: 'only POST requests'})
  }
}
