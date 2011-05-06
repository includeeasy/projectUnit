package net.flowas.ec2service;

import javax.jws.WebService;

import com.amazonaws.ec2.doc._2010_11_15.DescribeVolumesSetItemResponseType;
import com.amazonaws.ec2.doc._2010_11_15.DescribeVolumesSetResponseType;
import com.amazonaws.ec2.doc._2010_11_15.DescribeVolumesSetType;
import com.amazonaws.ec2.doc._2010_11_15.FilterSetType;
@WebService(serviceName = "AmazonEC2", portName = "AmazonEC2Port", endpointInterface = "com.amazonaws.ec2.doc._2010_11_15.AmazonEC2PortType", targetNamespace = "http://ec2.amazonaws.com/doc/2010-11-15/", wsdlLocation = "wsdl/s3.amazonaws.com/ec2-downloads/2010-11-15.ec2.wsdl")
public class MyEc2WebService  extends Ec2WebService{
	public void describeVolumes(
			DescribeVolumesSetType volumeSet,
			FilterSetType filterSet,
			javax.xml.ws.Holder<String> requestId,
			javax.xml.ws.Holder<DescribeVolumesSetResponseType> volumeSet0) {
		DescribeVolumesSetItemResponseType e = new DescribeVolumesSetItemResponseType();
		e.setVolumeId("ins1");
		DescribeVolumesSetResponseType value = new DescribeVolumesSetResponseType();
		value.getItem().add(e);
		volumeSet0.value = value;
	}
}
