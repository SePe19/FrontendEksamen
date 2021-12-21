const out = (str) => console.log(str);

const url = "http://localhost:8080/showAllCandidates";

function fetchCandidates() {
  return fetch(url)
    .then(data => data.json())
    .then(candidateData)
}

const candidateTable = document.getElementById("partyTable");

function candidateData(data) {
  for (let i = 0; i < data.length; i++) {

    const candidate = data[i];

    let rowCount = candidateTable.rows.length;
    let row = candidateTable.insertRow(rowCount);
    row.id = candidate.candidateId;

    let cell1 = row.insertCell(0)
    let candidateName = document.createElement('td')
    candidateName.setAttribute('value', candidate.candidateName)
    candidateName.innerHTML = candidate.candidateName
    cell1.appendChild(candidateName);

    let cell2 = row.insertCell(1)
    let partyName = document.createElement('td')
    partyName.setAttribute('value', candidate.party.partyName)
    partyName.innerHTML = candidate.party.partyName
    cell2.appendChild(partyName);

    let cell3 = row.insertCell(2)
    const updateButton = document.createElement('button')
    updateButton.classList.add('profile-edit-btn', 'btn', 'updateButton');
    updateButton.type = 'button'
    updateButton.innerText = 'Update'
    cell3.append(updateButton)

    updateButton.onclick = function () {
      candidate.candidateName = candidateInput.value;
      updateCandidate(candidate)
    }

    let cell4 = row.insertCell(3)
    const deleteButton = document.createElement('button')
    deleteButton.classList.add('profile-edit-btn', 'btn', 'deleteButton');
    deleteButton.type = 'button'
    deleteButton.innerText = 'Delete'
    cell4.append(deleteButton)

    deleteButton.onclick = function () {
      deleteCandidate(candidate)
    }

    let candidateInput = document.createElement('input')
    candidateInput.type = 'text'
    candidateInput.setAttribute('value', candidateName.innerText);

    candidateName.addEventListener('click', event => {
      candidateInput.value = candidate.candidateName;
      candidateName.replaceWith(candidateInput)
    })
  }
}

async function updateCandidate(candidate) {
  try {
    const response = await restUpdateCandidate(candidate);
    out(response);
    window.location.reload();
  } catch (error) {
    out(error);
  }

}

async function restUpdateCandidate(candidate) {
  const updateURL = "http://localhost:8080/candidate/" + candidate.candidateId;
  const jsonString = JSON.stringify(candidate);
  out(jsonString);

  const fetchOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: jsonString
  }
  const response = await fetch(updateURL, fetchOptions);
  out(response.status);
  out(response.ok);
  if (!response.ok) {
    out("error");
  }
  return response.json();
}

async function deleteCandidate(candidate) {
  try {
    const response = await restDeleteCandidate(candidate);
    out(response);
    window.location.reload();
  } catch (error) {
    out(error);
  }
}

async function restDeleteCandidate(candidate) {
  const deleteUrl = "http://localhost:8080/candidate/" + candidate.candidateId;
  const fetchOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    body: ""
  }

  const response = await fetch(deleteUrl, fetchOptions);
  out(response.status)
  out(response.ok)
  window.location.href = "http://localhost:63342/FrontendEksamenKommunalvalg/all-candidates.html?_ijt=aulfoe929rq3euj7q4b9d6inkm&_ij_reload=RELOAD_ON_SAVE"
  if (!response.ok) {
    out(response.error())
  }

  return response;
}

fetchCandidates();
