const out = (str) => console.log(str);

const url = "http://localhost:8080/showAllParties";

function fetchParties() {
  return fetch(url)
    .then(data => data.json())
    .then(partyData)
}

const partyTable = document.getElementById("partyTable");

function partyData(data) {
  for (let i = 0; i < data.length; i++) {

    const party = data[i];

    let rowCount = partyTable.rows.length;
    let row = partyTable.insertRow(rowCount);
    row.id = partyTable.partyId;

    let cell1 = row.insertCell(0)
    let partyLetter = document.createElement('td')
    partyLetter.setAttribute('value', party.partyLetter)
    partyLetter.innerHTML = party.partyLetter
    cell1.appendChild(partyName);

    let cell2 = row.insertCell(1)
    let partyName = document.createElement('td')
    partyName.setAttribute('value', party.partyName)
    partyName.innerHTML = party.partyName
    cell2.appendChild(partyName);

    let cell3 = row.insertCell(1)
    let partyVotes = document.createElement('td')
    partyVotes.setAttribute('value', party.partyVotes)
    partyVotes.innerHTML = party.partyVotes
    cell3.appendChild(partyVotes);
  }
}


fetchParties();
