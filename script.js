let balance = 0;

// Seletores
const balanceEl = document.getElementById("balance");
const transactionList = document.getElementById("transaction-list");
const depositBtn = document.getElementById("deposit-btn");
const withdrawBtn = document.getElementById("withdraw-btn");
const amountInput = document.getElementById("amount");

// Carregar saldo e transações do localStorage
function loadData() {
    const savedBalance = localStorage.getItem("balance");
    const savedTransactions = JSON.parse(localStorage.getItem("transactions")) || [];

    balance = savedBalance ? parseFloat(savedBalance) : 0;
    updateBalance();

    savedTransactions.forEach(t => addTransactionToList(t.type, t.value, false));
}

// Salvar saldo e transações no localStorage
function saveData(type, value) {
    localStorage.setItem("balance", balance);

    const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    transactions.push({ type, value });
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

// Atualizar saldo na tela
function updateBalance() {
    balanceEl.textContent = `R$ ${balance.toFixed(2)}`;
}

// Adicionar transação à lista
function addTransactionToList(type, value, save = true) {
    const li = document.createElement("li");
    li.textContent = `R$ ${value.toFixed(2)}`;
    li.classList.add(type === "Depósito" ? "deposit" : "withdraw");
    li.innerHTML = `<span>${type}</span><span>R$ ${value.toFixed(2)}</span>`;
    transactionList.appendChild(li);

    if (save) saveData(type, value);
}

// Eventos dos botões
depositBtn.addEventListener("click", () => {
    const value = parseFloat(amountInput.value);
    if (!isNaN(value) && value > 0) {
        balance += value;
        updateBalance();
        addTransactionToList("Depósito", value);
        amountInput.value = "";
    }
});

withdrawBtn.addEventListener("click", () => {
    const value = parseFloat(amountInput.value);
    if (!isNaN(value) && value > 0 && value <= balance) {
        balance -= value;
        updateBalance();
        addTransactionToList("Saque", value);
        amountInput.value = "";
    }
});

// Inicializar app
loadData();
