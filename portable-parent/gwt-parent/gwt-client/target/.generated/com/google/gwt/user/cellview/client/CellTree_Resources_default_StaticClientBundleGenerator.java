package com.google.gwt.user.cellview.client;

import com.google.gwt.core.client.GWT;
import com.google.gwt.resources.client.ResourcePrototype;

public class CellTree_Resources_default_StaticClientBundleGenerator implements com.google.gwt.user.cellview.client.CellTree.Resources {
  public com.google.gwt.resources.client.ImageResource cellTreeClosedItem() {
    return cellTreeClosedItem;
  }
  public com.google.gwt.resources.client.ImageResource cellTreeLoading() {
    return cellTreeLoading;
  }
  public com.google.gwt.resources.client.ImageResource cellTreeOpenItem() {
    return cellTreeOpenItem;
  }
  public com.google.gwt.resources.client.ImageResource cellTreeSelectedBackground() {
    return cellTreeSelectedBackground;
  }
  public com.google.gwt.user.cellview.client.CellTree.Style cellTreeStyle() {
    return cellTreeStyle;
  }
  private void _init0() {
    cellTreeClosedItem = new com.google.gwt.resources.client.impl.ImageResourcePrototype(
    "cellTreeClosedItem",
    com.google.gwt.i18n.client.LocaleInfo.getCurrentLocale().isRTL() ?bundledImage_None_rtl : bundledImage_None,
    15, 0, 15, 15, false, false
  );
    cellTreeLoading = new com.google.gwt.resources.client.impl.ImageResourcePrototype(
    "cellTreeLoading",
    com.google.gwt.i18n.client.LocaleInfo.getCurrentLocale().isRTL() ?externalImage_rtl : externalImage,
    0, 0, 16, 16, true, false
  );
    cellTreeOpenItem = new com.google.gwt.resources.client.impl.ImageResourcePrototype(
    "cellTreeOpenItem",
    com.google.gwt.i18n.client.LocaleInfo.getCurrentLocale().isRTL() ?bundledImage_None_rtl : bundledImage_None,
    0, 0, 15, 15, false, false
  );
    cellTreeSelectedBackground = new com.google.gwt.resources.client.impl.ImageResourcePrototype(
    "cellTreeSelectedBackground",
    com.google.gwt.i18n.client.LocaleInfo.getCurrentLocale().isRTL() ?bundledImage_Horizontal_rtl : bundledImage_Horizontal,
    0, 0, 82, 26, false, false
  );
    cellTreeStyle = new com.google.gwt.user.cellview.client.CellTree.Style() {
    private boolean injected;
    public boolean ensureInjected() {
      if (!injected) {
        injected = true;
        com.google.gwt.dom.client.StyleInjector.inject(getText());
        return true;
      }
      return false;
    }
    public String getName() {
      return "cellTreeStyle";
    }
    public String getText() {
      return com.google.gwt.i18n.client.LocaleInfo.getCurrentLocale().isRTL() ? ((".GL0PBETBGE{padding-right:" + ("16px")  + ";font-style:" + ("italic")  + ";}.GL0PBETBHE{padding-top:" + ("4px")  + ";padding-bottom:" + ("4px")  + ";cursor:" + ("hand")  + ";cursor:" + ("pointer")  + ";zoom:" + ("1")  + ";}.GL0PBETBJE{zoom:" + ("1")  + ";}.GL0PBETBKE{padding-right:" + ("3px")  + ";padding-left:" + ("3px")  + ";outline:") + (("none")  + ";}.GL0PBETBPE{font-weight:" + ("bold")  + ";color:" + ("#4b4a4a")  + ";margin-top:" + ("20px")  + ";padding:" + ("3px"+ " " +"10px"+ " " +"3px"+ " " +"13px")  + " !important;}.GL0PBETBBF{border-bottom:" + ("1px"+ " " +"solid"+ " " +"#6f7277")  + ";padding-bottom:" + ("1px")  + ";}.GL0PBETBLE{background-color:" + ("#ffc")  + ";outline:" + ("none")  + ";}.GL0PBETBNE{height:" + ((CellTree_Resources_default_StaticClientBundleGenerator.this.cellTreeSelectedBackground()).getHeight() + "px")  + ";overflow:" + ("hidden") ) + (";background:" + ("url(\"" + (CellTree_Resources_default_StaticClientBundleGenerator.this.cellTreeSelectedBackground()).getURL() + "\") -" + (CellTree_Resources_default_StaticClientBundleGenerator.this.cellTreeSelectedBackground()).getLeft() + "px -" + (CellTree_Resources_default_StaticClientBundleGenerator.this.cellTreeSelectedBackground()).getTop() + "px  repeat-x")  + ";background-color:" + ("#628cd5")  + ";color:" + ("white")  + ";height:" + ("auto")  + ";overflow:" + ("visible")  + ";}.GL0PBETBOE{padding-right:" + ("16px")  + ";outline:" + ("none")  + ";}")) : ((".GL0PBETBGE{padding-left:" + ("16px")  + ";font-style:" + ("italic")  + ";}.GL0PBETBHE{padding-top:" + ("4px")  + ";padding-bottom:" + ("4px")  + ";cursor:" + ("hand")  + ";cursor:" + ("pointer")  + ";zoom:" + ("1")  + ";}.GL0PBETBJE{zoom:" + ("1")  + ";}.GL0PBETBKE{padding-left:" + ("3px")  + ";padding-right:" + ("3px")  + ";outline:") + (("none")  + ";}.GL0PBETBPE{font-weight:" + ("bold")  + ";color:" + ("#4b4a4a")  + ";margin-top:" + ("20px")  + ";padding:" + ("3px"+ " " +"13px"+ " " +"3px"+ " " +"10px")  + " !important;}.GL0PBETBBF{border-bottom:" + ("1px"+ " " +"solid"+ " " +"#6f7277")  + ";padding-bottom:" + ("1px")  + ";}.GL0PBETBLE{background-color:" + ("#ffc")  + ";outline:" + ("none")  + ";}.GL0PBETBNE{height:" + ((CellTree_Resources_default_StaticClientBundleGenerator.this.cellTreeSelectedBackground()).getHeight() + "px")  + ";overflow:" + ("hidden") ) + (";background:" + ("url(\"" + (CellTree_Resources_default_StaticClientBundleGenerator.this.cellTreeSelectedBackground()).getURL() + "\") -" + (CellTree_Resources_default_StaticClientBundleGenerator.this.cellTreeSelectedBackground()).getLeft() + "px -" + (CellTree_Resources_default_StaticClientBundleGenerator.this.cellTreeSelectedBackground()).getTop() + "px  repeat-x")  + ";background-color:" + ("#628cd5")  + ";color:" + ("white")  + ";height:" + ("auto")  + ";overflow:" + ("visible")  + ";}.GL0PBETBOE{padding-left:" + ("16px")  + ";outline:" + ("none")  + ";}"));
    }
    public java.lang.String cellTreeEmptyMessage(){
      return "GL0PBETBGE";
    }
    public java.lang.String cellTreeItem(){
      return "GL0PBETBHE";
    }
    public java.lang.String cellTreeItemImage(){
      return "GL0PBETBIE";
    }
    public java.lang.String cellTreeItemImageValue(){
      return "GL0PBETBJE";
    }
    public java.lang.String cellTreeItemValue(){
      return "GL0PBETBKE";
    }
    public java.lang.String cellTreeKeyboardSelectedItem(){
      return "GL0PBETBLE";
    }
    public java.lang.String cellTreeOpenItem(){
      return "GL0PBETBME";
    }
    public java.lang.String cellTreeSelectedItem(){
      return "GL0PBETBNE";
    }
    public java.lang.String cellTreeShowMoreButton(){
      return "GL0PBETBOE";
    }
    public java.lang.String cellTreeTopItem(){
      return "GL0PBETBPE";
    }
    public java.lang.String cellTreeTopItemImage(){
      return "GL0PBETBAF";
    }
    public java.lang.String cellTreeTopItemImageValue(){
      return "GL0PBETBBF";
    }
    public java.lang.String cellTreeWidget(){
      return "GL0PBETBCF";
    }
  }
  ;
  }
  
