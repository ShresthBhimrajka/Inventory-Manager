package com.example.inventorymanager;

/*
    This class is called to set the layout of each row and display the item details in respective columns.
 */

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import java.util.List;

public class InventoryAdapter extends RecyclerView.Adapter<InventoryAdapter.ViewHolder> {
    List <InventoryModel> InventoryList;

    public InventoryAdapter(List<InventoryModel> InventoryList){
        /*
            Default constructor
         */
        this.InventoryList = InventoryList;
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        /*
            This function implements the RecyclerView's layouts on the inventory page .
         */
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_layout,parent,false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull InventoryAdapter.ViewHolder holder, int position) {
        /*
            This function sets details of each item object stored in the InventoryList as text in columns of TextView
         */
        if(InventoryList != null && InventoryList.size() > 0){
            InventoryModel model = InventoryList.get(position);
            holder.c1.setText(model.getID());
            holder.c2.setText(model.getName());
            holder.c3.setText(model.getQuantity());
        }
        else
            return;
    }

    @Override
    public int getItemCount() {
        /*
            This function returns the size of InventoryList.
         */
        return InventoryList.size();
    }

    public class ViewHolder extends RecyclerView.ViewHolder {
        TextView c1, c2, c3;
        public ViewHolder(@NonNull View itemView) {
            /*
                This function gets the column ids of each item's item_layout
             */
            super(itemView);
            c1 = (TextView) itemView.findViewById(R.id.col1);
            c2 = (TextView) itemView.findViewById(R.id.col2);
            c3 = (TextView) itemView.findViewById(R.id.col3);
        }
    }
}
