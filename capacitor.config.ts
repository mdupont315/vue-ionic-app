import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.uniranks.app',
  appName: 'UNIRANKS',
  webDir: 'dist',
  bundledWebRuntime: false,
  plugins: {
    SplashScreen: {
      launchAutoHide: false,
      showSpinner: true,
      spinnerColor:"#039be5",
      androidSpinnerStyle:"large",
    },
    GoogleAuth: {
      androidClientId: '52312955002-dso5qosdq5r9q1rkt2nao4cg4b67v1po.apps.googleusercontent.com',
      clientId: '52312955002-nn81gk4mhi9hq548e3t0ufliej4h5gt7.apps.googleusercontent.com',
      scopes: ['profile', 'email'],
      serverClientId: '52312955002-nn81gk4mhi9hq548e3t0ufliej4h5gt7.apps.googleusercontent.com',
      forceCodeForRefreshToken: true,
    }
  }
};

export default config;
