 import axios from 'axios';
import storage from '@/config/storage'

// const loginKey =localStorage.getItem('LoginKey');
 const service = axios.create({
     //baseURL: BASE_URL
 })
// axios.defaults.headers.post['LoginKey'] = loginKey;
// axios.defaults.headers.get['LoginKey'] = loginKey;
service.interceptors.request.use(
    config => {
    //    if(getToken()){
    //         config.headers['LoginKey']=getToken()
    //    }
        return config;
    },
    err => {
        return Promise.reject(err)
    }
)

service.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if(error.response) {
            switch (error.response.status) {
                case 401:
                router.replace({
                    path: '/path',
                    query: {redirect: router.currentRoute.fullPath}
                })
            }
        }
        return Promise.reject(error.response.data)
    }
)

export default service;