  private static java.util.HashMap<java.lang.String, com.google.gwt.resources.client.ResourcePrototype> resourceMap;
  private static final java.lang.String bundledImage_None = GWT.getModuleBaseURL() + "50A61AF816F970BE24D9D1313AE59069.cache.png";
  private static final java.lang.String bundledImage_None_rtl = GWT.getModuleBaseURL() + "1ED06C53E25AC3363D47D2C80EBD3385.cache.png";
  private static final java.lang.String bundledImage_Horizontal = GWT.getModuleBaseURL() + "CD15EC0BBF9CD57F9198FD5C1C37122E.cache.png";
  private static final java.lang.String bundledImage_Horizontal_rtl = GWT.getModuleBaseURL() + "9760B036C3B6E12FF6DEEDC917855221.cache.png";
  private static final java.lang.String externalImage = GWT.getModuleBaseURL() + "88223A47D6474241981BB15127C39196.cache.gif";
  private static final java.lang.String externalImage_rtl = GWT.getModuleBaseURL() + "5E838E9448E51A6F56321C950EB604A7.cache.png";
  private static com.google.gwt.resources.client.ImageResource cellTreeClosedItem;
  private static com.google.gwt.resources.client.ImageResource cellTreeLoading;
  private static com.google.gwt.resources.client.ImageResource cellTreeOpenItem;
  private static com.google.gwt.resources.client.ImageResource cellTreeSelectedBackground;
  private static com.google.gwt.user.cellview.client.CellTree.Style cellTreeStyle;
  
