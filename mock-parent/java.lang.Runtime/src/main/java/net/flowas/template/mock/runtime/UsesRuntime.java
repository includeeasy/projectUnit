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
package net.flowas.template.mock.runtime;

import java.io.InputStream;

public class UsesRuntime {
	public void run() throws Exception {
		Runtime rt = Runtime.getRuntime();
		Process p = rt.exec("notepad");
		InputStream in = p.getInputStream();
		byte[] b = new byte[in.available()];
		in.read(b);
		System.out.println("standInfo:" + new String(b));
	}
}
