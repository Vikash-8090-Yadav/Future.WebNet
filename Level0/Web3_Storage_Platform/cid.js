import { Web3Storage } from "https://cdn.jsdelivr.net/npm/web3.storage/dist/bundle.esm.min.js";

function getAccessToken() {

  //Access Token For decentralised storage

  return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEI5MWQ4NTRiQkYzRTg4MjM4MzZmMzU5NUJDN2YyQjJhZjg2QjMzNjkiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2ODY5MzgzODQzMTIsIm5hbWUiOiJTdG9yYWdlIn0.qujzmawtJOFyXNUOWNIFONQZsXxWVL_BiRwvWZNPnp4";

}



export function makeStorageClient() {
  return new Web3Storage({ token: getAccessToken() });
}

async function listWithLimits() {
  //Table Elements
  const table = document.getElementById("table");
  table.style.display = "none";
  const client = makeStorageClient();
  const before = new Date().toISOString();
  const maxResults = 10;
  const tbody = document.getElementById("uploads");
  const loader = document.getElementById("loader");

  loader.style.display = "block";

  for await (const upload of client.list({ before, maxResults })) {
    const tr = document.createElement("tr");
    const cidTd = document.createElement("td");
    const cidName = document.createElement("td");
    const createdTd = document.createElement("td");
    const viewFile = document.createElement("td");
    const button = document.createElement("button");
    const cidData = document.createElement("a");

    cidTd.appendChild(cidData);
    const CidText= document.createTextNode(upload.cid);
    cidData.appendChild(CidText);
    const url=upload.cid;
    cidData.setAttribute("href",  `#`);

    cidData.addEventListener('click', function(event) {
      event.preventDefault();
      //copy text feature on cid
      const textToCopy = upload.cid;
      navigator.clipboard.writeText(textToCopy);
      alert("Copied the data to clipboard");
    });

    cidName.textContent = upload.name;


    viewFile.style.color = "blue";
    viewFile.style.cursor = "pointer";
    viewFile.style.textAlign = "center";


    button.innerHTML = "View File";
    button.style.marginBottom = "12px";

    button.addEventListener("click", () => {
      //View content 
      const data = upload.cid;
      window.open("https://" + data + ".ipfs.w3s.link", "_blank");
    });



    createdTd.textContent = new Date(upload.created).toLocaleString();
    tr.appendChild(cidName);
    tr.appendChild(cidTd);
    tr.appendChild(createdTd);
    tr.appendChild(viewFile);
    viewFile.appendChild(button);
    tbody.appendChild(tr);

  }
   

  //Loader Section
  loader.style.display = "none";
  table.style.display = "";
}

// Call the function after the HTML has loaded
window.onload = listWithLimits;
