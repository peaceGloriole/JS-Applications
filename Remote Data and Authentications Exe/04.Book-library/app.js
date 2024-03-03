const getAllBooksUrl = `http://localhost:3030/jsonstore/collections/books`;
document.getElementById(`loadBooks`).addEventListener(`click`, loadBooks);
document.querySelector('form button').addEventListener('click', createBook);

async function loadBooks() {
  const response = await fetch(getAllBooksUrl);

  try {
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = await response.json();
  } catch (error) {
    alert(error.message);
  }

}

async function createBook() {
  const title = document.querySelector("form input[name='title']").value;
  const author = document.querySelector("form input[name='author']").value;

  if (title === '' || author === '') {
    return
  }

  const newBook = {
    title,
    author
  }

  const response = await fetch(getAllBooksUrl, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newBook)
  });

  try {
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = await response.json();
  } catch (error) {
    alert(error.message);
  }

  document.querySelector("form input[name='title']").value = '';
  document.querySelector("form input[name='author']").value = '';
  loadBooks();
}