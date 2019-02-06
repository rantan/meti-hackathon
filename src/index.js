import "babel-polyfill";
import Web3 from "web3";

// ブロックチェーンにデプロイしたスマートコントラクトのアドレス
var smartContractAddress = "";

// ABI(Application Binary Interface) はブロックチェーンの外からコントラクトを利用するための
// インターフェースの定義です。
var abi = [];

let myAccount;
let web3;
let contractInstance;

async function initApp() {
  myAccount = (await web3.eth.getAccounts())[0];
  contractInstance = new web3.eth.Contract(abi, smartContractAddress);
}

window.updateMessageValue = async () => {
  const msgString = document.getElementById("value").value;

  if(!msgString){
    return window.alert("MESSAGE VALUE IS EMPTY");
  }

  try {
    let option = {
      from: myAccount,
      gasPrice: "20000000000", // このトランザクションで支払う1ガス当たりの価格。単位は wei。
      gas: "41000",            // ガスリミット。このトランザクションで消費するガスの最大量。
    };
    await contractInstance.methods.update(msgString).send(option);

    console.log('MESSAGE UPDAtTED IN BLOCKCHIAN SUCCESSFULLY',result);
  } catch (err) {
    console.log(err);
  }
};

window.refreshMessageValue = async () => {
  try {
    const result = await contractInstance.methods.message().call();
    console.log('Fetched msg value from blockchain:', result);
    document.getElementById("message").innerText = result;
  } catch (err) {
    console.log(err);
  }
};

window.addEventListener('load', async function() {
// web3 がブラウザのアドオンなどから提供されているかチェックします。(MetaMask)
  if (typeof window.ethereum !== 'undefined' || (typeof window.web3 !== 'undefined')) {
    // MetaMask の provider を使う
    let provider = window['ethereum'] || window.web3.currentProvider;

    // MetaMask の provider の利用を可能にします。
    // MetaMask にはプライバシーモードがあり、これが有効になっている場合には、この enable() を使っ
    // てこのサイトでMetaMaskを使う許可をユーザから得る必要があります。
    await provider.enable();

    web3 = new Web3(provider);
  } else {
    // ユーザが web3 を持っていないケースのハンドリング。 おそらく、あなたのアプリを利用するために
    // MetaMask をインストールするように伝えるメッセージを表示する処理を書く必要があります。
    // もしくは、Ethereum ノードがローカルで動いている場合には、
    // web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    // また、 infura.io の RPC エンドポイントを利用する場合には、
    // var web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/your_project_id'));
    // のようにできます。
    console.log('METAMASK NOT DETECTED');
  }

  // これで web3.js を自由に使えるようになりました。
  // アプリを初期化して起動しましょう！
  initApp();
});
