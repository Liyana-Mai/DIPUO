const API_URL = "http://localhost:5000/api/podcasts"; // Now fetching from your backend

async function fetchPodcasts() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const container = document.getElementById("podcast-container");
        container.innerHTML = "";

        data.podcasts.forEach(podcast => {
            const podcastItem = document.createElement("div");
            podcastItem.classList.add("podcast-item");
            podcastItem.innerHTML = `
                <img src="${podcast.image}" alt="${podcast.title}" class="podcast-image"/>
                <h3>${podcast.title}</h3>
                <p>${podcast.description}</p>
            `;
            container.appendChild(podcastItem);
        });
    } catch (error) {
        console.error("Error fetching podcasts:", error);
        document.getElementById("podcast-container").innerHTML = "Oops! Unable to load podcasts.";
    }
}

document.addEventListener("DOMContentLoaded", fetchPodcasts);

// Handle login
document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    
    const storedEmail = localStorage.getItem("userEmail");
    const storedPassword = localStorage.getItem("userPassword");

    if (!storedEmail || !storedPassword) {
        document.getElementById("login-message").textContent = "No account found. Please sign up.";
        return;
    }

    if (email === storedEmail && password === storedPassword) {
        localStorage.setItem("userSession", "loggedIn");
        document.getElementById("login-message").textContent = "Login successful! Redirecting...";
        setTimeout(() => window.location.href = "dashboard.html", 1500);
    } else {
        document.getElementById("login-message").textContent = "Invalid email or password.";
    }
});

// Handle logout
function logout() {
    localStorage.removeItem("userSession");
    window.location.href = "index.html";
}

// Check if user is logged in
function checkSession() {
    if (localStorage.getItem("userSession") === "loggedIn") {
        window.location.href = "dashboard.html";
    }
}
checkSession();

// Toggle between login and register forms
document.getElementById("register-link").addEventListener("click", function(event) {
    event.preventDefault();
    document.getElementById("login").style.display = "none";
    document.getElementById("register").style.display = "block";
});

document.getElementById("login-link").addEventListener("click", function(event) {
    event.preventDefault();
    document.getElementById("register").style.display = "none";
    document.getElementById("login").style.display = "block";
});

// Handle registration
document.getElementById("register-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const email = document.getElementById("reg-email").value.trim();
    const password = document.getElementById("reg-password").value.trim();
    
    if (email && password) {
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userPassword", password);
        document.getElementById("register-message").textContent = "Registration successful! Please login.";
        document.getElementById("register").style.display = "none";
        document.getElementById("login").style.display = "block";
    } else {
        document.getElementById("register-message").textContent = "Please fill in all fields.";
    }
});
