import {BarcodeScanner, SupportedFormat} from "@capacitor-community/barcode-scanner";
import {Haptics} from '@capacitor/haptics';
import {useRouter} from "vue-router";
import {useToast} from "@/shared/toast";
import {useAlert} from "@/shared/alert";
import {Camera} from "@capacitor/camera";

export function useScanQR() {
    const router = useRouter();
    const {showToast} = useToast();
    const {presentAlert} = useAlert();

    const scan = async () => {
        await Camera.requestPermissions().then(async ({camera}) => {
            if (camera == 'denied') {
                presentAlert('Permission Denied!', 'Camera Permission Required!',
                    'If you want to grant permission for using your camera, enable it in the app settings.',
                    () => BarcodeScanner.openAppSettings(),
                    'Yes Open Settings'
                );
                return;
            }

            if (camera == 'granted') {
              const status = await BarcodeScanner.checkPermission({force: true});
              if (status.denied){
                  showToast({message:'Camera Permissions Denied',color:"danger",position:"bottom"})
                  return;
              }
              startScan();
              return;
            }
        })
    }

    const startScan = async () => {
        BarcodeScanner.prepare();
        // make background of WebView transparent
        // note: if you are using ionic this might not be enough, check below
        BarcodeScanner.hideBackground();

        document.body.classList.add("qrscanner"); // add the qrscanner class to body
        const result = await BarcodeScanner.startScan({targetedFormats: [SupportedFormat.QR_CODE]}); // start scanning and wait for a result
        document.body.classList.remove("qrscanner"); // remove the qrscanner from the body
        // if the result has content
        if (result.hasContent) {
            Haptics.vibrate();
            showToast({message: "Loading Lead Details", color: 'secondary', position: 'bottom'})
            router.replace(`/university/save-lead/${result.content}`)
        }
    }
    const stopScan = () => {
        document.body.classList.remove("qrscanner"); // remove the qrscanner from the body
        BarcodeScanner.showBackground();
        BarcodeScanner.stopScan();
    }
    return {stopScan, scan}
}