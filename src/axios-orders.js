import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://nested-form.firebaseio.com/'
});

export default instance;
