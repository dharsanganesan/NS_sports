let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" activedot", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
  setTimeout(showSlides, 2000); // Change image every 2 seconds
}
// this is for slider animations
$(".slider").owlCarousel({
  loop: true,
  autoplay: true,
  autoplayTimeout: 3000, //2000ms = 2s;
  autoplayHoverPause: true,
});
// Updated live score display with improved formatting and additional data validation
const API_URL = 'https://api.cricapi.com/v1/currentMatches?apikey=[f527c16e-576e-4ded-9fe1-97d9bf381a67]&offset=0';
const API_KEY = 'ur44TH1six4Xi1aMmmDtxyf0Yfpsm4sp';

// Function to fetch live scores
async function fetchLiveScores() {
    try {
        const response = await fetch(`${API_URL}?apikey=${API_KEY}`, {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Live Scores:", data);

        // Ensure the API returns the expected data structure
        if (Array.isArray(data.matches) && data.matches.length > 0) {
            updateLiveScoreUI(data.matches);
        } else {
            console.warn("No matches found in API response.");
            updateLiveScoreUI([]);
        }
    } catch (error) {
        console.error("Error fetching live scores:", error);
        displayErrorMessage("Failed to fetch live cricket scores. Please try again later.");
    }
}

// Function to update the UI with live cricket scores
function updateLiveScoreUI(matches) {
    const scoreContainer = document.getElementById('live-scores');
    scoreContainer.innerHTML = ""; // Clear previous content

    if (matches.length === 0) {
        scoreContainer.innerHTML = `<p>No live matches currently available.</p>`;
        return;
    }

    matches.forEach(match => {
        const matchElement = document.createElement('div');
        matchElement.className = 'match-card';

        matchElement.innerHTML = `
            <div class="match-header">
                <h3>${match.title || "Match Title Unavailable"}</h3>
                <p><strong>Status:</strong> ${match.status || "Unknown"}</p>
            </div>
            <div class="match-body">
                <p><strong>Teams:</strong> ${match.team1} vs ${match.team2}</p>
                <p><strong>Score:</strong> ${match.score || "N/A"}</p>
                <p><strong>Venue:</strong> ${match.venue || "N/A"}</p>
                <p><strong>Start Time:</strong> ${match.startTime || "N/A"}</p>
            </div>
        `;

        scoreContainer.appendChild(matchElement);
    });
}

// Function to display an error message
function displayErrorMessage(message) {
    const scoreContainer = document.getElementById('live-scores');
    scoreContainer.innerHTML = `<p class="error">${message}</p>`;
}

// Initial call to fetch scores
fetchLiveScores();

// Call the function to fetch scores every minute (60000ms = 1 minute)
setInterval(fetchLiveScores, 60000);
// Function to update the UI with live cricket scores
function updateLiveScoreUI(matches) {
    const scoreContainer = document.getElementById('live-scores');
    scoreContainer.innerHTML = ""; // Clear previous content

    if (matches.length === 0) {
        scoreContainer.innerHTML = `<p>No live matches currently available.</p>`;
        return;
    }

    matches.forEach(match => {
        const matchElement = document.createElement('div');
        matchElement.className = 'match-card';
        matchElement.innerHTML = `
            <h3>${match.title || "Match Title Unavailable"}</h3>
            <p><strong>Status:</strong> ${match.status || "Unknown"}</p>
            <p><strong>Score:</strong> ${match.score || "N/A"}</p>
            <p><strong>Teams:</strong> ${match.team1} vs ${match.team2}</p>
        `;
        scoreContainer.appendChild(matchElement);
    });
}

// Function to display an error message
function displayErrorMessage(message) {
    const scoreContainer = document.getElementById('live-scores');
    scoreContainer.innerHTML = `<p class="error">${message}</p>`;
}

// Initial call to fetch scores
fetchLiveScores();

// Call the function to fetch scores every minute (60000ms = 1 minute)
setInterval(fetchLiveScores, 60000);

// for news
const RSS_FEED_URL = 'https://rss.app/feeds/6ZLDwyZyVs1ikINq.xml';
// Function to fetch and parse the RSS feed
async function fetchRSSFeed() {
    try {
        const response = await fetch(RSS_FEED_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const text = await response.text();
        const parser = new DOMParser();
        const xml = parser.parseFromString(text, "application/xml");

        // Parse and display the news items
        displayNews(xml);
    } catch (error) {
        console.error("Error fetching RSS feed:", error);
        document.getElementById('news-list').innerHTML = `<p>Failed to load news. Please try again later.</p>`;
    }
}

// Function to display news items
function displayNews(xml) {
    const items = xml.querySelectorAll("item");
    const newsList = document.getElementById('news-list');
    newsList.innerHTML = ""; // Clear any existing content

    items.forEach((item) => {
        const title = item.querySelector("title").textContent;
        const description = item.querySelector("description").textContent;
        const link = item.querySelector("link").textContent;

        const newsItem = document.createElement('div');
        newsItem.className = 'news-item';
        newsItem.innerHTML = `
            <h3><a href="${link}" target="_blank">${title}</a></h3>
            <p>${description}</p>
        `;
        newsList.appendChild(newsItem);
    });
}

// Initial fetch of RSS feed
fetchRSSFeed();

// Refresh news every 5 minutes (300000ms)
setInterval(fetchRSSFeed, 300000);