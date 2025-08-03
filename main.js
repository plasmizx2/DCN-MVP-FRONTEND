// main.js
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const SUPABASE_URL = "https://qpbodnhybepicpzazjzp.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFwYm9kbmh5YmVwaWNwemF6anpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQyMzYyOTUsImV4cCI6MjA2OTgxMjI5NX0.DRjrKxFnLilCzlB66iTcSwCWb0sAJCMZUYIN0ve4i3k"; // Replace this with your anon key

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Handle Signup
async function handleSignup(event) {
  event.preventDefault();
  const email = document.getElementById("signup_email").value;
  const password = document.getElementById("signup_password").value;

  const { error } = await supabase.auth.signUp({ email, password });
  if (error) {
    alert("Signup failed: " + error.message);
  } else {
    alert("Check your email for a confirmation link.");
  }
}

// Handle Login
async function handleLogin(event) {
  event.preventDefault();
  const email = document.getElementById("login_email").value;
  const password = document.getElementById("login_password").value;

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    alert("Login failed: " + error.message);
  } else {
    localStorage.setItem("dcn_user", JSON.stringify(data.session));
    window.location.href = "index.html";
  }
}

// Get current user (optional)
async function getUser() {
  const { data } = await supabase.auth.getUser();
  return data.user;
}