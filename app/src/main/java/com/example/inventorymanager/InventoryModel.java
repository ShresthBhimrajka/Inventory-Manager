package com.example.inventorymanager;

/*
    This function stores the details of each item in an object.
 */

public class InventoryModel {
    String id, name, quantity;

    public InventoryModel(String id, String name, String quantity){
        this.id = id;
        this.name = name;
        this.quantity = quantity;
    }

    public String getID(){
        return this.id;
    }

    public String getName(){
        return this.name;
    }

    public String getQuantity(){
        return this.quantity;
    }
}
