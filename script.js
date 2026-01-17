$(document).ready(function () {
  let score = 0;
  let currentProblem = 0;
  let problems = [];
  let operationsList = [];
  let startTime;
  let timerInterval;

  // Iniciar el juego al hacer clic en el botón "Start"
  $("#start").click(function () {
    let level = parseInt($("#level").val());
    if (level >= 1 && level <= 15) {  // Poner aquí número de niveles
      resetGame();
      startTimer();
      generateProblems(level);
      showProblem(level);
    }
  });

  // Reiniciar variables y elementos del juego
  function resetGame() {
    score = 0;
    currentProblem = 0;
    problems = [];
    operationsList = [];
    console.log("Called")
    $("#progress-bar, #timer").show();
    $("#progress").css("width", "0%");
    $("#figlet").html(""); // Limpiar mensaje anterior
    $("#score").html("");
  }

  // Generar problemas según el nivel seleccionado
  function generateProblems(level) {
    var aleatorio = level;
    for (let i = 0; i < 5; i++) {     // Poner aquí número de operaciones
     if (aleatorio === 11)
       { let numeros = [1,2,3,4,5,6,7,8,9,10];
         let indiceAleatorio = Math.floor(Math.random() * numeros.length);
         level = numeros[indiceAleatorio];
       }
     if (aleatorio === 12)
       { let numeros = [1,2,3,4,5];
         let indiceAleatorio = Math.floor(Math.random() * numeros.length);
         level = numeros[indiceAleatorio];
       }
     if (aleatorio === 13)
       { let numeros = [6,7,8,9,10];
         let indiceAleatorio = Math.floor(Math.random() * numeros.length);
         level = numeros[indiceAleatorio];
       }
     if (aleatorio === 14)
       { let numeros = [2,4,8];
         let indiceAleatorio = Math.floor(Math.random() * numeros.length);
         level = numeros[indiceAleatorio];
       }
     if (aleatorio === 15)
       { let numeros = [3,6,9];
         let indiceAleatorio = Math.floor(Math.random() * numeros.length);
         level = numeros[indiceAleatorio];
       }
      if (level ===1){
        let x = 1;
        let y = Math.floor(Math.random() * 12) +1;
        let correctAnswer = x * y;
        problems.push({ x, y, correctAnswer, level });
        }
      if (level ===2){
        let x = 2;
        let y = Math.floor(Math.random() * 12) +1;
        let correctAnswer = x * y;
        problems.push({ x, y, correctAnswer, level });
        }
      if (level ===3){
        let x = 3;
        let y = Math.floor(Math.random() * 12) +1;
        let correctAnswer = x * y;
        problems.push({ x, y, correctAnswer, level });
        }
      if (level ===4){
        let x = 4;
        let y = Math.floor(Math.random() * 12) +1;
        let correctAnswer = x * y;
        problems.push({ x, y, correctAnswer, level });
        }
      if (level ===5){
        let x = 5;
        let y = Math.floor(Math.random() * 12) +1;
        let correctAnswer = x * y;
        problems.push({ x, y, correctAnswer, level });
        }
      if (level ===6){
        let x = 6;
        let y = Math.floor(Math.random() * 12) +1;
        let correctAnswer = x * y;
        problems.push({ x, y, correctAnswer, level });
        }
      if (level ===7){
        let x = 7;
        let y = Math.floor(Math.random() * 12) +1;
        let correctAnswer = x * y;
        problems.push({ x, y, correctAnswer, level });
        }
      if (level ===8){
        let x = 8;
        let y = Math.floor(Math.random() * 12) +1;
        let correctAnswer = x * y;
        problems.push({ x, y, correctAnswer, level });
        }
      if (level ===9){
        let x = 9;
        let y = Math.floor(Math.random() * 12) +1;
        let correctAnswer = x * y;
        problems.push({ x, y, correctAnswer, level });
        }
      if (level ===10){
        let x = 10;
        let y = Math.floor(Math.random() * 12) +1;
        let correctAnswer = x * y;
        problems.push({ x, y, correctAnswer, level });
        }
    }  
  }

  // Mostrar el problema actual
  function showProblem(level) {
    if (currentProblem >= problems.length) {
      endGame();
      return;
    }
    updateProgressBar();
    let problem = problems[currentProblem];
    $("#problems").html(`
      <div class="problemStyle">
        <p class="h4">${problem.x} x ${problem.y} = </p>
          <form id="problemForm">
            <input type="number" id="answer" class="form-control text-center" placeholder="Tu respuesta" inputmode="numeric">
            <button type="submit" class="btn btn-success mt-2">Enviar</button>
        </form>
      </div>
    `) 
    $("#answer").focus();
     
    // Manejar la respuesta del usuario
 $("#problemForm").on("submit", function(e) {
   event.preventDefault();
      let userAnswer = parseInt($("#answer").val());
      if (userAnswer === problem.correctAnswer) {
        handleCorrectAnswer(problem, level);
      } else {
        handleIncorrectAnswer(problem, userAnswer, level);
      }
      $("#score").html(`<div class="alert alert-success"> Puntuación: ${score}/${currentProblem}</div>`
  );
      updateOperationsList();
    });
  }

  // Manejar respuesta correcta
  function handleCorrectAnswer(problem, level) {
    if (currentProblem < problems.length) {
    score++;
    operationsList.push({
      text: `${problem.x} x ${problem.y} = ${problem.correctAnswer}`,
      correct: true
    });
    currentProblem++;
    showProblem(level);

  }}

  // Manejar respuesta incorrecta
  function handleIncorrectAnswer(problem, userAnswer, level) {
      if (currentProblem < problems.length) {
        operationsList.push({
        text: `${problem.x} x ${problem.y} = ${userAnswer} (Correcta: ${problem.correctAnswer})`,
        correct: false
      });
      currentProblem++;
      showProblem(level);
  }}

  // Actualizar la lista de operaciones
  function updateOperationsList() {
    let listHtml = '<div class="operations-list">';
    operationsList.forEach((operation) => {
      listHtml += `
        <div class="operation-item ${
          operation.correct ? "correct" : "incorrect"
        }">
          ${operation.correct ? "✅" : "❌"} ${operation.text}
        </div>
      `;
    });
    listHtml += "</div>";
    $("#operations-list").html(listHtml);
  }

  // Finalizar el juego
  function endGame() {
    clearInterval(timerInterval);
    $("#score").html(
      `<div class="alert alert-success">🏆 Puntuación: ${score}/${problems.length}</div>`
    );
    $("#score").append(
      `<div class="mt-2">⏱️ Tiempo total: <span id="total-time"></span></div>`
    );
    $("#total-time").text(
      formatTime(Math.floor((Date.now() - startTime) / 1000))
    );

    // Mostrar mensaje especial con estilo llamativo
    showSpecialMessage("¡Enhorabuena!");
  }

  // Mostrar mensaje especial con estilo llamativo
  function showSpecialMessage(message) {
    $("#figlet").html(`
      <div class="special-message">
        ${message}
      </div>
    `);
  }

  // Iniciar el temporizador
  function startTimer() {
    startTime = Date.now();
    timerInterval = setInterval(() => {
      let elapsedTime = Math.floor((Date.now() - startTime) / 1000);
      $("#time").text(formatTime(elapsedTime));
    }, 1000);
  }

  // Formatear el tiempo en minutos y segundos
  function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    let secs = seconds % 60;
    return `${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  }

  // Actualizar la barra de progreso
  function updateProgressBar() {
    let progress = ((currentProblem + 1) / problems.length) * 100;
    $("#progress").css("width", `${progress}%`);
  }
});
