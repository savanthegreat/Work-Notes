console.log("JavaScript is Connected!");
showNotes();
// let cards = document.getElementsByClassName("card");
// cards.addEventListener("hover", function (e) {
//   console.log(e);
// });
// localStorage.setItem("notes", '["testnotes"]');
let newNote = document.getElementById("addNoteButton");
newNote.addEventListener("click", function (e) {
  //console.log("Button clicked!");
  let newNoteTextArea = document.getElementById("addNewNoteText");
  let newNoteText = document.getElementById("addNewNoteText").value;
  if (newNoteText.trim().length == 0) {
    htmlAlert = `
    <div class="alert alert-warning alert-dismissible fade show" role="alert">
    You have not entered any Details in Work Note.
    Please add details to add a new Work Note.
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>`;

    alertDiv = document.getElementById("alert");
    alertDiv.innerHTML = htmlAlert;
  } else {
    //console.log(newNoteText);
    let oldNotes = localStorage.getItem("notes");
    //console.log(oldNotes);
    if (oldNotes) {
      let allNotes = JSON.parse(oldNotes);
      allNotes.push(newNoteText);
      localStorage.setItem("notes", JSON.stringify(allNotes));
      //console.log("1");
      //console.log(allNotes);
      //console.log(JSON.stringify(allNotes));
    } else {
      let allNotes = JSON.stringify(newNoteText);
      localStorage.setItem("notes", `[${allNotes}]`);
      //console.log("2");
      //console.log(allNotes);
    }
    newNoteTextArea.value = "";
    showNotes();
  }
});

function showNotes() {
  let allNotes = JSON.parse(localStorage.getItem("notes"));
  if (allNotes != null) {
    //console.log(allNotes);
    let htmlForNotes = ``;
    allNotes.forEach(function (noteText, noteNumber) {
      //console.log("Ff", htmlForNotes);
      htmlForNotes += `
  <div class="card my-2 mx-2 card123" style="width: 17rem;">
  <div class="card-body"
    <h5 class="card-title" style="text-align: center"><b>Work Note ${
      noteNumber + 1
    }</b></h5>
    <hr />
    <p class="card-text">${noteText}</p>
    <hr />
    <button id="${
      noteNumber + 1
    }" class="btn btn-primary" onclick="deleteNode(this.id)">Delete</button>
    </div>
  </div>
      `;
    });
    let noteSection = document.getElementById("notes");
    noteSection.innerHTML = htmlForNotes;
    //console.log(htmlForNotes);
  }
}

function deleteNode(index) {
  console.log(`Delete for note ${index}`);
  let allNotes = JSON.parse(localStorage.getItem("notes"));
  allNotes.splice(index - 1, 1);
  localStorage.setItem("notes", JSON.stringify(allNotes));
  showNotes();
}

let searchArea = document.getElementById("searchText");
searchArea.addEventListener("input", function (e) {
  console.log(e);
  let searchInput = e.target.value.toLowerCase();
  console.log(searchInput);
  let allNotes = document.getElementsByClassName("card123");
  console.log(allNotes);
  Array.from(allNotes).forEach(function (element) {
    console.log(element);
    let text = element.getElementsByTagName("p")[0].innerText.toLowerCase();
    if (text.includes(searchInput)) {
      element.style.display = "block";
      console.log("block");
    } else {
      element.style.display = "none";
      console.log("none");
    }
  });
});
