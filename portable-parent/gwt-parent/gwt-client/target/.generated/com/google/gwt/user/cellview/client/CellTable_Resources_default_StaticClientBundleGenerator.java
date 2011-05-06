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
  public com.google.gwt.resources.client.ImageResource cellTableSortAscending() {
    return cellTableSortAscending;
  }
  public com.google.gwt.resources.client.ImageResource cellTableSortDescending() {
    return cellTableSortDescending;
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
    cellTableSortAscending = new com.google.gwt.resources.client.impl.ImageResourcePrototype(
    "cellTableSortAscending",
    com.google.gwt.i18n.client.LocaleInfo.getCurrentLocale().isRTL() ?bundledImage_None_rtl : bundledImage_None,
    11, 0, 11, 7, false, false
  );
    cellTableSortDescending = new com.google.gwt.resources.client.impl.ImageResourcePrototype(
    "cellTableSortDescending",
    com.google.gwt.i18n.client.LocaleInfo.getCurrentLocale().isRTL() ?bundledImage_None_rtl : bundledImage_None,
    0, 0, 11, 7, false, false
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
      return com.google.gwt.i18n.client.LocaleInfo.getCurrentLocale().isRTL() ? ((".GALD-WONC{border-top:" + ("2px"+ " " +"solid"+ " " +"#6f7277")  + ";padding:" + ("3px"+ " " +"15px")  + ";text-align:" + ("right")  + ";color:" + ("#4b4a4a")  + ";text-shadow:" + ("#ddf"+ " " +"1px"+ " " +"1px"+ " " +"0")  + ";overflow:" + ("hidden")  + ";}.GALD-WOOC{border-bottom:" + ("2px"+ " " +"solid"+ " " +"#6f7277")  + ";padding:" + ("3px"+ " " +"15px")  + ";text-align:" + ("right")  + ";color:" + ("#4b4a4a")  + ";text-shadow:") + (("#ddf"+ " " +"1px"+ " " +"1px"+ " " +"0")  + ";overflow:" + ("hidden")  + ";}.GALD-WOHC{padding:" + ("2px"+ " " +"15px")  + ";overflow:" + ("hidden")  + ";}.GALD-WOMD{cursor:" + ("pointer")  + ";cursor:" + ("hand")  + ";}.GALD-WOMD:hover{color:" + ("#6c6b6b")  + ";}.GALD-WOIC{background:" + ("#fff")  + ";}.GALD-WOJC{border:" + ("2px"+ " " +"solid"+ " " +"#fff")  + ";}.GALD-WOID{background:" + ("#f3f7fb")  + ";}.GALD-WOJD{border:" + ("2px"+ " " +"solid"+ " " +"#f3f7fb") ) + (";}.GALD-WOPC{background:" + ("#eee")  + ";}.GALD-WOAD{border:" + ("2px"+ " " +"solid"+ " " +"#eee")  + ";}.GALD-WOCD{background:" + ("#ffc")  + ";}.GALD-WODD{border:" + ("2px"+ " " +"solid"+ " " +"#ffc")  + ";}.GALD-WOKD{background:" + ("#628cd5")  + ";color:" + ("white")  + ";height:" + ("auto")  + ";overflow:" + ("auto")  + ";}.GALD-WOLD{border:" + ("2px"+ " " +"solid"+ " " +"#628cd5")  + ";}.GALD-WOBD{border:" + ("2px"+ " " +"solid"+ " " +"#d7dde8")  + ";}.GALD-WOHD{height:") + (((CellTable_Resources_default_StaticClientBundleGenerator.this.cellTableLoading()).getHeight() + "px")  + ";width:" + ((CellTable_Resources_default_StaticClientBundleGenerator.this.cellTableLoading()).getWidth() + "px")  + ";overflow:" + ("hidden")  + ";background:" + ("url(\"" + (CellTable_Resources_default_StaticClientBundleGenerator.this.cellTableLoading()).getURL() + "\") -" + (CellTable_Resources_default_StaticClientBundleGenerator.this.cellTableLoading()).getLeft() + "px -" + (CellTable_Resources_default_StaticClientBundleGenerator.this.cellTableLoading()).getTop() + "px  no-repeat")  + ";margin:" + ("30px")  + ";}")) : ((".GALD-WONC{border-top:" + ("2px"+ " " +"solid"+ " " +"#6f7277")  + ";padding:" + ("3px"+ " " +"15px")  + ";text-align:" + ("left")  + ";color:" + ("#4b4a4a")  + ";text-shadow:" + ("#ddf"+ " " +"1px"+ " " +"1px"+ " " +"0")  + ";overflow:" + ("hidden")  + ";}.GALD-WOOC{border-bottom:" + ("2px"+ " " +"solid"+ " " +"#6f7277")  + ";padding:" + ("3px"+ " " +"15px")  + ";text-align:" + ("left")  + ";color:" + ("#4b4a4a")  + ";text-shadow:") + (("#ddf"+ " " +"1px"+ " " +"1px"+ " " +"0")  + ";overflow:" + ("hidden")  + ";}.GALD-WOHC{padding:" + ("2px"+ " " +"15px")  + ";overflow:" + ("hidden")  + ";}.GALD-WOMD{cursor:" + ("pointer")  + ";cursor:" + ("hand")  + ";}.GALD-WOMD:hover{color:" + ("#6c6b6b")  + ";}.GALD-WOIC{background:" + ("#fff")  + ";}.GALD-WOJC{border:" + ("2px"+ " " +"solid"+ " " +"#fff")  + ";}.GALD-WOID{background:" + ("#f3f7fb")  + ";}.GALD-WOJD{border:" + ("2px"+ " " +"solid"+ " " +"#f3f7fb") ) + (";}.GALD-WOPC{background:" + ("#eee")  + ";}.GALD-WOAD{border:" + ("2px"+ " " +"solid"+ " " +"#eee")  + ";}.GALD-WOCD{background:" + ("#ffc")  + ";}.GALD-WODD{border:" + ("2px"+ " " +"solid"+ " " +"#ffc")  + ";}.GALD-WOKD{background:" + ("#628cd5")  + ";color:" + ("white")  + ";height:" + ("auto")  + ";overflow:" + ("auto")  + ";}.GALD-WOLD{border:" + ("2px"+ " " +"solid"+ " " +"#628cd5")  + ";}.GALD-WOBD{border:" + ("2px"+ " " +"solid"+ " " +"#d7dde8")  + ";}.GALD-WOHD{height:") + (((CellTable_Resources_default_StaticClientBundleGenerator.this.cellTableLoading()).getHeight() + "px")  + ";width:" + ((CellTable_Resources_default_StaticClientBundleGenerator.this.cellTableLoading()).getWidth() + "px")  + ";overflow:" + ("hidden")  + ";background:" + ("url(\"" + (CellTable_Resources_default_StaticClientBundleGenerator.this.cellTableLoading()).getURL() + "\") -" + (CellTable_Resources_default_StaticClientBundleGenerator.this.cellTableLoading()).getLeft() + "px -" + (CellTable_Resources_default_StaticClientBundleGenerator.this.cellTableLoading()).getTop() + "px  no-repeat")  + ";margin:" + ("30px")  + ";}"));
    }
    public java.lang.String cellTableCell(){
      return "GALD-WOHC";
    }
    public java.lang.String cellTableEvenRow(){
      return "GALD-WOIC";
    }
    public java.lang.String cellTableEvenRowCell(){
      return "GALD-WOJC";
    }
    public java.lang.String cellTableFirstColumn(){
      return "GALD-WOKC";
    }
    public java.lang.String cellTableFirstColumnFooter(){
      return "GALD-WOLC";
    }
    public java.lang.String cellTableFirstColumnHeader(){
      return "GALD-WOMC";
    }
    public java.lang.String cellTableFooter(){
      return "GALD-WONC";
    }
    public java.lang.String cellTableHeader(){
      return "GALD-WOOC";
    }
    public java.lang.String cellTableHoveredRow(){
      return "GALD-WOPC";
    }
    public java.lang.String cellTableHoveredRowCell(){
      return "GALD-WOAD";
    }
    public java.lang.String cellTableKeyboardSelectedCell(){
      return "GALD-WOBD";
    }
    public java.lang.String cellTableKeyboardSelectedRow(){
      return "GALD-WOCD";
    }
    public java.lang.String cellTableKeyboardSelectedRowCell(){
      return "GALD-WODD";
    }
    public java.lang.String cellTableLastColumn(){
      return "GALD-WOED";
    }
    public java.lang.String cellTableLastColumnFooter(){
      return "GALD-WOFD";
    }
    public java.lang.String cellTableLastColumnHeader(){
      return "GALD-WOGD";
    }
    public java.lang.String cellTableLoading(){
      return "GALD-WOHD";
    }
    public java.lang.String cellTableOddRow(){
      return "GALD-WOID";
    }
    public java.lang.String cellTableOddRowCell(){
      return "GALD-WOJD";
    }
    public java.lang.String cellTableSelectedRow(){
      return "GALD-WOKD";
    }
    public java.lang.String cellTableSelectedRowCell(){
      return "GALD-WOLD";
    }
    public java.lang.String cellTableSortableHeader(){
      return "GALD-WOMD";
    }
    public java.lang.String cellTableSortedHeaderAscending(){
      return "GALD-WOND";
    }
    public java.lang.String cellTableSortedHeaderDescending(){
      return "GALD-WOOD";
    }
    public java.lang.String cellTableWidget(){
      return "GALD-WOPD";
    }
  }
  ;
  }
  
  private static java.util.HashMap<java.lang.String, com.google.gwt.resources.client.ResourcePrototype> resourceMap;
  private static final java.lang.String bundledImage_Horizontal = GWT.getModuleBaseURL() + "223E04DC70F69BC559571D1C0E0667E5.cache.png";
  private static final java.lang.String bundledImage_Horizontal_rtl = GWT.getModuleBaseURL() + "0326AF455425F6065C00E0361659A798.cache.png";
  private static final java.lang.String bundledImage_None = GWT.getModuleBaseURL() + "AB196D9D7834625802449A82C5811B43.cache.png";
  private static final java.lang.String bundledImage_None_rtl = GWT.getModuleBaseURL() + "3E13412DD77AE068AAF96B6978824A75.cache.png";
  private static final java.lang.String externalImage = GWT.getModuleBaseURL() + "182BA4497063143378FFE2BB7E67E86C.cache.gif";
  private static final java.lang.String externalImage_rtl = GWT.getModuleBaseURL() + "523B38788076F8F4B4F611EB0EA4A08F.cache.png";
  private static com.google.gwt.resources.client.ImageResource cellTableFooterBackground;
  private static com.google.gwt.resources.client.ImageResource cellTableHeaderBackground;
  private static com.google.gwt.resources.client.ImageResource cellTableLoading;
  private static com.google.gwt.resources.client.ImageResource cellTableSelectedBackground;
  private static com.google.gwt.resources.client.ImageResource cellTableSortAscending;
  private static com.google.gwt.resources.client.ImageResource cellTableSortDescending;
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
      cellTableSortAscending(), 
      cellTableSortDescending(), 
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
        resourceMap.put("cellTableSortAscending", cellTableSortAscending());
        resourceMap.put("cellTableSortDescending", cellTableSortDescending());
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
      case 'cellTableSortAscending': return this.@com.google.gwt.user.cellview.client.CellTable.Resources::cellTableSortAscending()();
      case 'cellTableSortDescending': return this.@com.google.gwt.user.cellview.client.CellTable.Resources::cellTableSortDescending()();
      case 'cellTableStyle': return this.@com.google.gwt.user.cellview.client.CellTable.Resources::cellTableStyle()();
    }
    return null;
  }-*/;
}
