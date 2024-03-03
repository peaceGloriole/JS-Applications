function attachEvents() {
    const url = `http://localhost:3030/jsonstore/messenger`;
    document.getElementById(`submit`).addEventListener(`click`, onSend);
    document.getElementById(`refresh`).addEventListener(`click`, onRefresh);

    async function onSend() {
        let nameRef = document.querySelector("input[name='author']");
        let messageRef = document.querySelector("input[name='content']");

        let name = nameRef.value;
        let message = messageRef.value;

        let data = {
            method: `POST`,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ author: name, content: message })
        }
        
        await fetch(url, data);

        nameRef.value = ``;
        messageRef.value = ``;

        onRefresh();
    }

    async function onRefresh() {
        let textAreaRef = document.getElementById(`messages`);
        textAreaRef.value = ``;

        let response = await fetch(url);
        let data = await response.json();

        Object.values(data).forEach(rec => {
            textAreaRef.value += `${rec.author}: ${rec.content}\n`
        });
    }
}

attachEvents();