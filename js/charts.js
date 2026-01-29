const ctx = document.getElementById("chart")

new Chart(ctx, {
  type: "doughnut",
  data: {
    labels: ["Entradas", "Saídas"],
    datasets: [{
      data: [
        localStorage.getItem("income") || 0,
        localStorage.getItem("expense") || 0
      ],
      backgroundColor: ["#00ff88", "#ff4d4d"]
    }]
  }
})
