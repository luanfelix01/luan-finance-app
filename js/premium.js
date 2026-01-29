const PREMIUM_CODE = "LUANPREMIUM"

// ===============================
// ATIVAÇÃO
// ===============================
function activatePremium() {
  const input = document.getElementById("premiumCode").value
    .trim()
    .toUpperCase()

  if (input === PREMIUM_CODE) {
    localStorage.setItem("premium", "true")
    alert("💎 Premium ativado com sucesso!")
    window.location.href = "premium-ativo.html"
  } else {
    alert("❌ Código inválido")
  }
}

// ===============================
// STATUS
// ===============================
function isPremium() {
  return localStorage.getItem("premium") === "true"
}

// ===============================
// META MENSAL (PREMIUM)
// ===============================
function salvarMeta() {
  const meta = toNumber(document.getElementById("meta").value)
  localStorage.setItem("metaMensal", meta)
  alert("🎯 Meta salva com sucesso!")
}

// ===============================
// CONTROLE PREMIUM
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".premium-only").forEach(el => {
    el.style.display = isPremium() ? "block" : "none"
  })
})
