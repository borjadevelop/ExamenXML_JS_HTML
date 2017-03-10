var formElement=null;
var numeroSecreto=null;
var respuestaSelect=null;
var respuestaSelect1=null;
var respuestasRadio=null;
var respuestasRadio1=null;
var textSecreto2 = null;
var textSecreto1 = null;
var respuestaMulti = [];
var respuestaMulti1 = [];

var respuestasCheckbox = [];
var respuestasCheckbox1 = [];


//**************************************************************************************************** 
//Después de cargar la página (onload) se definen los eventos sobre los elementos entre otras acciones.
window.onload = function(){ 



 //CORREGIR al apretar el botón
 formElement=document.getElementById('myform');
 formElement.onsubmit=function(){
   


    document.getElementsByClassName("wil2")[0].style.display = "block";

   borrarCorreccion();
   
   corregirText1();
   corregirText2();
   corregirSelect();
   corregirSelect1();
   corregirCheckbox();  
   return false;
 }
 



 //LEER XML de xml/preguntas.xml
 var xhttp = new XMLHttpRequest();
 xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
   gestionarXml(this);
  }
 };
 xhttp.open("GET", "https://rawgit.com/borjadevelop/ExamenXML_JS_HTML/master/xml/preguntas.xml", true);
 xhttp.send();


 // Metodo para quitar la pantalla de inicio y entrar al test
 document.onkeydown = quitarPantalla;





  document.getElementById("info").onclick = function () {
    
    document.getElementsByClassName("divinfodentro")[0].style.display = "block";
    document.getElementsByClassName("hidem")[0].style.display = "block";
    document.getElementsByClassName("divabout")[0].style.display = "none";
    
   
  }


    document.getElementById("about").onclick = function () {
    document.getElementsByClassName("divabout")[0].style.display = "block";
    document.getElementsByClassName("divaboutdentro")[0].style.display = "block";
    document.getElementsByClassName("hidem")[0].style.display = "block";
    document.getElementsByClassName("divinfodentro")[0].style.display = "none";
    
   
  }

  document.getElementById("hidem").onclick = function () {
    document.getElementsByClassName("divinfodentro")[0].style.display = "none";
       document.getElementsByClassName("divaboutdentro")[0].style.display = "none";
    document.getElementsByClassName("divabout")[0].style.display = "none";
    document.getElementsByClassName("hidem")[0].style.display = "none";

    
  }



}







// JAVASCRIPT PARA EL BOTON DE DEL PRINCIPIO.

window.addEventListener('load', function ()
{
  var xm = 0, ym = 0;
  var noclick = function(elem)
  {
    var x0, y0, px, py, nw, nh, dp;
    this.init = function ()
    {
      x0 = elem.offsetLeft;
      y0 = elem.offsetTop;
      px = 0;
      py = 0;
      nw = elem.offsetWidth / 2;
      nh = elem.offsetHeight / 2;
      dp = Math.max(elem.offsetWidth, elem.offsetHeight) * 0.8;
    }
    this.anim = function()
    {
      var xmm = xm - x0 - nw;
      var ymm = ym - y0 - nh;
      var dx = xmm - px;
      var dy = ymm - py;
      var d = Math.sqrt(dx * dx + dy * dy);
      px -= px * 0.2;
      py -= py * 0.2;
      if (d < dp && d > 0 )
      {
        px = xmm - (dp * (xmm - px) / d);
        py = ymm - (dp * (ymm - py) / d);
      }
      elem.style.transform = 'matrix(1,0,0,1,' + px + ',' + py + ')';
    }
  }
  
  var button = {};
  noclick.call(button, document.getElementById("button"));
  
  var run = function ()
  {
    requestAnimationFrame(run);
    button.anim();
  }
  var resize = function()
  {
    button.init();
  }
  window.addEventListener('resize', resize, false);
  window.addEventListener('mousemove', function(e)
  {
    xm = e.clientX;
    ym = e.clientY;
  }, false);
  resize();
  run();
  window.ondragstart = function() { return false; } 
}, false);





