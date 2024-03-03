function attachEvents() {
    document.getElementById(`btnLoad`).addEventListener(`click`, loadPhonebook);
    document.getElementById(`btnCreate`).addEventListener(`click`, createPhonebook);
    const url = `http://localhost:3030/jsonstore/phonebook`;

    async function loadPhonebook() {
        const phonebookUl = document.getElementById(`phonebook`);

        try {
            const response = await fetch(url);
            const data = await response.json();
            phonebookUl.innerHTML = ``;
            Object.entries(data).forEach(([id, phonebook]) => {
                const li = document.createElement(`li`);
                li.textContent = `${phonebook.person}: ${phonebook.phone}`;
                const deleteBtn = document.createElement(`button`);
                deleteBtn.textContent = `Delete`;
            
                deleteBtn.addEventListener(`click`, () => deletePhonebook(id));
                
                li.appendChild(deleteBtn);
                phonebookUl.appendChild(li);
            });

        } catch (error) {
            console.error(error);
        }
    }

    async function deletePhonebook(id) {
        const deleteUrl = `http://localhost:3030/jsonstore/phonebook/${id}`;

        try {
            const response = await fetch(deleteUrl, {
                method: `delete`
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message);
            }

        } catch (error) {
            alert(error.message);
        }

        loadPhonebook();
    }

    async function createPhonebook() {
        let newPersonRef = document.getElementById(`person`);
        let newPhoneRef = document.getElementById(`phone`);

        const newPerson = newPersonRef.value;
        const newPhone = newPhoneRef.value;

        const response = await fetch(url, {
            method: `post`,
            headers: { 'Content-Type': `application/json` },
            body: JSON.stringify({ person: newPerson, phone: newPhone })
        });

        newPersonRef.value = ``;
        newPhoneRef.value = ``;

        loadPhonebook();
    }

}

attachEvents();
