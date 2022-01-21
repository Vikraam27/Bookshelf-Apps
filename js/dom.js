const showNavbar = () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('.navigation');

  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navigation.classList.toggle('active');
  });
};

const openModal = () => {
  const modal = document.getElementById("myModal");
  var btn = document.getElementById("modalBtn");
  const close = document.getElementsByClassName("close")[0];

  btn.addEventListener('click', () => {
    modal.style.display = "block";
  });

  close.addEventListener('click', () => {
    modal.style.display = "none";
  });

  window.addEventListener('click', (e) => {
    if (e.target == modal) {
      modal.style.display = "none";
    }
  });
};

const addBook = () => {
  const titleVal = document.getElementById('title').value;
  const auhtorVal = document.getElementById('author').value;
  const tagsVal = document.getElementById('tags').value.split(',');
  const yearVal = document.getElementById('year').value;

  const data = composeTodoObject(titleVal, auhtorVal, tagsVal, yearVal);
  
  const container = document.querySelector(".book-container");
  container.innerHTML += bookCardTemplate(data);
  books.push(data);
  updateDataFromLocalStorage();
  showToast("Successfully added  book");
};

const bookCardTemplate = (data) => `
  <article id=${data.id} class="card">
  <img tabindex="0" src="asset/book.png" alt="finish-reading" class="card-img">
  <div class="card-details">
      <h3 tabindex="0" class="card-title">${data.title}</h3>
      <p class="card-year">${data.auhtor} - ${data.year}</p>
      <div class="card-tags">
        ${data.tags.map((tag) => {
        return `<span class="tag">${tag}</span>`
        })}
      </div>
      <div class="btn-container">
        ${data.isCompleted ?
          `<button type="button" onclick="updateUnfinishRead(${data.id})" class="btn-finish"> <i class="fas fa-check-circle"></i></button>`:
          `<button type="button" onclick="updateFinishRead(${data.id})" class="btn-unfinish"><i class="far fa-check-circle"></i></button>`
        }
        <button onclick="deleteBook(${data.id})" type="button" class="btn-trash"><i class="fas fa-trash"></i></button>
      </div>
  </div>
  </article>
`;
const showToast = (msg) => {
  const toastElem = document.querySelector('#toast');
  toastElem.innerHTML = msg;
  toastElem.className = "show";
  setTimeout(() => {
    toastElem.className = toastElem.className.replace("show", "");
    toastElem.innerHTML = "";
  }, 2000)
};

const deleteBook = (id) => {
  books.splice(books.findIndex(el => el.id === id), 1);
  updateDataFromLocalStorage();
  document.dispatchEvent(new Event("onDataLoaded"));
  showToast("Successfully delete the book");
};

const updateFinishRead = (id) => {
  const objIndex = books.findIndex((obj => obj.id === id));
  books[objIndex].isCompleted = true;
  updateDataFromLocalStorage();
  document.dispatchEvent(new Event("onDataLoaded"));
  showToast("Successfully updated the book");
};

const updateUnfinishRead = (id) => {
  const objIndex = books.findIndex((obj => obj.id === id));
  books[objIndex].isCompleted = false;
  updateDataFromLocalStorage();
  document.dispatchEvent(new Event("onDataLoaded"));
  showToast("Successfully updated the book");
};