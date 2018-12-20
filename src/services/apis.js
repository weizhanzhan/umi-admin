import request from '@/utils/request';
export async function userLogin(params) {
    return request('/users/login', {
      method: 'POST',
      data:{
        email:params.Account,
        password:params.Password
    }
    });
}

//获取个人信息
export const getUserInfo = () => {
    return request({
        url:'/current',///blog
        method:'get',
    })

}