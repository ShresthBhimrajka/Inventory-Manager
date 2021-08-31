package com.example.inventorymanager;

/*
    This class is called to set the layout of each row and display the transaction details in respective columns.
 */

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import java.util.List;

public class RecordsAdapter extends RecyclerView.Adapter<RecordsAdapter.ViewHolder> {
    List <RecordsModel> RecordsList;

    public RecordsAdapter(List<RecordsModel> RecordsList){
        /*
            Default constructor
         */
        this.RecordsList = RecordsList;
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        /*
            This function implements the RecyclerView's layouts on the records page .
         */
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_layout_rec,parent,false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull RecordsAdapter.ViewHolder holder, int position) {
        /*
            This function sets details of each record object stored in the RecordsList as text in columns of TextView
         */
        if(RecordsList != null && RecordsList.size() > 0){
            RecordsModel model = RecordsList.get(position);
            holder.c1.setText(model.getID());
            holder.c2.setText(model.getName());
            holder.c3.setText(model.getDate());
            holder.c4.setText(model.getQuantity());
            holder.c5.setText(model.getInex());
        }
        else
            return;
    }

    @Override
    public int getItemCount() {
        /*
            This function returns the size of RecordsList.
         */
        return RecordsList.size();
    }

    public class ViewHolder extends RecyclerView.ViewHolder {
        TextView c1, c2, c3, c4, c5;
        public ViewHolder(@NonNull View itemView) {
            /*
                This function gets the column ids of each transaction's item_layout
             */
            super(itemView);
            c1 = (TextView) itemView.findViewById(R.id.col1);
            c2 = (TextView) itemView.findViewById(R.id.col2);
            c3 = (TextView) itemView.findViewById(R.id.col3);
            c4 = (TextView) itemView.findViewById(R.id.col4);
            c5 = (TextView) itemView.findViewById(R.id.col5);
        }
    }
}
