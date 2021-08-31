package com.example.inventorymanager;

/*
    This class is used to scan the qr and set its details as text in the main screen
    The scanner is implemented with the help of zxing library.
    The permissions required of the camera is obtained with the help of karumi dexter library.
 */

import androidx.appcompat.app.AppCompatActivity;
import android.Manifest;
import android.content.Context;
import android.os.Bundle;

import com.google.zxing.Result;
import com.karumi.dexter.Dexter;
import com.karumi.dexter.PermissionToken;
import com.karumi.dexter.listener.PermissionDeniedResponse;
import com.karumi.dexter.listener.PermissionGrantedResponse;
import com.karumi.dexter.listener.PermissionRequest;
import com.karumi.dexter.listener.single.PermissionListener;
import me.dm7.barcodescanner.zxing.ZXingScannerView;

public class scannerView extends AppCompatActivity implements ZXingScannerView.ResultHandler {
    ZXingScannerView scannerView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        /*
            This function sets the layout of the camera scanner and asks user for camera permissions.
         */
        super.onCreate(savedInstanceState);
        scannerView = new ZXingScannerView(this);
        setContentView(scannerView);
        Context context = getApplicationContext();
        Dexter.withContext(context)
                .withPermission(Manifest.permission.CAMERA)
                .withListener(new PermissionListener() {
                    @Override
                    public void onPermissionGranted(PermissionGrantedResponse permissionGrantedResponse) {
                        /*
                            If the permission is granted camera is started
                         */
                        scannerView.startCamera();
                    }

                    @Override
                    public void onPermissionDenied(PermissionDeniedResponse permissionDeniedResponse) {

                    }

                    @Override
                    public void onPermissionRationaleShouldBeShown(PermissionRequest permissionRequest, PermissionToken permissionToken) {
                        /*
                            This function asks the user for camera permission if permission is not already granted
                         */
                        permissionToken.continuePermissionRequest();
                    }
                }).check();
    }

    @Override
    public void handleResult(Result rawResult) {
        /*
            This function get ths result of the qr and sets it as text in main screen and returns to the main screen
         */
        String qr = rawResult.getText();
        scan_qr.scantxt.setText(qr);
        onBackPressed();
    }

    protected void onPause(){
        /*
            This function stops the camera if user exits
         */
        super.onPause();
        scannerView.stopCamera();
    }

    protected void onResume(){
        /*
            This function starts the camera if user grants permission
         */
        super.onResume();
        scannerView.setResultHandler(this);
        scannerView.startCamera();
    }
}