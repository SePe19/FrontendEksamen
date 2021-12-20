const out = str => console.log(str);

function getAllRegionerFraSky()
{
  out("getAllRegioner kaldt");
  const regionUrl = "https://api.dataforsyningen.dk/regioner";
  return fetch(regionUrl).then(response => response.json());
}

let body;
let postRegionRequest = {
  method: "POST",
  headers: {
    "content-type": "application/json"
  },
  body: body
}

let regionJson = {
  "regionKode": "",
  "regionNavn": "",
  "regionHref": ""
}
