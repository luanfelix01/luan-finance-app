const PREMIUM_CODE = "LUAN-2026"

const status = document.getElementById("premiumStatus")
const premiumActive = localStorage.getItem("premium") === "true"

status.innerText = premiumActive ? "💎 Premium ativo" : "🔓 Gratuito"

document.querySelectorAll(".premium-only").forEach(el => {
  el.style.display = premiumActive ? "block" : "none"
})

function activatePremium() {
  const code = document.getElementById("premiumCode").value

  if (code === PREMIUM_CODE) {
    localStorage.setItem("premium", "true")
    alert("Premium ativado!")
    location.href = "index.html"
  } else {
    alert("Código inválido")
  }
}
