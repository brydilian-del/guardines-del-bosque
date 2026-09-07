const niveles = [
  { icono:'💧', nombre:'Cuidado del agua', color:'agua', tipo:'preguntas', descripcion:'Ahorro, ríos limpios y uso responsable.', preguntas:[
    { texto:'Mientras te cepillas los dientes, ¿qué haces?', opciones:['Dejo la llave abierta','Cierro la llave','Uso más agua'], correcta:1 },
    { texto:'Encuentras basura junto al río. ¿Qué acción ayuda?', opciones:['La dejo allí','La empujo al agua','La recojo y la separo'], correcta:2 },
    { texto:'¿Cuál es una forma de ahorrar agua?', opciones:['Reparar una llave que gotea','Jugar con la manguera','Lavar la acera con agua'], correcta:0 },
    { texto:'¿Qué puede contaminar un río?', opciones:['Una planta creciendo en la orilla','Aceite y productos químicos','Una piedra limpia'], correcta:1 },
    { texto:'Cuando lavas los platos, ¿qué ayuda a cuidar el agua?', opciones:['Dejar la llave abierta','Usar solo el agua necesaria','Jugar con el chorro'], correcta:1 }
  ] },
  { icono:'🌳', nombre:'Protección de los bosques', color:'bosques', tipo:'parejas', descripcion:'Encuentra parejas en dos tableros del bosque.', parejas:[['🌱','Semilla'],['🌳','Árbol'],['🦉','Búho'],['🍎','Fruto'],['🦊','Zorro'],['🐻','Oso'],['🍄','Hongo'],['🌲','Pino']], parejasExtra:[['🐜','Hormiga','Pequeña; vive en colonias y ayuda a mover la tierra'],['🐘','Elefante','Grande; protege los caminos y dispersa semillas'],['🐍','Serpiente','Mediana; controla poblaciones y se mueve sin patas'],['🐦','Colibrí','Pequeño; visita flores y ayuda a polinizarlas']], preguntas:[
    { texto:'¿Por qué son importantes los árboles?', opciones:['Dan oxígeno y hogar a animales','Solo sirven de adorno','Ensucian el aire'], correcta:0 },
    { texto:'¿Qué significa reforestar?', opciones:['Cortar árboles','Plantar árboles donde faltan','Contaminar el suelo'], correcta:1 },
    { texto:'Para proteger un bosque debemos...', opciones:['Dejar basura','Respetar plantas y animales','Encender fogatas en cualquier lugar'], correcta:1 }
  ] },
  { icono:'♻️', nombre:'Reciclaje', color:'reciclaje', tipo:'sopa', descripcion:'Separa residuos y descubre sus recipientes.', palabras:['PAPEL','VIDRIO','LATA','PLASTICO','AGUA','BOSQUE','TIERRA','ENERGIA'], preguntas:[
    { texto:'¿Dónde colocarías una botella de plástico limpia?', opciones:['Recipiente de reciclaje','En el río','En el suelo'], correcta:0 },
    { texto:'¿Qué residuo va con los restos de comida?', opciones:['Una lata','Una cáscara de banano','Una botella de vidrio'], correcta:1 },
    { texto:'Antes de reciclar una lata conviene...', opciones:['Dejarla llena','Enjuagarla y separarla','Romperla y esconderla'], correcta:1 }
  ] },
  { icono:'⚡', nombre:'Ahorro de energía', color:'energia', tipo:'ordenar', descripcion:'Electricidad responsable y energías renovables.', ordenCorrecto:['Apagar la luz','Desconectar cargadores','Usar luz solar','Ahorrar energía'], preguntas:[
    { texto:'Sales de una habitación. ¿Qué haces?', opciones:['Dejo la luz encendida','Apago la luz','Enciendo otra luz'], correcta:1 },
    { texto:'¿Cuál es una energía renovable?', opciones:['Solar','Carbón','Petróleo'], correcta:0 },
    { texto:'Para ahorrar electricidad conviene...', opciones:['Desconectar cargadores que no usamos','Abrir el refrigerador sin necesidad','Dejar la televisión encendida'], correcta:0 }
  ] },
  { icono:'🦜', nombre:'Biodiversidad', color:'biodiversidad', tipo:'parejas', descripcion:'Animales, plantas y especies en peligro.', parejas:[['🐆','Jaguar'],['🦜','Guacamayo'],['🌺','Flor'],['🐸','Rana'],['🐬','Delfín'],['🐢','Tortuga'],['🦋','Mariposa'],['🐝','Abeja']], preguntas:[
    { texto:'¿Qué es la biodiversidad?', opciones:['La variedad de seres vivos','Un tipo de basura','Una máquina'], correcta:0 },
    { texto:'¿Cómo protegemos una especie en peligro?', opciones:['Destruimos su hogar','Cuidamos su ecosistema','La sacamos de la naturaleza'], correcta:1 },
    { texto:'Si ves un animal silvestre, lo correcto es...', opciones:['Perseguirlo','Llevarlo a casa','Observarlo sin molestarlo'], correcta:2 }
  ] },
  { icono:'🌎', nombre:'Misión final', color:'final', tipo:'preguntas', descripcion:'Combina todo lo aprendido para salvar el planeta.', preguntas:[
    { texto:'Una familia quiere cuidar el planeta. ¿Qué plan es mejor?', opciones:['Ahorrar agua, separar residuos y apagar luces','Usar más plástico y dejar luces encendidas','Tirar residuos al río'], correcta:0 },
    { texto:'Para proteger un bosque y su biodiversidad debemos...', opciones:['Talar sin límite','Reforestar y respetar a sus especies','Construir sobre todos sus árboles'], correcta:1 },
    { texto:'¿Cuál es la mejor misión de un guardián?', opciones:['Cuidar solo su casa','Cuidar agua, energía, seres vivos y residuos','No hacer nada'], correcta:1 }
  ] }
];

