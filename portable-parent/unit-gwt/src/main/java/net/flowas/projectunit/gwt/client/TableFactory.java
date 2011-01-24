package net.flowas.projectunit.gwt.client;

import java.util.ArrayList;
import java.util.List;

import com.google.gwt.cell.client.EditTextCell;
import com.google.gwt.cell.client.FieldUpdater;
import com.google.gwt.user.cellview.client.CellTable;
import com.google.gwt.user.cellview.client.CellTree;
import com.google.gwt.user.cellview.client.Column;
import com.google.gwt.user.cellview.client.TextColumn;
import com.google.gwt.user.client.ui.Widget;
import com.google.gwt.view.client.TreeViewModel;

public class TableFactory {	
	public static Widget createCellTable() {
		// Create a CellTable.
		CellTable<String[]> table = new CellTable<String[]>();

		// Create name column.
		// @Override
		TextColumn<String[]> nameColumn = new TextColumn<String[]>() {
			public String getValue(String[] contact) {
				return contact[0];
			}
		};
		nameColumn.setFieldUpdater( new FieldUpdater<String[], String>(){
			@Override
			public void update(int index, String[] object, String value) {
				object[0]=value;				
			}});		
		// Create address column.
		// @Override
		Column<String[],String> addressColumn = new Column<String[],String>(new EditTextCell()) {
			public String getValue(String[] contact) {
				return contact[1];
			}
		};

		// Add the columns.
		table.addColumn(nameColumn, "Name");
		table.addColumn(addressColumn, "Address");

		// Set the total row count. This isn't strictly necessary, but it
		// affects
		// paging calculations, so its good habit to keep the row count up to
		// date.
		List<String[]> data = getData();
		table.setRowCount(data.size(), true);

		// Push the data into the widget.
		table.setRowData(0, data);		
		return table;
	}

	private static List<String[]> getData() {
		List<String[]> data = new ArrayList<String[]>();
		data.add(new String[] { "a", "b" });
		data.add(new String[] { "c", "d" });
		return data;

	}

	public static Widget createTree() {
		// Create a model for the tree.
		TreeViewModel model = new CustomTreeModel();

		// Create the tree using the model. We specify the default value of the
		// hidden root node as "Item 1".
		CellTree tree = new CellTree(model, "Item 1");
		return tree;
	}	
}
