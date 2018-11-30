export function setToken(token){
    localStorage.Token=token
}
export function getToken(){
    return localStorage.Token
}
export function removeToken(){
    localStorage.Token=''
}
