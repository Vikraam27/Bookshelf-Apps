const BOOK_KEY = "BOOKSHELF_V1";

let books = [];

const isStorageExist = () => {
  if(!typeof(Storage)) {
    alert("browser tidak support local storage");
    return false;
  }
  return true;
};

const saveData = () => {
  const parsed = JSON.stringify(books);
  localStorage.setItem(BOOK_KEY, parsed);
  document.dispatchEvent(new Event("ondatasaved"));
};

const loadDataFromLocalStorage = () => {
  const dataStorage = localStorage.getItem(BOOK_KEY);

  let data = JSON.parse(dataStorage);

  if(data) {
    books = data;
  }
  document.dispatchEvent(new Event("onDataLoaded"));
};

const updateDataFromLocalStorage = () => {
  if(isStorageExist()) {
    saveData()
  }
}

const refreshDataFromBooks = (booksData) => {
  const container = document.querySelector(".book-container");
  if(booksData.length !== 0) {
    let htmlContainer =  ''
    booksData.map((data) => htmlContainer += bookCardTemplate(data));
    return container.innerHTML = htmlContainer;
  }
  if(booksData.length === 0) {
    return container.innerHTML =  "<h3 class='empty-book'>you don't have a book, try add a new book</h3>"
  }
};

const searchBooks = (rows, query) => {
  return rows.filter((item) => item.title.toLowerCase().includes(query.toLowerCase()))
}

const filterBooks = (rows, val) => {
  if(val === '0') {
    return rows.filter((item) => item.isCompleted === false);
  }
  if (val === '1') {
    return rows.filter((item) => item.isCompleted === true);
  }
  return rows;
}

const composeTodoObject = (
  title, auhtor, tags, year, isCompleted = false,
) => {
  return {
    id: +new Date(),
    title,
    auhtor,
    tags,
    year,
    isCompleted
  };
}
