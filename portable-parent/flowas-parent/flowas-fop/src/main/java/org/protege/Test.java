package org.protege;

import java.awt.Container;
import java.awt.event.ActionEvent;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;

import javax.imageio.ImageIO;
import javax.swing.JPanel;

import org.protege.editor.owl.OWLEditorKit;
//import org.protege.ontograf.actions.ExportImageAction;
import org.protege.ontograf.actions.OpenGraphAction;
import org.protege.ontograf.common.GraphController;

import ca.uvic.cs.chisel.cajun.actions.LayoutAction;

public class Test {
	private GraphController graphController;
	/**
	 * @param args
	 */
	public static void main(String[] args) {
		Test t=new Test();
		t.initialize();
	}
	private void initialize() {
		JPanel mainWindow = new JPanel();
		graphController = new GraphController(mainWindow, new OWLEditorKit());
		ExportImageAction exportImage = new ExportImageAction(mainWindow, graphController.getGraph().getCanvas());
		OpenGraphAction openGraph = new OpenGraphAction(mainWindow, graphController);
		openGraph.loadFromFile(new File(Test.class.getResource("yy.graph").getFile()));
		for (LayoutAction action : graphController.getGraph().getLayouts()) {
			if("Radial".equals(action.getName())){
				ActionEvent arg0=null;
				action.actionPerformed(arg0);
				action.doAction();
				action.runLayout();
				graphController.refresh();				
				System.out.println("---"+action.getName());
			}			
		}
		BufferedImage bufferedImage = exportImage.exportGraphAsImage();		
		try {
			ImageIO.write(bufferedImage, "jpg", new File("hello.jpg"));
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
