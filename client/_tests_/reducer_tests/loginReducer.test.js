import login from '../../src/reducers/loginReducer';
import * as types from '../../constant';
import reducers from '../../src/reducers';

describe('Signup Reducer', () => {
  it('SIGNUP_USER success', () => {
    const state = {
      username: '',
      email: '',
      phoneNumber: 234,
      loggedIn: false,
      password: ''
    };
    const action = {
      type: types.LOGIN_USER,
      username: 'Mcdavid',
      email: 'mcdavidemereuwa@gmail.com',
      phoneNumber: 2333405585,
      loggedIn: false,
      password: 'jhiuiui'
    };
    const results = login(state, action);
    expect(results)
      .toEqual([{
        type: 'SIGN_UP_USER_SUCCESS',
        username: 'Mcdavid',
        email: 'mcdavidemereuwa@gmail.com',
        phoneNumber: 2333405585,
        loggedIn: false,
        password: 'jhiuiui'
      }]);
  });
});


test('reducers', () => {
  let state;
  state = reducers({signup:{username:'',email:'',phoneNumber:234,loggedIn:false,password:''},login:{username:'',password:'',isLoggedIn:false},setAuthToken:{isAuthenticated:false,user:{}},addflashMessages:[],group:{GroupName:'',description:''},userGroupList:[[{groupName:'jonny',groupId:1,description:'for yemi alade'}]],groupMessages:[[{id:1,message:'hi',userId:1,groupId:1,username:'mcdavid',priority:'normal'},{id:2,message:'brkrrrjjr',userId:1,groupId:1,username:'mcdavid',priority:'normal'},{id:3,message:'rejrej',userId:1,groupId:1,username:'mcdavid',priority:'normal'}]],postMessage:{message:'',priority:'normal'},addUser:{username:''},allUsers:[],forgotPassword:{email:''},resetPassword:{newPassword:'',confirmPassword:''},search:{username:''}}, {type:'LOGIN_USER',user:{data:{myToken:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Im1jZGF2aWQiLCJlbWFpbCI6Im1jZGF2aWRlbWVyZXV3YTk1QGdtYWlsLmNvbSIsImlhdCI6MTUwNjkyNjUxOSwiZXhwIjoxNTA3MDEyOTE5fQ.2s8O3am7MOC3W_KaBZ3plEjULZT3tEfPgkGUm59o-JY',message:'Welcome back Mcdavid'},status:202,statusText:'Accepted',headers:{date:'Mon, 02 Oct 2017 06:41:59 GMT',etag:'W/"102-gWz/8Rx6s7g7Nh9gFLmUJuRp+Og"',connection:'keep-alive','x-powered-by':'Express','content-length':'258','content-type':'application/json; charset=utf-8'},config:{transformRequest:{},transformResponse:{},timeout:0,xsrfCookieName:'XSRF-TOKEN',xsrfHeaderName:'X-XSRF-TOKEN',maxContentLength:-1,headers:{Accept:'application/json, text/plain, */*','Content-Type':'application/json;charset=utf-8'},method:'post',url:'/api/v1/user/login',data:'{"username":"Mcdavid","password":"janike_13","isLoggedIn":false}'},request:{}}});
  expect(state).toEqual({signup:{username:'',email:'',phoneNumber:234,loggedIn:false,password:''},login:[{type:'LOGIN_USER',user:{data:{myToken:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Im1jZGF2aWQiLCJlbWFpbCI6Im1jZGF2aWRlbWVyZXV3YTk1QGdtYWlsLmNvbSIsImlhdCI6MTUwNjkyNjUxOSwiZXhwIjoxNTA3MDEyOTE5fQ.2s8O3am7MOC3W_KaBZ3plEjULZT3tEfPgkGUm59o-JY',message:'Welcome back Mcdavid'},status:202,statusText:'Accepted',headers:{date:'Mon, 02 Oct 2017 06:41:59 GMT',etag:'W/"102-gWz/8Rx6s7g7Nh9gFLmUJuRp+Og"',connection:'keep-alive','x-powered-by':'Express','content-length':'258','content-type':'application/json; charset=utf-8'},config:{transformRequest:{},transformResponse:{},timeout:0,xsrfCookieName:'XSRF-TOKEN',xsrfHeaderName:'X-XSRF-TOKEN',maxContentLength:-1,headers:{Accept:'application/json, text/plain, */*','Content-Type':'application/json;charset=utf-8'},method:'post',url:'/api/v1/user/login',data:'{"username":"Mcdavid","password":"janike_13","isLoggedIn":false}'},request:{}}}],setAuthToken:{isAuthenticated:false,user:{}},addflashMessages:[],group:{GroupName:'',description:''},userGroupList:[[{groupName:'jonny',groupId:1,description:'for yemi alade'}]],groupMessages:[[{id:1,message:'hi',userId:1,groupId:1,username:'mcdavid',priority:'normal'},{id:2,message:'brkrrrjjr',userId:1,groupId:1,username:'mcdavid',priority:'normal'},{id:3,message:'rejrej',userId:1,groupId:1,username:'mcdavid',priority:'normal'}]],postMessage:{message:'',priority:'normal'},addUser:{username:''},allUsers:[],forgotPassword:{email:''},resetPassword:{newPassword:'',confirmPassword:''},search:{username:''}});
});
