import { Web3Storage } from 'https://cdn.jsdelivr.net/npm/web3.storage/dist/bundle.esm.min.js'

function getAccessToken() {
  //Storage Access Token
  return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEI5MWQ4NTRiQkYzRTg4MjM4MzZmMzU5NUJDN2YyQjJhZjg2QjMzNjkiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2ODY5MzgzODQzMTIsIm5hbWUiOiJTdG9yYWdlIn0.qujzmawtJOFyXNUOWNIFONQZsXxWVL_BiRwvWZNPnp4'

}

function makeStorageClient() {
  return new Web3Storage({ token: getAccessToken() })
}

function getValue() {
  //geting cid
  var cid = document.getElementById("cid").value;
  return cid;
}


document.getElementById("submit").onclick = async function retrieve() {

  //retrieving data files

  const cid = getValue()
  const client = makeStorageClient()
  const res = await client.get(cid)
  console.log(`Got a response! [${res.status}] ${res.statusText}`)
  if (!res.ok) {
    alert("File Doesn't exist, check your CID");
  }
  
  else {
    alert("File has been opened!");
    window.open("https://" + cid + ".ipfs.w3s.link", "_blank");
  }
}