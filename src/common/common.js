import Axios from 'axios';
import JSEncrypt from "jsencrypt";
import { sha256 } from 'js-sha256';
import { v4 as uuid } from 'uuid';

import router from '/src/common/router.js';

const axios = Axios.create({
    baseURL: "/prod-api",
    timeout: 6000
});

// 添加响应拦截器
axios.interceptors.response.use(resp => {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    let data = resp.data;
    if (data.code === 400 || data.code === 500) {
        alert(data.msg);
        return;
    }

    if (data.code === 401) {
        router.push('/system/login?redirect=' + encodeURIComponent(router.currentRoute.value.fullPath));
        return;
    }

    return data;
}, err => {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(err);
});

function getUser() {
    let user = localStorage.getItem('user');
    return user ? JSON.parse(user) : {};
}

export default {
    getUser() {
        let user = localStorage.getItem('user');
        return user ? JSON.parse(user) : {};
    },
    setUser: (user) => {
        localStorage.setItem('user', JSON.stringify(user));
    },
    request: (path, data) => {
        let user = getUser();

        let data0 = {
            _uuid: uuid(),
            _timestamp: Date.now(),
            _token: user.token,
            ...data
        }

        return axios.post(path, data0, {
            headers: {
                'X-Sign': sha256(user.secret + JSON.stringify(data0) + user.secret),
                'X-Token': user.token
            }
        });
    },
    upload: (files, data) => {
        let user = getUser();
        
        return Promise.all(
            files.map((file) => {
                let data0 = JSON.stringify({
                    _uuid: uuid(),
                    _timestamp: Date.now(),
                    _token: user.token,
                    ...data
                });

                const form = new FormData();
                form.append('file', file);
                form.append('strData', data0);
        
                return axios.post('/system/file/upload', form, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'X-Sign': sha256(user.secret + data0 + user.secret),
                        'X-Token': user.token
                    }
                });
            })
        );
    },
    encrypt: (key, value) => {
        const encrypt = new JSEncrypt()
        encrypt.setPublicKey(key);
        return encrypt.encrypt(value);
    }
}