//****************************************************************************************************
// Recuperamos los datos del fichero XML xml/preguntas.xml
// xmlDOC es el documento leido XML. 
function gestionarXml(dadesXml){
 var xmlDoc = dadesXml.responseXML; //Parse XML to xmlDoc
 
 //NUMBER
 //Recuperamos el título y la respuesta correcta de Input, guardamos el número secreto
 var tituloInput=xmlDoc.getElementsByTagName("title")[0].childNodes[0].nodeValue;
 ponerDatosInputHtml(textDiv);
 numeroSecreto=parseInt(xmlDoc.getElementsByTagName("answer")[0].childNodes[0].nodeValue);
 
 //TEXT 1 
 //Recuperamos el título y la respuesta correcta de Input, guardamos el número secreto
 var tituloSelect=xmlDoc.getElementById("bodatoda001").getElementsByTagName("title")[0].childNodes[0].nodeValue;
 ponerDatosInputHtml(tituloSelect);
 textSecreto1=xmlDoc.getElementById('bodatoda001').getElementsByTagName("answer")[0].childNodes[0].nodeValue;
 
  //TEXT 2 
 //Recuperamos el título y la respuesta correcta de Input, guardamos el número secreto
 var tituloSelect=xmlDoc.getElementById("bodatoda002").getElementsByTagName("title")[0].childNodes[0].nodeValue;
 ponerDatostextHtml(tituloSelect);
 textSecreto2=xmlDoc.getElementById('bodatoda002').getElementsByTagName("answer")[0].childNodes[0].nodeValue;
 
 
 
 //SELECT
 //Recuperamos el título y las opciones, guardamos la respuesta correcta
 var tituloSelect=xmlDoc.getElementById("bodatoda005").getElementsByTagName("title")[0].childNodes[0].nodeValue;
 var opcionesSelect = [];
 var nopt = xmlDoc.getElementById("bodatoda005").getElementsByTagName('option').length;
  for (var i = 0; i < nopt; i++) { 
    opcionesSelect[i] = xmlDoc.getElementById("bodatoda005").getElementsByTagName('option')[i].childNodes[0].nodeValue;
 }
 ponerDatosSelectHtml(tituloSelect,opcionesSelect);
 respuestaSelect=xmlDoc.getElementById("bodatoda005").getElementsByTagName("answer")[0].childNodes[0].nodeValue;

//SELECT
 //Recuperamos el título y las opciones, guardamos la respuesta correcta
 var tituloSelect=xmlDoc.getElementById("bodatoda010").getElementsByTagName("title")[0].childNodes[0].nodeValue;
 var opcionesSelect = [];
 var nopt = xmlDoc.getElementById("bodatoda010").getElementsByTagName('option').length;
  for (var i = 0; i < nopt; i++) { 
    opcionesSelect[i] = xmlDoc.getElementById("bodatoda010").getElementsByTagName('option')[i].childNodes[0].nodeValue;
 }
 ponerDatosSelectHtml1(tituloSelect,opcionesSelect);
 respuestaSelect1= xmlDoc.getElementById("bodatoda010").getElementsByTagName("answer")[0].childNodes[0].nodeValue;


 
 
 
 //CHECKBOX
 //Recuperamos el título y las opciones, guardamos las respuestas correctas
 var tituloCheckbox = xmlDoc.getElementsByTagName("title")[2].childNodes[0].nodeValue;
 var opcionesCheckbox = [];
 var nopt = xmlDoc.getElementById("bodatoda003").getElementsByTagName('option').length;
 for (var i = 0; i < nopt; i++) { 
    opcionesCheckbox[i]=xmlDoc.getElementById("bodatoda003").getElementsByTagName('option')[i].childNodes[0].nodeValue + "<br>";
 }  
 ponerDatosCheckboxHtml(tituloCheckbox,opcionesCheckbox);
 var nres = xmlDoc.getElementById("bodatoda003").getElementsByTagName('answer').length;
 for (var i = 0; i < nres; i++) { 
  respuestasCheckbox[i]=xmlDoc.getElementById("bodatoda003").getElementsByTagName("answer")[i].innerHTML;
 }

 //CHECKBOX
 //Recuperamos el título y las opciones, guardamos las respuestas correctas
 var tituloCheckbox = xmlDoc.getElementById("bodatoda004").getElementsByTagName("title")[0].childNodes[0].nodeValue;
 var opcionesCheckbox1 = [];
 var nopt = xmlDoc.getElementById("bodatoda004").getElementsByTagName('option').length;
 for (i = 0; i < nopt; i++) { 
    opcionesCheckbox1[i]=xmlDoc.getElementById("bodatoda004").getElementsByTagName('option')[i].childNodes[0].nodeValue + "<br>";
 }  
 ponerDatosCheckboxHtml1(tituloCheckbox,opcionesCheckbox1);
 var nres = xmlDoc.getElementById("bodatoda004").getElementsByTagName('answer').length;
 for (i = 0; i < nres; i++) { 
  respuestasCheckbox1[i]=xmlDoc.getElementById("bodatoda004").getElementsByTagName("answer")[i].innerHTML;
 }


//bodatoda007
	
 //RADIO
 //Recuperamos el título y las opciones, guardamos las respuestas correctas
 var tituloRadio = xmlDoc.getElementById("bodatoda006").getElementsByTagName("title")[0].childNodes[0].nodeValue;
 var opcionesRadio = [];
 var nopt = xmlDoc.getElementById("bodatoda006").getElementsByTagName('option').length;
 for (i = 0; i < nopt; i++) { 
    opcionesRadio[i]=xmlDoc.getElementById("bodatoda006").getElementsByTagName('option')[i].childNodes[0].nodeValue+ "<br>";
 }  
 ponerDatosradio(tituloRadio,opcionesRadio);
 var nres = xmlDoc.getElementById("bodatoda006").getElementsByTagName('answer').length;
 for (i = 0; i < nres; i++) { 
  respuestasRadio=parseInt(xmlDoc.getElementById("bodatoda006").getElementsByTagName("answer")[0].childNodes[0].nodeValue)
 }

  //RADIO
 //Recuperamos el título y las opciones, guardamos las respuestas correctas
 var tituloRadio = xmlDoc.getElementById("bodatoda007").getElementsByTagName("title")[0].childNodes[0].nodeValue;
 var opcionesRadio = [];
 var nopt = xmlDoc.getElementById("bodatoda007").getElementsByTagName('option').length;
 for (i = 0; i < nopt; i++) { 
    opcionesRadio[i]=xmlDoc.getElementById("bodatoda007").getElementsByTagName('option')[i].childNodes[0].nodeValue+ "<br>";
 }  
 ponerDatosradio1(tituloRadio,opcionesRadio);
 var nres = xmlDoc.getElementById("bodatoda007").getElementsByTagName('answer').length;
 for (i = 0; i < nres; i++) { 
  respuestasRadio1=parseInt(xmlDoc.getElementById("bodatoda007").getElementsByTagName("answer")[0].childNodes[0].nodeValue)
 }

 
 
 //MULTI
 //Recuperamos el título y las opciones, guardamos la respuesta correcta
 var tituloSelect=xmlDoc.getElementById("bodatoda008").getElementsByTagName("title")[0].childNodes[0].nodeValue;
 var opcionesSelect = [];
 var nopt = xmlDoc.getElementById("bodatoda008").getElementsByTagName('option').length;
  for (var i = 0; i < nopt; i++) { 
    opcionesSelect[i] = xmlDoc.getElementById("bodatoda008").getElementsByTagName('option')[i].childNodes[0].nodeValue;
 }
 ponerDatosMultiHtml(tituloSelect,opcionesSelect);
 var nresp = xmlDoc.getElementById("bodatoda009").getElementsByTagName('answer').length;
	for(var i = 0; i< nresp; i++){
	respuestaMulti[i] = xmlDoc.getElementById("bodatoda009").getElementsByTagName("answer")[i].innerHTML; 
	}
 
 
 
//MULTI
 //Recuperamos el título y las opciones, guardamos la respuesta correcta
 var tituloSelect=xmlDoc.getElementById("bodatoda009").getElementsByTagName("title")[0].childNodes[0].nodeValue;
 var opcionesSelect = [];
 var nopt = xmlDoc.getElementById("bodatoda009").getElementsByTagName('option').length;
  for (var i = 0; i < nopt; i++) { 
    opcionesSelect[i] = xmlDoc.getElementById("bodatoda009").getElementsByTagName('option')[i].childNodes[0].nodeValue;
 }
 ponerDatosMultiHtml1(tituloSelect,opcionesSelect);
 
   var nresp = xmlDoc.getElementById("bodatoda009").getElementsByTagName('answer').length;
	for(var i = 0; i< nresp; i++){
		respuestaMulti1[i] = parseInt(xmlDoc.getElementById("bodatoda009").getElementsByTagName("answer")[i].childNodes[0].nodeValue); 
	}
		
 /*
  var respuestas = [];
   var nresp = xmlDoc.getElementById("bodatoda009").getElementsByTagName('answer').length;
	for(var i = 0; i< nresp; i++){
		respuestas[i] = xmlDoc.getElementById("bodatoda009").getElementsByTagName("answer")[i].childNodes[0].nodeValue; 
		
	}

 */
}

