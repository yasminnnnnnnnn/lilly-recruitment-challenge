
const medList = document.getElementById("list");
/* 
 * Displays all medicines in the database
 * It fetches data from the /medicines endpoint and adds it to the list
 */
if (medList) {
  fetch("http://127.0.0.1:8000/medicines")
    .then(response => response.json())
    .then(data => {
      let html = "";
      data.medicines.forEach(med => {
        html += `<p><strong>${med.name || "(Unknown Medicine)"}</strong>: ${med.price !== null ? `£${med.price}` : "No price"}</p>`;
      });
      medList.innerHTML = html;
    })
    .catch(() => medList.textContent = "Failed to load medicines.");
}





/*
 * Function that displays the name and price of a specific searched medicine
 * It fetches data from the /medicine/{name} endpoint and displays the result
 * If the name entered does not exist, it displays an error message
*/
async function myFunc(){
  const name = document.getElementById('searchName').value.trim();
  try {
    const response = await fetch(`http://localhost:8000/medicines/${name}`);
    const data = await response.json();
  

    if (data.error){
      document.getElementById('result').innerHTML = data.error;
      return;
    }
   
    document.getElementById("result").innerHTML = `
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Price:</strong> £${data.price}</p>
        `;

  } catch (err) {
  }
} 
const searchBtn = document.getElementById('searchSingle');
if (searchBtn) {
  searchBtn.addEventListener('click', myFunc);
}


/*
 * Function that adds a medicine to the list of medicines
 * It sends a POST request to /create 
*/

async function addMedicine(event){
  event.preventDefault();

  const name = document.getElementById("addName").value;
  const price = document.getElementById("addPrice").value;

  const formData = new FormData();
  formData.append("name", name);
  formData.append("price", price);

  const res = await fetch("http://localhost:8000/create", {
        method: "POST",
        body: formData
    });

  const data = await res.json();
  document.getElementById("resultMessage").textContent = data.message;
  event.target.reset();
}

const addMed = document.getElementById("medicineForm");
if (addMed) {
  addMed.addEventListener("submit", addMedicine);
}


/*
 * Function that updates the price of an existing medicine
 * It sends a POST request to /update with the updated price
*/
async function updateMedicine(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const price = document.getElementById("price").value;
    const result = document.getElementById("result");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);

    const response = await fetch("http://localhost:8000/update", {
        method: "POST",
        body: formData
    });

    const data = await response.json();
    if (data.error){
    document.getElementById('updateResult').style.color = "red";
    document.getElementById('updateResult').innerHTML = data.error;
    return;
  }
  document.getElementById('updateResult').style.color = "green";
  document.getElementById('updateResult').innerHTML = data.message;
}

const updateForm = document.getElementById("updateForm");
if (updateForm) {
  updateForm.addEventListener("submit", updateMedicine);
}


/*
 * Function that deletes an existing medicince
 * It sends a DELETE request to /delete
*/

async function deleteMedicine(event){
  event.preventDefault();
  const name = document.getElementById("deleteName").value;

  const formData = new FormData();
  formData.append("name",name);


  const response = await fetch("http://localhost:8000/delete",{
      method: "DELETE",
      body: formData
  })
 
  const data = await response.json();

  if (data.error){
    document.getElementById('deleteResult').style.color = "red";
    document.getElementById('deleteResult').innerHTML = data.error;
    return;
  }
  document.getElementById('deleteResult').style.color = "green";
  document.getElementById('deleteResult').innerHTML = data.message;
}
const deleteForm = document.getElementById("deleteMed");
if (deleteForm) {
  deleteForm.addEventListener("submit", deleteMedicine);
}


/*
 * Function that calculates the average price of all medicines
 * Fetches data from /average endpoint and displays the result
*/
async function getAverage(){
  const response = await fetch("http://localhost:8000/average");
  const data = await response.json();

  document.getElementById('average_price').innerHTML = data.message;
}

const avgBtn = document.getElementById('averagePrice');
if (avgBtn) {
  avgBtn.addEventListener('click', getAverage);
}