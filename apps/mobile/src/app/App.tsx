import React from 'react';
import { Routes } from './routes';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { NX_REACT_GOOGLE_WEBCLIENT_ID } from '@env';

const queryClient = new QueryClient()

export const App = () => {
  GoogleSignin.configure({
    webClientId: NX_REACT_GOOGLE_WEBCLIENT_ID,
    offlineAccess: true
  });
  return (
    <QueryClientProvider client={queryClient}>
      <Routes />
    </QueryClientProvider>
  );
};

export default App;
