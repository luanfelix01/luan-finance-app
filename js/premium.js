const PREMIUM_CODE = "LUAN-PREMIUM"

// Função de ativação
function activatePremium() {
  const input = document.getElementById("premiumCode").value.trim().toUpperCase()

  if (input === PREMIUM_CODE) {
    localStorage.setItem("premium", "true")
    alert("💎 Premium ativado com sucesso!")
    location.href = "index.html"
  } else {
    alert("❌ Código inválido")
  }
}

// Controle de visualização
document.addEventListener("DOMContentLoaded", () => {
  const isPremium = localStorage.getItem("premium") === "true"

  const status = document.getElementById("premiumStatus")
  if (status) {
    status.innerText = isPremium ? "💎 Premium ativo" : "🔓 Gratuito"
  }

  document.querySelectorAll(".premium-only").forEach(el => {
    el.style.display = isPremium ? "block" : "none"
  })
})
