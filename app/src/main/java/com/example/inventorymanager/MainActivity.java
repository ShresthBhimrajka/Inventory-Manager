package com.example.inventorymanager;

/*
    This is the main class which implements the homepage.
    It gets the button objects of each button and starts the appropriate activities on button press.
 */

import androidx.appcompat.app.AppCompatActivity;
import android.widget.Button;
import android.view.View;
import android.content.Intent;
import android.os.Bundle;

public class MainActivity extends AppCompatActivity implements View.OnClickListener {
    private Button inv, rec, qr;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        /*
            This function sets the layout of the home page.
            It also sets the onCLickListeners of each button.
         */
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        inv = (Button)findViewById(R.id.buttonInv);
        rec = (Button)findViewById(R.id.buttonRec);
        qr = (Button)findViewById(R.id.buttonQR);
        inv.setOnClickListener(this);
        rec.setOnClickListener(this);
        qr.setOnClickListener(this);
    }

    @Override
    public void onClick(View v){
        /*
            This function checks which button was pressed and starts the corresponding activity.
         */
        switch(v.getId()){
            case R.id.buttonInv:
                Intent intent;
                intent = new Intent(this, inv_check.class);
                startActivity(intent);
                break;
            case R.id.buttonRec:
                intent = new Intent( this, rec_check.class);
                startActivity(intent);
                break;
            case R.id.buttonQR:
                intent = new Intent(this, scan_qr.class);
                startActivity(intent);
                break;
        }
    }
}