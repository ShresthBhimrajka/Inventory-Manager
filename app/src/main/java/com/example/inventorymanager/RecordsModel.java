package com.example.inventorymanager;

/*
    This function stores the details of each transaction in an object.
 */

public class RecordsModel {
    String id, name, date, quantity, inex;

    public RecordsModel(String id, String name, String date, String quantity, String inex){
        this.id = id;
        this.name = name;
        this.date = date;
        this.quantity = quantity;
        this.inex = inex;
    }

    public String getID(){
        return this.id;
    }

    public String getName(){
        return this.name;
    }

    public String getDate(){
        return this.date;
    }

    public String getQuantity(){
        return this.quantity;
    }

    public String getInex(){
        return this.inex;
    }
}
