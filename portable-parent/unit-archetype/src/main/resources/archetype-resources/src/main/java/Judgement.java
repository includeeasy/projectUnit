/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package ${package};

/**
 *
 * @author Administrator
 */
public class Judgement {
    public static boolean isFault(String errorType){
        if("NoSda9".equals(errorType)){        	
        	return noSda9();
        }else if("DiskSmallerThan500G".equals(errorType)){
            return false;
        }else if("WriteProtected".equals(errorType)){
            return true;
        }else{
            return false;
        }
    }
    private static boolean noSda9(){
    	//Runtime.getRuntime().exec("");
    	return true;
    }
}
