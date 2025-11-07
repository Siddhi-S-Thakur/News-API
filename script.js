const apiKey = "b8..............745bb86646b4e..........";

async function getNews() {
  const query = document.getElementById("searchInput").value;
  const newsContainer = document.getElementById("newsContainer");
  newsContainer.innerHTML = "⏳ Loading...";

  try {
    const res = await fetch(
      `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&language=en&pageSize=6&apiKey=${apiKey}`
    );

    const data = await res.json();

    if (data.articles.length === 0) {
      newsContainer.innerHTML = "No articles found 😕";
      return;
    }

    let htmlContent = "";
    data.articles.forEach((article) => {
      htmlContent += `
        <div class="news-card">
          <h3>${article.title}</h3>
          <p><strong>Source:</strong> ${article.source.name}</p>
          <p>${article.description || "No description available."}</p>
          <a href="${article.url}" target="_blank">Read more →</a>
        </div>
      `;
    });

    newsContainer.innerHTML = htmlContent;
  } catch (error) {
    newsContainer.innerHTML = "Failed to fetch news. Please try again later.";
    console.error(error);
  }
}
