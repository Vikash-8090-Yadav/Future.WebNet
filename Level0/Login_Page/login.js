const connectButton = document.getElementById("connectButton");
const walletID = document.getElementById("walletID");
const reloadButton = document.getElementById("reloadButton");
const installAlert = document.getElementById("installAlert");
const mobileDeviceWarning = document.getElementById("mobileDeviceWarning");

connectButton.addEventListener("click", () => {
  // Start loader while connecting
  connectButton.classList.add("loadingButton");

  if (typeof window.ethereum !== "undefined") {
    ethereum
      .request({ method: "eth_requestAccounts" })
      .then((accounts) => {
        const account = accounts[0];

        walletID.innerHTML = `Wallet connected: ${account}`;

        // Stop loader when connected
        connectButton.classList.remove("loadingButton");
      })
      .catch((error) => {
        // Handle error
        console.log(error, error.code);

        // Stop loader if error occured
        // For example, when user cancelled request
        // and closed plugin
        connectButton.classList.remove("loadingButton");
      });
  } else {
    //for mobile
    if (isMobile()) {
      mobileDeviceWarning.classList.add("show");
    } else {
      window.open("https://metamask.io/download/", "_blank");
      installAlert.classList.add("show");
    }
  }
});

// Reload the page on reload button click
reloadButton.addEventListener("click", () => {
  window.location.reload();
});
