const tooltip = document.createElement('div');
tooltip.className = 'tooltip';
document.body.appendChild(tooltip);

function renderHeatmap(data) {
  const heatmapContainer = document.getElementById("heatmap");
  const orderedMonths = Object.keys(data.data).sort((a, b) => parseInt(a) - parseInt(b));

  for (const month of orderedMonths) {
    const days = data.data[month];
    const monthDiv = document.createElement("div");
    monthDiv.className = "month";
    const monthName = document.createElement("div");
    monthName.className = "month-name";
    monthName.textContent = new Date(data.year, parseInt(month) - 1).toLocaleString("default", { month: "long" });
    monthDiv.appendChild(monthName);
    const daysGrid = document.createElement("div");
    daysGrid.className = "days";
    const firstDayOfMonth = new Date(data.year, parseInt(month) - 1, 1).getDay();

    for (let i = 0; i < firstDayOfMonth; i++) {
      const emptyDayDiv = document.createElement("div");
      emptyDayDiv.className = "day empty-day";
      daysGrid.appendChild(emptyDayDiv);
    }

    const orderedDays = Object.keys(days).sort((a, b) => parseInt(a) - parseInt(b));

    for (const day of orderedDays) {
      const dayData = days[day];
      const dayDiv = document.createElement("div");
      dayDiv.className = "day";
      const { totalSongs } = dayData;
      let intensityLevel = '';

      if (totalSongs < 10) {
        intensityLevel = 'level1';
      } else if (totalSongs < 20) {
        intensityLevel = 'level2';
      } else if (totalSongs < 30) {
        intensityLevel = 'level3';
      } else if (totalSongs < 40) {
        intensityLevel = 'level4';
      } else {
        intensityLevel = 'level5';
      }

      dayDiv.setAttribute('data-songs', intensityLevel);

      dayDiv.addEventListener("mouseover", (e) => {
        tooltip.style.display = "block";
        tooltip.style.left = `${e.pageX + 10}px`;
        tooltip.style.top = `${e.pageY + 10}px`;
        tooltip.textContent = `Date: ${month}/${day}/${data.year}
Total Songs: ${dayData.totalSongs}
Most Played: ${dayData.mostPlayedSong}
Duration: ${dayData.totalDuration} mins`;
      });

      dayDiv.addEventListener("mouseout", () => {
        tooltip.style.display = "none";
      });

      daysGrid.appendChild(dayDiv);
    }

    monthDiv.appendChild(daysGrid);
    heatmapContainer.appendChild(monthDiv);
  }
}

fetch("music_data_2023.json")
  .then((response) => response.json())
  .then((data) => {
    renderHeatmap(data);
  })
  .catch((error) => {
    console.error("Error loading JSON:", error);
  });
