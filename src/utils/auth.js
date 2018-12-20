export function setToken(token){
    localStorage.Token=token
}
export function getToken(){
    return localStorage.Token
}
export function removeToken(){
    localStorage.Token=''
}
export function setInfo({ name, role, avatar}){
    localStorage.username=name
    localStorage.avatar=avatar
    localStorage.role=role
}
