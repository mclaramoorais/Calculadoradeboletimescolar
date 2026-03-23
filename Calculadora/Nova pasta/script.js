const btnResumo = document.getElementById("btnResumo");
const resultado = document.getElementById("resultado");
const erro = document.getElementById("erro");
const extraNotas = document.getElementById("extraNotas");

function toNum(id) {
  const valor = document.getElementById(id).value;
  return valor === "" ? null : parseFloat(valor);
}

function validarNota(n) {
  return Number.isFinite(n) && n >= 0 && n <= 10;
}

function media(arr) {
  return arr.reduce((soma, n) => soma + n, 0) / arr.length;
}

function calcularResumo(n1, n2, n3, n4, nrec, nfinal) {
  const linhas = [];
  let notas = [n1, n2, n3, n4];

  let mediaNotas = media(notas);
  linhas.push(`Média inicial: ${mediaNotas.toFixed(2)}`);

  if (mediaNotas >= 7) {
    linhas.push("Situação: Aprovado");
    return linhas;
  }

  linhas.push("Situação: Recuperação");

  if (!validarNota(nrec)) {
    linhas.push("Informe a nota de recuperação.");
    return linhas;
  }

  const menor = Math.min(...notas);

  if (nrec > menor) {
    linhas.push(`Substituição: ${menor.toFixed(2)} → ${nrec.toFixed(2)}`);
    notas[notas.indexOf(menor)] = nrec;
  }

  mediaNotas = media(notas);
  linhas.push(`Nova média: ${mediaNotas.toFixed(2)}`);

  if (mediaNotas >= 7) {
    linhas.push("Situação: Aprovado");
    return linhas;
  }

  linhas.push("Situação: Final");

  if (!validarNota(nfinal)) {
    linhas.push("Informe a nota final.");
    return linhas;
  }

  if (nfinal >= 7) {
    linhas.push("Situação: Aprovado");
  } else {
    linhas.push("Situação: Reprovado");
  }

  return linhas;
}

btnResumo.addEventListener("click", () => {
  erro.textContent = "";

  const n1 = toNum("n1");
  const n2 = toNum("n2");
  const n3 = toNum("n3");
  const n4 = toNum("n4");
  const nrec = toNum("nrec");
  const nfinal = toNum("nfinal");

  if (![n1, n2, n3, n4].every(validarNota)) {
    erro.textContent = "Notas inválidas. Use valores entre 0 e 10.";
    return;
  }

  const linhas = calcularResumo(n1, n2, n3, n4, nrec, nfinal);

  extraNotas.style.display = "grid";

  resultado.textContent =
    `Notas: [${[n1, n2, n3, n4].map(n => n.toFixed(2)).join(", ")}]\n\n` +
    linhas.join("\n");
});