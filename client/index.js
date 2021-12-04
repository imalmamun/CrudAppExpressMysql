// fetching functionalities here.....
document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:5000/getAll")
    .then((response) => response.json())
    .then((object) => loadHTMLTable(object.data));
});

// insert functionality here......
const btnAddName = document.querySelector("#add-name-btn");
btnAddName.onclick = () => {
  const nameInput = document.querySelector("#name-input");
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

// delete and edit functionality here.......
document.querySelector("table, tbody").addEventListener("click", (event) => {
  console.log(event.target.dataset.id);
  // delete
  if (event.target.className === "delete-row-btn") {
    fetch("http://localhost:5000/delete/" + event.target.dataset.id, {
      // headers: {
      //   "Content-type": "application/json",
      // },
      method: "DELETE",
      // body: JSON.stringify({ name: name }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          location.reload();
        }
      });
  }
  // edit
  if (event.target.className === "edit-row-btn") {
    
  }
});
