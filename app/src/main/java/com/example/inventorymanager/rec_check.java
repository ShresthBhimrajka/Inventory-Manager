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

public class rec_check extends AppCompatActivity {
    private TextView Records, id, date, inex, name, quantity;
    RecyclerView recycler_view_rec;
    RecordsAdapter rec_adapter;
    MyRecDBHandler RecDB;
    Context c;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        /*
            This function creates the layout of this activity and gets the RecyclerView from it.
            The object of RecyclerView is used to reuse the item_layout to create the rows in Table.
         */
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_rec_check);
        Records = (TextView) findViewById(R.id.headCheckRec);
        id = (TextView) findViewById(R.id.ID);
        date = (TextView) findViewById(R.id.Date);
        inex = (TextView) findViewById(R.id.Inex);
        name = (TextView) findViewById(R.id.Name);
        quantity = (TextView) findViewById(R.id.Quantity);
        id.setBackgroundColor(Color.DKGRAY);
        date.setBackgroundColor(Color.DKGRAY);
        inex.setBackgroundColor(Color.DKGRAY);
        quantity.setBackgroundColor(Color.DKGRAY);
        name.setBackgroundColor(Color.DKGRAY);
        Records.setBackgroundColor(Color.GRAY);
        recycler_view_rec = (RecyclerView) findViewById(R.id.recycler_view_rec);
        c = getApplicationContext();
        setRecyclerView();
    }

    private void setRecyclerView(){
        /*
            This function sets the attributes of RecyclerView
            The object of RecordsAdapter is initialized with the records_list
            RecyclerView creates the table layout using this object.
         */
        recycler_view_rec.setHasFixedSize(true);
        recycler_view_rec.setLayoutManager(new LinearLayoutManager(this));
        rec_adapter = new RecordsAdapter(getRecList());
        recycler_view_rec.setAdapter(rec_adapter);
    }

    private List<RecordsModel> getRecList(){
        /*
            This function reads the rec.txt stored in raw to get the records details.
            It stores the details of each item as an RecordsModel obj.
            The objects are stored in records_list and returns it.
            It first creates the database object and checks whether there are any entries in it by reading all the rows.
            Cursor object stores the reference to the first row which is then iterated to read the inventory.
         */
        List<RecordsModel> records_list = new ArrayList<>();
        RecDB = new MyRecDBHandler(c);
        Cursor cursor = RecDB.getData();
        if(cursor.getCount() == 0){
            Toast.makeText(rec_check.this, "No Records Found", Toast.LENGTH_SHORT).show();
        }
        else{
            while(cursor.moveToNext()){
                String id = cursor.getString(1);
                String name = cursor.getString(2);
                String date = cursor.getString(3);
                String qauntity = cursor.getString(4);
                String inex = cursor.getString(5);
                records_list.add(new RecordsModel(id, name, date, qauntity, inex));
            }
        }
        return records_list;
    }
}