console.log("JavaScript is Connected!");
minDate();
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

  let newNoteTitleArea = document.getElementById("addNewNoteTitle");
  let newNoteTitle = document.getElementById("addNewNoteTitle").value;

  let newNoteDateArea = document.getElementById("deadlineDate");
  let newNoteDate = document.getElementById("deadlineDate").value;

  let newNotePriorityArea = document.getElementById("hasPriority");
  let newNotePriority = document.getElementById("hasPriority").checked;

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
      allNotes.push({
        newNoteTitle,
        newNoteText,
        newNoteDate,
        newNotePriority,
      });
      localStorage.setItem("notes", JSON.stringify(allNotes));
      //console.log("1");
      // console.log(allNotes);
      //console.log(JSON.stringify(allNotes));
    } else {
      let allNotes = JSON.stringify(newNoteText);
      localStorage.setItem("notes", `[${allNotes}]`);
      //console.log("2");
      //console.log(allNotes);
    }
    newNoteTextArea.value = "";
    newNoteTitleArea.value = "";
    newNoteDateArea.value = "";
    newNotePriorityArea.checked = false;
    showNotes();
  }
});

function showNotes() {
  let allNotes = JSON.parse(localStorage.getItem("notes"));
  if (allNotes != null) {
    //console.log(allNotes);
    let htmlForNotes = ``;
    let dueToday = 0;
    allNotes.forEach(function (data, index) {
      // console.log("Ff", htmlForNotes);

      let dateParts = data.newNoteDate.split("-");
      let deadlineDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
      // console.log(
      //   Math.floor((deadlineDate - new Date()) / (1000 * 60 * 60 * 24))
      // );
      // console.log(deadlineDate.toDateString());

      // deadlineDate = data.newNoteDate;
      daysRemaining = Math.floor(
        (deadlineDate - new Date()) / (1000 * 60 * 60 * 24)
      );
      // console.log("in", daysRemaining);
      if (!(daysRemaining + 1)) {
        dueToday += 1;
      }

      htmlForNotes += `
  <div class="card my-2 mx-2 card123 ${
    data.newNotePriority ? "border-primary mb" : ""
  }" style="width: 17rem; background: ${
        daysRemaining + 1 ? "" : "rgb(255, 0, 0)"
      }">
  <div class="card-body text-center ">
    <h5 class="card-title"><b> ${data.newNoteTitle}</b></h5>
    <hr />
    <p class="card-text">${data.newNoteText}</p>
    <hr />
    <h6> Due ${
      daysRemaining + 1 ? "in " + (daysRemaining + 1) + " Days" : "Today"
    }<h6> 
    <hr />
    <button id="${
      index + 1
    }" class="btn btn-primary" onclick="deleteNode(this.id)"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
  </svg></i></button>
    </div>
  </div>
      `;
    });
    let noteSection = document.getElementById("notes");
    noteSection.innerHTML = htmlForNotes;
    //console.log(htmlForNotes);
    if (dueToday) {
      htmlAlert = `
      <div class="alert alert-warning alert-dismissible fade show" role="alert">
      You have ${dueToday} Work Notes Due Today.
      They are highlighted with the Red colour.
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>`;

      alertDiv = document.getElementById("alert");
      alertDiv.innerHTML = htmlAlert;
    } else {
      alertDiv = document.getElementById("alert");
      alertDiv.innerHTML = "";
    }
    // console.log(dueToday);
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
      // console.log("block");
    } else {
      element.style.display = "none";
      // console.log("none");
    }
  });
});

function minDate() {
  let dtToday = new Date();

  let month = dtToday.getMonth() + 1;
  let day = dtToday.getDate();
  let year = dtToday.getFullYear();
  if (month < 10) month = "0" + month.toString();
  if (day < 10) day = "0" + day.toString();

  let maxDate = year + "-" + month + "-" + day;
  document.getElementById("deadlineDate").setAttribute("min", maxDate);
}
