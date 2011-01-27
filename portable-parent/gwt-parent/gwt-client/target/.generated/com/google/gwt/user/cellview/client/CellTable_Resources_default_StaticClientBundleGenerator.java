package com.google.gwt.user.cellview.client;

import com.google.gwt.core.client.GWT;
import com.google.gwt.resources.client.ResourcePrototype;

public class CellTable_Resources_default_StaticClientBundleGenerator implements com.google.gwt.user.cellview.client.CellTable.Resources {
  public com.google.gwt.resources.client.ImageResource cellTableFooterBackground() {
    return cellTableFooterBackground;
  }
  public com.google.gwt.resources.client.ImageResource cellTableHeaderBackground() {
    return cellTableHeaderBackground;
  }
  public com.google.gwt.resources.client.ImageResource cellTableLoading() {
    return cellTableLoading;
  }
  public com.google.gwt.resources.client.ImageResource cellTableSelectedBackground() {
    return cellTableSelectedBackground;
  }
  public com.google.gwt.user.cellview.client.CellTable.Style cellTableStyle() {
    return cellTableStyle;
  }
  private void _init0() {
    cellTableFooterBackground = new com.google.gwt.resources.client.impl.ImageResourcePrototype(
    "cellTableFooterBackground",
    com.google.gwt.i18n.client.LocaleInfo.getCurrentLocale().isRTL() ?bundledImage_Horizontal_rtl : bundledImage_Horizontal,
    0, 0, 82, 23, false, false
  );
    cellTableHeaderBackground = new com.google.gwt.resources.client.impl.ImageResourcePrototype(
    "cellTableHeaderBackground",
    com.google.gwt.i18n.client.LocaleInfo.getCurrentLocale().isRTL() ?bundledImage_Horizontal_rtl : bundledImage_Horizontal,
    0, 0, 82, 23, false, false
  );
    cellTableLoading = new com.google.gwt.resources.client.impl.ImageResourcePrototype(
    "cellTableLoading",
    com.google.gwt.i18n.client.LocaleInfo.getCurrentLocale().isRTL() ?externalImage_rtl : externalImage,
    0, 0, 220, 19, true, false
  );
    cellTableSelectedBackground = new com.google.gwt.resources.client.impl.ImageResourcePrototype(
    "cellTableSelectedBackground",
    com.google.gwt.i18n.client.LocaleInfo.getCurrentLocale().isRTL() ?bundledImage_Horizontal_rtl : bundledImage_Horizontal,
    0, 23, 82, 26, false, false
  );
    cellTableStyle = new com.google.gwt.user.cellview.client.CellTable.Style() {
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
      return "cellTableStyle";
    }
    public String getText() {
      return com.google.gwt.i18n.client.LocaleInfo.getCurrentLocale().isRTL() ? ((".GL0PBETBJC{border-top:" + ("2px"+ " " +"solid"+ " " +"#6f7277")  + ";padding:" + ("3px"+ " " +"15px")  + ";text-align:" + ("right")  + ";color:" + ("#4b4a4a")  + ";text-shadow:" + ("#ddf"+ " " +"1px"+ " " +"1px"+ " " +"0")  + ";}.GL0PBETBKC{border-bottom:" + ("2px"+ " " +"solid"+ " " +"#6f7277")  + ";padding:" + ("3px"+ " " +"15px")  + ";text-align:" + ("right")  + ";color:" + ("#4b4a4a")  + ";text-shadow:" + ("#ddf"+ " " +"1px"+ " " +"1px"+ " " +"0")  + ";}.GL0PBETBDC{padding:") + (("2px"+ " " +"15px")  + ";}.GL0PBETBEC{background:" + ("#fff")  + ";}.GL0PBETBFC{border:" + ("2px"+ " " +"solid"+ " " +"#fff")  + ";}.GL0PBETBED{background:" + ("#f3f7fb")  + ";}.GL0PBETBFD{border:" + ("2px"+ " " +"solid"+ " " +"#f3f7fb")  + ";}.GL0PBETBLC{background:" + ("#eee")  + ";}.GL0PBETBMC{border:" + ("2px"+ " " +"solid"+ " " +"#eee")  + ";}.GL0PBETBOC{background:" + ("#ffc")  + ";}.GL0PBETBPC{border:" + ("2px"+ " " +"solid"+ " " +"#ffc")  + ";}.GL0PBETBGD{background:" + ("#628cd5")  + ";color:" + ("white") ) + (";height:" + ("auto")  + ";overflow:" + ("auto")  + ";}.GL0PBETBHD{border:" + ("2px"+ " " +"solid"+ " " +"#628cd5")  + ";}.GL0PBETBNC{border:" + ("2px"+ " " +"solid"+ " " +"#d7dde8")  + ";}.GL0PBETBDD{height:" + ((CellTable_Resources_default_StaticClientBundleGenerator.this.cellTableLoading()).getHeight() + "px")  + ";width:" + ((CellTable_Resources_default_StaticClientBundleGenerator.this.cellTableLoading()).getWidth() + "px")  + ";overflow:" + ("hidden")  + ";background:" + ("url(\"" + (CellTable_Resources_default_StaticClientBundleGenerator.this.cellTableLoading()).getURL() + "\") -" + (CellTable_Resources_default_StaticClientBundleGenerator.this.cellTableLoading()).getLeft() + "px -" + (CellTable_Resources_default_StaticClientBundleGenerator.this.cellTableLoading()).getTop() + "px  no-repeat")  + ";margin:" + ("30px")  + ";}")) : ((".GL0PBETBJC{border-top:" + ("2px"+ " " +"solid"+ " " +"#6f7277")  + ";padding:" + ("3px"+ " " +"15px")  + ";text-align:" + ("left")  + ";color:" + ("#4b4a4a")  + ";text-shadow:" + ("#ddf"+ " " +"1px"+ " " +"1px"+ " " +"0")  + ";}.GL0PBETBKC{border-bottom:" + ("2px"+ " " +"solid"+ " " +"#6f7277")  + ";padding:" + ("3px"+ " " +"15px")  + ";text-align:" + ("left")  + ";color:" + ("#4b4a4a")  + ";text-shadow:" + ("#ddf"+ " " +"1px"+ " " +"1px"+ " " +"0")  + ";}.GL0PBETBDC{padding:") + (("2px"+ " " +"15px")  + ";}.GL0PBETBEC{background:" + ("#fff")  + ";}.GL0PBETBFC{border:" + ("2px"+ " " +"solid"+ " " +"#fff")  + ";}.GL0PBETBED{background:" + ("#f3f7fb")  + ";}.GL0PBETBFD{border:" + ("2px"+ " " +"solid"+ " " +"#f3f7fb")  + ";}.GL0PBETBLC{background:" + ("#eee")  + ";}.GL0PBETBMC{border:" + ("2px"+ " " +"solid"+ " " +"#eee")  + ";}.GL0PBETBOC{background:" + ("#ffc")  + ";}.GL0PBETBPC{border:" + ("2px"+ " " +"solid"+ " " +"#ffc")  + ";}.GL0PBETBGD{background:" + ("#628cd5")  + ";color:" + ("white") ) + (";height:" + ("auto")  + ";overflow:" + ("auto")  + ";}.GL0PBETBHD{border:" + ("2px"+ " " +"solid"+ " " +"#628cd5")  + ";}.GL0PBETBNC{border:" + ("2px"+ " " +"solid"+ " " +"#d7dde8")  + ";}.GL0PBETBDD{height:" + ((CellTable_Resources_default_StaticClientBundleGenerator.this.cellTableLoading()).getHeight() + "px")  + ";width:" + ((CellTable_Resources_default_StaticClientBundleGenerator.this.cellTableLoading()).getWidth() + "px")  + ";overflow:" + ("hidden")  + ";background:" + ("url(\"" + (CellTable_Resources_default_StaticClientBundleGenerator.this.cellTableLoading()).getURL() + "\") -" + (CellTable_Resources_default_StaticClientBundleGenerator.this.cellTableLoading()).getLeft() + "px -" + (CellTable_Resources_default_StaticClientBundleGenerator.this.cellTableLoading()).getTop() + "px  no-repeat")  + ";margin:" + ("30px")  + ";}"));
    }
    public java.lang.String cellTableCell(){
      return "GL0PBETBDC";
    }
    public java.lang.String cellTableEvenRow(){
      return "GL0PBETBEC";
    }
    public java.lang.String cellTableEvenRowCell(){
      return "GL0PBETBFC";
    }
    public java.lang.String cellTableFirstColumn(){
      return "GL0PBETBGC";
    }
    public java.lang.String cellTableFirstColumnFooter(){
      return "GL0PBETBHC";
    }
    public java.lang.String cellTableFirstColumnHeader(){
      return "GL0PBETBIC";
    }
    public java.lang.String cellTableFooter(){
      return "GL0PBETBJC";
    }
    public java.lang.String cellTableHeader(){
      return "GL0PBETBKC";
    }
    public java.lang.String cellTableHoveredRow(){
      return "GL0PBETBLC";
    }
    public java.lang.String cellTableHoveredRowCell(){
      return "GL0PBETBMC";
    }
    public java.lang.String cellTableKeyboardSelectedCell(){
      return "GL0PBETBNC";
    }
    public java.lang.String cellTableKeyboardSelectedRow(){
      return "GL0PBETBOC";
    }
    public java.lang.String cellTableKeyboardSelectedRowCell(){
      return "GL0PBETBPC";
    }
    public java.lang.String cellTableLastColumn(){
      return "GL0PBETBAD";
    }
    public java.lang.String cellTableLastColumnFooter(){
      return "GL0PBETBBD";
    }
    public java.lang.String cellTableLastColumnHeader(){
      return "GL0PBETBCD";
    }
    public java.lang.String cellTableLoading(){
      return "GL0PBETBDD";
    }
    public java.lang.String cellTableOddRow(){
      return "GL0PBETBED";
    }
    public java.lang.String cellTableOddRowCell(){
      return "GL0PBETBFD";
    }
    public java.lang.String cellTableSelectedRow(){
      return "GL0PBETBGD";
    }
    public java.lang.String cellTableSelectedRowCell(){
      return "GL0PBETBHD";
    }
    public java.lang.String cellTableWidget(){
      return "GL0PBETBID";
    }
  }
  ;
  }
  
  private static java.util.HashMap<java.lang.String, com.google.gwt.resources.client.ResourcePrototype> resourceMap;
  private static final java.lang.String bundledImage_Horizontal = GWT.getModuleBaseURL() + "223E04DC70F69BC559571D1C0E0667E5.cache.png";
  private static final java.lang.String bundledImage_Horizontal_rtl = GWT.getModuleBaseURL() + "0326AF455425F6065C00E0361659A798.cache.png";
  private static final java.lang.String externalImage = GWT.getModuleBaseURL() + "182BA4497063143378FFE2BB7E67E86C.cache.gif";
  private static final java.lang.String externalImage_rtl = GWT.getModuleBaseURL() + "523B38788076F8F4B4F611EB0EA4A08F.cache.png";
  private static com.google.gwt.resources.client.ImageResource cellTableFooterBackground;
  private static com.google.gwt.resources.client.ImageResource cellTableHeaderBackground;
  private static com.google.gwt.resources.client.ImageResource cellTableLoading;
  private static com.google.gwt.resources.client.ImageResource cellTableSelectedBackground;
  private static com.google.gwt.user.cellview.client.CellTable.Style cellTableStyle;
  
  static {
    new CellTable_Resources_default_StaticClientBundleGenerator()._init0();
  }
  public ResourcePrototype[] getResources() {
    return new ResourcePrototype[] {
      cellTableFooterBackground(), 
      cellTableHeaderBackground(), 
      cellTableLoading(), 
      cellTableSelectedBackground(), 
      cellTableStyle(), 
    };
  }
  public ResourcePrototype getResource(String name) {
    if (GWT.isScript()) {
      return getResourceNative(name);
    } else {
      if (resourceMap == null) {
        resourceMap = new java.util.HashMap<java.lang.String, com.google.gwt.resources.client.ResourcePrototype>();
        resourceMap.put("cellTableFooterBackground", cellTableFooterBackground());
        resourceMap.put("cellTableHeaderBackground", cellTableHeaderBackground());
        resourceMap.put("cellTableLoading", cellTableLoading());
        resourceMap.put("cellTableSelectedBackground", cellTableSelectedBackground());
        resourceMap.put("cellTableStyle", cellTableStyle());
      }
      return resourceMap.get(name);
    }
  }
  private native ResourcePrototype getResourceNative(String name) /*-{
    switch (name) {
      case 'cellTableFooterBackground': return this.@com.google.gwt.user.cellview.client.CellTable.Resources::cellTableFooterBackground()();
      case 'cellTableHeaderBackground': return this.@com.google.gwt.user.cellview.client.CellTable.Resources::cellTableHeaderBackground()();
      case 'cellTableLoading': return this.@com.google.gwt.user.cellview.client.CellTable.Resources::cellTableLoading()();
      case 'cellTableSelectedBackground': return this.@com.google.gwt.user.cellview.client.CellTable.Resources::cellTableSelectedBackground()();
      case 'cellTableStyle': return this.@com.google.gwt.user.cellview.client.CellTable.Resources::cellTableStyle()();
    }
    return null;
  }-*/;
}
