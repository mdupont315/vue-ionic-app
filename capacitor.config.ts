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
      scopes: ['profile', 'email'],
      serverClientId: '492252738509-qh1pmnn3rjjhsfjh0bv5uk36jbgq8hdk.apps.googleusercontent.com',
      forceCodeForRefreshToken: true,
    }
  }
};

export default config;
