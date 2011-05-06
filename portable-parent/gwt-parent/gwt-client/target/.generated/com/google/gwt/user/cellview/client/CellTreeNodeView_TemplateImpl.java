package com.google.gwt.user.cellview.client;

public class CellTreeNodeView_TemplateImpl implements com.google.gwt.user.cellview.client.CellTreeNodeView.Template {
  
  public com.google.gwt.safehtml.shared.SafeHtml outerDiv(java.lang.String arg0,int arg1,java.lang.String arg2,com.google.gwt.safehtml.shared.SafeHtml arg3) {
    StringBuilder sb = new java.lang.StringBuilder()
        .append("<div><div style=\"padding-")
        .append(com.google.gwt.safehtml.shared.SafeHtmlUtils.htmlEscape(arg0))
        .append(":")
        .append(com.google.gwt.safehtml.shared.SafeHtmlUtils.htmlEscape(String.valueOf(arg1)))
        .append("px;\" class=\"")
        .append(com.google.gwt.safehtml.shared.SafeHtmlUtils.htmlEscape(arg2))
        .append("\">")
        .append(arg3.asString())
        .append("</div></div>")
        ;
    return new com.google.gwt.safehtml.shared.OnlyToBeUsedInGeneratedCodeStringBlessedAsSafeHtml(sb.toString());
  }
  
  public com.google.gwt.safehtml.shared.SafeHtml innerDiv(java.lang.String arg0,int arg1,java.lang.String arg2,com.google.gwt.safehtml.shared.SafeHtml arg3,java.lang.String arg4,com.google.gwt.safehtml.shared.SafeHtml arg5) {
    StringBuilder sb = new java.lang.StringBuilder()
        .append("<div onclick=\"\" style=\"position:relative;padding-")
        .append(com.google.gwt.safehtml.shared.SafeHtmlUtils.htmlEscape(arg0))
        .append(":")
        .append(com.google.gwt.safehtml.shared.SafeHtmlUtils.htmlEscape(String.valueOf(arg1)))
        .append("px;\" class=\"")
        .append(com.google.gwt.safehtml.shared.SafeHtmlUtils.htmlEscape(arg2))
        .append("\">")
        .append(arg3.asString())
        .append("<div class=\"")
        .append(com.google.gwt.safehtml.shared.SafeHtmlUtils.htmlEscape(arg4))
        .append("\">")
        .append(arg5.asString())
        .append("</div></div>")
        ;
    return new com.google.gwt.safehtml.shared.OnlyToBeUsedInGeneratedCodeStringBlessedAsSafeHtml(sb.toString());
  }
}
