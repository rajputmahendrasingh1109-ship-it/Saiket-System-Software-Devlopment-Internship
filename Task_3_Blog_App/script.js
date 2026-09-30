let posts = JSON.parse(localStorage.getItem("blogPosts")) || [];

function displayPosts() {
    const postsContainer = document.getElementById("posts");

    postsContainer.innerHTML = "";

    posts.forEach((post, index) => {
        postsContainer.innerHTML += `
            <div class="post">
                <h3>${post.title}</h3>
                <p>${post.content}</p>
                <button class="delete-btn" onclick="deletePost(${index})">
                    Delete
                </button>
            </div>
        `;
    });
}

function addPost() {
    const title = document.getElementById("title").value.trim();
    const content = document.getElementById("content").value.trim();

    if (title === "" || content === "") {
        alert("Please enter title and content.");
        return;
    }

    const newPost = {
        title: title,
        content: content
    };

    posts.push(newPost);

    localStorage.setItem("blogPosts", JSON.stringify(posts));

    document.getElementById("title").value = "";
    document.getElementById("content").value = "";

    displayPosts();
}

function deletePost(index) {
    posts.splice(index, 1);

    localStorage.setItem("blogPosts", JSON.stringify(posts));

    displayPosts();
}

displayPosts();