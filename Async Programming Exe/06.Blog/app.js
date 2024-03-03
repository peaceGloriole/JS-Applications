function attachEvents() {
    const urlPosts = `http://localhost:3030/jsonstore/blog/posts`;
    const urlComments = `http://localhost:3030/jsonstore/blog/comments`;
    const postTitle = document.getElementById('post-title');
    const postContent = document.getElementById('post-body');
    const postTextUl = document.getElementById('post-comments');

    const btnLoadPosts = document.getElementById('btnLoadPosts');
    const btnViewPost = document.getElementById('btnViewPost');

    btnViewPost.addEventListener('click', loadView);

    btnLoadPosts.addEventListener(`click`, async () => {
        const postsResponse = await fetch(urlPosts);
        const postData = await postsResponse.json();

        try {
            if (postData.error) {
                throw new Error(postData.error);
            }

            const dataPosts = Object.entries(postData)
                .map(([id, post]) => createOption(id, post))
                .join(``);
            const select = document.getElementById('posts');
            select.innerHTML = dataPosts;

        } catch (error) {
            alert(postData.message);
        }
    });

    async function loadView() {
        const postId = document.getElementById('posts').value;

        try {
            const postResponse = await fetch(`${urlPosts}/${postId}`);
            const postData = await postResponse.json();

            const commentsResponse = await fetch(urlComments);
            const commentsData = await commentsResponse.json();

            if (postData.error) {
                throw new Error(postData.error);
            }

            postTitle.textContent = postData.title;
            postContent.textContent = postData.body;

            let postComments = [];
            if (Array.isArray(commentsData)) {
                postComments = commentsData.filter(comment => comment.postId === postId);
            } else if (typeof commentsData === 'object') {
                postComments = Object.values(commentsData)
                    .filter(comment => comment.postId === postId);
            }

            postTextUl.innerHTML = '';

            postComments.forEach(comment => {
                const li = createComment(comment);
                postTextUl.appendChild(li);
            });

        } catch (error) {
            alert(error.message);
        }
    }

    function createComment(comment) {
        const li = document.createElement('li');
        li.textContent = comment.text;
        return li;
    }

    function createOption(postId, { ...post }) {
        return `<option value="${postId}" data-post-id="${postId}">${post.title}</option>`;
    }
}

attachEvents();
