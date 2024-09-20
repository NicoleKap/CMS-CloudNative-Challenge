document.addEventListener("DOMContentLoaded", () => {
  const createArticleForm = document.getElementById("createArticleForm");
  const updateArticleForm = document.getElementById("updateArticleForm");
  const deleteArticleForm = document.getElementById("deleteArticleForm");
  const loadArticlesBtn = document.getElementById("loadArticlesBtn");
  const articlesList = document.getElementById("articlesList");

  // Fetch JWT Token from localStorage
  const token = localStorage.getItem("token");

  if (!token) {
    alert("You are not logged in!");
    window.location.href = "./index.html"; // Redirect to login page
    return;
  }

  // Create Article
  createArticleForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const title = document.getElementById("articleTitle").value;
    const content = document.getElementById("articleContent").value;
    const author = document.getElementById("articleAuthor").value;

    try {
      const response = await fetch("http://localhost:3000/api/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content, author }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Article created successfully");
        createArticleForm.reset();
      } else {
        alert(data.message || "Failed to create article");
      }
    } catch (error) {
      console.error("Error creating article:", error);
    }
  });

  // Load Articles
  loadArticlesBtn.addEventListener("click", async () => {
    console.log("Load Articles button clicked");
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("No token found. Please log in again.");
        return;
      }
      // Fetch and display articles dynamically
      const response = await fetch("http://localhost:3000/api/articles", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("Fetching articles...");
      const data = await response.json();

      if (response.ok && data.data && Array.isArray(data.data.articles)) {
        articlesList.innerHTML = ""; // Article List
        data.data.articles.forEach((article) => {
          const articleElement = document.createElement("div");
          articleElement.innerHTML = `
                    <h3>${article.title}</h3>
                    <p>${article.content}</p>
                    <p><strong>Author ID:</strong> ${article.author}</p>
                    <p><strong>ID:</strong> ${article._id}</p>
                `;
          articlesList.appendChild(articleElement);
        });
      } else {
        console.error("Error in loading articles or no articles found");
        alert(data.message || "Failed to load articles");
      }
    } catch (error) {
      console.error("Error fetching articles:", error);
      alert("Error loading articles");
    }
  });

  // Update Article
  updateArticleForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const articleId = document.getElementById("updateArticleId").value;
    const title = document.getElementById("updateArticleTitle").value;
    const content = document.getElementById("updateArticleContent").value;
    const author = document.getElementById("updateArticleAuthor").value;

    try {
      const response = await fetch(
        `http://localhost:3000/api/articles/${articleId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ title, content, author }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        alert("Article updated successfully");
        updateArticleForm.reset();
      } else {
        alert(data.message || "Failed to update article");
      }
    } catch (error) {
      console.error("Error updating article:", error);
    }
  });

  document.addEventListener("DOMContentLoaded", () => {
    const articlesList = document.getElementById("articlesList");
    const token = localStorage.getItem("token"); // Store the token

    // Articles Display
    async function fetchAndDisplayArticles() {
      try {
        const response = await fetch("http://localhost:3000/api/articles", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (response.ok) {
          articlesList.innerHTML = "";
          data.articles.forEach((article) => {
            const articleElement = document.createElement("div");
            articleElement.setAttribute("data-id", article._id); // Define data-id
            articleElement.innerHTML = `
                        <h3>${article.title}</h3>
                        <p>${article.content}</p>
                        <button class="delete-btn" data-id="${article._id}">Delete</button>
                    `;
            articlesList.appendChild(articleElement);
          });
        } else {
          alert(data.message || "Failed to load articles");
        }
      } catch (error) {
        console.error("Error loading articles:", error);
        alert("Error loading articles");
      }
    }

    // call function for Article uploading
    fetchAndDisplayArticles();

    // Listener για το event της διαγραφής άρθρου
    articlesList.addEventListener("click", async (event) => {
      if (event.target.classList.contains("delete-btn")) {
        const articleId = event.target.getAttribute("data-id");

        // Print ID
        console.log("Attempting to delete article with ID:", articleId);

        const confirmDelete = confirm(
          "Are you sure you want to delete this article?"
        );
        if (!confirmDelete) return;

        try {
          const response = await fetch(
            `http://localhost:3000/api/articles/${articleId}`,
            {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );

          const data = await response.json();
          if (response.ok) {
            // Deleting article from the list
            const articleElement = articlesList.querySelector(
              `[data-id="${articleId}"]`
            );
            if (articleElement) {
              articleElement.remove();
            }
            alert("Article deleted successfully");
          } else {
            alert(data.message || "Failed to delete article");
          }
        } catch (error) {
          console.error("Error deleting article:", error);
          alert("Error deleting article");
        }
      }
    });
  });

  // Delete Article
  deleteArticleForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const articleId = document.getElementById("deleteArticleId").value;

    try {
      const response = await fetch(
        `http://localhost:3000/api/articles/${articleId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        alert("Failed to delete article");
        return;
      }

      const data = response.status !== 204 ? await response.json() : null;

      // if DOM element exists, eliminate it
      const articleElement = articlesList.querySelector(
        `[data-id="${articleId}"]`
      );
      if (articleElement) {
        articleElement.remove();
      }

      alert("Article deleted successfully");
    } catch (error) {
      console.error("Error deleting article:", error);
      alert("Error deleting article");
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const createArticleForm = document.getElementById("createArticleForm");
  const uploadImageForm = document.getElementById("uploadImageForm");
  const articleSelect = document.getElementById("articleSelect");
  const uploadImageMessage = document.getElementById("uploadImageMessage");
  const loadArticlesButton = document.getElementById("loadArticlesButton");
  const articlesList = document.getElementById("articlesList");

  // Create a new article
  createArticleForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const title = document.getElementById("createArticleTitle").value;
    const content = document.getElementById("createArticleContent").value;
    const author = document.getElementById("createArticleAuthor").value;

    try {
      const response = await fetch("http://localhost:3000/api/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content, author }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Article created successfully!");
        createArticleForm.reset();
        loadArticlesToSelect(); // reload tha page
      } else {
        alert(data.message || "Failed to create article");
      }
    } catch (error) {
      console.error("Error creating article:", error);
    }
  });

  // dropdown with articles
  async function loadArticlesToSelect() {
    articleSelect.innerHTML = "";
    try {
      const response = await fetch("http://localhost:3000/api/articles", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      data.articles.forEach((article) => {
        const option = document.createElement("option");
        option.value = article._id;
        option.textContent = article.title;
        articleSelect.appendChild(option);
      });
    } catch (error) {
      console.error("Error loading articles for select:", error);
    }
  }

  // Image transfer for specific articles
  uploadImageForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const articleId = articleSelect.value;
    const imageFile = document.getElementById("articleImage").files[0];

    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const response = await fetch(
        `http://localhost:3000/api/upload/${articleId}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      if (response.ok) {
        uploadImageMessage.textContent = "Image uploaded successfully!";
        uploadImageMessage.style.color = "green";
        fetchArticles(); // Load the articles again
      } else {
        uploadImageMessage.textContent =
          data.message || "Failed to upload image";
        uploadImageMessage.style.color = "red";
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      uploadImageMessage.textContent = "Error uploading image";
      uploadImageMessage.style.color = "red";
    }
  });

  // Articles loading
  async function fetchArticles() {
    articlesList.innerHTML = ""; // Defines the article list
    try {
      const response = await fetch("http://localhost:3000/api/articles", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      data.articles.forEach((article) => {
        const articleElement = document.createElement("div");
        articleElement.innerHTML = `
            <h3>${article.title}</h3>
            <p>${article.content}</p>
            <p><strong>Author:</strong> ${article.author}</p>
            ${
              article.image
                ? `<img src="${article.image}" alt="Article Image" style="max-width: 200px;" />`
                : ""
            }
        `;
        articlesList.appendChild(articleElement);
      });
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  }

  // Articles load
  loadArticlesButton.addEventListener("click", () => {
    fetchArticles();
  });

  loadArticlesToSelect(); // Load articles into the dropdown on page load
});
