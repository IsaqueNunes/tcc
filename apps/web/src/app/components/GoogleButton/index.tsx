import React, { useEffect } from 'react';
import GoogleLogin from 'react-google-login';
import { gapi } from 'gapi-script';
import useGoogleAuthentication from '../useGoogleAuthentication';
import './GoogleButton.css';

function GoogleButton() {
  const clientId = process.env['NX_REACT_APP_GOOGLE_AUTH_CLIENT_ID'] || '';
  const { handleSuccess } = useGoogleAuthentication();
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId,
        scope: 'email',
      });
    }
    gapi.load('client:auth2', start);
  }, [clientId]);
  return (
    <GoogleLogin
      clientId={clientId}
      buttonText="Entrar com o E-mail institucional"
      onSuccess={handleSuccess}
      autoLoad={false}
      onFailure={(error) => console.log(error)}
      cookiePolicy="single_host_origin"
      className="google-button"
    />
  );
}

export default GoogleButton;