  static {
    new CellTree_Resources_default_StaticClientBundleGenerator()._init0();
  }
  public ResourcePrototype[] getResources() {
    return new ResourcePrototype[] {
      cellTreeClosedItem(), 
      cellTreeLoading(), 
      cellTreeOpenItem(), 
      cellTreeSelectedBackground(), 
      cellTreeStyle(), 
    };
  }
  public ResourcePrototype getResource(String name) {
    if (GWT.isScript()) {
      return getResourceNative(name);
    } else {
      if (resourceMap == null) {
        resourceMap = new java.util.HashMap<java.lang.String, com.google.gwt.resources.client.ResourcePrototype>();
        resourceMap.put("cellTreeClosedItem", cellTreeClosedItem());
        resourceMap.put("cellTreeLoading", cellTreeLoading());
        resourceMap.put("cellTreeOpenItem", cellTreeOpenItem());
        resourceMap.put("cellTreeSelectedBackground", cellTreeSelectedBackground());
        resourceMap.put("cellTreeStyle", cellTreeStyle());
      }
      return resourceMap.get(name);
    }
  }
  private native ResourcePrototype getResourceNative(String name) /*-{
    switch (name) {
      case 'cellTreeClosedItem': return this.@com.google.gwt.user.cellview.client.CellTree.Resources::cellTreeClosedItem()();
      case 'cellTreeLoading': return this.@com.google.gwt.user.cellview.client.CellTree.Resources::cellTreeLoading()();
      case 'cellTreeOpenItem': return this.@com.google.gwt.user.cellview.client.CellTree.Resources::cellTreeOpenItem()();
      case 'cellTreeSelectedBackground': return this.@com.google.gwt.user.cellview.client.CellTree.Resources::cellTreeSelectedBackground()();
      case 'cellTreeStyle': return this.@com.google.gwt.user.cellview.client.CellTree.Resources::cellTreeStyle()();
    }
    return null;
  }-*/;
}
