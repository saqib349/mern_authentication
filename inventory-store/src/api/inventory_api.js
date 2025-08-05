import axios from 'axios';

export default axios.create({
    baseURL: "https://mern-authentication-api-three.vercel.app/api/inventory"
});
