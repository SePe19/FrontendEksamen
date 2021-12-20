const out = (str) => console.log(str);
let currentUserId = localStorage.getItem('currentUserId');
const customerUrl = "http://localhost:8080/userCustomers/" + currentUserId;

function newProject() {
  let title = document.getElementById("inpTitle").value
  let description = document.getElementById("inpDescription").value

  let chosenCustomer = localStorage.getItem('chosenCustomer');
  out(chosenCustomer)

  let postProjectRequest = {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      "projectTitle": title,
      "projectDescription": description,
      "user": {
        "userID": currentUserId,
      },
      "customer":
        {
          "customerId": chosenCustomer,
        }
    })
  }

  out(postProjectRequest)


  fetch("http://localhost:8080/project", postProjectRequest)
    .then(response => response.json())
    .then(data => projectCreated(data))
    .catch(error => console.log(error));
}

function projectCreated(data){
  out(arguments)
  out(data)
  window.location.href = "/Tidsregistrering-projekt-Frontend/project.html";
}

function fetchAllCustomersOnUser() {
  return fetch(customerUrl)
    .then(data => data.json())
    .then(customerDropdown);

}

function customerDropdown(data) {
  let firstCustomer = data[0];
  let firstCustomerId = firstCustomer[Object.keys(firstCustomer)[0]];
  localStorage.setItem('chosenCustomer', firstCustomerId)

  out(firstCustomerId + " Her outter vi vores data")

  for (let i = 0; i < data.length; i++) {

    let customer = data[i];

    let dropdown = document.getElementById("selectDropdown");
    let option = document.createElement("option");
    option.innerText = customer.customerName;
    option.setAttribute("class", "select-dropdown__list-item");
    option.setAttribute("value", customer.customerId);
    dropdown.appendChild(option);

    //out(customer[0].customerId + " Her outter vi customer [0]")



    dropdown.addEventListener("change",(event) => {
      const selectIndex = dropdown.selectedIndex;
      let optionIndex = dropdown.options[selectIndex]
      customer.customerId = optionIndex.value
      out(optionIndex.value);
      localStorage.setItem("chosenCustomer", optionIndex.value)

    })
  }

}





fetchAllCustomersOnUser();
