const numeroEntrada = document.getElementById('pantalla_input');
const botonEnviar = document.getElementById('btnEnviar');
const botonBorrar = document.getElementById('btnBorrar');
const limpiarPantalla = document.getElementById('btnLimpiar');
const divRespuesta = document.getElementById('parrafoRespuesta');
let contador = document.getElementById('intentos');
const contenedorImagen = document.getElementById('imagenEstado');

let conteo = 0;
let numeroAzar = Math.floor(Math.random() * 100) + 1;

// CREAR IMÁGENES DINÁMICAMENTE
const imgEsperando = document.createElement('img');
imgEsperando.src = 'fotos/imagenCargando.png';
imgEsperando.classList.add('esperando', 'visible');

const imgCorrecto = document.createElement('img');
imgCorrecto.src = 'fotos/afirmativo.png';

const imgNegativo = document.createElement('img');
imgNegativo.src = 'fotos/negativo.png';

contenedorImagen.appendChild(imgEsperando);
contenedorImagen.appendChild(imgCorrecto);
contenedorImagen.appendChild(imgNegativo);

// MOSTRAR IMAGEN SEGÚN TIPO
const mostrarImagen = (tipo) => {
   [imgEsperando, imgCorrecto, imgNegativo].forEach(img => {
      img.classList.remove('visible');
   });

   if (tipo === 'esperando') imgEsperando.classList.add('visible');
   if (tipo === 'correcto') imgCorrecto.classList.add('visible');
   if (tipo === 'negativo') imgNegativo.classList.add('visible');
};

// MOSTRAR NÚMEROS EN PANTALLA
const iniciarPantalla = (pantallaId, botonesTeclado) => {
   let pantalla = document.getElementById(pantallaId);
   let botones = document.querySelectorAll(botonesTeclado);

   botones.forEach(boton => {
      boton.addEventListener('click', () => {
         pantalla.value += boton.value;
      });
   });
};

// LIMPIAR ÚLTIMO DÍGITO
const limpiarNumeros = () => {
   numeroEntrada.value = numeroEntrada.value.slice(0, -1);
   divRespuesta.textContent = '';
   mostrarImagen('esperando');
};

// APLICAR ESTILOS A LA RESPUESTA
const estilosRespuesta = (texto, color) => {
   divRespuesta.textContent = texto;
   divRespuesta.style.color = color;
};

// VERIFICAR SI EL NÚMERO ES VÁLIDO
const revision = (numero) => {
   return isNaN(numero) || numero < 1 || numero > 100;
};

// LÓGICA PRINCIPAL DEL JUEGO
const adivinaNumero = () => {
   let numeroUsuario = parseInt(numeroEntrada.value);

   if (revision(numeroUsuario)) {
      estilosRespuesta("⚠️ Ingresa un número entre 1 y 100", "#ff6b6b");
      mostrarImagen('negativo');
      return;
   }

   conteo++;
   contador.textContent = `Número de intentos: ${conteo}`;

   if (numeroUsuario === numeroAzar) {
      setTimeout(() => {
         estilosRespuesta("🎯 ¡Correcto!", "#66ffcc");
         mostrarImagen('correcto');
      }, 1000);

   } else if (numeroUsuario > numeroAzar) {
      setTimeout(() => {
         estilosRespuesta("🔺 El número ingresado es mayor, vuelve a intentar", "#fcd34d");
         mostrarImagen('negativo');
      }, 1000);

   } else {
      setTimeout(() => {
         estilosRespuesta("🔻 El número ingresado es menor, vuelve a intentar", "#60a5fa");
         mostrarImagen('negativo');
      }, 1000);
   }
};

// REINICIAR JUEGO
const reiniciarValores = () => {
   divRespuesta.innerHTML = '';
   conteo = 0;
   contador.textContent = `Número de intentos: ${conteo}`;
   numeroAzar = Math.floor(Math.random() * 100) + 1;
   numeroEntrada.value = '';
   mostrarImagen('esperando');
};

// INICIALIZACIÓN
iniciarPantalla('pantalla_input', 'input[type="button"]:not(#btnLimpiar)');
botonBorrar.addEventListener('click', reiniciarValores);
botonEnviar.addEventListener('click', adivinaNumero);
limpiarPantalla.addEventListener('click', limpiarNumeros);
