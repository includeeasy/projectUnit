
package net.flowas.ec2service;

import java.net.MalformedURLException;
import java.net.URL;
import javax.xml.namespace.QName;
import javax.xml.ws.Service;
import javax.xml.ws.WebEndpoint;
import javax.xml.ws.WebServiceClient;
import javax.xml.ws.WebServiceException;
import javax.xml.ws.WebServiceFeature;

import com.amazonaws.ec2.doc._2010_11_15.AmazonEC2PortType;


/**
 * This class was generated by the JAX-WS RI.
 * JAX-WS RI 2.2-hudson-752-
 * Generated source version: 2.2
 * 
 */
@WebServiceClient(name = "AmazonEC2", targetNamespace = "http://ec2.amazonaws.com/doc/2010-11-15/", wsdlLocation = "http://localhost:8080/ec2service/AmazonEC2?wsdl")
public class AmazonEC2
    extends Service
{

    private final static URL AMAZONEC2_WSDL_LOCATION;
    private final static WebServiceException AMAZONEC2_EXCEPTION;
    private final static QName AMAZONEC2_QNAME = new QName("http://ec2.amazonaws.com/doc/2010-11-15/", "AmazonEC2");

    static {
        URL url = null;
        WebServiceException e = null;
        try {
            url = new URL("http://localhost:8080/ec2service/AmazonEC2?wsdl");
        } catch (MalformedURLException ex) {
            e = new WebServiceException(ex);
        }
        AMAZONEC2_WSDL_LOCATION = url;
        AMAZONEC2_EXCEPTION = e;
    }

    public AmazonEC2() {
        super(__getWsdlLocation(), AMAZONEC2_QNAME);
    }

    public AmazonEC2(WebServiceFeature... features) {
        super(__getWsdlLocation(), AMAZONEC2_QNAME);
    }

    public AmazonEC2(URL wsdlLocation) {
        super(wsdlLocation, AMAZONEC2_QNAME);
    }

    public AmazonEC2(URL wsdlLocation, WebServiceFeature... features) {
        super(wsdlLocation, AMAZONEC2_QNAME);
    }

    public AmazonEC2(URL wsdlLocation, QName serviceName) {
        super(wsdlLocation, serviceName);
    }

    public AmazonEC2(URL wsdlLocation, QName serviceName, WebServiceFeature... features) {
        super(wsdlLocation, serviceName);
    }

    /**
     * 
     * @return
     *     returns AmazonEC2PortType
     */
    @WebEndpoint(name = "AmazonEC2Port")
    public AmazonEC2PortType getAmazonEC2Port() {
        return super.getPort(new QName("http://ec2.amazonaws.com/doc/2010-11-15/", "AmazonEC2Port"), AmazonEC2PortType.class);
    }

    /**
     * 
     * @param features
     *     A list of {@link javax.xml.ws.WebServiceFeature} to configure on the proxy.  Supported features not in the <code>features</code> parameter will have their default values.
     * @return
     *     returns AmazonEC2PortType
     */
    @WebEndpoint(name = "AmazonEC2Port")
    public AmazonEC2PortType getAmazonEC2Port(WebServiceFeature... features) {
        return super.getPort(new QName("http://ec2.amazonaws.com/doc/2010-11-15/", "AmazonEC2Port"), AmazonEC2PortType.class, features);
    }

    private static URL __getWsdlLocation() {
        if (AMAZONEC2_EXCEPTION!= null) {
            throw AMAZONEC2_EXCEPTION;
        }
        return AMAZONEC2_WSDL_LOCATION;
    }

}