// ブロックチェーンにデプロイしたスマートコントラクトのアドレス
var smartContractAddress = "";

// ABI(Application Binary Interface) はブロックチェーンの外からコントラクトを利用するための
// インターフェースの定義です。
var abi = [];

var myAccount;
var web3;

function initApp(){
  myAccount = web3.eth.accounts[0];
  myContract = web3.eth.contract(abi);
  contractInstance = myContract.at(smartContractAddress);
}

function updateMessageValue() {
  msgString = document.getElementById("value").value;
  if(!msgString){
    return window.alert("MESSAGE VALUE IS EMPTY");
  }

  contractInstance.update(msgString,{
    from: myAccount,
    gasPrice: "20000000000", // このトランザクションで支払う1ガス当たりの価格。単位は wei。
    gas: "41000", // ガスリミット。このトランザクションで消費するガスの最大量。
    //to: textetheraddress,
    //value: textetheramount,
    //data: ""
  }, function(err, result) {
    if (!err){
      console.log('MESSAGE UPDATED IN BLOCKCHIAN SUCCESSFULLY',result);
    }
    else{
      console.log(err);
    }
  });
}

function refreshMessageValue(msgString) {
  contractInstance.message({
    from: myAccount
  }, function(err, result) {
    if (!err){
      console.log('Fetched msg value from blockchain:',result);
      document.getElementById("message").innerText=result;
    }
    else{
      console.log(err);
    }
  });
}

window.addEventListener('load', function() {
// web3 がブラウザのアドオンなどから提供されているかチェックします。(Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    // Mist/MetaMask の provider を使う
    web3 = new Web3(web3.currentProvider);
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
