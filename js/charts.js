document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("premium") !== "true") return;

  const canvas = document.getElementById("chart");
  if (!canvas) return;

  const data = JSON.parse(localStorage.getItem("transactions")) || [];
  const months = {};
  
  data.forEach(t => {
    const m = t.date.slice(0, 7);
    if (!months[m]) months[m] = 0;
    months[m] += t.type === "entrada" ? t.value : -t.value;
  });

  new Chart(canvas, {
    type: "line",
    data: {
      labels: Object.keys(months),
      datasets: [{
        label: "Saldo Mensal",
        data: Object.values(months),
        borderColor: "#00ff88"
      }]
    }
  });
});
