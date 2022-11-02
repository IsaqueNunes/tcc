import { useEffect } from 'react';
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { gapi } from 'gapi-script';
// import useGoogleAuthentication from '../useGoogleAuthentication';
import './GoogleButton.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function GoogleButton() {
  const clientId = process.env['NX_REACT_APP_GOOGLE_AUTH_CLIENT_ID'] || '';
  const navigate = useNavigate();
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
      onSuccess={async(credentialResponse: GoogleLoginResponse | GoogleLoginResponseOffline) => {
        if ('accessToken' in credentialResponse) {
          // const is_student = (credentialResponse.profileObj.email as string).includes('@estudante.ifms.edu.br')
          // const is_admin = (credentialResponse.profileObj.email).includes('@ifms.edu.br');

          // if(is_student || is_admin) {
            const response = await axios.post('http://localhost:3333/api/auth/login', {
            token: credentialResponse.tokenId
            });
            const data = response.data;
            localStorage.setItem('authData', JSON.stringify(data));

            navigate('/dashboard');
            // return;
          // }

          // navigate('/');
          // alert('Usuário não permitido no sistema.');
          // return;
        }
      }}
      autoLoad={false}
      onFailure={(error) => console.log(error)}
      cookiePolicy="single_host_origin"
      className="google-button"
    />
  );
}

export default GoogleButton;
