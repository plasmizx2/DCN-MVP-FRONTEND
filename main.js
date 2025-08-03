// Check login status
const user = localStorage.getItem("dcn_user");
if (!user && window.location.pathname.includes("index.html")) {
  window.location.href = "login.html";
}

// Display username
document.addEventListener("DOMContentLoaded", () => {
  const userDisplay = document.getElementById("username");
  if (userDisplay) userDisplay.innerText = user || "anonymous";
});

// Login handler
function handleLogin(e) {
  e.preventDefault();
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;
  if (user === "demo" && pass === "demo") {
    localStorage.setItem("dcn_user", user);
    window.location.href = "index.html";
  } else {
    alert("Invalid credentials. Use demo/demo");
  }
}

// Signup handler (disabled for now)
function handleSignup(e) {
  e.preventDefault();
  alert("Signup disabled. Use demo/demo login.");
}

// Utility to get current user
function getUser() {
  return localStorage.getItem("dcn_user") || "anonymous";
}

// Submit job to backend
function submitJob() {
  const inputText = document.getElementById("inputText").value;
  const taskType = document.getElementById("taskType").value;

  fetch("http://localhost:8000/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      input_text: inputText,
      task_type: taskType,
      node_id: "frontend-web",
      user_id: getUser()
    })
  })
  .then(res => res.json())
  .then(data => {
    alert("Job submitted with ID: " + data.job_id);
    loadJobs();
  });
}

// Load job history for current user
function loadJobs() {
  fetch(`http://localhost:8000/user-jobs/${getUser()}`)
    .then(res => res.json())
    .then(data => {
      const jobList = document.getElementById("jobList");
      if (!jobList) return;
      jobList.innerHTML = "";
      data.jobs.forEach(job => {
        const li = document.createElement("li");
        li.innerText = `${job[0]} | ${job[2]} | ${job[3]}\n${job[1]}\n${job[4]}`;
        jobList.appendChild(li);
      });
    });
}