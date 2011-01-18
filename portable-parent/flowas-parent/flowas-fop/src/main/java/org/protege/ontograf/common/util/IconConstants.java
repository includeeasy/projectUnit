/**
 * Copyright 1998-2006, CHISEL Group, University of Victoria, Victoria, BC, Canada.
 * All rights reserved.
 */
package org.protege.ontograf.common.util;

import java.net.URL;

import javax.swing.Icon;
import javax.swing.ImageIcon;

import org.protege.ontograf.common.GraphController;


/**
 * Interface for storing icons used by this tool.
 * 
 * @author Sean Falconer
 * @date 10-Jan-07
 */
public abstract class IconConstants {
	public static final Icon ICON_PLUS = loadImageIcon(GraphController.class, "/icon/icon_plus.gif");
	
	public static final Icon ICON_EXPORT_IMAGE = loadImageIcon(GraphController.class, "/icon/icon_export.gif");
	public static final Icon ICON_EDIT_NODE_TOOLTIP = loadImageIcon(GraphController.class, "/icon/image_edit.png");
	public static final Icon ICON_SAVE_GRAPH = loadImageIcon(GraphController.class, "/icon/save.gif");
	public static final Icon ICON_OPEN_GRAPH = loadImageIcon(GraphController.class, "/icon/open.gif");
	public static final Icon ICON_PIN_TOOLTIPS = loadImageIcon(GraphController.class, "/icon/pinned.gif");
	
	@SuppressWarnings("unchecked")
	public static ImageIcon loadImageIcon(Class clas, String iconPath) {
        ImageIcon icon = null;
        URL url = clas.getResource(iconPath);
        if (url != null) {
            icon = new ImageIcon(url);
        }
        else {
        	icon = new ImageIcon(iconPath);
        }
        return icon;
    }
}
