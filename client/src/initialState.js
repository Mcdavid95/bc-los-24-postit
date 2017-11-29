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

  currentGroup: '',

  group: {
    groupName: '',
    description: ''
  },

  postMessage: {
    message: '',
    priority: 'normal'
  },

  search: {
    username: ''
  },

  addUser: {
    username: ''
  },

  allUsers: [],

  userGroupList: [],
  groupMessages: [],

  forgotPassword: {
    email: ''
  },

  resetPassword: {
    newPassword: '',
    confirmPassword: '',
    class: 'reset'
  },

  groupMembers: []

};
export default initialState;
