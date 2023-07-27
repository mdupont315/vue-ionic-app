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
    }
  }
};

export default config;
