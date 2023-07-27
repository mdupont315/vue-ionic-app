package io.ionic.starter;

import android.os.Bundle;
import com.getcapacitor.BridgeActivity;
import com.getcapacitor.Plugin;
import com.codetrixstudio.capacitor.GoogleAuth.GoogleAuth;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        this.registerPlugin(GoogleAuth.class);
    }
}
