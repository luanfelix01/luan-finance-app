const premiumCodes = [
  "LUAN-PREMIUM-2026",
  "VIP-LUAN-999",
  "FINANCE-PRO-LUAN"
];

function activatePremium() {
  const code = document.getElementById("premiumCode").value.trim();

  if (premiumCodes.includes(code)) {
    localStorage.setItem("premium", "true");
    alert("🔥 Premium ativado!");
    location.reload();
  } else {
    alert("❌ Código inválido");
  }
}

function isPremium() {
  return localStorage.getItem("premium") === "true";
}

document.addEventListener("DOMContentLoaded", () => {
  const status = document.getElementById("premiumStatus");

  if (isPremium()) {
    status.innerText = "⭐ PREMIUM ATIVO";
  } else {
    status.innerText = "Modo Normal";
    document.querySelectorAll(".premium-only").forEach(e => e.remove());
  }
});
