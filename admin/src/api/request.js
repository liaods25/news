import axios from 'axios';
export const service = axios.create({
    baseURL: process.env.NODE_ENV === "development"?"dev":"https://honyi.top" //配置axios请求的地址
})

console.log("NODE_ENV:"+process.env.NODE_ENV)
//post请求的请求头
// service.defaults.headers.post['Content-Type'] = 'application/json';


//axios请求拦截器
service.interceptors.request.use(
    config => {
        if (localStorage.getItem('token')) {
            //token字段是要和后端协商好的
            config.headers.common["token"] = localStorage.getItem('token');
        }
        // if (config.method == 'get') {
        //     // 时间戳,防止ie 缓存get方法
        //     config.params = {
        //         t: Date.parse(new Date()) / 1000,
        //         ...config.params
        //     }
        // }
        return config;
    },
    error => {
        return Promise.reject(error); //在axios的catch中写入报错后回调
    }
);


//响应拦截
service.interceptors.response.use(
    response => {

        if (response.status === 200) {
            return Promise.resolve(response.data)
        } else {
            return Promise.reject(response);
        }
    },
    error => {
        console.log(error)
        //其他异常
        // if (error && error.response) {
        //     Notify.clear()
        //     switch (error.response.status) {
        //         case 400:
        //             Notify({
        //                 type: 'warning',
        //                 message: `${error.response.data.message || error.response.data.msg}`
        //             });
        //             break;
        //         default:
        //             Notify({
        //                 type: 'warning',
        //                 message: '服务异常！'
        //             });
        //     }
        // }
        return Promise.reject(error); //在axios的catch中写入报错后回调
    }
)


export default service
