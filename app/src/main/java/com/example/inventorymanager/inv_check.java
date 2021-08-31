package com.example.inventorymanager;

/*
This class is called on Check Inventory Button press to display the table of inventory items
*/

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.content.Context;
import android.database.Cursor;
import android.graphics.Color;
import android.widget.TextView;
import android.os.Bundle;
import android.widget.Toast;

import java.util.ArrayList;
import java.util.List;

public class inv_check extends AppCompatActivity {
    private TextView Inventory, id, name, quantity;
    RecyclerView recycler_view_inv;
    InventoryAdapter inv_adapter;
    MyInvDBHandler InvDB;
    Context c;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        /*
            This function creates the layout of this activity and gets the RecyclerView from it.
            The object of RecyclerView is used to reuse the item_layout to create the rows in Table.
         */
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_inv_check);
        Inventory = (TextView) findViewById(R.id.headCheckInv);
        id = (TextView) findViewById(R.id.ID);
        name = (TextView) findViewById(R.id.Name);
        quantity = (TextView) findViewById(R.id.Quantity);
        id.setBackgroundColor(Color.DKGRAY);
        name.setBackgroundColor(Color.DKGRAY);
        quantity.setBackgroundColor(Color.DKGRAY);
        Inventory.setBackgroundColor(Color.GRAY);
        recycler_view_inv = (RecyclerView) findViewById(R.id.recycler_view_inv);
        c = getApplicationContext();
        setRecyclerView();
    }

    private void setRecyclerView(){
        /*
            This function sets the attributes of RecyclerView
            The object of InventoryAdapter is initialized with the inventory_list
            RecyclerView creates the table layout using this object.
         */
        recycler_view_inv.setHasFixedSize(true);
        recycler_view_inv.setLayoutManager(new LinearLayoutManager(this));
        inv_adapter = new InventoryAdapter(getInvList());
        recycler_view_inv.setAdapter(inv_adapter);
    }

    private List<InventoryModel> getInvList() {
        /*
            This function reads the inv.txt stored in raw to get the inventory details.
            It stores the details of each item as an InventoryModel obj.
            The objects are stored in inventory_list and returns it.
            It first creates the database object and checks whether there are any entries in it by reading all the rows.
            Cursor object stores the reference to the first row which is then iterated to read the inventory.
         */
        List<InventoryModel> inventory_list = new ArrayList<>();
        InvDB = new MyInvDBHandler(c);
        Cursor cursor = InvDB.getData();
        if(cursor.getCount() == 0){
            Toast.makeText(inv_check.this, "Inventory Empty", Toast.LENGTH_SHORT).show();
        }
        else{
            while(cursor.moveToNext()){
                String id = cursor.getString(0);
                String name = cursor.getString(1);
                String quantity = cursor.getString(2);
                inventory_list.add(new InventoryModel(id, name, quantity));
            }
        }
        return inventory_list;
    }
}