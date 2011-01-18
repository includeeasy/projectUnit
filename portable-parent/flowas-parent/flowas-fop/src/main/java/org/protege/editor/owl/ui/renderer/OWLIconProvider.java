package org.protege.editor.owl.ui.renderer;

import javax.swing.Icon;
import javax.swing.ImageIcon;

import org.semanticweb.owlapi.model.OWLEntity;

public class OWLIconProvider {

	public Icon getIcon(OWLEntity entity) {
		ImageIcon img = new ImageIcon(OWLIconProvider.class.getResource("icon_export.gif"));
		//img.setImage(image);
		System.out.println(entity.getIRI().getFragment());
		return img;
	}

}