//****************************************************************************************************
//implementación de la corrección

function corregirText1(){
  var s =formElement.elements[0].value;   
  
  if (s == "cachichen" ) darRespuestaHtml("P1: Exacto!! La respuesta es Cachi Chen");
  else {
    if (s!=textSecreto1) darRespuestaHtml("P1: ERROR! Creo que va siendo hora de que aprendas un poco de chino!!");
    else darRespuestaHtml("P1: No has señalado nada.");
  }
}



function corregirText2(){
 var s = formElement.elements[1].value;     
  if (s== "segundo") darRespuestaHtml("P2: Exacto!! Quedar&iacuteas en segunda posici&oacuten.");
  else {
    if (s!=textSecreto2) darRespuestaHtml("P2: Eres un poco corto.");
    else darRespuestaHtml("P2: No has señalado nada");
  }
}




function corregirSelect(){
  var sel = formElement.elements[4].value;  
  if (sel.selectedIndex==respuestaSelect){
	  darRespuestaHtml("P5: Select correcto");
	  nota +=1.0;
  }
  else darRespuestaHtml("P5: Select incorrecto");
}

function corregirSelect1(){
  var sel = formElement.elements[5].value;  
  if (sel.selectedIndex==respuestaSelect1){ 
  darRespuestaHtml("P6: Select correcto") ;
  nota +=1.0;
  }
  else darRespuestaHtml("P6: Select incorrecto");

  }
  
  

