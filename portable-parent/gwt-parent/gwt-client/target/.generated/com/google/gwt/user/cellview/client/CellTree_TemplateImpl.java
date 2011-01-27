package com.google.gwt.user.cellview.client;

public class CellTree_TemplateImpl implements com.google.gwt.user.cellview.client.CellTree.Template {
  public com.google.gwt.safehtml.shared.SafeHtml imageWrapper(java.lang.String arg0,java.lang.String arg1,int arg2,int arg3,com.google.gwt.safehtml.shared.SafeHtml arg4) {
    StringBuilder sb = new java.lang.StringBuilder()
        .append("<div class=\"")
        .append(com.google.gwt.safehtml.shared.SafeHtmlUtils.htmlEscape(arg0))
        .append("\" style=\"position:absolute;")
        .append(com.google.gwt.safehtml.shared.SafeHtmlUtils.htmlEscape(arg1))
        .append(":0px;width:")
        .append(com.google.gwt.safehtml.shared.SafeHtmlUtils.htmlEscape(String.valueOf(arg2)))
        .append("px;height:")
        .append(com.google.gwt.safehtml.shared.SafeHtmlUtils.htmlEscape(String.valueOf(arg3)))
        .append("px;\">")
        .append(arg4.asString())
        .append("</div>")
        ;
    return new com.google.gwt.safehtml.shared.OnlyToBeUsedInGeneratedCodeStringBlessedAsSafeHtml(sb.toString());
  }
  
  }
