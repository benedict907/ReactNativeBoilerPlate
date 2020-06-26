import API from '../../utils/API';

export const authModel = {
  state: {userData: {token: null}, isConnected: null},
  reducers: {
    setUserData: (state, payload) => {
      return {...state, userData: payload};
    },
    clearUserData: (state) => {
      return {...state, userData: null};
    },
    setIsConnected: (state, payload) => {
      return {...state, isConnected: payload};
    },
  },
  effects: (dispatch) => ({
    logIn: async (requestBody) => {
      try {
        const response = await API.post('/login', requestBody);
        const {
          data: {data = null, message = null, status = null},
        } = response;
        if (status === 'success') {
          dispatch.authModel.setUserData(data);
        } else if (status === 'failure') {
          dispatch.alertModel.showFailureAlert({
            contentText: message,
            alertName: undefined,
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
    getOTP: async (requestBody) => {
      try {
        const response = await API.post('/send-otp', requestBody);
        const {
          data: {message = null, status = null},
        } = response;
        if (status === 'success') {
          dispatch.alertModel.showSuccessAlert({
            contentText: message,
            alertName: 'getOTPSuccess',
          });
        } else if (status === 'failure') {
          dispatch.alertModel.showFailureAlert({
            contentText: message,
            alertName: 'getOTPFailure',
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
    resetPassword: async (requestBody) => {
      try {
        const response = await API.post('/reset-password', requestBody);
        const {
          data: {message = null, status = null},
        } = response;
        if (status === 'success') {
          dispatch.alertModel.showSuccessAlert({
            contentText: message,
            alertName: 'resetPasswordSuccess',
          });
        } else if (status === 'failure') {
          dispatch.alertModel.showFailureAlert({
            contentText:
              (message.otp && message.otp[0]) ||
              (message.email && message.email[0]),
            alertName: 'resetPasswordFailure',
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
    updateProfile: async (requestBody) => {
      try {
        const response = await API.post('/retailer-update', requestBody);
        const {
          data: {message = null, status = null},
        } = response;
        if (status === 'success') {
          dispatch.alertModel.showSuccessAlert({
            contentText: message,
            alertName: 'updateProfileSuccess',
          });
        } else if (status === 'failure') {
          dispatch.alertModel.showFailureAlert({
            contentText: message,
            alertName: 'updateProfileFailure',
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
  }),
};
