import { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';

function useGoogleAuthentication() {
  const handleSuccess = (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    if ('accessToken' in response) {
      const { accessToken } = response;
      fetch(`${process.env['NX_REACT_APP_API_URL']}/google-authentication`, {
        method: 'POST',
        body: JSON.stringify({
          token: accessToken,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  };

  return {
    handleSuccess,
  };
}

export default useGoogleAuthentication;
