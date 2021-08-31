package com.example.inventorymanager;

/*
    This class is called to scan the QR code
 */

import androidx.appcompat.app.AppCompatActivity;

import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.text.Editable;
import android.text.TextWatcher;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.os.Bundle;
import android.widget.Toast;

import java.util.Date;
import java.util.StringTokenizer;

public class scan_qr extends AppCompatActivity{
    public static TextView scantxt;
    private TextView Scan;
    private Button scanbtn;
    private MyInvDBHandler InvDB;
    private MyRecDBHandler RecDB;
    Context c;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        /*
            This function sets the layout of the scan_qr activity.
            It creates the object of the scan button checks for its button press.
         */
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_scan_qr);
        Scan = (TextView) findViewById(R.id.headScanQR);
        scantxt = (TextView) findViewById(R.id.contents);
        scanbtn = (Button) findViewById(R.id.button);
        Scan.setBackgroundColor(Color.GRAY);
        c = getApplicationContext();
        scanbtn.setOnClickListener(new View.OnClickListener() {

            @Override
            public void onClick(View view) {
                /*
                    This function starts the scanning activity to scan the qr code.
                 */
                Intent intent = new Intent(getApplicationContext(), scannerView.class);
                startActivity(intent);
            }
        });

        scantxt.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence charSequence, int i, int i1, int i2) {

            }

            @Override
            public void onTextChanged(CharSequence charSequence, int i, int i1, int i2) {
                /*
                    This function takes the data after scanning the qr and updates the databases while also showing appropriate message to the user
                 */
                String qr = scantxt.getText().toString();
                StringTokenizer st = new StringTokenizer(qr," \t\n");
                String id = st.nextToken().trim();
                String name = st.nextToken().trim();
                String quantity = st.nextToken().trim();
                String date = st.nextToken().trim();
                String inex = st.nextToken().trim();
                String in = "IN";
                String currentDateTimeString = java.text.DateFormat.getDateTimeInstance().format(new Date());
                RecDB = new MyRecDBHandler(c);
                boolean check = RecDB.insertData(id, name, date, quantity, inex, currentDateTimeString);
                Toast.makeText(scan_qr.this, "Records Updated", Toast.LENGTH_SHORT).show();
                InvDB = new MyInvDBHandler(c);
                int quantityPresent = InvDB.getRow(id);
                if(quantityPresent == -1){
                    boolean checkInsert = InvDB.insertData(id, name, quantity);
                    Toast.makeText(scan_qr.this, "Item added", Toast.LENGTH_SHORT).show();
                }
                else{
                    int q = Integer.parseInt(quantity);
                    if(inex.equalsIgnoreCase(in)){
                        quantityPresent += q;
                    }
                    else{
                        quantityPresent -= q;
                    }
                    if(quantityPresent > 0){
                        boolean checkUpdate = InvDB.updateData(id, String.valueOf(quantityPresent));
                        Toast.makeText(scan_qr.this, "Item Updated", Toast.LENGTH_SHORT).show();
                    }
                    else{
                        boolean checkDelete = InvDB.deleteData(id);
                        Toast.makeText(scan_qr.this, "Item Deleted", Toast.LENGTH_SHORT).show();
                    }
                }
            }

            @Override
            public void afterTextChanged(Editable editable) {

            }
        });
    }
}