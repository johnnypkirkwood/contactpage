function list() {
  return document.getElementById("record_list")
}

function clearList() {
  //Clear last record list items
  while (list().hasChildNodes()) {
    list().removeChild(list().firstChild);
  }
}

function randomize() {
  document.querySelector("#text-input-firstname").value = faker.name.firstName()
  document.querySelector("#text-input-lastname").value = faker.name.lastName()
  document.querySelector("#text-input-title").value = faker.name.title()
}

function showError(err) {
  clearList()
  var item = document.getElementById('field_template').content.cloneNode(true);
  item.querySelector("#field_type").innerText = "ERROR!"
  item.querySelector("#field_value").innerText = err.errorCode + ": " + err.errorMessage
  item.querySelector("#field_type").style.color = 'white'
  item.querySelector(".listItem").style.backgroundColor = 'red'
  item.querySelector(".listItem").style.height = "100px"
  list().appendChild(item);
  console.log(err)
}

function showSuccess(res) {
  clearList()
  var item = document.getElementById('field_template').content.cloneNode(true);
  item.querySelector("#field_type").innerText = "Saved Contact!"
  item.querySelector("#field_type").style.color = 'white'
  item.querySelector(".listItem").style.backgroundColor = 'green'
  item.querySelector(".listItem").style.height = "50px"
  list().appendChild(item);
}

async function save() {

  /*
  * Create a JSON object matching the UI API shape
  * and capture the field values from the HTML Inputs
  */
  let contact = {
    "apiName": "Contact",
    "fields": {
      "FirstName": document.querySelector("#text-input-firstname").value,
      "LastName": document.querySelector("#text-input-lastname").value,
      "Title": document.querySelector("#text-input-title").value,
      "AccountId": document.querySelector("#text-input-accountId").value
    }
  }
  /*
  * Call the native fsl create record api with the JSON object
  */
  let res = await fsl.record.createRecord(contact)
    .catch(err => {
      showError(err)
      return
    })
  if (res && res.records) {
    showSuccess()
  }
}