let nivelActual = 0;
let preguntaActual = 0;
let aciertosNivel = 0;
let puntuacion = 0;
let nivelesCompletados = 0;
let parejasSeleccionadas = [];
let palabrasEncontradas = [];
let pasosElegidos = [];
const puntuacionMaxima = niveles.reduce((total, nivel) => {
  if(nivel.tipo === 'parejas') return total + nivel.parejas.length + (nivel.parejasExtra ? nivel.parejasExtra.length : 0);
  if(nivel.tipo === 'sopa') return total + nivel.palabras.length;
  if(nivel.tipo === 'ordenar') return total + nivel.ordenCorrecto.length;
  return total + nivel.preguntas.length;
}, 0);
const $ = (id) => document.getElementById(id);
function mezclar(array){
  const copia = [...array];
  for(let indice = copia.length - 1; indice > 0; indice--){
    const aleatorio = Math.floor(Math.random() * (indice + 1));
    [copia[indice], copia[aleatorio]] = [copia[aleatorio], copia[indice]];
  }
  return copia;
}

function mostrar(id){
  document.querySelectorAll('.pantalla').forEach((pantalla) => pantalla.classList.remove('activa'));
  $(id).classList.add('activa');
  window.scrollTo({top:0, behavior:'smooth'});
}
function actualizarMarcadores(){
  const porcentaje = Math.min(100, Math.round((puntuacion / puntuacionMaxima) * 100));
  $('puntuacion').textContent = `⭐ ${porcentaje}%`;
  $('progreso').textContent = `${nivelesCompletados}/6 niveles`;
  $('barra-progreso').style.width = `${(nivelesCompletados / niveles.length) * 100}%`;
  $('texto-progreso').textContent = nivelesCompletados === 6 ? '¡Completaste toda la misión ambiental!' : `Has completado ${nivelesCompletados} de 6 niveles.`;
}
function sumarPuntuacion(){
  puntuacion = Math.min(puntuacionMaxima, puntuacion + 1);
}
function dibujarNiveles(){
  $('grid-niveles').innerHTML = '';
  const nombresActividad = {preguntas:'Reto de decisiones', parejas:'Encuentra parejas', sopa:'Sopa de letras', ordenar:'Rompecabezas'};
  niveles.forEach((nivel, indice) => {
    const bloqueado = indice > nivelesCompletados;
    const completado = indice < nivelesCompletados;
    const boton = document.createElement('button');
    boton.className = `nivel-card ${nivel.color} ${bloqueado ? 'bloqueado' : ''} ${completado ? 'completado' : ''}`;
    boton.disabled = bloqueado;
    const cantidadRetos = nivel.tipo === 'parejas' ? nivel.parejas.length + (nivel.parejasExtra ? nivel.parejasExtra.length : 0) : nivel.tipo === 'sopa' ? nivel.palabras.length : nivel.tipo === 'ordenar' ? nivel.ordenCorrecto.length : nivel.preguntas.length;
    boton.innerHTML = `<span class="nivel-numero">${String(indice + 1).padStart(2,'0')}</span><span class="nivel-icono">${nivel.icono}</span><span class="nivel-tipo">🎮 ${nombresActividad[nivel.tipo]}</span><strong>${nivel.nombre}</strong><small>${nivel.descripcion}</small><span class="nivel-recompensa">🏆 ${cantidadRetos} retos</span><span class="estado-nivel">${completado ? 'Completado ✓' : bloqueado ? '🔒 Bloqueado' : 'Jugar ahora →'}</span>`;
    boton.addEventListener('click', () => iniciarNivel(indice));
    $('grid-niveles').appendChild(boton);
  });
}
function iniciarNivel(indice){
  nivelActual = indice;
  preguntaActual = 0;
  aciertosNivel = 0;
  $('nivel-etiqueta').textContent = `Nivel ${indice + 1} de 6 · ${niveles[indice].icono}`;
  $('nivel-titulo').textContent = niveles[indice].nombre;
  $('resultado').classList.add('oculto');
  $('tarjeta-pregunta').classList.remove('oculto');
  $('feedback').textContent = '';
  renderizarActividad();
  mostrar('juego');
}
function renderizarActividad(){
  const nivel = niveles[nivelActual];
  if(nivel.tipo === 'parejas') renderizarParejas(nivel);
  else if(nivel.tipo === 'sopa') renderizarSopa(nivel);
  else if(nivel.tipo === 'ordenar') renderizarOrden(nivel);
  else mostrarPregunta();
}
function mostrarPregunta(){
  const pregunta = niveles[nivelActual].preguntas[preguntaActual];
  $('contador-pregunta').textContent = `${preguntaActual + 1}/${niveles[nivelActual].preguntas.length}`;
  $('actividad').innerHTML = `<p class="actividad-titulo">${pregunta.texto}</p><div class="opciones" id="opciones"></div>`;
  $('feedback').textContent = '';
  const opciones = $('opciones');
  pregunta.opciones.forEach((opcion, indice) => {
    const boton = document.createElement('button');
    boton.className = 'opcion';
    boton.textContent = opcion;
    boton.addEventListener('click', () => responder(indice, boton));
    opciones.appendChild(boton);
  });
}
function renderizarParejas(nivel){
  parejasSeleccionadas = [];
  const totalParejasNivel = nivel.parejas.length + (nivel.parejasExtra ? nivel.parejasExtra.length : 0);
  $('contador-pregunta').textContent = `0/${totalParejasNivel} parejas`;
  $('actividad').innerHTML = `<p class="actividad-titulo">Encuentra las fichas iguales de ${nivel.nombre.toLowerCase()}.</p><section class="tablero-parejas"><h3>Tablero 1 · Elementos del bosque</h3><div class="parejas-grid" id="tablero-parejas-1"></div></section>${nivel.parejasExtra ? '<section class="tablero-parejas"><h3>Tablero 2 · Animales grandes y pequeños</h3><p class="tablero-info">Aprende sobre su tamaño, hábitat y aporte al ecosistema mientras encuentras sus parejas.</p><div class="parejas-grid" id="tablero-parejas-2"></div></section>' : ''}`;
  agregarFichasParejas(nivel.parejas, 'tablero-parejas-1');
  if(nivel.parejasExtra) agregarFichasParejas(nivel.parejasExtra, 'tablero-parejas-2');
}
function agregarFichasParejas(parejas, tableroId){
  const fichas = mezclar(parejas.flatMap(([icono, nombre, info]) => [{icono,nombre,info},{icono,nombre,info}]));
  fichas.forEach((ficha, indice) => {
    const boton = document.createElement('button');
    boton.className = 'ficha';
    boton.dataset.valor = ficha.nombre;
    boton.innerHTML = '<span>?</span>';
    boton.addEventListener('click', () => voltearFicha(boton, ficha, indice));
    document.getElementById(tableroId).appendChild(boton);
  });
}
function voltearFicha(boton, ficha){
  if(boton.classList.contains('volteada') || boton.classList.contains('encontrada') || parejasSeleccionadas.length === 2) return;
  boton.classList.add('volteada');
  boton.innerHTML = `<span>${ficha.icono}</span><small>${ficha.nombre}</small>${ficha.info ? `<em>${ficha.info}</em>` : ''}`;
  parejasSeleccionadas.push({boton, ficha});
  if(parejasSeleccionadas.length !== 2) return;
  const [primera, segunda] = parejasSeleccionadas;
  if(primera.ficha.nombre === segunda.ficha.nombre){
    primera.boton.classList.add('encontrada');
    segunda.boton.classList.add('encontrada');
    aciertosNivel++;
    sumarPuntuacion();
    $('feedback').textContent = '¡Pareja encontrada! +1% de progreso';
    const nivel = niveles[nivelActual];
    const totalParejas = nivel.parejas.length + (nivel.parejasExtra ? nivel.parejasExtra.length : 0);
    $('contador-pregunta').textContent = `${aciertosNivel}/${totalParejas} parejas`;
    parejasSeleccionadas = [];
    actualizarMarcadores();
    if(aciertosNivel === totalParejas) setTimeout(finalizarNivel, 500);
  } else {
    $('feedback').textContent = 'No son iguales. Intenta otra vez.';
    setTimeout(() => {
      primera.boton.classList.remove('volteada');
      segunda.boton.classList.remove('volteada');
      primera.boton.innerHTML = '<span>?</span>';
      segunda.boton.innerHTML = '<span>?</span>';
      parejasSeleccionadas = [];
    }, 700);
  }
}
function renderizarSopa(nivel){
  palabrasEncontradas = [];
  const tamano = 10;
  const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const tablero = Array.from({length: tamano * tamano}, () => ({letra:'', palabras:[]}));
  const direcciones = [[0,1],[1,0],[1,1],[0,-1],[-1,0],[1,-1]];
  nivel.palabras.forEach((palabra) => {
    let colocada = false;
    for(let intento = 0; intento < 100 && !colocada; intento++){
      const [fila, columna] = [Math.floor(Math.random() * tamano), Math.floor(Math.random() * tamano)];
      const [filaPaso, columnaPaso] = direcciones[Math.floor(Math.random() * direcciones.length)];
      const posiciones = [...palabra].map((letra, indice) => [fila + filaPaso * indice, columna + columnaPaso * indice, letra]);
      const valida = posiciones.every(([filaDestino, columnaDestino, letra]) => {
        if(filaDestino < 0 || filaDestino >= tamano || columnaDestino < 0 || columnaDestino >= tamano) return false;
        const celda = tablero[filaDestino * tamano + columnaDestino];
        return !celda.letra || celda.letra === letra;
      });
      if(!valida) continue;
      posiciones.forEach(([filaDestino, columnaDestino, letra]) => {
        const celda = tablero[filaDestino * tamano + columnaDestino];
        celda.letra = letra;
        celda.palabras.push(palabra);
      });
      colocada = true;
    }
  });
  tablero.forEach((celda) => {
    if(!celda.letra) celda.letra = letras[Math.floor(Math.random() * letras.length)];
  });
  $('contador-pregunta').textContent = `0/${nivel.palabras.length} palabras`;
  $('actividad').innerHTML = `<p class="actividad-titulo">Encuentra las ${nivel.palabras.length} palabras ambientales en la sopa.</p><div class="sopa-grid"></div><div class="palabras-lista"></div>`;
  tablero.forEach(({letra,palabras}) => {
    const celda = document.createElement('button');
    celda.className = 'celda-letra';
    celda.textContent = letra;
    celda.palabras = palabras;
    celda.addEventListener('click', () => encontrarPalabraDesdeCelda(celda));
    document.querySelector('.sopa-grid').appendChild(celda);
  });
  nivel.palabras.forEach((palabra) => {
    const etiqueta = document.createElement('span');
    etiqueta.className = 'palabra-pista';
    etiqueta.dataset.palabra = palabra;
    etiqueta.textContent = palabra;
    document.querySelector('.palabras-lista').appendChild(etiqueta);
  });
}
function encontrarPalabraDesdeCelda(celda){
  const palabra = celda.palabras.find((item) => !palabrasEncontradas.includes(item));
  if(palabra) encontrarPalabra(palabra);
}
function encontrarPalabra(palabra, celda){
  if(!palabra) return;
  if(palabrasEncontradas.includes(palabra)) return;
  palabrasEncontradas.push(palabra);
  document.querySelectorAll('.celda-letra').forEach((item) => {
    if(item.palabras && item.palabras.includes(palabra)) item.classList.add('encontrada');
  });
    document.querySelectorAll(`.palabra-pista[data-palabra="${palabra}"]`).forEach((item) => item.classList.add('encontrada'));
  aciertosNivel++;
  sumarPuntuacion();
  $('feedback').textContent = `¡Encontraste ${palabra}! +1% de progreso`;
  $('contador-pregunta').textContent = `${aciertosNivel}/${niveles[nivelActual].palabras.length} palabras`;
  actualizarMarcadores();
  if(aciertosNivel === niveles[nivelActual].palabras.length) setTimeout(finalizarNivel, 500);
}
function renderizarOrden(nivel){
  pasosElegidos = [];
  $('contador-pregunta').textContent = `0/${nivel.ordenCorrecto.length} pasos`;
  $('actividad').innerHTML = `<p class="actividad-titulo">Ordena estas acciones para ahorrar energía.</p><div class="orden-lista"></div>`;
  mezclar(nivel.ordenCorrecto).forEach((paso) => {
    const boton = document.createElement('button');
    boton.className = 'paso-opcion';
    boton.textContent = paso;
    boton.addEventListener('click', () => elegirPaso(paso, boton));
    document.querySelector('.orden-lista').appendChild(boton);
  });
}
function elegirPaso(paso, boton){
  const correcto = niveles[nivelActual].ordenCorrecto[pasosElegidos.length];
  if(paso !== correcto){ $('feedback').textContent = 'Ese paso va después. Piensa en el orden correcto.'; boton.classList.add('error'); setTimeout(() => boton.classList.remove('error'), 500); return; }
  pasosElegidos.push(paso);
  boton.classList.add('usado');
  boton.disabled = true;
  aciertosNivel++;
  sumarPuntuacion();
  $('feedback').textContent = '¡Buen orden! +1% de progreso';
  $('contador-pregunta').textContent = `${aciertosNivel}/${niveles[nivelActual].ordenCorrecto.length} pasos`;
  actualizarMarcadores();
  if(aciertosNivel === niveles[nivelActual].ordenCorrecto.length) setTimeout(finalizarNivel, 500);
}
function responder(indice, botonElegido){
  const pregunta = niveles[nivelActual].preguntas[preguntaActual];
  document.querySelectorAll('.opcion').forEach((boton) => { boton.disabled = true; });
  if(indice === pregunta.correcta){
    botonElegido.classList.add('correcta');
    aciertosNivel++;
    sumarPuntuacion();
    $('feedback').textContent = '¡Muy bien! Esa decisión protege el ambiente. +1% de progreso';
  } else {
    botonElegido.classList.add('incorrecta');
    document.querySelectorAll('.opcion')[pregunta.correcta].classList.add('correcta');
    $('feedback').textContent = 'Observa la respuesta correcta y aprende para la próxima.';
  }
  actualizarMarcadores();
  setTimeout(() => {
    preguntaActual++;
    if(preguntaActual < niveles[nivelActual].preguntas.length) mostrarPregunta();
    else finalizarNivel();
  }, 900);
}
function finalizarNivel(){
  if(nivelActual >= nivelesCompletados) nivelesCompletados++;
  actualizarMarcadores();
  dibujarNiveles();
  $('tarjeta-pregunta').classList.add('oculto');
  $('resultado').classList.remove('oculto');
  $('resultado-icono').textContent = nivelActual === 5 ? '🌎' : '🌟';
  $('resultado-titulo').textContent = nivelActual === 5 ? '¡Misión cumplida!' : `¡Nivel ${nivelActual + 1} completado!`;
  const totalDesafios = niveles[nivelActual].tipo === 'parejas' ? niveles[nivelActual].parejas.length + (niveles[nivelActual].parejasExtra ? niveles[nivelActual].parejasExtra.length : 0) : niveles[nivelActual].tipo === 'sopa' ? niveles[nivelActual].palabras.length : niveles[nivelActual].tipo === 'ordenar' ? niveles[nivelActual].ordenCorrecto.length : niveles[nivelActual].preguntas.length;
  $('resultado-texto').textContent = `Acertaste ${aciertosNivel} de ${totalDesafios} desafíos. Tu puntuación global se muestra como porcentaje.`;
  $('resultado-accion').textContent = nivelesCompletados < 6 ? 'Siguiente nivel →' : 'Ver recorrido';
}

$('comenzar').addEventListener('click', () => { dibujarNiveles(); mostrar('niveles'); });
$('como-jugar').addEventListener('click', () => mostrar('como-jugar-panel'));
$('aprender').addEventListener('click', () => mostrar('aprender-panel'));
$('resultado-accion').addEventListener('click', () => { dibujarNiveles(); mostrar('niveles'); });
$('volver-niveles').addEventListener('click', () => { dibujarNiveles(); mostrar('niveles'); });
document.querySelectorAll('[data-inicio]').forEach((boton) => boton.addEventListener('click', () => mostrar('inicio')));
document.querySelector('.marca').addEventListener('click', (evento) => { evento.preventDefault(); mostrar('inicio'); });
actualizarMarcadores();
