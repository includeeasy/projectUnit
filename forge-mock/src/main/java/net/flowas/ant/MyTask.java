package net.flowas.ant;

import java.util.ArrayList;
import java.util.List;

import org.apache.tools.ant.Task;

public class MyTask extends Task {   
    private String msg;
	public void execute() {
       System.out.println("-------------------------");
       System.out.println(msg);
    }
    // The setter for the "message" attribute
    public void setMessage(String msg) {
        this.msg = msg;
    }
}
