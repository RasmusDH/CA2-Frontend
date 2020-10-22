import "./style.css"
import "bootstrap"
import "bootstrap/dist/css/bootstrap.css"
import personFacade from "./personFacade"

document.getElementById("all-content").style.display = "block"

function makePersonsTable(){
  personFacade.getAllPersons()
  .then(data => {
    const persons = data.all;
    const tableRows = persons.map(person => `
    <tr>
      <td>${person.id}</td>
      <td>${person.firstName}</td>
      <td>${person.lastName}</td>
      <td>${person.phone}</td>
      <td>${person.street}</td>
      <td>${person.zip}</td>
      <td>${person.city}</td>
    </tr>  
    `)
    const tableRowsAssString = tableRows.join("");
    document.getElementById("tbody").innerHTML = tableRowsAssString;
    document.getElementById("error").innerHTML = "";
  })
  .catch(err =>{
    if(err.status){
      err.fullError.then(e=> document.getElementById("error").innerHTML = 
      `<p class="alert alert-danger" role="alert">${e.message}</p>`)
    }
    else{console.log("Network error"); }
  });
}
makePersonsTable();


// ------------ Reload button ------------
let reload = document.getElementById("reload");
reload.addEventListener('click', (event) => {
    event.preventDefault();
    makePersonsTable();
});    



// ------------ Add person ------------
let submit = document.getElementById("savebtn");
submit.addEventListener('click', (event) => {
    event.preventDefault();
    // Info:
    let firstName = document.getElementById("firstname").value;
    let lastName = document.getElementById("lastname").value;
    let phone = document.getElementById("phone").value;
    let street = document.getElementById("street").value;
    let zip = document.getElementById("zip").value;
    let city = document.getElementById("city").value;

    const newPerson = {
      firstName,
      lastName,
      phone,
      street,
      zip,
      city,
    }
    personFacade.addPerson(newPerson)
    .then(document.getElementById("error").innerHTML = "")
    .catch(err =>{
      if(err.status){
        err.fullError.then(e=> document.getElementById("error").innerHTML = 
        `<p class="alert alert-danger" role="alert">${e.message}</p>`)
      }
      else{console.log("Network error"); }
   });
  
});    

// ------------ Delete person ------------
let savebtnDelete = document.getElementById("savebtnDelete");
savebtnDelete.addEventListener('click', (event) => {
    event.preventDefault();
    // get id:
    let id = document.getElementById("personID").value;

    personFacade.deletePerson(id)
    .then(document.getElementById("error").innerHTML = "", 
      document.getElementById("error").innerHTML = 
      `<p class="alert alert-success" role="alert">The person with id ${id} is deleted! Reload the table to see!</p>`)
    .catch(err =>{
      if(err.status){
        err.fullError.then(e=> document.getElementById("error").innerHTML = 
        `<p class="alert alert-danger" role="alert">${e.message}</p>`)
      }
      else{console.log("Network error"); }
   });
}); 



// ------------ Edit person ------------
let savebtnEdit = document.getElementById("savebtnEdit");
savebtnEdit.addEventListener('click', (event) => {
    event.preventDefault();
    // get id:
    let id = document.getElementById("personIDEdit").value;
    // Info:
    let firstName = document.getElementById("firstnameEdit").value;
    let lastName = document.getElementById("lastnameEdit").value;
    let phone = document.getElementById("phoneEdit").value;
    let street = document.getElementById("streetEdit").value;
    let zip = document.getElementById("zipEdit").value;
    let city = document.getElementById("cityEdit").value;

    const newPerson = {
      firstName,
      lastName,
      phone,
      street,
      zip,
      city,
    }
    newPerson.id = id;

    personFacade.editPerson(newPerson)
    .then(document.getElementById("error").innerHTML = "",
    document.getElementById("error").innerHTML = 
      `<p class="alert alert-success" role="alert">The person with id ${id} is Edited! Reload the table to see!</p>`)
    .catch(err =>{
      if(err.status || !id>=100){
        err.fullError.then(e=> document.getElementById("error").innerHTML = 
        `<p class="alert alert-danger" role="alert">${e.message}</p>`)
      } 
      else{console.log("Network error"); }
    });     
});    



function hideAllShowOne(idToShow) {
  document.getElementById("home_html").style = "display:none"
  document.getElementById("search_html").style = "display:none"
  document.getElementById(idToShow).style = "display:block"
}

function menuItemClicked(evt) {
  const id = evt.target.id;
  switch (id) {
    case "search": hideAllShowOne("search_html"); break
    default: hideAllShowOne("home_html"); break
  }
  evt.preventDefault();
}
document.getElementById("menu").onclick = menuItemClicked;
hideAllShowOne("home_html");



