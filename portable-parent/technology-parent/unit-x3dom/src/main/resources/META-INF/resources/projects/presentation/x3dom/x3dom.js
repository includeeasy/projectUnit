/** X3DOM Runtime, http://www.x3dom.org/ 1.2-alpha - 928 */
if(!Array.forEach){Array.forEach=function(array,fun,thisp){var len=array.length;for(var i=0;i<len;i++){if(i in array){fun.call(thisp,array[i],i,array);}}};}
if(!Array.map){Array.map=function(array,fun,thisp){var len=array.length;var res=[];for(var i=0;i<len;i++){if(i in array){res[i]=fun.call(thisp,array[i],i,array);}}
return res;};}
if(!Array.filter){Array.filter=function(array,fun,thisp){var len=array.length;var res=[];for(var i=0;i<len;i++){if(i in array){var val=array[i];if(fun.call(thisp,val,i,array)){res.push(val);}}}
return res;};}
var x3dom={canvases:[]};x3dom.extend=function(f){function g(){}
g.prototype=f.prototype||f;return new g();};x3dom.x3dNS='http://www.web3d.org/specifications/x3d-namespace';x3dom.x3dextNS='http://philip.html5.org/x3d/ext';x3dom.xsltNS='http://www.w3.org/1999/XSL/x3dom.Transform';x3dom.xhtmlNS='http://www.w3.org/1999/xhtml';x3dom.X3DCanvas=function(x3dElem){var that=this;this.initContext=function(canvas){x3dom.debug.logInfo("Initializing X3DCanvas for ["+canvas.id+"]");var gl=x3dom.gfx_webgl(canvas);if(!gl){x3dom.debug.logError("No 3D context found...");this.x3dElem.removeChild(canvas);return null;}
return gl;};this.createHTMLCanvas=function(x3dElem)
{x3dom.debug.logInfo("Creating canvas for (X)3D element...");var canvas=document.createElement('canvas');canvas.setAttribute("class","x3dom-canvas");var userStyle=x3dElem.getAttribute("style");if(userStyle){x3dom.debug.logInfo("Inline X3D styles detected");}
var evtArr=["mousedown","mousemove","mouseout","mouseover","mouseup","click","dblclick","keydown","keypress","keyup"];for(var i=0;i<evtArr.length;i++)
{var evtName="on"+evtArr[i];var userEvt=x3dElem.getAttribute(evtName);if(userEvt)
{x3dom.debug.logInfo(evtName+", "+userEvt);canvas.setAttribute(evtName,userEvt);}}
if(!x3dElem.__addEventListener&&!x3dElem.__removeEventListener)
{x3dElem.__addEventListener=x3dElem.addEventListener;x3dElem.__removeEventListener=x3dElem.removeEventListener;x3dElem.addEventListener=function(type,func,phase){var j,found=false;for(j=0;j<evtArr.length&&!found;j++){if(evtArr[j]===type){found=true;}}
if(found){x3dom.debug.logInfo('addEventListener for div.on'+type);that.canvas.addEventListener(type,func,phase);}else{x3dom.debug.logInfo('addEventListener for X3D.on'+type);this.__addEventListener(type,func,phase);}};x3dElem.removeEventListener=function(type,func,phase){var j,found=false;for(j=0;j<evtArr.length&&!found;j++){if(evtArr[j]===type){found=true;}}
if(found){x3dom.debug.logInfo('removeEventListener for div.on'+type);that.canvas.removeEventListener(type,func,phase);}else{x3dom.debug.logInfo('removeEventListener for X3D.on'+type);this.__removeEventListener(type,func,phase);}};}
x3dElem.appendChild(canvas);var id=x3dElem.getAttribute("id");if(id!==null){canvas.id="x3dom-"+id+"-canvas";}else{var index=new Date().getTime();canvas.id="x3dom-"+index+"-canvas";}
var w=2;var h=2;if((w=x3dElem.getAttribute("width"))!==null){canvas.style.width=w;canvas.setAttribute("width",w);}
if((h=x3dElem.getAttribute("height"))!==null){canvas.style.height=h;canvas.setAttribute("height",h);}
canvas.setAttribute("tabindex","0");return canvas;};var _old_dim=[0,0];this.watchForResize=function(){var new_dim=[x3dom.getStyle(that.canvas,"width"),x3dom.getStyle(that.canvas,"height")];if((_old_dim[0]!=new_dim[0])||(_old_dim[1]!=new_dim[1])){_old_dim=new_dim;that.x3dElem.setAttribute("width",new_dim[0]);that.x3dElem.setAttribute("height",new_dim[1]);}};this.createStatDiv=function(){var statDiv=document.createElement('div');statDiv.setAttribute("class","x3dom-statdiv");statDiv.innerHTML="0 fps";this.x3dElem.appendChild(statDiv);statDiv.oncontextmenu=statDiv.onmousedown=function(evt){evt.preventDefault();evt.stopPropagation();evt.returnValue=false;return false;};return statDiv;};this.x3dElem=x3dElem;this.canvas=this.createHTMLCanvas(x3dElem);this.canvas.parent=this;this.fps_t0=new Date().getTime();this.gl=this.initContext(this.canvas);this.doc=null;x3dElem.__setAttribute=x3dElem.setAttribute;x3dElem.setAttribute=function(attrName,newVal){this.__setAttribute(attrName,newVal);switch(attrName){case"width":that.canvas.setAttribute("width",newVal);if(that.doc._viewarea){that.doc._viewarea._width=parseInt(that.canvas.getAttribute("width"),0);}
break;case"height":that.canvas.setAttribute("height",newVal);if(that.doc._viewarea){that.doc._viewarea._height=parseInt(that.canvas.getAttribute("height"),0);}
break;default:}
that.doc.needRender=true;};var runtimeEnabled=x3dElem.getAttribute("runtimeEnabled");if(runtimeEnabled!==null){this.hasRuntime=(runtimeEnabled.toLowerCase()=="true");}else{this.hasRuntime=x3dElem.hasRuntime;}
if(this.gl===null){this.hasRuntime=false;}
this.showStat=x3dElem.getAttribute("showStat");this.statDiv=this.createStatDiv();this.statDiv.style.display=(this.showStat!==null&&this.showStat=="true")?"inline":"none";if(this.canvas!==null&&this.gl!==null&&this.hasRuntime){this.canvas.mouse_dragging=false;this.canvas.mouse_button=0;this.canvas.mouse_drag_x=0;this.canvas.mouse_drag_y=0;this.canvas.oncontextmenu=function(evt){evt.preventDefault();evt.stopPropagation();evt.returnValue=false;return false;};this.canvas.addEventListener('mousedown',function(evt){this.focus();switch(evt.button){case 0:this.mouse_button=1;break;case 1:this.mouse_button=4;break;case 2:this.mouse_button=2;break;default:this.mouse_button=0;break;}
this.mouse_drag_x=evt.layerX;this.mouse_drag_y=evt.layerY;this.mouse_dragging=true;if(evt.shiftKey){this.mouse_button=1;}
if(evt.ctrlKey){this.mouse_button=4;}
if(evt.altKey){this.mouse_button=2;}
this.parent.doc.onMousePress(that.gl,this.mouse_drag_x,this.mouse_drag_y,this.mouse_button);this.parent.doc.needRender=true;window.status=this.id+' DOWN: '+evt.layerX+", "+evt.layerY;evt.returnValue=true;},false);this.canvas.addEventListener('mouseup',function(evt){this.mouse_button=0;this.mouse_dragging=false;this.parent.doc.onMouseRelease(that.gl,this.mouse_drag_x,this.mouse_drag_y,this.mouse_button);this.parent.doc.needRender=true;evt.returnValue=true;},false);this.canvas.addEventListener('mouseover',function(evt){this.mouse_button=0;this.mouse_dragging=false;this.parent.doc.onMouseOver(that.gl,this.mouse_drag_x,this.mouse_drag_y,this.mouse_button);this.parent.doc.needRender=true;evt.returnValue=true;},false);this.canvas.addEventListener('mouseout',function(evt){this.mouse_button=0;this.mouse_dragging=false;this.parent.doc.onMouseOut(that.gl,this.mouse_drag_x,this.mouse_drag_y,this.mouse_button);this.parent.doc.needRender=true;evt.returnValue=true;},false);this.canvas.addEventListener('dblclick',function(evt){this.mouse_button=0;this.mouse_drag_x=evt.layerX;this.mouse_drag_y=evt.layerY;this.mouse_dragging=false;this.parent.doc.onDoubleClick(that.gl,this.mouse_drag_x,this.mouse_drag_y);this.parent.doc.needRender=true;window.status=this.id+' DBL: '+evt.layerX+", "+evt.layerY;evt.returnValue=true;},false);this.canvas.addEventListener('mousemove',function(evt){window.status=this.id+' MOVE: '+evt.layerX+", "+evt.layerY;this.mouse_drag_x=evt.layerX;this.mouse_drag_y=evt.layerY;if(evt.shiftKey){this.mouse_button=1;}
if(evt.ctrlKey){this.mouse_button=4;}
if(evt.altKey){this.mouse_button=2;}
if(this.mouse_dragging){this.parent.doc.onDrag(that.gl,this.mouse_drag_x,this.mouse_drag_y,this.mouse_button);}else{this.parent.doc.onMove(that.gl,this.mouse_drag_x,this.mouse_drag_y,this.mouse_button);}
this.parent.doc.needRender=true;evt.returnValue=true;},false);this.canvas.addEventListener('DOMMouseScroll',function(evt){this.mouse_drag_y+=2*evt.detail;this.parent.doc.onDrag(that.gl,this.mouse_drag_x,this.mouse_drag_y,2);this.parent.doc.needRender=true;window.status=this.id+' SCROLL: '+evt.detail;evt.returnValue=true;},false);this.canvas.addEventListener('mousewheel',function(evt){this.mouse_drag_y-=0.1*evt.wheelDeltaY;this.parent.doc.onDrag(that.gl,this.mouse_drag_x,this.mouse_drag_y,2);this.parent.doc.needRender=true;window.status=this.id+' SCROLL: '+evt.detail;evt.returnValue=true;},false);this.canvas.addEventListener('keypress',function(evt){var keysEnabled=this.parent.x3dElem.getAttribute("keysEnabled");if(!keysEnabled||keysEnabled.toLowerCase()==="true"){this.parent.doc.onKeyPress(evt.charCode);}
this.parent.doc.needRender=true;evt.returnValue=true;},true);this.canvas.addEventListener('keyup',function(evt){var keysEnabled=this.parent.x3dElem.getAttribute("keysEnabled");if(!keysEnabled||keysEnabled.toLowerCase()==="true"){this.parent.doc.onKeyUp(evt.keyCode);}
this.parent.doc.needRender=true;evt.returnValue=true;},true);}};x3dom.X3DCanvas.prototype.tick=function()
{var d=new Date().getTime();var fps=1000.0/(d-this.fps_t0);this.fps_t0=d;try{this.doc.advanceTime(d/1000);var animD=new Date().getTime()-d;if(this.doc.needRender){if(this.statDiv){this.statDiv.textContent=fps.toFixed(2)+' fps';this.statDiv.appendChild(document.createElement("br"));this.statDiv.appendChild(document.createTextNode("anim: "+animD));}
this.doc.needRender=false;this.doc.render(this.gl);}else{if(this.statDiv){if(this.doc.lastDownloadCount!==this.doc.downloadCount){this.statDiv.textContent='dlc: '+this.doc.downloadCount;}
this.doc.lastDownloadCount=this.doc.downloadCount;}}}catch(e){x3dom.debug.logException(e);throw e;}};x3dom.X3DCanvas.prototype.load=function(uri,sceneElemPos){this.doc=new x3dom.X3DDocument(this.canvas,this.gl);var x3dCanvas=this;this.doc.onload=function(){x3dom.debug.logInfo("loaded '"+uri+"'");if(x3dCanvas.hasRuntime){setInterval(function(){x3dCanvas.watchForResize();x3dCanvas.tick();},16);}else{x3dCanvas.tick();}};this.x3dElem.render=function(){if(x3dCanvas.hasRuntime){x3dCanvas.doc.needRender=true;}else{x3dCanvas.doc.render(x3dCanvas.gl);}};this.x3dElem.context=x3dCanvas.gl.ctx3d;this.doc.onerror=function(){alert('Failed to load X3D document');};this.doc.load(uri,sceneElemPos);};x3dom.detectActiveX=function(){var isInstalled=false;if(window.ActiveXObject){var control=null;try{control=new ActiveXObject('AVALONATX.InstantPluginATXCtrl.1');}catch(e){}
if(control){isInstalled=true;}}
return isInstalled;};x3dom.rerouteSetAttribute=function(node){node._setAttribute=node.setAttribute;node.setAttribute=function(name,value){return node._x3domNode.parseField(name,value);};for(var i=0;i<node.childNodes.length;i++){var child=node.childNodes[i];x3dom.rerouteSetAttribute(child);}};x3dom.insertActiveX=function(x3d){if(typeof x3dom.atxCtrlCounter=='undefined'){x3dom.atxCtrlCounter=0;}
var height=x3d.getAttribute("height");var width=x3d.getAttribute("width");var parent=x3d.parentNode;var divelem=document.createElement("div");divelem.setAttribute("id","x3dplaceholder");var inserted=parent.insertBefore(divelem,x3d);var atx=document.createElement("object");var containerName="Avalon"+x3dom.atxCtrlCounter;x3dom.atxCtrlCounter++;atx.setAttribute("id",containerName);atx.setAttribute("classid","CLSID:F3254BA0-99FF-4D14-BD81-EDA9873A471E");atx.setAttribute("width",width?width:"500");atx.setAttribute("height",height?height:"500");inserted.appendChild(atx);var atxctrl=document.getElementById(containerName);var browser=atxctrl.getBrowser();var scene=browser.importDocument(x3d);browser.replaceWorld(scene);x3d.getBrowser=function(){return atxctrl.getBrowser();};x3dom.rerouteSetAttribute(x3d);};x3dom.userAgentFeature={supportsDOMAttrModified:false};(function(){var onload=function(){var x3ds=document.getElementsByTagName('X3D');var w3sg=document.getElementsByTagName('webSG');if(window.navigator.userAgent.match(/webkit/i)){x3dom.debug.logInfo("Active DOMAttrModifiedEvent workaround for webkit ");x3dom.userAgentFeature.supportsDOMAttrModified=false;}
x3ds=Array.map(x3ds,function(n){n.hasRuntime=true;return n;});w3sg=Array.map(w3sg,function(n){n.hasRuntime=false;return n;});var i=0;for(i=0;i<w3sg.length;i++){x3ds.push(w3sg[i]);}
var activateLog=false;for(i=0;i<x3ds.length;i++){var showLog=x3ds[i].getAttribute("showLog");if(showLog!==null&&showLog.toLowerCase()=="true"){activateLog=true;break;}}
x3dom.debug.activate(activateLog);if(x3dom.versionInfo!==undefined){x3dom.debug.logInfo("X3Dom version "+x3dom.versionInfo.version+" Rev. "+x3dom.versionInfo.svnrevision);}
x3dom.debug.logInfo("Found "+(x3ds.length-w3sg.length)+" X3D and "+
w3sg.length+" (experimental) WebSG nodes...");for(i=0;i<x3ds.length;i++)
{var x3d_element=x3ds[i];if(x3dom.detectActiveX()){x3dom.insertActiveX(x3d_element);continue;}
var x3dcanvas=new x3dom.X3DCanvas(x3d_element);if(x3dcanvas.gl===null){var altDiv=document.createElement("div");altDiv.setAttribute("class","x3dom-nox3d");var altP=document.createElement("p");altP.appendChild(document.createTextNode("WebGL is not yet supported in your browser. "));var aLnk=document.createElement("a");aLnk.setAttribute("href","http://www.x3dom.org/?page_id=9");aLnk.appendChild(document.createTextNode("Follow link for a list of supported browsers... "));altDiv.appendChild(altP);altDiv.appendChild(aLnk);x3dcanvas.x3dElem.appendChild(altDiv);if(x3dcanvas.statDiv){x3d_element.removeChild(x3dcanvas.statDiv);}
var altImg=x3ds[i].getAttribute("altImg")||null;if(altImg){var altImgObj=new Image();altImgObj.src=altImg;x3d_element.style.backgroundImage="url("+altImg+")";}
continue;}
var t0=new Date().getTime();x3dcanvas.load(x3ds[i],i);x3dom.canvases.push(x3dcanvas);var t1=new Date().getTime()-t0;x3dom.debug.logInfo("Time for setup and init of GL element no. "+i+": "+t1+" ms.");}
var ready=(function(eventType){var evt=null;if(document.createEvent){evt=document.createEvent("Events");evt.initEvent(eventType,true,true);document.dispatchEvent(evt);}
else if(document.createEventObject){evt=document.createEventObject();document.body.fireEvent('on'+eventType,evt);}})('load');};var onunload=function(){for(var i=0;i<x3dom.canvases.length;i++){x3dom.canvases[i].doc.shutdown(x3dom.canvases[i].gl);}};if(window.location.pathname.lastIndexOf(".xhtml")>0){document.__getElementById=document.getElementById;document.getElementById=function(id){var obj=this.__getElementById(id);if(!obj){var elems=this.getElementsByTagName("*");for(var i=0;i<elems.length&&!obj;i++){if(elems[i].getAttribute("id")===id){obj=elems[i];}}}
return obj;};}
if(window.addEventListener){window.addEventListener('load',onload,false);window.addEventListener('unload',onunload,false);window.addEventListener('reload',onunload,false);}else if(window.attachEvent){window.attachEvent('onload',onload);window.attachEvent('onunload',onunload);window.attachEvent('onreload',onunload);}})();x3dom.versionInfo={version:'1.2-alpha',svnrevision:'928'};x3dom.debug={INFO:"INFO",WARNING:"WARNING",ERROR:"ERROR",EXCEPTION:"EXCEPTION",isActive:false,isFirebugAvailable:false,isSetup:false,numLinesLogged:0,maxLinesToLog:400,logContainer:null,setup:function(){if(x3dom.debug.isSetup){return;}
try{if(console){x3dom.debug.isFirebugAvailable=true;}}
catch(err){x3dom.debug.isFirebugAvailable=false;}
x3dom.debug.setupLogContainer();x3dom.debug.isSetup=true;},activate:function(visible){x3dom.debug.isActive=true;var aDiv=document.createElement("div");aDiv.style.clear="both";aDiv.appendChild(document.createTextNode("\r\n"));aDiv.style.display=(visible)?"block":"none";x3dom.debug.logContainer.style.display=(visible)?"block":"none";document.body.appendChild(aDiv);document.body.appendChild(x3dom.debug.logContainer);},setupLogContainer:function(){x3dom.debug.logContainer=document.createElement("div");x3dom.debug.logContainer.id="x3dom_logdiv";x3dom.debug.logContainer.style.border="2px solid olivedrab";x3dom.debug.logContainer.style.height="180px";x3dom.debug.logContainer.style.padding="4px";x3dom.debug.logContainer.style.overflow="auto";x3dom.debug.logContainer.style.whiteSpace="pre-wrap";x3dom.debug.logContainer.style.fontFamily="sans-serif";x3dom.debug.logContainer.style.fontSize="x-small";x3dom.debug.logContainer.style.color="#00ff00";x3dom.debug.logContainer.style.backgroundColor="black";x3dom.debug.logContainer.style.clear="both";x3dom.debug.logContainer.style.marginRight="10px";},doLog:function(msg,logType){if(!x3dom.debug.isActive){return;}
if(x3dom.debug.numLinesLogged===x3dom.debug.maxLinesToLog){msg="Maximum number of log lines (="+x3dom.debug.maxLinesToLog+") reached. Deactivating logging...";}
if(x3dom.debug.numLinesLogged>x3dom.debug.maxLinesToLog){return;}
var node=document.createElement("p");node.style.margin=0;switch(logType){case x3dom.debug.INFO:node.style.color="#00ff00";break;case x3dom.debug.WARNING:node.style.color="#cd853f";break;case x3dom.debug.ERROR:node.style.color="#ff4500";break;case x3dom.debug.EXCEPTION:node.style.color="#ffff00";break;default:node.style.color="#00ff00";break;}
try{node.innerHTML=logType+": "+msg;x3dom.debug.logContainer.insertBefore(node,x3dom.debug.logContainer.firstChild);}catch(err){if(console){console.warn(msg);}}
if(x3dom.debug.isFirebugAvailable){switch(logType){case x3dom.debug.INFO:console.info(msg);break;case x3dom.debug.WARNING:console.warn(msg);break;case x3dom.debug.ERROR:console.error(msg);break;case x3dom.debug.EXCEPTION:console.debug(msg);break;default:break;}}
x3dom.debug.numLinesLogged++;},logInfo:function(msg){x3dom.debug.doLog(msg,x3dom.debug.INFO);},logWarning:function(msg){x3dom.debug.doLog(msg,x3dom.debug.WARNING);},logError:function(msg){x3dom.debug.doLog(msg,x3dom.debug.ERROR);},logException:function(msg){x3dom.debug.doLog(msg,x3dom.debug.EXCEPTION);},assert:function(c,msg){if(!c){x3dom.debug.doLog("Assertion failed in "+
x3dom.debug.assert.caller.name+': '+
msg,x3dom.debug.ERROR);}},typeOf:function(obj){var type=typeof obj;return type==="object"&&!obj?"null":type;},exists:function(obj,name,type){type=type||"function";return(obj?this.typeOf(obj[name]):"null")===type;}};x3dom.debug.setup();x3dom.gfx_webgl=(function(){function Context(ctx3d,canvas,name){this.ctx3d=ctx3d;this.canvas=canvas;this.name=name;this.cached_shader_programs={};this.cached_shaders={};}
Context.prototype.getName=function(){return this.name;};function setupContext(canvas){var validContextNames=['moz-webgl','webkit-3d','experimental-webgl','webgl'];var ctx=null;var ctxAttribs={alpha:true,depth:true,stencil:true,antialias:true,premultipliedAlpha:false};for(var i=0;i<validContextNames.length;i++){try{ctx=canvas.getContext(validContextNames[i],ctxAttribs);if(ctx){var newCtx=new Context(ctx,canvas,'webgl');try{if(ctx.getString){x3dom.debug.logInfo("\nVendor: "+ctx.getString(ctx.VENDOR)+", "+"Renderer: "+ctx.getString(ctx.RENDERER)+", "+"Version: "+ctx.getString(ctx.VERSION)+", "+"ShadingLangV.: "+ctx.getString(ctx.SHADING_LANGUAGE_VERSION)+", "+"\nExtensions: "+ctx.getString(ctx.EXTENSIONS));}
else{x3dom.debug.logInfo("\nVendor: "+ctx.getParameter(ctx.VENDOR)+", "+"Renderer: "+ctx.getParameter(ctx.RENDERER)+", "+"Version: "+ctx.getParameter(ctx.VERSION)+", "+"ShadingLangV.: "+ctx.getParameter(ctx.SHADING_LANGUAGE_VERSION));}}
catch(ex){x3dom.debug.logWarning("Your browser probably supports an older WebGL version. "+"Please try the mobile runtime instead:\n"+"http://www.x3dom.org/x3dom/src_mobile/x3dom.js");}
return newCtx;}}
catch(e){}}
return null;}
var g_shaders={};g_shaders['vs-x3d-bg-texture']={type:"vertex",data:"attribute vec3 position;"+"varying vec2 fragTexCoord;"+""+"void main(void) {"+"    gl_Position = vec4(position.xy, 0.0, 1.0);"+"    vec2 texCoord = (position.xy + 1.0) * 0.5;"+"    fragTexCoord = texCoord;"+"}"};g_shaders['vs-x3d-bg-texture-bgnd']={type:"vertex",data:"attribute vec3 position;"+"attribute vec2 texcoord;"+"uniform mat4 modelViewProjectionMatrix;"+"varying vec2 fragTexCoord;"+""+"void main(void) {"+"    fragTexCoord = texcoord.xy;"+"    gl_Position = modelViewProjectionMatrix * vec4(position, 1.0);"+"}"};g_shaders['fs-x3d-bg-texture']={type:"fragment",data:"#ifdef GL_ES             \n"+"  precision highp float; \n"+"#endif                   \n"+"\n"+"uniform sampler2D tex;"+"varying vec2 fragTexCoord;"+""+"void main(void) {"+"    gl_FragColor = texture2D(tex, fragTexCoord);"+"}"};g_shaders['vs-x3d-bg-textureCube']={type:"vertex",data:"attribute vec3 position;"+"uniform mat4 modelViewProjectionMatrix;"+"varying vec3 fragNormal;"+""+"void main(void) {"+"    fragNormal = (vec4(normalize(position), 0.0)).xyz;"+"    gl_Position = modelViewProjectionMatrix * vec4(position, 1.0);"+"}"};g_shaders['fs-x3d-bg-textureCube']={type:"fragment",data:"#ifdef GL_ES             \n"+"  precision highp float; \n"+"#endif                   \n"+"\n"+"uniform samplerCube tex;"+"varying vec3 fragNormal;"+""+"void main(void) {"+"    vec3 normal = -reflect(normalize(fragNormal), vec3(0.0,0.0,1.0));"+"    if (abs(normal.y) >= abs(normal.x) && abs(normal.y) >= abs(normal.z))"+"        normal.x *= -1.0;"+"    gl_FragColor = textureCube(tex, normal);"+"}"};g_shaders['vs-x3d-vertexcolorUnlit']={type:"vertex",data:"attribute vec3 position;"+"attribute vec3 color;"+"varying vec3 fragColor;"+"uniform mat4 modelViewProjectionMatrix;"+""+"void main(void) {"+"    gl_Position = modelViewProjectionMatrix * vec4(position, 1.0);"+"    gl_PointSize = 2.0;"+"    fragColor = color;"+"}"};g_shaders['fs-x3d-vertexcolorUnlit']={type:"fragment",data:"#ifdef GL_ES             \n"+"  precision highp float; \n"+"#endif                   \n"+"\n"+"uniform vec3 diffuseColor;"+"uniform float alpha;"+"uniform float lightOn;"+"varying vec3 fragColor;"+""+"void main(void) {"+"    gl_FragColor = vec4(fragColor, alpha);"+"}"};g_shaders['vs-x3d-default']={type:"vertex",data:"attribute vec3 position;"+"uniform mat4 modelViewProjectionMatrix;"+"void main(void) {"+"    gl_Position = modelViewProjectionMatrix * vec4(position, 1.0);"+"}"};g_shaders['fs-x3d-default']={type:"fragment",data:"#ifdef GL_ES             \n"+"  precision highp float; \n"+"#endif                   \n"+"\n"+"struct Material {"+"   vec3  diffuseColor;"+"   vec3  specularColor;"+"   vec3  emissiveColor;"+"   float shininess;"+"   float transparency;"+"   float ambientIntensity;"+"};"+"uniform Material material;"+"void main(void) {"+"    gl_FragColor = vec4(material.emissiveColor, 1.0);"+"}"};g_shaders['vs-x3d-texcoordUnlit']={type:"vertex",data:"attribute vec3 position;"+"attribute vec2 texcoord;"+"varying vec3 fragColor;"+"uniform mat4 modelViewProjectionMatrix;"+""+"void main(void) {"+"    gl_Position = modelViewProjectionMatrix * vec4(position, 1.0);"+"    fragColor = vec3(abs(texcoord.x), abs(texcoord.y), 0.0);"+"}"};g_shaders['fs-x3d-texcoordUnlit']={type:"fragment",data:"#ifdef GL_ES             \n"+"  precision highp float; \n"+"#endif                   \n"+"\n"+"uniform float alpha;"+"varying vec3 fragColor;"+""+"void main(void) {"+"    gl_FragColor = vec4(fragColor, alpha);"+"}"};g_shaders['vs-x3d-pick']={type:"vertex",data:"attribute vec3 position;"+"uniform mat4 modelMatrix;"+"uniform mat4 modelViewProjectionMatrix;"+"uniform vec3 wcMin;"+"uniform vec3 wcMax;"+"varying vec3 worldCoord;"+"void main(void) {"+"    worldCoord = (modelMatrix * vec4(position, 1.0)).xyz;"+"    vec3 dia = wcMax - wcMin;"+"    worldCoord = worldCoord - wcMin;"+"    worldCoord.x /= dia.x;"+"    worldCoord.y /= dia.y;"+"    worldCoord.z /= dia.z;"+"    gl_Position = modelViewProjectionMatrix * vec4(position, 1.0);"+"}"};g_shaders['fs-x3d-pick']={type:"fragment",data:"#ifdef GL_ES             \n"+"  precision highp float; \n"+"#endif                   \n"+"\n"+"uniform float alpha;"+"varying vec3 worldCoord;"+"void main(void) {"+"    gl_FragColor = vec4(worldCoord, alpha);"+"}"};g_shaders['vs-x3d-shadow']={type:"vertex",data:"attribute vec3 position;"+"uniform mat4 modelViewProjectionMatrix;"+"varying vec4 projCoord;"+"void main(void) {"+"   projCoord = modelViewProjectionMatrix * vec4(position, 1.0);"+"   gl_Position = projCoord;"+"}"};g_shaders['fs-x3d-shadow']={type:"fragment",data:"#ifdef GL_ES             \n"+"  precision highp float; \n"+"#endif                   \n"+"\n"+"varying vec4 projCoord;"+"void main(void) {"+"    vec3 proj = (projCoord.xyz / projCoord.w);"+"    vec4 outVal = vec4(0.0);"+"    float toFixed = 255.0 / 256.0;"+"    outVal.r = fract(proj.z * toFixed);"+"    outVal.g = fract(proj.z * toFixed * 255.0);"+"    outVal.b = fract(proj.z * toFixed * 255.0 * 255.0);"+"    outVal.a = fract(proj.z * toFixed * 255.0 * 255.0 * 255.0);"+"    gl_FragColor = outVal;"+"}"};function getDefaultShaderProgram(gl,suffix)
{var prog=gl.createProgram();var vs=gl.createShader(gl.VERTEX_SHADER);var fs=gl.createShader(gl.FRAGMENT_SHADER);gl.shaderSource(vs,g_shaders['vs-x3d-'+suffix].data);gl.shaderSource(fs,g_shaders['fs-x3d-'+suffix].data);gl.compileShader(vs);gl.compileShader(fs);gl.attachShader(prog,vs);gl.attachShader(prog,fs);gl.linkProgram(prog);var msg=gl.getProgramInfoLog(prog);if(msg){x3dom.debug.logError(msg);}
return wrapShaderProgram(gl,prog);}
function scaleImage(image)
{if(!isPowerOfTwo(image.width)||!isPowerOfTwo(image.height)){var canvas=document.createElement("canvas");canvas.width=nextHighestPowerOfTwo(image.height);canvas.height=nextHighestPowerOfTwo(image.height);var ctx=canvas.getContext("2d");ctx.drawImage(image,0,0,image.width,image.height,0,0,canvas.width,canvas.height);image=canvas;}
return image;}
function isPowerOfTwo(x)
{return((x&(x-1))===0);}
function nextHighestPowerOfTwo(x)
{--x;for(var i=1;i<32;i<<=1){x=x|x>>i;}
return(x+1);}
function nextBestPowerOfTwo(x)
{var log2x=Math.log(x)/Math.log(2);return Math.pow(2,Math.round(log2x));}
Context.prototype.getShaderProgram=function(gl,ids)
{var shader=[];var prog=null;if(this.cached_shader_programs[ids[0]+ids[1]]){prog=this.cached_shader_programs[ids[0]+ids[1]];}
else
{for(var id=0;id<2;id++)
{if(!g_shaders[ids[id]]){x3dom.debug.logError('Cannot find shader '+ids[id]);return;}
if(this.cached_shaders[ids[id]]){shader[id]=this.cached_shaders[ids[id]];}else{if(g_shaders[ids[id]].type=='vertex'){shader[id]=gl.createShader(gl.VERTEX_SHADER);}
else if(g_shaders[ids[id]].type=='fragment'){shader[id]=gl.createShader(gl.FRAGMENT_SHADER);}
else{x3dom.debug.logError('Invalid shader type '+g_shaders[id].type);return;}
gl.shaderSource(shader[id],g_shaders[ids[id]].data);gl.compileShader(shader[id]);this.cached_shaders[ids[id]]=shader[id];}}
prog=gl.createProgram();gl.attachShader(prog,shader[0]);gl.attachShader(prog,shader[1]);gl.linkProgram(prog);var msg=gl.getProgramInfoLog(prog);if(msg){x3dom.debug.logError(msg);}
this.cached_shader_programs[ids[0]+ids[1]]=wrapShaderProgram(gl,prog);prog=this.cached_shader_programs[ids[0]+ids[1]];}
return prog;};function wrapShaderProgram(gl,sp)
{var shader={};shader.bind=function(){gl.useProgram(sp);};var loc=null,obj=null;var i=0;var glErr;var numUniforms=gl.getProgramParameter(sp,gl.ACTIVE_UNIFORMS);for(i=0;i<numUniforms;++i){try{obj=gl.getActiveUniform(sp,i);}
catch(eu){}
glErr=gl.getError();if(glErr!==0){x3dom.debug.logError("GL-Error: "+glErr);}
loc=gl.getUniformLocation(sp,obj.name);switch(obj.type){case gl.SAMPLER_2D:shader.__defineSetter__(obj.name,(function(loc){return function(val){gl.uniform1i(loc,val);};})(loc));break;case gl.SAMPLER_CUBE:shader.__defineSetter__(obj.name,(function(loc){return function(val){gl.uniform1i(loc,val);};})(loc));break;case gl.BOOL:shader.__defineSetter__(obj.name,(function(loc){return function(val){gl.uniform1i(loc,val);};})(loc));break;case gl.FLOAT:shader.__defineSetter__(obj.name,(function(loc){return function(val){gl.uniform1f(loc,val);};})(loc));break;case gl.FLOAT_VEC2:shader.__defineSetter__(obj.name,(function(loc){return function(val){gl.uniform2f(loc,val[0],val[1]);};})(loc));break;case gl.FLOAT_VEC3:shader.__defineSetter__(obj.name,(function(loc){return function(val){gl.uniform3f(loc,val[0],val[1],val[2]);};})(loc));break;case gl.FLOAT_VEC4:shader.__defineSetter__(obj.name,(function(loc){return function(val){gl.uniform4f(loc,val[0],val[1],val[2],val[3]);};})(loc));break;case gl.FLOAT_MAT2:shader.__defineSetter__(obj.name,(function(loc){return function(val){gl.uniformMatrix2fv(loc,false,new Float32Array(val));};})(loc));break;case gl.FLOAT_MAT3:shader.__defineSetter__(obj.name,(function(loc){return function(val){gl.uniformMatrix3fv(loc,false,new Float32Array(val));};})(loc));break;case gl.FLOAT_MAT4:shader.__defineSetter__(obj.name,(function(loc){return function(val){gl.uniformMatrix4fv(loc,false,new Float32Array(val));};})(loc));break;case gl.INT:shader.__defineSetter__(obj.name,(function(loc){return function(val){gl.uniform1i(loc,val);};})(loc));break;default:x3dom.debug.logWarning('GLSL program variable '+obj.name+' has unknown type '+obj.type);}}
var numAttribs=gl.getProgramParameter(sp,gl.ACTIVE_ATTRIBUTES);for(i=0;i<numAttribs;++i){try{obj=gl.getActiveAttrib(sp,i);}
catch(ea){}
glErr=gl.getError();if(glErr!==0){x3dom.debug.logError("GL-Error: "+glErr);}
loc=gl.getAttribLocation(sp,obj.name);shader[obj.name]=loc;}
return shader;}
function useLightingFunc(viewarea)
{var result=[0,false];var slights=viewarea.getLights();var numLights=slights.length;if(numLights>0){if(numLights>8){result[0]=8;}else{result[0]=numLights;}}
for(var i=0;i<numLights;i++){if(slights[i]._vf.shadowIntensity>0.0){result[1]=true;}}
var nav=viewarea._scene.getNavigationInfo();if(nav._vf.headlight){result[0]+=1;}
return result;}
function useFogFunc(viewarea)
{var fog=viewarea._scene.getFog();if(fog._vf.visibilityRange>0){return 1;}else{return 0;}}
Context.prototype.generateVS2=function(viewarea,vertexColor,texture,textureTransform,cssMode,useLighting)
{var useFog=useFogFunc(viewarea);var shaderIdentifier="vs-x3d-"+((vertexColor)?1:0)+
((texture)?1:0)+
((textureTransform)?1:0)+
((useFog)?1:0)+
(useLighting[0])+
((useLighting[1])?1:0)+
((cssMode));if(!g_shaders[shaderIdentifier]){var shader="";shader+="attribute vec3 position;";shader+="attribute vec2 texcoord;";shader+="attribute vec3 tangent;";shader+="attribute vec3 binormal;";shader+="attribute vec3 normal;";shader+="uniform mat4 modelViewMatrix;";shader+="uniform mat4 modelMatrix;";shader+="uniform mat4 normalMatrix;";shader+="uniform mat4 modelViewProjectionMatrix;";shader+="varying vec3 fragNormal;";shader+="varying vec2 fragTexcoord;";shader+="varying vec3 fragTangent;";shader+="varying vec3 fragBinormal;";shader+="varying vec3 fragPosition;";shader+="varying vec3 fragEyePosition;";shader+="void main(void) {";shader+="   fragPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;";shader+="   fragTexcoord = texcoord;";shader+="   fragTangent  = (normalMatrix * vec4(tangent, 1.0)).xyz;";shader+="   fragBinormal = (normalMatrix * vec4(binormal, 1.0)).xyz;";shader+="   fragNormal   = (normalMatrix * vec4(normal, 1.0)).xyz;";shader+="   gl_Position  = modelViewProjectionMatrix * vec4(position, 1.0);";shader+="}";g_shaders[shaderIdentifier]={};g_shaders[shaderIdentifier].type="vertex";g_shaders[shaderIdentifier].data=shader;}else{}
return shaderIdentifier;};Context.prototype.generateFS2=function(viewarea,vertexColor,texture,cssMode,useLighting)
{var useFog=useFogFunc(viewarea);var shaderIdentifier="fs-x3d-"+((vertexColor)?1:0)+
((texture)?1:0)+
((useFog)?1:0)+
(useLighting[0])+
((useLighting[1])?1:0)+
((cssMode));if(!g_shaders[shaderIdentifier]){var shader="";shader+="#ifdef GL_ES             \n";shader+="  precision highp float; \n";shader+="#endif                   \n";shader+="\n";shader+="const int NUMLIGHTS = 1;";shader+="struct Material {";shader+=" vec3  diffuseColor;";shader+=" vec3  specularColor;";shader+=" vec3  emissiveColor;";shader+=" float shininess;";shader+=" float transparency;";shader+=" float ambientIntensity;";shader+="};";shader+="struct Light {";shader+="   float on;";shader+="   float type;";shader+="   vec3  location;";shader+="   vec3  direction;";shader+="   vec3  color;";shader+="   vec3  attenuation;";shader+="   float intensity;";shader+="   float ambientIntensity;";shader+="   float beamWidth;";shader+="   float cutOffAngle;";shader+="   float shadowIntensity;";shader+="};";shader+="uniform Light light[9];";shader+="uniform Material material;";shader+="uniform mat4 modelMatrix;";shader+="uniform mat4 modelViewMatrix;";shader+="uniform mat4 viewMatrix;";shader+="uniform sampler2D tex;";shader+="uniform sampler2D bump;";shader+="varying vec2 fragTexcoord;";shader+="varying vec3 fragTangent;";shader+="varying vec3 fragBinormal;";shader+="varying vec3 fragNormal;";shader+="varying vec3 fragPosition;";shader+="varying vec3 fragEyePosition;";shader+="void lighting(in Light light, in vec3 N, in vec3 V, inout vec3 ambient, inout vec3 diffuse, inout vec3 specular){";shader+="   vec3  L = -normalize(light.direction);";shader+="   vec3  H = normalize( L + V );";shader+="   float NdotL = max(0.0, dot(N, L));";shader+="   float NdotH = max(0.0, dot(N, H));";shader+="   float ambientFactor  = light.ambientIntensity * material.ambientIntensity;";shader+="   float diffuseFactor  = light.intensity * NdotL;";shader+="   float specularFactor = light.intensity * NdotL * pow(NdotH, material.shininess*128.0);";shader+="   ambient  += light.color * ambientFactor;";shader+="   diffuse  += light.color * diffuseFactor;";shader+="   specular += light.color * specularFactor;";shader+="}";shader+="void main(void) {";shader+="   vec3 rgb       = vec3(0.0);";shader+="   vec3 ambient   = vec3(0.0);";shader+="   vec3 diffuse   = vec3(0.0);";shader+="   vec3 specular  = vec3(0.0);";shader+="   vec3 eye = normalize(-fragPosition);";shader+="   vec3 t = normalize( fragTangent );";shader+="   vec3 b = normalize( fragBinormal );";shader+="   vec3 n = normalize( fragNormal );";shader+="   mat3 tangentToWorld = mat3(t, b, n);";shader+="   vec3 normal = texture2D( bump, vec2(fragTexcoord.x, 1.0-fragTexcoord.y) ).rgb;";shader+="   normal = 2.0 * normal - 1.0;";shader+="   normal.y = -normal.y;";shader+="   normal = normalize( normal * tangentToWorld );";shader+="   for(int i=0; i<NUMLIGHTS; i++) {";shader+="      lighting(light[i], normal, eye, ambient, diffuse, specular);";shader+="   }";shader+="   rgb = (material.emissiveColor + ambient*material.diffuseColor + diffuse*material.diffuseColor + specular*material.specularColor);";shader+="   rgb = clamp(rgb, 0.0, 1.0);";shader+="   gl_FragColor = vec4(rgb, 1.0);";shader+="}";g_shaders[shaderIdentifier]={};g_shaders[shaderIdentifier].type="fragment";g_shaders[shaderIdentifier].data=shader;}else{}
return shaderIdentifier;};Context.prototype.generateVS=function(viewarea,vertexColor,texture,textureTransform,cssMode,useLighting)
{var useFog=useFogFunc(viewarea);var shaderIdentifier="vs-x3d-"+((vertexColor)?1:0)+
((texture)?1:0)+
((textureTransform)?1:0)+
((useFog)?1:0)+
(useLighting[0])+
((useLighting[1])?1:0)+
((cssMode));if(!g_shaders[shaderIdentifier]){var shader="";shader+="attribute vec3 position;";shader+="attribute vec3 normal;";shader+="uniform mat4 modelViewMatrix;";shader+="uniform mat4 normalMatrix;";shader+="uniform mat4 modelViewProjectionMatrix;";shader+="varying vec3 fragNormal;";if(vertexColor){if(vertexColor==3.0){shader+="attribute vec3 color;";shader+="varying vec3 fragColor;";}else{shader+="attribute vec4 color;";shader+="varying vec4 fragColor;";}}
if(texture||cssMode){shader+="attribute vec2 texcoord;";shader+="varying vec2 fragTexcoord;";shader+="uniform float sphereMapping;";if(textureTransform){shader+="uniform mat4 texTrafoMatrix;";}
if(cssMode&2){shader+="attribute vec3 tangent;";shader+="attribute vec3 binormal;";shader+="varying vec3 fragTangent;";shader+="varying vec3 fragBinormal;";}}
if(useLighting[0]>=1.0||useFog){shader+="uniform vec3 eyePosition;";shader+="varying vec3 fragEyePosition;";shader+="varying vec3 fragPosition;";if(useLighting[1]){shader+="uniform mat4 matPV;";shader+="varying vec4 projCoord;";}}
shader+="void main(void) {";if(vertexColor){shader+="fragColor = color;";}
shader+="fragNormal = (normalMatrix * vec4(normal, 0.0)).xyz;";if(useLighting[0]>=1.0||useFog){shader+="fragPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;";shader+="fragEyePosition = eyePosition - fragPosition;";if(useLighting[1]){shader+="projCoord = matPV * vec4(position+0.5*normalize(normal), 1.0);";}}
if(texture||cssMode){shader+="if (sphereMapping == 1.0) {";shader+=" fragTexcoord = 0.5 + fragNormal.xy / 2.0;";shader+="}else{";if(textureTransform){shader+=" fragTexcoord = (texTrafoMatrix * vec4(texcoord, 1.0, 1.0)).xy;";}else{shader+=" fragTexcoord = texcoord;";}
if(cssMode&2){shader+="fragTangent  = (normalMatrix * vec4(tangent, 0.0)).xyz;";shader+="fragBinormal = (normalMatrix * vec4(binormal, 0.0)).xyz;";}
shader+="}";}
shader+="gl_Position = modelViewProjectionMatrix * vec4(position, 1.0);";shader+="}";g_shaders[shaderIdentifier]={};g_shaders[shaderIdentifier].type="vertex";g_shaders[shaderIdentifier].data=shader;}else{}
return shaderIdentifier;};Context.prototype.generateFS=function(viewarea,vertexColor,texture,cssMode,useLighting)
{var useFog=useFogFunc(viewarea);var shaderIdentifier="fs-x3d-"+((vertexColor)?1:0)+
((texture)?1:0)+
((useFog)?1:0)+
(useLighting[0])+
((useLighting[1])?1:0)+
((cssMode));if(!g_shaders[shaderIdentifier]){var fog="struct Fog {"+"   vec3  color;"+"   float fogType;"+"   float visibilityRange;"+"};"+"uniform Fog fog;"+"float calcFog() {"+"   float f0 = 0.0;"+"   if(fog.fogType == 0.0) {"+"       if(length(fragEyePosition) < fog.visibilityRange){"+"           f0 = (fog.visibilityRange-length(fragEyePosition)) / fog.visibilityRange;"+"       }"+"   }else{"+"       if(length(fragEyePosition) < fog.visibilityRange){"+"           f0 = exp(-length(fragEyePosition) / (fog.visibilityRange-length(fragEyePosition) ) );"+"       }"+"   }"+"   f0 = clamp(f0, 0.0, 1.0);"+"   return f0;"+"}";var light="struct Light {\n"+"   float on;\n"+"   float type;\n"+"   vec3  location;\n"+"   vec3  direction;\n"+"   vec3  color;\n"+"   vec3  attenuation;\n"+"   float intensity;\n"+"   float ambientIntensity;\n"+"   float beamWidth;\n"+"   float cutOffAngle;\n"+"   float shadowIntensity;\n"+"};\n"+"const int NUMLIGHTS = "+useLighting[0]+";\n"+"uniform Light light[9];\n"+"void lighting(in Light light, in vec3 N, in vec3 V, inout vec3 ambient, inout vec3 diffuse, inout vec3 specular){"+"   vec3 L;\n"+"   float spot = 1.0, attentuation = 1.0;\n"+"   if(light.type == 0.0) {\n"+"       L = -normalize(light.direction);\n"+"   }else{\n"+"       L = normalize(light.location - fragPosition);"+"       float distance = length(L);"+"       L /= distance;\n"+"       attentuation = 1.0 / (light.attenuation.x + light.attenuation.y * distance + light.attenuation.z * distance * distance);"+"       attentuation *= max(0.0, dot(N, L));"+"       if(light.type == 2.0) {"+"           float spotAngle = acos(max(0.0, dot(-L, normalize(light.direction))));"+"           if(spotAngle >= light.cutOffAngle) spot = 0.0;"+"           else if(spotAngle <= light.beamWidth) spot = 1.0;"+"           else spot = (spotAngle - light.cutOffAngle ) / (light.beamWidth - light.cutOffAngle);"+"       }"+"   }"+"   vec3  H = normalize( L + V );\n"+"   float NdotL = max(0.0, dot(N, L));\n"+"   float NdotH = max(0.0, dot(N, H));\n"+"   float ambientFactor  = light.ambientIntensity * material.ambientIntensity;"+"   float diffuseFactor  = light.intensity * NdotL;"+"   float specularFactor = light.intensity * NdotL * pow(NdotH, material.shininess*128.0);"+"   ambient  += light.color * ambientFactor * attentuation * spot;"+"   diffuse  += light.color * diffuseFactor * attentuation * spot;"+"   specular += light.color * specularFactor * attentuation * spot;"+"}";var shadow="uniform sampler2D sh_tex;"+"varying vec4 projCoord;"+"float PCF_Filter(Light light, vec3 projectiveBiased, float filterWidth)"+"{"+"    float stepSize = 2.0 * filterWidth / 3.0;"+"    float blockerCount = 0.0;"+"    projectiveBiased.x -= filterWidth;"+"    projectiveBiased.y -= filterWidth;"+"    for (float i=0.0; i<3.0; i++)"+"    {"+"        for (float j=0.0; j<3.0; j++)"+"        {"+"            projectiveBiased.x += (j*stepSize);"+"            projectiveBiased.y += (i*stepSize);"+"            vec4 zCol = texture2D(sh_tex, (1.0+projectiveBiased.xy)*0.5);"+"            float fromFixed = 256.0 / 255.0;"+"            float z = zCol.r * fromFixed;"+"            z += zCol.g * fromFixed / (255.0);"+"            z += zCol.b * fromFixed / (255.0 * 255.0);"+"            z += zCol.a * fromFixed / (255.0 * 255.0 * 255.0);"+"            if (z < projectiveBiased.z) blockerCount += 1.0;"+"            projectiveBiased.x -= (j*stepSize);"+"            projectiveBiased.y -= (i*stepSize);"+"        }"+"    }"+"    float result = 1.0 - light.shadowIntensity * blockerCount / 9.0;"+"    return result;"+"}";var material="struct Material {          \n"+"   vec3  diffuseColor;     \n"+"   vec3  specularColor;    \n"+"   vec3  emissiveColor;    \n"+"   float shininess;        \n"+"   float transparency;     \n"+"   float ambientIntensity; \n"+"};                         \n"+"uniform Material material; \n";var shader="";shader+="#ifdef GL_ES             \n";shader+="  precision highp float; \n";shader+="#endif                   \n";shader+="\n";shader+=material;shader+="uniform mat4 modelMatrix;";shader+="uniform mat4 modelViewMatrix;";if(vertexColor){if(vertexColor==3){shader+="varying vec3 fragColor;  \n";}else{shader+="varying vec4 fragColor;  \n";}}
if(texture||cssMode){shader+="uniform sampler2D tex;           \n";shader+="varying vec2 fragTexcoord;       \n";shader+="uniform float useText;           \n";shader+="uniform float origChannelCount;  \n";if(cssMode&2){shader+="uniform sampler2D bump;      \n";shader+="varying vec3 fragTangent;    \n";shader+="varying vec3 fragBinormal;   \n";}
if(cssMode&4){shader+="uniform sampler2D spec;      \n";}}
if(useLighting[0]>=1.0){shader+="uniform float solid;             \n";shader+="varying vec3 fragNormal;         \n";shader+="varying vec3 fragPosition;       \n";shader+="varying vec3 fragEyePosition;    \n";shader+=light;if(useLighting[1]){shader+=shadow;}}
if(useFog){shader+=fog;if(!useLighting[0]){shader+="varying vec3 fragEyePosition;    \n";}}
shader+="void main(void) {    \n";shader+="vec3 rgb      = vec3(0.0, 0.0, 0.0); \n";shader+="float alpha = 1.0 - material.transparency;\n";if(useLighting[0]>=1.0){shader+="vec3 ambient   = vec3(0.07, 0.07, 0.07);\n";shader+="vec3 diffuse   = vec3(0.0, 0.0, 0.0);\n";shader+="vec3 specular  = vec3(0.0, 0.0, 0.0);\n";if(useLighting[1]){shader+="float shadowed = 1.0;\n";shader+="float oneShadowAlreadyExists = 0.0;\n";}
shader+="vec3 eye = normalize(-fragPosition);\n";shader+="vec3 normal = normalize(fragNormal);\n";if(cssMode&2){shader+="vec3 t = normalize( fragTangent );\n";shader+="vec3 b = normalize( fragBinormal );\n";shader+="vec3 n = normalize( fragNormal );\n";shader+="mat3 tangentToWorld = mat3(t, b, n);\n";shader+="normal = texture2D( bump, vec2(fragTexcoord.x, 1.0-fragTexcoord.y) ).rgb;\n";shader+="normal = 2.0 * normal - 1.0;\n";shader+="normal = normalize( normal * tangentToWorld );\n";shader+="normal.y = -normal.y;";shader+="normal.x = -normal.x;";}
shader+="if (solid == 0.0 && dot(normal, eye) < 0.0) {\n";shader+=" normal *= -1.0;\n";shader+="}\n";shader+="for(int i=0; i<NUMLIGHTS; i++) {\n";shader+=" lighting(light[i], normal, eye, ambient, diffuse, specular);\n";if(useLighting[1]){shader+=" if(light[i].shadowIntensity > 0.0 && oneShadowAlreadyExists == 0.0){\n";shader+="     vec3 projectiveBiased = projCoord.xyz / projCoord.w;\n";shader+="     shadowed = PCF_Filter(light[i], projectiveBiased, 0.002);\n";shader+="     oneShadowAlreadyExists = 1.0;\n";shader+=" }\n";}
shader+="}\n";if(cssMode&4){shader+="specular *= texture2D( spec, vec2(fragTexcoord.x, 1.0-fragTexcoord.y) ).rgb;\n";}
if(texture||(cssMode&1)){shader+="vec2 texCoord = vec2(fragTexcoord.x, 1.0-fragTexcoord.y);\n";shader+="vec4 texColor = texture2D(tex, texCoord);\n";shader+="alpha *= texColor.a;\n";shader+="if(useText == 1.0 || origChannelCount == 1.0 || origChannelCount == 2.0){\n";shader+="   rgb = (material.emissiveColor + ambient*material.diffuseColor + diffuse*material.diffuseColor + specular*material.specularColor)*texColor.rgb;\n";shader+="}else{\n";shader+="   rgb = (material.emissiveColor + ambient*texColor.rgb + diffuse*texColor.rgb + specular*material.specularColor);\n";shader+="}\n";}else if(vertexColor){shader+="rgb = diffuse*fragColor.rgb;\n";if(vertexColor==4){shader+="alpha = fragColor.a;\n";}}else{shader+="rgb = (material.emissiveColor + ambient*material.diffuseColor + diffuse*material.diffuseColor + specular*material.specularColor);\n";}
if(useLighting[1]){shader+="rgb *= shadowed;\n";}}else{if(texture){shader+="vec2 texCoord = vec2(fragTexcoord.x, 1.0-fragTexcoord.y);\n";shader+="vec4 texColor = texture2D(tex, texCoord);\n";shader+="rgb = texColor.rgb;\n";shader+="alpha *= texColor.a;\n";}else if(vertexColor){shader+="rgb = fragColor.rgb;\n";if(vertexColor==4){shader+="alpha = fragColor.a;\n";}}else{shader+="rgb = material.diffuseColor + material.emissiveColor;\n";}}
if(useFog){shader+="float f0 = calcFog();\n";shader+="rgb = fog.color * (1.0-f0) + f0 * (rgb);\n";}
shader+="if (alpha <= 0.1) discard;\n";shader+="else gl_FragColor = vec4(rgb, alpha);\n";shader+="}\n";g_shaders[shaderIdentifier]={};g_shaders[shaderIdentifier].type="fragment";g_shaders[shaderIdentifier].data=shader;}else{}
return shaderIdentifier;};Context.prototype.setupShape=function(gl,shape,viewarea)
{var q=0;if(shape._webgl!==undefined)
{var oldLightsAndShadow=shape._webgl.lightsAndShadow;shape._webgl.lightsAndShadow=useLightingFunc(viewarea);var needFullReInit=(shape._webgl.lightsAndShadow[0]!=oldLightsAndShadow[0]||shape._webgl.lightsAndShadow[1]!=oldLightsAndShadow[1]);if(shape._dirty.texture===true||needFullReInit)
{var tex=shape._cf.appearance.node._cf.texture.node;if((shape._webgl.texture!==undefined&&tex)&&!needFullReInit)
{shape.updateTexture(tex,0);shape._dirty.texture=false;}
else
{needFullReInit=true;var spOld=shape._webgl.shader;var inc=0;for(inc=0;shape._webgl.texture!==undefined&&inc<shape._webgl.texture.length;inc++)
{if(shape._webgl.texture[inc])
{gl.deleteTexture(shape._webgl.texture[inc]);}}
for(q=0;q<shape._webgl.positions.length;q++)
{if(spOld.position!==undefined)
{gl.deleteBuffer(shape._webgl.buffers[5*q+1]);gl.deleteBuffer(shape._webgl.buffers[5*q+0]);}
if(spOld.normal!==undefined)
{gl.deleteBuffer(shape._webgl.buffers[5*q+2]);}
if(spOld.texcoord!==undefined)
{gl.deleteBuffer(shape._webgl.buffers[5*q+3]);}
if(spOld.color!==undefined)
{gl.deleteBuffer(shape._webgl.buffers[5*q+4]);}}
for(inc=0;inc<shape._webgl.dynamicFields.length;inc++)
{var h_attrib=shape._webgl.dynamicFields[inc];if(spOld[h_attrib.name]!==undefined)
{gl.deleteBuffer(h_attrib.buf);}}}}
for(q=0;q<shape._webgl.positions.length;q++)
{if(!needFullReInit&&shape._dirty.positions===true)
{if(shape._webgl.shader.position!==undefined)
{shape._webgl.positions[q]=shape._cf.geometry.node._mesh._positions[q];gl.deleteBuffer(shape._webgl.buffers[5*q+1]);var positionBuffer=gl.createBuffer();shape._webgl.buffers[5*q+1]=positionBuffer;gl.bindBuffer(gl.ARRAY_BUFFER,positionBuffer);gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,shape._webgl.buffers[5*q+0]);var vertices=new Float32Array(shape._webgl.positions[q]);gl.bufferData(gl.ARRAY_BUFFER,vertices,gl.STATIC_DRAW);gl.bindBuffer(gl.ARRAY_BUFFER,positionBuffer);gl.vertexAttribPointer(shape._webgl.shader.position,3,gl.FLOAT,false,0,0);delete vertices;}
shape._dirty.positions=false;}
if(!needFullReInit&&shape._dirty.colors===true)
{if(shape._webgl.shader.color!==undefined)
{shape._webgl.colors[q]=shape._cf.geometry.node._mesh._colors[q];gl.deleteBuffer(shape._webgl.buffers[5*q+4]);var colorBuffer=gl.createBuffer();shape._webgl.buffers[5*q+4]=colorBuffer;var colors=new Float32Array(shape._webgl.colors[q]);gl.bindBuffer(gl.ARRAY_BUFFER,colorBuffer);gl.bufferData(gl.ARRAY_BUFFER,colors,gl.STATIC_DRAW);gl.vertexAttribPointer(shape._webgl.shader.color,3,gl.FLOAT,false,0,0);delete colors;}
shape._dirty.colors=false;}}
if(!needFullReInit){return;}}
else if(!x3dom.isa(shape._cf.geometry.node,x3dom.nodeTypes.Text)&&(shape._cf.geometry.node._mesh._positions[0].length<1)){x3dom.debug.logError("NO VALID VERTEX POSITIONS SET!");return;}
shape._dirty.positions=false;shape._dirty.normals=false;shape._dirty.texcoords=false;shape._dirty.colors=false;shape._dirty.indexes=false;shape._dirty.texture=false;if(x3dom.isa(shape._cf.geometry.node,x3dom.nodeTypes.Text))
{var fontStyleNode=shape._cf.geometry.node._cf.fontStyle.node;var font_family=['SERIF'];var font_size=32;var font_style="PLAIN";var font_spacing=1.0;var font_horizontal=true;var font_justify='BEGIN';var font_language="";var font_leftToRight=true;var font_topToBottom=true;if(fontStyleNode!==null){var fonts=fontStyleNode._vf.family.toString();fonts=fonts.trim().replace(/\'/g,'').replace(/\,/,' ');fonts=fonts.split(" ");font_family=Array.map(fonts,function(s){if(s=='SANS'){return'sans-serif';}
else if(s=='SERIF'){return'serif';}
else if(s=='TYPEWRITER'){return'monospace';}
else{return''+s+'';}}).join(",");font_style=fontStyleNode._vf.style.toString().replace(/\'/g,'');switch(font_style.toUpperCase()){case'PLAIN':font_style='normal';break;case'BOLD':font_style='bold';break;case'ITALIC':font_style='italic';break;case'BOLDITALIC':font_style='italic bold';break;default:font_style='normal';}
font_leftToRight=fontStyleNode._vf.leftToRight?'ltr':'rtl';font_topToBottom=fontStyleNode._vf.topToBottom;font_justify=fontStyleNode._vf.justify.toString().replace(/\'/g,'');switch(font_justify.toUpperCase()){case'BEGIN':font_justify='left';break;case'END':font_justify='right';break;case'FIRST':font_justify='left';break;case'MIDDLE':font_justify='center';break;default:font_justify='left';}
font_size=fontStyleNode._vf.size;font_spacing=fontStyleNode._vf.spacing;font_horizontal=fontStyleNode._vf.horizontal;font_language=fontStyleNode._vf.language;}
var string=shape._cf.geometry.node._vf.string;var text_canvas=document.createElement('canvas');text_canvas.dir=font_leftToRight;text_canvas.width=viewarea._width;text_canvas.height=font_size;text_canvas.display='none';document.body.appendChild(text_canvas);var text_ctx=text_canvas.getContext('2d');text_ctx.font=font_style+" "+font_size+"px "+font_family;var txtW=text_ctx.measureText(string).width;var txtH=text_ctx.measureText(string).height||text_canvas.height;text_canvas.width=Math.pow(2,Math.ceil(Math.log(txtW)/Math.log(2)));text_canvas.height=Math.pow(2,Math.ceil(Math.log(txtH)/Math.log(2)));text_ctx.fillStyle='rgba(0,0,0,0)';text_ctx.fillRect(0,0,text_ctx.canvas.width,text_ctx.canvas.height);text_ctx.fillStyle='white';text_ctx.lineWidth=2.5;text_ctx.strokeStyle='grey';text_ctx.textBaseline='top';text_ctx.font=font_style+" "+font_size+"px "+font_family;text_ctx.textAlign=font_justify;var leftOffset=(text_ctx.canvas.width-txtW)/2.0;var topOffset=(text_ctx.canvas.height-font_size)/2.0;text_ctx.fillText(string,leftOffset,topOffset);var ids=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,ids);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,text_canvas);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);gl.bindTexture(gl.TEXTURE_2D,null);var w=txtW/100.0;var h=txtH/100.0;v0=1;u0=0;u=1;v=0;shape._cf.geometry.node._mesh._positions[0]=[-w,-h,0,w,-h,0,w,h,0,-w,h,0];shape._cf.geometry.node._mesh._normals[0]=[0,0,1,0,0,1,0,0,1,0,0,1];shape._cf.geometry.node._mesh._texCoords[0]=[u0,v,u,v,u,v0,u0,v0];shape._cf.geometry.node._mesh._colors[0]=[];shape._cf.geometry.node._mesh._indices[0]=[0,1,2,2,3,0];shape._cf.geometry.node._mesh._invalidate=true;shape._cf.geometry.node._mesh._numFaces=2;shape._cf.geometry.node._mesh._numCoords=4;shape._webgl={positions:shape._cf.geometry.node._mesh._positions,normals:shape._cf.geometry.node._mesh._normals,texcoords:shape._cf.geometry.node._mesh._texCoords,colors:shape._cf.geometry.node._mesh._colors,indexes:shape._cf.geometry.node._mesh._indices,texture:[ids],lightsAndShadow:useLightingFunc(viewarea)};shape._webgl.primType=gl.TRIANGLES;var vsID=this.generateVS(viewarea,false,true,false,false,shape._webgl.lightsAndShadow);var fsID=this.generateFS(viewarea,false,true,false,shape._webgl.lightsAndShadow);shape._webgl.shader=this.getShaderProgram(gl,[vsID,fsID]);}
else
{var context=this;tex=shape._cf.appearance.node._cf.texture.node;shape.updateTexture=function(tex,unit)
{var that=this;var texture;var childTex=(tex._video!==undefined&&tex._video!==null&&tex._needPerFrameUpdate!==undefined&&tex._needPerFrameUpdate===true);if(this._webgl.texture===undefined){this._webgl.texture=[];}
if(tex._isCanvas&&tex._canvas){texture=gl.createTexture();that._webgl.texture[unit]=texture;gl.bindTexture(gl.TEXTURE_2D,texture);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,tex._canvas);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);gl.bindTexture(gl.TEXTURE_2D,null);}
else if(x3dom.isa(tex,x3dom.nodeTypes.RenderedTexture))
{that._webgl.texture[unit]=tex._webgl.fbo.tex;gl.bindTexture(gl.TEXTURE_2D,tex._webgl.fbo.tex);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);gl.bindTexture(gl.TEXTURE_2D,null);}
else if(x3dom.isa(tex,x3dom.nodeTypes.PixelTexture))
{var pixels=new Uint8Array(tex._vf.image.toGL());var format=gl.NONE;switch(tex._vf.image.comp)
{case 1:format=gl.LUMINANCE;break;case 2:format=gl.LUMINANCE_ALPHA;break;case 3:format=gl.RGB;break;case 4:format=gl.RGBA;break;}
texture=gl.createTexture();that._webgl.texture[unit]=texture;gl.bindTexture(gl.TEXTURE_2D,texture);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);gl.pixelStorei(gl.UNPACK_ALIGNMENT,1);gl.texImage2D(gl.TEXTURE_2D,0,format,tex._vf.image.width,tex._vf.image.height,0,format,gl.UNSIGNED_BYTE,pixels);}
else if(x3dom.isa(tex,x3dom.nodeTypes.MultiTexture))
{for(var cnt=0;cnt<tex.size();cnt++)
{var singleTex=tex.getTexture(cnt);if(!singleTex)
break;that.updateTexture(singleTex,cnt);}}
else if(x3dom.isa(tex,x3dom.nodeTypes.MovieTexture)||childTex)
{texture=gl.createTexture();if(!childTex)
{tex._video=document.createElement('video');tex._video.setAttribute('autobuffer','true');var p=document.getElementsByTagName('body')[0];p.appendChild(tex._video);tex._video.style.display="none";}
for(var i=0;i<tex._vf.url.length;i++)
{var videoUrl=tex._nameSpace.getURL(tex._vf.url[i]);x3dom.debug.logInfo('Adding video file: '+videoUrl);var src=document.createElement('source');src.setAttribute('src',videoUrl);tex._video.appendChild(src);}
var updateMovie=function()
{that._nameSpace.doc.needRender=true;gl.bindTexture(gl.TEXTURE_2D,texture);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,tex._video);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.bindTexture(gl.TEXTURE_2D,null);};var startVideo=function()
{that._nameSpace.doc.needRender=true;that._webgl.texture[unit]=texture;tex._video.play();tex._intervalID=setInterval(updateMovie,16);};var videoDone=function()
{clearInterval(tex._intervalID);if(tex._vf.loop===true)
{tex._video.play();tex._intervalID=setInterval(updateMovie,16);}};tex._video.addEventListener("canplaythrough",startVideo,true);tex._video.addEventListener("ended",videoDone,true);}
else if(x3dom.isa(tex,x3dom.nodeTypes.X3DEnvironmentTextureNode))
{texture=context.loadCubeMap(gl,tex.getTexUrl(),that._nameSpace.doc,false);that._webgl.texture[unit]=texture;}
else
{texture=gl.createTexture();var image=new Image();image.src=tex._nameSpace.getURL(tex._vf.url[0]);that._nameSpace.doc.downloadCount+=1;image.onload=function()
{if(tex._vf.scale){image=scaleImage(image);}
that._nameSpace.doc.needRender=true;that._nameSpace.doc.downloadCount-=1;that._webgl.texture[unit]=texture;gl.bindTexture(gl.TEXTURE_2D,texture);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,image);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.bindTexture(gl.TEXTURE_2D,null);};}};shape._webgl={positions:shape._cf.geometry.node._mesh._positions,normals:shape._cf.geometry.node._mesh._normals,texcoords:shape._cf.geometry.node._mesh._texCoords,colors:shape._cf.geometry.node._mesh._colors,indexes:shape._cf.geometry.node._mesh._indices,lightsAndShadow:useLightingFunc(viewarea)};if(tex){shape.updateTexture(tex,0);}
if(x3dom.isa(shape._cf.geometry.node,x3dom.nodeTypes.PointSet)){shape._webgl.primType=gl.POINTS;if(shape._webgl.colors[0].length){shape._webgl.shader=this.getShaderProgram(gl,['vs-x3d-vertexcolorUnlit','fs-x3d-vertexcolorUnlit']);}
else{shape._webgl.shader=this.getShaderProgram(gl,['vs-x3d-default','fs-x3d-default']);}}
else if(x3dom.isa(shape._cf.geometry.node,x3dom.nodeTypes.IndexedLineSet)){shape._webgl.primType=gl.LINES;if(shape._webgl.colors[0].length){shape._webgl.shader=this.getShaderProgram(gl,['vs-x3d-vertexcolorUnlit','fs-x3d-vertexcolorUnlit']);}
else{shape._webgl.shader=this.getShaderProgram(gl,['vs-x3d-default','fs-x3d-default']);}}
else{shape._webgl.primType=gl.TRIANGLES;if(shape._cf.appearance.node._shader!==null){if(x3dom.isa(shape._cf.appearance.node._shader,x3dom.nodeTypes.CommonSurfaceShader)){var texCnt=0;var cssMode=0;var cssShader=shape._cf.appearance.node._shader;var diffuseTex=cssShader.getDiffuseMap();var normalTex=cssShader.getNormalMap();var specularTex=cssShader.getSpecularMap();if(diffuseTex!=null){shape.updateTexture(diffuseTex,texCnt++);cssMode+=1;}
if(normalTex!=null){shape.updateTexture(normalTex,texCnt++);cssMode+=2;}
if(specularTex!=null){shape.updateTexture(specularTex,texCnt++);cssMode+=4;}
var vsID=this.generateVS(viewarea,false,false,false,cssMode,shape._webgl.lightsAndShadow);var fsID=this.generateFS(viewarea,false,false,cssMode,shape._webgl.lightsAndShadow);shape._webgl.shader=this.getShaderProgram(gl,[vsID,fsID]);}else{g_shaders['vs-x3d-HACK']={};g_shaders['vs-x3d-HACK'].type="vertex";g_shaders['vs-x3d-HACK'].data=shape._cf.appearance.node._shader._vertex._vf.url[0];g_shaders['fs-x3d-HACK']={};g_shaders['fs-x3d-HACK'].type="fragment";g_shaders['fs-x3d-HACK'].data=shape._cf.appearance.node._shader._fragment._vf.url[0];shape._webgl.shader=getDefaultShaderProgram(gl,'HACK');}}
else{if(tex){if(shape._cf.appearance.node._cf.textureTransform.node===null){var vsID=this.generateVS(viewarea,false,true,false,false,shape._webgl.lightsAndShadow);var fsID=this.generateFS(viewarea,false,true,false,shape._webgl.lightsAndShadow);shape._webgl.shader=this.getShaderProgram(gl,[vsID,fsID]);}
else{var vsID=this.generateVS(viewarea,false,true,true,false,shape._webgl.lightsAndShadow);var fsID=this.generateFS(viewarea,false,true,false,shape._webgl.lightsAndShadow);shape._webgl.shader=this.getShaderProgram(gl,[vsID,fsID]);}}
else if(shape._cf.geometry.node._mesh._colors[0].length>0){var numColComponents=shape._cf.geometry.node._mesh._numColComponents;var vsID=this.generateVS(viewarea,numColComponents,false,false,false,shape._webgl.lightsAndShadow);var fsID=this.generateFS(viewarea,numColComponents,false,false,shape._webgl.lightsAndShadow);shape._webgl.shader=this.getShaderProgram(gl,[vsID,fsID]);}
else{var vsID=this.generateVS(viewarea,false,false,false,false,shape._webgl.lightsAndShadow);var fsID=this.generateFS(viewarea,false,false,false,shape._webgl.lightsAndShadow);shape._webgl.shader=this.getShaderProgram(gl,[vsID,fsID]);}}}}
var sp=shape._webgl.shader;shape._webgl.buffers=[];for(q=0;q<shape._webgl.positions.length;q++)
{if(sp.position!==undefined)
{var indicesBuffer=gl.createBuffer();shape._webgl.buffers[5*q+0]=indicesBuffer;var indexArray=new Uint16Array(shape._webgl.indexes[q]);gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,indicesBuffer);gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,indexArray,gl.STATIC_DRAW);delete indexArray;var positionBuffer=gl.createBuffer();shape._webgl.buffers[5*q+1]=positionBuffer;gl.bindBuffer(gl.ARRAY_BUFFER,positionBuffer);var vertices=new Float32Array(shape._webgl.positions[q]);gl.bufferData(gl.ARRAY_BUFFER,vertices,gl.STATIC_DRAW);gl.bindBuffer(gl.ARRAY_BUFFER,positionBuffer);gl.vertexAttribPointer(sp.position,3,gl.FLOAT,false,0,0);gl.enableVertexAttribArray(sp.position);delete vertices;}
if(sp.normal!==undefined)
{var normalBuffer=gl.createBuffer();shape._webgl.buffers[5*q+2]=normalBuffer;var normals=new Float32Array(shape._webgl.normals[q]);gl.bindBuffer(gl.ARRAY_BUFFER,normalBuffer);gl.bufferData(gl.ARRAY_BUFFER,normals,gl.STATIC_DRAW);gl.vertexAttribPointer(sp.normal,3,gl.FLOAT,false,0,0);gl.enableVertexAttribArray(sp.normal);delete normals;}
if(sp.texcoord!==undefined)
{var texcBuffer=gl.createBuffer();shape._webgl.buffers[5*q+3]=texcBuffer;var texCoords=new Float32Array(shape._webgl.texcoords[q]);gl.bindBuffer(gl.ARRAY_BUFFER,texcBuffer);gl.bufferData(gl.ARRAY_BUFFER,texCoords,gl.STATIC_DRAW);gl.vertexAttribPointer(sp.texcoord,shape._cf.geometry.node._mesh._numTexComponents,gl.FLOAT,false,0,0);gl.enableVertexAttribArray(sp.texcoord);delete texCoords;}
if(sp.color!==undefined)
{var colorBuffer=gl.createBuffer();shape._webgl.buffers[5*q+4]=colorBuffer;var colors=new Float32Array(shape._webgl.colors[q]);gl.bindBuffer(gl.ARRAY_BUFFER,colorBuffer);gl.bufferData(gl.ARRAY_BUFFER,colors,gl.STATIC_DRAW);gl.vertexAttribPointer(sp.color,shape._cf.geometry.node._mesh._numColComponents,gl.FLOAT,false,0,0);gl.enableVertexAttribArray(sp.color);delete colors;}}
var currAttribs=0;shape._webgl.dynamicFields=[];for(var df in shape._cf.geometry.node._mesh._dynamicFields)
{var attrib=shape._cf.geometry.node._mesh._dynamicFields[df];shape._webgl.dynamicFields[currAttribs]={buf:{},name:df,numComponents:attrib.numComponents};if(sp[df]!==undefined)
{var attribBuffer=gl.createBuffer();shape._webgl.dynamicFields[currAttribs++].buf=attribBuffer;var attribs=new Float32Array(attrib.value);gl.bindBuffer(gl.ARRAY_BUFFER,attribBuffer);gl.bufferData(gl.ARRAY_BUFFER,attribs,gl.STATIC_DRAW);gl.vertexAttribPointer(sp[df],attrib.numComponents,gl.FLOAT,false,0,0);delete attribs;}}};Context.prototype.setupScene=function(gl,bgnd)
{if(bgnd._webgl!==undefined)
{if(!bgnd._dirty){return;}
if(bgnd._webgl.texture!==undefined&&bgnd._webgl.texture)
{gl.deleteTexture(bgnd._webgl.texture);}
if(bgnd._webgl.shader.position!==undefined)
{gl.deleteBuffer(bgnd._webgl.buffers[1]);gl.deleteBuffer(bgnd._webgl.buffers[0]);}
if(bgnd._webgl.shader.texcoord!==undefined)
{gl.deleteBuffer(bgnd._webgl.buffers[2]);}
bgnd._webgl={};}
bgnd._dirty=false;var url=bgnd.getTexUrl();var i=0;var w=1,h=1;if(url.length>0&&url[0].length>0)
{if(url.length>=6&&url[1].length>0&&url[2].length>0&&url[3].length>0&&url[4].length>0&&url[5].length>0)
{var sphere=new x3dom.nodeTypes.Sphere();bgnd._webgl={positions:sphere._mesh._positions[0],indexes:sphere._mesh._indices[0],buffers:[{},{}]};bgnd._webgl.primType=gl.TRIANGLES;bgnd._webgl.shader=this.getShaderProgram(gl,['vs-x3d-bg-textureCube','fs-x3d-bg-textureCube']);bgnd._webgl.texture=this.loadCubeMap(gl,url,bgnd._nameSpace.doc,true);}
else
{var texture=gl.createTexture();var image=new Image();image.onload=function()
{bgnd._nameSpace.doc.needRender=true;bgnd._nameSpace.doc.downloadCount-=1;bgnd._webgl.texture=texture;gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,true);gl.bindTexture(gl.TEXTURE_2D,texture);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,image);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.bindTexture(gl.TEXTURE_2D,null);gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,false);};image.src=bgnd._nameSpace.getURL(url[0]);bgnd._nameSpace.doc.downloadCount+=1;bgnd._webgl={positions:[-w,-h,0,-w,h,0,w,-h,0,w,h,0],indexes:[0,1,2,3],buffers:[{},{}]};bgnd._webgl.primType=gl.TRIANGLE_STRIP;bgnd._webgl.shader=this.getShaderProgram(gl,['vs-x3d-bg-texture','fs-x3d-bg-texture']);}}
else
{if(bgnd.getSkyColor().length>1||bgnd.getGroundColor().length)
{var sphere=new x3dom.nodeTypes.Sphere();bgnd._webgl={positions:sphere._mesh._positions[0],texcoords:sphere._mesh._texCoords[0],indexes:sphere._mesh._indices[0],buffers:[{},{},{}],texture:{}};bgnd._webgl.primType=gl.TRIANGLES;bgnd._webgl.shader=this.getShaderProgram(gl,['vs-x3d-bg-texture-bgnd','fs-x3d-bg-texture']);var N=nextHighestPowerOfTwo(bgnd.getSkyColor().length+bgnd.getGroundColor().length+2);N=(N<512)?512:N;var n=bgnd._vf.groundAngle.length;var tmp=[],arr=[];var colors=[],sky=[0];for(i=0;i<bgnd._vf.skyColor.length;i++)
colors[i]=bgnd._vf.skyColor[i];for(i=0;i<bgnd._vf.skyAngle.length;i++)
sky[i+1]=bgnd._vf.skyAngle[i];if(n>0){if(sky[sky.length-1]<Math.PI/2){sky[sky.length]=Math.PI/2-x3dom.fields.Eps;colors[colors.length]=colors[colors.length-1];}
for(i=n-1;i>=0;i--){if((i==n-1)&&(Math.PI-bgnd._vf.groundAngle[i]<=Math.PI/2)){sky[sky.length]=Math.PI/2;colors[colors.length]=bgnd._vf.groundColor[bgnd._vf.groundColor.length-1];}
sky[sky.length]=Math.PI-bgnd._vf.groundAngle[i];colors[colors.length]=bgnd._vf.groundColor[i+1];}
sky[sky.length]=Math.PI;colors[colors.length]=bgnd._vf.groundColor[0];}
else{if(sky[sky.length-1]<Math.PI){sky[sky.length]=Math.PI;colors[colors.length]=colors[colors.length-1];}}
for(i=0;i<sky.length;i++)
sky[i]/=Math.PI;x3dom.debug.assert(sky.length==colors.length);var interp=new x3dom.nodeTypes.ColorInterpolator();interp._vf.key=new x3dom.fields.MFFloat(sky);interp._vf.keyValue=new x3dom.fields.MFColor(colors);for(i=0;i<N;i++){var fract=i/(N-1.0);interp._fieldWatchers.set_fraction[0].call(interp,fract);tmp[i]=interp._vf.value_changed;}
tmp.reverse();for(i=0;i<tmp.length;i++){arr[3*i+0]=Math.floor(tmp[i].r*255);arr[3*i+1]=Math.floor(tmp[i].g*255);arr[3*i+2]=Math.floor(tmp[i].b*255);}
var pixels=new Uint8Array(arr);var format=gl.RGB;N=(pixels.length)/3;texture=gl.createTexture();bgnd._webgl.texture=texture;gl.bindTexture(gl.TEXTURE_2D,texture);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.NEAREST);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.NEAREST);gl.pixelStorei(gl.UNPACK_ALIGNMENT,1);gl.texImage2D(gl.TEXTURE_2D,0,format,1,N,0,format,gl.UNSIGNED_BYTE,pixels);}
else
{bgnd._webgl={};}}
if(bgnd._webgl.shader)
{var sp=bgnd._webgl.shader;var positionBuffer=gl.createBuffer();bgnd._webgl.buffers[1]=positionBuffer;gl.bindBuffer(gl.ARRAY_BUFFER,positionBuffer);var vertices=new Float32Array(bgnd._webgl.positions);gl.bufferData(gl.ARRAY_BUFFER,vertices,gl.STATIC_DRAW);gl.bindBuffer(gl.ARRAY_BUFFER,positionBuffer);gl.vertexAttribPointer(sp.position,3,gl.FLOAT,false,0,0);gl.enableVertexAttribArray(sp.position);var indicesBuffer=gl.createBuffer();bgnd._webgl.buffers[0]=indicesBuffer;var indexArray=new Uint16Array(bgnd._webgl.indexes);gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,indicesBuffer);gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,indexArray,gl.STATIC_DRAW);delete vertices;delete indexArray;if(sp.texcoord!==undefined)
{var texcBuffer=gl.createBuffer();bgnd._webgl.buffers[2]=texcBuffer;var texcoords=new Float32Array(bgnd._webgl.texcoords);gl.bindBuffer(gl.ARRAY_BUFFER,texcBuffer);gl.bufferData(gl.ARRAY_BUFFER,texcoords,gl.STATIC_DRAW);gl.vertexAttribPointer(sp.texcoord,2,gl.FLOAT,false,0,0);gl.enableVertexAttribArray(sp.texcoord);delete texcoords;}}
bgnd._webgl.render=function(gl,mat_scene)
{var sp=bgnd._webgl.shader;if(sp&&sp.texcoord&&bgnd._webgl.texture)
{gl.clearDepth(1.0);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT|gl.STENCIL_BUFFER_BIT);gl.frontFace(gl.CCW);gl.disable(gl.CULL_FACE);gl.disable(gl.DEPTH_TEST);gl.disable(gl.BLEND);sp.bind();if(!sp.tex){sp.tex=0;}
sp.alpha=1.0;sp.modelViewProjectionMatrix=mat_scene.toGL();gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_2D,bgnd._webgl.texture);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.NEAREST);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.NEAREST);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,bgnd._webgl.buffers[0]);gl.bindBuffer(gl.ARRAY_BUFFER,bgnd._webgl.buffers[1]);gl.vertexAttribPointer(sp.position,3,gl.FLOAT,false,0,0);gl.enableVertexAttribArray(sp.position);gl.bindBuffer(gl.ARRAY_BUFFER,bgnd._webgl.buffers[2]);gl.vertexAttribPointer(sp.texcoord,2,gl.FLOAT,false,0,0);gl.enableVertexAttribArray(sp.texcoord);try{gl.drawElements(bgnd._webgl.primType,bgnd._webgl.indexes.length,gl.UNSIGNED_SHORT,0);}
catch(e){x3dom.debug.logException("Render background: "+e);}
gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_2D,null);gl.disableVertexAttribArray(sp.position);gl.disableVertexAttribArray(sp.texcoord);gl.clear(gl.DEPTH_BUFFER_BIT|gl.STENCIL_BUFFER_BIT);}
else if(!sp||!bgnd._webgl.texture||(bgnd._webgl.texture.textureCubeReady!==undefined&&bgnd._webgl.texture.textureCubeReady!==true))
{var bgCol=bgnd.getSkyColor().toGL();bgCol[3]=1.0-bgnd.getTransparency();gl.clearColor(bgCol[0],bgCol[1],bgCol[2],bgCol[3]);gl.clearDepth(1.0);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT|gl.STENCIL_BUFFER_BIT);}
else
{gl.clearDepth(1.0);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT|gl.STENCIL_BUFFER_BIT);gl.frontFace(gl.CCW);gl.disable(gl.CULL_FACE);gl.disable(gl.DEPTH_TEST);gl.disable(gl.BLEND);sp.bind();if(!sp.tex){sp.tex=0;}
if(bgnd._webgl.texture.textureCubeReady){sp.modelViewProjectionMatrix=mat_scene.toGL();gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_CUBE_MAP,bgnd._webgl.texture);gl.texParameteri(gl.TEXTURE_CUBE_MAP,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_CUBE_MAP,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_CUBE_MAP,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_CUBE_MAP,gl.TEXTURE_MAG_FILTER,gl.LINEAR);}
else{gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_2D,bgnd._webgl.texture);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);}
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,bgnd._webgl.buffers[0]);gl.bindBuffer(gl.ARRAY_BUFFER,bgnd._webgl.buffers[1]);gl.vertexAttribPointer(sp.position,3,gl.FLOAT,false,0,0);gl.enableVertexAttribArray(sp.position);try{gl.drawElements(bgnd._webgl.primType,bgnd._webgl.indexes.length,gl.UNSIGNED_SHORT,0);}
catch(e){x3dom.debug.logException("Render background: "+e);}
gl.disableVertexAttribArray(sp.position);if(bgnd._webgl.texture.textureCubeReady){gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_CUBE_MAP,null);}
else{gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_2D,null);}
gl.clear(gl.DEPTH_BUFFER_BIT|gl.STENCIL_BUFFER_BIT);}};};Context.prototype.setupFgnds=function(gl,scene)
{if(scene._fgnd!==undefined){return;}
var w=1,h=1;scene._fgnd={};scene._fgnd._webgl={positions:[-w,-h,0,-w,h,0,w,-h,0,w,h,0],indexes:[0,1,2,3],buffers:[{},{}]};scene._fgnd._webgl.primType=gl.TRIANGLE_STRIP;scene._fgnd._webgl.shader=this.getShaderProgram(gl,['vs-x3d-bg-texture','fs-x3d-bg-texture']);var sp=scene._fgnd._webgl.shader;var positionBuffer=gl.createBuffer();scene._fgnd._webgl.buffers[1]=positionBuffer;gl.bindBuffer(gl.ARRAY_BUFFER,positionBuffer);var vertices=new Float32Array(scene._fgnd._webgl.positions);gl.bufferData(gl.ARRAY_BUFFER,vertices,gl.STATIC_DRAW);gl.bindBuffer(gl.ARRAY_BUFFER,positionBuffer);gl.vertexAttribPointer(sp.position,3,gl.FLOAT,false,0,0);var indicesBuffer=gl.createBuffer();scene._fgnd._webgl.buffers[0]=indicesBuffer;var indexArray=new Uint16Array(scene._fgnd._webgl.indexes);gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,indicesBuffer);gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,indexArray,gl.STATIC_DRAW);delete vertices;delete indexArray;scene._fgnd._webgl.render=function(gl,tex)
{scene._fgnd._webgl.texture=tex;gl.frontFace(gl.CCW);gl.disable(gl.CULL_FACE);gl.disable(gl.DEPTH_TEST);sp.bind();if(!sp.tex){sp.tex=0;}
gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_2D,scene._fgnd._webgl.texture);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,scene._fgnd._webgl.buffers[0]);gl.bindBuffer(gl.ARRAY_BUFFER,scene._fgnd._webgl.buffers[1]);gl.vertexAttribPointer(sp.position,3,gl.FLOAT,false,0,0);gl.enableVertexAttribArray(sp.position);try{gl.drawElements(scene._fgnd._webgl.primType,scene._fgnd._webgl.indexes.length,gl.UNSIGNED_SHORT,0);}
catch(e){x3dom.debug.logException("Render background: "+e);}
gl.disableVertexAttribArray(sp.position);gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_2D,null);};};Context.prototype.renderShadowPass=function(gl,scene,mat_light,mat_scene)
{gl.bindFramebuffer(gl.FRAMEBUFFER,scene._webgl.fboShadow.fbo);gl.viewport(0,0,scene._webgl.fboShadow.width,scene._webgl.fboShadow.height);gl.clearColor(1.0,1.0,1.0,1.0);gl.clearDepth(1.0);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);gl.depthFunc(gl.LEQUAL);gl.enable(gl.DEPTH_TEST);gl.enable(gl.CULL_FACE);gl.disable(gl.BLEND);var sp=scene._webgl.shadowShader;sp.bind();var i,n=scene.drawableObjects.length;for(i=0;i<n;i++)
{var trafo=scene.drawableObjects[i][0];var shape=scene.drawableObjects[i][1];sp.modelViewMatrix=mat_light.mult(trafo).toGL();sp.modelViewProjectionMatrix=mat_scene.mult(trafo).toGL();for(var q=0;q<shape._webgl.positions.length;q++)
{if(sp.position!==undefined)
{gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,shape._webgl.buffers[5*q+0]);gl.bindBuffer(gl.ARRAY_BUFFER,shape._webgl.buffers[5*q+1]);gl.vertexAttribPointer(sp.position,3,gl.FLOAT,false,0,0);gl.enableVertexAttribArray(sp.position);}
try{if(shape._webgl.indexes&&shape._webgl.indexes[q])
gl.drawElements(shape._webgl.primType,shape._webgl.indexes[q].length,gl.UNSIGNED_SHORT,0);}
catch(e){x3dom.debug.logException(shape._DEF+" renderShadowPass(): "+e);}
if(sp.position!==undefined){gl.disableVertexAttribArray(sp.position);}}}
gl.flush();gl.bindFramebuffer(gl.FRAMEBUFFER,null);};Context.prototype.renderPickingPass=function(gl,scene,mat_view,mat_scene,min,max,pickMode,lastX,lastY)
{gl.bindFramebuffer(gl.FRAMEBUFFER,scene._webgl.fboPick.fbo);gl.viewport(0,0,scene._webgl.fboPick.width,scene._webgl.fboPick.height);gl.clearColor(0.0,0.0,0.0,1.0);gl.clearDepth(1.0);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);gl.depthFunc(gl.LEQUAL);gl.enable(gl.DEPTH_TEST);gl.enable(gl.CULL_FACE);gl.disable(gl.BLEND);var sp;if(pickMode===0)
{sp=scene._webgl.pickShader;}
else if(pickMode===1)
{sp=scene._webgl.pickColorShader;}
else if(pickMode===2)
{sp=scene._webgl.pickTexCoordShader;}
sp.bind();var i,n=scene.drawableObjects.length;for(i=0;i<n;i++)
{var trafo=scene.drawableObjects[i][0];var shape=scene.drawableObjects[i][1];if(shape._objectID<1||shape._webgl===undefined)
continue;sp.modelMatrix=trafo.toGL();sp.modelViewProjectionMatrix=mat_scene.mult(trafo).toGL();sp.wcMin=min.toGL();sp.wcMax=max.toGL();sp.alpha=1.0-shape._objectID/255.0;for(var q=0;q<shape._webgl.positions.length;q++)
{if(sp.position!==undefined)
{gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,shape._webgl.buffers[5*q+0]);gl.bindBuffer(gl.ARRAY_BUFFER,shape._webgl.buffers[5*q+1]);gl.vertexAttribPointer(sp.position,3,gl.FLOAT,false,0,0);gl.enableVertexAttribArray(sp.position);}
if(sp.color!==undefined)
{gl.bindBuffer(gl.ARRAY_BUFFER,shape._webgl.buffers[5*q+4]);gl.vertexAttribPointer(sp.color,shape._cf.geometry.node._mesh._numColComponents,gl.FLOAT,false,0,0);gl.enableVertexAttribArray(sp.color);}
if(sp.texcoord!==undefined)
{gl.bindBuffer(gl.ARRAY_BUFFER,shape._webgl.buffers[5*q+3]);gl.vertexAttribPointer(sp.texcoord,shape._cf.geometry.node._mesh._numTexComponents,gl.FLOAT,false,0,0);gl.enableVertexAttribArray(sp.texcoord);}
if(shape.isSolid()){gl.enable(gl.CULL_FACE);if(shape.isCCW()){gl.frontFace(gl.CCW);}
else{gl.frontFace(gl.CW);}}
else{gl.disable(gl.CULL_FACE);}
try{if(shape._webgl.indexes&&shape._webgl.indexes[q])
gl.drawElements(shape._webgl.primType,shape._webgl.indexes[q].length,gl.UNSIGNED_SHORT,0);}
catch(e){x3dom.debug.logException(shape._DEF+" renderPickingPass(): "+e);}
if(sp.position!==undefined){gl.disableVertexAttribArray(sp.position);}
if(sp.color!==undefined){gl.disableVertexAttribArray(sp.color);}
if(sp.texcoord!==undefined){gl.disableVertexAttribArray(sp.texcoord);}}}
gl.flush();try{var x=lastX*scene._webgl.pickScale,y=scene._webgl.fboPick.height-1-lastY*scene._webgl.pickScale;var data=new Uint8Array(4);gl.readPixels(x,y,1,1,gl.RGBA,gl.UNSIGNED_BYTE,data);scene._webgl.fboPick.pixelData=data;}
catch(se){scene._webgl.fboPick.pixelData=[];x3dom.debug.logException(se+" (cannot pick)");}
gl.bindFramebuffer(gl.FRAMEBUFFER,null);};Context.prototype.renderShape=function(transform,shape,viewarea,slights,numLights,mat_view,mat_scene,mat_light,gl,activeTex,oneShadowExistsAlready)
{if(shape._webgl===undefined){return;}
var scene=viewarea._scene;var sp=shape._webgl.shader;if(!sp){shape._webgl.shader=getDefaultShaderProgram(gl,'default');sp=shape._webgl.shader;}
sp.bind();if(x3dom.isa(shape._cf.geometry.node,x3dom.nodeTypes.Text)){sp.useText=1.0;}else{sp.useText=0.0;}
var fog=scene.getFog();if(fog){sp['fog.color']=fog._vf.color.toGL();sp['fog.visibilityRange']=fog._vf.visibilityRange;if(fog._vf.fogType=="LINEAR")sp['fog.fogType']=0.0;else sp['fog.fogType']=1.0;}
var mat=shape._cf.appearance.node._cf.material.node;var shaderCSS=shape._cf.appearance.node._shader;if(shaderCSS!==null){if(x3dom.isa(shaderCSS,x3dom.nodeTypes.CommonSurfaceShader)){sp['material.diffuseColor']=shaderCSS._vf.diffuseFactor.toGL();sp['material.specularColor']=shaderCSS._vf.specularFactor.toGL();sp['material.emissiveColor']=shaderCSS._vf.emissiveFactor.toGL();sp['material.shininess']=shaderCSS._vf.shininessFactor;sp['material.ambientIntensity']=(shaderCSS._vf.ambientFactor.x+
shaderCSS._vf.ambientFactor.y+shaderCSS._vf.ambientFactor.z)/3;sp['material.transparency']=1.0-shaderCSS._vf.alphaFactor;}
else{shaderCSS=null;}}
else{sp['material.diffuseColor']=mat._vf.diffuseColor.toGL();sp['material.specularColor']=mat._vf.specularColor.toGL();sp['material.emissiveColor']=mat._vf.emissiveColor.toGL();sp['material.shininess']=mat._vf.shininess;sp['material.ambientIntensity']=mat._vf.ambientIntensity;sp['material.transparency']=mat._vf.transparency;}
sp.alpha=1.0-mat._vf.transparency;if(numLights>0)
{if(numLights>8){x3dom.debug.logWarning("Too many lights! Only 8 lights supported!");numLights=8;}
for(var p=0;p<numLights;p++){if(x3dom.isa(slights[p],x3dom.nodeTypes.DirectionalLight))
{sp['light['+p+'].type']=0.0;sp['light['+p+'].on']=(slights[p]._vf.on)?1.0:0.0;sp['light['+p+'].color']=slights[p]._vf.color.toGL();sp['light['+p+'].intensity']=slights[p]._vf.intensity;sp['light['+p+'].ambientIntensity']=slights[p]._vf.ambientIntensity;sp['light['+p+'].direction']=mat_view.multMatrixVec(slights[p]._vf.direction).toGL();sp['light['+p+'].attenuation']=[1.0,1.0,1.0];sp['light['+p+'].location']=[1.0,1.0,1.0];sp['light['+p+'].radius']=0.0;sp['light['+p+'].beamWidth']=0.0;sp['light['+p+'].cutOffAngle']=0.0;sp['light['+p+'].shadowIntensity']=slights[p]._vf.shadowIntensity;}
else if(x3dom.isa(slights[p],x3dom.nodeTypes.PointLight))
{sp['light['+p+'].type']=1.0;sp['light['+p+'].on']=(slights[p]._vf.on)?1.0:0.0;sp['light['+p+'].color']=slights[p]._vf.color.toGL();sp['light['+p+'].intensity']=slights[p]._vf.intensity;sp['light['+p+'].ambientIntensity']=slights[p]._vf.ambientIntensity;sp['light['+p+'].direction']=[1.0,1.0,1.0];sp['light['+p+'].attenuation']=slights[p]._vf.attenuation.toGL();sp['light['+p+'].location']=mat_view.multMatrixPnt(slights[p]._vf.location).toGL();sp['light['+p+'].radius']=slights[p]._vf.radius;sp['light['+p+'].beamWidth']=0.0;sp['light['+p+'].cutOffAngle']=0.0;sp['light['+p+'].shadowIntensity']=slights[p]._vf.shadowIntensity;}
else if(x3dom.isa(slights[p],x3dom.nodeTypes.SpotLight))
{sp['light['+p+'].type']=2.0;sp['light['+p+'].on']=(slights[p]._vf.on)?1.0:0.0;sp['light['+p+'].color']=slights[p]._vf.color.toGL();sp['light['+p+'].intensity']=slights[p]._vf.intensity;sp['light['+p+'].ambientIntensity']=slights[p]._vf.ambientIntensity;sp['light['+p+'].direction']=mat_view.multMatrixVec(slights[p]._vf.direction).toGL();sp['light['+p+'].attenuation']=slights[p]._vf.attenuation.toGL();sp['light['+p+'].location']=mat_view.multMatrixPnt(slights[p]._vf.location).toGL();sp['light['+p+'].radius']=slights[p]._vf.radius;sp['light['+p+'].beamWidth']=slights[p]._vf.beamWidth;sp['light['+p+'].cutOffAngle']=slights[p]._vf.cutOffAngle;sp['light['+p+'].shadowIntensity']=slights[p]._vf.shadowIntensity;}}}
var nav=scene.getNavigationInfo();if(nav._vf.headlight){sp['light['+numLights+'].type']=0.0;sp['light['+numLights+'].on']=1.0;sp['light['+numLights+'].color']=[1.0,1.0,1.0];sp['light['+numLights+'].intensity']=1.0;sp['light['+numLights+'].ambientIntensity']=0.0;sp['light['+numLights+'].direction']=[0.0,0.0,-1.0];sp['light['+numLights+'].attenuation']=[1.0,1.0,1.0];sp['light['+numLights+'].location']=[1.0,1.0,1.0];sp['light['+numLights+'].radius']=0.0;sp['light['+numLights+'].beamWidth']=0.0;sp['light['+numLights+'].cutOffAngle']=0.0;}
var userShader=shape._cf.appearance.node._shader;if(userShader){for(var fName in userShader._vf){if(userShader._vf.hasOwnProperty(fName)&&fName!=='language'){var field=userShader._vf[fName];try{sp[fName]=field.toGL();}
catch(noToGl){sp[fName]=field;}}}}
var model_view=mat_view.mult(transform);sp.modelViewMatrix=model_view.toGL();sp.normalMatrix=model_view.inverse().transpose().toGL();if(userShader){sp.modelViewMatrixInverse=model_view.inverse().toGL();}
sp.modelViewProjectionMatrix=mat_scene.mult(transform).toGL();for(var cnt=0;shape._webgl.texture!==undefined&&cnt<shape._webgl.texture.length;cnt++)
{if(shape._webgl.texture[cnt])
{var tex=null;if(shape._cf.appearance.node._cf.texture.node){tex=shape._cf.appearance.node._cf.texture.node.getTexture(cnt);sp.origChannelCount=tex._vf.origChannelCount;}
var wrapS=gl.REPEAT,wrapT=gl.REPEAT;if(tex&&tex._vf.repeatS===false){wrapS=gl.CLAMP_TO_EDGE;}
if(tex&&tex._vf.repeatT===false){wrapT=gl.CLAMP_TO_EDGE;}
if(shape._webgl.texture[cnt].textureCubeReady&&tex&&x3dom.isa(tex,x3dom.nodeTypes.X3DEnvironmentTextureNode))
{gl.activeTexture(activeTex[cnt]);gl.bindTexture(gl.TEXTURE_CUBE_MAP,shape._webgl.texture[cnt]);gl.texParameteri(gl.TEXTURE_CUBE_MAP,gl.TEXTURE_WRAP_S,wrapS);gl.texParameteri(gl.TEXTURE_CUBE_MAP,gl.TEXTURE_WRAP_T,wrapT);gl.texParameteri(gl.TEXTURE_CUBE_MAP,gl.TEXTURE_MAG_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_CUBE_MAP,gl.TEXTURE_MIN_FILTER,gl.LINEAR);}
else
{gl.activeTexture(activeTex[cnt]);gl.bindTexture(gl.TEXTURE_2D,shape._webgl.texture[cnt]);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,wrapS);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,wrapT);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);}
if(shape._cf.appearance.node._cf.textureTransform.node!==null)
{var texTrafo=shape._cf.appearance.node.texTransformMatrix();sp.texTrafoMatrix=texTrafo.toGL();}
if(shape._cf.geometry.node._cf.texCoord!==undefined&&shape._cf.geometry.node._cf.texCoord.node!==null&&shape._cf.geometry.node._cf.texCoord.node._vf.mode)
{var texMode=shape._cf.geometry.node._cf.texCoord.node._vf.mode;if(texMode.toLowerCase()=="sphere"){sp.sphereMapping=1.0;}
else{sp.sphereMapping=0.0;}}
else{sp.sphereMapping=0.0;}
if(shaderCSS){var texUnit=0;if(shaderCSS.getDiffuseMap())if(!sp.tex)sp.tex=texUnit++;if(shaderCSS.getNormalMap())if(!sp.bump)sp.bump=texUnit++;if(shaderCSS.getSpecularMap())if(!sp.spec)sp.spec=texUnit++;}
else{if(!sp.tex){sp.tex=0;}}}}
if(oneShadowExistsAlready)
{if(!sp.sh_tex){sp.sh_tex=cnt;}
gl.activeTexture(activeTex[cnt]);gl.bindTexture(gl.TEXTURE_2D,scene._webgl.fboShadow.tex);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);sp.matPV=mat_light.mult(transform).toGL();}
for(var df=0;df<shape._webgl.dynamicFields.length;df++)
{var attrib=shape._webgl.dynamicFields[df];if(sp[attrib.name]!==undefined)
{gl.bindBuffer(gl.ARRAY_BUFFER,attrib.buf);gl.vertexAttribPointer(sp[attrib.name],attrib.numComponents,gl.FLOAT,false,0,0);gl.enableVertexAttribArray(sp[attrib.name]);}}
if(shape.isSolid()){gl.enable(gl.CULL_FACE);if(shape.isCCW()){gl.frontFace(gl.CCW);}
else{gl.frontFace(gl.CW);}}
else{gl.disable(gl.CULL_FACE);}
sp.solid=(shape.isSolid()?1.0:0.0);for(var q=0;q<shape._webgl.positions.length;q++)
{if(sp.position!==undefined)
{gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,shape._webgl.buffers[5*q+0]);gl.bindBuffer(gl.ARRAY_BUFFER,shape._webgl.buffers[5*q+1]);gl.vertexAttribPointer(sp.position,3,gl.FLOAT,false,0,0);gl.enableVertexAttribArray(sp.position);}
if(sp.normal!==undefined)
{gl.bindBuffer(gl.ARRAY_BUFFER,shape._webgl.buffers[5*q+2]);gl.vertexAttribPointer(sp.normal,3,gl.FLOAT,false,0,0);gl.enableVertexAttribArray(sp.normal);}
if(sp.texcoord!==undefined)
{gl.bindBuffer(gl.ARRAY_BUFFER,shape._webgl.buffers[5*q+3]);gl.vertexAttribPointer(sp.texcoord,shape._cf.geometry.node._mesh._numTexComponents,gl.FLOAT,false,0,0);gl.enableVertexAttribArray(sp.texcoord);}
if(sp.color!==undefined)
{gl.bindBuffer(gl.ARRAY_BUFFER,shape._webgl.buffers[5*q+4]);gl.vertexAttribPointer(sp.color,shape._cf.geometry.node._mesh._numColComponents,gl.FLOAT,false,0,0);gl.enableVertexAttribArray(sp.color);}
try{if(viewarea._points!==undefined&&viewarea._points){gl.drawElements(gl.POINTS,shape._webgl.indexes[q].length,gl.UNSIGNED_SHORT,0);}
else{if(shape._webgl.primType==gl.POINTS){gl.enable(gl.VERTEX_PROGRAM_POINT_SIZE);gl.drawArrays(gl.POINTS,0,shape._webgl.positions[q].length/3);gl.disable(gl.VERTEX_PROGRAM_POINT_SIZE);}
else{if(shape._webgl.indexes&&shape._webgl.indexes[q])
gl.drawElements(shape._webgl.primType,shape._webgl.indexes[q].length,gl.UNSIGNED_SHORT,0);}}}
catch(e){x3dom.debug.logException(shape._DEF+" renderScene(): "+e);}
if(sp.position!==undefined){gl.disableVertexAttribArray(sp.position);}
if(sp.normal!==undefined){gl.disableVertexAttribArray(sp.normal);}
if(sp.texcoord!==undefined){gl.disableVertexAttribArray(sp.texcoord);}
if(sp.color!==undefined){gl.disableVertexAttribArray(sp.color);}}
if(shape._webgl.indexes&&shape._webgl.indexes[0])
this.numFaces+=shape._cf.geometry.node._mesh._numFaces;this.numCoords+=shape._cf.geometry.node._mesh._numCoords;for(cnt=0;shape._webgl.texture!==undefined&&cnt<shape._webgl.texture.length;cnt++)
{if(shape._webgl.texture[cnt])
{tex=null;if(shape._cf.appearance.node._cf.texture.node){tex=shape._cf.appearance.node._cf.texture.node.getTexture(cnt);}
if(shape._webgl.texture[cnt].textureCubeReady&&tex&&x3dom.isa(tex,x3dom.nodeTypes.X3DEnvironmentTextureNode))
{gl.activeTexture(activeTex[cnt]);gl.bindTexture(gl.TEXTURE_CUBE_MAP,null);}
else
{gl.activeTexture(activeTex[cnt]);gl.bindTexture(gl.TEXTURE_2D,null);}}}
if(oneShadowExistsAlready)
{gl.activeTexture(activeTex[cnt]);gl.bindTexture(gl.TEXTURE_2D,null);}
for(df=0;df<shape._webgl.dynamicFields.length;df++)
{attrib=shape._webgl.dynamicFields[df];if(sp[attrib.name]!==undefined){gl.disableVertexAttribArray(sp[attrib.name]);}}};Context.prototype.pickValue=function(viewarea,x,y,viewMat,sceneMat)
{var gl=this.ctx3d;var scene=viewarea._scene;if(gl===null||scene===null||!scene._webgl||scene.drawableObjects===undefined||!scene.drawableObjects||scene._vf.pickMode.toLowerCase()==="box")
{return false;}
var mat_view,mat_scene;if(arguments.length>4){mat_view=viewMat;mat_scene=sceneMat;}
else{mat_view=viewarea._last_mat_view;mat_scene=viewarea._last_mat_scene;}
var pickMode=(scene._vf.pickMode.toLowerCase()==="color")?1:((scene._vf.pickMode.toLowerCase()==="texcoord")?2:0);var min=scene._lastMin;var max=scene._lastMax;this.renderPickingPass(gl,scene,mat_view,mat_scene,min,max,pickMode,x,y);var index=0;if(index>=0&&index<scene._webgl.fboPick.pixelData.length){var pickPos=new x3dom.fields.SFVec3f(0,0,0);var charMax=(pickMode>0)?1:255;pickPos.x=scene._webgl.fboPick.pixelData[index+0]/charMax;pickPos.y=scene._webgl.fboPick.pixelData[index+1]/charMax;pickPos.z=scene._webgl.fboPick.pixelData[index+2]/charMax;if(pickMode===0){pickPos=pickPos.multComponents(max.subtract(min)).add(min);}
var objId=255-scene._webgl.fboPick.pixelData[index+3];if(objId>0){viewarea._pickingInfo.pickPos=pickPos;viewarea._pickingInfo.pickObj=x3dom.nodeTypes.Shape.idMap.nodeID[objId];}
else{viewarea._pickingInfo.pickObj=null;viewarea._pickingInfo.lastClickObj=null;}}
return true;}
Context.prototype.renderScene=function(viewarea)
{var gl=this.ctx3d;var scene=viewarea._scene;if(gl===null||scene===null)
{return;}
var rentex=viewarea._doc._nodeBag.renderTextures;var rt_tex,rtl_i,rtl_n=rentex.length;if(!scene._webgl)
{scene._webgl={};this.setupFgnds(gl,scene);scene._webgl.pickScale=0.5;scene._webgl._currFboWidth=Math.round(this.canvas.width*scene._webgl.pickScale);scene._webgl._currFboHeight=Math.round(this.canvas.height*scene._webgl.pickScale);scene._webgl.fboPick=this.initFbo(gl,scene._webgl._currFboWidth,scene._webgl._currFboHeight,true);scene._webgl.fboPick.pixelData=null;scene._webgl.pickShader=getDefaultShaderProgram(gl,'pick');scene._webgl.pickColorShader=getDefaultShaderProgram(gl,'vertexcolorUnlit');scene._webgl.pickTexCoordShader=getDefaultShaderProgram(gl,'texcoordUnlit');scene._webgl.fboShadow=this.initFbo(gl,1024,1024,false);scene._webgl.shadowShader=getDefaultShaderProgram(gl,'shadow');for(rtl_i=0;rtl_i<rtl_n;rtl_i++){rt_tex=rentex[rtl_i];rt_tex._webgl={};rt_tex._webgl.fbo=this.initFbo(gl,rt_tex._vf.dimensions[0],rt_tex._vf.dimensions[1],false);}
var min=x3dom.fields.SFVec3f.MAX();var max=x3dom.fields.SFVec3f.MIN();scene.getVolume(min,max,true);scene._lastMin=min;scene._lastMax=max;}
else
{var fboWidth=Math.round(this.canvas.width*scene._webgl.pickScale);var fboHeight=Math.round(this.canvas.height*scene._webgl.pickScale);if(scene._webgl._currFboWidth!==fboWidth||scene._webgl._currFboHeight!==fboHeight)
{scene._webgl._currFboWidth=fboWidth;scene._webgl._currFboHeight=fboHeight;scene._webgl.fboPick=this.initFbo(gl,fboWidth,fboHeight,true);scene._webgl.fboPick.pixelData=null;x3dom.debug.logInfo("Refreshed picking FBO to size ("+
(fboWidth)+", "+(fboHeight)+")");}}
var bgnd=scene.getBackground();this.setupScene(gl,bgnd);var t0,t1;this.numFaces=0;this.numCoords=0;scene.drawableObjects=null;{scene.drawableObjects=[];scene.drawableObjects.LODs=[];scene.drawableObjects.Billboards=[];t0=new Date().getTime();scene.collectDrawableObjects(x3dom.fields.SFMatrix4f.identity(),scene.drawableObjects);t1=new Date().getTime()-t0;if(this.canvas.parent.statDiv){this.canvas.parent.statDiv.appendChild(document.createElement("br"));this.canvas.parent.statDiv.appendChild(document.createTextNode("traverse: "+t1));}}
var mat_view=viewarea.getViewMatrix();viewarea._last_mat_view=mat_view;var mat_scene=viewarea.getWCtoCCMatrix();viewarea._last_mat_scene=mat_scene;t0=new Date().getTime();var zPos=[];var i,m,n=scene.drawableObjects.length;var center,trafo,obj3d;for(i=0;i<n;i++)
{trafo=scene.drawableObjects[i][0];obj3d=scene.drawableObjects[i][1];this.setupShape(gl,obj3d,viewarea);center=obj3d.getCenter();center=trafo.multMatrixPnt(center);center=mat_view.multMatrixPnt(center);zPos[i]=[i,center.z];}
zPos.sort(function(a,b){return a[1]-b[1];});m=scene.drawableObjects.Billboards.length;n=scene.drawableObjects.LODs.length;if(m||n){center=new x3dom.fields.SFVec3f(0,0,0);center=mat_view.inverse().multMatrixPnt(center);}
for(i=0;i<n;i++)
{trafo=scene.drawableObjects.LODs[i][0];obj3d=scene.drawableObjects.LODs[i][1];if(obj3d){obj3d._eye=trafo.inverse().multMatrixPnt(center);}}
for(i=0;i<m;i++)
{trafo=scene.drawableObjects.Billboards[i][0];obj3d=scene.drawableObjects.Billboards[i][1];if(obj3d){obj3d._eye=trafo.inverse().multMatrixPnt(center);obj3d._eyeViewUp=new x3dom.fields.SFVec3f(mat_view._10,mat_view._11,mat_view._12);}}
t1=new Date().getTime()-t0;if(this.canvas.parent.statDiv){this.canvas.parent.statDiv.appendChild(document.createElement("br"));this.canvas.parent.statDiv.appendChild(document.createTextNode("sort: "+t1));}
var slights=viewarea.getLights();var numLights=slights.length;var oneShadowExistsAlready=false;for(var p=0;p<numLights;p++){if(slights[p]._vf.shadowIntensity>0.0&&!oneShadowExistsAlready){oneShadowExistsAlready=true;t0=new Date().getTime();var lightMatrix=viewarea.getLightMatrix()[0];var mat_light=viewarea.getWCtoLCMatrix(lightMatrix);this.renderShadowPass(gl,scene,lightMatrix,mat_light);t1=new Date().getTime()-t0;if(this.canvas.parent.statDiv){this.canvas.parent.statDiv.appendChild(document.createElement("br"));this.canvas.parent.statDiv.appendChild(document.createTextNode("shadow: "+t1));}}}
for(rtl_i=0;rtl_i<rtl_n;rtl_i++){this.renderRTPass(gl,viewarea,rentex[rtl_i]);}
t0=new Date().getTime();gl.viewport(0,0,this.canvas.width,this.canvas.height);bgnd._webgl.render(gl,mat_scene);gl.depthFunc(gl.LEQUAL);gl.enable(gl.DEPTH_TEST);gl.enable(gl.CULL_FACE);gl.blendFuncSeparate(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA,gl.ONE,gl.ONE);gl.enable(gl.BLEND);var activeTex=[gl.TEXTURE0,gl.TEXTURE1,gl.TEXTURE2,gl.TEXTURE3,gl.TEXTURE4,gl.TEXTURE5,gl.TEXTURE6,gl.TEXTURE7];for(i=0,n=zPos.length;i<n;i++)
{var obj=scene.drawableObjects[zPos[i][0]];this.renderShape(obj[0],obj[1],viewarea,slights,numLights,mat_view,mat_scene,mat_light,gl,activeTex,oneShadowExistsAlready);}
gl.disable(gl.BLEND);gl.disable(gl.DEPTH_TEST);if(viewarea._visDbgBuf!==undefined&&viewarea._visDbgBuf)
{if(scene._vf.pickMode.toLowerCase()==="idbuf"||scene._vf.pickMode.toLowerCase()==="color"||scene._vf.pickMode.toLowerCase()==="texcoord"){gl.viewport(0,3*this.canvas.height/4,this.canvas.width/4,this.canvas.height/4);scene._fgnd._webgl.render(gl,scene._webgl.fboPick.tex);}
if(oneShadowExistsAlready){gl.viewport(this.canvas.width/4,3*this.canvas.height/4,this.canvas.width/4,this.canvas.height/4);scene._fgnd._webgl.render(gl,scene._webgl.fboShadow.tex);}}
gl.flush();t1=new Date().getTime()-t0;if(this.canvas.parent.statDiv){this.canvas.parent.statDiv.appendChild(document.createElement("br"));this.canvas.parent.statDiv.appendChild(document.createTextNode("render: "+t1));this.canvas.parent.statDiv.appendChild(document.createElement("br"));this.canvas.parent.statDiv.appendChild(document.createTextNode("#Tris: "+this.numFaces));this.canvas.parent.statDiv.appendChild(document.createElement("br"));this.canvas.parent.statDiv.appendChild(document.createTextNode("#Pnts: "+this.numCoords));}};Context.prototype.renderRTPass=function(gl,viewarea,rt)
{var scene=viewarea._scene;var bgnd=null;var mat_view=rt.getViewMatrix();var mat_scene=rt.getWCtoCCMatrix();var lightMatrix=viewarea.getLightMatrix()[0];var mat_light=viewarea.getWCtoLCMatrix(lightMatrix);var i,n,m=rt._cf.excludeNodes.nodes.length;var arr=new Array(m);for(i=0;i<m;i++){var render=rt._cf.excludeNodes.nodes[i]._vf.render;if(render===undefined){arr[i]=-1;}
else{if(render===true)
arr[i]=1;else
arr[i]=0;}
rt._cf.excludeNodes.nodes[i]._vf.render=false;}
gl.bindFramebuffer(gl.FRAMEBUFFER,rt._webgl.fbo.fbo);gl.viewport(0,0,rt._webgl.fbo.width,rt._webgl.fbo.height);if(rt._cf.background.node===null)
{gl.clearColor(0,0,0,1);gl.clearDepth(1.0);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT|gl.STENCIL_BUFFER_BIT);}
else if(rt._cf.background.node===scene.getBackground())
{bgnd=scene.getBackground();bgnd._webgl.render(gl,mat_scene);}
else
{bgnd=rt._cf.background.node;this.setupScene(gl,bgnd);bgnd._webgl.render(gl,mat_scene);}
gl.depthFunc(gl.LEQUAL);gl.enable(gl.DEPTH_TEST);gl.enable(gl.CULL_FACE);gl.blendFuncSeparate(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA,gl.ONE,gl.ONE);gl.enable(gl.BLEND);var slights=viewarea.getLights();var numLights=slights.length;var oneShadowExistsAlready=false;var activeTex=[gl.TEXTURE0,gl.TEXTURE1,gl.TEXTURE2,gl.TEXTURE3,gl.TEXTURE4,gl.TEXTURE5,gl.TEXTURE6,gl.TEXTURE7];var transform,shape;var locScene=rt._cf.scene.node;if(!locScene||locScene===scene)
{n=scene.drawableObjects.length;for(i=0;i<n;i++)
{transform=scene.drawableObjects[i][0];shape=scene.drawableObjects[i][1];if(shape._vf.render!==undefined&&shape._vf.render===false)
continue;this.renderShape(transform,shape,viewarea,slights,numLights,mat_view,mat_scene,mat_light,gl,activeTex,oneShadowExistsAlready);}}
else
{locScene.drawableObjects=[];locScene.collectDrawableObjects(x3dom.fields.SFMatrix4f.identity(),locScene.drawableObjects);n=locScene.drawableObjects.length;for(i=0;i<n;i++)
{transform=locScene.drawableObjects[i][0];shape=locScene.drawableObjects[i][1];if(shape._vf.render!==undefined&&shape._vf.render===false)
continue;this.setupShape(gl,shape,viewarea);this.renderShape(transform,shape,viewarea,slights,numLights,mat_view,mat_scene,mat_light,gl,activeTex,oneShadowExistsAlready);}}
gl.disable(gl.BLEND);gl.disable(gl.DEPTH_TEST);gl.flush();gl.bindFramebuffer(gl.FRAMEBUFFER,null);for(i=0;i<m;i++){if(arr[i]!==0){rt._cf.excludeNodes.nodes[i]._vf.render=true;}}};Context.prototype.shutdown=function(viewarea)
{var gl=this.ctx3d;if(gl===null||scene===null||!scene||scene.drawableObjects===null)
{return;}
var scene=viewarea._scene;scene.collectDrawableObjects(x3dom.fields.SFMatrix4f.identity(),scene.drawableObjects);var bgnd=scene.getBackground();if(bgnd._webgl.texture!==undefined&&bgnd._webgl.texture)
{gl.deleteTexture(bgnd._webgl.texture);}
if(bgnd._webgl.shader.position!==undefined)
{gl.deleteBuffer(bgnd._webgl.buffers[1]);gl.deleteBuffer(bgnd._webgl.buffers[0]);}
for(var i=0,n=scene.drawableObjects.length;i<n;i++)
{var shape=scene.drawableObjects[i][1];var sp=shape._webgl.shader;for(var cnt=0;shape._webgl.texture!==undefined&&cnt<shape._webgl.texture.length;cnt++)
{if(shape._webgl.texture[cnt])
{gl.deleteTexture(shape._webgl.texture[cnt]);}}
for(var q=0;q<shape._webgl.positions.length;q++)
{if(sp.position!==undefined)
{gl.deleteBuffer(shape._webgl.buffers[5*q+1]);gl.deleteBuffer(shape._webgl.buffers[5*q+0]);}
if(sp.normal!==undefined)
{gl.deleteBuffer(shape._webgl.buffers[5*q+2]);}
if(sp.texcoord!==undefined)
{gl.deleteBuffer(shape._webgl.buffers[5*q+3]);}
if(sp.color!==undefined)
{gl.deleteBuffer(shape._webgl.buffers[5*q+4]);}}
for(var df=0;df<shape._webgl.dynamicFields.length;df++)
{var attrib=shape._webgl.dynamicFields[df];if(sp[attrib.name]!==undefined)
{gl.deleteBuffer(attrib.buf);}}
shape._webgl=null;}};Context.prototype.loadCubeMap=function(gl,url,doc,bgnd)
{var texture=gl.createTexture();gl.bindTexture(gl.TEXTURE_CUBE_MAP,texture);gl.texParameteri(gl.TEXTURE_CUBE_MAP,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_CUBE_MAP,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_CUBE_MAP,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_CUBE_MAP,gl.TEXTURE_MAG_FILTER,gl.LINEAR);gl.bindTexture(gl.TEXTURE_CUBE_MAP,null);var faces;if(bgnd){faces=[gl.TEXTURE_CUBE_MAP_POSITIVE_Z,gl.TEXTURE_CUBE_MAP_NEGATIVE_Z,gl.TEXTURE_CUBE_MAP_POSITIVE_Y,gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,gl.TEXTURE_CUBE_MAP_POSITIVE_X,gl.TEXTURE_CUBE_MAP_NEGATIVE_X];}
else{faces=[gl.TEXTURE_CUBE_MAP_POSITIVE_X,gl.TEXTURE_CUBE_MAP_NEGATIVE_X,gl.TEXTURE_CUBE_MAP_POSITIVE_Y,gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,gl.TEXTURE_CUBE_MAP_POSITIVE_Z,gl.TEXTURE_CUBE_MAP_NEGATIVE_Z];}
texture.pendingTextureLoads=-1;texture.textureCubeReady=false;for(var i=0;i<faces.length;i++){var face=faces[i];var image=new Image();texture.pendingTextureLoads++;doc.downloadCount+=1;image.onload=function(texture,face,image,swap){return function(){gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,swap);gl.bindTexture(gl.TEXTURE_CUBE_MAP,texture);gl.texImage2D(face,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,image);gl.bindTexture(gl.TEXTURE_CUBE_MAP,null);gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,false);texture.pendingTextureLoads--;doc.downloadCount-=1;if(texture.pendingTextureLoads<0){texture.textureCubeReady=true;x3dom.debug.logInfo("Loading CubeMap finished...");doc.needRender=true;}};}(texture,face,image,(bgnd&&(i<=1||i>=4)));image.src=url[i];}
return texture;};Context.prototype.emptyTexImage2D=function(gl,internalFormat,width,height,format,type)
{try{gl.texImage2D(gl.TEXTURE_2D,0,internalFormat,width,height,0,format,type,null);}
catch(e){var bytes=3;switch(internalFormat)
{case gl.DEPTH_COMPONENT:bytes=3;break;case gl.ALPHA:bytes=1;break;case gl.RGB:bytes=3;break;case gl.RGBA:bytes=4;break;case gl.LUMINANCE:bytes=1;break;case gl.LUMINANCE_ALPHA:bytes=2;break;}
var pixels=new Uint8Array(width*height*bytes);gl.texImage2D(gl.TEXTURE_2D,0,internalFormat,width,height,0,format,type,pixels);}};Context.prototype.initTex=function(gl,w,h,nearest)
{var tex=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,tex);this.emptyTexImage2D(gl,gl.RGBA,w,h,gl.RGBA,gl.UNSIGNED_BYTE);if(nearest){gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.NEAREST);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.NEAREST);}
else{gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);}
gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);gl.bindTexture(gl.TEXTURE_2D,null);tex.width=w;tex.height=h;return tex;};Context.prototype.initFbo=function(gl,w,h,nearest)
{var status=0;var fbo=gl.createFramebuffer();var rb=gl.createRenderbuffer();var tex=this.initTex(gl,w,h,nearest);gl.bindFramebuffer(gl.FRAMEBUFFER,fbo);gl.bindRenderbuffer(gl.RENDERBUFFER,rb);gl.renderbufferStorage(gl.RENDERBUFFER,gl.DEPTH_COMPONENT16,w,h);gl.bindRenderbuffer(gl.RENDERBUFFER,null);gl.framebufferTexture2D(gl.FRAMEBUFFER,gl.COLOR_ATTACHMENT0,gl.TEXTURE_2D,tex,0);gl.framebufferRenderbuffer(gl.FRAMEBUFFER,gl.DEPTH_ATTACHMENT,gl.RENDERBUFFER,rb);gl.bindFramebuffer(gl.FRAMEBUFFER,null);status=gl.checkFramebufferStatus(gl.FRAMEBUFFER);x3dom.debug.logInfo("FBO-Status: "+status);var r={};r.fbo=fbo;r.rbo=rb;r.tex=tex;r.width=w;r.height=h;return r;};return setupContext;})();x3dom.nodeTypes={};x3dom.nodeTypesLC={};x3dom.components={};x3dom.registerNodeType=function(nodeTypeName,componentName,nodeDef){x3dom.debug.logInfo("Registering nodetype ["+nodeTypeName+"] in component ["+componentName+"]");if(x3dom.components[componentName]===undefined){x3dom.debug.logInfo("Adding new component ["+componentName+"]");x3dom.components[componentName]={};}
else{x3dom.debug.logInfo("Using component ["+componentName+"]");}
nodeDef._typeName=nodeTypeName;nodeDef._compName=componentName;x3dom.components[componentName][nodeTypeName]=nodeDef;x3dom.nodeTypes[nodeTypeName]=nodeDef;x3dom.nodeTypesLC[nodeTypeName.toLowerCase()]=nodeDef;};x3dom.isX3DElement=function(node){return(node.nodeType===Node.ELEMENT_NODE&&node.localName&&(x3dom.nodeTypes[node.localName]||x3dom.nodeTypesLC[node.localName.toLowerCase()]||node.localName.toLowerCase()==="x3d"||node.localName.toLowerCase()==="websg"||node.localName.toLowerCase()==="scene"||node.localName.toLowerCase()==="route"));};x3dom.BindableStack=function(doc,type,defaultType,getter){this._doc=doc;this._type=type;this._defaultType=defaultType;this._defaultRoot=0;this._getter=getter;this._bindBag=[];this._bindStack=[];};x3dom.BindableStack.prototype.top=function(){return((this._bindStack.length>=0)?this._bindStack[this._bindStack.length-1]:null);};x3dom.BindableStack.prototype.push=function(bindable){var top=this.top();if(top===bindable){return;}
if(top){top.deactivate();}
this._bindStack.push(bindable);bindable.activate(top);};x3dom.BindableStack.prototype.replaceTop=function(bindable){var top=this.top();if(top===bindable){return;}
if(top){top.deactivate();this._bindStack[this._bindStack.length-1]=bindable;bindable.activate(top);}};x3dom.BindableStack.prototype.pop=function(bindable){var top;if(bindable){top=this.top();if(bindable!==top){return null;}}
top=this._bindStack.pop();if(top){top.deactivate();}
return top;};x3dom.BindableStack.prototype.switchTo=function(target){var last=this.getActive();var n=this._bindBag.length;var toBind=0;var i=0,lastIndex=-1;if(n<=1)
return;switch(target)
{case'first':toBind=this._bindBag[0];break;case'last':toBind=this._bindBag[n-1];break;default:for(i=0;i<n;i++){if(this._bindBag[i]==last){lastIndex=i;break;}}
if(lastIndex>=0){i=lastIndex;while(!toBind){if(target=='next')
i=(i<(n-1))?(i+1):0;else
i=(i>0)?(i-1):(n-1);if(i==lastIndex)
break;if(this._bindBag[i]._vf.description.length>=0)
toBind=this._bindBag[i];}}
break;}
if(toBind)
this.replaceTop(toBind);else
x3dom.debug.logWarning('Cannot switch bindable; no other bindable with description found.');};x3dom.BindableStack.prototype.getActive=function(){if(this._bindStack.length===0){if(this._bindBag.length===0){x3dom.debug.logInfo('create new '+this._defaultType._typeName+' for '+this._type._typeName+'-stack');var obj=new this._defaultType({doc:this._doc,autoGen:true});if(obj){if(this._defaultRoot){this._defaultRoot.addChild(obj);obj._nameSpace=this._defaultRoot._nameSpace;}
else{x3dom.debug.logError('stack without defaultRoot');}
obj.initDefault();this._bindBag.push(obj);}}
else{x3dom.debug.logInfo('activate first '+this._defaultType._typeName+' for '+this._type._typeName+'-stack');}
this._bindStack.push(this._bindBag[0]);this._bindBag[0].activate();}
return this._bindStack[this._bindStack.length-1];};x3dom.BindableBag=function(doc){this._stacks=[];this.addType("X3DViewpointNode","Viewpoint","getViewpoint",doc);this.addType("X3DNavigationInfoNode","NavigationInfo","getNavigationInfo",doc);this.addType("X3DBackgroundNode","Background","getBackground",doc);this.addType("X3DFogNode","Fog","getFog",doc);};x3dom.BindableBag.prototype.addType=function(typeName,defaultTypeName,getter,doc){var type=x3dom.nodeTypes[typeName];var defaultType=x3dom.nodeTypes[defaultTypeName];var stack;if(type&&defaultType){stack=new x3dom.BindableStack(doc,type,defaultType,getter);this._stacks.push(stack);}
else{x3dom.debug.logWarning('Invalid Bindable type/defaultType:'+typeName+'/'+defaultType);}};x3dom.BindableBag.prototype.setRefNode=function(node){Array.forEach(this._stacks,function(stack){stack._defaultRoot=node;node[stack._getter]=function(){return stack.getActive();};});};x3dom.BindableBag.prototype.addBindable=function(node){for(var i=0,n=this._stacks.length;i<n;i++){if(x3dom.isa(node,this._stacks[i]._defaultType)){x3dom.debug.logInfo('register bindable '+node.typeName());this._stacks[i]._bindBag.push(node);return this._stacks[i];}}
x3dom.debug.logError(node.typeName()+' is not a valid bindable');return null;};x3dom.NodeNameSpace=function(name,document){this.name=name;this.doc=document;this.baseURL="";this.defMap={};this.parent=null;this.childSpaces=[];};x3dom.NodeNameSpace.prototype.addNode=function(node,name){this.defMap[name]=node;node._nameSpace=this;};x3dom.NodeNameSpace.prototype.removeNode=function(name){var node=this.defMap.name;delete this.defMap.name;if(node){node._nameSpace=null;}};x3dom.NodeNameSpace.prototype.getNamedNode=function(name){return this.defMap[name];};x3dom.NodeNameSpace.prototype.getNamedElement=function(name){var node=this.defMap[name];return(node?node._xmlNode:null);};x3dom.NodeNameSpace.prototype.addSpace=function(space){this.childSpaces.push(space);space.parent=this;};x3dom.NodeNameSpace.prototype.removeSpace=function(space){this.childSpaces.push(space);space.parent=null;};x3dom.NodeNameSpace.prototype.setBaseURL=function(url){var i=url.lastIndexOf("/");this.baseURL=(i>=0)?url.substr(0,i+1):"";x3dom.debug.logInfo("setBaseURL: "+this.baseURL);};x3dom.NodeNameSpace.prototype.getURL=function(url){if(url===undefined||!url.length){return"";}
else{return((url[0]==='/')||(url.indexOf(":")>=0))?url:(this.baseURL+url);}};x3dom.getStyle=function(oElm,strCssRule){var strValue;if(window&&window.getComputedStyle){strValue=window.getComputedStyle(oElm,"")[strCssRule];}
else if(oElm.currentStyle){strCssRule=strCssRule.replace(/\-(\w)/g,function(strMatch,p1){return p1.toUpperCase();});strValue=oElm.currentStyle[strCssRule];}
return strValue;};x3dom.setElementAttribute=function(attrName,newVal)
{var prevVal=this.getAttribute(attrName);this.__setAttribute(attrName,newVal);this._x3domNode.updateField(attrName,newVal);this._x3domNode._nameSpace.doc.needRender=true;};x3dom.NodeNameSpace.prototype.setupTree=function(domNode){var n,t;if(x3dom.isX3DElement(domNode)){if(domNode._x3domNode){x3dom.debug.logWarning('Tree is already initialized');return;}
if((x3dom.userAgentFeature.supportsDOMAttrModified===false)&&(domNode.tagName!==undefined)&&(!domNode.__setAttribute)){domNode.__setAttribute=domNode.setAttribute;domNode.setAttribute=x3dom.setElementAttribute;}
if((domNode.tagName!==undefined)&&(!domNode.__addEventListener)&&(!domNode.__removeEventListener))
{domNode.__addEventListener=domNode.addEventListener;domNode.addEventListener=function(type,func,phase){if(!this._x3domNode._listeners[type])
this._x3domNode._listeners[type]=[];this._x3domNode._listeners[type].push(func);x3dom.debug.logInfo('addEventListener for '+this.tagName+".on"+type);this.__addEventListener(type,func,phase);};domNode.__removeEventListener=domNode.removeEventListener;domNode.removeEventListener=function(type,func,phase){var list=this._x3domNode._listeners[type];if(list){for(var it=0;it<list.length;it++){if(list[it]==func){list.splice(it,1);x3dom.debug.logInfo('removeEventListener for '+
this.tagName+".on"+type);}}}
this.__removeEventListener(type,func,phase);};}
if(domNode.hasAttribute('USE')){n=this.defMap[domNode.getAttribute('USE')];if(n===null)
x3dom.debug.logWarning('Could not USE: '+domNode.getAttribute('USE'));return n;}
else{if(domNode.localName.toLowerCase()==='route'){var route=domNode;var fromNode=this.defMap[route.getAttribute('fromNode')];var toNode=this.defMap[route.getAttribute('toNode')];if(!(fromNode&&toNode)){x3dom.debug.logWarning("Broken route - can't find all DEFs for "+
route.getAttribute('fromNode')+" -> "+route.getAttribute('toNode'));return null;}
fromNode.setupRoute(route.getAttribute('fromField'),toNode,route.getAttribute('toField'));return null;}
var nodeType=x3dom.nodeTypesLC[domNode.localName.toLowerCase()];if(nodeType===undefined){x3dom.debug.logInfo("Unrecognised X3D element &lt;"+domNode.localName+"&gt;.");}
else{var ctx={doc:this.doc,xmlNode:domNode};n=new nodeType(ctx);n._nameSpace=this;if(domNode.hasAttribute('DEF')){n._DEF=domNode.getAttribute('DEF');this.defMap[n._DEF]=n;}
else{if(domNode.hasAttribute('id')){n._DEF=domNode.getAttribute('id');this.defMap[n._DEF]=n;}}
n._xmlNode=domNode;domNode._x3domNode=n;var that=this;Array.forEach(domNode.childNodes,function(childDomNode){var c=that.setupTree(childDomNode);if(c)n.addChild(c,childDomNode.getAttribute("containerField"));});n.nodeChanged();return n;}}}
else if(domNode.localName){x3dom.debug.logInfo("Unrecognised X3D element &lt;"+domNode.localName+"&gt;.");n=null;}
return n;};x3dom.MatrixMixer=function(beginTime,endTime){if(arguments.length===0){this._beginTime=0;this._endTime=0;}
else{this._beginTime=beginTime;this._endTime=endTime;}
this._beginMat=x3dom.fields.SFMatrix4f.identity();this._beginInvMat=x3dom.fields.SFMatrix4f.identity();this._beginLogMat=x3dom.fields.SFMatrix4f.identity();this._endMat=x3dom.fields.SFMatrix4f.identity();this._endLogMat=x3dom.fields.SFMatrix4f.identity();};x3dom.MatrixMixer.prototype.calcFraction=function(time){var fraction=(time-this._beginTime)/(this._endTime-this._beginTime);return(Math.sin((fraction*Math.PI)-(Math.PI/2))+1)/2.0;};x3dom.MatrixMixer.prototype.setBeginMatrix=function(mat){this._beginMat.setValues(mat);this._beginInvMat=mat.inverse();this._beginLogMat=x3dom.fields.SFMatrix4f.zeroMatrix();};x3dom.MatrixMixer.prototype.setEndMatrix=function(mat){this._endMat.setValues(mat);this._endLogMat=mat.mult(this._beginInvMat).log();};x3dom.MatrixMixer.prototype.mix=function(time){var mat=x3dom.fields.SFMatrix4f.zeroMatrix();if(time<=this._beginTime)
{mat.setValues(this._beginLogMat);}
else
{if(time>=this._endTime)
{mat.setValues(this._endLogMat);}
else
{var fraction=this.calcFraction(time);mat=this._endLogMat.addScaled(this._beginLogMat,-1);mat=mat.multiply(fraction).add(this._beginLogMat);}}
mat=mat.exp().mult(this._beginMat);return mat;};function defineClass(parent,ctor,methods){if(parent){function inheritance(){}
inheritance.prototype=parent.prototype;ctor.prototype=new inheritance();ctor.prototype.constructor=ctor;ctor.superClass=parent;}
if(methods){for(var m in methods){ctor.prototype[m]=methods[m];}}
return ctor;}
x3dom.isa=function(object,clazz){if(object.constructor===clazz){return true;}
if(object.constructor.superClass===undefined){return false;}
function f(c){if(c===clazz){return true;}
if(c.prototype&&c.prototype.constructor&&c.prototype.constructor.superClass){return f(c.prototype.constructor.superClass);}
return false;}
return f(object.constructor.superClass);};x3dom.registerNodeType("X3DNode","Core",defineClass(null,function(ctx){this._DEF=null;this._nameSpace=null;this._vf={};this._cf={};this._fieldWatchers={};this._parentNodes=[];this._listeners={};this._childNodes=[];this.addField_SFNode('metadata',x3dom.nodeTypes.X3DMetadataObject);},{type:function(){return this.constructor;},typeName:function(){return this.constructor._typeName;},addChild:function(node,containerFieldName){if(node){var field=null;if(containerFieldName){field=this._cf[containerFieldName];}
else{for(var fieldName in this._cf){if(this._cf.hasOwnProperty(fieldName)){var testField=this._cf[fieldName];if(x3dom.isa(node,testField.type)){field=testField;break;}}}}
if(field&&field.addLink(node)){node._parentNodes.push(this);this._childNodes.push(node);node.parentAdded(this);return true;}}
return false;},removeChild:function(node){if(node){for(var fieldName in this._cf){if(this._cf.hasOwnProperty(fieldName)){var field=this._cf[fieldName];if(field.rmLink(node)){for(var i=0,n=node._parentNodes.length;i<n;i++){if(node._parentNodes[i]===this){node._parentNodes.splice(i,1);node.parentRemoved(this);}}
for(var j=0,m=this._childNodes.length;j<m;j++){if(this._childNodes[j]===node){this._childNodes.splice(j,1);return true;}}}}}}
return false;},parentAdded:function(parent){},parentRemoved:function(parent){for(var i=0,n=this._childNodes.length;i<n;i++){if(this._childNodes[i]){this._childNodes[i].parentRemoved(this);}}},getCurrentTransform:function(){if(this._parentNodes.length>=1){return this.transformMatrix(this._parentNodes[0].getCurrentTransform());}
else{return x3dom.fields.SFMatrix4f.identity();}},transformMatrix:function(transform){return transform;},getVolume:function(min,max,invalidate)
{var valid=false;for(var i=0,n=this._childNodes.length;i<n;i++)
{if(this._childNodes[i])
{var childMin=x3dom.fields.SFVec3f.MAX();var childMax=x3dom.fields.SFVec3f.MIN();valid=this._childNodes[i].getVolume(childMin,childMax,invalidate)||valid;if(valid)
{if(min.x>childMin.x)min.x=childMin.x;if(min.y>childMin.y)min.y=childMin.y;if(min.z>childMin.z)min.z=childMin.z;if(max.x<childMax.x)max.x=childMax.x;if(max.y<childMax.y)max.y=childMax.y;if(max.z<childMax.z)max.z=childMax.z;}}}
return valid;},find:function(type){for(var i=0;i<this._childNodes.length;i++){if(this._childNodes[i]){if(this._childNodes[i].constructor==type){return this._childNodes[i];}
var c=this._childNodes[i].find(type);if(c){return c;}}}
return null;},findAll:function(type){var found=[];for(var i=0;i<this._childNodes.length;i++){if(this._childNodes[i]){if(this._childNodes[i].constructor==type){found.push(this._childNodes[i]);}
found=found.concat(this._childNodes[i].findAll(type));}}
return found;},findParentProperty:function(propertyName,checkDOMNode){var value=this[propertyName];if(!value&&checkDOMNode&&this._xmlNode){value=this._xmlNode[propertyName];}
if(!value){for(var i=0,n=this._parentNodes.length;i<n;i++){if((value=this._parentNodes[i].findParentProperty(propertyName,checkDOMNode))){break;}}}
return value;},findX3DDoc:function(){return this._nameSpace.doc;},collectDrawableObjects:function(transform,out){for(var i=0;i<this._childNodes.length;i++){if(this._childNodes[i]){var childTransform=this._childNodes[i].transformMatrix(transform);this._childNodes[i].collectDrawableObjects(childTransform,out);}}},doIntersect:function(line){var isect=false;for(var i=0;i<this._childNodes.length;i++){if(this._childNodes[i]){isect=this._childNodes[i].doIntersect(line)||isect;}}
return isect;},postMessage:function(field,msg){this._vf[field]=msg;var listeners=this._fieldWatchers[field];var thisp=this;if(listeners){Array.forEach(listeners,function(l){l.call(thisp,msg);});}},updateField:function(field,msg){var f=this._vf[field];if(f===undefined){f={};this._vf[field]=f;}
if(f!==null){try{this._vf[field].setValueByStr(msg);}
catch(exc1){try{switch((typeof(this._vf[field])).toString()){case"number":this._vf[field]=+msg;break;case"boolean":this._vf[field]=(msg.toLowerCase()==="true");break;case"string":this._vf[field]=msg;break;};}
catch(exc2){x3dom.debug.logError("updateField: setValueByStr() NYI for "+typeof(f));}}
this.fieldChanged(field);}},setupRoute:function(fromField,toNode,toField){var pos;var fieldName;var pre="set_",post="_changed";if(!this._vf[fromField]){pos=fromField.indexOf(pre);if(pos===0){fieldName=fromField.substr(pre.length,fromField.length-1);if(this._vf[fieldName])
fromField=fieldName;}
else{pos=fromField.indexOf(post);if(pos>0){fieldName=fromField.substr(0,fromField.length-post.length);if(this._vf[fieldName])
fromField=fieldName;}}}
if(!toNode._vf[toField]){pos=toField.indexOf(pre);if(pos===0){fieldName=toField.substr(pre.length,toField.length-1);if(toNode._vf[fieldName])
toField=fieldName;}
else{pos=toField.indexOf(post);if(pos>0){fieldName=toField.substr(0,toField.length-post.length);if(toNode._vf[fieldName])
toField=fieldName;}}}
if(!this._fieldWatchers[fromField]){this._fieldWatchers[fromField]=[];}
this._fieldWatchers[fromField].push(function(msg){toNode.postMessage(toField,msg);});if(!toNode._fieldWatchers[toField]){toNode._fieldWatchers[toField]=[];}
toNode._fieldWatchers[toField].push(function(msg){toNode._vf[toField]=msg;toNode.fieldChanged(toField);});},fieldChanged:function(fieldName){},nodeChanged:function(){},addField_SFInt32:function(ctx,name,n){this._vf[name]=ctx&&ctx.xmlNode.hasAttribute(name)?parseInt(ctx.xmlNode.getAttribute(name),10):n;},addField_SFFloat:function(ctx,name,n){this._vf[name]=ctx&&ctx.xmlNode&&ctx.xmlNode.hasAttribute(name)?+ctx.xmlNode.getAttribute(name):n;},addField_SFDouble:function(ctx,name,n){this._vf[name]=ctx&&ctx.xmlNode&&ctx.xmlNode.hasAttribute(name)?+ctx.xmlNode.getAttribute(name):n;},addField_SFTime:function(ctx,name,n){this._vf[name]=ctx&&ctx.xmlNode&&ctx.xmlNode.hasAttribute(name)?+ctx.xmlNode.getAttribute(name):n;},addField_SFBool:function(ctx,name,n){this._vf[name]=ctx&&ctx.xmlNode&&ctx.xmlNode.hasAttribute(name)?ctx.xmlNode.getAttribute(name).toLowerCase()==="true":n;},addField_SFString:function(ctx,name,n){this._vf[name]=ctx&&ctx.xmlNode&&ctx.xmlNode.hasAttribute(name)?ctx.xmlNode.getAttribute(name):n;},addField_SFColor:function(ctx,name,r,g,b){this._vf[name]=ctx&&ctx.xmlNode&&ctx.xmlNode.hasAttribute(name)?x3dom.fields.SFColor.parse(ctx.xmlNode.getAttribute(name)):new x3dom.fields.SFColor(r,g,b);},addField_SFColorRGBA:function(ctx,name,r,g,b,a){this._vf[name]=ctx&&ctx.xmlNode&&ctx.xmlNode.hasAttribute(name)?x3dom.fields.SFColorRGBA.parse(ctx.xmlNode.getAttribute(name)):new x3dom.fields.SFColorRGBA(r,g,b,a);},addField_SFVec2f:function(ctx,name,x,y){this._vf[name]=ctx&&ctx.xmlNode&&ctx.xmlNode.hasAttribute(name)?x3dom.fields.SFVec2f.parse(ctx.xmlNode.getAttribute(name)):new x3dom.fields.SFVec2f(x,y);},addField_SFVec3f:function(ctx,name,x,y,z){this._vf[name]=ctx&&ctx.xmlNode&&ctx.xmlNode.hasAttribute(name)?x3dom.fields.SFVec3f.parse(ctx.xmlNode.getAttribute(name)):new x3dom.fields.SFVec3f(x,y,z);},addField_SFRotation:function(ctx,name,x,y,z,a){this._vf[name]=ctx&&ctx.xmlNode&&ctx.xmlNode.hasAttribute(name)?x3dom.fields.Quaternion.parseAxisAngle(ctx.xmlNode.getAttribute(name)):x3dom.fields.Quaternion.axisAngle(new x3dom.fields.SFVec3f(x,y,z),a);},addField_SFMatrix4f:function(ctx,name,_00,_01,_02,_03,_10,_11,_12,_13,_20,_21,_22,_23,_30,_31,_32,_33){this._vf[name]=ctx&&ctx.xmlNode&&ctx.xmlNode.hasAttribute(name)?x3dom.fields.SFMatrix4f.parse(ctx.xmlNode.getAttribute(name)):new x3dom.fields.SFMatrix4f(_00,_01,_02,_03,_10,_11,_12,_13,_20,_21,_22,_23,_30,_31,_32,_33);},addField_SFImage:function(ctx,name,def){this._vf[name]=ctx&&ctx.xmlNode&&ctx.xmlNode.hasAttribute(name)?x3dom.fields.SFImage.parse(ctx.xmlNode.getAttribute(name)):new x3dom.fields.SFImage(def);},addField_MFString:function(ctx,name,def){this._vf[name]=ctx&&ctx.xmlNode&&ctx.xmlNode.hasAttribute(name)?x3dom.fields.MFString.parse(ctx.xmlNode.getAttribute(name)):new x3dom.fields.MFString(def);},addField_MFInt32:function(ctx,name,def){this._vf[name]=ctx&&ctx.xmlNode&&ctx.xmlNode.hasAttribute(name)?x3dom.fields.MFInt32.parse(ctx.xmlNode.getAttribute(name)):new x3dom.fields.MFInt32(def);},addField_MFFloat:function(ctx,name,def){this._vf[name]=ctx&&ctx.xmlNode&&ctx.xmlNode.hasAttribute(name)?x3dom.fields.MFFloat.parse(ctx.xmlNode.getAttribute(name)):new x3dom.fields.MFFloat(def);},addField_MFDouble:function(ctx,name,def){this._vf[name]=ctx&&ctx.xmlNode&&ctx.xmlNode.hasAttribute(name)?x3dom.fields.MFFloat.parse(ctx.xmlNode.getAttribute(name)):new x3dom.fields.MFFloat(def);},addField_MFColor:function(ctx,name,def){this._vf[name]=ctx&&ctx.xmlNode&&ctx.xmlNode.hasAttribute(name)?x3dom.fields.MFColor.parse(ctx.xmlNode.getAttribute(name)):new x3dom.fields.MFColor(def);},addField_MFColorRGBA:function(ctx,name,def){this._vf[name]=ctx&&ctx.xmlNode&&ctx.xmlNode.hasAttribute(name)?x3dom.fields.MFColorRGBA.parse(ctx.xmlNode.getAttribute(name)):new x3dom.fields.MFColorRGBA(def);},addField_MFVec2f:function(ctx,name,def){this._vf[name]=ctx&&ctx.xmlNode&&ctx.xmlNode.hasAttribute(name)?x3dom.fields.MFVec2f.parse(ctx.xmlNode.getAttribute(name)):new x3dom.fields.MFVec2f(def);},addField_MFVec3f:function(ctx,name,def){this._vf[name]=ctx&&ctx.xmlNode&&ctx.xmlNode.hasAttribute(name)?x3dom.fields.MFVec3f.parse(ctx.xmlNode.getAttribute(name)):new x3dom.fields.MFVec3f(def);},addField_MFRotation:function(ctx,name,def){this._vf[name]=ctx&&ctx.xmlNode&&ctx.xmlNode.hasAttribute(name)?x3dom.fields.MFRotation.parse(ctx.xmlNode.getAttribute(name)):new x3dom.fields.MFRotation(def);},addField_SFNode:function(name,type){this._cf[name]=new x3dom.fields.SFNode(type);},addField_MFNode:function(name,type){this._cf[name]=new x3dom.fields.MFNode(type);}}));x3dom.registerNodeType("X3DMetadataObject","Core",defineClass(x3dom.nodeTypes.X3DNode,function(ctx){x3dom.nodeTypes.X3DMetadataObject.superClass.call(this,ctx);this.addField_SFString(ctx,'name',"");this.addField_SFString(ctx,'reference',"");}));x3dom.registerNodeType("MetadataDouble","Core",defineClass(x3dom.nodeTypes.X3DMetadataObject,function(ctx){x3dom.nodeTypes.MetadataDouble.superClass.call(this,ctx);this.addField_MFDouble(ctx,'value',[]);}));x3dom.registerNodeType("MetadataFloat","Core",defineClass(x3dom.nodeTypes.X3DMetadataObject,function(ctx){x3dom.nodeTypes.MetadataFloat.superClass.call(this,ctx);this.addField_MFFloat(ctx,'value',[]);}));x3dom.registerNodeType("MetadataInteger","Core",defineClass(x3dom.nodeTypes.X3DMetadataObject,function(ctx){x3dom.nodeTypes.MetadataInteger.superClass.call(this,ctx);this.addField_MFInt32(ctx,'value',[]);}));x3dom.registerNodeType("MetadataSet","Core",defineClass(x3dom.nodeTypes.X3DMetadataObject,function(ctx){x3dom.nodeTypes.MetadataSet.superClass.call(this,ctx);this.addField_MFNode('value',x3dom.nodeTypes.X3DMetadataObject);}));x3dom.registerNodeType("MetadataString","Core",defineClass(x3dom.nodeTypes.X3DMetadataObject,function(ctx){x3dom.nodeTypes.MetadataString.superClass.call(this,ctx);this.addField_MFString(ctx,'value',[]);}));x3dom.registerNodeType("Field","Core",defineClass(x3dom.nodeTypes.X3DNode,function(ctx){x3dom.nodeTypes.Field.superClass.call(this,ctx);this.addField_SFString(ctx,'name',"");this.addField_SFString(ctx,'type',"");this.addField_SFString(ctx,'value',"");},{fieldChanged:function(fieldName){var that=this;if(fieldName==='value'){Array.forEach(this._parentNodes,function(node){node.fieldChanged(that._vf.name);});}}}));x3dom.registerNodeType("Uniform","Shaders",defineClass(x3dom.nodeTypes.Field,function(ctx){x3dom.nodeTypes.Uniform.superClass.call(this,ctx);}));x3dom.registerNodeType("X3DAppearanceNode","Shape",defineClass(x3dom.nodeTypes.X3DNode,function(ctx){x3dom.nodeTypes.X3DAppearanceNode.superClass.call(this,ctx);}));x3dom.registerNodeType("Appearance","Shape",defineClass(x3dom.nodeTypes.X3DAppearanceNode,function(ctx){x3dom.nodeTypes.Appearance.superClass.call(this,ctx);this.addField_SFNode('material',x3dom.nodeTypes.X3DMaterialNode);this.addField_SFNode('texture',x3dom.nodeTypes.X3DTextureNode);this.addField_SFNode('textureTransform',x3dom.nodeTypes.X3DTextureTransformNode);this.addField_MFNode('shaders',x3dom.nodeTypes.X3DShaderNode);this._shader=null;},{nodeChanged:function(){if(!this._cf.material.node){this.addChild(x3dom.nodeTypes.Material.defaultNode());}
if(this._cf.shaders.nodes.length){this._shader=this._cf.shaders.nodes[0];}},texTransformMatrix:function(){if(this._cf.textureTransform.node===null){return x3dom.fields.SFMatrix4f.identity();}
else{return this._cf.textureTransform.node.texTransformMatrix();}}}));x3dom.nodeTypes.Appearance.defaultNode=function(){if(!x3dom.nodeTypes.Appearance._defaultNode){x3dom.nodeTypes.Appearance._defaultNode=new x3dom.nodeTypes.Appearance();x3dom.nodeTypes.Appearance._defaultNode.nodeChanged();}
return x3dom.nodeTypes.Appearance._defaultNode;};x3dom.registerNodeType("X3DAppearanceChildNode","Shape",defineClass(x3dom.nodeTypes.X3DNode,function(ctx){x3dom.nodeTypes.X3DAppearanceChildNode.superClass.call(this,ctx);}));x3dom.registerNodeType("X3DMaterialNode","Shape",defineClass(x3dom.nodeTypes.X3DAppearanceChildNode,function(ctx){x3dom.nodeTypes.X3DMaterialNode.superClass.call(this,ctx);}));x3dom.registerNodeType("Material","Shape",defineClass(x3dom.nodeTypes.X3DMaterialNode,function(ctx){x3dom.nodeTypes.Material.superClass.call(this,ctx);this.addField_SFFloat(ctx,'ambientIntensity',0.2);this.addField_SFColor(ctx,'diffuseColor',0.8,0.8,0.8);this.addField_SFColor(ctx,'emissiveColor',0,0,0);this.addField_SFFloat(ctx,'shininess',0.2);this.addField_SFColor(ctx,'specularColor',0,0,0);this.addField_SFFloat(ctx,'transparency',0);}));x3dom.nodeTypes.Material.defaultNode=function(){if(!x3dom.nodeTypes.Material._defaultNode){x3dom.nodeTypes.Material._defaultNode=new x3dom.nodeTypes.Material();x3dom.nodeTypes.Material._defaultNode.nodeChanged();}
return x3dom.nodeTypes.Material._defaultNode;};x3dom.registerNodeType("X3DTextureTransformNode","Texturing",defineClass(x3dom.nodeTypes.X3DAppearanceChildNode,function(ctx){x3dom.nodeTypes.X3DTextureTransformNode.superClass.call(this,ctx);}));x3dom.registerNodeType("TextureTransform","Texturing",defineClass(x3dom.nodeTypes.X3DTextureTransformNode,function(ctx){x3dom.nodeTypes.TextureTransform.superClass.call(this,ctx);this.addField_SFVec2f(ctx,'center',0,0);this.addField_SFFloat(ctx,'rotation',0);this.addField_SFVec2f(ctx,'scale',1,1);this.addField_SFVec2f(ctx,'translation',0,0);var negCenter=new x3dom.fields.SFVec3f(-this._vf.center.x,-this._vf.center.y,1);var posCenter=new x3dom.fields.SFVec3f(this._vf.center.x,this._vf.center.y,0);var trans3=new x3dom.fields.SFVec3f(this._vf.translation.x,this._vf.translation.y,0);var scale3=new x3dom.fields.SFVec3f(this._vf.scale.x,this._vf.scale.y,0);this._trafo=x3dom.fields.SFMatrix4f.translation(negCenter).mult(x3dom.fields.SFMatrix4f.scale(scale3)).mult(x3dom.fields.SFMatrix4f.rotationZ(this._vf.rotation)).mult(x3dom.fields.SFMatrix4f.translation(posCenter.add(trans3)));},{fieldChanged:function(fieldName){var negCenter=new x3dom.fields.SFVec3f(-this._vf.center.x,-this._vf.center.y,1);var posCenter=new x3dom.fields.SFVec3f(this._vf.center.x,this._vf.center.y,0);var trans3=new x3dom.fields.SFVec3f(this._vf.translation.x,this._vf.translation.y,0);var scale3=new x3dom.fields.SFVec3f(this._vf.scale.x,this._vf.scale.y,0);this._trafo=x3dom.fields.SFMatrix4f.translation(negCenter).mult(x3dom.fields.SFMatrix4f.scale(scale3)).mult(x3dom.fields.SFMatrix4f.rotationZ(this._vf.rotation)).mult(x3dom.fields.SFMatrix4f.translation(posCenter.add(trans3)));},texTransformMatrix:function(){return this._trafo;}}));x3dom.registerNodeType("TextureProperties","Texturing",defineClass(x3dom.nodeTypes.X3DNode,function(ctx){x3dom.nodeTypes.TextureProperties.superClass.call(this,ctx);this.addField_SFFloat(ctx,'anisotropicDegree',1.0);this.addField_SFColorRGBA(ctx,'borderColor',0,0,0,0);this.addField_SFInt32(ctx,'borderWidth',0);this.addField_SFString(ctx,'boundaryModeS',"REPEAT");this.addField_SFString(ctx,'boundaryModeT',"REPEAT");this.addField_SFString(ctx,'boundaryModeR',"REPEAT");this.addField_SFString(ctx,'magnificationFilter',"FASTEST");this.addField_SFString(ctx,'minificationFilter',"FASTEST");this.addField_SFString(ctx,'textureCompression',"FASTEST");this.addField_SFFloat(ctx,'texturePriority',0);this.addField_SFBool(ctx,'generateMipMaps',false);x3dom.debug.logWarning("TextureProperties NYI");}));x3dom.registerNodeType("X3DTextureNode","Texturing",defineClass(x3dom.nodeTypes.X3DAppearanceChildNode,function(ctx){x3dom.nodeTypes.X3DTextureNode.superClass.call(this,ctx);this.addField_SFInt32(ctx,'origChannelCount',0);this.addField_MFString(ctx,'url',[]);this.addField_SFBool(ctx,'repeatS',true);this.addField_SFBool(ctx,'repeatT',true);this.addField_SFNode('textureProperties',x3dom.nodeTypes.TextureProperties);this.addField_SFBool(ctx,'scale',false);this._needPerFrameUpdate=false;this._isCanvas=false;},{invalidateGLObject:function()
{Array.forEach(this._parentNodes,function(app){Array.forEach(app._parentNodes,function(shape){shape._dirty.texture=true;});});this._nameSpace.doc.needRender=true;},parentAdded:function(parent)
{Array.forEach(parent._parentNodes,function(shape){shape._dirty.texture=true;});},parentRemoved:function(parent)
{parent._cf.texture.node=null;Array.forEach(parent._parentNodes,function(shape){shape._dirty.texture=true;});},nodeChanged:function()
{},fieldChanged:function(fieldName)
{if(fieldName=="url")
{Array.forEach(this._parentNodes,function(app){Array.forEach(app._parentNodes,function(shape){shape._dirty.texture=true;});});}},getTexture:function(pos){if(pos===0){return this;}
return null;},size:function(){return 1;}}));x3dom.registerNodeType("MultiTexture","Texturing",defineClass(x3dom.nodeTypes.X3DTextureNode,function(ctx){x3dom.nodeTypes.MultiTexture.superClass.call(this,ctx);this.addField_MFNode('texture',x3dom.nodeTypes.X3DTextureNode);},{getTexture:function(pos){if(pos>=0&&pos<this._cf.texture.nodes.length){return this._cf.texture.nodes[pos];}
return null;},size:function(){return this._cf.texture.nodes.length;}}));x3dom.registerNodeType("Texture","Texturing",defineClass(x3dom.nodeTypes.X3DTextureNode,function(ctx){x3dom.nodeTypes.Texture.superClass.call(this,ctx);this.addField_SFBool(ctx,'hideChildren',true);this._video=null;this._intervalID=0;this._canvas=null;},{nodeChanged:function()
{if(this._vf.url.length||!this._xmlNode){return;}
x3dom.debug.logInfo("No Texture URL given, searching for &lt;img&gt; elements...");var that=this;try{Array.forEach(this._xmlNode.childNodes,function(childDomNode){if(childDomNode.nodeType===1){var url=childDomNode.getAttribute("src");if(url){that._vf.url.push(url);x3dom.debug.logInfo(that._vf.url[that._vf.url.length-1]);if(childDomNode.localName==="video"){that._needPerFrameUpdate=true;that._video=document.createElement('video');that._video.setAttribute('autobuffer','true');var p=document.getElementsByTagName('body')[0];p.appendChild(that._video);that._video.style.display="none";}}
else if(childDomNode.localName.toLowerCase()==="canvas"){that._needPerFrameUpdate=true;that._isCanvas=true;that._canvas=childDomNode;}
if(that._vf.hideChildren){childDomNode.style.display="none";childDomNode.style.visibility="hidden";}
x3dom.debug.logInfo("### Found &lt;"+childDomNode.nodeName+"&gt; tag.");}});}
catch(e){}}}));x3dom.registerNodeType("SurfaceShaderTexture","Shaders",defineClass(x3dom.nodeTypes.X3DTextureNode,function(ctx){x3dom.nodeTypes.SurfaceShaderTexture.superClass.call(this,ctx);this.addField_SFInt32(ctx,'textureCoordinatesId',0);this.addField_SFString(ctx,'channelMask',"DEFAULT");this.addField_SFBool(ctx,'isSRGB',false);this.addField_SFNode('texture',x3dom.nodeTypes.X3DTextureNode);this.addField_SFNode('textureTransform',x3dom.nodeTypes.X3DTextureTransformNode);},{nodeChanged:function(){},fieldChanged:function(fieldName){}}));x3dom.registerNodeType("RenderedTexture","Texturing",defineClass(x3dom.nodeTypes.X3DTextureNode,function(ctx){x3dom.nodeTypes.RenderedTexture.superClass.call(this,ctx);ctx.doc._nodeBag.renderTextures.push(this);this.addField_SFNode('viewpoint',x3dom.nodeTypes.X3DViewpointNode);this.addField_SFNode('background',x3dom.nodeTypes.X3DBackgroundNode);this.addField_SFNode('fog',x3dom.nodeTypes.X3DFogNode);this.addField_SFNode('scene',x3dom.nodeTypes.X3DNode);this.addField_MFNode('excludeNodes',x3dom.nodeTypes.X3DNode);this.addField_MFInt32(ctx,'dimensions',[128,128,4]);this.addField_SFString(ctx,'update','NONE');x3dom.debug.assert(this._vf.dimensions.length>=3);this._clearParents=true;},{nodeChanged:function()
{this._clearParents=true;},fieldChanged:function(fieldName)
{if(fieldName=="excludeNodes"){this._clearParents=true;}},getViewMatrix:function()
{if(this._clearParents&&this._cf.excludeNodes.nodes.length){var that=this;Array.forEach(this._cf.excludeNodes.nodes,function(node){for(var i=0,n=node._parentNodes.length;i<n;i++){if(node._parentNodes[i]===that){node._parentNodes.splice(i,1);node.parentRemoved(that);}}});this._clearParents=false;}
var vbP=this._nameSpace.doc._scene.getViewpoint();var view=this._cf.viewpoint.node;if(view===null||view===vbP){return this._nameSpace.doc._viewarea.getViewMatrix();}
else{var mat_viewpoint=view.getCurrentTransform();return mat_viewpoint.mult(view.getViewMatrix());}},getProjectionMatrix:function()
{var vbP=this._nameSpace.doc._scene.getViewpoint();var view=this._cf.viewpoint.node;if(view===null||view===vbP){return this._nameSpace.doc._viewarea.getProjectionMatrix();}
else{var w=this._vf.dimensions[0],h=this._vf.dimensions[1];return view.getProjectionMatrix(w/h);}},getWCtoCCMatrix:function()
{var view=this.getViewMatrix();var proj=this.getProjectionMatrix();return proj.mult(view);},parentRemoved:function(parent)
{if(this._parentNodes.length===0){var doc=this.findX3DDoc();for(var i=0,n=doc._nodeBag.renderTextures.length;i<n;i++){if(doc._nodeBag.renderTextures[i]===this){doc._nodeBag.renderTextures.splice(i,1);}}}
if(this._cf.scene.node){this._cf.scene.node.parentRemoved(this);}}}));x3dom.registerNodeType("PixelTexture","Texturing",defineClass(x3dom.nodeTypes.X3DTextureNode,function(ctx){x3dom.nodeTypes.PixelTexture.superClass.call(this,ctx);this.addField_SFImage(ctx,'image',0,0,0);},{fieldChanged:function(fieldName)
{if(fieldName=="image"){this.invalidateGLObject();}}}));x3dom.registerNodeType("ImageTexture","Texturing",defineClass(x3dom.nodeTypes.Texture,function(ctx){x3dom.nodeTypes.ImageTexture.superClass.call(this,ctx);},{}));x3dom.registerNodeType("MovieTexture","Texturing",defineClass(x3dom.nodeTypes.Texture,function(ctx){x3dom.nodeTypes.MovieTexture.superClass.call(this,ctx);this.addField_SFBool(ctx,'loop',false);this.addField_SFFloat(ctx,'speed',1.0);},{}));x3dom.registerNodeType("X3DEnvironmentTextureNode","CubeMapTexturing",defineClass(x3dom.nodeTypes.X3DTextureNode,function(ctx){x3dom.nodeTypes.X3DEnvironmentTextureNode.superClass.call(this,ctx);},{getTexUrl:function(){return[];},getTexSize:function(){return-1;}}));x3dom.registerNodeType("ComposedCubeMapTexture","CubeMapTexturing",defineClass(x3dom.nodeTypes.X3DEnvironmentTextureNode,function(ctx){x3dom.nodeTypes.ComposedCubeMapTexture.superClass.call(this,ctx);this.addField_SFNode('back',x3dom.nodeTypes.Texture);this.addField_SFNode('front',x3dom.nodeTypes.Texture);this.addField_SFNode('bottom',x3dom.nodeTypes.Texture);this.addField_SFNode('top',x3dom.nodeTypes.Texture);this.addField_SFNode('left',x3dom.nodeTypes.Texture);this.addField_SFNode('right',x3dom.nodeTypes.Texture);},{getTexUrl:function(){return[this._nameSpace.getURL(this._cf.right.node._vf.url[0]),this._nameSpace.getURL(this._cf.left.node._vf.url[0]),this._nameSpace.getURL(this._cf.top.node._vf.url[0]),this._nameSpace.getURL(this._cf.bottom.node._vf.url[0]),this._nameSpace.getURL(this._cf.front.node._vf.url[0]),this._nameSpace.getURL(this._cf.back.node._vf.url[0])];}}));x3dom.registerNodeType("GeneratedCubeMapTexture","CubeMapTexturing",defineClass(x3dom.nodeTypes.X3DEnvironmentTextureNode,function(ctx){x3dom.nodeTypes.GeneratedCubeMapTexture.superClass.call(this,ctx);this.addField_SFInt32(ctx,'size',128);this.addField_SFString(ctx,'update','NONE');x3dom.debug.logWarning("GeneratedCubeMapTexture NYI");},{getTexSize:function(){return this._vf.size;}}));x3dom.registerNodeType("X3DShaderNode","Shaders",defineClass(x3dom.nodeTypes.X3DAppearanceChildNode,function(ctx){x3dom.nodeTypes.X3DShaderNode.superClass.call(this,ctx);this.addField_SFString(ctx,'language',"");}));x3dom.registerNodeType("CommonSurfaceShader","Shaders",defineClass(x3dom.nodeTypes.X3DShaderNode,function(ctx){x3dom.nodeTypes.CommonSurfaceShader.superClass.call(this,ctx);this.addField_SFInt32(ctx,'tangentTextureCoordinatesId',-1);this.addField_SFInt32(ctx,'binormalTextureCoordinatesId',-1);this.addField_SFVec3f(ctx,'emissiveFactor',0,0,0);this.addField_SFInt32(ctx,'emissiveTextureId',-1);this.addField_SFInt32(ctx,'emissiveTextureCoordinatesId',0);this.addField_SFString(ctx,'emissiveTextureChannelMask','rgb');this.addField_SFVec3f(ctx,'ambientFactor',0.2,0.2,0.2);this.addField_SFInt32(ctx,'ambientTextureId',-1);this.addField_SFInt32(ctx,'ambientTextureCoordinatesId',0);this.addField_SFString(ctx,'ambientTextureChannelMask','rgb');this.addField_SFVec3f(ctx,'diffuseFactor',0.8,0.8,0.8);this.addField_SFInt32(ctx,'diffuseTextureId',-1);this.addField_SFInt32(ctx,'diffuseTextureCoordinatesId',0);this.addField_SFString(ctx,'diffuseTextureChannelMask','rgb');this.addField_SFVec3f(ctx,'specularFactor',0,0,0);this.addField_SFInt32(ctx,'specularTextureId',-1);this.addField_SFInt32(ctx,'specularTextureCoordinatesId',0);this.addField_SFString(ctx,'specularTextureChannelMask','rgb');this.addField_SFFloat(ctx,'shininessFactor',0.2);this.addField_SFInt32(ctx,'shininessTextureId',-1);this.addField_SFInt32(ctx,'shininessTextureCoordinatesId',0);this.addField_SFString(ctx,'shininessTextureChannelMask','a');this.addField_SFString(ctx,'normalFormat','UNORM');this.addField_SFString(ctx,'normalSpace','TANGENT');this.addField_SFInt32(ctx,'normalTextureId',-1);this.addField_SFInt32(ctx,'normalTextureCoordinatesId',0);this.addField_SFString(ctx,'normalTextureChannelMask','rgb');this.addField_SFVec3f(ctx,'reflectionFactor',0,0,0);this.addField_SFInt32(ctx,'reflectionTextureId',-1);this.addField_SFInt32(ctx,'reflectionTextureCoordinatesId',0);this.addField_SFString(ctx,'reflectionTextureChannelMask','rgb');this.addField_SFVec3f(ctx,'transmissionFactor',0,0,0);this.addField_SFInt32(ctx,'transmissionTextureId',-1);this.addField_SFInt32(ctx,'transmissionTextureCoordinatesId',0);this.addField_SFString(ctx,'transmissionTextureChannelMask','rgb');this.addField_SFVec3f(ctx,'environmentFactor',1,1,1);this.addField_SFInt32(ctx,'environmentTextureId',-1);this.addField_SFInt32(ctx,'environmentTextureCoordinatesId',0);this.addField_SFString(ctx,'environmentTextureChannelMask','rgb');this.addField_SFFloat(ctx,'relativeIndexOfRefraction',1);this.addField_SFFloat(ctx,'fresnelBlend',0);this.addField_SFNode('emissiveTexture',x3dom.nodeTypes.X3DTextureNode);this.addField_SFNode('ambientTexture',x3dom.nodeTypes.X3DTextureNode);this.addField_SFNode('diffuseTexture',x3dom.nodeTypes.X3DTextureNode);this.addField_SFNode('specularTexture',x3dom.nodeTypes.X3DTextureNode);this.addField_SFNode('shininessTexture',x3dom.nodeTypes.X3DTextureNode);this.addField_SFNode('normalTexture',x3dom.nodeTypes.X3DTextureNode);this.addField_SFNode('reflectionTexture',x3dom.nodeTypes.X3DTextureNode);this.addField_SFNode('transmissionTexture',x3dom.nodeTypes.X3DTextureNode);this.addField_SFNode('environmentTexture',x3dom.nodeTypes.X3DTextureNode);this.addField_SFVec3f(ctx,'normalScale',2,2,2);this.addField_SFVec3f(ctx,'normalBias',-1,-1,-1);this.addField_SFFloat(ctx,'alphaFactor',1);this.addField_SFBool(ctx,'invertAlphaTexture',false);this.addField_SFInt32(ctx,'alphaTextureId',-1);this.addField_SFInt32(ctx,'alphaTextureCoordinatesId',0);this.addField_SFString(ctx,'alphaTextureChannelMask','a');this.addField_SFNode('alphaTexture',x3dom.nodeTypes.X3DTextureNode);this._dirty={};},{nodeChanged:function()
{},fieldChanged:function(fieldName)
{},getDiffuseMap:function()
{if(this._cf.diffuseTexture.node)
return this._cf.diffuseTexture.node._cf.texture.node;else
return null;},getNormalMap:function()
{if(this._cf.normalTexture.node)
return this._cf.normalTexture.node._cf.texture.node;else
return null;},getAmbientMap:function()
{if(this._cf.ambientTexture.node)
return this._cf.ambientTexture.node._cf.texture.node;else
return null;},getSpecularMap:function()
{if(this._cf.specularTexture.node)
return this._cf.specularTexture.node._cf.texture.node;else
return null;},getShininessMap:function()
{if(this._cf.shininessTexture.node)
return this._cf.shininessTexture.node._cf.texture.node;else
return null;},getAlphaMap:function()
{if(this._cf.alphaTexture.node)
return this._cf.alphaTexture.node._cf.texture.node;else
return null;}}));x3dom.registerNodeType("ComposedShader","Shaders",defineClass(x3dom.nodeTypes.X3DShaderNode,function(ctx){x3dom.nodeTypes.ComposedShader.superClass.call(this,ctx);this.addField_MFNode('fields',x3dom.nodeTypes.Field);this.addField_MFNode('parts',x3dom.nodeTypes.ShaderPart);this._vertex=null;this._fragment=null;x3dom.debug.logInfo("Current ComposedShader node implementation limitations:\n"+"Vertex attributes (if given in the standard X3D fields 'coord', 'color', "+"'normal', 'texCoord'), matrices and texture are provided as follows...\n"+"    attribute vec3 position;\n"+"    attribute vec3 normal;\n"+"    attribute vec2 texcoord;\n"+"    attribute vec3 color;\n"+"    uniform mat4 modelViewProjectionMatrix;\n"+"    uniform mat4 modelViewMatrix;\n"+"    uniform sampler2D tex;\n");},{nodeChanged:function()
{var i,n=this._cf.parts.nodes.length;for(i=0;i<n;i++)
{if(this._cf.parts.nodes[i]._vf.type.toLowerCase()=='vertex'){this._vertex=this._cf.parts.nodes[i];}
else if(this._cf.parts.nodes[i]._vf.type.toLowerCase()=='fragment'){this._fragment=this._cf.parts.nodes[i];}}
var ctx={};n=this._cf.fields.nodes.length;for(i=0;i<n;i++)
{var fieldName=this._cf.fields.nodes[i]._vf.name;ctx.xmlNode=this._cf.fields.nodes[i]._xmlNode;ctx.xmlNode.setAttribute(fieldName,this._cf.fields.nodes[i]._vf.value);var funcName="this.addField_"+this._cf.fields.nodes[i]._vf.type+"(ctx, name);";var func=new Function('ctx','name',funcName);func.call(this,ctx,fieldName);}},fieldChanged:function(fieldName)
{var i,n=this._cf.fields.nodes.length;for(i=0;i<n;i++)
{var field=this._cf.fields.nodes[i]._vf.name;if(field===fieldName)
{var msg=this._cf.fields.nodes[i]._vf.value;try{this._vf[field].setValueByStr(msg);}
catch(exc1){try{switch((typeof(this._vf[field])).toString()){case"number":this._vf[field]=+msg;break;case"boolean":this._vf[field]=(msg.toLowerCase()==="true");break;case"string":this._vf[field]=msg;break;};}
catch(exc2){x3dom.debug.logError("setValueByStr() NYI for "+typeof(this._vf[field]));}}
break;}}}}));x3dom.registerNodeType("ShaderPart","Shaders",defineClass(x3dom.nodeTypes.X3DNode,function(ctx){x3dom.nodeTypes.ShaderPart.superClass.call(this,ctx);this.addField_MFString(ctx,'url',[]);this.addField_SFString(ctx,'type',"VERTEX");x3dom.debug.assert(this._vf.type.toLowerCase()=='vertex'||this._vf.type.toLowerCase()=='fragment');if(!this._vf.url.length&&ctx.xmlNode){var that=this;try{that._vf.url.push(ctx.xmlNode.childNodes[1].nodeValue);ctx.xmlNode.removeChild(ctx.xmlNode.childNodes[1]);}
catch(e){Array.forEach(ctx.xmlNode.childNodes,function(childDomNode){if(childDomNode.nodeType===3){that._vf.url.push(childDomNode.data);}
childDomNode.parentNode.removeChild(childDomNode);});}}},{}));x3dom.Mesh=function(parent)
{this._parent=parent;this._min=new x3dom.fields.SFVec3f(0,0,0);this._max=new x3dom.fields.SFVec3f(0,0,0);this._invalidate=true;this._numFaces=0;this._numCoords=0;this._positions=[];this._normals=[];this._texCoords=[];this._colors=[];this._indices=[];this._positions[0]=[];this._normals[0]=[];this._texCoords[0]=[];this._colors[0]=[];this._indices[0]=[];};x3dom.Mesh.prototype._dynamicFields={};x3dom.Mesh.prototype._numTexComponents=2;x3dom.Mesh.prototype._numColComponents=3;x3dom.Mesh.prototype._lit=true;x3dom.Mesh.prototype._min={};x3dom.Mesh.prototype._max={};x3dom.Mesh.prototype._invalidate=true;x3dom.Mesh.prototype._numFaces=0;x3dom.Mesh.prototype._numCoords=0;x3dom.Mesh.prototype.setMeshData=function(positions,normals,texCoords,colors,indices)
{this._positions[0]=positions;this._normals[0]=normals;this._texCoords[0]=texCoords;this._colors[0]=colors;this._indices[0]=indices;this._invalidate=true;this._numFaces=this._indices[0].length/3;this._numCoords=this._positions[0].length/3;};x3dom.Mesh.prototype.getBBox=function(min,max,invalidate)
{if(this._invalidate===true&&invalidate===true)
{var coords=this._positions[0];var n=coords.length;if(n>3)
{this._min=new x3dom.fields.SFVec3f(coords[0],coords[1],coords[2]);this._max=new x3dom.fields.SFVec3f(coords[0],coords[1],coords[2]);}
else
{this._min=new x3dom.fields.SFVec3f(0,0,0);this._max=new x3dom.fields.SFVec3f(0,0,0);}
for(var i=3;i<n;i+=3)
{if(this._min.x>coords[i+0]){this._min.x=coords[i+0];}
if(this._min.y>coords[i+1]){this._min.y=coords[i+1];}
if(this._min.z>coords[i+2]){this._min.z=coords[i+2];}
if(this._max.x<coords[i+0]){this._max.x=coords[i+0];}
if(this._max.y<coords[i+1]){this._max.y=coords[i+1];}
if(this._max.z<coords[i+2]){this._max.z=coords[i+2];}}
this._invalidate=false;}
min.setValues(this._min);max.setValues(this._max);};x3dom.Mesh.prototype.getCenter=function()
{var min=new x3dom.fields.SFVec3f(0,0,0);var max=new x3dom.fields.SFVec3f(0,0,0);this.getBBox(min,max,true);var center=min.add(max).multiply(0.5);return center;};x3dom.Mesh.prototype.doIntersect=function(line)
{var min=new x3dom.fields.SFVec3f(0,0,0);var max=new x3dom.fields.SFVec3f(0,0,0);this.getBBox(min,max,true);var isect=line.intersect(min,max);if(isect&&line.enter<line.dist)
{line.dist=line.enter;line.hitObject=this._parent;line.hitPoint=line.pos.add(line.dir.multiply(line.enter));}
return isect;};x3dom.Mesh.prototype.calcNormals=function(creaseAngle)
{var i=0,j=0,num=0;var multInd=(this._multiIndIndices!==undefined&&this._multiIndIndices.length);var coords=this._positions[0];var idxs=multInd?this._multiIndIndices:this._indices[0];var vertNormals=[];var vertFaceNormals=[];var a,b,n=null;num=(this._posSize!==undefined&&this._posSize>coords.length)?this._posSize/3:coords.length/3;num=3*((num-Math.floor(num)>0)?Math.floor(num+1):num);for(i=0;i<num;++i){vertFaceNormals[i]=[];}
num=idxs.length;for(i=0;i<num;i+=3){if(!multInd){a=new x3dom.fields.SFVec3f(coords[idxs[i]*3],coords[idxs[i]*3+1],coords[idxs[i]*3+2]).subtract(new x3dom.fields.SFVec3f(coords[idxs[i+1]*3],coords[idxs[i+1]*3+1],coords[idxs[i+1]*3+2]));b=new x3dom.fields.SFVec3f(coords[idxs[i+1]*3],coords[idxs[i+1]*3+1],coords[idxs[i+1]*3+2]).subtract(new x3dom.fields.SFVec3f(coords[idxs[i+2]*3],coords[idxs[i+2]*3+1],coords[idxs[i+2]*3+2]));}
else{a=new x3dom.fields.SFVec3f(coords[i*3],coords[i*3+1],coords[i*3+2]).subtract(new x3dom.fields.SFVec3f(coords[(i+1)*3],coords[(i+1)*3+1],coords[(i+1)*3+2]));b=new x3dom.fields.SFVec3f(coords[(i+1)*3],coords[(i+1)*3+1],coords[(i+1)*3+2]).subtract(new x3dom.fields.SFVec3f(coords[(i+2)*3],coords[(i+2)*3+1],coords[(i+2)*3+2]));}
n=a.cross(b).normalize();if(creaseAngle<=x3dom.fields.Eps){vertNormals[i*3]=vertNormals[(i+1)*3]=vertNormals[(i+2)*3]=n.x;vertNormals[i*3+1]=vertNormals[(i+1)*3+1]=vertNormals[(i+2)*3+1]=n.y;vertNormals[i*3+2]=vertNormals[(i+1)*3+2]=vertNormals[(i+2)*3+2]=n.z;}
else{vertFaceNormals[idxs[i]].push(n);vertFaceNormals[idxs[i+1]].push(n);vertFaceNormals[idxs[i+2]].push(n);}}
if(creaseAngle>x3dom.fields.Eps)
{for(i=0;i<coords.length;i+=3){n=new x3dom.fields.SFVec3f(0,0,0);if(!multInd){num=vertFaceNormals[i/3].length;for(j=0;j<num;++j){n=n.add(vertFaceNormals[i/3][j]);}}
else{num=vertFaceNormals[idxs[i/3]].length;for(j=0;j<num;++j){n=n.add(vertFaceNormals[idxs[i/3]][j]);}}
n=n.normalize();vertNormals[i]=n.x;vertNormals[i+1]=n.y;vertNormals[i+2]=n.z;}}
if(multInd){this._multiIndIndices=[];}
this._normals[0]=vertNormals;};x3dom.Mesh.prototype.splitMesh=function()
{var MAX=65535;if(this._positions[0].length/3<=MAX)
return;var positions=this._positions[0];var normals=this._normals[0];var texCoords=this._texCoords[0];var colors=this._colors[0];var indices=this._indices[0];var i=0;do
{this._positions[i]=[];this._normals[i]=[];this._texCoords[i]=[];this._colors[i]=[];this._indices[i]=[];var k=((indices.length-((i+1)*MAX)<0)?false:true);if(k)this._indices[i]=indices.slice(i*MAX,(i+1)*MAX);else this._indices[i]=indices.slice(i*MAX);if(i){var m=i*MAX;for(var j=0,l=this._indices[i].length;j<l;j++){this._indices[i][j]-=m;}}
if(k)this._positions[i]=positions.slice(i*MAX*3,3*(i+1)*MAX);else this._positions[i]=positions.slice(i*MAX*3);if(normals.length){if(k)this._normals[i]=normals.slice(i*MAX*3,3*(i+1)*MAX);else this._normals[i]=normals.slice(i*MAX*3);}
if(texCoords.length){if(k)this._texCoords[i]=texCoords.slice(i*MAX*this._numTexComponents,this._numTexComponents*(i+1)*MAX);else this._texCoords[i]=texCoords.slice(i*MAX*this._numTexComponents);}
if(colors.length){if(k)this._colors[i]=colors.slice(i*MAX*this._numColComponents,this._numColComponents*(i+1)*MAX);else this._colors[i]=colors.slice(i*MAX*this._numColComponents);}}
while(positions.length>++i*MAX*3);};x3dom.Mesh.prototype.calcTexCoords=function(mode)
{this._texCoords[0]=[];if(mode.toLowerCase()==="sphere-local")
{for(var i=0,j=0,n=this._normals[0].length;i<n;i+=3)
{this._texCoords[0][j++]=0.5+this._normals[0][i]/2.0;this._texCoords[0][j++]=0.5+this._normals[0][i+1]/2.0;}}
else
{var min=new x3dom.fields.SFVec3f(0,0,0),max=new x3dom.fields.SFVec3f(0,0,0);this.getBBox(min,max,true);var dia=max.subtract(min);var S=0,T=1;if(dia.x>=dia.y)
{if(dia.x>=dia.z)
{S=0;T=dia.y>=dia.z?1:2;}
else
{S=2;T=0;}}
else
{if(dia.y>=dia.z)
{S=1;T=dia.x>=dia.z?0:2;}
else
{S=2;T=1;}}
var sDenom=1,tDenom=1;var sMin=0,tMin=0;switch(S){case 0:sDenom=dia.x;sMin=min.x;break;case 1:sDenom=dia.y;sMin=min.y;break;case 2:sDenom=dia.z;sMin=min.z;break;}
switch(T){case 0:tDenom=dia.x;tMin=min.x;break;case 1:tDenom=dia.y;tMin=min.y;break;case 2:tDenom=dia.z;tMin=min.z;break;}
for(var k=0,l=0,m=this._positions[0].length;k<m;k+=3)
{this._texCoords[0][l++]=(this._positions[0][k+S]-sMin)/sDenom;this._texCoords[0][l++]=(this._positions[0][k+T]-tMin)/tDenom;}}};x3dom.registerNodeType("X3DGeometryNode","Rendering",defineClass(x3dom.nodeTypes.X3DNode,function(ctx){x3dom.nodeTypes.X3DGeometryNode.superClass.call(this,ctx);this.addField_SFBool(ctx,'solid',true);this.addField_SFBool(ctx,'ccw',true);this._mesh=new x3dom.Mesh(this);this._pickable=true;},{getVolume:function(min,max,invalidate){this._mesh.getBBox(min,max,invalidate);return true;},getCenter:function(){return this._mesh.getCenter();},doIntersect:function(line){if(this._pickable){return this._mesh.doIntersect(line);}
else{return false;}}}));x3dom.registerNodeType("Mesh","Rendering",defineClass(x3dom.nodeTypes.X3DGeometryNode,function(ctx){x3dom.nodeTypes.Mesh.superClass.call(this,ctx);this.addField_SFString(ctx,'primType',"triangle");this.addField_MFInt32(ctx,'index',[]);this.addField_MFNode('vertexAttributes',x3dom.nodeTypes.X3DVertexAttributeNode);this._mesh=new x3dom.Mesh(this);},{nodeChanged:function()
{var i,n=this._cf.vertexAttributes.nodes.length;for(i=0;i<n;i++)
{var name=this._cf.vertexAttributes.nodes[i]._vf.name;switch(name.toLowerCase())
{case"position":this._mesh._positions[0]=this._cf.vertexAttributes.nodes[i]._vf.value.toGL();break;case"normal":this._mesh._normals[0]=this._cf.vertexAttributes.nodes[i]._vf.value.toGL();break;case"texcoord":this._mesh._texCoords[0]=this._cf.vertexAttributes.nodes[i]._vf.value.toGL();break;case"color":this._mesh._colors[0]=this._cf.vertexAttributes.nodes[i]._vf.value.toGL();break;default:{this._mesh._dynamicFields[name]={};this._mesh._dynamicFields[name].numComponents=this._cf.vertexAttributes.nodes[i]._vf.numComponents;this._mesh._dynamicFields[name].value=this._cf.vertexAttributes.nodes[i]._vf.value.toGL();}
break;}}
this._mesh._indices[0]=this._vf.index.toGL();this._mesh._invalidate=true;this._mesh._numFaces=this._mesh._indices[0].length/3;this._mesh._numCoords=this._mesh._positions[0].length/3;}}));x3dom.registerNodeType("Box","Geometry3D",defineClass(x3dom.nodeTypes.X3DGeometryNode,function(ctx){x3dom.nodeTypes.Box.superClass.call(this,ctx);var sx,sy,sz;if(ctx.xmlNode.hasAttribute('size')){var size=x3dom.fields.SFVec3f.parse(ctx.xmlNode.getAttribute('size'));sx=size.x;sy=size.y;sz=size.z;}else{sx=sy=sz=2;}
sx/=2;sy/=2;sz/=2;this._mesh._positions[0]=[-sx,-sy,-sz,-sx,sy,-sz,sx,sy,-sz,sx,-sy,-sz,-sx,-sy,sz,-sx,sy,sz,sx,sy,sz,sx,-sy,sz,-sx,-sy,-sz,-sx,-sy,sz,-sx,sy,sz,-sx,sy,-sz,sx,-sy,-sz,sx,-sy,sz,sx,sy,sz,sx,sy,-sz,-sx,sy,-sz,-sx,sy,sz,sx,sy,sz,sx,sy,-sz,-sx,-sy,-sz,-sx,-sy,sz,sx,-sy,sz,sx,-sy,-sz];this._mesh._normals[0]=[0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,1,0,0,1,0,0,1,0,0,1,-1,0,0,-1,0,0,-1,0,0,-1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0,1,0,0,1,0,0,1,0,0,1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0];this._mesh._texCoords[0]=[1,0,1,1,0,1,0,0,0,0,0,1,1,1,1,0,0,0,1,0,1,1,0,1,1,0,0,0,0,1,1,1,0,1,0,0,1,0,1,1,0,0,0,1,1,1,1,0];this._mesh._indices[0]=[0,1,2,2,3,0,4,7,5,5,7,6,8,9,10,10,11,8,12,14,13,14,12,15,16,17,18,18,19,16,20,22,21,22,20,23];this._mesh._invalidate=true;this._mesh._numFaces=12;this._mesh._numCoords=24;}));x3dom.registerNodeType("Sphere","Geometry3D",defineClass(x3dom.nodeTypes.X3DGeometryNode,function(ctx){x3dom.nodeTypes.Sphere.superClass.call(this,ctx);var r=ctx?1:10000;if(ctx&&ctx.xmlNode.hasAttribute('radius')){r=+ctx.xmlNode.getAttribute('radius');}
var latNumber,longNumber;var latitudeBands=24;var longitudeBands=24;var theta,sinTheta,cosTheta;var phi,sinPhi,cosPhi;var x,y,z,u,v;for(latNumber=0;latNumber<=latitudeBands;latNumber++)
{theta=(latNumber*Math.PI)/latitudeBands;sinTheta=Math.sin(theta);cosTheta=Math.cos(theta);for(longNumber=0;longNumber<=longitudeBands;longNumber++)
{phi=(longNumber*2.0*Math.PI)/longitudeBands;sinPhi=Math.sin(phi);cosPhi=Math.cos(phi);x=-cosPhi*sinTheta;y=-cosTheta;z=-sinPhi*sinTheta;u=0.25-((1.0*longNumber)/longitudeBands);v=latNumber/latitudeBands;this._mesh._positions[0].push(r*x);this._mesh._positions[0].push(r*y);this._mesh._positions[0].push(r*z);this._mesh._normals[0].push(x);this._mesh._normals[0].push(y);this._mesh._normals[0].push(z);this._mesh._texCoords[0].push(u);this._mesh._texCoords[0].push(v);}}
var first,second;for(latNumber=0;latNumber<latitudeBands;latNumber++)
{for(longNumber=0;longNumber<longitudeBands;longNumber++)
{first=(latNumber*(longitudeBands+1))+longNumber;second=first+longitudeBands+1;this._mesh._indices[0].push(first);this._mesh._indices[0].push(second);this._mesh._indices[0].push(first+1);this._mesh._indices[0].push(second);this._mesh._indices[0].push(second+1);this._mesh._indices[0].push(first+1);}}
this._mesh._invalidate=true;this._mesh._numFaces=this._mesh._indices[0].length/3;this._mesh._numCoords=this._mesh._positions[0].length/3;}));x3dom.registerNodeType("Torus","Geometry3D",defineClass(x3dom.nodeTypes.X3DGeometryNode,function(ctx){x3dom.nodeTypes.Torus.superClass.call(this,ctx);var innerRadius=0.5,outerRadius=1.0;if(ctx.xmlNode.hasAttribute('innerRadius')){innerRadius=+ctx.xmlNode.getAttribute('innerRadius');}
if(ctx.xmlNode.hasAttribute('outerRadius')){outerRadius=+ctx.xmlNode.getAttribute('outerRadius');}
var rings=24,sides=24;var ringDelta=2.0*Math.PI/rings;var sideDelta=2.0*Math.PI/sides;var p=[],n=[],t=[],i=[];var a,b,theta,phi;for(a=0,theta=0;a<=rings;a++,theta+=ringDelta)
{var cosTheta=Math.cos(theta);var sinTheta=Math.sin(theta);for(b=0,phi=0;b<=sides;b++,phi+=sideDelta)
{var cosPhi=Math.cos(phi);var sinPhi=Math.sin(phi);var dist=outerRadius+innerRadius*cosPhi;n.push(cosTheta*cosPhi,-sinTheta*cosPhi,sinPhi);p.push(cosTheta*dist,-sinTheta*dist,innerRadius*sinPhi);t.push(-a/rings,b/sides);}}
for(a=0;a<sides;a++)
{for(b=0;b<rings;b++)
{i.push(b*(sides+1)+a);i.push(b*(sides+1)+a+1);i.push((b+1)*(sides+1)+a);i.push(b*(sides+1)+a+1);i.push((b+1)*(sides+1)+a+1);i.push((b+1)*(sides+1)+a);}}
this._mesh._positions[0]=p;this._mesh._normals[0]=n;this._mesh._texCoords[0]=t;this._mesh._indices[0]=i;this._mesh._invalidate=true;this._mesh._numFaces=this._mesh._indices[0].length/3;this._mesh._numCoords=this._mesh._positions[0].length/3;}));x3dom.registerNodeType("Cone","Geometry3D",defineClass(x3dom.nodeTypes.X3DGeometryNode,function(ctx){x3dom.nodeTypes.Cone.superClass.call(this,ctx);this.addField_SFFloat(ctx,'bottomRadius',1.0);this.addField_SFFloat(ctx,'height',2.0);this.addField_SFBool(ctx,'bottom',true);this.addField_SFBool(ctx,'side',true);var bottomRadius=this._vf.bottomRadius,height=this._vf.height;var beta,x,z;var sides=32;var delta=2.0*Math.PI/sides;var incl=bottomRadius/height;var nlen=1.0/Math.sqrt(1.0+incl*incl);var p=[],n=[],t=[],i=[];if(this._vf.side)
{for(var j=0,k=0;j<=sides;j++)
{beta=j*delta;x=Math.sin(beta);z=-Math.cos(beta);p.push(0,height/2,0);n.push(x/nlen,incl/nlen,z/nlen);t.push(1.0-j/sides,1);p.push(x*bottomRadius,-height/2,z*bottomRadius);n.push(x/nlen,incl/nlen,z/nlen);t.push(1.0-j/sides,0);if(j>0)
{i.push(k+0);i.push(k+2);i.push(k+1);i.push(k+1);i.push(k+2);i.push(k+3);k+=2;}}}
if(this._vf.bottom&&bottomRadius>0)
{var base=p.length/3;for(j=sides-1;j>=0;j--)
{beta=j*delta;x=bottomRadius*Math.sin(beta);z=-bottomRadius*Math.cos(beta);p.push(x,-height/2,z);n.push(0,-1,0);t.push(x/bottomRadius/2+0.5,z/bottomRadius/2+0.5);}
var h=base+1;for(j=2;j<sides;j++)
{i.push(h);i.push(base);h=base+j;i.push(h);}}
this._mesh._positions[0]=p;this._mesh._normals[0]=n;this._mesh._texCoords[0]=t;this._mesh._indices[0]=i;this._mesh._invalidate=true;this._mesh._numFaces=this._mesh._indices[0].length/3;this._mesh._numCoords=this._mesh._positions[0].length/3;}));x3dom.registerNodeType("Cylinder","Geometry3D",defineClass(x3dom.nodeTypes.X3DGeometryNode,function(ctx){x3dom.nodeTypes.Cylinder.superClass.call(this,ctx);var radius=1.0,height=2.0;this.addField_SFFloat(ctx,'radius',1.0);this.addField_SFFloat(ctx,'height',2.0);this.addField_SFBool(ctx,'bottom',true);this.addField_SFBool(ctx,'top',true);this.addField_SFBool(ctx,'side',true);var radius=this._vf.radius,height=this._vf.height;var beta,x,z;var sides=24;var delta=2.0*Math.PI/sides;var p=[],n=[],t=[],i=[];if(this._vf.side)
{for(var j=0,k=0;j<=sides;j++)
{beta=j*delta;x=Math.sin(beta);z=-Math.cos(beta);p.push(x*radius,-height/2,z*radius);n.push(x,0,z);t.push(1.0-j/sides,0);p.push(x*radius,height/2,z*radius);n.push(x,0,z);t.push(1.0-j/sides,1);if(j>0)
{i.push(k+0);i.push(k+1);i.push(k+2);i.push(k+2);i.push(k+1);i.push(k+3);k+=2;}}}
if(radius>0)
{var h,base=p.length/3;if(this._vf.top)
{for(j=sides-1;j>=0;j--)
{beta=j*delta;x=radius*Math.sin(beta);z=-radius*Math.cos(beta);p.push(x,height/2,z);n.push(0,1,0);t.push(x/radius/2+0.5,-z/radius/2+0.5);}
h=base+1;for(j=2;j<sides;j++)
{i.push(base);i.push(h);h=base+j;i.push(h);}
base=p.length/3;}
if(this._vf.bottom)
{for(j=sides-1;j>=0;j--)
{beta=j*delta;x=radius*Math.sin(beta);z=-radius*Math.cos(beta);p.push(x,-height/2,z);n.push(0,-1,0);t.push(x/radius/2+0.5,z/radius/2+0.5);}
h=base+1;for(j=2;j<sides;j++)
{i.push(h);i.push(base);h=base+j;i.push(h);}}}
this._mesh._positions[0]=p;this._mesh._normals[0]=n;this._mesh._texCoords[0]=t;this._mesh._indices[0]=i;this._mesh._invalidate=true;this._mesh._numFaces=this._mesh._indices[0].length/3;this._mesh._numCoords=this._mesh._positions[0].length/3;}));x3dom.registerNodeType("PointSet","Rendering",defineClass(x3dom.nodeTypes.X3DGeometryNode,function(ctx){x3dom.nodeTypes.PointSet.superClass.call(this,ctx);this.addField_SFNode('coord',x3dom.nodeTypes.Coordinate);this.addField_SFNode('color',x3dom.nodeTypes.X3DColorNode);this._pickable=false;},{nodeChanged:function()
{var time0=new Date().getTime();var coordNode=this._cf.coord.node;x3dom.debug.assert(coordNode);var positions=coordNode._vf.point;var numColComponents=3;var colorNode=this._cf.color.node;var colors=new x3dom.fields.MFColor();if(colorNode){colors=colorNode._vf.color;x3dom.debug.assert(positions.length==colors.length);if(x3dom.isa(colorNode,x3dom.nodeTypes.ColorRGBA)){numColComponents=4;}}
else{for(var i=0,n=positions.length;i<n;i++)
colors.push(1.0);}
this._mesh._numColComponents=numColComponents;this._mesh._indices[0]=[];this._mesh._positions[0]=positions.toGL();this._mesh._colors[0]=colors.toGL();this._mesh._normals[0]=[];this._mesh._texCoords[0]=[];this._mesh._lit=false;this._mesh._invalidate=true;this._mesh._numCoords=this._mesh._positions[0].length/3;var time1=new Date().getTime()-time0;},fieldChanged:function(fieldName)
{var pnts;var i,n;if(fieldName=="coord")
{pnts=this._cf.coord.node._vf.point;n=pnts.length;this._mesh._positions[0]=[];for(i=0;i<n;i++)
{this._mesh._positions[0].push(pnts[i].x);this._mesh._positions[0].push(pnts[i].y);this._mesh._positions[0].push(pnts[i].z);}
this._mesh._invalidate=true;Array.forEach(this._parentNodes,function(node){node._dirty.positions=true;});}
else if(fieldName=="color")
{pnts=this._cf.color.node._vf.color;n=pnts.length;this._mesh._colors[0]=[];for(i=0;i<n;i++)
{this._mesh._colors[0].push(pnts[i].r);this._mesh._colors[0].push(pnts[i].g);this._mesh._colors[0].push(pnts[i].b);}
Array.forEach(this._parentNodes,function(node){node._dirty.colors=true;});}}}));x3dom.registerNodeType("Text","Text",defineClass(x3dom.nodeTypes.X3DGeometryNode,function(ctx){x3dom.nodeTypes.Text.superClass.call(this,ctx);this.addField_MFString(ctx,'string',[]);this.addField_MFFloat(ctx,'length',[]);this.addField_SFFloat(ctx,'maxExtent',0.0);this.addField_SFNode('fontStyle',x3dom.nodeTypes.X3DFontStyleNode);},{nodeChanged:function(){if(!this._cf.fontStyle.node){this.addChild(x3dom.nodeTypes.FontStyle.defaultNode());}}}));x3dom.registerNodeType("X3DComposedGeometryNode","Rendering",defineClass(x3dom.nodeTypes.X3DGeometryNode,function(ctx){x3dom.nodeTypes.X3DComposedGeometryNode.superClass.call(this,ctx);this.addField_SFBool(ctx,'colorPerVertex',true);this.addField_SFBool(ctx,'normalPerVertex',true);this.addField_MFNode('attrib',x3dom.nodeTypes.X3DVertexAttributeNode);this.addField_SFNode('coord',x3dom.nodeTypes.Coordinate);this.addField_SFNode('normal',x3dom.nodeTypes.Normal);this.addField_SFNode('color',x3dom.nodeTypes.X3DColorNode);this.addField_SFNode('texCoord',x3dom.nodeTypes.X3DTextureCoordinateNode);},{handleAttribs:function()
{var i,n=this._cf.attrib.nodes.length;for(i=0;i<n;i++)
{var name=this._cf.attrib.nodes[i]._vf.name;switch(name.toLowerCase())
{case"position":this._mesh._positions[0]=this._cf.attrib.nodes[i]._vf.value.toGL();break;case"normal":this._mesh._normals[0]=this._cf.attrib.nodes[i]._vf.value.toGL();break;case"texcoord":this._mesh._texCoords[0]=this._cf.attrib.nodes[i]._vf.value.toGL();break;case"color":this._mesh._colors[0]=this._cf.attrib.nodes[i]._vf.value.toGL();break;default:{this._mesh._dynamicFields[name]={};this._mesh._dynamicFields[name].numComponents=this._cf.attrib.nodes[i]._vf.numComponents;this._mesh._dynamicFields[name].value=this._cf.attrib.nodes[i]._vf.value.toGL();}
break;}}}}));x3dom.registerNodeType("IndexedLineSet","Rendering",defineClass(x3dom.nodeTypes.X3DGeometryNode,function(ctx){x3dom.nodeTypes.IndexedLineSet.superClass.call(this,ctx);this.addField_SFBool(ctx,'colorPerVertex',true);this.addField_MFNode('attrib',x3dom.nodeTypes.X3DVertexAttributeNode);this.addField_SFNode('coord',x3dom.nodeTypes.Coordinate);this.addField_SFNode('color',x3dom.nodeTypes.X3DColorNode);this.addField_MFInt32(ctx,'coordIndex',[]);this.addField_MFInt32(ctx,'colorIndex',[]);this._pickable=false;},{nodeChanged:function()
{var time0=new Date().getTime();var indexes=this._vf.coordIndex;var colorInd=this._vf.colorIndex;var hasColor=false,hasColorInd=false;var colPerVert=this._vf.colorPerVertex;if(colorInd.length>0)
{hasColorInd=true;}
var positions,colors;var coordNode=this._cf.coord.node;x3dom.debug.assert(coordNode);positions=coordNode._vf.point;var numColComponents=3;var colorNode=this._cf.color.node;if(colorNode)
{hasColor=true;colors=colorNode._vf.color;if(x3dom.isa(colorNode,x3dom.nodeTypes.ColorRGBA)){numColComponents=4;}}
else{hasColor=false;}
this._mesh._indices[0]=[];this._mesh._positions[0]=[];this._mesh._colors[0]=[];var i,t,cnt,lineCnt;var p0,p1,c0,c1;if((hasColor&&hasColorInd))
{t=0;cnt=0;lineCnt=0;for(i=0;i<indexes.length;++i)
{if(indexes[i]===-1){t=0;continue;}
if(hasColorInd){x3dom.debug.assert(colorInd[i]!=-1);}
switch(t)
{case 0:p0=+indexes[i];if(hasColorInd&&colPerVert){c0=+colorInd[i];}
else{c0=p0;}
t=1;break;case 1:p1=+indexes[i];if(hasColorInd&&colPerVert){c1=+colorInd[i];}
else if(hasColorInd&&!colPerVert){c1=+colorInd[lineCnt];}
else{c1=p1;}
this._mesh._indices[0].push(cnt++,cnt++);this._mesh._positions[0].push(positions[p0].x);this._mesh._positions[0].push(positions[p0].y);this._mesh._positions[0].push(positions[p0].z);this._mesh._positions[0].push(positions[p1].x);this._mesh._positions[0].push(positions[p1].y);this._mesh._positions[0].push(positions[p1].z);if(hasColor){if(!colPerVert){c0=c1;}
this._mesh._colors[0].push(colors[c0].r);this._mesh._colors[0].push(colors[c0].g);this._mesh._colors[0].push(colors[c0].b);this._mesh._colors[0].push(colors[c1].r);this._mesh._colors[0].push(colors[c1].g);this._mesh._colors[0].push(colors[c1].b);}
t=2;lineCnt++;break;case 3:p0=p1;c0=c1;p1=+indexes[i];if(hasColorInd&&colPerVert){c1=+colorInd[i];}
else if(hasColorInd&&!colPerVert){c1=+colorInd[lineCnt];}
else{c1=p1;}
this._mesh._indices[0].push(cnt++,cnt++);this._mesh._positions[0].push(positions[p0].x);this._mesh._positions[0].push(positions[p0].y);this._mesh._positions[0].push(positions[p0].z);this._mesh._positions[0].push(positions[p1].x);this._mesh._positions[0].push(positions[p1].y);this._mesh._positions[0].push(positions[p1].z);if(hasColor){if(!colPerVert){c0=c1;}
this._mesh._colors[0].push(colors[c0].r);this._mesh._colors[0].push(colors[c0].g);this._mesh._colors[0].push(colors[c0].b);this._mesh._colors[0].push(colors[c1].r);this._mesh._colors[0].push(colors[c1].g);this._mesh._colors[0].push(colors[c1].b);}
lineCnt++;break;default:}}}
else
{t=0;for(i=0;i<indexes.length;++i)
{if(indexes[i]===-1){t=0;continue;}
switch(t){case 0:p0=+indexes[i];t=1;break;case 1:p1=+indexes[i];t=2;this._mesh._indices[0].push(p0,p1);break;case 2:p0=p1;p1=+indexes[i];this._mesh._indices[0].push(p0,p1);break;}}
this._mesh._positions[0]=positions.toGL();if(hasColor){this._mesh._colors[0]=colors.toGL();this._mesh._numColComponents=numColComponents;}}
this._mesh._invalidate=true;this._mesh._numCoords=this._mesh._positions[0].length/3;var time1=new Date().getTime()-time0;},fieldChanged:function(fieldName)
{var pnts;var i,n;if(fieldName=="coord")
{pnts=this._cf.coord.node._vf.point;n=pnts.length;this._mesh._positions[0]=[];for(i=0;i<n;i++)
{this._mesh._positions[0].push(pnts[i].x);this._mesh._positions[0].push(pnts[i].y);this._mesh._positions[0].push(pnts[i].z);}
this._mesh._invalidate=true;Array.forEach(this._parentNodes,function(node){node._dirty.positions=true;});}
else if(fieldName=="color")
{pnts=this._cf.color.node._vf.color;n=pnts.length;this._mesh._colors[0]=[];for(i=0;i<n;i++)
{this._mesh._colors[0].push(pnts[i].r);this._mesh._colors[0].push(pnts[i].g);this._mesh._colors[0].push(pnts[i].b);}
Array.forEach(this._parentNodes,function(node){node._dirty.colors=true;});}}}));x3dom.registerNodeType("IndexedFaceSet","Geometry3D",defineClass(x3dom.nodeTypes.X3DComposedGeometryNode,function(ctx){x3dom.nodeTypes.IndexedFaceSet.superClass.call(this,ctx);this.addField_SFFloat(ctx,'creaseAngle',0);this.addField_MFInt32(ctx,'coordIndex',[]);this.addField_MFInt32(ctx,'normalIndex',[]);this.addField_MFInt32(ctx,'colorIndex',[]);this.addField_MFInt32(ctx,'texCoordIndex',[]);},{nodeChanged:function()
{var time0=new Date().getTime();this.handleAttribs();var indexes=this._vf.coordIndex;var normalInd=this._vf.normalIndex;var texCoordInd=this._vf.texCoordIndex;var colorInd=this._vf.colorIndex;var hasNormal=false,hasNormalInd=false;var hasTexCoord=false,hasTexCoordInd=false;var hasColor=false,hasColorInd=false;var colPerVert=this._vf.colorPerVertex;var normPerVert=this._vf.normalPerVertex;if(normalInd.length>0)
{hasNormalInd=true;}
if(texCoordInd.length>0)
{hasTexCoordInd=true;}
if(colorInd.length>0)
{hasColorInd=true;}
var positions,normals,texCoords,colors;var coordNode=this._cf.coord.node;x3dom.debug.assert(coordNode);positions=coordNode._vf.point;var normalNode=this._cf.normal.node;if(normalNode)
{hasNormal=true;normals=normalNode._vf.vector;}
else{hasNormal=false;}
var texMode="",numTexComponents=2;var texCoordNode=this._cf.texCoord.node;if(texCoordNode)
{if(texCoordNode._vf.point){hasTexCoord=true;texCoords=texCoordNode._vf.point;if(x3dom.isa(texCoordNode,x3dom.nodeTypes.TextureCoordinate3D)){numTexComponents=3;}}
else if(texCoordNode._vf.mode){texMode=texCoordNode._vf.mode;}}
else{hasTexCoord=false;}
this._mesh._numTexComponents=numTexComponents;var numColComponents=3;var colorNode=this._cf.color.node;if(colorNode)
{hasColor=true;colors=colorNode._vf.color;if(x3dom.isa(colorNode,x3dom.nodeTypes.ColorRGBA)){numColComponents=4;}}
else{hasColor=false;}
this._mesh._numColComponents=numColComponents;this._mesh._indices[0]=[];this._mesh._positions[0]=[];this._mesh._normals[0]=[];this._mesh._texCoords[0]=[];this._mesh._colors[0]=[];var i,t,cnt,faceCnt;var p0,p1,p2,n0,n1,n2,t0,t1,t2,c0,c1,c2;if((this._vf.creaseAngle<=x3dom.fields.Eps)||(positions.length/3>65535)||(hasNormal&&hasNormalInd)||(hasTexCoord&&hasTexCoordInd)||(hasColor&&hasColorInd))
{t=0;cnt=0;faceCnt=0;this._mesh._multiIndIndices=[];this._mesh._posSize=positions.length;for(i=0;i<indexes.length;++i)
{if(indexes[i]==-1){t=0;faceCnt++;continue;}
if(hasNormalInd){x3dom.debug.assert(normalInd[i]!=-1);}
if(hasTexCoordInd){x3dom.debug.assert(texCoordInd[i]!=-1);}
if(hasColorInd){x3dom.debug.assert(colorInd[i]!=-1);}
switch(t)
{case 0:p0=+indexes[i];if(hasNormalInd&&normPerVert){n0=+normalInd[i];}
else if(hasNormalInd&&!normPerVert){n0=+normalInd[faceCnt];}
else{n0=p0;}
if(hasTexCoordInd){t0=+texCoordInd[i];}
else{t0=p0;}
if(hasColorInd&&colPerVert){c0=+colorInd[i];}
else if(hasColorInd&&!colPerVert){c0=+colorInd[faceCnt];}
else{c0=p0;}
t=1;break;case 1:p1=+indexes[i];if(hasNormalInd&&normPerVert){n1=+normalInd[i];}
else if(hasNormalInd&&!normPerVert){n1=+normalInd[faceCnt];}
else{n1=p1;}
if(hasTexCoordInd){t1=+texCoordInd[i];}
else{t1=p1;}
if(hasColorInd&&colPerVert){c1=+colorInd[i];}
else if(hasColorInd&&!colPerVert){c1=+colorInd[faceCnt];}
else{c1=p1;}
t=2;break;case 2:p2=+indexes[i];if(hasNormalInd&&normPerVert){n2=+normalInd[i];}
else if(hasNormalInd&&!normPerVert){n2=+normalInd[faceCnt];}
else{n2=p2;}
if(hasTexCoordInd){t2=+texCoordInd[i];}
else{t2=p2;}
if(hasColorInd&&colPerVert){c2=+colorInd[i];}
else if(hasColorInd&&!colPerVert){c2=+colorInd[faceCnt];}
else{c2=p2;}
t=3;this._mesh._indices[0].push(cnt++,cnt++,cnt++);this._mesh._positions[0].push(positions[p0].x);this._mesh._positions[0].push(positions[p0].y);this._mesh._positions[0].push(positions[p0].z);this._mesh._positions[0].push(positions[p1].x);this._mesh._positions[0].push(positions[p1].y);this._mesh._positions[0].push(positions[p1].z);this._mesh._positions[0].push(positions[p2].x);this._mesh._positions[0].push(positions[p2].y);this._mesh._positions[0].push(positions[p2].z);if(hasNormal){this._mesh._normals[0].push(normals[n0].x);this._mesh._normals[0].push(normals[n0].y);this._mesh._normals[0].push(normals[n0].z);this._mesh._normals[0].push(normals[n1].x);this._mesh._normals[0].push(normals[n1].y);this._mesh._normals[0].push(normals[n1].z);this._mesh._normals[0].push(normals[n2].x);this._mesh._normals[0].push(normals[n2].y);this._mesh._normals[0].push(normals[n2].z);}
else{this._mesh._multiIndIndices.push(p0,p1,p2);}
if(hasColor){this._mesh._colors[0].push(colors[c0].r);this._mesh._colors[0].push(colors[c0].g);this._mesh._colors[0].push(colors[c0].b);if(numColComponents===4)
this._mesh._colors[0].push(colors[c0].a);this._mesh._colors[0].push(colors[c1].r);this._mesh._colors[0].push(colors[c1].g);this._mesh._colors[0].push(colors[c1].b);if(numColComponents===4)
this._mesh._colors[0].push(colors[c1].a);this._mesh._colors[0].push(colors[c2].r);this._mesh._colors[0].push(colors[c2].g);this._mesh._colors[0].push(colors[c2].b);if(numColComponents===4)
this._mesh._colors[0].push(colors[c2].a);}
if(hasTexCoord){this._mesh._texCoords[0].push(texCoords[t0].x);this._mesh._texCoords[0].push(texCoords[t0].y);if(numTexComponents===3)
this._mesh._texCoords[0].push(texCoords[t0].z);this._mesh._texCoords[0].push(texCoords[t1].x);this._mesh._texCoords[0].push(texCoords[t1].y);if(numTexComponents===3)
this._mesh._texCoords[0].push(texCoords[t1].z);this._mesh._texCoords[0].push(texCoords[t2].x);this._mesh._texCoords[0].push(texCoords[t2].y);if(numTexComponents===3)
this._mesh._texCoords[0].push(texCoords[t2].z);}
break;case 3:p1=p2;t1=t2;if(normPerVert){n1=n2;}
if(colPerVert){c1=c2;}
p2=+indexes[i];if(hasNormalInd&&normPerVert){n2=+normalInd[i];}
else if(hasNormalInd&&!normPerVert){}
else{n2=p2;}
if(hasTexCoordInd){t2=+texCoordInd[i];}
else{t2=p2;}
if(hasColorInd&&colPerVert){c2=+colorInd[i];}
else if(hasColorInd&&!colPerVert){}
else{c2=p2;}
this._mesh._indices[0].push(cnt++,cnt++,cnt++);this._mesh._positions[0].push(positions[p0].x);this._mesh._positions[0].push(positions[p0].y);this._mesh._positions[0].push(positions[p0].z);this._mesh._positions[0].push(positions[p1].x);this._mesh._positions[0].push(positions[p1].y);this._mesh._positions[0].push(positions[p1].z);this._mesh._positions[0].push(positions[p2].x);this._mesh._positions[0].push(positions[p2].y);this._mesh._positions[0].push(positions[p2].z);if(hasNormal){this._mesh._normals[0].push(normals[n0].x);this._mesh._normals[0].push(normals[n0].y);this._mesh._normals[0].push(normals[n0].z);this._mesh._normals[0].push(normals[n1].x);this._mesh._normals[0].push(normals[n1].y);this._mesh._normals[0].push(normals[n1].z);this._mesh._normals[0].push(normals[n2].x);this._mesh._normals[0].push(normals[n2].y);this._mesh._normals[0].push(normals[n2].z);}
else{this._mesh._multiIndIndices.push(p0,p1,p2);}
if(hasColor){this._mesh._colors[0].push(colors[c0].r);this._mesh._colors[0].push(colors[c0].g);this._mesh._colors[0].push(colors[c0].b);if(numColComponents===4)
this._mesh._colors[0].push(colors[c0].a);this._mesh._colors[0].push(colors[c1].r);this._mesh._colors[0].push(colors[c1].g);this._mesh._colors[0].push(colors[c1].b);if(numColComponents===4)
this._mesh._colors[0].push(colors[c1].a);this._mesh._colors[0].push(colors[c2].r);this._mesh._colors[0].push(colors[c2].g);this._mesh._colors[0].push(colors[c2].b);if(numColComponents===4)
this._mesh._colors[0].push(colors[c2].a);}
if(hasTexCoord){this._mesh._texCoords[0].push(texCoords[t0].x);this._mesh._texCoords[0].push(texCoords[t0].y);if(numTexComponents===3)
this._mesh._texCoords[0].push(texCoords[t0].z);this._mesh._texCoords[0].push(texCoords[t1].x);this._mesh._texCoords[0].push(texCoords[t1].y);if(numTexComponents===3)
this._mesh._texCoords[0].push(texCoords[t1].z);this._mesh._texCoords[0].push(texCoords[t2].x);this._mesh._texCoords[0].push(texCoords[t2].y);if(numTexComponents===3)
this._mesh._texCoords[0].push(texCoords[t2].z);}
break;default:}}
if(!hasNormal){this._mesh.calcNormals(this._vf.creaseAngle);}
if(!hasTexCoord){this._mesh.calcTexCoords(texMode);}
this._mesh.splitMesh();}
else
{t=0;for(i=0;i<indexes.length;++i)
{if(indexes[i]==-1){t=0;continue;}
switch(t){case 0:n0=+indexes[i];t=1;break;case 1:n1=+indexes[i];t=2;break;case 2:n2=+indexes[i];t=3;this._mesh._indices[0].push(n0,n1,n2);break;case 3:n1=n2;n2=+indexes[i];this._mesh._indices[0].push(n0,n1,n2);break;}}
this._mesh._positions[0]=positions.toGL();if(hasNormal){this._mesh._normals[0]=normals.toGL();}
else{this._mesh.calcNormals(this._vf.creaseAngle);}
if(hasTexCoord){this._mesh._texCoords[0]=texCoords.toGL();this._mesh._numTexComponents=numTexComponents;}
else{this._mesh.calcTexCoords(texMode);}
if(hasColor){this._mesh._colors[0]=colors.toGL();this._mesh._numColComponents=numColComponents;}}
this._mesh._invalidate=true;this._mesh._numFaces=0;this._mesh._numCoords=0;for(i=0;i<this._mesh._indices.length;i++){this._mesh._numFaces+=this._mesh._indices[i].length/3;this._mesh._numCoords+=this._mesh._positions[i].length/3;}
var time1=new Date().getTime()-time0;},fieldChanged:function(fieldName)
{var pnts=this._cf.coord.node._vf.point;var i,n=pnts.length;if((this._vf.creaseAngle<=x3dom.fields.Eps)||(n/3>65535)||(this._vf.normalIndex.length>0&&this._cf.normal.node)||(this._vf.texCoordIndex.length>0&&this._cf.texCoord.node)||(this._vf.colorIndex.length>0&&this._cf.color.node))
{x3dom.debug.logWarning("Ipol with creaseAngle == 0, too many coords, or multi-index!");this.nodeChanged();Array.forEach(this._parentNodes,function(node){node._dirty.positions=true;});Array.forEach(this._parentNodes,function(node){node._dirty.colors=true;});return;}
if(fieldName=="coord")
{pnts=this._cf.coord.node._vf.point;n=pnts.length;this._mesh._positions[0]=[];for(i=0;i<n;i++)
{this._mesh._positions[0].push(pnts[i].x);this._mesh._positions[0].push(pnts[i].y);this._mesh._positions[0].push(pnts[i].z);}
this._mesh._invalidate=true;Array.forEach(this._parentNodes,function(node){node._dirty.positions=true;});}
else if(fieldName=="color")
{pnts=this._cf.color.node._vf.color;n=pnts.length;this._mesh._colors[0]=[];for(i=0;i<n;i++)
{this._mesh._colors[0].push(pnts[i].r);this._mesh._colors[0].push(pnts[i].g);this._mesh._colors[0].push(pnts[i].b);}
Array.forEach(this._parentNodes,function(node){node._dirty.colors=true;});}}}));x3dom.registerNodeType("IndexedTriangleSet","Rendering",defineClass(x3dom.nodeTypes.X3DComposedGeometryNode,function(ctx){x3dom.nodeTypes.IndexedTriangleSet.superClass.call(this,ctx);this.addField_MFInt32(ctx,'index',[]);},{nodeChanged:function()
{var time0=new Date().getTime();this.handleAttribs();var normPerVert=this._vf.normalPerVertex;var indexes=this._vf.index;var hasNormal=false,hasTexCoord=false,hasColor=false;var positions,normals,texCoords,colors;var coordNode=this._cf.coord.node;x3dom.debug.assert(coordNode);positions=coordNode._vf.point;var normalNode=this._cf.normal.node;if(normalNode){hasNormal=true;normals=normalNode._vf.vector;}
else{hasNormal=false;}
var texMode="",numTexComponents=2;var texCoordNode=this._cf.texCoord.node;if(texCoordNode){if(texCoordNode._vf.point){hasTexCoord=true;texCoords=texCoordNode._vf.point;if(x3dom.isa(texCoordNode,x3dom.nodeTypes.TextureCoordinate3D)){numTexComponents=3;}}
else if(texCoordNode._vf.mode){texMode=texCoordNode._vf.mode;}}
else{hasTexCoord=false;}
var numColComponents=3;var colorNode=this._cf.color.node;if(colorNode){hasColor=true;colors=colorNode._vf.color;if(x3dom.isa(colorNode,x3dom.nodeTypes.ColorRGBA)){numColComponents=4;}}
else{hasColor=false;}
this._mesh._indices[0]=[];this._mesh._positions[0]=[];this._mesh._normals[0]=[];this._mesh._texCoords[0]=[];this._mesh._colors[0]=[];var i,t,cnt,faceCnt,posMax;var p0,p1,p2,n0,n1,n2,t0,t1,t2,c0,c1,c2;while(positions.length%3>0){positions.push(positions.length-1);}
posMax=positions.length;if((positions.length>65535))
{t=0;cnt=0;faceCnt=0;this._mesh._multiIndIndices=[];this._mesh._posSize=positions.length;for(i=0;i<indexes.length;++i)
{if((i>0)&&!(i%3)){t=0;faceCnt++;}
switch(t)
{case 0:p0=+indexes[i];n0=p0;t0=p0;c0=p0;t=1;break;case 1:p1=+indexes[i];n1=p1;t1=p1;c1=p1;t=2;break;case 2:p2=+indexes[i];n2=p2;t2=p2;c2=p2;t=3;this._mesh._indices[0].push(cnt++,cnt++,cnt++);this._mesh._positions[0].push(positions[p0].x);this._mesh._positions[0].push(positions[p0].y);this._mesh._positions[0].push(positions[p0].z);this._mesh._positions[0].push(positions[p1].x);this._mesh._positions[0].push(positions[p1].y);this._mesh._positions[0].push(positions[p1].z);this._mesh._positions[0].push(positions[p2].x);this._mesh._positions[0].push(positions[p2].y);this._mesh._positions[0].push(positions[p2].z);if(hasNormal){this._mesh._normals[0].push(normals[n0].x);this._mesh._normals[0].push(normals[n0].y);this._mesh._normals[0].push(normals[n0].z);this._mesh._normals[0].push(normals[n1].x);this._mesh._normals[0].push(normals[n1].y);this._mesh._normals[0].push(normals[n1].z);this._mesh._normals[0].push(normals[n2].x);this._mesh._normals[0].push(normals[n2].y);this._mesh._normals[0].push(normals[n2].z);}
else{this._mesh._multiIndIndices.push(p0,p1,p2);}
if(hasColor){this._mesh._colors[0].push(colors[c0].r);this._mesh._colors[0].push(colors[c0].g);this._mesh._colors[0].push(colors[c0].b);if(numColComponents===4)
this._mesh._colors[0].push(colors[c0].a);this._mesh._colors[0].push(colors[c1].r);this._mesh._colors[0].push(colors[c1].g);this._mesh._colors[0].push(colors[c1].b);if(numColComponents===4)
this._mesh._colors[0].push(colors[c1].a);this._mesh._colors[0].push(colors[c2].r);this._mesh._colors[0].push(colors[c2].g);this._mesh._colors[0].push(colors[c2].b);if(numColComponents===4)
this._mesh._colors[0].push(colors[c2].a);}
if(hasTexCoord){this._mesh._texCoords[0].push(texCoords[t0].x);this._mesh._texCoords[0].push(texCoords[t0].y);if(numTexComponents===3)
this._mesh._texCoords[0].push(texCoords[t0].z);this._mesh._texCoords[0].push(texCoords[t1].x);this._mesh._texCoords[0].push(texCoords[t1].y);if(numTexComponents===3)
this._mesh._texCoords[0].push(texCoords[t1].z);this._mesh._texCoords[0].push(texCoords[t2].x);this._mesh._texCoords[0].push(texCoords[t2].y);if(numTexComponents===3)
this._mesh._texCoords[0].push(texCoords[t2].z);}
break;default:}}
if(!hasNormal){this._mesh.calcNormals(this._vf.creaseAngle);}
if(!hasTexCoord){this._mesh.calcTexCoords(texMode);}
this._mesh.splitMesh();}
else
{this._mesh._indices[0]=indexes.toGL();this._mesh._positions[0]=positions.toGL();if(hasNormal){this._mesh._normals[0]=normals.toGL();}
else{this._mesh.calcNormals(this._vf.creaseAngle);}
if(hasTexCoord){this._mesh._texCoords[0]=texCoords.toGL();this._mesh._numTexComponents=numTexComponents;}
else{this._mesh.calcTexCoords(texMode);}
if(hasColor){this._mesh._colors[0]=colors.toGL();this._mesh._numColComponents=numColComponents;}}
this._mesh._invalidate=true;this._mesh._numFaces=0;this._mesh._numCoords=0;for(i=0;i<this._mesh._indices.length;i++){this._mesh._numFaces+=this._mesh._indices[i].length/3;this._mesh._numCoords+=this._mesh._positions[i].length/3;}
var time1=new Date().getTime()-time0;},fieldChanged:function(fieldName)
{var pnts;var i,n;if(fieldName=="coord")
{pnts=this._cf.coord.node._vf.point;n=pnts.length;this._mesh._positions[0]=[];for(i=0;i<n;i++)
{this._mesh._positions[0].push(pnts[i].x);this._mesh._positions[0].push(pnts[i].y);this._mesh._positions[0].push(pnts[i].z);}
this._mesh._invalidate=true;Array.forEach(this._parentNodes,function(node){node._dirty.positions=true;});}
else if(fieldName=="color")
{pnts=this._cf.color.node._vf.color;n=pnts.length;this._mesh._colors[0]=[];for(i=0;i<n;i++)
{this._mesh._colors[0].push(pnts[i].r);this._mesh._colors[0].push(pnts[i].g);this._mesh._colors[0].push(pnts[i].b);}
Array.forEach(this._parentNodes,function(node){node._dirty.colors=true;});}}}));x3dom.registerNodeType("X3DGeometricPropertyNode","Rendering",defineClass(x3dom.nodeTypes.X3DNode,function(ctx){x3dom.nodeTypes.X3DGeometricPropertyNode.superClass.call(this,ctx);}));x3dom.registerNodeType("Coordinate","Rendering",defineClass(x3dom.nodeTypes.X3DGeometricPropertyNode,function(ctx){x3dom.nodeTypes.Coordinate.superClass.call(this,ctx);this.addField_MFVec3f(ctx,'point',[]);},{fieldChanged:function(fieldName){Array.forEach(this._parentNodes,function(node){node.fieldChanged("coord");});}}));x3dom.registerNodeType("X3DTextureCoordinateNode","Texturing",defineClass(x3dom.nodeTypes.X3DGeometricPropertyNode,function(ctx){x3dom.nodeTypes.X3DTextureCoordinateNode.superClass.call(this,ctx);}));x3dom.registerNodeType("TextureCoordinate3D","Texturing3D",defineClass(x3dom.nodeTypes.X3DTextureCoordinateNode,function(ctx){x3dom.nodeTypes.TextureCoordinate3D.superClass.call(this,ctx);this.addField_MFVec3f(ctx,'point',[]);}));x3dom.registerNodeType("TextureCoordinate","Texturing",defineClass(x3dom.nodeTypes.X3DTextureCoordinateNode,function(ctx){x3dom.nodeTypes.TextureCoordinate.superClass.call(this,ctx);this.addField_MFVec2f(ctx,'point',[]);}));x3dom.registerNodeType("TextureCoordinateGenerator","Texturing",defineClass(x3dom.nodeTypes.X3DTextureCoordinateNode,function(ctx){x3dom.nodeTypes.TextureCoordinateGenerator.superClass.call(this,ctx);this.addField_SFString(ctx,'mode',"SPHERE");this.addField_MFFloat(ctx,'parameter',[]);}));x3dom.registerNodeType("Normal","Rendering",defineClass(x3dom.nodeTypes.X3DGeometricPropertyNode,function(ctx){x3dom.nodeTypes.Normal.superClass.call(this,ctx);this.addField_MFVec3f(ctx,'vector',[]);}));x3dom.registerNodeType("X3DColorNode","Rendering",defineClass(x3dom.nodeTypes.X3DGeometricPropertyNode,function(ctx){x3dom.nodeTypes.X3DColorNode.superClass.call(this,ctx);},{fieldChanged:function(fieldName){Array.forEach(this._parentNodes,function(node){node.fieldChanged("color");});}}));x3dom.registerNodeType("Color","Rendering",defineClass(x3dom.nodeTypes.X3DColorNode,function(ctx){x3dom.nodeTypes.Color.superClass.call(this,ctx);this.addField_MFColor(ctx,'color',[]);}));x3dom.registerNodeType("ColorRGBA","Rendering",defineClass(x3dom.nodeTypes.X3DColorNode,function(ctx){x3dom.nodeTypes.ColorRGBA.superClass.call(this,ctx);this.addField_MFColorRGBA(ctx,'color',[]);}));x3dom.registerNodeType("X3DVertexAttributeNode","Shaders",defineClass(x3dom.nodeTypes.X3DGeometricPropertyNode,function(ctx){x3dom.nodeTypes.X3DVertexAttributeNode.superClass.call(this,ctx);this.addField_SFString(ctx,'name',"");}));x3dom.registerNodeType("FloatVertexAttribute","Shaders",defineClass(x3dom.nodeTypes.X3DVertexAttributeNode,function(ctx){x3dom.nodeTypes.FloatVertexAttribute.superClass.call(this,ctx);this.addField_SFInt32(ctx,'numComponents',4);this.addField_MFFloat(ctx,'value',[]);},{fieldChanged:function(fieldName){}}));x3dom.registerNodeType("X3DFontStyleNode","Text",defineClass(x3dom.nodeTypes.X3DNode,function(ctx){x3dom.nodeTypes.X3DFontStyleNode.superClass.call(this,ctx);}));x3dom.registerNodeType("FontStyle","Text",defineClass(x3dom.nodeTypes.X3DFontStyleNode,function(ctx){x3dom.nodeTypes.FontStyle.superClass.call(this,ctx);this.addField_MFString(ctx,'family',['SERIF']);this.addField_SFBool(ctx,'horizontal',true);this.addField_MFString(ctx,'justify',['BEGIN']);this.addField_SFString(ctx,'language',"");this.addField_SFBool(ctx,'leftToRight',true);this.addField_SFFloat(ctx,'size',1.0);this.addField_SFFloat(ctx,'spacing',1.0);this.addField_SFString(ctx,'style',"PLAIN");this.addField_SFBool(ctx,'topToBottom',true);}));x3dom.nodeTypes.FontStyle.defaultNode=function(){if(!x3dom.nodeTypes.FontStyle._defaultNode){x3dom.nodeTypes.FontStyle._defaultNode=new x3dom.nodeTypes.FontStyle();x3dom.nodeTypes.FontStyle._defaultNode.nodeChanged();}
return x3dom.nodeTypes.FontStyle._defaultNode;};x3dom.registerNodeType("X3DChildNode","Core",defineClass(x3dom.nodeTypes.X3DNode,function(ctx){x3dom.nodeTypes.X3DChildNode.superClass.call(this,ctx);}));x3dom.registerNodeType("X3DSoundNode","Sound",defineClass(x3dom.nodeTypes.X3DChildNode,function(ctx){x3dom.nodeTypes.X3DSoundNode.superClass.call(this,ctx);}));x3dom.registerNodeType("Sound","Sound",defineClass(x3dom.nodeTypes.X3DSoundNode,function(ctx){x3dom.nodeTypes.Sound.superClass.call(this,ctx);this.addField_SFNode('source',x3dom.nodeTypes.X3DSoundSourceNode);},{nodeChanged:function()
{if(this._cf.source.node||!this._xmlNode){return;}
x3dom.debug.logInfo("No AudioClip child node given, searching for &lt;audio&gt; elements...");var that=this;try{Array.forEach(this._xmlNode.childNodes,function(childDomNode){if(childDomNode.nodeType===1)
{x3dom.debug.logInfo("### Found &lt;"+childDomNode.nodeName+"&gt; tag.");if(childDomNode.localName.toLowerCase()==="audio")
{var loop=childDomNode.getAttribute("loop");loop=loop?(loop.toLowerCase()==="loop"):false;var newNode=childDomNode.cloneNode(false);childDomNode.parentNode.removeChild(childDomNode);childDomNode=null;var p=document.getElementsByTagName('body')[0];p.appendChild(newNode);var startAudio=function(){newNode.play();};var audioDone=function(){if(loop){newNode.play();}};newNode.addEventListener("canplaythrough",startAudio,true);newNode.addEventListener("ended",audioDone,true);}}});}
catch(e){}}}));x3dom.registerNodeType("X3DTimeDependentNode","Time",defineClass(x3dom.nodeTypes.X3DChildNode,function(ctx){x3dom.nodeTypes.X3DTimeDependentNode.superClass.call(this,ctx);this.addField_SFBool(ctx,'loop',false);}));x3dom.registerNodeType("X3DSoundSourceNode","Sound",defineClass(x3dom.nodeTypes.X3DTimeDependentNode,function(ctx){x3dom.nodeTypes.X3DSoundSourceNode.superClass.call(this,ctx);}));x3dom.registerNodeType("AudioClip","Sound",defineClass(x3dom.nodeTypes.X3DSoundSourceNode,function(ctx){x3dom.nodeTypes.AudioClip.superClass.call(this,ctx);this.addField_MFString(ctx,'url',[]);this._audio=null;},{nodeChanged:function()
{this._audio=document.createElement('audio');this._audio.setAttribute('autobuffer','true');var p=document.getElementsByTagName('body')[0];p.appendChild(this._audio);for(var i=0;i<this._vf.url.length;i++)
{var audioUrl=this._nameSpace.getURL(this._vf.url[i]);x3dom.debug.logInfo('Adding sound file: '+audioUrl);var src=document.createElement('source');src.setAttribute('src',audioUrl);this._audio.appendChild(src);}
var that=this;var startAudio=function()
{that._audio.play();};var audioDone=function()
{if(that._vf.loop===true)
{that._audio.play();}};this._audio.addEventListener("canplaythrough",startAudio,true);this._audio.addEventListener("ended",audioDone,true);}}));x3dom.registerNodeType("X3DBindableNode","Core",defineClass(x3dom.nodeTypes.X3DChildNode,function(ctx){x3dom.nodeTypes.X3DBindableNode.superClass.call(this,ctx);this.addField_SFBool(ctx,'set_bind',false);this.addField_SFString(ctx,'description',"");this.addField_SFBool(ctx,'isActive',false);this._autoGen=(ctx.autoGen?true:false);if(ctx&&ctx.doc._bindableBag){this._stack=ctx.doc._bindableBag.addBindable(this);}
else{this._stack=null;x3dom.debug.logError('Could not find bindableBag for registration '+this.typeName());}},{initDefault:function(){},bind:function(value){if(this._stack){if(value){this._stack.push(this);}
else{this._stack.pop(this);}}
else{x3dom.debug.logError('No BindStack in Bindable\n');}},activate:function(prev){x3dom.debug.logInfo('activate Bindable '+this._DEF);this.postMessage('isActive',true);},deactivate:function(prev){x3dom.debug.logInfo('deactivate Bindable '+this._DEF);this.postMessage('isActive',false);},fieldChanged:function(fieldName){if(fieldName==="set_bind"){this.bind(this._vf.set_bind);}},nodeChanged:function(){}}));x3dom.registerNodeType("X3DViewpointNode","Navigation",defineClass(x3dom.nodeTypes.X3DBindableNode,function(ctx){x3dom.nodeTypes.X3DViewpointNode.superClass.call(this,ctx);},{}));x3dom.registerNodeType("X3DNavigationInfoNode","Navigation",defineClass(x3dom.nodeTypes.X3DBindableNode,function(ctx){x3dom.nodeTypes.X3DNavigationInfoNode.superClass.call(this,ctx);},{}));x3dom.registerNodeType("X3DBackgroundNode","EnvironmentalEffects",defineClass(x3dom.nodeTypes.X3DBindableNode,function(ctx){x3dom.nodeTypes.X3DBackgroundNode.superClass.call(this,ctx);this._dirty=true;},{getSkyColor:function(){return new x3dom.fields.SFColor(0,0,0);},getTransparency:function(){return 0;},getTexUrl:function(){return[];}}));x3dom.registerNodeType("X3DFogNode","EnvironmentalEffects",defineClass(x3dom.nodeTypes.X3DBindableNode,function(ctx){x3dom.nodeTypes.X3DFogNode.superClass.call(this,ctx);},{}));x3dom.registerNodeType("Viewpoint","Navigation",defineClass(x3dom.nodeTypes.X3DViewpointNode,function(ctx){x3dom.nodeTypes.Viewpoint.superClass.call(this,ctx);this.addField_SFFloat(ctx,'fieldOfView',0.785398);this.addField_SFVec3f(ctx,'position',0,0,10);this.addField_SFRotation(ctx,'orientation',0,0,0,1);this.addField_SFVec3f(ctx,'centerOfRotation',0,0,0);this.addField_SFFloat(ctx,'zNear',0.1);this.addField_SFFloat(ctx,'zFar',100000);this._viewMatrix=this._vf.orientation.toMatrix().transpose().mult(x3dom.fields.SFMatrix4f.translation(this._vf.position.negate()));this._projMatrix=null;this._lastAspect=1.0;},{fieldChanged:function(fieldName){if(fieldName=="position"||fieldName=="orientation"){this._viewMatrix=this._vf.orientation.toMatrix().transpose().mult(x3dom.fields.SFMatrix4f.translation(this._vf.position.negate()));}
else if(fieldName=="fieldOfView"||fieldName=="zNear"||fieldName=="zFar"){this._projMatrix=null;}
else if(fieldName==="set_bind"){this.bind(this._vf.set_bind);}},activate:function(prev){if(prev){this._nameSpace.doc._viewarea.animateTo(this,prev);}
x3dom.nodeTypes.X3DViewpointNode.prototype.activate.call(this,prev);this._nameSpace.doc._viewarea._needNavigationMatrixUpdate=true;},deactivate:function(prev){x3dom.nodeTypes.X3DViewpointNode.prototype.deactivate.call(this,prev);},getCenterOfRotation:function(){return this._vf.centerOfRotation;},getViewMatrix:function(){return this._viewMatrix;},getFieldOfView:function(){return this._vf.fieldOfView;},setView:function(newView){var mat=this.getCurrentTransform();mat=mat.inverse();this._viewMatrix=mat.mult(newView);},resetView:function(){this._viewMatrix=this._vf.orientation.toMatrix().transpose().mult(x3dom.fields.SFMatrix4f.translation(this._vf.position.negate()));},getProjectionMatrix:function(aspect)
{if(this._projMatrix==null)
{var fovy=this._vf.fieldOfView;var zfar=this._vf.zFar;var znear=this._vf.zNear;var f=1/Math.tan(fovy/2);this._projMatrix=new x3dom.fields.SFMatrix4f(f/aspect,0,0,0,0,f,0,0,0,0,(znear+zfar)/(znear-zfar),2*znear*zfar/(znear-zfar),0,0,-1,0);this._lastAspect=aspect;}
else if(this._lastAspect!==aspect)
{this._projMatrix._00=(1/Math.tan(this._vf.fieldOfView/2))/aspect;this._lastAspect=aspect;}
return this._projMatrix;}}));x3dom.registerNodeType("Fog","EnvironmentalEffects",defineClass(x3dom.nodeTypes.X3DFogNode,function(ctx){x3dom.nodeTypes.Fog.superClass.call(this,ctx);this.addField_SFColor(ctx,'color',1,1,1);this.addField_SFString(ctx,'fogType',"LINEAR");this.addField_SFFloat(ctx,'visibilityRange',0);},{}));x3dom.registerNodeType("NavigationInfo","Navigation",defineClass(x3dom.nodeTypes.X3DNavigationInfoNode,function(ctx){x3dom.nodeTypes.NavigationInfo.superClass.call(this,ctx);this.addField_SFBool(ctx,'headlight',true);this.addField_MFString(ctx,'type',["EXAMINE","ANY"]);this.addField_MFFloat(ctx,'avatarSize',[0.25,1.6,0.75]);this.addField_SFFloat(ctx,'speed',1.0);this.addField_SFFloat(ctx,'visibilityLimit',0.0);this.addField_SFTime(ctx,'transitionTime',1.0);this.addField_MFString(ctx,'transitionType',["LINEAR"]);x3dom.debug.logInfo("NavType: "+this._vf.type[0].toLowerCase());},{}));x3dom.registerNodeType("WorldInfo","Core",defineClass(x3dom.nodeTypes.X3DChildNode,function(ctx){x3dom.nodeTypes.WorldInfo.superClass.call(this,ctx);this.addField_MFString(ctx,'info',[]);this.addField_SFString(ctx,'title',"");x3dom.debug.logInfo(this._vf.info);x3dom.debug.logInfo(this._vf.title);},{}));x3dom.registerNodeType("Background","EnvironmentalEffects",defineClass(x3dom.nodeTypes.X3DBackgroundNode,function(ctx){x3dom.nodeTypes.Background.superClass.call(this,ctx);var trans=ctx.autoGen?1:0;this.addField_MFColor(ctx,'skyColor',[new x3dom.fields.SFColor(0,0,0)]);this.addField_MFFloat(ctx,'skyAngle',[]);this.addField_MFColor(ctx,'groundColor',[]);this.addField_MFFloat(ctx,'groundAngle',[]);this.addField_SFFloat(ctx,'transparency',trans);this.addField_MFString(ctx,'backUrl',[]);this.addField_MFString(ctx,'bottomUrl',[]);this.addField_MFString(ctx,'frontUrl',[]);this.addField_MFString(ctx,'leftUrl',[]);this.addField_MFString(ctx,'rightUrl',[]);this.addField_MFString(ctx,'topUrl',[]);},{fieldChanged:function(fieldName)
{if(fieldName.indexOf("Url")>0){this._dirty=true;}
else if(fieldName==="set_bind"){this.bind(this._vf.set_bind);}},getSkyColor:function(){return this._vf.skyColor;},getGroundColor:function(){return this._vf.groundColor;},getTransparency:function(){return this._vf.transparency;},getTexUrl:function(){return[this._nameSpace.getURL(this._vf.backUrl[0]),this._nameSpace.getURL(this._vf.frontUrl[0]),this._nameSpace.getURL(this._vf.bottomUrl[0]),this._nameSpace.getURL(this._vf.topUrl[0]),this._nameSpace.getURL(this._vf.leftUrl[0]),this._nameSpace.getURL(this._vf.rightUrl[0])];}}));x3dom.registerNodeType("X3DLightNode","Lighting",defineClass(x3dom.nodeTypes.X3DChildNode,function(ctx){x3dom.nodeTypes.X3DLightNode.superClass.call(this,ctx);ctx.doc._nodeBag.lights.push(this);this.addField_SFFloat(ctx,'ambientIntensity',0);this.addField_SFColor(ctx,'color',1,1,1);this.addField_SFFloat(ctx,'intensity',1);this.addField_SFBool(ctx,'global',false);this.addField_SFBool(ctx,'on',true);this.addField_SFFloat(ctx,'shadowIntensity',0);},{getViewMatrix:function(vec){return x3dom.fields.SFMatrix4f.identity;},parentRemoved:function(parent)
{if(this._parentNodes.length===0){var doc=this.findX3DDoc();for(var i=0,n=doc._nodeBag.lights.length;i<n;i++){if(doc._nodeBag.lights[i]===this){doc._nodeBag.lights.splice(i,1);}}}}}));x3dom.registerNodeType("DirectionalLight","Lighting",defineClass(x3dom.nodeTypes.X3DLightNode,function(ctx){x3dom.nodeTypes.DirectionalLight.superClass.call(this,ctx);this.addField_SFVec3f(ctx,'direction',0,0,-1);},{getViewMatrix:function(vec){var dir=this._vf.direction.normalize();var orientation=x3dom.fields.Quaternion.rotateFromTo(new x3dom.fields.SFVec3f(0,0,-1),dir);return orientation.toMatrix().transpose().mult(x3dom.fields.SFMatrix4f.translation(vec.negate()));}}));x3dom.registerNodeType("PointLight","Lighting",defineClass(x3dom.nodeTypes.X3DLightNode,function(ctx){x3dom.nodeTypes.PointLight.superClass.call(this,ctx);this.addField_SFVec3f(ctx,'attenuation',1,0,0);this.addField_SFVec3f(ctx,'location',0,0,0);this.addField_SFFloat(ctx,'radius',100);this._vf.global=true;},{getViewMatrix:function(vec){var pos=this._vf.location;var orientation=x3dom.fields.Quaternion.rotateFromTo(new x3dom.fields.SFVec3f(0,0,-1),vec);return orientation.toMatrix().transpose().mult(x3dom.fields.SFMatrix4f.translation(pos.negate()));}}));x3dom.registerNodeType("SpotLight","Lighting",defineClass(x3dom.nodeTypes.X3DLightNode,function(ctx){x3dom.nodeTypes.SpotLight.superClass.call(this,ctx);this.addField_SFVec3f(ctx,'direction',0,0,-1);this.addField_SFVec3f(ctx,'attenuation',1,0,0);this.addField_SFVec3f(ctx,'location',0,0,0);this.addField_SFFloat(ctx,'radius',100);this.addField_SFFloat(ctx,'beamWidth',1.5707963);this.addField_SFFloat(ctx,'cutOffAngle',1.5707963);this._vf.global=true;},{getViewMatrix:function(vec){var pos=this._vf.location;var dir=this._vf.direction.normalize();var orientation=x3dom.fields.Quaternion.rotateFromTo(new x3dom.fields.SFVec3f(0,0,-1),dir);return orientation.toMatrix().transpose().mult(x3dom.fields.SFMatrix4f.translation(pos.negate()));}}));x3dom.registerNodeType("X3DShapeNode","Shape",defineClass(x3dom.nodeTypes.X3DChildNode,function(ctx){x3dom.nodeTypes.X3DShapeNode.superClass.call(this,ctx);}));x3dom.registerNodeType("Shape","Shape",defineClass(x3dom.nodeTypes.X3DShapeNode,function(ctx){x3dom.nodeTypes.Shape.superClass.call(this,ctx);this.addField_SFNode('appearance',x3dom.nodeTypes.X3DAppearanceNode);this.addField_SFNode('geometry',x3dom.nodeTypes.X3DGeometryNode);this._objectID=0;this._dirty={positions:true,normals:true,texcoords:true,colors:true,indexes:true,texture:true};},{nodeChanged:function(){if(!this._cf.appearance.node){this.addChild(x3dom.nodeTypes.Appearance.defaultNode());}
if(!this._cf.geometry.node){x3dom.debug.logError("No geometry given in Shape/"+this._DEF);}
else if(!this._objectID&&this._cf.geometry.node._pickable){this._objectID=++x3dom.nodeTypes.Shape.objectID;x3dom.nodeTypes.Shape.idMap.nodeID[this._objectID]=this;}},parentRemoved:function(parent)
{if(this._parentNodes.length===0&&this._webgl)
{var doc=this.findX3DDoc();var gl=doc.ctx.ctx3d;var sp=this._webgl.shader;for(var cnt=0;this._webgl.texture!==undefined&&cnt<this._webgl.texture.length;cnt++)
{if(this._webgl.texture[cnt])
{gl.deleteTexture(this._webgl.texture[cnt]);}}
for(var q=0;q<this._webgl.positions.length;q++)
{if(sp.position!==undefined)
{gl.deleteBuffer(this._webgl.buffers[5*q+1]);gl.deleteBuffer(this._webgl.buffers[5*q+0]);}
if(sp.normal!==undefined)
{gl.deleteBuffer(this._webgl.buffers[5*q+2]);}
if(sp.texcoord!==undefined)
{gl.deleteBuffer(this._webgl.buffers[5*q+3]);}
if(sp.color!==undefined)
{gl.deleteBuffer(this._webgl.buffers[5*q+4]);}}
for(var df=0;df<this._webgl.dynamicFields.length;df++)
{var attrib=this._webgl.dynamicFields[df];if(sp[attrib.name]!==undefined)
{gl.deleteBuffer(attrib.buf);}}
this._webgl=null;}},collectDrawableObjects:function(transform,out){if(out!==null)
{out.push([transform,this]);}},getVolume:function(min,max,invalidate){return this._cf.geometry.node.getVolume(min,max,invalidate);},getCenter:function(){return this._cf.geometry.node.getCenter();},doIntersect:function(line){return this._cf.geometry.node.doIntersect(line);},isSolid:function(){return this._cf.geometry.node._vf.solid;},isCCW:function(){return this._cf.geometry.node._vf.ccw;}}));x3dom.nodeTypes.Shape.objectID=0;x3dom.nodeTypes.Shape.idMap={nodeID:{},remove:function(obj){for(var prop in this.nodeID){if(this.nodeID.hasOwnProperty(prop)){var val=this.nodeID[prop];if(val._objectID&&obj._objectID&&val._objectID===obj._objectID)
{delete this.nodeID[prop];x3dom.debug.logInfo("Unreg "+val._objectID);}}}}};x3dom.registerNodeType("X3DGroupingNode","Grouping",defineClass(x3dom.nodeTypes.X3DChildNode,function(ctx){x3dom.nodeTypes.X3DGroupingNode.superClass.call(this,ctx);this.addField_SFBool(ctx,'render',true);this.addField_MFNode('children',x3dom.nodeTypes.X3DChildNode);},{collectDrawableObjects:function(transform,out)
{if(!this._vf.render){return;}
for(var i=0;i<this._childNodes.length;i++){if(this._childNodes[i]){var childTransform=this._childNodes[i].transformMatrix(transform);this._childNodes[i].collectDrawableObjects(childTransform,out);}}}}));x3dom.registerNodeType("Switch","Grouping",defineClass(x3dom.nodeTypes.X3DGroupingNode,function(ctx){x3dom.nodeTypes.Switch.superClass.call(this,ctx);this.addField_SFInt32(ctx,'whichChoice',-1);},{getVolume:function(min,max,invalidate)
{if(this._vf.whichChoice<0||this._vf.whichChoice>=this._childNodes.length){return false;}
if(this._childNodes[this._vf.whichChoice]){return this._childNodes[this._vf.whichChoice].getVolume(min,max,invalidate);}
return false;},find:function(type)
{if(this._vf.whichChoice<0||this._vf.whichChoice>=this._childNodes.length){return null;}
if(this._childNodes[this._vf.whichChoice]){if(this._childNodes[this._vf.whichChoice].constructor==type){return this._childNodes[this._vf.whichChoice];}
var c=this._childNodes[this._vf.whichChoice].find(type);if(c){return c;}}
return null;},findAll:function(type)
{if(this._vf.whichChoice<0||this._vf.whichChoice>=this._childNodes.length){return[];}
var found=[];if(this._childNodes[this._vf.whichChoice]){if(this._childNodes[this._vf.whichChoice].constructor==type){found.push(this._childNodes[this._vf.whichChoice]);}
found=found.concat(this._childNodes[this._vf.whichChoice].findAll(type));}
return found;},collectDrawableObjects:function(transform,out)
{if(this._vf.whichChoice<0||this._vf.whichChoice>=this._childNodes.length){return;}
if(this._childNodes[this._vf.whichChoice]){var childTransform=this._childNodes[this._vf.whichChoice].transformMatrix(transform);this._childNodes[this._vf.whichChoice].collectDrawableObjects(childTransform,out);}},doIntersect:function(line)
{if(this._vf.whichChoice<0||this._vf.whichChoice>=this._childNodes.length){return false;}
if(this._childNodes[this._vf.whichChoice]){return this._childNodes[this._vf.whichChoice].doIntersect(line);}
return false;}}));x3dom.registerNodeType("X3DTransformNode","Grouping",defineClass(x3dom.nodeTypes.X3DGroupingNode,function(ctx){x3dom.nodeTypes.X3DTransformNode.superClass.call(this,ctx);ctx.doc._nodeBag.trans.push(this);this._trafo=null;},{tick:function(t){var trans=x3dom.getStyle(this._xmlNode,"-webkit-transform");if(trans&&(trans!='none')){this._trafo.setValueByStr(trans);return true;}
return false;},transformMatrix:function(transform){return transform.mult(this._trafo);},getVolume:function(min,max,invalidate)
{var nMin=x3dom.fields.SFVec3f.MAX();var nMax=x3dom.fields.SFVec3f.MIN();var valid=false;for(var i=0,n=this._childNodes.length;i<n;i++)
{if(this._childNodes[i])
{var childMin=x3dom.fields.SFVec3f.MAX();var childMax=x3dom.fields.SFVec3f.MIN();valid=this._childNodes[i].getVolume(childMin,childMax,invalidate)||valid;if(valid)
{if(nMin.x>childMin.x)nMin.x=childMin.x;if(nMin.y>childMin.y)nMin.y=childMin.y;if(nMin.z>childMin.z)nMin.z=childMin.z;if(nMax.x<childMax.x)nMax.x=childMax.x;if(nMax.y<childMax.y)nMax.y=childMax.y;if(nMax.z<childMax.z)nMax.z=childMax.z;}}}
if(valid)
{nMin=this._trafo.multMatrixPnt(nMin);nMax=this._trafo.multMatrixPnt(nMax);min.x=nMin.x<nMax.x?nMin.x:nMax.x;min.y=nMin.y<nMax.y?nMin.y:nMax.y;min.z=nMin.z<nMax.z?nMin.z:nMax.z;max.x=nMax.x>nMin.x?nMax.x:nMin.x;max.y=nMax.y>nMin.y?nMax.y:nMin.y;max.z=nMax.z>nMin.z?nMax.z:nMin.z;}
return valid;},doIntersect:function(line)
{var isect=false;var mat=this._trafo.inverse();var tmpPos=new x3dom.fields.SFVec3f(line.pos.x,line.pos.y,line.pos.z);var tmpDir=new x3dom.fields.SFVec3f(line.dir.x,line.dir.y,line.dir.z);line.pos=mat.multMatrixPnt(line.pos);line.dir=mat.multMatrixVec(line.dir);if(line.hitObject){line.dist*=line.dir.length();}
for(var i=0;i<this._childNodes.length;i++)
{if(this._childNodes[i]){isect=this._childNodes[i].doIntersect(line)||isect;}}
line.pos.setValues(tmpPos);line.dir.setValues(tmpDir);if(isect){line.hitPoint=this._trafo.multMatrixPnt(line.hitPoint);line.dist*=line.dir.length();}
return isect;},parentRemoved:function(parent)
{if(this._parentNodes.length===0){var doc=this.findX3DDoc();for(var i=0,n=doc._nodeBag.trans.length;i<n;i++){if(doc._nodeBag.trans[i]===this){doc._nodeBag.trans.splice(i,1);}}}
for(var i=0,n=this._childNodes.length;i<n;i++){if(this._childNodes[i]){this._childNodes[i].parentRemoved(this);}}}}));x3dom.registerNodeType("Transform","Grouping",defineClass(x3dom.nodeTypes.X3DTransformNode,function(ctx){x3dom.nodeTypes.Transform.superClass.call(this,ctx);this.addField_SFVec3f(ctx,'center',0,0,0);this.addField_SFVec3f(ctx,'translation',0,0,0);this.addField_SFRotation(ctx,'rotation',0,0,1,0);this.addField_SFVec3f(ctx,'scale',1,1,1);this.addField_SFRotation(ctx,'scaleOrientation',0,0,1,0);this._trafo=x3dom.fields.SFMatrix4f.translation(this._vf.translation.add(this._vf.center)).mult(this._vf.rotation.toMatrix()).mult(this._vf.scaleOrientation.toMatrix()).mult(x3dom.fields.SFMatrix4f.scale(this._vf.scale)).mult(this._vf.scaleOrientation.toMatrix().inverse()).mult(x3dom.fields.SFMatrix4f.translation(this._vf.center.negate()));},{fieldChanged:function(fieldName){this._trafo=x3dom.fields.SFMatrix4f.translation(this._vf.translation.add(this._vf.center)).mult(this._vf.rotation.toMatrix()).mult(this._vf.scaleOrientation.toMatrix()).mult(x3dom.fields.SFMatrix4f.scale(this._vf.scale)).mult(this._vf.scaleOrientation.toMatrix().inverse()).mult(x3dom.fields.SFMatrix4f.translation(this._vf.center.negate()));}}));x3dom.registerNodeType("MatrixTransform","Grouping",defineClass(x3dom.nodeTypes.X3DTransformNode,function(ctx){x3dom.nodeTypes.MatrixTransform.superClass.call(this,ctx);this.addField_SFMatrix4f(ctx,'matrix',1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);this._trafo=this._vf.matrix;},{}));x3dom.registerNodeType("Group","Grouping",defineClass(x3dom.nodeTypes.X3DGroupingNode,function(ctx){x3dom.nodeTypes.Group.superClass.call(this,ctx);},{}));x3dom.registerNodeType("StaticGroup","Grouping",defineClass(x3dom.nodeTypes.X3DGroupingNode,function(ctx){x3dom.nodeTypes.StaticGroup.superClass.call(this,ctx);x3dom.debug.logWarning("StaticGroup NYI");}));x3dom.registerNodeType("Billboard","Navigation",defineClass(x3dom.nodeTypes.X3DGroupingNode,function(ctx){x3dom.nodeTypes.Billboard.superClass.call(this,ctx);this.addField_SFVec3f(ctx,'axisOfRotation',0,1,0);this._eye=new x3dom.fields.SFVec3f(0,0,0);this._eyeViewUp=new x3dom.fields.SFVec3f(0,0,0);this._viewAlignedMat=x3dom.fields.SFMatrix4f.identity();},{collectDrawableObjects:function(transform,out)
{if(!this._vf.render){return;}
var min=x3dom.fields.SFVec3f.MAX();var max=x3dom.fields.SFVec3f.MIN();var ok=this.getVolume(min,max,true);var rotMat=x3dom.fields.SFMatrix4f.identity();var mid=(max.add(min).multiply(0.5)).add(new x3dom.fields.SFVec3f(0,0,0));var billboard_to_viewer=this._eye.subtract(mid);if(this._vf.axisOfRotation.equals(new x3dom.fields.SFVec3f(0,0,0),x3dom.fields.Eps)){var rot1=x3dom.fields.Quaternion.rotateFromTo(billboard_to_viewer,new x3dom.fields.SFVec3f(0,0,1));rotMat=rot1.toMatrix().transpose();var yAxis=rotMat.multMatrixPnt(new x3dom.fields.SFVec3f(0,1,0)).normalize();if(!this._eyeViewUp.equals(new x3dom.fields.SFVec3f(0,0,0),x3dom.fields.Eps)){var rot2=x3dom.fields.Quaternion.rotateFromTo(this._eyeViewUp,yAxis);rotMat=rot2.toMatrix().transpose().mult(rotMat);}}
else{var normalPlane=this._vf.axisOfRotation.cross(billboard_to_viewer);normalPlane=normalPlane.normalize();if(this._eye.z<0)
normalPlane=normalPlane.multiply(-1);var degreesToRotate=Math.asin(normalPlane.dot(new x3dom.fields.SFVec3f(0,0,1)));if(this._eye.z<0)
degreesToRotate+=Math.PI;rotMat=x3dom.fields.SFMatrix4f.parseRotation(this._vf.axisOfRotation.x+", "+this._vf.axisOfRotation.y
+", "+this._vf.axisOfRotation.z+", "+degreesToRotate*(-1));}
for(var i=0;i<this._childNodes.length;i++){if(this._childNodes[i]){var childTransform=this._childNodes[i].transformMatrix(transform.mult(rotMat));this._childNodes[i].collectDrawableObjects(childTransform,out);}}
if(out!==null){out.Billboards.push([transform,this]);}}}));x3dom.registerNodeType("Collision","Navigation",defineClass(x3dom.nodeTypes.X3DGroupingNode,function(ctx){x3dom.nodeTypes.Collision.superClass.call(this,ctx);this.addField_SFBool(ctx,"enabled",true);this.addField_SFNode("proxy",x3dom.nodeTypes.X3DGroupingNode);},{collectDrawableObjects:function(transform,out)
{for(var i=0;i<this._childNodes.length;i++)
{if(this._childNodes[i]&&(this._childNodes[i]!==this._cf.proxy.node))
{var childTransform=this._childNodes[i].transformMatrix(transform);this._childNodes[i].collectDrawableObjects(childTransform,out);}}}}));x3dom.registerNodeType("LOD","Navigation",defineClass(x3dom.nodeTypes.X3DGroupingNode,function(ctx){x3dom.nodeTypes.LOD.superClass.call(this,ctx);this.addField_SFBool(ctx,"forceTransitions",false);this.addField_SFVec3f(ctx,'center',0,0,0);this.addField_MFFloat(ctx,"range",[]);this._eye=new x3dom.fields.SFVec3f(0,0,0);},{collectDrawableObjects:function(transform,out)
{var i=0,n=this._childNodes.length;var min=x3dom.fields.SFVec3f.MAX();var max=x3dom.fields.SFVec3f.MIN();var ok=this.getVolume(min,max,true);var mid=(max.add(min).multiply(0.5)).add(this._vf.center);var len=mid.subtract(this._eye).length();while(i<this._vf.range.length&&len>this._vf.range[i]){i++;}
if(i&&i>=n){i=n-1;}
if(n&&this._childNodes[i])
{var childTransform=this._childNodes[i].transformMatrix(transform);this._childNodes[i].collectDrawableObjects(childTransform,out);}
if(out!==null)
{out.LODs.push([transform,this]);}}}));x3dom.registerNodeType("X3DInterpolatorNode","Interpolation",defineClass(x3dom.nodeTypes.X3DChildNode,function(ctx){x3dom.nodeTypes.X3DInterpolatorNode.superClass.call(this,ctx);this.addField_MFFloat(ctx,'key',[]);this.addField_SFFloat(ctx,'set_fraction',0);},{linearInterp:function(t,interp){if(t<=this._vf.key[0])
return this._vf.keyValue[0];if(t>=this._vf.key[this._vf.key.length-1])
return this._vf.keyValue[this._vf.key.length-1];for(var i=0;i<this._vf.key.length-1;++i){if((this._vf.key[i]<t)&&(t<=this._vf.key[i+1])){return interp(this._vf.keyValue[i],this._vf.keyValue[i+1],(t-this._vf.key[i])/(this._vf.key[i+1]-this._vf.key[i]));}}
return this._vf.keyValue[0];}}));x3dom.registerNodeType("OrientationInterpolator","Interpolation",defineClass(x3dom.nodeTypes.X3DInterpolatorNode,function(ctx){x3dom.nodeTypes.OrientationInterpolator.superClass.call(this,ctx);if(ctx&&ctx.xmlNode.hasAttribute('keyValue'))
this._vf.keyValue=x3dom.fields.MFRotation.parse(ctx.xmlNode.getAttribute('keyValue'));else
this._vf.keyValue=new x3dom.fields.MFRotation();this._fieldWatchers.fraction=this._fieldWatchers.set_fraction=[function(msg){var value=this.linearInterp(msg,function(a,b,t){return a.slerp(b,t);});this.postMessage('value_changed',value);}];}));x3dom.registerNodeType("PositionInterpolator","Interpolation",defineClass(x3dom.nodeTypes.X3DInterpolatorNode,function(ctx){x3dom.nodeTypes.PositionInterpolator.superClass.call(this,ctx);if(ctx&&ctx.xmlNode.hasAttribute('keyValue'))
this._vf.keyValue=x3dom.fields.MFVec3f.parse(ctx.xmlNode.getAttribute('keyValue'));else
this._vf.keyValue=new x3dom.fields.MFVec3f();this._fieldWatchers.fraction=this._fieldWatchers.set_fraction=[function(msg){var value=this.linearInterp(msg,function(a,b,t){return a.multiply(1.0-t).add(b.multiply(t));});this.postMessage('value_changed',value);}];}));x3dom.registerNodeType("NormalInterpolator","Interpolation",defineClass(x3dom.nodeTypes.X3DInterpolatorNode,function(ctx){x3dom.nodeTypes.NormalInterpolator.superClass.call(this,ctx);if(ctx&&ctx.xmlNode.hasAttribute('keyValue'))
this._vf.keyValue=x3dom.fields.MFVec3f.parse(ctx.xmlNode.getAttribute('keyValue'));else
this._vf.keyValue=new x3dom.fields.MFVec3f();this._fieldWatchers.fraction=this._fieldWatchers.set_fraction=[function(msg){var value=this.linearInterp(msg,function(a,b,t){return a.multiply(1.0-t).add(b.multiply(t)).normalize();});this.postMessage('value_changed',value);}];}));x3dom.registerNodeType("ColorInterpolator","Interpolation",defineClass(x3dom.nodeTypes.X3DInterpolatorNode,function(ctx){x3dom.nodeTypes.ColorInterpolator.superClass.call(this,ctx);if(ctx&&ctx.xmlNode.hasAttribute('keyValue'))
this._vf.keyValue=x3dom.fields.MFColor.parse(ctx.xmlNode.getAttribute('keyValue'));else
this._vf.keyValue=new x3dom.fields.MFColor();this._fieldWatchers.fraction=this._fieldWatchers.set_fraction=[function(msg){var value=this.linearInterp(msg,function(a,b,t){return a.multiply(1.0-t).add(b.multiply(t));});this.postMessage('value_changed',value);}];}));x3dom.registerNodeType("ScalarInterpolator","Interpolation",defineClass(x3dom.nodeTypes.X3DInterpolatorNode,function(ctx){x3dom.nodeTypes.ScalarInterpolator.superClass.call(this,ctx);if(ctx&&ctx.xmlNode.hasAttribute('keyValue'))
this._vf.keyValue=Array.map(ctx.xmlNode.getAttribute('keyValue').split(/\s+/),function(n){return+n;});else
this._vf.keyValue=new x3dom.fields.MFFloat();this._fieldWatchers.fraction=this._fieldWatchers.set_fraction=[function(msg){var value=this.linearInterp(msg,function(a,b,t){return(1.0-t)*a+t*b;});this.postMessage('value_changed',value);}];}));x3dom.registerNodeType("CoordinateInterpolator","Interpolation",defineClass(x3dom.nodeTypes.X3DInterpolatorNode,function(ctx){x3dom.nodeTypes.CoordinateInterpolator.superClass.call(this,ctx);this._vf.keyValue=[];if(ctx&&ctx.xmlNode.hasAttribute('keyValue')){var arr=x3dom.fields.MFVec3f.parse(ctx.xmlNode.getAttribute('keyValue'));var key=this._vf.key.length>0?this._vf.key.length:1;var len=arr.length/key;for(var i=0;i<key;i++){var val=new x3dom.fields.MFVec3f();for(var j=0;j<len;j++){val.push(arr[i*len+j]);}
this._vf.keyValue.push(val);}}
this._fieldWatchers.fraction=this._fieldWatchers.set_fraction=[function(msg){var value=this.linearInterp(msg,function(a,b,t){var val=new x3dom.fields.MFVec3f();for(var i=0;i<a.length;i++){val.push(a[i].multiply(1.0-t).add(b[i].multiply(t)));}
return val;});this.postMessage('value_changed',value);}];}));x3dom.registerNodeType("X3DSensorNode","Core",defineClass(x3dom.nodeTypes.X3DChildNode,function(ctx){x3dom.nodeTypes.X3DSensorNode.superClass.call(this,ctx);}));x3dom.registerNodeType("TimeSensor","Time",defineClass(x3dom.nodeTypes.X3DSensorNode,function(ctx){x3dom.nodeTypes.TimeSensor.superClass.call(this,ctx);ctx.doc._nodeBag.timer.push(this);this.addField_SFTime(ctx,'cycleInterval',1);this.addField_SFBool(ctx,'enabled',true);this.addField_SFBool(ctx,'loop',false);this.addField_SFTime(ctx,'startTime',0);this.addField_SFTime(ctx,'stopTime',0);this.addField_SFTime(ctx,'cycleTime',0);this.addField_SFFloat(ctx,'fraction_changed',0);this.addField_SFBool(ctx,'isActive',false);this.addField_SFTime(ctx,'time',0);this._prevCycle=-1;},{onframe:function(ts)
{if(!this._vf.enabled)
return;var isActive=(ts>=this._vf.startTime);var cycleFrac,cycle,fraction;if(isActive&&this._vf.cycleInterval>0){cycleFrac=(ts-this._vf.startTime)/this._vf.cycleInterval;cycle=Math.floor(cycleFrac);fraction=cycleFrac-cycle;if(fraction<x3dom.fields.Eps){if(ts>this._vf.startTime)
fraction=1.0;}}
if(isActive){if(!this._vf.isActive)
this.postMessage('isActive',true);this.postMessage('fraction_changed',fraction);this.postMessage('time',ts);if(this._prevCycle!=cycle){this._prevCycle=cycle;this.postMessage('cycleTime',ts);}}},fieldChanged:function(fieldName)
{if(fieldName=="enabled"){if(!this._vf.enabled&&this._vf.isActive)
this.postMessage('isActive',false);}},parentRemoved:function(parent)
{if(this._parentNodes.length===0){var doc=this.findX3DDoc();for(var i=0,n=doc._nodeBag.timer.length;i<n;i++){if(doc._nodeBag.timer[i]===this){doc._nodeBag.timer.splice(i,1);}}}}}));x3dom.registerNodeType("Scene","Core",defineClass(x3dom.nodeTypes.X3DGroupingNode,function(ctx){x3dom.nodeTypes.Scene.superClass.call(this,ctx);this.addField_SFString(ctx,'pickMode',"idBuf");},{}));x3dom.registerNodeType("Anchor","Networking",defineClass(x3dom.nodeTypes.X3DGroupingNode,function(ctx){x3dom.nodeTypes.Anchor.superClass.call(this,ctx);this.addField_MFString(ctx,'url',[]);},{doIntersect:function(line){var isect=false;for(var i=0;i<this._childNodes.length;i++){if(this._childNodes[i]){isect=this._childNodes[i].doIntersect(line)||isect;}}
return isect;},handleTouch:function(){window.location=this._nameSpace.getURL(this._vf.url[0]);}}));x3dom.registerNodeType("Inline","Networking",defineClass(x3dom.nodeTypes.X3DGroupingNode,function(ctx){x3dom.nodeTypes.Inline.superClass.call(this,ctx);this.addField_MFString(ctx,'url',[]);this.addField_SFBool(ctx,'load',true);},{fieldChanged:function(fieldName)
{if(fieldName=="url"){this.nodeChanged();}},nodeChanged:function()
{var that=this;var xhr=new XMLHttpRequest();xhr.overrideMimeType('text/xml');this._nameSpace.doc.downloadCount+=1;xhr.onreadystatechange=function(){if(xhr.readyState==4){if(xhr.responseXML.documentElement.localName=='parsererror'){x3dom.debug.logError('XML parser failed on '+this._vf.url+':\n'+xhr.responseXML.documentElement.textContent);return;}}
else{return;}
if(xhr.status!==200){x3dom.debug.logError('XMLHttpRequest requires a web server running!');return;}
x3dom.debug.logInfo('Inline: downloading '+that._vf.url+' done.');var xml=xhr.responseXML;var inlScene=xml.getElementsByTagName('Scene')[0]||xml.getElementsByTagName('scene')[0];if(inlScene){var nameSpace=new x3dom.NodeNameSpace("",that._nameSpace.doc);nameSpace.setBaseURL(that._vf.url[0]);var newScene=nameSpace.setupTree(inlScene);}
else{x3dom.debug.logWarning('no Scene in '+xml.localName);}
while(that._childNodes.length!==0){that.removeChild(that._childNodes[0]);}
that.addChild(newScene);that._nameSpace.doc.downloadCount-=1;that._nameSpace.doc.needRender=true;x3dom.debug.logInfo('Inline: added '+that._vf.url+' to scene.');};xhr.open('GET',this._nameSpace.getURL(this._vf.url[0]),true);xhr.send(null);}}));x3dom.Viewarea=function(document,scene){this._doc=document;this._scene=scene;document._nodeBag.viewarea.push(this);this._pickingInfo={pickPos:{},pickObj:null,lastObj:null,lastClickObj:null};this._rotMat=x3dom.fields.SFMatrix4f.identity();this._transMat=x3dom.fields.SFMatrix4f.identity();this._movement=new x3dom.fields.SFVec3f(0,0,0);this._needNavigationMatrixUpdate=true;this._width=400;this._height=300;this._dx=0;this._dy=0;this._lastX=-1;this._lastY=-1;this._pressX=-1;this._pressY=-1;this._lastButton=0;this._pick=new x3dom.fields.SFVec3f(0,0,0);this._lastTS=0;this._mixer=new x3dom.MatrixMixer();};x3dom.Viewarea.prototype.tick=function(timeStamp)
{var needMixAnim=false;if(this._mixer._beginTime>0)
{needMixAnim=true;if(timeStamp>=this._mixer._beginTime)
{if(timeStamp<=this._mixer._endTime)
{var mat=this._mixer.mix(timeStamp);this._scene.getViewpoint().setView(mat);}
else{this._mixer._beginTime=0;this._mixer._endTime=0;this._scene.getViewpoint().setView(this._mixer._endMat);}}
else{this._scene.getViewpoint().setView(this._mixer._beginMat);}}
var needNavAnim=this.navigateTo(timeStamp);this._lastTS=timeStamp;return(needMixAnim||needNavAnim);};x3dom.Viewarea.prototype.navigateTo=function(timeStamp)
{var navi=this._scene.getNavigationInfo();var needNavAnim=(this._lastButton>0&&(navi._vf.type[0].toLowerCase()==="fly"||navi._vf.type[0].toLowerCase()==="walk"));if(needNavAnim)
{var avatarRadius=0.25;var avatarHeight=1.6;var avatarKnee=0.75;if(navi._vf.avatarSize.length>2){avatarRadius=navi._vf.avatarSize[0];avatarHeight=navi._vf.avatarSize[1];avatarKnee=navi._vf.avatarSize[2];}
var currViewMat=this.getViewMatrix();var deltaT=timeStamp-this._lastTS;var step=(this._lastButton&2)?1:-1;step*=(deltaT*navi._vf.speed);var phi=Math.PI*deltaT*(this._pressX-this._lastX)/this._width;var theta=Math.PI*deltaT*(this._pressY-this._lastY)/this._height;if(this._needNavigationMatrixUpdate==true)
{this._needNavigationMatrixUpdate=false;this._flyMat=new x3dom.fields.SFMatrix4f();this._flyMat.setValues(currViewMat);this._rotMat=x3dom.fields.SFMatrix4f.identity();this._transMat=x3dom.fields.SFMatrix4f.identity();this._movement=new x3dom.fields.SFVec3f(0,0,0);this._flyMat=this._flyMat.inverse();this._flyMat._30=0;this._flyMat._31=0;this._flyMat._32=0;this._flyMat._33=1;this._from=this._flyMat.e3();this._at=this._from.subtract(this._flyMat.e2());this._up=new x3dom.fields.SFVec3f(0,1,0);}
var q=x3dom.fields.Quaternion.axisAngle(this._up,phi);var temp=q.toMatrix();var fin=x3dom.fields.SFMatrix4f.translation(this._from);fin=fin.mult(temp);temp=x3dom.fields.SFMatrix4f.translation(this._from.negate());fin=fin.mult(temp);this._at=fin.multMatrixPnt(this._at);var lv=this._at.subtract(this._from).normalize();var sv=lv.cross(this._up).normalize();var up=sv.cross(lv).normalize();q=x3dom.fields.Quaternion.axisAngle(sv,theta);temp=q.toMatrix();fin=x3dom.fields.SFMatrix4f.translation(this._from);fin=fin.mult(temp);temp=x3dom.fields.SFMatrix4f.translation(this._from.negate());fin=fin.mult(temp);this._at=fin.multMatrixPnt(this._at);this._scene._nameSpace.doc.ctx.pickValue(this,this._width/2,this._height/2);if(this._pickingInfo.pickObj)
{var dist=this._pickingInfo.pickPos.subtract(this._from).length();if(step<0&&dist<=avatarRadius){step=0;}}
lv=this._from.subtract(this._at).normalize().multiply(step);temp=x3dom.fields.SFMatrix4f.translation(lv);this._at=temp.multMatrixPnt(this._at);this._from=temp.multMatrixPnt(this._from);if(navi._vf.type[0].toLowerCase()==="walk")
{var tmpAt=this._from.addScaled(up,-1.0);var tmpUp=sv.cross(up.negate()).normalize();var tmpMat=x3dom.fields.SFMatrix4f.lookAt(this._from,tmpAt,tmpUp);tmpMat=tmpMat.inverse();this._scene._nameSpace.doc.ctx.pickValue(this,this._width/2,this._height/2,tmpMat,this.getProjectionMatrix().mult(tmpMat));if(this._pickingInfo.pickObj)
{var dist=this._pickingInfo.pickPos.subtract(this._from).length();this._at=this._at.add(up.multiply(avatarHeight-dist));this._from=this._from.add(up.multiply(avatarHeight-dist));}}
this._pickingInfo.pickObj=null;this._flyMat=x3dom.fields.SFMatrix4f.lookAt(this._from,this._at,up);temp=this._flyMat.inverse();temp._30=0;temp._31=0;temp._32=0;temp._33=1;this._scene.getViewpoint().setView(temp);}
return needNavAnim;};x3dom.Viewarea.prototype.animateTo=function(target,prev,dur)
{var navi=this._scene.getNavigationInfo();if(x3dom.isa(target,x3dom.nodeTypes.Viewpoint)){target=target._viewMatrix;}
if(navi._vf.transitionType[0].toLowerCase()!=="teleport")
{if(prev&&x3dom.isa(prev,x3dom.nodeTypes.Viewpoint)){prev=prev.getCurrentTransform().mult(prev.getViewMatrix()).mult(this._transMat).mult(this._rotMat);}
else{return;}
this._mixer._beginTime=this._lastTS;if(arguments.length>=3){this._mixer._endTime=this._lastTS+dur;}
else{this._mixer._endTime=this._lastTS+navi._vf.transitionTime;}
this._mixer.setBeginMatrix(prev);this._mixer.setEndMatrix(target);}
else
{this._scene.getViewpoint().setView(target);}
this._rotMat=x3dom.fields.SFMatrix4f.identity();this._transMat=x3dom.fields.SFMatrix4f.identity();this._movement=new x3dom.fields.SFVec3f(0,0,0);}
x3dom.Viewarea.prototype.getLights=function()
{return this._doc._nodeBag.lights;};x3dom.Viewarea.prototype.getViewpointMatrix=function()
{var viewpoint=this._scene.getViewpoint();var mat_viewpoint=viewpoint.getCurrentTransform();return mat_viewpoint.mult(viewpoint.getViewMatrix());};x3dom.Viewarea.prototype.getViewMatrix=function()
{return this.getViewpointMatrix().mult(this._transMat).mult(this._rotMat);};x3dom.Viewarea.prototype.getLightMatrix=function()
{var lights=this._doc._nodeBag.lights;var i,n=lights.length;if(n>0)
{var min=x3dom.fields.SFVec3f.MAX();var max=x3dom.fields.SFVec3f.MIN();var ok=this._scene.getVolume(min,max,true);if(ok)
{var l_arr=[];var viewpoint=this._scene.getViewpoint();var fov=viewpoint.getFieldOfView();var dia=max.subtract(min);var dist1=(dia.y/2.0)/Math.tan(fov/2.0)+(dia.z/2.0);var dist2=(dia.x/2.0)/Math.tan(fov/2.0)+(dia.z/2.0);dia=min.add(dia.multiply(0.5));for(i=0;i<n;i++)
{if(x3dom.isa(lights[i],x3dom.nodeTypes.PointLight)){dia=dia.subtract(lights[i]._vf.location).normalize();}
else{var dir=lights[i]._vf.direction.normalize().negate();dia=dia.add(dir.multiply(1.2*(dist1>dist2?dist1:dist2)));}
l_arr[i]=lights[i].getViewMatrix(dia);}
return l_arr;}}
return[this.getViewMatrix()];};x3dom.Viewarea.prototype.getWCtoLCMatrix=function(lMat)
{var proj=this.getProjectionMatrix();var view;if(arguments.length===0){view=this.getLightMatrix()[0];}
else{view=lMat;}
return proj.mult(view);};x3dom.Viewarea.prototype.getProjectionMatrix=function()
{var viewpoint=this._scene.getViewpoint();return viewpoint.getProjectionMatrix(this._width/this._height);};x3dom.Viewarea.prototype.getWCtoCCMatrix=function()
{var view=this.getViewMatrix();var proj=this.getProjectionMatrix();return proj.mult(view);};x3dom.Viewarea.prototype.getCCtoWCMatrix=function()
{var mat=this.getWCtoCCMatrix();return mat.inverse();};x3dom.Viewarea.prototype.calcViewRay=function(x,y)
{var cctowc=this.getCCtoWCMatrix();var rx=x/(this._width-1.0)*2.0-1.0;var ry=(this._height-1.0-y)/(this._height-1.0)*2.0-1.0;var from=cctowc.multFullMatrixPnt(new x3dom.fields.SFVec3f(rx,ry,-1));var at=cctowc.multFullMatrixPnt(new x3dom.fields.SFVec3f(rx,ry,1));var dir=at.subtract(from);return new x3dom.fields.Line(from,dir);};x3dom.Viewarea.prototype.showAll=function()
{var min=x3dom.fields.SFVec3f.MAX();var max=x3dom.fields.SFVec3f.MIN();var ok=this._scene.getVolume(min,max,true);if(ok)
{var viewpoint=this._scene.getViewpoint();var fov=viewpoint.getFieldOfView();var dia=max.subtract(min);var dist1=(dia.y/2.0)/Math.tan(fov/2.0)+(dia.z/2.0);var dist2=(dia.x/2.0)/Math.tan(fov/2.0)+(dia.z/2.0);dia=min.add(dia.multiply(0.5));dia.z+=(dist1>dist2?dist1:dist2);this.animateTo(x3dom.fields.SFMatrix4f.translation(dia.multiply(-1)),viewpoint);}};x3dom.Viewarea.prototype.resetView=function()
{var navi=this._scene.getNavigationInfo();if(navi._vf.transitionType[0].toLowerCase()!=="teleport")
{this._mixer._beginTime=this._lastTS;this._mixer._endTime=this._lastTS+navi._vf.transitionTime;this._mixer.setBeginMatrix(this.getViewMatrix());this._scene.getViewpoint().resetView();this._mixer.setEndMatrix(this._scene.getViewpoint()._viewMatrix);}
else
{this._scene.getViewpoint().resetView();}
this._rotMat=x3dom.fields.SFMatrix4f.identity();this._transMat=x3dom.fields.SFMatrix4f.identity();this._movement=new x3dom.fields.SFVec3f(0,0,0);};x3dom.Viewarea.prototype.uprightView=function()
{var mat=new x3dom.fields.SFMatrix4f();mat.setValues(this.getViewMatrix());mat=mat.inverse();var from=mat.e3();var at=from.subtract(mat.e2());var up=new x3dom.fields.SFVec3f(0,1,0);var v=from.subtract(at);var len=v.length();v=v.divide(len);var s=v.cross(up).normalize();v=s.cross(up).normalize();at=from.addScaled(v,len);mat=x3dom.fields.SFMatrix4f.lookAt(from,at,up);mat=mat.inverse();this.animateTo(mat,this._scene.getViewpoint());};x3dom.Viewarea.prototype.callEvtHandler=function(node,eventType,event)
{event.target=node._xmlNode;var attrib=node._xmlNode[eventType];try{if(typeof(attrib)==="function"){attrib.call(node._xmlNode,event);}
else{var funcStr=node._xmlNode.getAttribute(eventType);var func=new Function('event',funcStr);func.call(node._xmlNode,event);}
var list=node._listeners[event.type];if(list){for(var it=0;it<list.length;it++){list[it].call(node._xmlNode,event);}}}
catch(ex){x3dom.debug.logException(ex);}
return event.cancelBubble;};x3dom.Viewarea.prototype.checkEvents=function(obj,x,y,buttonState,eventType)
{var that=this;var needRecurse=true;var event={target:{},type:eventType.substr(2,eventType.length-2),button:buttonState,layerX:x,layerY:y,worldX:that._pick.x,worldY:that._pick.y,worldZ:that._pick.z,hitPnt:that._pick.toGL(),cancelBubble:false,stopPropagation:function(){this.cancelBubble=true;}};try{var anObj=obj;if(!anObj._xmlNode[eventType]&&!anObj._xmlNode.hasAttribute(eventType)&&!anObj._listeners[event.type]){anObj=anObj._cf.geometry.node;}
if(that.callEvtHandler(anObj,eventType,event)===true){needRecurse=false;}}
catch(e){x3dom.debug.logException(e);}
var recurse=function(obj){Array.forEach(obj._parentNodes,function(node){if(node._xmlNode&&(node._xmlNode[eventType]||node._xmlNode.hasAttribute(eventType)||node._listeners[event.type]))
{if(that.callEvtHandler(node,eventType,event)===true){needRecurse=false;}}
if(x3dom.isa(node,x3dom.nodeTypes.Anchor)&&eventType==='onclick'){node.handleTouch();needRecurse=false;}
else if(needRecurse){recurse(node);}});};if(needRecurse){recurse(obj);}};x3dom.Viewarea.prototype.onMousePress=function(x,y,buttonState)
{this._needNavigationMatrixUpdate=true;this.prepareEvents(x,y,buttonState,"onmousedown");this._pickingInfo.lastClickObj=this._pickingInfo.pickObj;this._dx=0;this._dy=0;this._lastX=x;this._lastY=y;this._pressX=x;this._pressY=y;this._lastButton=buttonState;};x3dom.Viewarea.prototype.onMouseRelease=function(x,y,buttonState)
{if(this._scene._vf.pickMode.toLowerCase()!=="box")
{this.prepareEvents(x,y,buttonState,"onmouseup");if(this._pickingInfo.pickObj&&this._pickingInfo.pickObj===this._pickingInfo.lastClickObj){this.prepareEvents(x,y,buttonState,"onclick");}}
else
{var t0=new Date().getTime();var line=this.calcViewRay(x,y);var isect=this._scene.doIntersect(line);var obj=line.hitObject;if(isect&&obj)
{this._pick.setValues(line.hitPoint);this.checkEvents(obj,x,y,buttonState,"onclick");x3dom.debug.logInfo("Hit \""+obj._xmlNode.localName+"/ "+
obj._DEF+"\ at dist="+line.dist.toFixed(4));x3dom.debug.logInfo("Ray hit at position "+this._pick);}
var t1=new Date().getTime()-t0;x3dom.debug.logInfo("Picking time (box): "+t1+"ms");if(!isect)
{var dir=this.getViewMatrix().e2().negate();var u=dir.dot(line.pos.negate())/dir.dot(line.dir);this._pick=line.pos.add(line.dir.multiply(u));}}
var navi=this._scene.getNavigationInfo();if(this._pickingInfo.pickObj&&navi._vf.type[0].toLowerCase()==="lookat")
{var step=(this._lastButton&2)?-1:1;var dist=0.25;if(navi._vf.avatarSize.length>=1){dist=navi._vf.avatarSize[0];}
dist*=2;var laMat=new x3dom.fields.SFMatrix4f();laMat.setValues(this.getViewMatrix());laMat=laMat.inverse();var from=laMat.e3();var at=from.subtract(laMat.e2());var up=laMat.e1();var dir=this._pickingInfo.pickPos.subtract(from);var len=dir.length();dir=dir.normalize();var newUp=new x3dom.fields.SFVec3f(0,1,0);var newAt=from.addScaled(dir,len);var s=dir.cross(newUp).normalize();dir=s.cross(newUp).normalize();if(step<0){dist=(0.5+len+dist)*2;}
var newFrom=newAt.addScaled(dir,dist);laMat=x3dom.fields.SFMatrix4f.lookAt(newFrom,newAt,newUp);laMat=laMat.inverse();dist=newFrom.subtract(from).length();var dur=Math.log(dist/navi._vf.speed);this.animateTo(laMat,this._scene.getViewpoint(),dur);}
this._dx=0;this._dy=0;this._lastX=x;this._lastY=y;this._lastButton=buttonState;};x3dom.Viewarea.prototype.onMouseOver=function(x,y,buttonState)
{this._dx=0;this._dy=0;this._lastButton=0;this._lastX=x;this._lastY=y;};x3dom.Viewarea.prototype.onMouseOut=function(x,y,buttonState)
{this._dx=0;this._dy=0;this._lastButton=0;this._lastX=x;this._lastY=y;};x3dom.Viewarea.prototype.onDoubleClick=function(x,y)
{var navi=this._scene.getNavigationInfo();if(navi._vf.type[0].length<=1||navi._vf.type[0].toLowerCase()=="none")
return;if((this._scene._vf.pickMode.toLowerCase()==="color"||this._scene._vf.pickMode.toLowerCase()==="texcoord"))
return;var viewpoint=this._scene.getViewpoint();viewpoint._vf.centerOfRotation.setValues(this._pick);x3dom.debug.logInfo("New center of Rotation:  "+this._pick);};x3dom.Viewarea.prototype.handleMoveEvt=function(x,y,buttonState)
{this.prepareEvents(x,y,buttonState,"onmousemove");if(this._pickingInfo.pickObj!==this._pickingInfo.lastObj)
{if(this._pickingInfo.lastObj){var obj=this._pickingInfo.pickObj;this._pickingInfo.pickObj=this._pickingInfo.lastObj;this.prepareEvents(x,y,buttonState,"onmouseout");this._pickingInfo.pickObj=obj;}
if(this._pickingInfo.pickObj){this.prepareEvents(x,y,buttonState,"onmouseover");}
this._pickingInfo.lastObj=this._pickingInfo.pickObj;}};x3dom.Viewarea.prototype.onMove=function(x,y,buttonState)
{this.handleMoveEvt(x,y,buttonState);this._lastX=x;this._lastY=y;};x3dom.Viewarea.prototype.onDrag=function(x,y,buttonState)
{this.handleMoveEvt(x,y,buttonState);var navi=this._scene.getNavigationInfo();if(navi._vf.type[0].length<=1||navi._vf.type[0].toLowerCase()==="none")
return;var dx=x-this._lastX;var dy=y-this._lastY;var min,max,ok,d,vec;var viewpoint=this._scene.getViewpoint();if(navi._vf.type[0].toLowerCase()==="examine")
{if(buttonState&1)
{var alpha=(dy*2*Math.PI)/this._width;var beta=(dx*2*Math.PI)/this._height;var mat=this.getViewMatrix();var mx=x3dom.fields.SFMatrix4f.rotationX(alpha);var my=x3dom.fields.SFMatrix4f.rotationY(beta);var center=viewpoint.getCenterOfRotation();mat.setTranslate(new x3dom.fields.SFVec3f(0,0,0));this._rotMat=this._rotMat.mult(x3dom.fields.SFMatrix4f.translation(center)).mult(mat.inverse()).mult(mx).mult(my).mult(mat).mult(x3dom.fields.SFMatrix4f.translation(center.negate()));}
if(buttonState&4)
{min=x3dom.fields.SFVec3f.MAX();max=x3dom.fields.SFVec3f.MIN();ok=this._scene.getVolume(min,max,true);d=ok?(max.subtract(min)).length():10;d=(d<x3dom.fields.Eps)?1:d;vec=new x3dom.fields.SFVec3f(d*dx/this._width,d*(-dy)/this._height,0);this._movement=this._movement.add(vec);this._transMat=viewpoint.getViewMatrix().inverse().mult(x3dom.fields.SFMatrix4f.translation(this._movement)).mult(viewpoint.getViewMatrix());}
if(buttonState&2)
{min=x3dom.fields.SFVec3f.MAX();max=x3dom.fields.SFVec3f.MIN();ok=this._scene.getVolume(min,max,true);d=ok?(max.subtract(min)).length():10;d=(d<x3dom.fields.Eps)?1:d;vec=new x3dom.fields.SFVec3f(0,0,d*(dx+dy)/this._height);this._movement=this._movement.add(vec);this._transMat=viewpoint.getViewMatrix().inverse().mult(x3dom.fields.SFMatrix4f.translation(this._movement)).mult(viewpoint.getViewMatrix());}}
this._dx=dx;this._dy=dy;this._lastX=x;this._lastY=y;};x3dom.Viewarea.prototype.prepareEvents=function(x,y,buttonState,eventType)
{var avoidTraversal=(this._scene._vf.pickMode.toLowerCase()==="idbuf"||this._scene._vf.pickMode.toLowerCase()==="color"||this._scene._vf.pickMode.toLowerCase()==="texcoord");if(avoidTraversal){var obj=this._pickingInfo.pickObj;if(obj){this._pick.setValues(this._pickingInfo.pickPos);this.checkEvents(obj,x,y,buttonState,eventType);if(eventType==="onclick"){x3dom.debug.logInfo("Hit \""+obj._xmlNode.localName+"/ "+obj._DEF+"\"");x3dom.debug.logInfo("Ray hit at position "+this._pick);}}}};x3dom.X3DDocument=function(canvas,ctx){this.canvas=canvas;this.ctx=ctx;this.needRender=true;this._scene=null;this._viewarea=null;this._nodeBag={timer:[],lights:[],clipPlanes:[],followers:[],trans:[],renderTextures:[],viewarea:[]};this.downloadCount=0;this.onload=function(){};this.onerror=function(){};};x3dom.X3DDocument.prototype.load=function(uri,sceneElemPos){var uri_docs={};var queued_uris=[uri];var doc=this;function next_step(){if(queued_uris.length==0){doc._setup(uri_docs[uri],uri_docs,sceneElemPos);doc.onload();return;}
var next_uri=queued_uris.shift();if(x3dom.isX3DElement(next_uri)&&(next_uri.localName.toLowerCase()==='x3d'||next_uri.localName.toLowerCase()==='websg'))
{uri_docs[next_uri]=next_uri;next_step();}}
next_step();};x3dom.findScene=function(x3dElem){var sceneElems=[];for(var i=0;i<x3dElem.childNodes.length;i++){var sceneElem=x3dElem.childNodes[i];if(sceneElem&&sceneElem.localName&&sceneElem.localName.toLowerCase()==="scene"){sceneElems.push(sceneElem);}}
if(sceneElems.length>1){x3dom.debug.logError("X3D element has more than one Scene child (has "+
x3dElem.childNodes.length+").");}
else{return sceneElems[0];}
return null;};x3dom.X3DDocument.prototype._setup=function(sceneDoc,uriDocs,sceneElemPos){var doc=this;var domEventListener={onAttrModified:function(e){if('_x3domNode'in e.target){var attrToString={1:"MODIFICATION",2:"ADDITION",3:"REMOVAL"};e.target._x3domNode.updateField(e.attrName,e.newValue);doc.needRender=true;}},onNodeRemoved:function(e){if('_x3domNode'in e.target.parentNode&&'_x3domNode'in e.target){var parent=e.target.parentNode._x3domNode;var child=e.target._x3domNode;if(parent){parent.removeChild(child);doc.needRender=true;}}},onNodeInserted:function(e){if('_x3domNode'in e.target.parentNode){var parent=e.target.parentNode._x3domNode;var child=e.target;if(parent._nameSpace){var newNode=parent._nameSpace.setupTree(child);parent.addChild(newNode,child.getAttribute("containerField"));doc.needRender=true;}
else{x3dom.debug.logWarning("No _nameSpace in onNodeInserted");}}}};sceneDoc.addEventListener('DOMNodeRemoved',domEventListener.onNodeRemoved,true);sceneDoc.addEventListener('DOMNodeInserted',domEventListener.onNodeInserted,true);if((x3dom.userAgentFeature.supportsDOMAttrModified===true)){sceneDoc.addEventListener('DOMAttrModified',domEventListener.onAttrModified,true);}
var sceneElem=x3dom.findScene(sceneDoc);this._bindableBag=new x3dom.BindableBag(this);var nameSpace=new x3dom.NodeNameSpace("scene",doc);var scene=nameSpace.setupTree(sceneElem);this._scene=scene;this._bindableBag.setRefNode(scene);this._viewarea=new x3dom.Viewarea(this,scene);this._viewarea._width=this.canvas.width;this._viewarea._height=this.canvas.height;};x3dom.X3DDocument.prototype.advanceTime=function(t){var that;if(this._nodeBag.timer.length){this.needRender=true;Array.forEach(this._nodeBag.timer,function(node){node.onframe(t);});}
if(this._nodeBag.followers.length){that=this;Array.forEach(this._nodeBag.followers,function(node){that.needRender|=node.tick(t);});}
if(this._nodeBag.trans.length){that=this;Array.forEach(this._nodeBag.trans,function(node){that.needRender|=node.tick(t);});}
if(this._nodeBag.viewarea.length){that=this;Array.forEach(this._nodeBag.viewarea,function(node){that.needRender|=node.tick(t);});}};x3dom.X3DDocument.prototype.render=function(ctx){if(!ctx||!this._viewarea)
return;ctx.renderScene(this._viewarea);};x3dom.X3DDocument.prototype.onMove=function(ctx,x,y,buttonState){if(!ctx||!this._viewarea)
return;ctx.pickValue(this._viewarea,x,y);this._viewarea.onMove(x,y,buttonState);};x3dom.X3DDocument.prototype.onDrag=function(ctx,x,y,buttonState){if(!ctx||!this._viewarea)
return;ctx.pickValue(this._viewarea,x,y);this._viewarea.onDrag(x,y,buttonState);};x3dom.X3DDocument.prototype.onMousePress=function(ctx,x,y,buttonState){if(!ctx||!this._viewarea)
return;var min=x3dom.fields.SFVec3f.MAX();var max=x3dom.fields.SFVec3f.MIN();this._viewarea._scene.getVolume(min,max,true);this._viewarea._scene._lastMin=min;this._viewarea._scene._lastMax=max;ctx.pickValue(this._viewarea,x,y);this._viewarea.onMousePress(x,y,buttonState);};x3dom.X3DDocument.prototype.onMouseRelease=function(ctx,x,y,buttonState){if(!ctx||!this._viewarea)
return;ctx.pickValue(this._viewarea,x,y);this._viewarea.onMouseRelease(x,y,buttonState);};x3dom.X3DDocument.prototype.onMouseOver=function(ctx,x,y,buttonState){if(!ctx||!this._viewarea)
return;ctx.pickValue(this._viewarea,x,y);this._viewarea.onMouseOver(x,y,buttonState);};x3dom.X3DDocument.prototype.onMouseOut=function(ctx,x,y,buttonState){if(!ctx||!this._viewarea)
return;ctx.pickValue(this._viewarea,x,y);this._viewarea.onMouseOut(x,y,buttonState);};x3dom.X3DDocument.prototype.onDoubleClick=function(ctx,x,y){if(!ctx||!this._viewarea)
return;this._viewarea.onDoubleClick(x,y);};x3dom.X3DDocument.prototype.onKeyUp=function(keyCode)
{switch(keyCode)
{case 27:{history.back();}
break;case 33:{var stack=this._scene.getViewpoint()._stack;if(stack){stack.switchTo('next');}
else{x3dom.debug.logError('No valid ViewBindable stack.');}}
break;case 34:{var stack=this._scene.getViewpoint()._stack;if(stack){stack.switchTo('prev');}
else{x3dom.debug.logError('No valid ViewBindable stack.');}}
break;case 37:{}
break;case 38:{}
break;case 39:{}
break;case 40:{}
break;default:}};x3dom.X3DDocument.prototype.onKeyPress=function(charCode)
{switch(charCode)
{case 32:{var statDiv=this.canvas.parent.statDiv;if(statDiv){statDiv.style.display=((statDiv.style.display=='none')?'inline':'none');}
x3dom.debug.logInfo("a: show all | d: show helper buffers | s: light view | "+"m: toggle render mode | p: intersect type | r: reset view"+"e: examine mode | f: fly mode | w: walk mode | "+"l: lookAt mode | u: upright position");}
break;case 43:{this._scene.getNavigationInfo()._vf.speed=2*this._scene.getNavigationInfo()._vf.speed;x3dom.debug.logInfo("Changed navigation speed to "+
this._scene.getNavigationInfo()._vf.speed);}
break;case 45:{this._scene.getNavigationInfo()._vf.speed=0.5*this._scene.getNavigationInfo()._vf.speed;x3dom.debug.logInfo("Changed navigation speed to "+
this._scene.getNavigationInfo()._vf.speed);}
break;case 97:{this._viewarea.showAll();}
break;case 100:{if(this._viewarea._visDbgBuf===undefined){this._viewarea._visDbgBuf=true;}
else{this._viewarea._visDbgBuf=!this._viewarea._visDbgBuf;}
x3dom.debug.logContainer.style.display=(this._viewarea._visDbgBuf===true)?"block":"none";}
break;case 101:{this._scene.getNavigationInfo()._vf.type[0]="examine";x3dom.debug.logInfo("Switch to examine mode.");}
break;case 102:{this._scene.getNavigationInfo()._vf.type[0]="fly";x3dom.debug.logInfo("Switch to fly mode.");}
break;case 108:{this._scene.getNavigationInfo()._vf.type[0]="lookat";x3dom.debug.logInfo("Switch to lookat mode.");}
break;case 109:{if(this._viewarea._points===undefined){this._viewarea._points=true;}
else{this._viewarea._points=!this._viewarea._points;}}
break;case 112:{if(this._scene._vf.pickMode.toLowerCase()==="idbuf"){this._scene._vf.pickMode="color";}
else if(this._scene._vf.pickMode.toLowerCase()==="color"){this._scene._vf.pickMode="texCoord";}
else if(this._scene._vf.pickMode.toLowerCase()==="texcoord"){this._scene._vf.pickMode="box";}
else{this._scene._vf.pickMode="idBuf";}
x3dom.debug.logInfo("Switch pickMode to '"+this._scene._vf.pickMode+"'.");}
break;case 114:{this._viewarea.resetView();}
break;case 115:{if(this._nodeBag.lights.length>0)
{this._viewarea.animateTo(this._viewarea.getLightMatrix()[0],this._scene.getViewpoint());}}
break;case 117:{this._viewarea.uprightView();}
break;case 119:{this._scene.getNavigationInfo()._vf.type[0]="walk";x3dom.debug.logInfo("Switch to walk mode.");}
break;default:}};x3dom.X3DDocument.prototype.shutdown=function(ctx)
{if(!ctx)
return;ctx.shutdown(this._viewarea);};x3dom.registerNodeType("X3DFollowerNode","Followers",defineClass(x3dom.nodeTypes.X3DChildNode,function(ctx){x3dom.nodeTypes.X3DFollowerNode.superClass.call(this,ctx);ctx.doc._nodeBag.followers.push(this);this.addField_SFBool(ctx,'isActive',false);},{nodeChanged:function(){},fieldChanged:function(fieldName){},parentRemoved:function(parent)
{if(this._parentNodes.length===0){var doc=this.findX3DDoc();for(var i=0,n=doc._nodeBag.followers.length;i<n;i++){if(doc._nodeBag.followers[i]===this){doc._nodeBag.followers.splice(i,1);}}}},tick:function(t){return false;},stepResponse:function(t)
{if(t<=0)
return 0;if(t>=this._vf.duration)
return 1;return this.stepResponseCore(t/this._vf.duration);},stepResponseCore:function(T)
{return 0.5-0.5*Math.cos(T*Math.PI);}}));x3dom.registerNodeType("X3DChaserNode","Followers",defineClass(x3dom.nodeTypes.X3DFollowerNode,function(ctx){x3dom.nodeTypes.X3DChaserNode.superClass.call(this,ctx);this.addField_SFTime(ctx,'duration',0);this._initDone=false;this._stepTime=0;this._currTime=0;this._bufferEndTime=0;this._numSupports=60;},{nodeChanged:function(){},fieldChanged:function(fieldName){}}));x3dom.registerNodeType("X3DDamperNode","Followers",defineClass(x3dom.nodeTypes.X3DFollowerNode,function(ctx){x3dom.nodeTypes.X3DDamperNode.superClass.call(this,ctx);this.addField_SFTime(ctx,'tau',0);this.addField_SFFloat(ctx,'tolerance',-1);this.addField_SFInt32(ctx,'order',0);this._eps=this._vf.tolerance<0?0.001:this._vf.tolerance;this._lastTick=0;},{nodeChanged:function(){},fieldChanged:function(fieldName)
{if(fieldName==="tolerance")
{this._eps=this._vf.tolerance<0?0.001:this._vf.tolerance;}}}));x3dom.registerNodeType("ColorChaser","Followers",defineClass(x3dom.nodeTypes.X3DChaserNode,function(ctx){x3dom.nodeTypes.ColorChaser.superClass.call(this,ctx);this.addField_SFColor(ctx,'initialDestination',0.8,0.8,0.8);this.addField_SFColor(ctx,'initialValue',0.8,0.8,0.8);this.addField_SFColor(ctx,'set_value',0,0,0);this.addField_SFColor(ctx,'set_destination',0,0,0);this._buffer=new x3dom.fields.MFColor();this._previousValue=new x3dom.fields.SFColor(0,0,0);this._value=new x3dom.fields.SFColor(0,0,0);},{nodeChanged:function()
{this.initialize();},fieldChanged:function(fieldName)
{if(fieldName.indexOf("set_destination")>=0)
{this.initialize();this.updateBuffer(this._currTime);if(!this._vf.isActive)
this.postMessage('isActive',true);}
else if(fieldName.indexOf("set_value")>=0)
{this.initialize();this._previousValue.setValues(this._vf.set_value);for(var C=1;C<this._buffer.length;C++)
this._buffer[C].setValues(this._vf.set_value);this.postMessage('value_changed',this._vf.set_value);if(!this._vf.isActive)
this.postMessage('isActive',true);}},initialize:function()
{if(!this._initDone)
{this._initDone=true;this._vf.set_destination=this._vf.initialDestination;this._buffer.length=this._numSupports;this._buffer[0]=this._vf.initialDestination;for(var C=1;C<this._buffer.length;C++)
this._buffer[C]=this._vf.initialValue;this._previousValue=this._vf.initialValue;this._stepTime=this._vf.duration/this._numSupports;var active=!this._buffer[0].equals(this._buffer[1],x3dom.fields.Eps);if(this._vf.isActive!==active)
this.postMessage('isActive',active);}},tick:function(now)
{this.initialize();this._currTime=now;if(!this._bufferEndTime)
{this._bufferEndTime=now;this._value=this._vf.initialValue;this.postMessage('value_changed',this._value);return true;}
var Frac=this.updateBuffer(now);var Output=this._previousValue;var DeltaIn=this._buffer[this._buffer.length-1].subtract(this._previousValue);var DeltaOut=DeltaIn.multiply(this.stepResponse((this._buffer.length-1+Frac)*this._stepTime));Output=Output.add(DeltaOut);for(var C=this._buffer.length-2;C>=0;C--)
{DeltaIn=this._buffer[C].subtract(this._buffer[C+1]);DeltaOut=DeltaIn.multiply(this.stepResponse((C+Frac)*this._stepTime));Output=Output.add(DeltaOut);}
if(!Output.equals(this._value,x3dom.fields.Eps)){this._value.setValues(Output);this.postMessage('value_changed',this._value);}
else{this.postMessage('isActive',false);}
return this._vf.isActive;},updateBuffer:function(now)
{var Frac=(now-this._bufferEndTime)/this._stepTime;if(Frac>=1)
{var NumToShift=Math.floor(Frac);Frac-=NumToShift;if(NumToShift<this._buffer.length)
{this._previousValue=this._buffer[this._buffer.length-NumToShift];for(var C=this._buffer.length-1;C>=NumToShift;C--)
this._buffer[C]=this._buffer[C-NumToShift];for(var C=0;C<NumToShift;C++)
{var Alpha=C/NumToShift;this._buffer[C]=this._buffer[NumToShift].multiply(Alpha).add(this._vf.set_destination.multiply((1-Alpha)));}}
else
{this._previousValue=(NumToShift==this._buffer.length)?this._buffer[0]:this._vf.set_destination;for(var C=0;C<this._buffer.length;C++)
this._buffer[C]=this._vf.set_destination;}
this._bufferEndTime+=NumToShift*this._stepTime;}
return Frac;}}));x3dom.registerNodeType("ColorDamper","Followers",defineClass(x3dom.nodeTypes.X3DDamperNode,function(ctx){x3dom.nodeTypes.ColorDamper.superClass.call(this,ctx);this.addField_SFColor(ctx,'initialDestination',0.8,0.8,0.8);this.addField_SFColor(ctx,'initialValue',0.8,0.8,0.8);this.addField_SFColor(ctx,'set_value',0,0,0);this.addField_SFColor(ctx,'set_destination',0,0,0);this._value0=new x3dom.fields.SFColor(0,0,0);this._value1=new x3dom.fields.SFColor(0,0,0);this._value2=new x3dom.fields.SFColor(0,0,0);this._value3=new x3dom.fields.SFColor(0,0,0);this._value4=new x3dom.fields.SFColor(0,0,0);this._value5=new x3dom.fields.SFColor(0,0,0);this.initialize();},{nodeChanged:function()
{},fieldChanged:function(fieldName)
{if(fieldName.indexOf("set_destination")>=0)
{if(!this._value0.equals(this._vf.set_destination,this._eps)){this._value0=this._vf.set_destination;if(!this._vf.isActive){this.postMessage('isActive',true);}}}
else if(fieldName.indexOf("set_value")>=0)
{this._value1.setValues(this._vf.set_value);this._value2.setValues(this._vf.set_value);this._value3.setValues(this._vf.set_value);this._value4.setValues(this._vf.set_value);this._value5.setValues(this._vf.set_value);this._lastTick=0;this.postMessage('value_changed',this._value5);if(!this._vf.isActive){this._lastTick=0;this.postMessage('isActive',true);}}},initialize:function()
{this._value0.setValues(this._vf.initialDestination);this._value1.setValues(this._vf.initialValue);this._value2.setValues(this._vf.initialValue);this._value3.setValues(this._vf.initialValue);this._value4.setValues(this._vf.initialValue);this._value5.setValues(this._vf.initialValue);this._lastTick=0;var active=!this._value0.equals(this._value1,this._eps);if(this._vf.isActive!==active)
this.postMessage('isActive',active);},distance:function(a,b)
{var diff=a.subtract(b);return Math.sqrt(diff.r*diff.r+diff.g*diff.g+diff.b*diff.b);},tick:function(now)
{if(!this._lastTick)
{this._lastTick=now;return false;}
var delta=now-this._lastTick;var alpha=Math.exp(-delta/this._vf.tau);this._value1=this._vf.order>0&&this._vf.tau?this._value0.add(this._value1.subtract(this._value0).multiply(alpha)):new x3dom.fields.SFColor(this._value0.r,this._value0.g,this._value0.b);this._value2=this._vf.order>1&&this._vf.tau?this._value1.add(this._value2.subtract(this._value1).multiply(alpha)):new x3dom.fields.SFColor(this._value1.r,this._value1.g,this._value1.b);this._value3=this._vf.order>2&&this._vf.tau?this._value2.add(this._value3.subtract(this._value2).multiply(alpha)):new x3dom.fields.SFColor(this._value2.r,this._value2.g,this._value2.b);this._value4=this._vf.order>3&&this._vf.tau?this._value3.add(this._value4.subtract(this._value3).multiply(alpha)):new x3dom.fields.SFColor(this._value3.r,this._value3.g,this._value3.b);this._value5=this._vf.order>4&&this._vf.tau?this._value4.add(this._value5.subtract(this._value4).multiply(alpha)):new x3dom.fields.SFColor(this._value4.r,this._value4.g,this._value4.b);var dist=this.distance(this._value1,this._value0);if(this._vf.order>1)
{var dist2=this.distance(this._value2,this._value1);if(dist2>dist)dist=dist2;}
if(this._vf.order>2)
{var dist3=this.distance(this._value3,this._value2);if(dist3>dist)dist=dist3;}
if(this._vf.order>3)
{var dist4=this.distance(this._value4,this._value3);if(dist4>dist)dist=dist4;}
if(this._vf.order>4)
{var dist5=this.distance(this._value5,this._value4);if(dist5>dist)dist=dist5;}
if(dist<this._eps)
{this._value1.setValues(this._value0);this._value2.setValues(this._value0);this._value3.setValues(this._value0);this._value4.setValues(this._value0);this._value5.setValues(this._value0);this.postMessage('value_changed',this._value0);this.postMessage('isActive',false);this._lastTick=0;return false;}
this.postMessage('value_changed',this._value5);this._lastTick=now;return true;}}));x3dom.registerNodeType("OrientationChaser","Followers",defineClass(x3dom.nodeTypes.X3DChaserNode,function(ctx){x3dom.nodeTypes.OrientationChaser.superClass.call(this,ctx);this.addField_SFRotation(ctx,'initialDestination',0,1,0,0);this.addField_SFRotation(ctx,'initialValue',0,1,0,0);this.addField_SFRotation(ctx,'set_value',0,1,0,0);this.addField_SFRotation(ctx,'set_destination',0,1,0,0);this._numSupports=30;this._buffer=new x3dom.fields.MFRotation();this._previousValue=new x3dom.fields.Quaternion(0,1,0,0);this._value=new x3dom.fields.Quaternion(0,1,0,0);},{nodeChanged:function()
{this.initialize();},fieldChanged:function(fieldName)
{if(fieldName.indexOf("set_destination")>=0)
{this.initialize();this.updateBuffer(this._currTime);if(!this._vf.isActive)
this.postMessage('isActive',true);}
else if(fieldName.indexOf("set_value")>=0)
{this.initialize();this._previousValue.setValues(this._vf.set_value);for(var C=1;C<this._buffer.length;C++)
this._buffer[C].setValues(this._vf.set_value);this.postMessage('value_changed',this._vf.set_value);if(!this._vf.isActive)
this.postMessage('isActive',true);}},initialize:function()
{if(!this._initDone)
{this._initDone=true;this._vf.set_destination=this._vf.initialDestination;this._buffer.length=this._numSupports;this._buffer[0]=this._vf.initialDestination;for(var C=1;C<this._buffer.length;C++)
this._buffer[C]=this._vf.initialValue;this._previousValue=this._vf.initialValue;this._stepTime=this._vf.duration/this._numSupports;var active=!this._buffer[0].equals(this._buffer[1],x3dom.fields.Eps);if(this._vf.isActive!==active)
this.postMessage('isActive',active);}},tick:function(now)
{this.initialize();this._currTime=now;if(!this._bufferEndTime)
{this._bufferEndTime=now;this._value=this._vf.initialValue;this.postMessage('value_changed',this._value);return true;}
var Frac=this.updateBuffer(now);var Output=this._previousValue;var DeltaIn=this._previousValue.inverse().multiply(this._buffer[this._buffer.length-1]);Output=Output.slerp(Output.multiply(DeltaIn),this.stepResponse((this._buffer.length-1+Frac)*this._stepTime));for(var C=this._buffer.length-2;C>=0;C--)
{DeltaIn=this._buffer[C+1].inverse().multiply(this._buffer[C]);Output=Output.slerp(Output.multiply(DeltaIn),this.stepResponse((C+Frac)*this._stepTime));}
if(!Output.equals(this._value,x3dom.fields.Eps)){Output=Output.normalize(Output);this._value.setValues(Output);this.postMessage('value_changed',this._value);}
else{this.postMessage('isActive',false);}
return this._vf.isActive;},updateBuffer:function(now)
{var Frac=(now-this._bufferEndTime)/this._stepTime;if(Frac>=1)
{var NumToShift=Math.floor(Frac);Frac-=NumToShift;if(NumToShift<this._buffer.length)
{this._previousValue=this._buffer[this._buffer.length-NumToShift];for(var C=this._buffer.length-1;C>=NumToShift;C--)
this._buffer[C]=this._buffer[C-NumToShift];for(var C=0;C<NumToShift;C++)
{var Alpha=C/NumToShift;this._buffer[C]=this._vf.set_destination.slerp(this._buffer[NumToShift],Alpha);}}
else
{this._previousValue=(NumToShift==this._buffer.length)?this._buffer[0]:this._vf.set_destination;for(var C=0;C<this._buffer.length;C++)
this._buffer[C]=this._vf.set_destination;}
this._bufferEndTime+=NumToShift*this._stepTime;}
return Frac;}}));x3dom.registerNodeType("OrientationDamper","Followers",defineClass(x3dom.nodeTypes.X3DDamperNode,function(ctx){x3dom.nodeTypes.OrientationDamper.superClass.call(this,ctx);this.addField_SFRotation(ctx,'initialDestination',0,1,0,0);this.addField_SFRotation(ctx,'initialValue',0,1,0,0);this.addField_SFRotation(ctx,'set_value',0,1,0,0);this.addField_SFRotation(ctx,'set_destination',0,1,0,0);this._value0=new x3dom.fields.Quaternion(0,1,0,0);this._value1=new x3dom.fields.Quaternion(0,1,0,0);this._value2=new x3dom.fields.Quaternion(0,1,0,0);this._value3=new x3dom.fields.Quaternion(0,1,0,0);this._value4=new x3dom.fields.Quaternion(0,1,0,0);this._value5=new x3dom.fields.Quaternion(0,1,0,0);this.initialize();},{nodeChanged:function()
{},fieldChanged:function(fieldName)
{if(fieldName.indexOf("set_destination")>=0)
{if(!this._value0.equals(this._vf.set_destination,this._eps)){this._value0=this._vf.set_destination;if(!this._vf.isActive){this.postMessage('isActive',true);}}}
else if(fieldName.indexOf("set_value")>=0)
{this._value1.setValues(this._vf.set_value);this._value2.setValues(this._vf.set_value);this._value3.setValues(this._vf.set_value);this._value4.setValues(this._vf.set_value);this._value5.setValues(this._vf.set_value);this._lastTick=0;this.postMessage('value_changed',this._value5);if(!this._vf.isActive){this._lastTick=0;this.postMessage('isActive',true);}}},initialize:function()
{this._value0.setValues(this._vf.initialDestination);this._value1.setValues(this._vf.initialValue);this._value2.setValues(this._vf.initialValue);this._value3.setValues(this._vf.initialValue);this._value4.setValues(this._vf.initialValue);this._value5.setValues(this._vf.initialValue);this._lastTick=0;var active=!this._value0.equals(this._value1,this._eps);if(this._vf.isActive!==active)
this.postMessage('isActive',active);},tick:function(now)
{if(!this._lastTick)
{this._lastTick=now;return false;}
var delta=now-this._lastTick;var alpha=Math.exp(-delta/this._vf.tau);this._value1=this._vf.order>0&&this._vf.tau?this._value0.slerp(this._value1,alpha):new x3dom.fields.Quaternion(this._value0.x,this._value0.y,this._value0.z,this._value0.w);this._value2=this._vf.order>1&&this._vf.tau?this._value1.slerp(this._value2,alpha):new x3dom.fields.Quaternion(this._value1.x,this._value1.y,this._value1.z,this._value1.w);this._value3=this._vf.order>2&&this._vf.tau?this._value2.slerp(this._value3,alpha):new x3dom.fields.Quaternion(this._value2.x,this._value2.y,this._value2.z,this._value2.w);this._value4=this._vf.order>3&&this._vf.tau?this._value3.slerp(this._value4,alpha):new x3dom.fields.Quaternion(this._value3.x,this._value3.y,this._value3.z,this._value3.w);this._value5=this._vf.order>4&&this._vf.tau?this._value4.slerp(this._value5,alpha):new x3dom.fields.Quaternion(this._value4.x,this._value4.y,this._value4.z,this._value4.w);var dist=Math.abs(this._value1.inverse().multiply(this._value0).angle());if(this._vf.order>1)
{var dist2=Math.abs(this._value2.inverse().multiply(this._value1).angle());if(dist2>dist)dist=dist2;}
if(this._vf.order>2)
{var dist3=Math.abs(this._value3.inverse().multiply(this._value2).angle());if(dist3>dist)dist=dist3;}
if(this._vf.order>3)
{var dist4=Math.abs(this._value4.inverse().multiply(this._value3).angle());if(dist4>dist)dist=dist4;}
if(this._vf.order>4)
{var dist5=Math.abs(this._value5.inverse().multiply(this._value4).angle());if(dist5>dist)dist=dist5;}
if(dist<this._eps)
{this._value1.setValues(this._value0);this._value2.setValues(this._value0);this._value3.setValues(this._value0);this._value4.setValues(this._value0);this._value5.setValues(this._value0);this.postMessage('value_changed',this._value0);this.postMessage('isActive',false);this._lastTick=0;return false;}
this.postMessage('value_changed',this._value5);this._lastTick=now;return true;}}));x3dom.registerNodeType("PositionChaser","Followers",defineClass(x3dom.nodeTypes.X3DChaserNode,function(ctx){x3dom.nodeTypes.PositionChaser.superClass.call(this,ctx);this.addField_SFVec3f(ctx,'initialDestination',0,0,0);this.addField_SFVec3f(ctx,'initialValue',0,0,0);this.addField_SFVec3f(ctx,'set_value',0,0,0);this.addField_SFVec3f(ctx,'set_destination',0,0,0);this._buffer=new x3dom.fields.MFVec3f();this._previousValue=new x3dom.fields.SFVec3f(0,0,0);this._value=new x3dom.fields.SFVec3f(0,0,0);},{nodeChanged:function()
{this.initialize();},fieldChanged:function(fieldName)
{if(fieldName.indexOf("set_destination")>=0)
{this.initialize();this.updateBuffer(this._currTime);if(!this._vf.isActive)
this.postMessage('isActive',true);}
else if(fieldName.indexOf("set_value")>=0)
{this.initialize();this._previousValue.setValues(this._vf.set_value);for(var C=1;C<this._buffer.length;C++)
this._buffer[C].setValues(this._vf.set_value);this.postMessage('value_changed',this._vf.set_value);if(!this._vf.isActive)
this.postMessage('isActive',true);}},initialize:function()
{if(!this._initDone)
{this._initDone=true;this._vf.set_destination=this._vf.initialDestination;this._buffer.length=this._numSupports;this._buffer[0]=this._vf.initialDestination;for(var C=1;C<this._buffer.length;C++)
this._buffer[C]=this._vf.initialValue;this._previousValue=this._vf.initialValue;this._stepTime=this._vf.duration/this._numSupports;var active=!this._buffer[0].equals(this._buffer[1],x3dom.fields.Eps);if(this._vf.isActive!==active)
this.postMessage('isActive',active);}},tick:function(now)
{this.initialize();this._currTime=now;if(!this._bufferEndTime)
{this._bufferEndTime=now;this._value=this._vf.initialValue;this.postMessage('value_changed',this._value);return true;}
var Frac=this.updateBuffer(now);var Output=this._previousValue;var DeltaIn=this._buffer[this._buffer.length-1].subtract(this._previousValue);var DeltaOut=DeltaIn.multiply(this.stepResponse((this._buffer.length-1+Frac)*this._stepTime));Output=Output.add(DeltaOut);for(var C=this._buffer.length-2;C>=0;C--)
{DeltaIn=this._buffer[C].subtract(this._buffer[C+1]);DeltaOut=DeltaIn.multiply(this.stepResponse((C+Frac)*this._stepTime));Output=Output.add(DeltaOut);}
if(!Output.equals(this._value,x3dom.fields.Eps)){this._value.setValues(Output);this.postMessage('value_changed',this._value);}
else{this.postMessage('isActive',false);}
return this._vf.isActive;},updateBuffer:function(now)
{var Frac=(now-this._bufferEndTime)/this._stepTime;if(Frac>=1)
{var NumToShift=Math.floor(Frac);Frac-=NumToShift;if(NumToShift<this._buffer.length)
{this._previousValue=this._buffer[this._buffer.length-NumToShift];for(var C=this._buffer.length-1;C>=NumToShift;C--)
this._buffer[C]=this._buffer[C-NumToShift];for(var C=0;C<NumToShift;C++)
{var Alpha=C/NumToShift;this._buffer[C]=this._buffer[NumToShift].multiply(Alpha).add(this._vf.set_destination.multiply((1-Alpha)));}}
else
{this._previousValue=(NumToShift==this._buffer.length)?this._buffer[0]:this._vf.set_destination;for(var C=0;C<this._buffer.length;C++)
this._buffer[C]=this._vf.set_destination;}
this._bufferEndTime+=NumToShift*this._stepTime;}
return Frac;}}));x3dom.registerNodeType("PositionChaser2D","Followers",defineClass(x3dom.nodeTypes.X3DChaserNode,function(ctx){x3dom.nodeTypes.PositionChaser2D.superClass.call(this,ctx);this.addField_SFVec2f(ctx,'initialDestination',0,0);this.addField_SFVec2f(ctx,'initialValue',0,0);this.addField_SFVec2f(ctx,'set_value',0,0);this.addField_SFVec2f(ctx,'set_destination',0,0);this._buffer=new x3dom.fields.MFVec2f();this._previousValue=new x3dom.fields.SFVec2f(0,0);this._value=new x3dom.fields.SFVec2f(0,0);},{nodeChanged:function()
{this.initialize();},fieldChanged:function(fieldName)
{if(fieldName.indexOf("set_destination")>=0)
{this.initialize();this.updateBuffer(this._currTime);if(!this._vf.isActive)
this.postMessage('isActive',true);}
else if(fieldName.indexOf("set_value")>=0)
{this.initialize();this._previousValue.setValues(this._vf.set_value);for(var C=1;C<this._buffer.length;C++)
this._buffer[C].setValues(this._vf.set_value);this.postMessage('value_changed',this._vf.set_value);if(!this._vf.isActive)
this.postMessage('isActive',true);}},initialize:function()
{if(!this._initDone)
{this._initDone=true;this._vf.set_destination=this._vf.initialDestination;this._buffer.length=this._numSupports;this._buffer[0]=this._vf.initialDestination;for(var C=1;C<this._buffer.length;C++)
this._buffer[C]=this._vf.initialValue;this._previousValue=this._vf.initialValue;this._stepTime=this._vf.duration/this._numSupports;var active=!this._buffer[0].equals(this._buffer[1],x3dom.fields.Eps);if(this._vf.isActive!==active)
this.postMessage('isActive',active);}},tick:function(now)
{this.initialize();this._currTime=now;if(!this._bufferEndTime)
{this._bufferEndTime=now;this._value=this._vf.initialValue;this.postMessage('value_changed',this._value);return true;}
var Frac=this.updateBuffer(now);var Output=this._previousValue;var DeltaIn=this._buffer[this._buffer.length-1].subtract(this._previousValue);var DeltaOut=DeltaIn.multiply(this.stepResponse((this._buffer.length-1+Frac)*this._stepTime));Output=Output.add(DeltaOut);for(var C=this._buffer.length-2;C>=0;C--)
{DeltaIn=this._buffer[C].subtract(this._buffer[C+1]);DeltaOut=DeltaIn.multiply(this.stepResponse((C+Frac)*this._stepTime));Output=Output.add(DeltaOut);}
if(!Output.equals(this._value,x3dom.fields.Eps)){this._value.setValues(Output);this.postMessage('value_changed',this._value);}
else{this.postMessage('isActive',false);}
return this._vf.isActive;},updateBuffer:function(now)
{var Frac=(now-this._bufferEndTime)/this._stepTime;if(Frac>=1)
{var NumToShift=Math.floor(Frac);Frac-=NumToShift;if(NumToShift<this._buffer.length)
{this._previousValue=this._buffer[this._buffer.length-NumToShift];for(var C=this._buffer.length-1;C>=NumToShift;C--)
this._buffer[C]=this._buffer[C-NumToShift];for(var C=0;C<NumToShift;C++)
{var Alpha=C/NumToShift;this._buffer[C]=this._buffer[NumToShift].multiply(Alpha).add(this._vf.set_destination.multiply((1-Alpha)));}}
else
{this._previousValue=(NumToShift==this._buffer.length)?this._buffer[0]:this._vf.set_destination;for(var C=0;C<this._buffer.length;C++)
this._buffer[C]=this._vf.set_destination;}
this._bufferEndTime+=NumToShift*this._stepTime;}
return Frac;}}));x3dom.registerNodeType("PositionDamper","Followers",defineClass(x3dom.nodeTypes.X3DDamperNode,function(ctx){x3dom.nodeTypes.PositionDamper.superClass.call(this,ctx);this.addField_SFVec3f(ctx,'initialDestination',0,0,0);this.addField_SFVec3f(ctx,'initialValue',0,0,0);this.addField_SFVec3f(ctx,'set_value',0,0,0);this.addField_SFVec3f(ctx,'set_destination',0,0,0);this._value0=new x3dom.fields.SFVec3f(0,0,0);this._value1=new x3dom.fields.SFVec3f(0,0,0);this._value2=new x3dom.fields.SFVec3f(0,0,0);this._value3=new x3dom.fields.SFVec3f(0,0,0);this._value4=new x3dom.fields.SFVec3f(0,0,0);this._value5=new x3dom.fields.SFVec3f(0,0,0);this.initialize();},{nodeChanged:function()
{},fieldChanged:function(fieldName)
{if(fieldName.indexOf("set_destination")>=0)
{if(!this._value0.equals(this._vf.set_destination,this._eps)){this._value0=this._vf.set_destination;if(!this._vf.isActive){this.postMessage('isActive',true);}}}
else if(fieldName.indexOf("set_value")>=0)
{this._value1.setValues(this._vf.set_value);this._value2.setValues(this._vf.set_value);this._value3.setValues(this._vf.set_value);this._value4.setValues(this._vf.set_value);this._value5.setValues(this._vf.set_value);this._lastTick=0;this.postMessage('value_changed',this._value5);if(!this._vf.isActive){this._lastTick=0;this.postMessage('isActive',true);}}},initialize:function()
{this._value0.setValues(this._vf.initialDestination);this._value1.setValues(this._vf.initialValue);this._value2.setValues(this._vf.initialValue);this._value3.setValues(this._vf.initialValue);this._value4.setValues(this._vf.initialValue);this._value5.setValues(this._vf.initialValue);this._lastTick=0;var active=!this._value0.equals(this._value1,this._eps);if(this._vf.isActive!==active)
this.postMessage('isActive',active);},tick:function(now)
{if(!this._lastTick)
{this._lastTick=now;return false;}
var delta=now-this._lastTick;var alpha=Math.exp(-delta/this._vf.tau);this._value1=this._vf.order>0&&this._vf.tau?this._value0.add(this._value1.subtract(this._value0).multiply(alpha)):new x3dom.fields.SFVec3f(this._value0.x,this._value0.y,this._value0.z);this._value2=this._vf.order>1&&this._vf.tau?this._value1.add(this._value2.subtract(this._value1).multiply(alpha)):new x3dom.fields.SFVec3f(this._value1.x,this._value1.y,this._value1.z);this._value3=this._vf.order>2&&this._vf.tau?this._value2.add(this._value3.subtract(this._value2).multiply(alpha)):new x3dom.fields.SFVec3f(this._value2.x,this._value2.y,this._value2.z);this._value4=this._vf.order>3&&this._vf.tau?this._value3.add(this._value4.subtract(this._value3).multiply(alpha)):new x3dom.fields.SFVec3f(this._value3.x,this._value3.y,this._value3.z);this._value5=this._vf.order>4&&this._vf.tau?this._value4.add(this._value5.subtract(this._value4).multiply(alpha)):new x3dom.fields.SFVec3f(this._value4.x,this._value4.y,this._value4.z);var dist=this._value1.subtract(this._value0).length();if(this._vf.order>1)
{var dist2=this._value2.subtract(this._value1).length();if(dist2>dist)dist=dist2;}
if(this._vf.order>2)
{var dist3=this._value3.subtract(this._value2).length();if(dist3>dist)dist=dist3;}
if(this._vf.order>3)
{var dist4=this._value4.subtract(this._value3).length();if(dist4>dist)dist=dist4;}
if(this._vf.order>4)
{var dist5=this._value5.subtract(this._value4).length();if(dist5>dist)dist=dist5;}
if(dist<this._eps)
{this._value1.setValues(this._value0);this._value2.setValues(this._value0);this._value3.setValues(this._value0);this._value4.setValues(this._value0);this._value5.setValues(this._value0);this.postMessage('value_changed',this._value0);this.postMessage('isActive',false);this._lastTick=0;return false;}
this.postMessage('value_changed',this._value5);this._lastTick=now;return true;}}));x3dom.registerNodeType("PositionDamper2D","Followers",defineClass(x3dom.nodeTypes.X3DDamperNode,function(ctx){x3dom.nodeTypes.PositionDamper2D.superClass.call(this,ctx);this.addField_SFVec2f(ctx,'initialDestination',0,0);this.addField_SFVec2f(ctx,'initialValue',0,0);this.addField_SFVec2f(ctx,'set_value',0,0);this.addField_SFVec2f(ctx,'set_destination',0,0);this._value0=new x3dom.fields.SFVec2f(0,0);this._value1=new x3dom.fields.SFVec2f(0,0);this._value2=new x3dom.fields.SFVec2f(0,0);this._value3=new x3dom.fields.SFVec2f(0,0);this._value4=new x3dom.fields.SFVec2f(0,0);this._value5=new x3dom.fields.SFVec2f(0,0);this.initialize();},{nodeChanged:function()
{},fieldChanged:function(fieldName)
{if(fieldName.indexOf("set_destination")>=0)
{if(!this._value0.equals(this._vf.set_destination,this._eps)){this._value0=this._vf.set_destination;if(!this._vf.isActive){this.postMessage('isActive',true);}}}
else if(fieldName.indexOf("set_value")>=0)
{this._value1.setValues(this._vf.set_value);this._value2.setValues(this._vf.set_value);this._value3.setValues(this._vf.set_value);this._value4.setValues(this._vf.set_value);this._value5.setValues(this._vf.set_value);this._lastTick=0;this.postMessage('value_changed',this._value5);if(!this._vf.isActive){this._lastTick=0;this.postMessage('isActive',true);}}},initialize:function()
{this._value0.setValues(this._vf.initialDestination);this._value1.setValues(this._vf.initialValue);this._value2.setValues(this._vf.initialValue);this._value3.setValues(this._vf.initialValue);this._value4.setValues(this._vf.initialValue);this._value5.setValues(this._vf.initialValue);this._lastTick=0;var active=!this._value0.equals(this._value1,this._eps);if(this._vf.isActive!==active)
this.postMessage('isActive',active);},tick:function(now)
{if(!this._lastTick)
{this._lastTick=now;return false;}
var delta=now-this._lastTick;var alpha=Math.exp(-delta/this._vf.tau);this._value1=this._vf.order>0&&this._vf.tau?this._value0.add(this._value1.subtract(this._value0).multiply(alpha)):new x3dom.fields.SFVec2f(this._value0.x,this._value0.y,this._value0.z);this._value2=this._vf.order>1&&this._vf.tau?this._value1.add(this._value2.subtract(this._value1).multiply(alpha)):new x3dom.fields.SFVec2f(this._value1.x,this._value1.y,this._value1.z);this._value3=this._vf.order>2&&this._vf.tau?this._value2.add(this._value3.subtract(this._value2).multiply(alpha)):new x3dom.fields.SFVec2f(this._value2.x,this._value2.y,this._value2.z);this._value4=this._vf.order>3&&this._vf.tau?this._value3.add(this._value4.subtract(this._value3).multiply(alpha)):new x3dom.fields.SFVec2f(this._value3.x,this._value3.y,this._value3.z);this._value5=this._vf.order>4&&this._vf.tau?this._value4.add(this._value5.subtract(this._value4).multiply(alpha)):new x3dom.fields.SFVec2f(this._value4.x,this._value4.y,this._value4.z);var dist=this._value1.subtract(this._value0).length();if(this._vf.order>1)
{var dist2=this._value2.subtract(this._value1).length();if(dist2>dist)dist=dist2;}
if(this._vf.order>2)
{var dist3=this._value3.subtract(this._value2).length();if(dist3>dist)dist=dist3;}
if(this._vf.order>3)
{var dist4=this._value4.subtract(this._value3).length();if(dist4>dist)dist=dist4;}
if(this._vf.order>4)
{var dist5=this._value5.subtract(this._value4).length();if(dist5>dist)dist=dist5;}
if(dist<this._eps)
{this._value1.setValues(this._value0);this._value2.setValues(this._value0);this._value3.setValues(this._value0);this._value4.setValues(this._value0);this._value5.setValues(this._value0);this.postMessage('value_changed',this._value0);this.postMessage('isActive',false);this._lastTick=0;return false;}
this.postMessage('value_changed',this._value5);this._lastTick=now;return true;}}));x3dom.registerNodeType("ScalarChaser","Followers",defineClass(x3dom.nodeTypes.X3DChaserNode,function(ctx){x3dom.nodeTypes.ScalarChaser.superClass.call(this,ctx);this.addField_SFFloat(ctx,'initialDestination',0);this.addField_SFFloat(ctx,'initialValue',0);this.addField_SFFloat(ctx,'set_value',0);this.addField_SFFloat(ctx,'set_destination',0);this._buffer=[];this._previousValue=0;this._value=0;},{nodeChanged:function()
{this.initialize();},fieldChanged:function(fieldName)
{if(fieldName.indexOf("set_destination")>=0)
{this.initialize();this.updateBuffer(this._currTime);if(!this._vf.isActive)
this.postMessage('isActive',true);}
else if(fieldName.indexOf("set_value")>=0)
{this.initialize();this._previousValue=this._vf.set_value;for(var C=1;C<this._buffer.length;C++)
this._buffer[C]=this._vf.set_value;this.postMessage('value_changed',this._vf.set_value);if(!this._vf.isActive)
this.postMessage('isActive',true);}},initialize:function()
{if(!this._initDone)
{this._initDone=true;this._vf.set_destination=this._vf.initialDestination;this._buffer.length=this._numSupports;this._buffer[0]=this._vf.initialDestination;for(var C=1;C<this._buffer.length;C++)
this._buffer[C]=this._vf.initialValue;this._previousValue=this._vf.initialValue;this._stepTime=this._vf.duration/this._numSupports;var active=(Math.abs(this._buffer[0]-this._buffer[1])>=x3dom.fields.Eps);if(this._vf.isActive!==active)
this.postMessage('isActive',active);}},tick:function(now)
{this.initialize();this._currTime=now;if(!this._bufferEndTime)
{this._bufferEndTime=now;this._value=this._vf.initialValue;this.postMessage('value_changed',this._value);return true;}
var Frac=this.updateBuffer(now);var Output=this._previousValue;var DeltaIn=this._buffer[this._buffer.length-1]-this._previousValue;var DeltaOut=DeltaIn*(this.stepResponse((this._buffer.length-1+Frac)*this._stepTime));Output=Output+DeltaOut;for(var C=this._buffer.length-2;C>=0;C--)
{DeltaIn=this._buffer[C]-this._buffer[C+1];DeltaOut=DeltaIn*(this.stepResponse((C+Frac)*this._stepTime));Output=Output+DeltaOut;}
if(Math.abs(Output-this._value)>=x3dom.fields.Eps){this._value=Output;this.postMessage('value_changed',this._value);}
else{this.postMessage('isActive',false);}
return this._vf.isActive;},updateBuffer:function(now)
{var Frac=(now-this._bufferEndTime)/this._stepTime;if(Frac>=1)
{var NumToShift=Math.floor(Frac);Frac-=NumToShift;if(NumToShift<this._buffer.length)
{this._previousValue=this._buffer[this._buffer.length-NumToShift];for(var C=this._buffer.length-1;C>=NumToShift;C--)
this._buffer[C]=this._buffer[C-NumToShift];for(var C=0;C<NumToShift;C++)
{var Alpha=C/NumToShift;this._buffer[C]=this._buffer[NumToShift]*Alpha+this._vf.set_destination*(1-Alpha);}}
else
{this._previousValue=(NumToShift==this._buffer.length)?this._buffer[0]:this._vf.set_destination;for(var C=0;C<this._buffer.length;C++)
this._buffer[C]=this._vf.set_destination;}
this._bufferEndTime+=NumToShift*this._stepTime;}
return Frac;}}));x3dom.registerNodeType("ScalarDamper","Followers",defineClass(x3dom.nodeTypes.X3DDamperNode,function(ctx){x3dom.nodeTypes.ScalarDamper.superClass.call(this,ctx);this.addField_SFFloat(ctx,'initialDestination',0);this.addField_SFFloat(ctx,'initialValue',0);this.addField_SFFloat(ctx,'set_value',0);this.addField_SFFloat(ctx,'set_destination',0);this._value0=0;this._value1=0;this._value2=0;this._value3=0;this._value4=0;this._value5=0;this.initialize();},{nodeChanged:function()
{},fieldChanged:function(fieldName)
{if(fieldName.indexOf("set_destination")>=0)
{if(Math.abs(this._value0-this._vf.set_destination)>=this._eps){this._value0=this._vf.set_destination;if(!this._vf.isActive){this.postMessage('isActive',true);}}}
else if(fieldName.indexOf("set_value")>=0)
{this._value1=this._vf.set_value;this._value2=this._vf.set_value;this._value3=this._vf.set_value;this._value4=this._vf.set_value;this._value5=this._vf.set_value;this._lastTick=0;this.postMessage('value_changed',this._value5);if(!this._vf.isActive){this._lastTick=0;this.postMessage('isActive',true);}}},initialize:function()
{this._value0=this._vf.initialDestination;this._value1=this._vf.initialValue;this._value2=this._vf.initialValue;this._value3=this._vf.initialValue;this._value4=this._vf.initialValue;this._value5=this._vf.initialValue;this._lastTick=0;var active=(Math.abs(this._value0-this._value1)>=this._eps);if(this._vf.isActive!==active)
this.postMessage('isActive',active);},tick:function(now)
{if(!this._lastTick)
{this._lastTick=now;return false;}
var delta=now-this._lastTick;var alpha=Math.exp(-delta/this._vf.tau);this._value1=this._vf.order>0&&this._vf.tau?this._value0+alpha*(this._value1-this._value0):this._value0;this._value2=this._vf.order>1&&this._vf.tau?this._value1+alpha*(this._value2-this._value1):this._value1;this._value3=this._vf.order>2&&this._vf.tau?this._value2+alpha*(this._value3-this._value2):this._value2;this._value4=this._vf.order>3&&this._vf.tau?this._value3+alpha*(this._value4-this._value3):this._value3;this._value5=this._vf.order>4&&this._vf.tau?this._value4+alpha*(this._value5-this._value4):this._value4;var dist=Math.abs(this._value1-this._value0);if(this._vf.order>1)
{var dist2=Math.abs(this._value2-this._value1);if(dist2>dist)dist=dist2;}
if(this._vf.order>2)
{var dist3=Math.abs(this._value3-this._value2);if(dist3>dist)dist=dist3;}
if(this._vf.order>3)
{var dist4=Math.abs(this._value4-this._value3);if(dist4>dist)dist=dist4;}
if(this._vf.order>4)
{var dist5=Math.abs(this._value5-this._value4);if(dist5>dist)dist=dist5;}
if(dist<this._eps)
{this._value1=this._value0;this._value2=this._value0;this._value3=this._value0;this._value4=this._value0;this._value5=this._value0;this.postMessage('value_changed',this._value0);this.postMessage('isActive',false);this._lastTick=0;return false;}
this.postMessage('value_changed',this._value5);this._lastTick=now;return true;}}));x3dom.registerNodeType("CoordinateDamper","Followers",defineClass(x3dom.nodeTypes.X3DDamperNode,function(ctx){x3dom.nodeTypes.CoordinateDamper.superClass.call(this,ctx);this.addField_MFVec3f(ctx,'initialDestination',[]);this.addField_MFVec3f(ctx,'initialValue',[]);this.addField_MFVec3f(ctx,'set_value',[]);this.addField_MFVec3f(ctx,'set_destination',[]);x3dom.debug.logWarning("CoordinateDamper NYI");},{nodeChanged:function(){},fieldChanged:function(fieldName){}}));x3dom.registerNodeType("TexCoordDamper2D","Followers",defineClass(x3dom.nodeTypes.X3DDamperNode,function(ctx){x3dom.nodeTypes.TexCoordDamper2D.superClass.call(this,ctx);this.addField_MFVec2f(ctx,'initialDestination',[]);this.addField_MFVec2f(ctx,'initialValue',[]);this.addField_MFVec2f(ctx,'set_value',[]);this.addField_MFVec2f(ctx,'set_destination',[]);x3dom.debug.logWarning("TexCoordDamper2D NYI");},{nodeChanged:function(){},fieldChanged:function(fieldName){}}));x3dom.fields={};x3dom.fields.Eps=0.000001;x3dom.fields.SFMatrix4f=function(_00,_01,_02,_03,_10,_11,_12,_13,_20,_21,_22,_23,_30,_31,_32,_33){if(arguments.length===0){this._00=1;this._01=0;this._02=0;this._03=0;this._10=0;this._11=1;this._12=0;this._13=0;this._20=0;this._21=0;this._22=1;this._23=0;this._30=0;this._31=0;this._32=0;this._33=1;}
else{this._00=_00;this._01=_01;this._02=_02;this._03=_03;this._10=_10;this._11=_11;this._12=_12;this._13=_13;this._20=_20;this._21=_21;this._22=_22;this._23=_23;this._30=_30;this._31=_31;this._32=_32;this._33=_33;}};x3dom.fields.SFMatrix4f.prototype.e0=function(){var baseVec=new x3dom.fields.SFVec3f(this._00,this._10,this._20);return baseVec.normalize();};x3dom.fields.SFMatrix4f.prototype.e1=function(){var baseVec=new x3dom.fields.SFVec3f(this._01,this._11,this._21);return baseVec.normalize();};x3dom.fields.SFMatrix4f.prototype.e2=function(){var baseVec=new x3dom.fields.SFVec3f(this._02,this._12,this._22);return baseVec.normalize();};x3dom.fields.SFMatrix4f.prototype.e3=function(){return new x3dom.fields.SFVec3f(this._03,this._13,this._23);};x3dom.fields.SFMatrix4f.identity=function(){return new x3dom.fields.SFMatrix4f(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);};x3dom.fields.SFMatrix4f.zeroMatrix=function(){return new x3dom.fields.SFMatrix4f(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);};x3dom.fields.SFMatrix4f.translation=function(vec){return new x3dom.fields.SFMatrix4f(1,0,0,vec.x,0,1,0,vec.y,0,0,1,vec.z,0,0,0,1);};x3dom.fields.SFMatrix4f.rotationX=function(a){var c=Math.cos(a);var s=Math.sin(a);return new x3dom.fields.SFMatrix4f(1,0,0,0,0,c,-s,0,0,s,c,0,0,0,0,1);};x3dom.fields.SFMatrix4f.rotationY=function(a){var c=Math.cos(a);var s=Math.sin(a);return new x3dom.fields.SFMatrix4f(c,0,s,0,0,1,0,0,-s,0,c,0,0,0,0,1);};x3dom.fields.SFMatrix4f.rotationZ=function(a){var c=Math.cos(a);var s=Math.sin(a);return new x3dom.fields.SFMatrix4f(c,-s,0,0,s,c,0,0,0,0,1,0,0,0,0,1);};x3dom.fields.SFMatrix4f.scale=function(vec){return new x3dom.fields.SFMatrix4f(vec.x,0,0,0,0,vec.y,0,0,0,0,vec.z,0,0,0,0,1);};x3dom.fields.SFMatrix4f.lookAt=function(from,at,up)
{var result=x3dom.fields.SFMatrix4f.identity();result.setTranslate(from);var view=from.subtract(at).normalize();var right=up.cross(view);if(right.dot(right)<x3dom.fields.Eps){return result;}
right.normalize();var newup=view.cross(right).normalize();var tmp=x3dom.fields.SFMatrix4f.identity();tmp.setValue(right,newup,view);return result.mult(tmp);}
x3dom.fields.SFMatrix4f.prototype.setTranslate=function(vec){this._03=vec.x;this._13=vec.y;this._23=vec.z;};x3dom.fields.SFMatrix4f.prototype.setScale=function(vec){this._00=vec.x;this._11=vec.y;this._22=vec.z;};x3dom.fields.SFMatrix4f.parseRotation=function(str){var m=/^([+-]?\d*\.*\d*[eE]?[+-]?\d*?)\s*,?\s*([+-]?\d*\.*\d*[eE]?[+-]?\d*?)\s*,?\s*([+-]?\d*\.*\d*[eE]?[+-]?\d*?)\s*,?\s*([+-]?\d*\.*\d*[eE]?[+-]?\d*?)$/.exec(str);var x=+m[1],y=+m[2],z=+m[3],a=+m[4];var d=Math.sqrt(x*x+y*y+z*z);if(d===0){x=1;y=z=0;}else{x/=d;y/=d;z/=d;}
var c=Math.cos(a);var s=Math.sin(a);var t=1-c;return new x3dom.fields.SFMatrix4f(t*x*x+c,t*x*y+s*z,t*x*z-s*y,0,t*x*y-s*z,t*y*y+c,t*y*z+s*x,0,t*x*z+s*y,t*y*z-s*x,t*z*z+c,0,0,0,0,1).transpose();};x3dom.fields.SFMatrix4f.parse=function(str){var needTranspose=false;var val=/matrix.*\((.+)\)/;if(val.exec(str)){str=RegExp.$1;needTranspose=true;}
var arr=Array.map(str.split(/[,\s]+/),function(n){return+n;});if(arr.length>=16)
{if(!needTranspose){return new x3dom.fields.SFMatrix4f(arr[0],arr[1],arr[2],arr[3],arr[4],arr[5],arr[6],arr[7],arr[8],arr[9],arr[10],arr[11],arr[12],arr[13],arr[14],arr[15]);}
else{return new x3dom.fields.SFMatrix4f(arr[0],arr[4],arr[8],arr[12],arr[1],arr[5],arr[9],arr[13],arr[2],arr[6],arr[10],arr[14],arr[3],arr[7],arr[11],arr[15]);}}
else if(arr.length===6){return new x3dom.fields.SFMatrix4f(arr[0],arr[1],0,arr[4],arr[2],arr[3],0,arr[5],0,0,1,0,0,0,0,1);}
else{x3dom.debug.logWarning("SFMatrix4f - can't parse string: "+str);return x3dom.fields.SFMatrix4f.identity();}};x3dom.fields.SFMatrix4f.prototype.mult=function(that){return new x3dom.fields.SFMatrix4f(this._00*that._00+this._01*that._10+this._02*that._20+this._03*that._30,this._00*that._01+this._01*that._11+this._02*that._21+this._03*that._31,this._00*that._02+this._01*that._12+this._02*that._22+this._03*that._32,this._00*that._03+this._01*that._13+this._02*that._23+this._03*that._33,this._10*that._00+this._11*that._10+this._12*that._20+this._13*that._30,this._10*that._01+this._11*that._11+this._12*that._21+this._13*that._31,this._10*that._02+this._11*that._12+this._12*that._22+this._13*that._32,this._10*that._03+this._11*that._13+this._12*that._23+this._13*that._33,this._20*that._00+this._21*that._10+this._22*that._20+this._23*that._30,this._20*that._01+this._21*that._11+this._22*that._21+this._23*that._31,this._20*that._02+this._21*that._12+this._22*that._22+this._23*that._32,this._20*that._03+this._21*that._13+this._22*that._23+this._23*that._33,this._30*that._00+this._31*that._10+this._32*that._20+this._33*that._30,this._30*that._01+this._31*that._11+this._32*that._21+this._33*that._31,this._30*that._02+this._31*that._12+this._32*that._22+this._33*that._32,this._30*that._03+this._31*that._13+this._32*that._23+this._33*that._33);};x3dom.fields.SFMatrix4f.prototype.multMatrixPnt=function(vec){return new x3dom.fields.SFVec3f(this._00*vec.x+this._01*vec.y+this._02*vec.z+this._03,this._10*vec.x+this._11*vec.y+this._12*vec.z+this._13,this._20*vec.x+this._21*vec.y+this._22*vec.z+this._23);};x3dom.fields.SFMatrix4f.prototype.multMatrixVec=function(vec){return new x3dom.fields.SFVec3f(this._00*vec.x+this._01*vec.y+this._02*vec.z,this._10*vec.x+this._11*vec.y+this._12*vec.z,this._20*vec.x+this._21*vec.y+this._22*vec.z);};x3dom.fields.SFMatrix4f.prototype.multFullMatrixPnt=function(vec){var w=this._30*vec.x+this._31*vec.y+this._32*vec.z+this._33;if(w){w=1.0/w;}
return new x3dom.fields.SFVec3f((this._00*vec.x+this._01*vec.y+this._02*vec.z+this._03)*w,(this._10*vec.x+this._11*vec.y+this._12*vec.z+this._13)*w,(this._20*vec.x+this._21*vec.y+this._22*vec.z+this._23)*w);};x3dom.fields.SFMatrix4f.prototype.transpose=function(){return new x3dom.fields.SFMatrix4f(this._00,this._10,this._20,this._30,this._01,this._11,this._21,this._31,this._02,this._12,this._22,this._32,this._03,this._13,this._23,this._33);};x3dom.fields.SFMatrix4f.prototype.negate=function(){return new x3dom.fields.SFMatrix4f(-this._00,-this._01,-this._02,-this._03,-this._10,-this._11,-this._12,-this._13,-this._20,-this._21,-this._22,-this._23,-this._30,-this._31,-this._32,-this._33);};x3dom.fields.SFMatrix4f.prototype.multiply=function(s){return new x3dom.fields.SFMatrix4f(s*this._00,s*this._01,s*this._02,s*this._03,s*this._10,s*this._11,s*this._12,s*this._13,s*this._20,s*this._21,s*this._22,s*this._23,s*this._30,s*this._31,s*this._32,s*this._33);};x3dom.fields.SFMatrix4f.prototype.add=function(that){return new x3dom.fields.SFMatrix4f(this._00+that._00,this._01+that._01,this._02+that._02,this._03+that._03,this._10+that._10,this._11+that._11,this._12+that._12,this._13+that._13,this._20+that._20,this._21+that._21,this._22+that._22,this._23+that._23,this._30+that._30,this._31+that._31,this._32+that._32,this._33+that._33);};x3dom.fields.SFMatrix4f.prototype.addScaled=function(that,s){return new x3dom.fields.SFMatrix4f(this._00+s*that._00,this._01+s*that._01,this._02+s*that._02,this._03+s*that._03,this._10+s*that._10,this._11+s*that._11,this._12+s*that._12,this._13+s*that._13,this._20+s*that._20,this._21+s*that._21,this._22+s*that._22,this._23+s*that._23,this._30+s*that._30,this._31+s*that._31,this._32+s*that._32,this._33+s*that._33);};x3dom.fields.SFMatrix4f.prototype.setValues=function(that){this._00=that._00;this._01=that._01;this._02=that._02;this._03=that._03;this._10=that._10;this._11=that._11;this._12=that._12;this._13=that._13;this._20=that._20;this._21=that._21;this._22=that._22;this._23=that._23;this._30=that._30;this._31=that._31;this._32=that._32;this._33=that._33;};x3dom.fields.SFMatrix4f.prototype.setValue=function(v1,v2,v3,v4){this._00=v1.x;this._01=v2.x;this._02=v3.x;this._10=v1.y;this._11=v2.y;this._12=v3.y;this._20=v1.z;this._21=v2.z;this._22=v3.z;this._30=0;this._31=0;this._32=0;if(arguments.length>3){this._03=v4.x;this._13=v4.y;this._23=v4.z;this._33=1;}};x3dom.fields.SFMatrix4f.prototype.toGL=function(){return[this._00,this._10,this._20,this._30,this._01,this._11,this._21,this._31,this._02,this._12,this._22,this._32,this._03,this._13,this._23,this._33];};x3dom.fields.SFMatrix4f.prototype.sqrt=function(){var iX=x3dom.fields.SFMatrix4f.identity(),Y=x3dom.fields.SFMatrix4f.identity(),iY=x3dom.fields.SFMatrix4f.identity(),result=x3dom.fields.SFMatrix4f.identity();var i,g,ig;result.setValues(this);for(i=0;i<6;i++)
{iX=result.inverse();iY=Y.inverse();g=Math.abs(Math.pow(result.det()*Y.det(),-0.125));ig=1.0/g;result=result.multiply(g);result=result.addScaled(iY,ig);result=result.multiply(0.5);Y=Y.multiply(g);Y=Y.addScaled(iX,ig);Y=Y.multiply(0.5);}
return result;};x3dom.fields.SFMatrix4f.prototype.normInfinity=function(){var t=0,m=0;if((t=Math.abs(this._00))>m)
m=t;if((t=Math.abs(this._01))>m)
m=t;if((t=Math.abs(this._02))>m)
m=t;if((t=Math.abs(this._03))>m)
m=t;if((t=Math.abs(this._10))>m)
m=t;if((t=Math.abs(this._11))>m)
m=t;if((t=Math.abs(this._12))>m)
m=t;if((t=Math.abs(this._13))>m)
m=t;if((t=Math.abs(this._20))>m)
m=t;if((t=Math.abs(this._21))>m)
m=t;if((t=Math.abs(this._22))>m)
m=t;if((t=Math.abs(this._23))>m)
m=t;if((t=Math.abs(this._30))>m)
m=t;if((t=Math.abs(this._31))>m)
m=t;if((t=Math.abs(this._32))>m)
m=t;if((t=Math.abs(this._33))>m)
m=t;return m;};x3dom.fields.SFMatrix4f.prototype.equals=function(that){var eps=0.000000000001;return Math.abs(this._00-that._00)<eps&&Math.abs(this._01-that._01)<eps&&Math.abs(this._02-that._02)<eps&&Math.abs(this._03-that._03)<eps&&Math.abs(this._10-that._10)<eps&&Math.abs(this._11-that._11)<eps&&Math.abs(this._12-that._12)<eps&&Math.abs(this._13-that._13)<eps&&Math.abs(this._20-that._20)<eps&&Math.abs(this._21-that._21)<eps&&Math.abs(this._22-that._22)<eps&&Math.abs(this._23-that._23)<eps&&Math.abs(this._30-that._30)<eps&&Math.abs(this._31-that._31)<eps&&Math.abs(this._32-that._32)<eps&&Math.abs(this._33-that._33)<eps;};x3dom.fields.SFMatrix4f.prototype.getTransform=function(translation,rotation,scale){var T=new x3dom.fields.SFVec3f(this._03,this._13,this._23);var S=new x3dom.fields.SFVec3f(1,1,1);var angle_x,angle_y,angle_z,tr_x,tr_y,C;angle_y=Math.asin(this._02);C=Math.cos(angle_y);if(Math.abs(C)>0.005){tr_x=this._22/C;tr_y=-this._12/C;angle_x=Math.atan2(tr_y,tr_x);tr_x=this._00/C;tr_y=-this._01/C;angle_z=Math.atan2(tr_y,tr_x);}
else{angle_x=0;tr_x=this._11;tr_y=this._10;angle_z=Math.atan2(tr_y,tr_x);}
var R=new x3dom.fields.Quaternion(-Math.cos((angle_x-angle_z)/2)*Math.sin(angle_y/2),Math.sin((angle_x-angle_z)/2)*Math.sin(angle_y/2),-Math.sin((angle_x+angle_z)/2)*Math.cos(angle_y/2),Math.cos((angle_x+angle_z)/2)*Math.cos(angle_y/2));translation.x=T.x;translation.y=T.y;translation.z=T.z;rotation.x=R.x;rotation.y=R.y;rotation.z=R.z;rotation.w=R.w;scale.x=S.x;scale.y=S.y;scale.z=S.z;};x3dom.fields.SFMatrix4f.prototype.log=function(){var maxiter=12;var k=0,i=0;var eps=0.000000000001;var A=x3dom.fields.SFMatrix4f.identity(),Z=x3dom.fields.SFMatrix4f.identity(),result=x3dom.fields.SFMatrix4f.identity();A.setValues(this)
Z.setValues(this);Z._00-=1;Z._11-=1;Z._22-=1;Z._33-=1;while(Z.normInfinity()>0.5)
{A=A.sqrt();Z.setValues(A);Z._00-=1;Z._11-=1;Z._22-=1;Z._33-=1;k++;}
A._00-=1;A._11-=1;A._22-=1;A._33-=1;A=A.negate();result.setValues(A);Z.setValues(A);i=1;while(Z.normInfinity()>eps&&i<maxiter)
{Z=Z.mult(A);i++;result=result.addScaled(Z,(1.0/i));}
result=result.multiply((-1.0)*(1<<k));return result;};x3dom.fields.SFMatrix4f.prototype.exp=function(){var q=6;var A=x3dom.fields.SFMatrix4f.identity(),D=x3dom.fields.SFMatrix4f.identity(),N=x3dom.fields.SFMatrix4f.identity(),result=x3dom.fields.SFMatrix4f.identity();var j=1,k=0,c=1.0;A.setValues(this);j+=Math.floor(Math.log(A.normInfinity()/0.693));if(j<0)
j=0;A=A.multiply(1.0/(1<<j));for(k=1;k<=q;k++)
{c*=(q-k+1)/(k*(2*q-k+1));result=A.mult(result);N=N.addScaled(result,c);if(k%2)
{D=D.addScaled(result,-c);}
else
{D=D.addScaled(result,c);}}
result=D.inverse().mult(N);for(k=0;k<j;k++)
{result=result.mult(result);}
return result;};x3dom.fields.SFMatrix4f.prototype.det3=function(a1,a2,a3,b1,b2,b3,c1,c2,c3){var d=(a1*b2*c3)+(a2*b3*c1)+(a3*b1*c2)-
(a1*b3*c2)-(a2*b1*c3)-(a3*b2*c1);return d;};x3dom.fields.SFMatrix4f.prototype.det=function(){var a1,a2,a3,a4,b1,b2,b3,b4,c1,c2,c3,c4,d1,d2,d3,d4;a1=this._00;b1=this._10;c1=this._20;d1=this._30;a2=this._01;b2=this._11;c2=this._21;d2=this._31;a3=this._02;b3=this._12;c3=this._22;d3=this._32;a4=this._03;b4=this._13;c4=this._23;d4=this._33;var d=+a1*this.det3(b2,b3,b4,c2,c3,c4,d2,d3,d4)
-b1*this.det3(a2,a3,a4,c2,c3,c4,d2,d3,d4)
+c1*this.det3(a2,a3,a4,b2,b3,b4,d2,d3,d4)
-d1*this.det3(a2,a3,a4,b2,b3,b4,c2,c3,c4);return d;};x3dom.fields.SFMatrix4f.prototype.inverse=function(){var a1,a2,a3,a4,b1,b2,b3,b4,c1,c2,c3,c4,d1,d2,d3,d4;a1=this._00;b1=this._10;c1=this._20;d1=this._30;a2=this._01;b2=this._11;c2=this._21;d2=this._31;a3=this._02;b3=this._12;c3=this._22;d3=this._32;a4=this._03;b4=this._13;c4=this._23;d4=this._33;var rDet=this.det();if(Math.abs(rDet)===0)
{x3dom.debug.logWarning("Invert matrix: singular matrix, no inverse!");return x3dom.fields.SFMatrix4f.identity();}
rDet=1.0/rDet;return new x3dom.fields.SFMatrix4f(+this.det3(b2,b3,b4,c2,c3,c4,d2,d3,d4)*rDet,-this.det3(a2,a3,a4,c2,c3,c4,d2,d3,d4)*rDet,+this.det3(a2,a3,a4,b2,b3,b4,d2,d3,d4)*rDet,-this.det3(a2,a3,a4,b2,b3,b4,c2,c3,c4)*rDet,-this.det3(b1,b3,b4,c1,c3,c4,d1,d3,d4)*rDet,+this.det3(a1,a3,a4,c1,c3,c4,d1,d3,d4)*rDet,-this.det3(a1,a3,a4,b1,b3,b4,d1,d3,d4)*rDet,+this.det3(a1,a3,a4,b1,b3,b4,c1,c3,c4)*rDet,+this.det3(b1,b2,b4,c1,c2,c4,d1,d2,d4)*rDet,-this.det3(a1,a2,a4,c1,c2,c4,d1,d2,d4)*rDet,+this.det3(a1,a2,a4,b1,b2,b4,d1,d2,d4)*rDet,-this.det3(a1,a2,a4,b1,b2,b4,c1,c2,c4)*rDet,-this.det3(b1,b2,b3,c1,c2,c3,d1,d2,d3)*rDet,+this.det3(a1,a2,a3,c1,c2,c3,d1,d2,d3)*rDet,-this.det3(a1,a2,a3,b1,b2,b3,d1,d2,d3)*rDet,+this.det3(a1,a2,a3,b1,b2,b3,c1,c2,c3)*rDet);};x3dom.fields.SFMatrix4f.prototype.toString=function(){return'[SFMatrix4f '+
this._00+', '+this._01+', '+this._02+', '+this._03+'; '+
this._10+', '+this._11+', '+this._12+', '+this._13+'; '+
this._20+', '+this._21+', '+this._22+', '+this._23+'; '+
this._30+', '+this._31+', '+this._32+', '+this._33+']';};x3dom.fields.SFMatrix4f.prototype.setValueByStr=function(str){var needTranspose=false;var val=/matrix.*\((.+)\)/;if(val.exec(str)){str=RegExp.$1;needTranspose=true;}
var arr=Array.map(str.split(/[,\s]+/),function(n){return+n;});if(arr.length>=16)
{if(!needTranspose){this._00=arr[0];this._01=arr[1];this._02=arr[2];this._03=arr[3];this._10=arr[4];this._11=arr[5];this._12=arr[6];this._13=arr[7];this._20=arr[8];this._21=arr[9];this._22=arr[10];this._23=arr[11];this._30=arr[12];this._31=arr[13];this._32=arr[14];this._33=arr[15];}
else{this._00=arr[0];this._01=arr[4];this._02=arr[8];this._03=arr[12];this._10=arr[1];this._11=arr[5];this._12=arr[9];this._13=arr[13];this._20=arr[2];this._21=arr[6];this._22=arr[10];this._23=arr[14];this._30=arr[3];this._31=arr[7];this._32=arr[11];this._33=arr[15];}}
else if(arr.length===6){this._00=arr[0];this._01=arr[1];this._02=0;this._03=arr[4];this._10=arr[2];this._11=arr[3];this._12=0;this._13=arr[5];this._20=0;this._21=0;this._22=1;this._23=0;this._30=0;this._31=0;this._32=0;this._33=1;}
else{x3dom.debug.logWarning("SFMatrix4f - can't parse string: "+str);}
return this;};x3dom.fields.SFVec2f=function(x,y){if(arguments.length===0){this.x=this.y=0;}
else{this.x=x;this.y=y;}};x3dom.fields.SFVec2f.parse=function(str){var m=/^([+-]?\d*\.*\d*[eE]?[+-]?\d*?)\s*,?\s*([+-]?\d*\.*\d*[eE]?[+-]?\d*?)$/.exec(str);return new x3dom.fields.SFVec2f(+m[1],+m[2]);};x3dom.fields.SFVec2f.prototype.setValues=function(that){this.x=that.x;this.y=that.y;};x3dom.fields.SFVec2f.prototype.add=function(that){return new x3dom.fields.SFVec2f(this.x+that.x,this.y+that.y);};x3dom.fields.SFVec2f.prototype.subtract=function(that){return new x3dom.fields.SFVec2f(this.x-that.x,this.y-that.y);};x3dom.fields.SFVec2f.prototype.negate=function(){return new x3dom.fields.SFVec2f(-this.x,-this.y);};x3dom.fields.SFVec2f.prototype.dot=function(that){return this.x*that.x+this.y*that.y;};x3dom.fields.SFVec2f.prototype.reflect=function(n){var d2=this.dot(n)*2;return new x3dom.fields.SFVec2f(this.x-d2*n.x,this.y-d2*n.y);};x3dom.fields.SFVec2f.prototype.normalize=function(that){var n=this.length();if(n){n=1.0/n;}
return new x3dom.fields.SFVec2f(this.x*n,this.y*n);};x3dom.fields.SFVec2f.prototype.multComponents=function(that){return new x3dom.fields.SFVec2f(this.x*that.x,this.y*that.y);};x3dom.fields.SFVec2f.prototype.multiply=function(n){return new x3dom.fields.SFVec2f(this.x*n,this.y*n);};x3dom.fields.SFVec2f.prototype.divide=function(n){var denom=n?(1.0/n):1.0;return new x3dom.fields.SFVec2f(this.x*denom,this.y*denom);};x3dom.fields.SFVec2f.prototype.equals=function(that,eps){return Math.abs(this.x-that.x)<eps&&Math.abs(this.y-that.y)<eps;};x3dom.fields.SFVec2f.prototype.length=function(){return Math.sqrt((this.x*this.x)+(this.y*this.y));};x3dom.fields.SFVec2f.prototype.toGL=function(){return[this.x,this.y];};x3dom.fields.SFVec2f.prototype.toString=function(){return"{ x "+this.x+" y "+this.y+" }";};x3dom.fields.SFVec2f.prototype.setValueByStr=function(str){var m=/^([+-]?\d*\.*\d*[eE]?[+-]?\d*?)\s*,?\s*([+-]?\d*\.*\d*[eE]?[+-]?\d*?)$/.exec(str);this.x=+m[1];this.y=+m[2];return this;};x3dom.fields.SFVec3f=function(x,y,z){if(arguments.length===0){this.x=this.y=this.z=0;}
else{this.x=x;this.y=y;this.z=z;}};x3dom.fields.SFVec3f.MIN=function(){return new x3dom.fields.SFVec3f(Number.MIN_VALUE,Number.MIN_VALUE,Number.MIN_VALUE);};x3dom.fields.SFVec3f.MAX=function(){return new x3dom.fields.SFVec3f(Number.MAX_VALUE,Number.MAX_VALUE,Number.MAX_VALUE);};x3dom.fields.SFVec3f.parse=function(str){try{var m=/^([+-]?\d*\.*\d*[eE]?[+-]?\d*?)\s*,?\s*([+-]?\d*\.*\d*[eE]?[+-]?\d*?)\s*,?\s*([+-]?\d*\.*\d*[eE]?[+-]?\d*?)$/.exec(str);return new x3dom.fields.SFVec3f(+m[1],+m[2],+m[3]);}
catch(e){var c=x3dom.fields.SFColor.colorParse(str);return new x3dom.fields.SFVec3f(c.r,c.g,c.b);}};x3dom.fields.SFVec3f.prototype.setValues=function(that){this.x=that.x;this.y=that.y;this.z=that.z;};x3dom.fields.SFVec3f.prototype.add=function(that){return new x3dom.fields.SFVec3f(this.x+that.x,this.y+that.y,this.z+that.z);};x3dom.fields.SFVec3f.prototype.addScaled=function(that,s){return new x3dom.fields.SFVec3f(this.x+s*that.x,this.y+s*that.y,this.z+s*that.z);};x3dom.fields.SFVec3f.prototype.subtract=function(that){return new x3dom.fields.SFVec3f(this.x-that.x,this.y-that.y,this.z-that.z);};x3dom.fields.SFVec3f.prototype.negate=function(){return new x3dom.fields.SFVec3f(-this.x,-this.y,-this.z);};x3dom.fields.SFVec3f.prototype.dot=function(that){return(this.x*that.x+this.y*that.y+this.z*that.z);};x3dom.fields.SFVec3f.prototype.cross=function(that){return new x3dom.fields.SFVec3f(this.y*that.z-this.z*that.y,this.z*that.x-this.x*that.z,this.x*that.y-this.y*that.x);};x3dom.fields.SFVec3f.prototype.reflect=function(n){var d2=this.dot(n)*2;return new x3dom.fields.SFVec3f(this.x-d2*n.x,this.y-d2*n.y,this.z-d2*n.z);};x3dom.fields.SFVec3f.prototype.length=function(){return Math.sqrt((this.x*this.x)+(this.y*this.y)+(this.z*this.z));};x3dom.fields.SFVec3f.prototype.normalize=function(that){var n=this.length();if(n){n=1.0/n;}
return new x3dom.fields.SFVec3f(this.x*n,this.y*n,this.z*n);};x3dom.fields.SFVec3f.prototype.multComponents=function(that){return new x3dom.fields.SFVec3f(this.x*that.x,this.y*that.y,this.z*that.z);};x3dom.fields.SFVec3f.prototype.multiply=function(n){return new x3dom.fields.SFVec3f(this.x*n,this.y*n,this.z*n);};x3dom.fields.SFVec3f.prototype.divide=function(n){var denom=n?(1.0/n):1.0;return new x3dom.fields.SFVec3f(this.x*denom,this.y*denom,this.z*denom);};x3dom.fields.SFVec3f.prototype.equals=function(that,eps){return Math.abs(this.x-that.x)<eps&&Math.abs(this.y-that.y)<eps&&Math.abs(this.z-that.z)<eps;};x3dom.fields.SFVec3f.prototype.toGL=function(){return[this.x,this.y,this.z];};x3dom.fields.SFVec3f.prototype.toString=function(){return"{ x "+this.x+" y "+this.y+" z "+this.z+" }";};x3dom.fields.SFVec3f.prototype.setValueByStr=function(str){try{var m=/^([+-]?\d*\.*\d*[eE]?[+-]?\d*?)\s*,?\s*([+-]?\d*\.*\d*[eE]?[+-]?\d*?)\s*,?\s*([+-]?\d*\.*\d*[eE]?[+-]?\d*?)$/.exec(str);this.x=+m[1];this.y=+m[2];this.z=+m[3];}
catch(e){var c=x3dom.fields.SFColor.colorParse(str);this.x=c.r;this.y=c.g;this.z=c.b;}
return this;};x3dom.fields.Quaternion=function(x,y,z,w){this.x=x;this.y=y;this.z=z;this.w=w;};x3dom.fields.Quaternion.prototype.multiply=function(that){return new x3dom.fields.Quaternion(this.w*that.x+this.x*that.w+this.y*that.z-this.z*that.y,this.w*that.y+this.y*that.w+this.z*that.x-this.x*that.z,this.w*that.z+this.z*that.w+this.x*that.y-this.y*that.x,this.w*that.w-this.x*that.x-this.y*that.y-this.z*that.z);};x3dom.fields.Quaternion.parseAxisAngle=function(str){var m=/^([+-]?\d*\.*\d*[eE]?[+-]?\d*?)\s*,?\s*([+-]?\d*\.*\d*[eE]?[+-]?\d*?)\s*,?\s*([+-]?\d*\.*\d*[eE]?[+-]?\d*?)\s*,?\s*([+-]?\d*\.*\d*[eE]?[+-]?\d*?)$/.exec(str);return x3dom.fields.Quaternion.axisAngle(new x3dom.fields.SFVec3f(+m[1],+m[2],+m[3]),+m[4]);};x3dom.fields.Quaternion.axisAngle=function(axis,a){var t=axis.length();if(t>x3dom.fields.Eps)
{var s=Math.sin(a/2)/t;var c=Math.cos(a/2);return new x3dom.fields.Quaternion(axis.x*s,axis.y*s,axis.z*s,c);}
else
{return new x3dom.fields.Quaternion(0,0,0,1);}};x3dom.fields.Quaternion.prototype.toMatrix=function(){var xx=this.x*this.x;var xy=this.x*this.y;var xz=this.x*this.z;var yy=this.y*this.y;var yz=this.y*this.z;var zz=this.z*this.z;var wx=this.w*this.x;var wy=this.w*this.y;var wz=this.w*this.z;return new x3dom.fields.SFMatrix4f(1-2*(yy+zz),2*(xy-wz),2*(xz+wy),0,2*(xy+wz),1-2*(xx+zz),2*(yz-wx),0,2*(xz-wy),2*(yz+wx),1-2*(xx+yy),0,0,0,0,1);};x3dom.fields.Quaternion.prototype.toAxisAngle=function()
{var x=0,y=0,z=0;var s=0,a=0;var that=this;if(this.w>1)
{that=x3dom.fields.Quaternion.normalize(this);}
a=2*Math.acos(that.w);s=Math.sqrt(1-that.w*that.w);if(s<x3dom.fields.Eps)
{x=that.x;y=that.y;z=that.z;}
else
{x=that.x/s;y=that.y/s;z=that.z/s;}
return[new x3dom.fields.SFVec3f(x,y,z),a];}
x3dom.fields.Quaternion.prototype.angle=function()
{return 2*Math.acos(this.w);};x3dom.fields.Quaternion.prototype.dot=function(that){return this.x*that.x+this.y*that.y+this.z*that.z+this.w*that.w;};x3dom.fields.Quaternion.prototype.add=function(that){return new x3dom.fields.Quaternion(this.x+that.x,this.y+that.y,this.z+that.z,this.w+that.w);};x3dom.fields.Quaternion.prototype.subtract=function(that){return new x3dom.fields.Quaternion(this.x-that.x,this.y-that.y,this.z-that.z,this.w-that.w);};x3dom.fields.Quaternion.prototype.setValues=function(that){this.x=that.x;this.y=that.y;this.z=that.z;this.w=that.w;};x3dom.fields.Quaternion.prototype.equals=function(that,eps){return Math.abs(this.x-that.x)<eps&&Math.abs(this.y-that.y)<eps&&Math.abs(this.z-that.z)<eps&&Math.abs(this.w-that.w)<eps;};x3dom.fields.Quaternion.prototype.multScalar=function(s){return new x3dom.fields.Quaternion(this.x*s,this.y*s,this.z*s,this.w*s);};x3dom.fields.Quaternion.prototype.normalize=function(that){var d2=this.dot(that);var id=1.0;if(d2){id=1.0/Math.sqrt(d2);}
return new x3dom.fields.Quaternion(this.x*id,this.y*id,this.z*id,this.w*id);};x3dom.fields.Quaternion.prototype.negate=function(){return new x3dom.fields.Quaternion(-this.x,-this.y,-this.z,-this.w);};x3dom.fields.Quaternion.prototype.inverse=function(){return new x3dom.fields.Quaternion(-this.x,-this.y,-this.z,this.w);};x3dom.fields.Quaternion.prototype.slerp=function(that,t){var cosom=this.dot(that);var rot1;if(cosom<0.0)
{cosom=-cosom;rot1=that.negate();}
else
{rot1=new x3dom.fields.Quaternion(that.x,that.y,that.z,that.w);}
var scalerot0,scalerot1;if((1.0-cosom)>0.00001)
{var omega=Math.acos(cosom);var sinom=Math.sin(omega);scalerot0=Math.sin((1.0-t)*omega)/sinom;scalerot1=Math.sin(t*omega)/sinom;}
else
{scalerot0=1.0-t;scalerot1=t;}
return this.multScalar(scalerot0).add(rot1.multScalar(scalerot1));};x3dom.fields.Quaternion.rotateFromTo=function(fromVec,toVec){var from=fromVec.normalize();var to=toVec.normalize();var cost=from.dot(to);if(cost>0.99999)
{return new x3dom.fields.Quaternion(0,0,0,1);}
else if(cost<-0.99999)
{var cAxis=new x3dom.fields.SFVec3f(1,0,0);var tmp=from.cross(cAxis);if(tmp.length()<0.00001)
{cAxis.x=0;cAxis.y=1;cAxis.z=0;tmp=from.cross(cAxis);}
tmp=tmp.normalize();return x3dom.fields.Quaternion.axisAngle(tmp,Math.PI);}
var axis=fromVec.cross(toVec);axis=axis.normalize();var s=Math.sqrt(0.5*(1.0-cost));axis=axis.multiply(s);s=Math.sqrt(0.5*(1.0+cost));return new x3dom.fields.Quaternion(axis.x,axis.y,axis.z,s);};x3dom.fields.Quaternion.prototype.toString=function(){return'(('+this.x+', '+this.y+', '+this.z+'), '+this.w+')';};x3dom.fields.Quaternion.prototype.setValueByStr=function(str){var m=/^([+-]?\d*\.*\d*[eE]?[+-]?\d*?)\s*,?\s*([+-]?\d*\.*\d*[eE]?[+-]?\d*?)\s*,?\s*([+-]?\d*\.*\d*[eE]?[+-]?\d*?)\s*,?\s*([+-]?\d*\.*\d*[eE]?[+-]?\d*?)$/.exec(str);var quat=x3dom.fields.Quaternion.axisAngle(new x3dom.fields.SFVec3f(+m[1],+m[2],+m[3]),+m[4]);this.x=quat.x;this.y=quat.y;this.z=quat.z;this.w=quat.w;return this;};x3dom.fields.SFColor=function(r,g,b){if(arguments.length===0){this.r=this.g=this.b=0;}
else{this.r=r;this.g=g;this.b=b;}};x3dom.fields.SFColor.parse=function(str){try{var m=/^([+-]?\d*\.*\d*[eE]?[+-]?\d*?)\s*,?\s*([+-]?\d*\.*\d*[eE]?[+-]?\d*?)\s*,?\s*([+-]?\d*\.*\d*[eE]?[+-]?\d*?)$/.exec(str);return new x3dom.fields.SFColor(+m[1],+m[2],+m[3]);}
catch(e){return x3dom.fields.SFColor.colorParse(str);}};x3dom.fields.SFColor.prototype.setHSV=function(h,s,v){x3dom.debug.logWarning("SFColor.setHSV() NYI");};x3dom.fields.SFColor.prototype.getHSV=function(){var h=0,s=0,v=0;x3dom.debug.logWarning("SFColor.getHSV() NYI");return[h,s,v];};x3dom.fields.SFColor.prototype.setValues=function(color){this.r=color.r;this.g=color.g;this.b=color.b;};x3dom.fields.SFColor.prototype.equals=function(that,eps){return Math.abs(this.r-that.r)<eps&&Math.abs(this.g-that.g)<eps&&Math.abs(this.b-that.b)<eps;};x3dom.fields.SFColor.prototype.add=function(that){return new x3dom.fields.SFColor(this.r+that.r,this.g+that.g,this.b+that.b);};x3dom.fields.SFColor.prototype.subtract=function(that){return new x3dom.fields.SFColor(this.r-that.r,this.g-that.g,this.b-that.b);};x3dom.fields.SFColor.prototype.multiply=function(n){return new x3dom.fields.SFColor(this.r*n,this.g*n,this.b*n);};x3dom.fields.SFColor.prototype.toGL=function(){return[this.r,this.g,this.b];};x3dom.fields.SFColor.prototype.toString=function(){return"{ r "+this.r+" g "+this.g+" b "+this.b+" }";};x3dom.fields.SFColor.prototype.setValueByStr=function(str){try{var m=/^([+-]?\d*\.*\d*[eE]?[+-]?\d*?)\s*,?\s*([+-]?\d*\.*\d*[eE]?[+-]?\d*?)\s*,?\s*([+-]?\d*\.*\d*[eE]?[+-]?\d*?)$/.exec(str);this.r=+m[1];this.g=+m[2];this.b=+m[3];}
catch(e){var c=x3dom.fields.SFColor.colorParse(str);this.r=c.r;this.g=c.g;this.b=c.b;}
return this;};x3dom.fields.SFColor.colorParse=function(color){var red=0,green=0,blue=0;var color_names={aliceblue:'f0f8ff',antiquewhite:'faebd7',aqua:'00ffff',aquamarine:'7fffd4',azure:'f0ffff',beige:'f5f5dc',bisque:'ffe4c4',black:'000000',blanchedalmond:'ffebcd',blue:'0000ff',blueviolet:'8a2be2',brown:'a52a2a',burlywood:'deb887',cadetblue:'5f9ea0',chartreuse:'7fff00',chocolate:'d2691e',coral:'ff7f50',cornflowerblue:'6495ed',cornsilk:'fff8dc',crimson:'dc143c',cyan:'00ffff',darkblue:'00008b',darkcyan:'008b8b',darkgoldenrod:'b8860b',darkgray:'a9a9a9',darkgreen:'006400',darkkhaki:'bdb76b',darkmagenta:'8b008b',darkolivegreen:'556b2f',darkorange:'ff8c00',darkorchid:'9932cc',darkred:'8b0000',darksalmon:'e9967a',darkseagreen:'8fbc8f',darkslateblue:'483d8b',darkslategray:'2f4f4f',darkturquoise:'00ced1',darkviolet:'9400d3',deeppink:'ff1493',deepskyblue:'00bfff',dimgray:'696969',dodgerblue:'1e90ff',feldspar:'d19275',firebrick:'b22222',floralwhite:'fffaf0',forestgreen:'228b22',fuchsia:'ff00ff',gainsboro:'dcdcdc',ghostwhite:'f8f8ff',gold:'ffd700',goldenrod:'daa520',gray:'808080',green:'008000',greenyellow:'adff2f',honeydew:'f0fff0',hotpink:'ff69b4',indianred:'cd5c5c',indigo:'4b0082',ivory:'fffff0',khaki:'f0e68c',lavender:'e6e6fa',lavenderblush:'fff0f5',lawngreen:'7cfc00',lemonchiffon:'fffacd',lightblue:'add8e6',lightcoral:'f08080',lightcyan:'e0ffff',lightgoldenrodyellow:'fafad2',lightgrey:'d3d3d3',lightgreen:'90ee90',lightpink:'ffb6c1',lightsalmon:'ffa07a',lightseagreen:'20b2aa',lightskyblue:'87cefa',lightslateblue:'8470ff',lightslategray:'778899',lightsteelblue:'b0c4de',lightyellow:'ffffe0',lime:'00ff00',limegreen:'32cd32',linen:'faf0e6',magenta:'ff00ff',maroon:'800000',mediumaquamarine:'66cdaa',mediumblue:'0000cd',mediumorchid:'ba55d3',mediumpurple:'9370d8',mediumseagreen:'3cb371',mediumslateblue:'7b68ee',mediumspringgreen:'00fa9a',mediumturquoise:'48d1cc',mediumvioletred:'c71585',midnightblue:'191970',mintcream:'f5fffa',mistyrose:'ffe4e1',moccasin:'ffe4b5',navajowhite:'ffdead',navy:'000080',oldlace:'fdf5e6',olive:'808000',olivedrab:'6b8e23',orange:'ffa500',orangered:'ff4500',orchid:'da70d6',palegoldenrod:'eee8aa',palegreen:'98fb98',paleturquoise:'afeeee',palevioletred:'d87093',papayawhip:'ffefd5',peachpuff:'ffdab9',peru:'cd853f',pink:'ffc0cb',plum:'dda0dd',powderblue:'b0e0e6',purple:'800080',red:'ff0000',rosybrown:'bc8f8f',royalblue:'4169e1',saddlebrown:'8b4513',salmon:'fa8072',sandybrown:'f4a460',seagreen:'2e8b57',seashell:'fff5ee',sienna:'a0522d',silver:'c0c0c0',skyblue:'87ceeb',slateblue:'6a5acd',slategray:'708090',snow:'fffafa',springgreen:'00ff7f',steelblue:'4682b4',tan:'d2b48c',teal:'008080',thistle:'d8bfd8',tomato:'ff6347',turquoise:'40e0d0',violet:'ee82ee',violetred:'d02090',wheat:'f5deb3',white:'ffffff',whitesmoke:'f5f5f5',yellow:'ffff00',yellowgreen:'9acd32'};if(color_names[color]){color="#"+color_names[color];}
if(color.substr&&color.substr(0,1)==="#"){color=color.substr(1);var len=color.length;if(len===6){red=parseInt("0x"+color.substr(0,2))/255.0;green=parseInt("0x"+color.substr(2,2))/255.0;blue=parseInt("0x"+color.substr(4,2))/255.0;}
else if(len===3){red=parseInt("0x"+color.substr(0,1))/15.0;green=parseInt("0x"+color.substr(1,1))/15.0;blue=parseInt("0x"+color.substr(2,1))/15.0;}}
return new x3dom.fields.SFColor(red,green,blue);};x3dom.fields.SFImage=function(w,h,c,arr){if(arguments.length===0){this.width=this.height=this.comp=0;this.array=[];}
else{this.width=w;this.height=h;this.comp=c;arr.map(function(v){this.array.push(v);},this.array);}};x3dom.fields.SFImage.parse=function(str){var img=new x3dom.fields.SFImage();img.setValueByStr(str);return img;};x3dom.fields.SFImage.prototype.setValueByStr=function(str){var mc=str.match(/(\w+)/g);var n=mc.length;var c2=0;var hex="0123456789ABCDEF";this.array=[];if(n>2){this.width=+mc[0];this.height=+mc[1];this.comp=+mc[2];c2=2*this.comp;}
else{this.width=0;this.height=0;this.comp=0;return;}
for(var i=3;i<n;i++){if(!mc[i].substr){continue;}
if(mc[i].substr(1,1).toLowerCase()!=="x"){var out="";var inp=parseInt(mc[i]);while(inp!==0){out=hex.charAt(inp%16)+out;inp=inp>>4;}
len=out.length;while(out.length<c2){out="0"+out;}
mc[i]="0x"+out;}
if(mc[i].substr(1,1).toLowerCase()==="x"){mc[i]=mc[i].substr(2);var len=mc[i].length;var r,g,b,a;if(len===c2){if(this.comp===1){r=parseInt("0x"+mc[i].substr(0,2));this.array.push(r);}
else if(this.comp===2){r=parseInt("0x"+mc[i].substr(0,2));g=parseInt("0x"+mc[i].substr(2,2));this.array.push(r,g);}
else if(this.comp===3){r=parseInt("0x"+mc[i].substr(0,2));g=parseInt("0x"+mc[i].substr(2,2));b=parseInt("0x"+mc[i].substr(4,2));this.array.push(r,g,b);}
else if(this.comp===4){r=parseInt("0x"+mc[i].substr(0,2));g=parseInt("0x"+mc[i].substr(2,2));b=parseInt("0x"+mc[i].substr(4,2));a=parseInt("0x"+mc[i].substr(6,2));this.array.push(r,g,b,a);}}}}};x3dom.fields.SFImage.prototype.toGL=function(){var a=[];Array.map(this.array,function(c){a.push(c);});return a;};x3dom.fields.MFColor=function(colorArray){if(arguments.length==0){}
else{var that=this;colorArray.map(function(c){that.push(c);},this);}};x3dom.fields.MFColor.prototype=x3dom.extend(new Array);x3dom.fields.MFColor.parse=function(str){var mc=str.match(/([+\-0-9eE\.]+)/g);var colors=[];for(var i=0,n=mc.length;i<n;i+=3){colors.push(new x3dom.fields.SFColor(+mc[i+0],+mc[i+1],+mc[i+2]));}
return new x3dom.fields.MFColor(colors);};x3dom.fields.MFColor.prototype.setValueByStr=function(str){while(this.length){this.pop();}
var mc=str.match(/([+\-0-9eE\.]+)/g);for(var i=0,n=mc.length;i<n;i+=3){this.push(new x3dom.fields.SFColor(+mc[i+0],+mc[i+1],+mc[i+2]));}};x3dom.fields.MFColor.prototype.toGL=function(){var a=[];Array.map(this,function(c){a.push(c.r);a.push(c.g);a.push(c.b);});return a;};x3dom.fields.SFColorRGBA=function(r,g,b,a){if(arguments.length===0){this.r=this.g=this.b=this.a=0;}
else{this.r=r;this.g=g;this.b=b;this.a=a;}};x3dom.fields.SFColorRGBA.parse=function(str){try{var m=/^([+-]?\d*\.*\d*[eE]?[+-]?\d*?)\s*,?\s*([+-]?\d*\.*\d*[eE]?[+-]?\d*?)\s*,?\s*([+-]?\d*\.*\d*[eE]?[+-]?\d*?)\s*,?\s*([+-]?\d*\.*\d*[eE]?[+-]?\d*?)$/.exec(str);return new x3dom.fields.SFColorRGBA(+m[1],+m[2],+m[3],+m[4]);}
catch(e){return x3dom.fields.SFColorRGBA.colorParse(str);}};x3dom.fields.SFColorRGBA.prototype.setValues=function(color){this.r=color.r;this.g=color.g;this.b=color.b;this.a=color.a;};x3dom.fields.SFColorRGBA.prototype.equals=function(that,eps){return Math.abs(this.r-that.r)<eps&&Math.abs(this.g-that.g)<eps&&Math.abs(this.b-that.b)<eps&&Math.abs(this.a-that.a)<eps;};x3dom.fields.SFColorRGBA.prototype.toGL=function(){return[this.r,this.g,this.b,this.a];};x3dom.fields.SFColorRGBA.prototype.toString=function(){return"{ r "+this.r+" g "+this.g+" b "+this.b+" a "+this.a+" }";};x3dom.fields.SFColorRGBA.prototype.setValueByStr=function(str){try{var m=/^([+-]?\d*\.*\d*[eE]?[+-]?\d*?)\s*,?\s*([+-]?\d*\.*\d*[eE]?[+-]?\d*?)\s*,?\s*([+-]?\d*\.*\d*[eE]?[+-]?\d*?)\s*,?\s*([+-]?\d*\.*\d*[eE]?[+-]?\d*?)$/.exec(str);this.r=+m[1];this.g=+m[2];this.b=+m[3];this.a=+m[4];}
catch(e){var c=x3dom.fields.SFColorRGBA.colorParse(str);this.r=c.r;this.g=c.g;this.b=c.b;this.a=c.a;}
return this;};x3dom.fields.MFColorRGBA=function(colorArray){if(arguments.length==0){}
else{var that=this;colorArray.map(function(c){that.push(c);},this);}};x3dom.fields.MFColorRGBA.prototype=x3dom.extend(new Array);x3dom.fields.MFColorRGBA.parse=function(str){var mc=str.match(/([+\-0-9eE\.]+)/g);var colors=[];for(var i=0,n=mc.length;i<n;i+=4){colors.push(new x3dom.fields.SFColorRGBA(+mc[i+0],+mc[i+1],+mc[i+2],+mc[i+3]));}
return new x3dom.fields.MFColorRGBA(colors);};x3dom.fields.MFColorRGBA.prototype.setValueByStr=function(str){while(this.length){this.pop();}
var mc=str.match(/([+\-0-9eE\.]+)/g);for(var i=0,n=mc.length;i<n;i+=4){this.push(new x3dom.fields.SFColor(+mc[i+0],+mc[i+1],+mc[i+2],+mc[i+3]));}};x3dom.fields.MFColorRGBA.prototype.toGL=function(){var a=[];Array.map(this,function(c){a.push(c.r);a.push(c.g);a.push(c.b);a.push(c.a);});return a;};x3dom.fields.MFRotation=function(rotArray){if(arguments.length==0){}
else{var that=this;rotArray.map(function(v){that.push(v);},this);}};x3dom.fields.MFRotation.prototype=x3dom.extend(new Array);x3dom.fields.MFRotation.parse=function(str){var mc=str.match(/([+\-0-9eE\.]+)/g);var vecs=[];for(var i=0,n=mc.length;i<n;i+=4){vecs.push(x3dom.fields.Quaternion.axisAngle(new x3dom.fields.SFVec3f(+mc[i+0],+mc[i+1],+mc[i+2]),+mc[i+3]));}
return new x3dom.fields.MFRotation(vecs);};x3dom.fields.MFRotation.prototype.setValueByStr=function(str){while(this.length){this.pop();}
var mc=str.match(/([+\-0-9eE\.]+)/g);for(var i=0,n=mc.length;i<n;i+=4){this.push(x3dom.fields.Quaternion.axisAngle(new x3dom.fields.SFVec3f(+mc[i+0],+mc[i+1],+mc[i+2]),+mc[i+3]));}};x3dom.fields.MFRotation.prototype.toGL=function(){var a=[];return a;};x3dom.fields.MFVec3f=function(vec3Array){if(arguments.length==0){}
else{var that=this;vec3Array.map(function(v){that.push(v);},this);}};x3dom.fields.MFVec3f.prototype=x3dom.extend(new Array);x3dom.fields.MFVec3f.parse=function(str){var mc=str.match(/([+\-0-9eE\.]+)/g);var vecs=[];for(var i=0,n=mc.length;i<n;i+=3){vecs.push(new x3dom.fields.SFVec3f(+mc[i+0],+mc[i+1],+mc[i+2]));}
return new x3dom.fields.MFVec3f(vecs);};x3dom.fields.MFVec3f.prototype.setValueByStr=function(str){while(this.length){this.pop();}
var mc=str.match(/([+\-0-9eE\.]+)/g);for(var i=0,n=mc.length;i<n;i+=3){this.push(new x3dom.fields.SFVec3f(+mc[i+0],+mc[i+1],+mc[i+2]));}};x3dom.fields.MFVec3f.prototype.toGL=function(){var a=[];Array.map(this,function(c){a.push(c.x);a.push(c.y);a.push(c.z);});return a;};x3dom.fields.MFVec2f=function(vec2Array){if(arguments.length==0){}
else{var that=this;vec2Array.map(function(v){that.push(v);},this);}};x3dom.fields.MFVec2f.prototype=x3dom.extend(new Array);x3dom.fields.MFVec2f.parse=function(str){var mc=str.match(/([+\-0-9eE\.]+)/g);var vecs=[];for(var i=0,n=mc.length;i<n;i+=2){vecs.push(new x3dom.fields.SFVec2f(+mc[i+0],+mc[i+1]));}
return new x3dom.fields.MFVec2f(vecs);};x3dom.fields.MFVec2f.prototype.setValueByStr=function(str){while(this.length){this.pop();}
var mc=str.match(/([+\-0-9eE\.]+)/g);for(var i=0,n=mc.length;i<n;i+=2){this.push(new x3dom.fields.SFVec2f(+mc[i+0],+mc[i+1]));}};x3dom.fields.MFVec2f.prototype.toGL=function(){var a=[];Array.map(this,function(v){a.push(v.x);a.push(v.y);});return a;};x3dom.fields.MFInt32=function(array){if(arguments.length==0){}
else{var that=this;array.map(function(v){that.push(v);},this);}};x3dom.fields.MFInt32.prototype=x3dom.extend(new Array);x3dom.fields.MFInt32.parse=function(str){var mc=str.match(/([+-]?\d+\s*){1},?\s*/g);var vals=[];for(var i=0,n=mc.length;i<n;++i){vals.push(parseInt(mc[i],10));}
return new x3dom.fields.MFInt32(vals);};x3dom.fields.MFInt32.prototype.setValueByStr=function(str){while(this.length){this.pop();}
var mc=str.match(/([+-]?\d+\s*){1},?\s*/g);for(var i=0,n=mc.length;i<n;++i){this.push(parseInt(mc[i],10));}};x3dom.fields.MFInt32.prototype.toGL=function(){var a=[];Array.map(this,function(v){a.push(v);});return a;};x3dom.fields.MFFloat=function(array){if(arguments.length==0){}
else{var that=this;array.map(function(v){that.push(v);},this);}};x3dom.fields.MFFloat.prototype=x3dom.extend(new Array);x3dom.fields.MFFloat.parse=function(str){var mc=str.match(/([+\-0-9eE\.]+)/g);var vals=[];for(var i=0,n=mc.length;i<n;i++){vals.push(+mc[i]);}
return new x3dom.fields.MFFloat(vals);};x3dom.fields.MFFloat.prototype.setValueByStr=function(str){while(this.length){this.pop();}
var mc=str.match(/([+\-0-9eE\.]+)/g);for(var i=0,n=mc.length;i<n;i++){this.push(+mc[i]);}};x3dom.fields.MFFloat.prototype.toGL=function(){var a=[];Array.map(this,function(v){a.push(v);});return a;};x3dom.fields.MFString=function(strArray){if(arguments.length==0){}
else{var that=this;strArray.map(function(v){that.push(v);},this);}};x3dom.fields.MFString.parse=function(str){var arr=[];if(str.length&&str[0]=='"'){var m,re=/"((?:[^\\"]|\\\\|\\")*)"/g;while((m=re.exec(str))){var s=m[1].replace(/\\([\\"])/,"$1");if(s!==undefined){arr.push(s);}}}
else{arr.push(str);}
return new x3dom.fields.MFString(arr);};x3dom.fields.MFString.prototype=x3dom.extend(new Array);x3dom.fields.MFString.prototype.setValueByStr=function(str){var arr=this;while(arr.length){arr.pop();}
if(str.length&&str[0]=='"'){var m,re=/"((?:[^\\"]|\\\\|\\")*)"/g;while((m=re.exec(str))){var s=m[1].replace(/\\([\\"])/,"$1");if(s!==undefined){arr.push(s);}}}
else{arr.push(str);}
return this;};x3dom.fields.MFString.prototype.toString=function(){var str="";for(var i=0;i<this.length;i++){str=str+this[i]+" ";}
return str;};x3dom.fields.SFNode=function(type){this.type=type;this.node=null;};x3dom.fields.SFNode.prototype.hasLink=function(node){return(node?(this.node===node):this.node);};x3dom.fields.SFNode.prototype.addLink=function(node){this.node=node;return true;};x3dom.fields.SFNode.prototype.rmLink=function(node){if(this.node===node){this.node=null;return true;}
else{return false;}};x3dom.fields.MFNode=function(type){this.type=type;this.nodes=[];};x3dom.fields.MFNode.prototype.hasLink=function(node){if(node){for(var i=0,n=this.nodes.length;i<n;i++){if(this.nodes[i]===node){return true;}}}
else{return(this.length>0);}
return false;};x3dom.fields.MFNode.prototype.addLink=function(node){this.nodes.push(node);return true;};x3dom.fields.MFNode.prototype.rmLink=function(node){for(var i=0,n=this.nodes.length;i<n;i++){if(this.nodes[i]===node){this.nodes.splice(i,1);return true;}}
return false;};x3dom.fields.MFNode.prototype.length=function(){return this.nodes.length;};x3dom.fields.Line=function(pos,dir)
{if(arguments.length==0)
{this.pos=new x3dom.fields.SFVec3f(0,0,0);this.dir=new x3dom.fields.SFVec3f(0,0,1);}
else
{this.pos=new x3dom.fields.SFVec3f(pos.x,pos.y,pos.z);var n=dir.length();if(n){n=1.0/n;}
this.dir=new x3dom.fields.SFVec3f(dir.x*n,dir.y*n,dir.z*n);}
this.enter=0;this.exit=0;this.hitObject=null;this.hitPoint={};this.dist=Number.MAX_VALUE;};x3dom.fields.Line.prototype.toString=function(){var str='Line: ['+this.pos.toString()+'; '+this.dir.toString()+']';return str;};x3dom.fields.Line.prototype.intersect=function(low,high)
{var isect=0.0;var out=Number.MAX_VALUE;var r,te,tl;if(this.dir.x>x3dom.fields.Eps)
{r=1.0/this.dir.x;te=(low.x-this.pos.x)*r;tl=(high.x-this.pos.x)*r;if(tl<out)
out=tl;if(te>isect)
isect=te;}
else if(this.dir.x<-x3dom.fields.Eps)
{r=1.0/this.dir.x;te=(high.x-this.pos.x)*r;tl=(low.x-this.pos.x)*r;if(tl<out)
out=tl;if(te>isect)
isect=te;}
else if(this.pos.x<low.x||this.pos.x>high.x)
{return false;}
if(this.dir.y>x3dom.fields.Eps)
{r=1.0/this.dir.y;te=(low.y-this.pos.y)*r;tl=(high.y-this.pos.y)*r;if(tl<out)
out=tl;if(te>isect)
isect=te;if(isect-out>=x3dom.fields.Eps)
return false;}
else if(this.dir.y<-x3dom.fields.Eps)
{r=1.0/this.dir.y;te=(high.y-this.pos.y)*r;tl=(low.y-this.pos.y)*r;if(tl<out)
out=tl;if(te>isect)
isect=te;if(isect-out>=x3dom.fields.Eps)
return false;}
else if(this.pos.y<low.y||this.pos.y>high.y)
{return false;}
if(this.dir.z>x3dom.fields.Eps)
{r=1.0/this.dir.z;te=(low.z-this.pos.z)*r;tl=(high.z-this.pos.z)*r;if(tl<out)
out=tl;if(te>isect)
isect=te;}
else if(this.dir.z<-x3dom.fields.Eps)
{r=1.0/this.dir.z;te=(high.z-this.pos.z)*r;tl=(low.z-this.pos.z)*r;if(tl<out)
out=tl;if(te>isect)
isect=te;}
else if(this.pos.z<low.z||this.pos.z>high.z)
{return false;}
this.enter=isect;this.exit=out;return(isect-out<x3dom.fields.Eps);};x3dom.versionInfo={version:'1.2-alpha',svnrevision:'928'};