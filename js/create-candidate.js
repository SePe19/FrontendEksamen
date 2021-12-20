const out = (...str) => console.log(...str);
const partyUrl = "http://localhost:8080/showAllParties";
const candidateUrl = "http://localhost:8080/candidate";

function newCandidate() {
  let candidateName = document.getElementById("inpName").value

  let chosenParty = localStorage.getItem('chosenParty');
  out(chosenParty)

  let postCandidateRequest = {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({
      "candidateName": candidateName,
      "party":
        {
          "partyId": chosenParty,
        }
    })
  }

  out(postCandidateRequest)


  fetch(candidateUrl, postCandidateRequest)
    .then(response => response.json())
    .then(data => candidateCreated(data))
    .catch(error => console.log(error));
}

function candidateCreated(data){
  out(arguments)
  out(data)
  //window.location.href = "/Tidsregistrering-projekt-Frontend/project.html";
}

function fetchAllParties() {
  return fetch(partyUrl)
    .then(data => data.json())
    .then(partyDropdown);
}

function partyDropdown(data) {
  let firstParty= data[0];
  let firstPartyId = firstParty[Object.keys(firstParty)[0]];
  localStorage.setItem('chosenParty', firstPartyId)

  out(firstPartyId + " Her outter vi vores data")

  for (let i = 0; i < data.length; i++) {

    let party = data[i];

    let dropdown = document.getElementById("selectDropdown");
    let option = document.createElement("option");
    option.innerText = party.partyName;
    option.setAttribute("class", "select-dropdown__list-item");
    option.setAttribute("value", party.partyId);
    dropdown.appendChild(option);

    //out(customer[0].customerId + " Her outter vi customer [0]")

    dropdown.addEventListener("change",(event) => {
      const selectIndex = dropdown.selectedIndex;
      let optionIndex = dropdown.options[selectIndex]
      party.partyId = optionIndex.value
      out(optionIndex.value);
      localStorage.setItem("chosenParty", optionIndex.value)

    })
  }

}

fetchAllParties();
