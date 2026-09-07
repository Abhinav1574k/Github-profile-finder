const searchForm = document.getElementById("searchForm");
const usernameInput = document.getElementById("usernameInput");
const searchBtn = document.getElementById("searchBtn");

const loading = document.getElementById("loading");
const errorMessage = document.getElementById("errorMessage");
const profileSection = document.getElementById("profileSection");

const API_URL = "https://api.github.com/users";


searchForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const username = usernameInput.value.trim();

    if (!username) {
        showError("Please enter a GitHub username.");
        return;
    }

    await searchUser(username);
});


async function searchUser(username) {

    showLoading();
    clearError();

    try {

        const profileResponse = await fetch(
            `${API_URL}/${encodeURIComponent(username)}`
        );

        if (profileResponse.status === 404) {
            throw new Error("GitHub user not found. Please check the username.");
        }

        if (profileResponse.status === 403) {
            throw new Error(
                "GitHub API rate limit reached. Please try again later."
            );
        }

        if (!profileResponse.ok) {
            throw new Error("Unable to fetch GitHub profile.");
        }

        const profile = await profileResponse.json();


        const repoResponse = await fetch(
            `${API_URL}/${encodeURIComponent(username)}/repos?sort=stars&direction=desc&per_page=6`
        );

        if (!repoResponse.ok) {
            throw new Error("Unable to fetch repositories.");
        }

        const repositories = await repoResponse.json();

        displayProfile(profile);
        displayRepositories(repositories);

    } catch (error) {

        console.error("GitHub API Error:", error);

        profileSection.classList.add("hidden");

        showError(error.message);

    } finally {

        hideLoading();

    }
}


function displayProfile(profile) {

    document.getElementById("avatar").src =
        profile.avatar_url;

    document.getElementById("profileName").textContent =
        profile.name || profile.login;

    document.getElementById("profileUsername").textContent =
        `@${profile.login}`;

    document.getElementById("profileBio").textContent =
        profile.bio || "No bio available.";

    document.getElementById("profileLink").href =
        profile.html_url;

    document.getElementById("followers").textContent =
        profile.followers;

    document.getElementById("following").textContent =
        profile.following;

    document.getElementById("repos").textContent =
        profile.public_repos;

    document.getElementById("gists").textContent =
        profile.public_gists;

    document.getElementById("location").textContent =
        profile.location || "Not available";

    document.getElementById("company").textContent =
        profile.company || "Not available";


    const websiteElement = document.getElementById("website");

    if (profile.blog) {

        websiteElement.innerHTML = "";

        const link = document.createElement("a");

        let website = profile.blog;

        if (!website.startsWith("http")) {
            website = `https://${website}`;
        }

        link.href = website;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.textContent = profile.blog;

        websiteElement.appendChild(link);

    } else {

        websiteElement.textContent = "Not available";

    }


    if (profile.created_at) {

        const date = new Date(profile.created_at);

        document.getElementById("joined").textContent =
            date.toLocaleDateString();

    }


    profileSection.classList.remove("hidden");
}


function displayRepositories(repositories) {

    const repoList = document.getElementById("repoList");

    repoList.innerHTML = "";

    if (repositories.length === 0) {

        repoList.innerHTML =
            "<p>No public repositories found.</p>";

        return;
    }


    repositories.forEach((repo) => {

        const card = document.createElement("article");

        card.className = "repo-card";

        const description =
            repo.description || "No description available.";

        card.innerHTML = `
            <h3>
                <a
                    href="${repo.html_url}"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    ${escapeHTML(repo.name)}
                </a>
            </h3>

            <p class="repo-description">
                ${escapeHTML(description)}
            </p>

            <div class="repo-meta">
                <span>⭐ ${repo.stargazers_count}</span>
                <span>🍴 ${repo.forks_count}</span>
                <span>💻 ${escapeHTML(repo.language || "N/A")}</span>
            </div>
        `;

        repoList.appendChild(card);

    });
}


function escapeHTML(value) {

    const div = document.createElement("div");

    div.textContent = value;

    return div.innerHTML;
}


function showLoading() {

    loading.classList.remove("hidden");

    searchBtn.disabled = true;
    searchBtn.textContent = "Searching...";

}


function hideLoading() {

    loading.classList.add("hidden");

    searchBtn.disabled = false;
    searchBtn.textContent = "Search";

}


function showError(message) {

    errorMessage.textContent = message;

    errorMessage.classList.remove("hidden");

}


function clearError() {

    errorMessage.textContent = "";

    errorMessage.classList.add("hidden");

}