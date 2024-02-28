async function lockedProfile() {
    const url = `http://localhost:3030/jsonstore/advanced/profiles`;
    const main = document.querySelector(`main`);

    const request = await fetch(url);
    const data = await request.json();
    data.then((data) => {
        Object.values(data).forEach((profile, index) => {
            const div = document.createElement(`div`);
            div.classList.add(`profile`);
            div.innerHTML = `
            <img src="./iconProfile2.png" class="userIcon" />
            <label>Lock</label>
            <input type="radio" name="user${index + 1}Locked" value="lock" checked>
            <label>Unlock</label>
            <input type="radio" name="user${index + 1}Locked" value="unlock"><br>
            <hr>
            <label>Username</label>
            <input type="text" name="user${index + 1}Username" value="${profile.username}" disabled readonly />
            <div id="user${index + 1}HiddenFields">
                <hr>
                <label>Email:</label>
                <input type="email" name="user${index + 1}Email" value="${profile.email}" disabled readonly />
                <label>Age:</label>
                <input type="email" name="user${index + 1}Age" value="${profile.age}" disabled readonly />
            </div>
            <button>Show more</button>
            `;

            const showMoreButton = div.querySelector(`button`);
            showMoreButton.addeventListener(`click`, () => toggleHiddenFields(`user${index + 1}HiddenFields`));

            function toggleHiddenFields(id) {
                const hiddenFields = div.querySelector(`#${id}`);
                const button = div.querySelector(`button`);

                if (hiddenFields.style.display === `none` || hiddenFields.style.display === ``) {
                    hiddenFields.style.display = `block`;
                    button.textContent = `Hide it`;
                } else {
                    hiddenFields.style.display = `none`;
                    button.textContent = `Show more`;
                }
            }

            main.appendChild(div);
        });
    });
}