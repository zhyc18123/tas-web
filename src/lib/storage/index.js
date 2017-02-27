import store from 'store' ;

const storage = {
  setAccessToken:function(accessToken){
    store.set("accessToken" , accessToken );
  },
  getAccessToken:function () {
    return store.get("accessToken");
  },
  setLogin:function(info){
    store.set("login" , info );
  },
  getLogin:function(){
    return store.get("login");
  },
  setCurrentUserInfo:function(userInfo){
    store.set("currentUserInfo" , userInfo );
  },
  getCurrentUserInfo:function(){
    return store.get('currentUserInfo') || {}
  }


}
export default  storage  ;
