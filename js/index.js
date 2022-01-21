const search = document.querySelector('.search_book');
const filterContainer = document.querySelector('.filter');

window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  header.classList.toggle('sticky', window.scrollY > 0);
});

document.addEventListener('DOMContentLoaded', () => {
  const addBookForm = document.getElementById('form');
  showNavbar();
  openModal();
  if(isStorageExist()) {
    loadDataFromLocalStorage();
  }

  if (addBookForm) {
    addBookForm.addEventListener('submit', (e) => {
      e.preventDefault();
      addBook();
    });
  }
});

search.addEventListener('change', (e) => {
  refreshDataFromBooks(searchBooks(books, e.target.value));
});

filterContainer.addEventListener('change', (e) => {
  refreshDataFromBooks(filterBooks(books, e.target.value));
})

document.addEventListener("ondatasaved", () => {
  console.log("Data berhasil disimpan.");
});

document.addEventListener("onDataLoaded", () => {
  refreshDataFromBooks(books);
});
