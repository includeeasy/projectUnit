package net.flowas.projectunit.gwt.client;

import com.google.gwt.core.client.EntryPoint;
import com.google.gwt.user.client.ui.RootPanel;

/**
 * Entry point classes define <code>onModuleLoad()</code>.
 */
public class EditTable implements EntryPoint {	
	public void onModuleLoad() {		
		RootPanel.get("left").add(TableFactory.createTree());
		RootPanel.get("right").add(TableFactory.createCellTable());
	}
}
