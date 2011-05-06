/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.flowas.ec2service;

import java.net.URL;

import com.amazonaws.ec2.doc._2010_11_15.AmazonEC2PortType;
import com.amazonaws.ec2.doc._2010_11_15.DescribeVolumesSetResponseType;
import com.amazonaws.ec2.doc._2010_11_15.DescribeVolumesSetType;
import com.amazonaws.ec2.doc._2010_11_15.FilterSetType;

/**
 *
 * @author Administrator
 */
public class Ec2client {
	
    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {

        try {
        	URL url = new URL("http://localhost:8080/ec2service/AmazonEC2?wsdl");
            
        	com.amazonaws.ec2.doc._2010_11_15.DescribeVolumesSetType volumeSet = null;
            com.amazonaws.ec2.doc._2010_11_15.FilterSetType filterSet = null;
            com.amazonaws.ec2.doc._2010_11_15.AmazonEC2 service = new com.amazonaws.ec2.doc._2010_11_15.AmazonEC2();
            com.amazonaws.ec2.doc._2010_11_15.AmazonEC2PortType port = service.getAmazonEC2Port();
            // TODO initialize WS operation arguments here
            javax.xml.ws.Holder<java.lang.String> requestId1 = new javax.xml.ws.Holder<java.lang.String>();
            javax.xml.ws.Holder<com.amazonaws.ec2.doc._2010_11_15.DescribeVolumesSetResponseType> volumeSet0 = new javax.xml.ws.Holder<com.amazonaws.ec2.doc._2010_11_15.DescribeVolumesSetResponseType>();
            port.describeVolumes(volumeSet, filterSet, requestId1, volumeSet0);
            System.out.println(volumeSet0.value.getItem().get(0).getVolumeId());
        } catch (Exception ex) {
            ex.printStackTrace();
        }

    }

    private static void describeVolumes(DescribeVolumesSetType volumeSet, FilterSetType filterSet, javax.xml.ws.Holder<java.lang.String> requestId, javax.xml.ws.Holder<DescribeVolumesSetResponseType> volumeSet0) {
        AmazonEC2 service = new AmazonEC2();
        AmazonEC2PortType port = service.getAmazonEC2Port();
        port.describeVolumes(volumeSet, filterSet, requestId, volumeSet0);
    }
}