function corregirCheckbox(){
  //Para cada opción mira si está checkeada, si está checkeada mira si es correcta y lo guarda en un array escorrecta[]
  var f=formElement;
  var escorrecta = [];
  for (i = 0; i < f.color.length; i++) {  //"color" es el nombre asignado a todos los checkbox
   if (f.color[i].checked) {
    escorrecta[i]=false;     
    for (j = 0; j < respuestasCheckbox.length; j++) {
     if (i==respuestasCheckbox[j]) escorrecta[i]=true;
    }
    //si es correcta sumamos y ponemos mensaje, si no es correcta restamos y ponemos mensaje.
    if (escorrecta[i]) {
     nota +=1.0/respuestasCheckbox.length;  //dividido por el número de respuestas correctas   
     darRespuestaHtml("Checkbox1: "+i+" correcta");    
    } else {
     nota -=1.0/respuestasCheckbox.length;  //dividido por el número de respuestas correctas   
     darRespuestaHtml("Checkbox1: "+i+" incorrecta");
    }   
   } 
  }
}



/*
function corregirCheckbox(){
  //Para cada opción mira si está checkeada, si está checkeada mira si es correcta y lo guarda en un array escorrecta[]
  var f=formElement;
  var escorrecta = [];
  for (i = 0; i < f.123.length; i++) {  //"123" es el nombre asignado a todos los checkbox
   if (f.123[i].checked) {
    escorrecta[i]=false;     
    for (j = 0; j < respuestasCheckbox1.length; j++) {
     if (i==respuestasCheckbox1[j]) escorrecta[i]=true;
    }
    //si es correcta sumamos y ponemos mensaje, si no es correcta restamos y ponemos mensaje.
    if (escorrecta[i]) {
     nota +=1.0/respuestasCheckbox1.length;  //dividido por el número de respuestas correctas   
     darRespuestaHtml("P3: "+i+" correcta");    
    } else {
     nota -=1.0/respuestasCheckbox1.length;  //dividido por el número de respuestas correctas   
     darRespuestaHtml("P3: "+i+" incorrecta");
    }   
   } 
  }
}
*/





