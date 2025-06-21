function updateMoodMessage() {
  const mood = document.getElementById('moodSelect').value;
  const messageBox = document.getElementById('moodMessage');

  const messages = {
    happy: "😊 You're shining today!",
    sad: "😢 It's okay to feel down. Tomorrow is a new day.",
    angry: "😠 Take a breath. You’ve got this!",
  };

  messageBox.textContent = messages[mood] || "Select a mood to see a message.";
}

function storeMood() {
  const mood = document.getElementById('moodSelect').value;
  const comment = document.getElementById('moodComment').value;

  if (!mood) {
    alert("Please select a mood.");
    return;
  }

  const moodEntry = {
    date: new Date().toLocaleDateString(),
    mood,
    comment
  };

  let history = JSON.parse(localStorage.getItem('moodHistory')) || [];
  history.push(moodEntry);
  localStorage.setItem('moodHistory', JSON.stringify(history));

  document.getElementById('moodComment').value = "";
  document.getElementById('moodSelect').value = "";
  updateMoodMessage();
  alert("Mood saved!");
}

function loadMoodHistory() {
  const table = document.getElementById('moodTable').querySelector('tbody');
  const history = JSON.parse(localStorage.getItem('moodHistory')) || [];

  table.innerHTML = history.length
    ? history.map(entry => `
        <tr>
          <td>${entry.date}</td>
          <td>${entry.mood}</td>
          <td>${entry.comment || '—'}</td>
        </tr>`).join('')
    : `<tr><td colspan="3">No mood entries yet.</td></tr>`;
}

function toggleTableVisibility() {
  const table = document.getElementById('moodTable');
  table.style.display = table.style.display === "none" ? "table" : "none";
}

function clearHistory() {
  localStorage.removeItem('moodHistory');
  loadMoodHistory();
  document.getElementById('statusMsg').textContent = "History cleared.";
}
