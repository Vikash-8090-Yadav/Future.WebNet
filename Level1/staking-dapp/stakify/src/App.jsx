import React, { useState, useEffect } from "react";
import artifact from "./artifacts/contracts/Staking.sol/Staking.json";
import { ethers } from "ethers";
import './App.css';
import Navbar from "./components/Navbar";
import StakeModal from "./components/StakeModal";
import maticLogo from "./images/polygon-matic-logo.svg";
import { Coin } from "react-bootstrap-icons";

const ContractAddress = '0x12163B070B97f06F5061D93164D960bbFCfdf965';

function App() {

  // frontend states
  const [provider, setProvider] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [contract, setContract] = useState(undefined);
  const [accountAddress, setAccountAddress] = useState(undefined);

  // assets
  const [assetId, setAssetId] = useState([]);
  const [assets, setAssets] = useState([]);

  // staking
  const [stakeModal, setStakeModal] = useState(false);
  const [stakingLength, setStakingLength] = useState(undefined);
  const [stakingPercent, setStakingPercent] = useState(undefined);
  const [amount, setAmount] = useState(0);

  // functions
  const toWei = ether => ethers.utils.parseEther(ether);
  const toMatic = wei => ethers.utils.formatEther(wei);

  useEffect(() => {
    const onload = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(provider);

      const contract = new ethers.Contract(
        ContractAddress,
        artifact.abi
      )
      setContract(contract);
    }

    onload();
  }, [])

  const isConnected = () => account !== undefined;

  const getAssetIds = async (address, account) => {
    const assetIds = await contract.connect(account).getStakerIdsByAddresses(address);

    return assetIds;
  }

  const getAssets = async (ids, account) => {
    const loopedAssets = await Promise.all(
      ids.map(id => contract.connect(account).getStakersById(id))
    )

    loopedAssets.map(async asset => {
      const parsedAsset = {
        stakersId: asset.stakerId,
        percentInterest: Number(asset.interestPercentage) / 100,
        daysRemaining: daysRemaining(Number(asset.dateUnlocked)),
        maticInterest: toMatic(asset.interest),
        maticStaked: toMatic(asset.amountStaked),
        open: asset.open
      }

      setAssets(prev => [...prev, parsedAsset]);
    })
  }

  const getAccount = async () => {
    await provider.send("eth_requestAccounts", [])

    const account = provider.getSigner()
    return account;
  }

  const connectAndLoadWallet = async () => {
    const account = await getAccount(provider)
    setAccount(account);

    const accountAddress = await account.getAddress();
    setAccountAddress(accountAddress);

    const assetIds = await getAssetIds(accountAddress, account);
    setAssetId(assetIds);

    getAssets(assetIds, account);
  }

  const stakeMatic = () => {
    const wei = toWei(amount);
    const data = { value: wei };

    contract.connect(account).stakeMatic(stakingLength, data)
  }

  const stakingModal = (stakingLength, stakingPercent) => {
    setStakeModal(true);
    setStakingLength(stakingLength);
    setStakingPercent(stakingPercent);
  }

  const daysRemaining = (unlockDate) => {
    const currentTime = Date.now() / 1000;
    const remainingTime = unlockDate - currentTime;

    return Math.max((remainingTime / 60 / 60 / 24).toFixed(0), 0);
  }

  const withdraw = (stakersId) => {
    contract.connect(account).withdrawMatic(stakersId);
  }

  return (
    <div className="App">
      <div>
        <Navbar isConnected={isConnected} connect={connectAndLoadWallet} />
      </div>

      <div className="appBody">
        <div className="marketContainer">
          <div className="subContainer">
            <span>
              <img src={maticLogo} alt="matic logo" className="logoImg" />
            </span>
            <span className="marketHeader">Matic Market</span>
          </div>

          <div className="row">
            <div className="col-md-4">
              <div onClick={() => stakingModal(30, '7%')} className="marketOption">
                <div className="glyphContainer hoverButton">
                  <span className="glyph">
                    <Coin />
                  </span>
                </div>

                <div className="optionData">
                  <span>1 Month</span>
                  <span className="optionPercent">6%</span>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div onClick={() => stakingModal(30, '10%')} className="marketOption">
                <div className="glyphContainer hoverButton">
                  <span className="glyph">
                    <Coin />
                  </span>
                </div>

                <div className="optionData">
                  <span>3 Months</span>
                  <span className="optionPercent">10%</span>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div onClick={() => stakingModal(180, '14%')} className="marketOption">
                <div className="glyphContainer hoverButton">
                  <span className="glyph">
                    <Coin />
                  </span>
                </div>

                <div className="optionData">
                  <span>6 Months</span>
                  <span className="optionPercent">14%</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="assetContainer">
        <div className="subContainer">
          <span className="marketHeader">Staked Assets</span>
        </div>

        <div>
          <div className="row columnHeaders">
            <div className="col-md-2">Assets</div>
            <div className="col-md-2">Percent Interest</div>
            <div className="col-md-2">Staked</div>
            <div className="col-md-2">Interest</div>
            <div className="col-md-2">Days Remaining</div>
            <div className="col-md-2"></div>
          </div>
        </div>
        <br />

        {assets.length > 0 && assets.map((asset, index) => (
          <div className="row">
            <div className="col-md-2">
              <span>
                <img src={maticLogo} alt="matic-logo" className="stakedLogoImg" />
              </span>
            </div>

            <div className="col-md-2">
              {asset.percentInterest} %
            </div>
            <div className="col-md-2">
              {asset.maticStaked}
            </div>
            <div className="col-md-2">
              {asset.maticInterest}
            </div>
            <div className="col-md-2">
              {asset.daysRemaining}
            </div>
            <div className="col-md-2">
              {asset.open ? (
                <div className="orangeMiniButton" onClick={() => withdraw(asset.stakersId)}>
                  Withdraw
                </div>
              ) : (
                <span>Closed</span>
              )}
            </div>
          </div>
        ))}

      </div>

      {stakeModal && (
        <StakeModal onClose={() => setStakeModal(false)} stakingLength={stakingLength} stakingPercent={stakingPercent} amount={amount} setAmount={setAmount} stakeMatic={stakeMatic} />
      )}

    </div>
  );
}

export default App;