/*

function corregirMultiple(){
  //Para cada opción mira si está seleccionada, si está seleccionada mira si es correcta y lo guarda en un array escorrecta[]
  var f=formElement;
  var escorrecta = [];
  for (i = 0; i < f.selm1.length; i++) {  //"selm1" es el nombre asignado a todos los checkbox
   if (f.selm1[i].selected) {
    escorrecta[i]=false;     
    for (j = 0; j < respuestaMulti.length; j++) {
     if (i==respuestaMulti[j]) escorrecta[i]=true;
    }
    //si es correcta sumamos y ponemos mensaje, si no es correcta restamos y ponemos mensaje.
    if (escorrecta[i]) {
     nota +=1.0/respuestaMulti.length;  //dividido por el número de respuestas correctas   
     darRespuestaHtml("P3: "+i+" correcta");    
    } else {
     nota -=1.0/respuestaMulti.length;  //dividido por el número de respuestas correctas   
     darRespuestaHtml("P3: "+i+" incorrecta");
    }   
   } 
  }
}


function corregirMultiple1(){
  //Para cada opción mira si está seleccionada, si está seleccionada mira si es correcta y lo guarda en un array escorrecta[]
  var f=formElement;
  var escorrecta = [];
  for (i = 0; i < f.selm2.length; i++) {  //"selm2" es el nombre asignado a todos los checkbox
   if (f.selm2[i].selected) {
    escorrecta[i]=false;     
    for (j = 0; j < respuestaMulti1.length; j++) {
     if (i==respuestaMulti1[j]) escorrecta[i]=true;
    }
    //si es correcta sumamos y ponemos mensaje, si no es correcta restamos y ponemos mensaje.
    if (escorrecta[i]) {
     nota +=1.0/respuestaMulti1.length;  //dividido por el número de respuestas correctas   
     darRespuestaHtml("P3: "+i+" correcta");    
    } else {
     nota -=1.0/respuestaMulti1.length;  //dividido por el número de respuestas correctas   
     darRespuestaHtml("P3: "+i+" incorrecta");
    }   
   } 
  }
}






/**/

//****************************************************************************************************
// poner los datos recibios en el HTML
function ponerDatosInputHtml(t){
 document.getElementById("textDiv").innerHTML = t;
}


// PONER DATOS TEXT
ponerDatostextHtml
function ponerDatostextHtml(t){
 document.getElementById("textDiv1").innerHTML = t;
}

function ponerDatosInputHtml(t){
 document.getElementById("textDiv").innerHTML = t;
}


//PONER DATOS SELECT
function ponerDatosSelectHtml(t,opt){
  document.getElementById("tituloSelect").innerHTML=t;
  var select = document.getElementsByTagName("select")[0];
  for (i = 0; i < opt.length; i++) { 
    var option = document.createElement("option");
    option.text = opt[i];
    option.value=i+1;
    select.options.add(option);
 }  
}

function ponerDatosSelectHtml1(t,opt){
  document.getElementById("tituloSelect1").innerHTML=t;
  var select = document.getElementsByTagName("select")[1];
  for (i = 0; i < opt.length; i++) { 
    var option = document.createElement("option");
    option.text = opt[i];
    option.value=i+1;
    select.options.add(option);
 }  
}


