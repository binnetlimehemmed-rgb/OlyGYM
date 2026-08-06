// ===========================
// OlyGYM - Main Script
// ===========================

// Başla düyməsini seçirik
const startBtn = document.getElementById("startBtn");

// Əgər düymə mövcuddursa
if (startBtn) {
    startBtn.addEventListener("click", () => {
        alert("OlyGYM-ə xoş gəldin! 💪");
    });
}
