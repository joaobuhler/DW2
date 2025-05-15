/****************************************************************
 * Seleção dos elementos HTML
 ****************************************************************/
// Botões
const btnBotoes = document.querySelectorAll("[btn-numero]");
const btnOperacoes = document.querySelectorAll("[btn-operador]");
const btnIgual = document.querySelector("[btn-igual]");
const btnDelete = document.querySelector("[btn-delete]");
const btnAC = document.querySelector("[btn-ac]");

// As divs que vão exibir os valores da calculadora
const bufferElemento = document.querySelector("[txt-buffer]");
const displayElemento = document.querySelector("[txt-display]");

// Objeto que irá representar e armazenar os dados da calculadora
const calculadora = {
  operandoAnterior: "",
  operandoAtual: "",
  operador: "",
  bufferTextoElemento: bufferElemento,
  displayTextoElemento: displayElemento,
};

/****************************************************************
 * Associar funções aos eventos dos elementos HTML
 ****************************************************************/
// Botão AC
btnAC.addEventListener("click", () => {
  limpaVariaveis(calculadora);
});

// Botão Delete
btnDelete.addEventListener("click", () => {
  apagaDigito(calculadora);
});

// Botão de igual
btnIgual.addEventListener("click", () => {
  executaCalculo(calculadora);
});

// Botões dos números
btnBotoes.forEach((botao) => {
  botao.addEventListener("click", () => {
    adicionaNumero(calculadora, botao.innerText);
  });
});

// Botões dos operadores
btnOperacoes.forEach((botao) => {
  botao.addEventListener("click", () => {
    escolheOperador(calculadora, botao.innerText);
  });
});

/****************************************************************
 * Regras da aplicação
 ****************************************************************/

function atualizaDisplay(calc) {
  calc.displayTextoElemento.innerText = calc.operandoAtual || "0";
  calc.bufferTextoElemento.innerText =
    calc.operandoAnterior && calc.operador
      ? `${calc.operandoAnterior} ${calc.operador}`
      : "";
}

function limpaVariaveis(calc) {
  calc.operandoAnterior = "";
  calc.operandoAtual = "";
  calc.operador = "";
  atualizaDisplay(calc);
}

function adicionaNumero(calc, numero) {
  if (numero === "." && calc.operandoAtual.includes(".")) return;
  calc.operandoAtual += numero;
  atualizaDisplay(calc);
}

function escolheOperador(calc, operador) {
  if (calc.operandoAtual === "") return;
  if (calc.operandoAnterior !== "") {
    executaCalculo(calc);
  }
  calc.operador = operador;
  calc.operandoAnterior = calc.operandoAtual;
  calc.operandoAtual = "";
  atualizaDisplay(calc);
}

function executaCalculo(calc) {
  const anterior = parseFloat(calc.operandoAnterior);
  const atual = parseFloat(calc.operandoAtual);
  if (isNaN(anterior) || isNaN(atual)) return;

  let resultado = 0;
  switch (calc.operador) {
    case "+":
      resultado = anterior + atual;
      break;
    case "-":
      resultado = anterior - atual;
      break;
    case "*":
      resultado = anterior * atual;
      break;
    case "÷":
      if (atual === 0) {
        alert("Erro: divisão por zero!");
        limpaVariaveis(calc);
        return;
      }
      resultado = anterior / atual;
      break;
    default:
      return;
  }

  calc.operandoAtual = resultado.toString();
  calc.operador = "";
  calc.operandoAnterior = "";
  atualizaDisplay(calc);
}

function apagaDigito(calc) {
  calc.operandoAtual = calc.operandoAtual.slice(0, -1);
  atualizaDisplay(calc);
}
