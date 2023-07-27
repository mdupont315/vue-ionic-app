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
      serverClientId: '710490860507-68q3akbkpcd5h5pngbr1c50b7prfamci.apps.googleusercontent.com',
      forceCodeForRefreshToken: true,
    }
  }
};

export default config;
