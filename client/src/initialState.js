const initialState = {
  signup: {
    username: '',
    email: '',
    phoneNumber: +234,
    loggedIn: false,
    password: ''
  },
  login: {
    username: '',
    password: '',
    isLoggedIn: false
  },
  setAuthToken: {
    isAuthenticated: false,
    user: {}
  },
  addflashMessages: [],

  group: {
    GroupName: '',
    description: ''
  },
  userGroupList: []

};
export default initialState;
