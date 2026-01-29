document.addEventListener("DOMContentLoaded", () => {
  if (!localStorage.getItem("premium")) return;

  const ctx = document.getElementById("chart");
  if (!ctx) return;

  const data = JSON.parse(localStorage.getItem("transactions")) || [];
  let entrada = 0, saida = 0;

  data.forEach(t => {
    t.type === "entrada" ? entrada += t.value : saida += t.value;
  });

  new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["Entradas", "Saídas"],
      datasets: [{
        data: [entrada, saida],
        backgroundColor: ["#00ff88", "#ff4444"]
      }]
    }
  });
});
