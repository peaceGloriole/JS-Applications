import { dataService } from './dataService/service.js';
import { html, render } from './node_modules/lit-html/lit-html.js';

const bodyEl = document.querySelector('body');

let isEditClicked = false;
let currentEditBook = null;

const onLoadtemplate = (books) => html`
  <button @click=${loadBooks} id="loadBooks">LOAD ALL BOOKS</button>
  <table>
    <thead>
      <tr>
        <th>Title</th>
        <th>Author</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      ${books ? Object.keys(books).map(key => html`
        <tr>
          <td>${books[key].title}</td>
          <td>${books[key].author}</td>
          <td>
            <button @click=${() => onEdit(books[key])} id="edit">Edit</button>
            <button>Delete</button>
          </td>
        </tr>
      `) : html``}
    </tbody>
  </table>
  <div id="toggle">
    ${isEditClicked ? editFormTemplate(currentEditBook) : addFormTemplate()}
  </div>
`;

const addFormTemplate = () => html`
  <form id="add-form" @submit=${onAddSubmit}>
    <h3>Add book</h3>
    <label for="title">TITLE</label>
    <input type="text" id="title" name="title" placeholder="Title...">
    <label for="author">AUTHOR</label>
    <input type="text" id="author" name="author" placeholder="Author...">
    <input type="submit" value="Submit">
  </form>
`;

const editFormTemplate = (book) => html`
  <form @submit=${onEditSubmit} id="edit-form">
    <input type="hidden" name="id" value="${book.id}">
    <h3>Edit book</h3>
    <label>TITLE</label>
    <input type="text" name="title" placeholder="Title..." value="${book.title}">
    <label>AUTHOR</label>
    <input type="text" name="author" placeholder="Author..." value="${book.author}">
    <input type="submit" value="Save">
  </form>
`;

async function loadBooks() {
  const books = await dataService.getAllBooks();
  render(onLoadtemplate(books), bodyEl);
}

async function onAddSubmit(e) {
  e.preventDefault();

  const form = new FormData(e.target);
  const title = form.get('title');
  const author = form.get('author');

  if (!title || !author) {
    return alert('All fields are required!');
  }

  const data = {
    title,
    author
  }

  try {
    await dataService.postNewBook(data);
    const books = await dataService.getAllBooks();
    e.target.reset();
    render(onLoadtemplate(books), bodyEl);
  } catch (error) {
    alert(error.message);
  }
}

function onEdit(book) {
  isEditClicked = true;
  currentEditBook = book;
  render(onLoadtemplate(), bodyEl);
  loadBooks();
}

async function onEditSubmit(e) {
  e.preventDefault();

  const form = new FormData(e.target);

  const title = form.get('title');
  const author = form.get('author');

  if (!title || !author) {
    return alert('All fields are required!');
  }

  if (!currentEditBook) {
    alert('Error: No book selected for editing');
    return;
  }

  const data = {
    _id: currentEditBook._id,
    title,
    author
  }
  try {
    await dataService.updateBook(currentEditBook._id, data);
    const books = await dataService.getAllBooks();
    e.target.reset();
    render(onLoadtemplate(books), bodyEl);
    isEditClicked = false;
    currentEditBook = null;
  } catch (error) {
    alert(error.message);
  }
}

render(onLoadtemplate(), bodyEl);
