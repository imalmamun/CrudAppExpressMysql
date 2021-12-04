// view binding here......
const btnAddName = document.querySelector("#add-name-btn");
const nameInput = document.querySelector("#name-input");
const updateBtn = document.querySelector("#update_btn");
const updateInput = document.querySelector("#update_input");
const searchBtn = document.querySelector("#search_btn");
const searchInput = document.querySelector("#search_input");

// fetching functionalities here.....

document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:5000/getAll")
    .then((response) => response.json())
    .then((object) => loadHTMLTable(object.data));
});

// insert functionality here......
btnAddName.onclick = () => {
  const name = nameInput.value;
  console.log(name);
  nameInput.value = "";
  if (name != "") {
    fetch("http://localhost:5000/insert", {
      headers: {
        "Content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ name: name }),
    })
      .then((response) => response.json())
      .then((data) => insertRowIntoTable(data));
  }
};

// inserting data to database and updating...
const insertRowIntoTable = (data) => {
  console.log(data);
  const table = document.querySelector("main table tbody");
  const isTableNoData = document.querySelector(".no-data");
  let tableHtml = "";

  tableHtml = tableHtml + "<tr>";
  tableHtml += `<td>${data.id}</td>`;
  tableHtml += `<td>${data.name}</td>`;
  tableHtml += `<td>${new Date(data.dateAdded).toLocaleString()}</td>`;
  tableHtml += `<td><button class="delete-row-btn" data-id=${data.id}>Delete</button></td>`;
  tableHtml += `<td><button class="edit-row-btn" data-id=${data.id}>Edit</button></td>`;
  tableHtml += "</tr>";

  if (isTableNoData) {
    table.innerHTML = tableHtml;
  } else {
    const newRow = table.insertRow();
    newRow.innerHTML = tableHtml;
  }
};


// delete edit and update functionalities here.......
document.querySelector("table, tbody").addEventListener("click", (event) => {
  console.log(event.target.dataset.id);
  // delete
  if (event.target.className === "delete-row-btn") {
    fetch("http://localhost:5000/delete/" + event.target.dataset.id, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          location.reload();
        }
      });
  }
  // edit and update
  if (event.target.className === "edit-row-btn") {
    handleEditBtn(event.target.dataset.id);
  }
});

// onclik on edit button and handle function....
const handleEditBtn = (id) => {
  document.querySelector("#edit-div").hidden = false;

  updateBtn.onclick = () => {
    const nameValue = updateInput.value;
    if (nameValue) {
      fetch("http://localhost:5000/update", {
        headers: {
          "Content-type": "application/json",
        },
        method: "PATCH",
        body: JSON.stringify({ name: nameValue, id: id }),
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            location.reload();
          }
        });
    }
  };
};

// search functionality here....

searchBtn.onclick = () => {
  const name = searchInput.value;
  console.log(name);
  fetch("http://localhost:5000/search/" + name)
    .then((response) => response.json())
    .then((object) => loadHTMLTable(object.data));
};



function loadHTMLTable(data) {
  const table = document.querySelector("main table tbody");
  console.log(data);

  if (data.length === 0) {
    table.innerHTML = "<tr><td class='no-data' colspan='5'>No Data</td></tr>";
    return;
  }
  let tableHtml = "";
  data.forEach(({ id, name, date_added }) => {
    tableHtml = tableHtml + "<tr>";
    tableHtml += `<td>${id}</td>`;
    tableHtml += `<td>${name}</td>`;
    tableHtml += `<td>${new Date(date_added).toLocaleString()}</td>`;
    tableHtml += `<td><button class="delete-row-btn" data-id=${id}>Delete</button></td>`;
    tableHtml += `<td><button class="edit-row-btn" data-id=${id}>Edit</button></td>`;
    tableHtml += "</tr>";
    // return tableHtml;
  });
  table.innerHTML = tableHtml;
}
