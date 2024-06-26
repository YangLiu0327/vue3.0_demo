import axios from 'axios';
import { ElLoading, ElMessage } from 'element-plus'


let loading;
function startLoading() {
    loading = ElLoading.service({
        lock: true,
        text: 'crazy loading... 💪',
        background: 'rgba(0,0,0,0,7)'
    })
}
function endLoading() {
    loading.close();
}

axios.interceptors.request.use(config =>{
    startLoading();
    return config;
}, error => {
    return Promise.reject(error)
})

axios.interceptors.response.use(response=>{
    endLoading();
    return response;
}, error =>  {
    endLoading();
    ElMessage.error(error.response.data);
    return Promise.reject(error);
})
export default axios;