//PONER DATOS CHECKBOX
function ponerDatosCheckboxHtml(t,opt){
 var checkboxContainer=document.getElementById('checkboxDiv');
 var h3 = document.createElement("h3");
 h3.innerHTML = t;
 checkboxContainer.appendChild(h3); 
 for (i = 0; i < opt.length; i++) { 
    var input = document.createElement("input");
    var label = document.createElement("label");
    label.innerHTML=opt[i];
    label.setAttribute("for", "color_"+i);
    input.type="checkbox";
    input.name="color";
    input.id="color_"+i;;    
    checkboxContainer.appendChild(input);
    checkboxContainer.appendChild(label);
 }  
}


function ponerDatosCheckboxHtml1(t,opt){
 var checkboxContainer=document.getElementById('checkboxDiv1');
 var h3 = document.createElement("h3");
 h3.innerHTML = t;
 checkboxContainer.appendChild(h3); 
 for (i = 0; i < opt.length; i++) { 
    var input = document.createElement("input");
    var label = document.createElement("label");
    label.innerHTML=opt[i];
    label.setAttribute("for", "123_"+i);
    input.type="checkbox";
    input.name="123";
    input.id="123_"+i;;    
    checkboxContainer.appendChild(input);
    checkboxContainer.appendChild(label);
 }  
}

//PONER DATOS RADIO

function ponerDatosradio(t,opt){
 var radioContainer=document.getElementById('radio');
 var h3 = document.createElement("h3");
 h3.innerHTML = t;
 radioContainer.appendChild(h3); 
 for (i = 0; i < opt.length; i++) { 
    var input = document.createElement("input");
    var label = document.createElement("label");
    label.innerHTML=opt[i];
    label.setAttribute("for", "radio1_"+i);
    input.type="radio";
    input.name="radio1";
    input.id="radio1_"+i;;    
    radioContainer.appendChild(input);
    radioContainer.appendChild(label);
	
 }  
}

function ponerDatosradio1(t,opt){
 var radioContainer=document.getElementById('radio1');
 var h3 = document.createElement("h3");
 h3.innerHTML = t;
 radioContainer.appendChild(h3); 
 for (i = 0; i < opt.length; i++) { 
    var input = document.createElement("input");
    var label = document.createElement("label");
    label.innerHTML=opt[i];
    label.setAttribute("for", "radio2_"+i);
    input.type="radio";
    input.name="radio2";
    input.id="radio2_"+i;;    
    radioContainer.appendChild(input);
    radioContainer.appendChild(label);
	
 }  
}


//PONER DATOS MULTI

function ponerDatosMultiHtml(t,opt){
  document.getElementById("tituloMulti").innerHTML=t;
  var select = document.getElementsByTagName("select")[2];
  for (i = 0; i < opt.length; i++) { 
    var option = document.createElement("option");
    option.text = opt[i];
    option.value=i+1;
    select.options.add(option);
 }  
}

function ponerDatosMultiHtml1(t,opt){
  document.getElementById("tituloMulti1").innerHTML=t;
  var select = document.getElementsByTagName("select")[3];
  for (i = 0; i < opt.length; i++) { 
    var option = document.createElement("option");
    option.text = opt[i];
    option.value=i+1;
    select.options.add(option);
 }  
}

//****************************************************************************************************
//Gestionar la presentación de las respuestas
function darRespuestaHtml(r){
 var resDiv=document.getElementById('resultadosDiv');
 var p = document.createElement("p");
 var node = document.createTextNode(r);
 p.appendChild(node);
 resDiv.appendChild(p);
}

function borrarCorreccion(){
   var resDiv=document.getElementById('resultadosDiv');
   resDiv.innerHTML = "";
}







//**************************************************************
//GESTIONAR LA PANTALLA DE INICIO. 

function quitarPantalla(){

    document.getElementsByClassName("divdeForm")[0].style.display = "block";
    document.getElementsByClassName("wil1")[0].style.display = "block";
    document.getElementsByClassName("h2")[0].style.display = "none";
    document.getElementsByClassName("panico")[0].style.display = "none";
    document.getElementsByClassName("inset")[0].style.display = "none";
 


    
}

//f = document.getElementById('form');