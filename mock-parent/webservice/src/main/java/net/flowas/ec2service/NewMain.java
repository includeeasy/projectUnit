/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.flowas.ec2service;

import javax.xml.ws.Endpoint;

/**
 *
 * @author Administrator
 */
public class NewMain {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
       Endpoint d = Endpoint.publish(
         "http://localhost:8085/WebServiceExample/circlefunctions",
         new Ec2WebService()); 
    }
}
