async function connectMetaMask() {
    if (window.ethereum) {
        try {
            // Request account access
            await window.ethereum.request({ method: "eth_requestAccounts" });
            web3 = new Web3(window.ethereum);
            alert("MetaMask connected successfully!");
        } catch (err) {
            console.error(err);
            alert("MetaMask connection failed!");
        }
    } else {
        alert("MetaMask is not installed. Please install MetaMask!");
    }
}

async function addCandidateToBlockchain(name, party) {
    const abi = [Database_API];
    const contractAddress = "YOUR_SMART_CONTRACT_ADDRESS";

    if (!web3) await connectMetaMask();

    const contract = new web3.eth.Contract(abi, contractAddress);
    const accounts = await web3.eth.getAccounts();

    try {
        // Call the addCandidate method from the smart contract
        await contract.methods.addCandidate(name, party).send({ from: accounts[0] });
        alert("Candidate added successfully!");
    } catch (err) {
        console.error("Error adding candidate:", err);
        alert("Failed to add candidate.");
    }
}

document.getElementById("addCandidateButton").onclick = async () => {
    const name = document.getElementById("name").value;
    const party = document.getElementById("party").value;

    if (name && party) {
        await addCandidateToBlockchain(name, party);
    } else {
        alert("Please fill in all fields.");
    }
};
