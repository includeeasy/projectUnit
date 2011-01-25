package net.flowas.projectunit.gwt.client;

import com.google.gwt.cell.client.TextCell;
import com.google.gwt.core.client.GWT;
import com.google.gwt.http.client.Request;
import com.google.gwt.http.client.RequestBuilder;
import com.google.gwt.http.client.RequestCallback;
import com.google.gwt.http.client.RequestException;
import com.google.gwt.http.client.Response;
import com.google.gwt.http.client.URL;
import com.google.gwt.user.client.Window;
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
							String[] menus = text.split(",");
							for (String value : menus) {
								if (value.contains(":")) {
									String[] pairs = value.split(":");
									for (String pairText : pairs) {
										System.out.println(pairText);
										if (pairText.contains("=")) {
											String[] pair = pairText.split("=");
											if (pair[0].equals("id")) {
												dataProvider.getList().add(
														pair[1]);
											} else if (pair[0].equals("name")) {
												// dataProvider.getList().add(pair[1]);
											} else {
												//
											}
										}
									}
								}
								// dataProvider.getList().add(value);
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
		String url = TREE_URL + value.toString();
		url = URL.encode(url);
		// Send request to server and catch any errors.
		final StringBuffer sb=new StringBuffer();
		RequestBuilder builder = new RequestBuilder(RequestBuilder.GET, url);

		try {
			Request request = builder.sendRequest(null, new RequestCallback() {

				@Override
				public void onError(Request arg0, Throwable arg1) {
					// TODO Auto-generated method stub

				}

				@Override
				public void onResponseReceived(Request arg0, Response arg1) {
					if(arg1.getText()==null || arg1.getText().equals("")){
						sb.append("true");
					}

				}
			});
		} catch (RequestException e) {
			e.printStackTrace();
		}
		if(sb.toString().contains("true")){
			return true;
		}else{
			return false;
		}
		//return value.toString().contains("isleaf=true");
	}
}