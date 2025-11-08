document.addEventListener('DOMContentLoaded', () => {
  const path = location.pathname.toLowerCase();

  if (document.getElementById('formulario')) initContacto();                // contacto.html  :contentReference[oaicite:7]{index=7}
  if (path.endsWith('/test_javascript.html') || path.includes('test_javascript.html')) initTestJS();   // :contentReference[oaicite:8]{index=8}
  if (path.endsWith('/test_python.html')     || path.includes('test_python.html'))     initTestPy();   // :contentReference[oaicite:9]{index=9}
  if (path.endsWith('/test_ia.html')         || path.includes('test_ia.html'))         initTestIA();   // :contentReference[oaicite:10]{index=10}
});

function initContacto() {
  const form = document.getElementById("formulario");
  form.addEventListener("submit", function(e){
    e.preventDefault();
    const nombre  = document.getElementById("nombre").value;
    const email   = document.getElementById("email").value;
    if (nombre === "" || !email.includes("@")) {
      alert("Por favor completá todos los campos correctamente.");
    } else {
      alert("¡Registro exitoso!");
      this.reset();
    }
  });
}

// --- Test JavaScript ---
function initTestJS() {
  const preguntas = [
    { texto: "¿Qué significa DOM en JavaScript?", opciones: ["Document Object Model","Data Object Method","Desktop Object Module"], correcta: 0 },
    { texto: "¿Cuál es el símbolo para comentar una línea en JS?", opciones: ["//","<!-- -->","#"], correcta: 0 },
    { texto: "¿Qué método se usa para mostrar un mensaje emergente?", opciones: ["console.log()","alert()","prompt()"], correcta: 1 }
  ];
  initQuiz(preguntas);
}

// --- Test Python ---
function initTestPy() {
  const preguntas = [
    { texto: "¿Qué función muestra datos por pantalla?", opciones: ["echo()","print()","console.log()"], correcta: 1 },
    { texto: "¿Símbolo para comentar una línea?", opciones: ["//","#","<!-- -->"], correcta: 1 },
    { texto: "Resultado de type(3.5)?", opciones: ["int","float","double"], correcta: 1 }
  ];
  initQuiz(preguntas);
}

// --- Test IA ---
function initTestIA() {
  const preguntas = [
    { texto: "¿Qué es la IA?", opciones: ["Capacidad de imitar comportamientos inteligentes","Lenguaje de programación","Hardware"], correcta: 0 },
    { texto: "¿Qué es Machine Learning?", opciones: ["Rama de IA que aprende de datos","Software para robots","Base de datos"], correcta: 0 },
    { texto: "Ejemplo de IA aplicada", opciones: ["2+2 en calculadora","Reconocimiento facial del teléfono","Escribir en Word"], correcta: 1 }
  ];
  initQuiz(preguntas);
}

// --- Motor común de quiz (sin onclick en strings) ---
function initQuiz(preguntas) {
  let indice = 0, puntaje = 0;
  const quizDiv   = document.getElementById("quiz");
  const resultado = document.getElementById("resultado");

  function render() {
    if (indice >= preguntas.length) {
      quizDiv.innerHTML = "";
      resultado.textContent = `¡Terminaste! Tu puntaje es ${puntaje} de ${preguntas.length}.`;
      return;
    }
    const p = preguntas[indice];
    quizDiv.innerHTML = `<div class="pregunta">${p.texto}</div>`;
    p.opciones.forEach((op, i) => {
      const btn = document.createElement("button");
      btn.textContent = op;
      btn.addEventListener("click", () => responder(i));
      quizDiv.appendChild(btn);
    });
  }

  function responder(opcion) {
    if (opcion === preguntas[indice].correcta) puntaje++;
    indice++;
    render();
  }

  render();
}