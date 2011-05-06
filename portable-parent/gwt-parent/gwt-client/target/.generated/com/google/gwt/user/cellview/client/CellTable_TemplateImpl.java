package com.google.gwt.user.cellview.client;

public class CellTable_TemplateImpl implements com.google.gwt.user.cellview.client.CellTable.Template {
  
  public com.google.gwt.safehtml.shared.SafeHtml thead(com.google.gwt.safehtml.shared.SafeHtml arg0) {
    StringBuilder sb = new java.lang.StringBuilder()
        .append("<table><thead>")
        .append(arg0.asString())
        .append("</thead></table>")
        ;
    return new com.google.gwt.safehtml.shared.OnlyToBeUsedInGeneratedCodeStringBlessedAsSafeHtml(sb.toString());
  }
  
  public com.google.gwt.safehtml.shared.SafeHtml tbody(com.google.gwt.safehtml.shared.SafeHtml arg0) {
    StringBuilder sb = new java.lang.StringBuilder()
        .append("<table><tbody>")
        .append(arg0.asString())
        .append("</tbody></table>")
        ;
    return new com.google.gwt.safehtml.shared.OnlyToBeUsedInGeneratedCodeStringBlessedAsSafeHtml(sb.toString());
  }
  
  public com.google.gwt.safehtml.shared.SafeHtml th(int arg0,java.lang.String arg1,com.google.gwt.safehtml.shared.SafeHtml arg2) {
    StringBuilder sb = new java.lang.StringBuilder()
        .append("<th colspan=\"")
        .append(com.google.gwt.safehtml.shared.SafeHtmlUtils.htmlEscape(String.valueOf(arg0)))
        .append("\" class=\"")
        .append(com.google.gwt.safehtml.shared.SafeHtmlUtils.htmlEscape(arg1))
        .append("\">")
        .append(arg2.asString())
        .append("</th>")
        ;
    return new com.google.gwt.safehtml.shared.OnlyToBeUsedInGeneratedCodeStringBlessedAsSafeHtml(sb.toString());
  }
  
  public com.google.gwt.safehtml.shared.SafeHtml td(java.lang.String arg0,com.google.gwt.safehtml.shared.SafeHtml arg1) {
    StringBuilder sb = new java.lang.StringBuilder()
        .append("<td class=\"")
        .append(com.google.gwt.safehtml.shared.SafeHtmlUtils.htmlEscape(arg0))
        .append("\">")
        .append(arg1.asString())
        .append("</td>")
        ;
    return new com.google.gwt.safehtml.shared.OnlyToBeUsedInGeneratedCodeStringBlessedAsSafeHtml(sb.toString());
  }
  
  public com.google.gwt.safehtml.shared.SafeHtml tdBothAlign(java.lang.String arg0,java.lang.String arg1,java.lang.String arg2,com.google.gwt.safehtml.shared.SafeHtml arg3) {
    StringBuilder sb = new java.lang.StringBuilder()
        .append("<td class=\"")
        .append(com.google.gwt.safehtml.shared.SafeHtmlUtils.htmlEscape(arg0))
        .append("\" align=\"")
        .append(com.google.gwt.safehtml.shared.SafeHtmlUtils.htmlEscape(arg1))
        .append("\" valign=\"")
        .append(com.google.gwt.safehtml.shared.SafeHtmlUtils.htmlEscape(arg2))
        .append("\">")
        .append(arg3.asString())
        .append("</td>")
        ;
    return new com.google.gwt.safehtml.shared.OnlyToBeUsedInGeneratedCodeStringBlessedAsSafeHtml(sb.toString());
  }
  
  public com.google.gwt.safehtml.shared.SafeHtml tdHorizontalAlign(java.lang.String arg0,java.lang.String arg1,com.google.gwt.safehtml.shared.SafeHtml arg2) {
    StringBuilder sb = new java.lang.StringBuilder()
        .append("<td class=\"")
        .append(com.google.gwt.safehtml.shared.SafeHtmlUtils.htmlEscape(arg0))
        .append("\" align=\"")
        .append(com.google.gwt.safehtml.shared.SafeHtmlUtils.htmlEscape(arg1))
        .append("\">")
        .append(arg2.asString())
        .append("</td>")
        ;
    return new com.google.gwt.safehtml.shared.OnlyToBeUsedInGeneratedCodeStringBlessedAsSafeHtml(sb.toString());
  }
  
