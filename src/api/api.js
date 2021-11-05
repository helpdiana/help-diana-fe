// 파일경로: src/api/api.js
// 작성한 axios 인터셉터를 가져옵니다.
import Send from '../utils/send'
import store from '../store'
import qs from 'qs';
import { identity } from 'lodash';
//params나 query는 모두 javascript object 형태로 넘겨줘야 합니다.

/*
const headers = {
    'Authorization' : `Bearer ${store.state.accessToken}`
}
*/


export default {
    //sample
    requireAuth(type){
        let auth = store.getters.isAuthenticated
        let content = ""
        if(type == "file"){
            // 사진 업로드시 파일을 업로드 한다는 것을 명시해주세요.
            console.log("멀티파트")
            content = "multipart/form-data; boundary=----myboundary"
        }else{
            content = "application/x-www-form-urlencoded"
        }
        const headers = {
            'Authorization' : `Bearer ${auth}`,
            'Content-Type': content
        }
        return headers
    },
    getNews() {
        // axios 요청을 생성합니다.
        /*
        axios 요청을 생성합니다.
        https://github.com/axios/axios axios API 챕터
        인터셉터를 안썼으면 다음과 같습니다.
        axios({
            baseURL: 'https://api.hnpwa.com',
            url: '/news/1.json',
            method: 'get'  
        })
        */          
        return Send({
                // baseURL설정되어 있기 때문에 그 뒤의 URL만 작성합니다.
                url: '/news/1.json',
                method: 'get'
            })
    },
    googleLogin(data){
        return Send({
            url : `/auth/google`,
            method : 'post',
            data : data
        })
    },
    googleLoginDirect(data){
        return Send({
            url : `/auth/google/token`,
            method : 'post',
            data : data,
        })
    },
    getHome(){
        //홈화면
        return Send({
            url: `/home/`,
            method: 'get',
            headers : this.requireAuth()
            
        })
    },
    addDiagnose(data){
        var bodyFormData = new FormData();
        //multipart data일 경우 FormData를 사용해서 넣습니다.
        bodyFormData.append("files", [data.files])
        bodyFormData.append("name", data.name);
        bodyFormData.append("date", data.date)
        return Send({
            url: `/diagnose/add`,
            method : 'post',
            data : bodyFormData,
            headers : this.requireAuth('file')
        })
    }

}