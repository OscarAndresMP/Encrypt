
//variables donde se captura los botones
const btnEncrypt = document.querySelector('.btn-encrypt');
const btnDecrypt = document.querySelector('.btn-decrypt');
const btncopy = document.querySelector('.btn-encrypt');
const toastr = document.querySelector('#toastr');


//funcion para poder encriptar pasadole parametro = la frese a encriptar
function Encriptar(e) {
    const element = [];
    e = e.split(""); //toma la frase enecriptada y la comvierte en arreglo separada por caracter
    for (let i = 0; i < e.length; i++) { // recorro el arreglo, se declaran condicionales para poder detectar vocales y cambiarlas por el encriptado
        
        
        if(e[i] === 'a'){
            element.push('ai');// se creo un arreglo vacio y pocada vocal cambiada se agrega al nuevo arreglo
        }
        else if(e[i] === 'e'){
            element.push('enter');
        }
        else if(e[i] === 'i'){
            element.push('imes');
        }
        else if(e[i] === 'o'){
            element.push('ober');
        }
        else if(e[i] === 'u'){
            element.push('ufat');
        }
        else{
            element.push(e[i]);// si no se encuentra vocal se agrega al nuevo arreglo
        }
    }
    TagText('#text2', element.join(''));// se manda a llamar a la funcion para escribir el resultado, mandando el arreglo con la frase ya encriptada
    TagDelete();
    toastr.style.background = '#00ca07b3';
    openToastr();
    TagText('#toastr', 'Texto Encriptado!!');
    CleanBox();
}

//funcion para desencriptar pasando el parametro = la frese encriptada
function Desencriptar(e) {
    
    //se toma la frase encriptada y se reemplaza por medio expresiones regulares para poder desencriptar
    e = e.replace(/ai/g, "a");
    e = e.replace(/enter/g, "e");
    e = e.replace(/imes/g, "i");
    e = e.replace(/ober/g, "o");
    e = e.replace(/ufat/g, "u");
    
    TagText('#text2', e);
    TagDelete();
    CleanBox();
}




//fincion para poder copiar el texto ya encriptado
function TextoCopy(){
    let textCopy = document.querySelector('#text2');
    let btnCopy = document.querySelector('.btn-copy');
    navigator.clipboard.writeText(textCopy.textContent);
    btnCopy.textContent = 'Copied';
}



//funcion para poder mandar o escribir el resultado en cualquier etiqueta del html se mandan dos parametros la etiqueta y contenido
function TagText(elemento, texto) {
    let txt = document.querySelector(elemento);
    txt.innerHTML = texto;
    return;
}

//funcion para poder limpiar las zonas de texto
function TagDelete() {
    let btnCopy = document.querySelector('.btn-copy');
    const img = document.querySelector('.logo2');
    const textRes = document.querySelector('#text2');
    const txt = document.querySelector('.message');
    const txt2 = document.querySelector('.message2');

    img.style.display = 'none';
    txt.style.display = 'none';
    txt2.style.display = 'none';

    btnCopy.style.display = 'inline';
    textRes.style.display = 'inline';
    btnCopy.textContent = 'Copy';
}

function CleanBox(){
    const clean = document.querySelector('textarea');
    clean.value = '';
}


//funcion para ver si hay letras mayuculas, acentos y caracteres especiales atraves de funciones y expreciones regulares
function UpperCaseText(e){
    const mayus = e.split('').some(letra => letra === letra.toUpperCase() && letra !== letra.toLowerCase());
    const regex = /[`áéíúó!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/g;
    const regex2 = regex.test(e);
    if(mayus === true || regex2 === true){
        toastr.style.background = '#ff0000c7';
        openToastr();
        TagText('#toastr', 'Solo letras minusculas sin acentos y caracteres');
    }
    else{
        Encriptar(e);
    }
}

//funcion para ver mayusculas y caracteres especilaes, acentos en el texto que se desencriptar
function UpperCaseTex(e){
    const mayus = e.split('').some(letra => letra === letra.toUpperCase() && letra !== letra.toLowerCase());
    const regex = /[`áéíúó!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/g;
    const regex2 = regex.test(e);
    if(mayus === true || regex2 === true){
        toastr.style.background = '#ff0000c7';
        openToastr();
        TagText('#toastr', 'Solo letras minusculas sin acentos y caracteres');
    }
    else{
        Desencriptar(e);
    }
}






//funcion flecha que se ectiva con el evento click que manda a llamar a la funcion encriptar y cambia el stilo de la etiquetas html
btnEncrypt.addEventListener('click', ()=>{
    const t = document.getElementById('textarea').value;
    if(t === ''){
        toastr.style.background = '#0064fac5';
        openToastr();
        TagText('#toastr', 'Ingrese el texto');
    }
    else{
        UpperCaseText(t);
    }
    
});


//funcion de flecha que se activa con el evento click que mada a llamar la funcion desencriptar
btnDecrypt.addEventListener('click', ()=> { 
    const t2 = document.getElementById('textarea').value;
    let btnCopy = document.querySelector('.btn-copy');

    if(t2 === ''){
        toastr.style.background = '#0064fac5';
        openToastr();
        TagText('#toastr', 'Ingrese el texto');
    }
    else{
        btnCopy.textContent = 'Copy'; 
        UpperCaseTex(t2);
    }
});


//funcion felcha para cambiar el estilo del alert tipo toastr
const openToastr = ()=> {
    toastr.style.display = 'block';
    closeToastr();
}


//funcion tipo flecha para agregrarle el tiempo de duracion al alert tipo toastr
const closeToastr = ()=> {
    setTimeout(()=>{
        toastr.style.display = 'none';
    }, 3500);
}




