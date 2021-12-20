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
    candidateName.setAttribute('value', candidate.candidateName)
    candidateName.innerHTML = candidate.candidateName

    candidateDiv.append(candidateName)
    out(candidateName)


  }
}
fetchCandidates();
