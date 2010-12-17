package net.flowas.template.mock.util;

public class Hello {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		String mn="exec(f,d)";
		String param="";
		if (mn.contains("(")) {
			String[] pair = mn.split("\\(");
			mn =pair[0];
			param= pair[1];
			param=param.replace(")","");
		}
		String[] paramArray;
		if(param.trim().equals("")){
			paramArray=new String[]{};
		}else if(param.contains(",")){
			paramArray = param.split(",");
		}else{
			paramArray=new String[]{param};
		}		
        System.out.println(paramArray.length);
	}
    private String[] methodParam(String mn) {
    	String param="";
		if (mn.contains("(")) {
			String[] pair = mn.split("\\(");
			mn =pair[0];
			param= pair[1];
			param=param.replace(")","");
		}
		String[] paramArray;
		if(param.trim().equals("")){
			paramArray=new String[]{};
		}else if(param.contains(",")){
			paramArray = param.split(",");
		}else{
			paramArray=new String[]{param};
		}
		return paramArray;
    }
}
