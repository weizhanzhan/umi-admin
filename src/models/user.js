import { userLogin, getUserInfo } from '@/services/apis'
import { setInfo } from '@/utils/auth'

const loca_name = localStorage.username?localStorage.username:''
const loca_role = localStorage.role?localStorage.role:''
const loca_avatar = localStorage.avatar?localStorage.avatar:''
export default {
    namespace:'user',
    state:{
        token:'',
        username:loca_name,
        role:loca_role,
        avatar:loca_avatar
    },
    effects:{
        *login( {payload ,callback} , {call,put}){
     
            const response = yield call(userLogin,{Account:'375786117@qq.com',Password:'123456'})
            console.log(response)
            yield put({
                type:'USER_LOGIN',
                payload:{...response,username:'Admin'}
            })
            const userinfo = yield call(getUserInfo)
            yield put({
                type:'SET_USER_INFO',
                payload:{...userinfo}
            })
           
            callback()
        }
    },
    reducers:{
        USER_LOGIN(state,{payload}){
            localStorage.token=payload.token
            return {
                ...state,
                token:payload.token,
            }
        },
        SET_USER_INFO(state,{ payload }){
            const { name, role, avatar} = payload
            setInfo(payload)
            return {
                ...state,
                username:name,
                role,
                avatar
            }
        }
    }

}