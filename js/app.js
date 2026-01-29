let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
let meta = Number(localStorage.getItem("meta")) || 0;

function addTransaction() {
  const desc = descEl.value;
  const value = Number(valueEl.value);
  const type = typeEl.value;
  const category = categoryEl.value;
  const date = dateEl.value;

  if (!desc || !value || !date) {
    alert("Preencha todos os campos");
    return;
  }

  transactions.push({ desc, value, type, category, date });
  localStorage.setItem("transactions", JSON.stringify(transactions));

  descEl.value = "";
  valueEl.value = "";

  render();
}

const descEl = document.getElementById("desc");
const valueEl = document.getElementById("value");
const typeEl = document.getElementById("type");
const categoryEl = document.getElementById("category");
const dateEl = document.getElementById("date");

function render() {
  const list = document.getElementById("list");
  const balanceEl = document.getElementById("balance");
  const entradaEl = document.getElementById("totalEntrada");
  const saidaEl = document.getElementById("totalSaida");

  list.innerHTML = "";

  let balance = 0, entrada = 0, saida = 0;

  transactions.forEach((t, i) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${t.desc} (${t.category})
      <strong>${t.type === "entrada" ? "+" : "-"}R$ ${t.value.toFixed(2)}</strong>
      <button onclick="remove(${i})">🗑️</button>
    `;
    list.appendChild(li);

    if (t.type === "entrada") {
      entrada += t.value;
      balance += t.value;
    } else {
      saida += t.value;
      balance -= t.value;
    }
  });

  balanceEl.innerText = "R$ " + balance.toFixed(2);
  entradaEl.innerText = "R$ " + entrada.toFixed(2);
  saidaEl.innerText = "R$ " + saida.toFixed(2);

  updateMeta(balance);
}

function remove(index) {
  transactions.splice(index, 1);
  localStorage.setItem("transactions", JSON.stringify(transactions));
  render();
}

function saveMeta() {
  meta = Number(document.getElementById("metaValor").value);
  localStorage.setItem("meta", meta);
  render();
}

function updateMeta(balance) {
  const status = document.getElementById("metaStatus");
  if (!status) return;

  if (meta > 0) {
    const percent = Math.min((balance / meta) * 100, 100);
    status.innerText = `Meta: ${percent.toFixed(0)}% alcançado`;
  }
}

render();
