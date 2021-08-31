package com.example.inventorymanager;

/*
    This function creates the database using SQLite to store the inventory.
    The database is called InventoryDB and contains 1 table called Inventory.
    The table has 3 columns itemID, name, quantity storing strings.
    The primary key of the table is itemID.
 */

import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;
import android.content.Context;
import android.content.ContentValues;
import android.database.Cursor;

public class MyInvDBHandler extends SQLiteOpenHelper {

    public MyInvDBHandler(Context context) {
        /*
            Default Constructor to create the database
         */
        super(context, "InventoryDB", null, 1);
    }

    @Override
    public void onCreate(SQLiteDatabase InvDB) {
        /*
            This function creates the database and populates it with the ids of the column initially.
         */
        String query = "create Table Inventory(itemID TEXT primary key, name TEXT, quantity TEXT)";
        InvDB.execSQL(query);
    }

    @Override
    public void onUpgrade(SQLiteDatabase InvDB, int i, int i1) {
        /*
            This function changes the table on app upgrade.
         */
        String query = "drop Table if exists Inventory";
        InvDB.execSQL(query);
    }

    public boolean insertData(String itemId, String name, String quantity){
        /*
            This function inserts a new row in the database.
         */
        SQLiteDatabase InvDB = this.getWritableDatabase();
        ContentValues contentValues = new ContentValues();
        contentValues.put("itemID", itemId);
        contentValues.put("name", name);
        contentValues.put("quantity", quantity);
        long result = InvDB.insert("Inventory", null, contentValues);
        return (result != -1);
    }

    public boolean updateData(String itemId, String quantity){
        /*
            This function updates the quantity for a given item.
         */
        SQLiteDatabase InvDB = this.getWritableDatabase();
        ContentValues contentValues = new ContentValues();
        contentValues.put("quantity", quantity);
        long result = InvDB.update("Inventory", contentValues, "itemID=?", new String[]{itemId});
        return (result != -1);
    }

    public boolean deleteData(String itemId){
        /*
            This function deletes a row when item has been exhausted.
         */
        SQLiteDatabase InvDB = this.getWritableDatabase();
        String query = "Select * from Inventory where itemID = " + itemId;
        Cursor cursor = InvDB.rawQuery(query, null);
        if(cursor.getCount() > 0) {
            cursor.close();
            long result = InvDB.delete("Inventory","itemID=?", new String[] {itemId});
            return(result != -1);
        }
        else{
            cursor.close();
            return false;
        }
    }

    public int getRow(String itemId){
        /*
            This function checks whether a particular item is present or not
         */
        SQLiteDatabase InvDB = this.getReadableDatabase();
        String query = "Select * from Inventory where itemID = "+itemId;
        Cursor cursor = InvDB.rawQuery(query, null);
        if(cursor.getCount() > 0){
            cursor.moveToFirst();
            return (Integer.parseInt(cursor.getString(2)));
        }
        else
            return -1;
    }

    public Cursor getData(){
        /*
            This function retrieves the entire table to display
         */
        SQLiteDatabase InvDB = this.getWritableDatabase();
        String query = "Select * from Inventory";
        Cursor cursor = InvDB.rawQuery(query, null);
        return cursor;
    }
}