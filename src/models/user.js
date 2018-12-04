import { userLogin } from '@/services/apis'
export default {
    namespace:'user',
    state:{
        token:'',
        username:'',
        role:'user'
    },
    effects:{
        *login( {payload ,callback} , {call,put}){
     
            const response = yield call(userLogin,{Account:'375786117@qq.com',Password:'123456'})
    
            yield put({
                type:'userLogin',
                payload:{...response,username:'Admin'}
            })
            callback()
        }
    },
    reducers:{
        userLogin(state,{payload}){
            localStorage.token=payload.token
            return {
                ...state,
                token:payload.token,
                username:payload.username,
            }
        }
    }

}