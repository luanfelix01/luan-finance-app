let transactions = JSON.parse(localStorage.getItem("transactions") || "[]")

function addTransaction() {
  const desc = document.getElementById("desc").value
  const value = Number(document.getElementById("value").value)
  const type = document.getElementById("type").value

  if (!desc || !value) return alert("Preencha tudo")

  transactions.push({ desc, value, type })
  localStorage.setItem("transactions", JSON.stringify(transactions))

  update()
}

function update() {
  const list = document.getElementById("list")
  const balanceEl = document.getElementById("balance")
  list.innerHTML = ""

  let balance = 0
  let income = 0
  let expense = 0

  transactions.forEach(t => {
    const li = document.createElement("li")
    li.textContent = `${t.desc} - R$ ${t.value}`
    list.appendChild(li)

    if (t.type === "entrada") {
      balance += t.value
      income += t.value
    } else {
      balance -= t.value
      expense += t.value
    }
  })

  localStorage.setItem("income", income)
  localStorage.setItem("expense", expense)

  balanceEl.innerText = "R$ " + balance.toFixed(2)
}

function saveGoal() {
  const goal = document.getElementById("monthlyGoal").value
  localStorage.setItem("monthlyGoal", goal)
  document.getElementById("goalInfo").innerText = "Meta: R$ " + goal
}

function exportData() {
  const csv = transactions.map(t =>
    `${t.desc},${t.value},${t.type}`
  ).join("\n")

  const blob = new Blob([csv], { type: "text/csv" })
  const a = document.createElement("a")
  a.href = URL.createObjectURL(blob)
  a.download = "luan-finance.csv"
  a.click()
}

update()
