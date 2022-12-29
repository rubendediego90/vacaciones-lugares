import Api from './api'
import axios from 'axios'

const getGuest =async () =>{
    return await axios.get('https://bear-express-delta.vercel.app/api/guest') 
}

const postGuest =async (data) =>{
    return await axios.post('https://bear-express-delta.vercel.app/api/guest', data);
}

export  {
    getGuest,
    postGuest
}