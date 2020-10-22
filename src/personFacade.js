
const URL = "https://ditlevsoftware.com/ca2/api/person";

function makeOptions(method, body) {
    var opts =  {
      method: method,
      headers: {
        "Content-type": "application/json",
        "Accept": "application/json"
      }
    }
    if(body){
      opts.body = JSON.stringify(body);
    }
    return opts;
}
  
function handleHttpErrors(res){
    console.log(res)
    if(!res.ok){
    return Promise.reject({status: res.status, fullError: res.json() })
    }
    return res.json();
}

function getAllPersons(){
    return fetch(URL + "/all")
        .then(handleHttpErrors)
}
/*
function addPerson(person){
    const options = makeOptions("POST", person)
    return fetch(URL, options)
        .then(handleHttpErrors)
}

function deletePerson(id){
    const options = makeOptions("DELETE");
    return fetch(URL + id, options)
    .then(handleHttpErrors)
}

function editPerson(person){
    const options = makeOptions("PUT", person);
    return fetch(URL + person.id, options)
    .then(handleHttpErrors)
}
*/
const personFacade = {
    getAllPersons,
    /*
    addPerson,
    deletePerson,
    editPerson,
    */
}

   
export default personFacade;



