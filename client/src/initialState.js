const initialState = {
  signup: {
    username: '',
    fullname: '',
    email: '',
    phoneNumber: +234,
    loggedIn: false
  },
  login: {
    username: '',
    isLoggedIn: false
  },
  setAuthToken: {
    isAuthenticated: false,
    user: {}
  },
  addflashMessages: []
};
export default initialState;
