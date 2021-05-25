const noteListDiv = document.querySelector(".note-list");
let noteID = 1;
let notes = [];

let swapFirst;
let swapSecond;

//note object
function Note(id, title, content) {
  this.id = id;
  this.title = title;
  this.content = content;
}

// all eventlisteners
function eventListeners() {
  document.getElementById("add-note-btn").addEventListener("click", addNewNote);
  noteListDiv.addEventListener("click", deleteNote);
  noteListDiv.addEventListener("click", selectNotes);
  document
    .getElementById("delete-all-btn")
    .addEventListener("click", deleteAllNotes);
}

//call initial event listeners
eventListeners();

// add a new note in the list
function addNewNote() {
  const noteTitle = document.getElementById("note-title"),
    noteContent = document.getElementById("note-content");
  //make sure title and content aren't empty
  if (validateInput(noteTitle, noteContent)) {
    let noteItem = new Note(noteID, noteTitle.value, noteContent.value);
    noteID++;
    notes.push(noteItem);
    createNote(noteItem);
    noteTitle.value = "";
    noteContent.value = "";
  }
}

//validate that title and content aren't empty
function validateInput(title, content) {
  if (title.value !== "" && content.value !== "") {
    return true;
  } else {
    if (title.value === "") title.classList.add("warning");
    if (content.value === "") content.classList.add("warning");
  }
  setTimeout(() => {
    title.classList.remove("warning");
    content.classList.remove("warning");
  }, 1500);
}

// create a new note div
function createNote(noteItem) {
  const div = document.createElement("div");
  div.classList.add("note-item");
  div.setAttribute("data-id", noteItem.id);
  div.innerHTML = `
        <h3>${noteItem.title}</h3>
        <textarea maxlength="255" rows="8" cols="50" readonly class="textFieldToEdit">${noteItem.content}</textarea>
        <br>
        <button type = "button" class = "btn delete-note-btn">
        <span><i class = "fas fa-trash"></i></span>
        Remove
        </button>
        <button type = "button" class = "btn edit-note-btn" onClick="editText(this)">
        <span><i class="fas fa-edit"></i></span>
        Edit
        </button>
    `;
  noteListDiv.appendChild(div);
}

//edit notes
function editText(elem) {
  let control =
    elem.previousElementSibling.previousElementSibling.previousElementSibling;

  if (control.hasAttribute("readonly") === true) {
    elem.innerHTML = '<span><i class="fas fa-edit"></i></span>Save';
    control.readOnly = false;
    control.border;
  } else {
    elem.innerHTML = '<span><i class="fas fa-edit"></i></span>Edit';
    control.readOnly = true;
  }
}

//select and swap notes
function selectNotes(e) {
  if (e.target.classList.contains("note-item")) {
    if (e.target.classList.contains("selected")) {
      e.target.classList.remove("selected");
      if ((swapFirst = e.target)) {
        swapFirst = null;
      } else {
        swapFirst = e.target;
      }
    } else {
      e.target.classList.add("selected");
      if (swapFirst == null) {
        swapFirst = e.target;
      } else {
        swapSecond = e.target;

        swapElements(swapFirst, swapSecond);
        swapFirst = null;
        swapSecond = null;

        let selected = document.querySelectorAll(".selected");

        selected.forEach((item) => {
          setTimeout(function () {
            item.classList.remove("selected");
          }, 500);
        });
      }
    }
  }
}

//swap notes
function swapElements(obj1, obj2) {
  // save the location of obj2
  var parent2 = obj2.parentNode;
  var next2 = obj2.nextSibling;
  // special case for obj1 is the next sibling of obj2
  if (next2 === obj1) {
    // just put obj1 before obj2
    parent2.insertBefore(obj1, obj2);
  } else {
    // insert obj2 right before obj1
    obj1.parentNode.insertBefore(obj2, obj1);

    // now insert obj1 where obj2 was
    if (next2) {
      // if there was an element after obj2, then insert obj1 right before that
      parent2.insertBefore(obj1, next2);
    } else {
      // otherwise, just append as last child
      parent2.appendChild(obj1);
    }
  }
}

// delete a note
function deleteNote(e) {
  if (e.target.classList.contains("delete-note-btn")) {
    e.target.parentElement.remove(); // removing from DOM
  }
}

// delete all notes
function deleteAllNotes() {
  notes.length = 0;
  let noteList = document.querySelectorAll(".note-item");
  if (noteList.length > 0) {
    noteList.forEach((item) => {
      noteListDiv.removeChild(item);
    });
  }
  noteID = 1;
}
