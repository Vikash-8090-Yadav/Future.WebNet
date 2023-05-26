// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

contract WeaveChain {
    constructor() {
        addressContractOwner = msg.sender;
    }

    //variable declaration start
    address public addressContractOwner;
    uint256 public actorIdCounter = 0;
    uint256 public assetIdCounter = 0;
    //variable declaration end

    //modifier start
    modifier onlyOwner() {
        require(msg.sender == addressContractOwner);
        _;
    }
    modifier onlyTM() {
        require(getActorRole(msg.sender) == 1, "He is not Thread Manufacturer");
        _;
    }
    modifier onlyTD() {
        require(getActorRole(msg.sender) == 2, "He is not Thread Ditributor");
        _;
    }
    modifier onlyWeaver() {
        require(getActorRole(msg.sender) == 3, "He is not Weaver");
        _;
    }
    modifier onlyRetailer() {
        require(getActorRole(msg.sender) == 5, "He is not Retailer");
        _;
    }
    //modifier end

    //struct start
    struct Actor {
        uint256 id;
        address actorAddress;
        string name;
        uint8 role;
        string place;
    }

    struct ActorAsset {
        uint256 id;
        uint256 time;
    }

    struct AssetPayable {
        uint8 trackerNumber;
        uint8 state;
        uint256 price;
        address payable recentOwner;
    }

    struct AssetTracer {
        uint8 state;
        address actorAddress;
        uint256 price;
        uint256 time;
        uint8 buyStatus;
    }
    //struct end

    //mapping start
    mapping(address => Actor) public actorsByAddress;
    mapping(uint256 => Actor) public actorsById;
    mapping(address => ActorAsset[]) public actorAssetsByAddress;
    mapping(uint256 => AssetPayable) public payableAssetsById;
    mapping(uint256 => mapping(uint8 => AssetTracer)) public tracerAssets; //key asset id and asset state/tracker number
    //mapping end

    //event start
    event ActorCreated(
        uint256 id,
        address indexed actorAddress,
        string name,
        uint8 role,
        string place,
        string log
    );
    event AssetAdded(address indexed actorAddress, uint256 assetId, string log);
    event AssetInitiated(
        uint256 id,
        address owner,
        uint256 price,
        string message
    );
    event AssetProcessed(
        uint256 id,
        uint8 oldState,
        uint8 newState,
        address owner,
        uint256 price,
        string message
    );
    event AssetPurchased(
        uint256 assetId,
        address payable seller,
        address buyer,
        uint8 state,
        uint256 price,
        string message
    );

    //event end

    //getter function start
    function getActorRole(address _address) public view returns (uint256) {
        return actorsByAddress[_address].role;
    }

    function getRegisterStatus(address _address) public view returns (bool) {
        return bytes(actorsByAddress[_address].name).length > 0;
    }

    function getActorAssets(
        address _address
    ) public view returns (ActorAsset[] memory) {
        return actorAssetsByAddress[_address];
    }

    //getter function end

    //function start
    function registerActor(
        address _address,
        string memory _name,
        uint8 _role,
        string memory _place
    ) public onlyOwner {
        require(bytes(_name).length != 0, "Name is not valid");
        require(bytes(_place).length != 0, "Place is not valid");
        require(_role != 0, "Role must not zero");
        require(_role <= 4, "Role value must be less than or equal to 4");
        require(!getRegisterStatus(_address), "User must not be registered");

        actorIdCounter++;
        actorsById[actorIdCounter] = Actor(
            actorIdCounter,
            _address,
            _name,
            _role,
            _place
        );
        actorsByAddress[_address] = Actor(
            actorIdCounter,
            _address,
            _name,
            _role,
            _place
        );
        emit ActorCreated(
            actorIdCounter,
            _address,
            _name,
            _role,
            _place,
            "Actor successfully created"
        );
    }

    function addRawMaterial(uint256 _price) public onlyTM {
        require(_price > 0, "Asset price must be greater than 0");
        uint8 assetState = 1;
        uint256 id = ++assetIdCounter;
        uint8 trackerNumber = 1;
        payableAssetsById[id] = AssetPayable(
            trackerNumber,
            assetState,
            _price,
            payable(msg.sender)
        );
        addAsset(msg.sender, id);
        uint256 time = block.timestamp;
        uint8 buyStatus = tracerAssets[id][trackerNumber].buyStatus;
        tracerAssets[id][trackerNumber] = AssetTracer(
            assetState,
            msg.sender,
            _price,
            time,
            buyStatus
        );
        emit AssetInitiated(
            id,
            msg.sender,
            _price,
            "Asset (Raw Material) was successfully initiated"
        );
    }

    function createThread(uint256 _assetId, uint256 _price) public onlyTM {
        require(
            payableAssetsById[_assetId].state == 1,
            "Asset initial state is not correct"
        );
        require(
            haveAsset(msg.sender, _assetId),
            "This actor don't have the asset that want to be processed"
        );
        require(_price > 0, "Asset price must be greater than 0");
        uint8 oldState = payableAssetsById[_assetId].state;
        payableAssetsById[_assetId].state++;
        payableAssetsById[_assetId].trackerNumber++;
        payableAssetsById[_assetId] = AssetPayable(
            payableAssetsById[_assetId].trackerNumber,
            payableAssetsById[_assetId].state,
            _price,
            payable(msg.sender)
        );
        uint256 time = block.timestamp;
        uint8 buyStatus = tracerAssets[_assetId][
            payableAssetsById[_assetId].trackerNumber
        ].buyStatus;
        tracerAssets[_assetId][
            payableAssetsById[_assetId].trackerNumber
        ] = AssetTracer(
            payableAssetsById[_assetId].state,
            msg.sender,
            _price,
            time,
            buyStatus
        );

        emit AssetProcessed(
            _assetId,
            oldState,
            payableAssetsById[_assetId].state,
            msg.sender,
            _price,
            "Asset (Thread) was succesfully created!"
        );
    }

    function distributeThread(uint256 _assetId, uint256 _price) public onlyTD {
        require(
            payableAssetsById[_assetId].state == 2,
            "Asset initial state is not correct"
        );
        require(
            haveAsset(msg.sender, _assetId),
            "This actor don't have the asset that want to be processed"
        );
        require(_price > 0, "Asset price must be greater than 0");
        uint8 oldState = payableAssetsById[_assetId].state;
        payableAssetsById[_assetId].state++;
        payableAssetsById[_assetId].trackerNumber++;
        payableAssetsById[_assetId] = AssetPayable(
            payableAssetsById[_assetId].trackerNumber,
            payableAssetsById[_assetId].state,
            _price,
            payable(msg.sender)
        );
        uint256 time = block.timestamp;
        uint8 buyStatus = tracerAssets[_assetId][
            payableAssetsById[_assetId].trackerNumber
        ].buyStatus;
        tracerAssets[_assetId][
            payableAssetsById[_assetId].trackerNumber
        ] = AssetTracer(
            payableAssetsById[_assetId].state,
            msg.sender,
            _price,
            time,
            buyStatus
        );

        emit AssetProcessed(
            _assetId,
            oldState,
            payableAssetsById[_assetId].state,
            msg.sender,
            _price,
            "Asset (Thread) was successfully distributed"
        );
    }

    function fabricWeaving(uint256 _assetId, uint256 _price) public onlyWeaver {
        require(
            payableAssetsById[_assetId].state == 3,
            "Asset initial state is not correct"
        );
        require(
            haveAsset(msg.sender, _assetId),
            "This actor don't have the asset that want to be processed"
        );
        require(_price > 0, "Asset price must be greater than 0");
        uint8 oldState = payableAssetsById[_assetId].state;
        payableAssetsById[_assetId].state++;
        payableAssetsById[_assetId].trackerNumber++;
        payableAssetsById[_assetId] = AssetPayable(
            payableAssetsById[_assetId].trackerNumber,
            payableAssetsById[_assetId].state,
            _price,
            payable(msg.sender)
        );
        uint256 time = block.timestamp;
        uint8 buyStatus = tracerAssets[_assetId][
            payableAssetsById[_assetId].trackerNumber
        ].buyStatus;
        tracerAssets[_assetId][
            payableAssetsById[_assetId].trackerNumber
        ] = AssetTracer(
            payableAssetsById[_assetId].state,
            msg.sender,
            _price,
            time,
            buyStatus
        );

        emit AssetProcessed(
            _assetId,
            oldState,
            payableAssetsById[_assetId].state,
            msg.sender,
            _price,
            "Asset (Woven Fabric) was successfully woven"
        );
    }

    function sellFabric(uint256 _assetId, uint256 _price) public onlyRetailer {
        require(
            payableAssetsById[_assetId].state == 5,
            "Asset initial state is not correct"
        );
        require(
            haveAsset(msg.sender, _assetId),
            "This actor don't have the asset that want to be processed"
        );
        require(_price > 0, "Asset price must be greater than 0");
        uint8 oldState = payableAssetsById[_assetId].state;
        payableAssetsById[_assetId].state++;
        payableAssetsById[_assetId].trackerNumber++;
        payableAssetsById[_assetId] = AssetPayable(
            payableAssetsById[_assetId].trackerNumber,
            payableAssetsById[_assetId].state,
            _price,
            payable(msg.sender)
        );
        uint256 time = block.timestamp;
        uint8 buyStatus = tracerAssets[_assetId][
            payableAssetsById[_assetId].trackerNumber
        ].buyStatus;
        tracerAssets[_assetId][
            payableAssetsById[_assetId].trackerNumber
        ] = AssetTracer(
            payableAssetsById[_assetId].state,
            msg.sender,
            _price,
            time,
            buyStatus
        );

        emit AssetProcessed(
            _assetId,
            oldState,
            payableAssetsById[_assetId].state,
            msg.sender,
            _price,
            "Woven fabric sold to customer"
        );
    }

    function purchaseAsset(uint256 _assetId) public payable {
        require(
            _assetId > 0 && _assetId <= assetIdCounter,
            "Asset Id is not valid"
        );
        require(
            msg.value >= payableAssetsById[_assetId].price,
            "Transfer amount is not correct"
        );
        require(
            tracerAssets[_assetId][payableAssetsById[_assetId].trackerNumber].actorAddress != msg.sender,
            "Seller cant sell Asset to himself"
        );
        
        payableAssetsById[_assetId].trackerNumber++;
        payableAssetsById[_assetId] = AssetPayable(
            payableAssetsById[_assetId].trackerNumber,
            payableAssetsById[_assetId].state,
            payableAssetsById[_assetId].price,
            payableAssetsById[_assetId].recentOwner
        );

        uint256 time = block.timestamp;
        uint8 buyStatus = 0;
        buyStatus++;
        tracerAssets[_assetId][
            payableAssetsById[_assetId].trackerNumber
        ] = AssetTracer(
            payableAssetsById[_assetId].state,
            msg.sender,
            payableAssetsById[_assetId].price,
            time,
            buyStatus
        );
        removeAsset(payableAssetsById[_assetId].recentOwner, _assetId);
        addAsset(msg.sender, _assetId);
        payableAssetsById[_assetId].recentOwner.transfer(msg.value);
        emit AssetPurchased(
            _assetId,
            payableAssetsById[_assetId].recentOwner,
            msg.sender,
            payableAssetsById[_assetId].state,
            payableAssetsById[_assetId].price,
            "Asset successfully bought"
        );
    }

    //////////////////////////////private//////////////////////////////
    function addAsset(address _address, uint256 _assetId) private {
        actorAssetsByAddress[_address].push(
            ActorAsset(_assetId, block.timestamp)
        );

        emit AssetAdded(_address, _assetId, "New asset has been added");
    }

    function haveAsset(
        address _address,
        uint256 _assetId
    ) private view returns (bool) {
        ActorAsset[] memory temp = actorAssetsByAddress[_address];

        for (uint256 i = 0; i < temp.length; i++) {
            if (temp[i].id == _assetId) {
                return true;
            }
        }
        return false;
    }

    function removeAsset(address _address, uint256 _assetId) private {
        ActorAsset[] storage temp = actorAssetsByAddress[_address];

        for (uint256 i = 0; i < temp.length; i++) {
            if (temp[i].id == _assetId) {
                delete temp[i];
                break;
            }
        }
    }
}
