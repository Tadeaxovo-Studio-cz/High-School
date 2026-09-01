function showTime() {
  const currentTime = document.getElementById("currentTime");
  const now = new Date();

  currentTime.textContent = now.toLocaleString("cs-CZ");
}

showTime();
setInterval(showTime, 1000);