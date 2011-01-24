package net.flowas.projectunit.gwt.client;

import java.util.Iterator;

import com.google.gwt.cell.client.TextCell;
import com.google.gwt.core.client.GWT;
import com.google.gwt.http.client.Request;
import com.google.gwt.http.client.RequestBuilder;
import com.google.gwt.http.client.RequestCallback;
import com.google.gwt.http.client.RequestException;
import com.google.gwt.http.client.Response;
import com.google.gwt.http.client.URL;
import com.google.gwt.view.client.ListDataProvider;
import com.google.gwt.view.client.TreeViewModel;

//The model that defines the nodes in the tree.
public class CustomTreeModel implements TreeViewModel {
	private static final String TREE_URL = GWT.getModuleBaseURL() + "tree?q=";

	// Get the NodeInfo that provides the children of the specified value.
	public <T> NodeInfo<?> getNodeInfo(final T value) {

		// Create some data in a data provider. Use the parent value as a
		// prefix for the next level.
		final ListDataProvider<String> dataProvider = new ListDataProvider<String>();

		String url = TREE_URL + value.toString();
		url = URL.encode(url);
		// Send request to server and catch any errors.
		RequestBuilder builder = new RequestBuilder(RequestBuilder.GET, url);
		try {
			Request request = builder.sendRequest(null, new RequestCallback() {
				public void onError(Request request, Throwable exception) {
					// displayError("Couldn't retrieve JSON");
					dataProvider.getList().add("Couldn't retrieve JSON");
				}

				public void onResponseReceived(Request request,
						Response response) {
					if (200 == response.getStatusCode()) {
						String text = response.getText();
						if (text.contains(",")) {
							String[] pair = text.split(",");
							for (String value : pair) {
								dataProvider.getList().add(value);
							}
						} else {
							dataProvider.getList().add(text);
						}
					} else {
						dataProvider.getList().add(
								"Couldn't retrieve JSON ("
										+ response.getStatusText() + ")");
					}
				}
			});
		} catch (RequestException e) {
			// displayError("Couldn't retrieve JSON");
			dataProvider.getList().add(
					"Couldn't retrieve JSON" + e.getMessage());
		}
		// Return a node info that pairs the data with a cell.
		return new DefaultNodeInfo<String>(dataProvider, new TextCell());
	}

	// Check if the specified value represents a leaf node. Leaf nodes
	// cannot be opened.
	public boolean isLeaf(Object value) {
		// The maximum length of a value is ten characters.
		return value.toString().length() > 15;
	}
}