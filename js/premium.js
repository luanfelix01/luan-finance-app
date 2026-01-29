const PREMIUM_CODE = "LUAN-PREMIUM"

document.getElementById("btnAtivar").onclick = () => {
  const code = document.getElementById("premiumCode").value.trim().toUpperCase()
  if(code === PREMIUM_CODE){
    localStorage.setItem("premium","true")
    location.href = "premium-ativo.html"
  } else {
    alert("Código inválido")
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
