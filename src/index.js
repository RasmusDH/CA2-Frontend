import "./style.css"
import "bootstrap/dist/css/bootstrap.css"
import "./jokeFacade"
import personFacade from "./personFacade"

document.getElementById("all-content").style.display = "block"

/* 
  Add your JavaScript for all exercises Below or in separate js-files, which you must the import above
*/

/* JS For Search */

function makePersonsTable(){
  personFacade.getAllPersons()
  .then(data => {
    const persons = data.all;
    const tableRows = persons.map(person => `
    <tr>
      <td>${person.id}</td>
      <td>${person.email}</td>
      <td>${person.firstName}</td>
      <td>${person.lastName}</td>
      <td>${person.phones}</td>
      <td>${person.hobbies}</td>
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


/*
Do NOT focus on the code below, UNLESS you want to use this code for something different than
the Period2-week2-day3 Exercises
*/

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



