package com.flowas.testgen.model.framework;

import java.util.Map;
import java.util.Set;

import com.flowas.testgen.model.GeneEnum;


public interface Technology {
 void isolate(String testname,Map<String, Set<String>> docList,Map<GeneEnum, Object>  template);
}
