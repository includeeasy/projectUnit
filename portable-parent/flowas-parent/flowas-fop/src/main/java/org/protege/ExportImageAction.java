package org.protege;

import java.awt.BorderLayout;
import java.awt.Component;
import java.awt.Dimension;
import java.awt.Graphics;
import java.awt.Point;
import java.awt.Rectangle;
import java.awt.image.BufferedImage;
import java.io.File;

import javax.imageio.ImageIO;
import javax.swing.Action;
import javax.swing.JComponent;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.JViewport;

import org.protege.ontograf.common.util.IconConstants;

import edu.umd.cs.piccolo.PCanvas;

public class ExportImageAction {
	private Component parent;
	private PCanvas canvas;
	public ExportImageAction(Component parent, PCanvas canvas) {		
		this.parent = parent;
		this.canvas = canvas;
	}
	public BufferedImage exportGraphAsImage() {
		if (canvas.getParent() instanceof JViewport) {
			return saveViewport(canvas, (JViewport)canvas.getParent());
		} else {
			// save only the visible region of the canvas
			return paintComponent(canvas);
		}		
	}
	/**
	 * Prompts the user to save the entire canvas or just the visible region.
	 * If the entire canvas is selected then the canvas is removed from the viewport and resized, then
	 * painted into the image and returned to the viewport.
	 * 
	 * @return true if the image is saved
	 */
	private BufferedImage saveViewport(PCanvas canvas, JViewport viewport) {
		Dimension fullSize = viewport.getViewSize();
		Point viewPosition = viewport.getViewPosition();

		// ask the user if they want an image of the whole canvas or just the visible area
		// check if the canvas is smaller than the viewport view size
		if ((fullSize.width > canvas.getWidth()) || (fullSize.height > canvas.getHeight())) {
//			String msg = "Do you want to save the visible region of the canvas " + dimToString(canvas.getSize()) +
//					" or the entire canvas " + dimToString(fullSize) + "?\n" +
//					"Warning: saving the entire canvas can cause an out of memory error if it is too large.";
//			String[] options = new String[] { " Just The Visible Region ",
//										" The Entire Canvas ", " Cancel " };
//			int choice = JOptionPane.showOptionDialog(viewport,
//					msg, "Confirm", JOptionPane.YES_NO_CANCEL_OPTION, JOptionPane.QUESTION_MESSAGE,
//					null, options, options[0]);
//
//			if (choice == JOptionPane.CANCEL_OPTION) {
//				// do nothing, false will be returned
//			} else if (choice == JOptionPane.YES_OPTION) {
//				// just save the visible region of the canvas
//				saved = paintComponent(canvas, file, formatName);
//			} else if (choice == JOptionPane.NO_OPTION) {
//				// save the entire canvas, need to start in the top left corner
				viewport.setViewPosition(new Point(0, 0));

				JPanel fullPanel = new JPanel(new BorderLayout());
				fullPanel.add(canvas, BorderLayout.CENTER);
				Rectangle oldBounds = canvas.getBounds();
				// make this panel use the entire view
				fullPanel.setBounds(0, 0, fullSize.width, fullSize.height);
				// have to make the canvas use all the size
				canvas.setBounds(0, 0, fullSize.width, fullSize.height);

				BufferedImage result = paintComponent(fullPanel);

				// restore the canvas as the original view with original position and bounds
				viewport.setView(canvas);
				viewport.setViewPosition(viewPosition);
				canvas.setBounds(oldBounds);
				return result;
			//}
		} else {
			// just save the visible region of the canvas
			return paintComponent(canvas);
		}		
	}

	private BufferedImage paintComponent(JComponent comp) {
		try {
			BufferedImage bufferedImage = new BufferedImage(comp.getWidth(), comp.getHeight(), BufferedImage.TYPE_INT_RGB);
			Graphics g = bufferedImage.getGraphics();
			comp.paint(g); // paint the canvas to the image
			//ImageIO.write(bufferedImage, formatName, file);
			return bufferedImage;
		} catch (Throwable t) {			
			t.printStackTrace();
			return null;
		}		
	}
}
