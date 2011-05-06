package net.flowas.ec2service;

import java.net.URL;

import javax.xml.ws.Endpoint;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import com.amazonaws.ec2.doc._2010_11_15.AmazonEC2PortType;
import com.amazonaws.ec2.doc._2010_11_15.DescribeVolumesSetResponseType;
import com.amazonaws.ec2.doc._2010_11_15.DescribeVolumesSetType;
import com.amazonaws.ec2.doc._2010_11_15.FilterSetType;

public class NewMainTest {
	Endpoint endpoint;

	@Before
	public void setUp() throws Exception {
		endpoint = Endpoint.publish(
				"http://localhost:8085/ec2service/AmazonEC2",
				new MyEc2WebService());
	}

	@Test
	public void test() {
		try {
			URL url = new URL("http://localhost:8085/ec2service/AmazonEC2?wsdl");
			DescribeVolumesSetType volumeSet = null;
			FilterSetType filterSet = null;
			AmazonEC2 service = new AmazonEC2(url);
			AmazonEC2PortType port = service.getAmazonEC2Port();
			// TODO initialize WS operation arguments here
			javax.xml.ws.Holder<java.lang.String> requestId1 = new javax.xml.ws.Holder<java.lang.String>();
			javax.xml.ws.Holder<DescribeVolumesSetResponseType> volumeSet0 = new javax.xml.ws.Holder<DescribeVolumesSetResponseType>();
			port.describeVolumes(volumeSet, filterSet, requestId1, volumeSet0);
			System.out.println(volumeSet0.value.getItem().get(0).getVolumeId());
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}

	@After
	public void tearDown() throws Exception {
		endpoint.stop();
	}
}
