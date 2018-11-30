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