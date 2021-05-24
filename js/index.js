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

  selectNotes();
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
function selectNotes() {
  let notes = document.querySelectorAll(".note-item");

  notes.forEach((note) => {
    note.addEventListener("click", function () {
      if (note.classList.contains("selected")) {
        note.classList.remove("selected");
        if ((swapFirst = note)) {
          swapFirst = null;
        } else {
          swapFirst = note;
        }
      } else {
        note.classList.add("selected");
        if (swapFirst == null) {
          swapFirst = note;
        } else {
          swapSecond = note;

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
    });
  });
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
