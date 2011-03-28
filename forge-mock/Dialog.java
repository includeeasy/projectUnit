package net.flowas.dialog.client;

import java.util.HashMap;

import com.google.gwt.core.client.EntryPoint;
import com.google.gwt.dom.client.NativeEvent;
import com.google.gwt.event.dom.client.ClickEvent;
import com.google.gwt.event.dom.client.ClickHandler;
import com.google.gwt.user.client.Element;
import com.google.gwt.user.client.Event.NativePreviewEvent;
import com.google.gwt.user.client.Event.NativePreviewHandler;
import com.google.gwt.user.client.ui.Button;
import com.google.gwt.user.client.ui.DialogBox;
import com.google.gwt.user.client.ui.HTML;
import com.google.gwt.user.client.ui.VerticalPanel;

/**
 * Entry point classes define <code>onModuleLoad()</code>.
 */
public class Dialog implements EntryPoint {

	/**
	 * This is the entry point method.
	 */
	public void onModuleLoad() {		
		 handleAnnotateLink();
	}

	private void handleAnnotateLink() {
		final DialogBox dialogBox = new DialogBox();// new Chat();		
		dialogBox.setAnimationEnabled(true);
		dialogBox.setGlassEnabled(true);
		NativePreviewHandler uuhandler = new NativePreviewHandler() {
			@Override
			public void onPreviewNativeEvent(NativePreviewEvent preview) {
				NativeEvent eee = preview.getNativeEvent();
				Element elt = eee.getEventTarget().cast();
				if (eee.getType().equalsIgnoreCase("click")
						&& "a".equalsIgnoreCase(elt.getTagName())
						&& elt.getAttribute("rel").equals("annotate")) {
					String href = elt.getAttribute("href");
					if(href != null && href.trim() != ""){
						href=href.replace("#", "");
					    setValue(dialogBox, href);					    
					}else{
						dialogBox.setText("error!");
					}
					dialogBox.center();
				}				
			}
		};
		com.google.gwt.user.client.Event.addNativePreviewHandler(uuhandler);
	}

	private void setValue(final DialogBox dialogBox, String value) {
		HashMap<String, String> map = parse(value);
		String iframe;
		String title = "Load page dialog";
		String closeName = "Close";

		if (map.get("src") != null) {
			String height = "100";
			String width = "300";
			if (map.get("height") != null) {
				height = map.get("height");
			}
			if (map.get("width") != null) {
				width = map.get("width");
			}
			if (map.get("title") != null) {
				title = map.get("title");
			}
			if (map.get("closeName") != null) {
				closeName = map.get("closeName");
			}
			iframe = "<iframe src=\"" + map.get("src")
					+ "\"  style=\"border:none\"  height=\"" + height
					+ "\" width=\"" + width + "\"></iframe>";
		} else {
			iframe = "Please crrectly set required value,for example:&lt;a rel=\"annotate\" href=\"#src=a.html;title=title;closeName=Close\"&gt;link text</a> ";
		}

		// Create the popup dialog box
		// final DialogBox dialogBox = new DialogBox();
		dialogBox.setText(title);
		dialogBox.setAnimationEnabled(true);
		final Button closeButton = new Button(closeName);
		// We can set the id of a widget by accessing its Element
		closeButton.getElement().setId("closeButton");
		VerticalPanel dialogVPanel = new VerticalPanel();
		dialogVPanel.addStyleName("dialogVPanel");
		dialogVPanel.add(new HTML(iframe));
		dialogVPanel.setHorizontalAlignment(VerticalPanel.ALIGN_RIGHT);
		dialogVPanel.add(closeButton);
		dialogBox.setWidget(dialogVPanel);
		// Add a handler to close the DialogBox
		closeButton.addClickHandler(new ClickHandler() {
			public void onClick(ClickEvent event) {
				dialogBox.hide();
			}
		});

	}

	private HashMap<String, String> parse(String text) {
		HashMap<String, String> m = new HashMap<String, String>();
		if (null != text && text.contains(";")) {
			String[] pairs = text.split(";");
			for (String nameValue : pairs) {
				if (nameValue.contains("=")) {
					String[] var = nameValue.split("=");
					m.put(var[0], var[1]);
				}
			}
		}
		return m;
	}
}
