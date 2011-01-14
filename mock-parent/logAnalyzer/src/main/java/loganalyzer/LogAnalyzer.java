/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package loganalyzer;

import loganalyzer.lingpipe.StateMachineJFrame;

/**
 *
 * @author Administrator
 */
public class LogAnalyzer {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
    	java.awt.EventQueue.invokeLater(new Runnable() {

            public void run() {
                new StateMachineJFrame().setVisible(true);
            }
        });
    }

}
