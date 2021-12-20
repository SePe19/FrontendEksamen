const out = (str) => console.log(str);

const url = "http://localhost:8080/showAllCandidates";

function fetchCandidates() {
  return fetch(url)
    .then(data => data.json())
    .then(candidateData)
}

const mainDiv = document.getElementById("candidateDiv")

function candidateData(data) {
  for (let i = 0; i < data.length; i++) {

    const candidate = data[i];

    let candidateDiv = document.createElement('div')

    mainDiv.append(candidateDiv)

    let candidateName = document.createElement('span')
    candidateName.setAttribute('value', candidate.candidateName);
    candidateName.innerText = candidate.candidateName;

    candidateDiv.append(candidateName)
    out(candidateName)

    let candidateInput = document.createElement('input')
    candidateInput.type = 'text'
    candidateInput.setAttribute('value', candidateName.innerText);

    candidateName.addEventListener('click', event => {
      candidateInput.value = candidate.candidateName;
      candidateName.replaceWith(candidateInput)
    })

    const updateButton = document.createElement('button')
    updateButton.classList.add('profile-edit-btn', 'btn', 'btn-primary', 'updateButtonProject');
    updateButton.type = 'button'
    updateButton.innerText = 'Save'
    candidateDiv.append(updateButton)

    updateButton.onclick = function () {
      candidate.candidateName = candidateInput.value;
      updateCandidate(candidate)
    }

    const deleteButton = document.createElement('button')
    deleteButton.classList.add('profile-edit-btn', 'btn', 'btn-danger', 'deleteButton');
    deleteButton.type = 'button'
    deleteButton.innerText = 'Delete'
    candidateDiv.append(deleteButton)

    deleteButton.onclick = function () {
      deleteCandidate(candidate)
    }
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
    const response = await restDeleteProject(candidate);
    out(response);
    window.location.reload();
  } catch (error) {
    out(error);
  }
}

async function restDeleteProject(candidate) {
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
