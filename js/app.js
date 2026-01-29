let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function addTransaction() {
  const desc = document.getElementById("desc").value;
  const value = Number(document.getElementById("value").value);
  const type = document.getElementById("type").value;

  if (!desc || !value) return alert("Preencha tudo");

  transactions.push({ desc, value, type });
  localStorage.setItem("transactions", JSON.stringify(transactions));
  render();
}

function render() {
  const list = document.getElementById("list");
  const balanceEl = document.getElementById("balance");
  list.innerHTML = "";

  let balance = 0;

  transactions.forEach((t, i) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${t.desc}
      <strong>${t.type === "entrada" ? "+" : "-"}R$${t.value}</strong>
    `;
    list.appendChild(li);

    balance += t.type === "entrada" ? t.value : -t.value;
  });

  balanceEl.innerText = "R$ " + balance.toFixed(2);
}

render();
