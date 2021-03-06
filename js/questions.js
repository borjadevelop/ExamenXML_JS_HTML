var formElement=null;
var numeroSecreto=null;
var respuestaSelect=null;
var respuestasCheckbox = [];

//**************************************************************************************************** 
//Después de cargar la página (onload) se definen los eventos sobre los elementos entre otras acciones.
window.onload = function(){ 

 //CORREGIR al apretar el botón
 formElement=document.getElementById('myform');
 formElement.onsubmit=function(){
   borrarCorreccion();
   corregirNumber();
   corregirSelect();
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
 xhttp.open("GET", "xml/preguntas.xml", true);
 xhttp.send();
}

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
 var tituloSelect=xmlDoc.getElementsByTagName("title")[0].childNodes[0].nodeValue;
 ponerDatosInputHtml(textDiv);
 numeroSecreto=parseInt(xmlDoc.getElementsByTagName("answer")[0].childNodes[0].nodeValue);
 
  //TEXT 2 
 //Recuperamos el título y la respuesta correcta de Input, guardamos el número secreto
 var tituloSelect=xmlDoc.getElementsByTagName("title")[0].childNodes[0].nodeValue;
 ponerDatosInputHtml(textDiv1);
 numeroSecreto=parseInt(xmlDoc.getElementsByTagName("answer")[2].childNodes[0].nodeValue);
 
 
 
 //SELECT
 //Recuperamos el título y las opciones, guardamos la respuesta correcta
 var tituloSelect=xmlDoc.getElementsByTagName("title")[2].childNodes[0].nodeValue;
 var opcionesSelect = [];
 var nopt = xmlDoc.getElementById("bodatoda005").getElementsByTagName('option').length;
  for (i = 0; i < nopt; i++) { 
    opcionesSelect[i] = xmlDoc.getElementById("bodatoda005").getElementsByTagName('option')[i].childNodes[0].nodeValue;
 }
 ponerDatosSelectHtml(tituloSelect,opcionesSelect);
 respuestaSelect=parseInt(xmlDoc.getElementsByTagName("answer")[0].childNodes[0].nodeValue);

 //SELECT
 //Recuperamos el título y las opciones, guardamos la respuesta correcta
 var tituloSelect=xmlDoc.getElementsByTagName("title")[2].childNodes[0].nodeValue;
 var opcionesSelect = [];
 var nopt = xmlDoc.getElementById("bodatoda005").getElementsByTagName('option').length;
  for (i = 0; i < nopt; i++) { 
    opcionesSelect[i] = xmlDoc.getElementById("bodatoda005").getElementsByTagName('option')[i].childNodes[0].nodeValue;
 }
 ponerDatosSelectHtml(tituloSelect,opcionesSelect);
 respuestaSelect=parseInt(xmlDoc.getElementsByTagName("answer")[0].childNodes[0].nodeValue);

 
 
 
 //CHECKBOX
 //Recuperamos el título y las opciones, guardamos las respuestas correctas
 var tituloCheckbox = xmlDoc.getElementsByTagName("title")[2].childNodes[0].nodeValue;
 var opcionesCheckbox = [];
 var nopt = xmlDoc.getElementById("bodatoda003").getElementsByTagName('option').length;
 for (i = 0; i < nopt; i++) { 
    opcionesCheckbox[i]=xmlDoc.getElementById("bodatoda003").getElementsByTagName('option')[i].childNodes[0].nodeValue;
 }  
 ponerDatosCheckboxHtml(tituloCheckbox,opcionesCheckbox);
 var nres = xmlDoc.getElementById("bodatoda003").getElementsByTagName('answer').length;
 for (i = 0; i < nres; i++) { 
  respuestasCheckbox[i]=xmlDoc.getElementById("bodatoda003").getElementsByTagName("answer")[i].childNodes[0].nodeValue;
 }
}

//****************************************************************************************************
//implementación de la corrección
function corregirNumber(){
  var s=formElement.elements[0].value;     
  if (s==numeroSecreto) darRespuestaHtml("P1: Exacto!");
  else {
    if (s>numeroSecreto) darRespuestaHtml("P1: Te has pasado");
    else darRespuestaHtml("P1: Te has quedado corto");
  }
}

function corregirSelect(){
  var sel = formElement.elements[1];  
  if (sel.selectedIndex==respuestaSelect) darRespuestaHtml("P2: Select correcto");
  else darRespuestaHtml("P2: Select incorrecto");
}

function corregirCheckbox(){
  var f=document.getElementById('myform');
  var escorrecta = [];
  for (i = 0; i < f.color.length; i++) {
   if (f.color[i].checked) {
    escorrecta[i]=false;     
    for (j = 0; j < respuestasCheckbox.length; j++) {
     if (i==respuestasCheckbox[j]) escorrecta[i]=true;
    }
   } 
  }
  for (i = 0; i < f.color.length; i++) {
   
   if (f.color[i].checked) {
    if (escorrecta[i]) {
     darRespuestaHtml("P3: "+i+" correcta");    
    } else {
     darRespuestaHtml("P3: "+i+" incorrecta");
    }   
   }
  }
}

//****************************************************************************************************
// poner los datos recibios en el HTML
function ponerDatosInputHtml(t){
 document.getElementById("textDiv").innerHTML = t;
}

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
