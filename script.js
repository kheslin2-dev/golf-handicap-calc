// Load saved data or create an empty array
let scores = JSON.parse(localStorage.getItem("golfScores")) || [];

// Save data
function saveScores() {
  localStorage.setItem("golfScores", JSON.stringify(scores));
}

// Display scores
function renderScores() {
  const listDiv = document.getElementById("scoreList");
  listDiv.innerHTML = "";

  scores.forEach((s, i) => {
    const line = document.createElement("div");
    line.textContent = `Score: ${s.score}, Rating: ${s.rating}, Slope: ${s.slope} → Diff: ${s.diff.toFixed(1)}`;
    listDiv.appendChild(line);
  });

  calculateIndex();
}

// Handicap index calculation
function calculateIndex() {
  if (scores.length === 0) {
    document.getElementById("indexResult").textContent = "No data yet.";
    return;
  }

  // Get all differentials
  let diffs = scores.map(s => s.diff).sort((a, b) => a - b);

  // Use the lowest differential (simple version)
  let bestDiff = diffs[0];
  let index = bestDiff * 0.96;

  document.getElementById("indexResult").textContent =
    index.toFixed(1);
}

// Add score event
document.getElementById("addScoreBtn").addEventListener("click", () => {
  const score = parseFloat(document.getElementById("scoreInput").value);
  const rating = parseFloat(document.getElementById("ratingInput").value);
  const slope = parseFloat(document.getElementById("slopeInput").value);

  if (!score || !rating || !slope) {
    alert("Please fill in all fields.");
    return;
  }

  // Calculate the differential
  const diff = ((score - rating) * 113) / slope;

  // Add record
  scores.push({ score, rating, slope, diff });
  saveScores();
  renderScores();
});

// Render on first load
renderScores();
