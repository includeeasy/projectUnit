/**
 * Copyright (C) 2010 http://flowas.net/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * You can write to flowas@gmial.com for more customer requirement.
 */
/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package net.flowas.template.mock.persistence;

//import com.flowas.generic.entity.security.User;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.Serializable;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Set;
import java.util.TreeSet;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

/**
 * 
 * @author Administrator
 */
public class JaxbHelper {    

    @XmlAccessorType(XmlAccessType.FIELD)
    @XmlRootElement(name = "root", namespace = "http://flowas.com/publicData")
    public static class DataJaxb implements Serializable {

        private List<ClassList> classList = new ArrayList<ClassList>();
        private List data = new ArrayList();

        /**
         * @return the classList
         */
        public List<ClassList> getClassList() {
            return classList;
        }

        /**
         * @param classList the classList to set
         */
        public void setClassList(List<ClassList> classList) {
            this.classList = classList;
        }

        /**
         * @return the data
         */
        public List getData() {
            return data;
        }

        /**
         * @param data the data to set
         */
        public void setData(List data) {
            this.data = data;
        }
    }

    public static class ClassList {

        private List<String> clazz = new ArrayList<String>();

        /**
         * @return the clazz
         */
        @XmlElement(name = "class")
        public List<String> getClazz() {
            return clazz;
        }

        /**
         * @param clazz the clazz to set
         */
        public void setClazz(List<String> clazz) {
            this.clazz = clazz;
        }
    }

    /**
     *There is a example JaxbRoot class:<br/>
     *
     * @XmlRootElement(name = "data", namespace =
     *                      "http://flowas.com/publicData") public class
     *                      DataJaxb implements Serializable { private String
     *                      name; private List<Region> provinces = new
     *                      ArrayList<Region>(); ..... getters and setters .....
     *                      } and coordirate xml bindings are:<br/>
     *                      <?xml version="1.0" encoding="UTF-8"
     *                      standalone="yes"?> <ns2:data
     *                      xmlns:ns2="http://flowas.com/publicData">
     *                      <name>琛屾斂鍖�/name> <provinces> <title>鍖椾含甯�/title>
     *                      </provinces> </ns2:data>
     */
    public <T> T unmarshal(Class<T> jaxbRoot, InputStream in)
            throws JAXBException, IOException {
        JAXBContext context = JAXBContext.newInstance(jaxbRoot);
        Unmarshaller u = context.createUnmarshaller();
        byte[] b=new byte[in.available()];
        in.read(b);
        Object data = u.unmarshal(new ByteArrayInputStream(b));
        if (data instanceof DataJaxb) {
            DataJaxb methods = (DataJaxb) data;
            List<ClassList> cl = methods.getClassList();
            if (!cl.isEmpty()) {
                List<Class> classes = new ArrayList<Class>();
                List<String> clalis = cl.get(0).getClazz();
                for (Iterator<String> it = clalis.iterator(); it.hasNext();) {
                    try {
                        String string = it.next();
                        classes.add(Class.forName(string));
                    } catch (ClassNotFoundException ex) {
                        Logger.getLogger(JaxbHelper.class.getName()).log(Level.SEVERE, null, ex);
                    }
                }
                classes.add(jaxbRoot);
                Class[] cls = new Class[classes.size()];
                for (int i = 0; i < classes.size(); i++) {
                    cls[i] = classes.get(i);
                }
                context = JAXBContext.newInstance(cls);
                u = context.createUnmarshaller();
                data = u.unmarshal(new ByteArrayInputStream(b));
            }
        }
        return (T) data;
    }

    /**
     *
     * @param dataJaxb
     * @return
     * @throws JAXBException
     * @throws IOException
     *             DataJaxb example:
     * @XmlRootElement(name = "data", namespace =
     *                      "http://flowas.com/publicData") public class
     *                      DataJaxb implements Serializable { private String
     *                      name; private List<Region> provinces = new
     *                      ArrayList<Region>(); ...
     */
    public String marshal(Object dataJaxb) throws JAXBException, IOException {
        Set<String> classList = new TreeSet<String>();
        if (dataJaxb instanceof DataJaxb) {
            DataJaxb methods = (DataJaxb) dataJaxb;
            List datas = methods.getData();
            for (Iterator it = datas.iterator(); it.hasNext();) {
                Object object = it.next();
                String name = object.getClass().getName();
                classList.add(name);
            }
            List<ClassList> cl = methods.getClassList();
            if (cl.isEmpty()) {
                ClassList clalis = new ClassList();
                clalis.getClazz().addAll(classList);
                cl.add(clalis);
            } else {
                cl.get(0).getClazz().addAll(classList);
            }
        }
        List<Class> classes = new ArrayList<Class>();
        for (Iterator<String> it = classList.iterator(); it.hasNext();) {
            try {
                String string = it.next();
                classes.add(Class.forName(string));
            } catch (ClassNotFoundException ex) {
                Logger.getLogger(JaxbHelper.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
        classes.add(dataJaxb.getClass());
        Class[] cls = new Class[classes.size()];
        for (int i = 0; i < classes.size(); i++) {
            cls[i] = classes.get(i);
        }
        JAXBContext context = JAXBContext.newInstance(cls);       
        Marshaller m = context.createMarshaller();
        m.setProperty(Marshaller.JAXB_SCHEMA_LOCATION,"");
        StringWriter writer = new StringWriter();
        m.marshal(dataJaxb, writer);
        return writer.toString();
    }
}
