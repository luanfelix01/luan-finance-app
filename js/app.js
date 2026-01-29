// ===============================
// UTILIDADES SEGURAS
// ===============================
function toNumber(value) {
  const n = parseFloat(value)
  return isNaN(n) ? 0 : n
}

// ===============================
// STORAGE
// ===============================
function getTransacoes() {
  return JSON.parse(localStorage.getItem("transacoes")) || []
}

function salvarTransacoes(lista) {
  localStorage.setItem("transacoes", JSON.stringify(lista))
}

// ===============================
// ADICIONAR TRANSAÇÃO
// ===============================
function adicionarTransacao(tipo) {
  const descricao = document.getElementById("descricao").value.trim()
  const valor = toNumber(document.getElementById("valor").value)

  if (!descricao || valor <= 0) {
    alert("Preencha descrição e valor corretamente")
    return
  }

  const transacoes = getTransacoes()

  transacoes.push({
    id: Date.now(),
    tipo: tipo,
    descricao: descricao,
    valor: valor
  })

  salvarTransacoes(transacoes)
  limparFormulario()
  atualizarTela()
}

// ===============================
// REMOVER TRANSAÇÃO
// ===============================
function removerTransacao(id) {
  let transacoes = getTransacoes()
  transacoes = transacoes.filter(t => t.id !== id)
  salvarTransacoes(transacoes)
  atualizarTela()
}

// ===============================
// LIMPAR FORM
// ===============================
function limparFormulario() {
  document.getElementById("descricao").value = ""
  document.getElementById("valor").value = ""
}

// ===============================
// CÁLCULOS (SEM BUG)
// ===============================
function calcularEntradas(transacoes) {
  return transacoes
    .filter(t => t.tipo === "entrada")
    .reduce((total, t) => total + toNumber(t.valor), 0)
}

function calcularSaidas(transacoes) {
  return transacoes
    .filter(t => t.tipo === "saida")
    .reduce((total, t) => total + toNumber(t.valor), 0)
}

function calcularSaldo(entradas, saidas) {
  const saldo = toNumber(entradas) - toNumber(saidas)
  return saldo < 0 ? 0 : saldo
}

// ===============================
// RENDERIZAÇÃO
// ===============================
function atualizarTela() {
  const lista = document.getElementById("lista")
  if (!lista) return

  lista.innerHTML = ""

  const transacoes = getTransacoes()

  transacoes.forEach(t => {
    const li = document.createElement("li")
    li.innerHTML = `
      ${t.descricao} - R$ ${t.valor.toFixed(2)}
      <button onclick="removerTransacao(${t.id})">✖</button>
    `
    lista.appendChild(li)
  })

  const totalEntradas = calcularEntradas(transacoes)
  const totalSaidas = calcularSaidas(transacoes)
  const saldo = calcularSaldo(totalEntradas, totalSaidas)

  document.getElementById("entradas").innerText = `R$ ${totalEntradas.toFixed(2)}`
  document.getElementById("saidas").innerText = `R$ ${totalSaidas.toFixed(2)}`
  document.getElementById("saldo").innerText = `R$ ${saldo.toFixed(2)}`
}

// ===============================
// INICIALIZAÇÃO
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  atualizarTela()
})
