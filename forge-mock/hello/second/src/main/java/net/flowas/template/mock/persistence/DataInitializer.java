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

import java.io.IOException;
import java.io.InputStream;
import java.util.Iterator;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.xml.bind.JAXBException;
import net.flowas.template.mock.persistence.JaxbHelper.DataJaxb;

/**
 *
 * @author Administrator
 */
public class DataInitializer {

    public static void insert(InputStream in) {
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("fortest");
        System.out.println("------------"+emf);
        EntityManager em = emf.createEntityManager();
        em.getTransaction().begin();  
        try {
            JaxbHelper dp = new JaxbHelper();
            DataJaxb jxb = dp.unmarshal(DataJaxb.class, in);
            List provinceList = jxb.getData();
            for (Iterator it = provinceList.iterator(); it.hasNext();) {
                 Object data = it.next();
                 em.persist(data);
                 em.getTransaction().commit();
                System.out.println(data);
            }        
        } catch (JAXBException ex) {
            Logger.getLogger(DataInitializer.class.getName()).log(Level.SEVERE,
                    null, ex);
        } catch (IOException ex) {
            Logger.getLogger(DataInitializer.class.getName()).log(Level.SEVERE,
                    null, ex);
        } finally {
            em.close();
        } 
    }
    public static EntityManagerFactory createEntityManagerFactory(String unit){
        return Persistence.createEntityManagerFactory("fortest",null);
    }    
}