  public com.google.gwt.safehtml.shared.SafeHtml tdVerticalAlign(java.lang.String arg0,java.lang.String arg1,com.google.gwt.safehtml.shared.SafeHtml arg2) {
    StringBuilder sb = new java.lang.StringBuilder()
        .append("<td class=\"")
        .append(com.google.gwt.safehtml.shared.SafeHtmlUtils.htmlEscape(arg0))
        .append("\" valign=\"")
        .append(com.google.gwt.safehtml.shared.SafeHtmlUtils.htmlEscape(arg1))
        .append("\">")
        .append(arg2.asString())
        .append("</td>")
        ;
    return new com.google.gwt.safehtml.shared.OnlyToBeUsedInGeneratedCodeStringBlessedAsSafeHtml(sb.toString());
  }
  
  public com.google.gwt.safehtml.shared.SafeHtml loading(java.lang.String arg0) {
    StringBuilder sb = new java.lang.StringBuilder()
        .append("<div class=\"")
        .append(com.google.gwt.safehtml.shared.SafeHtmlUtils.htmlEscape(arg0))
        .append("\"></div>")
        ;
    return new com.google.gwt.safehtml.shared.OnlyToBeUsedInGeneratedCodeStringBlessedAsSafeHtml(sb.toString());
  }
  
  public com.google.gwt.safehtml.shared.SafeHtml divFocusable(int arg0,com.google.gwt.safehtml.shared.SafeHtml arg1) {
    StringBuilder sb = new java.lang.StringBuilder()
        .append("<div style=\"outline:none;\" tabindex=\"")
        .append(com.google.gwt.safehtml.shared.SafeHtmlUtils.htmlEscape(String.valueOf(arg0)))
        .append("\">")
        .append(arg1.asString())
        .append("</div>")
        ;
    return new com.google.gwt.safehtml.shared.OnlyToBeUsedInGeneratedCodeStringBlessedAsSafeHtml(sb.toString());
  }
  
  public com.google.gwt.safehtml.shared.SafeHtml div(com.google.gwt.safehtml.shared.SafeHtml arg0) {
    StringBuilder sb = new java.lang.StringBuilder()
        .append("<div style=\"outline:none;\">")
        .append(arg0.asString())
        .append("</div>")
        ;
    return new com.google.gwt.safehtml.shared.OnlyToBeUsedInGeneratedCodeStringBlessedAsSafeHtml(sb.toString());
  }
  
  public com.google.gwt.safehtml.shared.SafeHtml divFocusableWithKey(int arg0,char arg1,com.google.gwt.safehtml.shared.SafeHtml arg2) {
    StringBuilder sb = new java.lang.StringBuilder()
        .append("<div style=\"outline:none;\" tabindex=\"")
        .append(com.google.gwt.safehtml.shared.SafeHtmlUtils.htmlEscape(String.valueOf(arg0)))
        .append("\" accessKey=\"")
        .append(com.google.gwt.safehtml.shared.SafeHtmlUtils.htmlEscape(String.valueOf(arg1)))
        .append("\">")
        .append(arg2.asString())
        .append("</div>")
        ;
    return new com.google.gwt.safehtml.shared.OnlyToBeUsedInGeneratedCodeStringBlessedAsSafeHtml(sb.toString());
  }
  
  public com.google.gwt.safehtml.shared.SafeHtml tr(java.lang.String arg0,com.google.gwt.safehtml.shared.SafeHtml arg1) {
    StringBuilder sb = new java.lang.StringBuilder()
        .append("<tr onclick=\"\" class=\"")
        .append(com.google.gwt.safehtml.shared.SafeHtmlUtils.htmlEscape(arg0))
        .append("\">")
        .append(arg1.asString())
        .append("</tr>")
        ;
    return new com.google.gwt.safehtml.shared.OnlyToBeUsedInGeneratedCodeStringBlessedAsSafeHtml(sb.toString());
  }
  
  public com.google.gwt.safehtml.shared.SafeHtml tfoot(com.google.gwt.safehtml.shared.SafeHtml arg0) {
    StringBuilder sb = new java.lang.StringBuilder()
        .append("<table><tfoot>")
        .append(arg0.asString())
        .append("</tfoot></table>")
        ;
    return new com.google.gwt.safehtml.shared.OnlyToBeUsedInGeneratedCodeStringBlessedAsSafeHtml(sb.toString());
  }
}
