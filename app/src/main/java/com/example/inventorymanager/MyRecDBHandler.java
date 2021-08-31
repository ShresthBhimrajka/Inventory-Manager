package com.example.inventorymanager;

/*
    This function creates the database using SQLite to store the records.
    The database is called RecordDB and contains 1 table called Records.
    The table has 6 columns itemID, name, date, quantity and in/ex storing and current date and time strings.
    The primary key of the table is currentdateandtime.
 */

import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;
import android.content.Context;
import android.content.ContentValues;
import android.database.Cursor;

public class MyRecDBHandler extends SQLiteOpenHelper {

    public MyRecDBHandler(Context context) {
        /*
            Default Constructor to create the database
         */
        super(context, "RecordsDB", null, 1);
    }

    @Override
    public void onCreate(SQLiteDatabase RecDB) {
        /*
            This function creates the database and populates it with the ids of the column initially.
         */
        String query = "create Table Records(curdate TEXT primary key, itemID TEXT, name TEXT, date TEXT, quantity TEXT, inex TEXT)";
        RecDB.execSQL(query);
    }

    @Override
    public void onUpgrade(SQLiteDatabase RecDB, int i, int i1) {
        /*
            This function changes the table on app upgrade.
         */
        String query = "drop Table if exists Records";
        RecDB.execSQL(query);
    }

    public boolean insertData(String itemId, String name, String date, String quantity, String inex, String cur){
        /*
            This function inserts a new row in the table
         */
        SQLiteDatabase RecDB = this.getWritableDatabase();
        ContentValues contentValues = new ContentValues();
        contentValues.put("curdate", cur);
        contentValues.put("itemID", itemId);
        contentValues.put("name", name);
        contentValues.put("date", date);
        contentValues.put("quantity", quantity);
        contentValues.put("inex", inex);
        long result = RecDB.insert("Records", null, contentValues);
        return (result != -1);
    }

    public Cursor getData(){
        /*
            This function retrieves the entire table to display
         */
        SQLiteDatabase RecDB = this.getWritableDatabase();
        String query = "Select * from Records";
        Cursor cursor = RecDB.rawQuery(query, null);
        return cursor;
    }
}
