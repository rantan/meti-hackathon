# :tokyo_tower: Hello, World Ethereum :tokyo_tower:

Hello, Ethereum! スマートコントラクトの開発を学んで、Ethereum を使った DApp の開発にチャレンジしましょう。
このリポジトリでは、Hello, World レベルの DApp を試す事ができます。 

このリポジトリは2019年2月9日から開催される経済産業省主催の [ブロックチェーンハッカソン2019](https://www.eventbrite.com/e/2019-tickets-55006025503) 
のプログラムの一部として行う Ethereum ブロックチェーンを使った DApp 開発のハンズオンのために用意されました。

## ゴール

このワークショップでは以下をゴールとします。

* Solidity で書かれた最も簡単なスマートコントラクトを理解する。
* スマートコントラクトをローカルの開発用ネットワーク及びテストネットへデプロイができるようになる。
* web3.js と MetaMask を利用して、Webのフロントエンドからスマートコントラクトからの情報の取得と、トランザクション発行によるステートの変更ができるようになる。
* MetaMask, Solidity, web3.js, Truffle のドキュメントの場所を把握し、必要に応じて活用できるようになる。

## このワークショップでやらないこと

* Solidity の言語仕様の解説  
後述のドキュメントを参照してください。

### リファレンス

本ワークショップで利用するツール、ライブラリのドキュメントです。どのツールもドキュメントがちゃんと整備して
あって素晴らしいですね。困ったら参考にしてください。

* [MetaMask Developer Documentation](https://metamask.github.io/metamask-docs/)
* [Solidity 0.5.0 Documentation](https://solidity.readthedocs.io/en/v0.5.0/)
* [web3.js 1.0.0 Documentation](https://web3js.readthedocs.io/en/1.0/)
* [Truffle Suite Documentation](https://truffleframework.com/docs/truffle/overview)

## ワークショップのステップ

1. [事前準備](#step0)
2. [プロジェクトの動作を把握する](#step1)
4. ローカルでデプロイして動かす
5. テストネットにデプロイする

## <a name="step0">1. 事前準備</a>

#### MetaMaskのセットアップ

↓このページを参考にしてください。初期設定の部分だけでOKです。「MetaMaskへ入金」以降の内容は不要です。

[MetaMaskの使い方](https://medium.com/@cryptoplanet.io/metamask%E3%81%AE%E4%BD%BF%E3%81%84%E6%96%B9-76568ab4efd3)

#### ETH を手に入れる

今回は Ropsten というテストネットを使いますので、 このテストネットの ETH を入手します。ここで、 ETH を入手
しておかないと、あとの Live Demo の機能が一部使えません。

さっそく、[Ropsten Faucet](https://faucet.metamask.io/) から 1 ether を受け取りましょう。

![Faucet](https://raw.githubusercontent.com/rantan/meti-hackathon/master/images/03.png "Faucet")  
![Faucet](https://raw.githubusercontent.com/rantan/meti-hackathon/master/images/02.png "Faucet")

#### node のインストール

バージョンは新しいものの方が良いです。あまり古いものだと今回利用するツールが動かない可能性があります。
参考に僕の手元の環境のバージョンを載せておきます。

    $ node --version
    v11.6.0
    $ npm --version
    6.7.0

#### リポジトリの clone

本リポジトリを適当なローカルのパスに clone してください。

    $ git clone git@github.com:rantan/meti-hackathon.git 

#### npm install

リポジトリを clone したら、利用するパッケージをインストールしてください。

    $ cd meti-hackathon
    $ npm install

## <a name="step1">1. プロジェクトの動作を把握する</a>

まずはこのリポジトリで一体何ができるのか把握しましょう。

注) MetaMask をインストールしていない方は先に[ここ(MetaMaskの使い方)](https://medium.com/@cryptoplanet.io/metamask%E3%81%AE%E4%BD%BF%E3%81%84%E6%96%B9-76568ab4efd3)を参考にインストールしてください。

[Live Demo へアクセス]()


TODO: どこかへデプロイする


![Live Demo](https://raw.githubusercontent.com/rantan/meti-hackathon/master/images/01.png "Live Demo")

スマートコントラクトのデータを読み出し、書き換えるだけの簡単な DApp です。

## Truffle プロジェクトの作成

プロジェクトのためのディレクトリの作成

    $ mkdir meti-hackathon
    $ cd meti-hackathon

truffle をインストールします。

    $ npm init
    $ npm install truffle --save

truffle プロジェクトを作成 

    $ $(npm bin)/truffle init
    $ tree -L 1 .
      .
      ├── contracts           # スマートコントラクトを配置するディレクトリ
      ├── migrations          # マイグレーション（コントラクトをデプロイするための仕組み）ファイルを配置する
      ├── node_modules
      ├── package-lock.json
      ├── package.json
      ├── test               # テストを配置する
      └── truffle-config.js  # truffle の設定を書くファイル。
      
ここまでで truffle プロジェクトの初期化ができました。

## 最初のスマートコントラクトを作る

次にスマートコントラクトを作ります。  
`contracts/Hello.sol` というファイルを作成し、以下のコードを貼り付けてください。

[contracts/Hello.sol](https://github.com/rantan/meti-hackathon/blob/master/contracts/Hello.sol)

    pragma solidity ^0.5.0;
    
    contract Hello {
      string public message;
      constructor(string memory initMessage) public {
        message = initMessage;
      }
      function update(string memory newMessage)     public {
        message = newMessage;
      }
    }

試しにコンパイルしてみましょう。

    $(npm bin)/truffle compile
    
すると、`build` というディレクトリが作られます。この JSON ファイルの中にコントラクトのメタ情報や
バイトコードが入っています。

    $ tree build
    build
    └── contracts
        ├── Hello.json
        └── Migrations.json
    
この中に `abi` (Application Binary Interface) という要素がありますが、これは実際にコントラクト
を利用する際に必要になります。実際にチェーンにデプロイされるのはバイトコードですが、このバイト
コードだけからではそのスマートコントラクトが持っているインターフェースを知ることは難しいです。
`abi` を使うことで、スマートコントラクトが持っているインターフェースを知ることができます。

## スマートコントラクトを ganache-cli にデプロイする

さて、実際に動かしてみましょう。動作させるためにはコントラクトをチェーンにデプロイする必要があります。
truffle には ganache-cli(旧testrpc) という開発用の Ethereum シミュレーターがバンドルされていますので、
ローカルでの動作確認ではこれを使うのが便利です。

早速起動してみます。すると以下のように cli が起動します。 

    $ $(npm bin)/truffle develop
    Truffle Develop started at http://127.0.0.1:9545/
    
    Accounts:
    (0) 0xc4032...
    ....
    
    Private Keys:
    (0) 77235....
    ....
    
    Mnemonic: diamond just expand interest phone toilet moral tone hood exclude awake know
    
    ⚠️  Important ⚠️  : This mnemonic was created for you by Truffle. It is not secure.
    Ensure you do not use it on production blockchains, or else you risk losing funds.
    
    truffle(develop)>

開発用に10個の EOA が自動で用意されており、各アカウントは 100 ETH を保有しています。確認してみましょう。

    truffle(develop)> balance = await web3.eth.getBalance("0xc40326...")  // ← 自分の環境のアカウントを引数にしてください。
    undefined
    truffle(develop)> balance
    '100000000000000000000'         // ← 単位は wei
    truffle(develop)> web3.utils.fromWei(balance, 'ether') // 見やすく ether 単位に変換
    '100'

* [web3.eth.getBalance()](https://web3js.readthedocs.io/en/1.0/web3-eth.html#getbalance)
* [web3.utils.fromWei()](https://web3js.readthedocs.io/en/1.0/web3-utils.html#fromwei)

ちなみに、本ワークショップで使う web3.js のバージョンは
    
    truffle(develop)> web3.version
    '1.0.0-beta.37'
    
となっています。以前の 0.xx 系とはインターフェースが大幅に違いますのでご注意ください。 

> Note  
> web3.js の最新である v1.0.0-beta.43 は[不安定](https://github.com/MetaMask/metamask-extension/issues/6080)なようです。
> 何かの拍子に最新バージョンが使われるようになっていてうまく動かない場合は、比較的安定している v1.0.0-beta.37 を試してみてください。

ではコントラクトをデプロイしていきます。デプロイするためには migration ファイルを作成する必要があります。

    $ $(npm bin)/truffle create migration DeployHello
    $ tree migrations/
    migrations/
    ├── 1549600702_deploy_hello.js  ← このファイルが生成されます。
    └── 1_initial_migration.js 
    
生成された `migrations/xxxx_deploy_hello.js` の内容を以下に書き換えてください。

    const HelloContract = artifacts.require('Hello.sol');
    
    module.exports = function(deployer) {
      deployer.deploy(HelloContract, 'Hello');
    };

これで準備ができました。実際にデプロイします。

    truffle(develop)> migrate
    ⚠️  Important ⚠️
    If you're using an HDWalletProvider, it must be Web3 1.0 enabled or your migration will hang.
    
    
    Starting migrations...
    ======================
    > Network name:    'develop'
    > Network id:      4447
    > Block gas limit: 6721975
    
    
    1_initial_migration.js
    ======================
    
       Deploying 'Migrations'
       ----------------------
       > transaction hash:    0x7925597...
       > Blocks: 0            Seconds: 0
       > contract address:    0xf55c6c...
       > account:             0xc40326...
       > balance:             99.99430184
       > gas used:            284908
       > gas price:           20 gwei
       > value sent:          0 ETH
       > total cost:          0.00569816 ETH
    
    
       > Saving migration to chain.
       > Saving artifacts
       -------------------------------------
       > Total cost:          0.00569816 ETH
    
    
    1549600702_deploy_hello.js
    ==========================
    
       Deploying 'Hello'
       -----------------
       > transaction hash:    0x43dd15d...
       > Blocks: 0            Seconds: 0
       > contract address:    0x5609278...                   // ← これ
       > account:             0xc40326b...
       > balance:             99.9872387
       > gas used:            311123
       > gas price:           20 gwei
       > value sent:          0 ETH
       > total cost:          0.00622246 ETH
    
    
       > Saving migration to chain.
       > Saving artifacts
       -------------------------------------
       > Total cost:          0.00622246 ETH
    
    
    Summary
    =======
    > Total deployments:   2
    > Final cost:          0.01192062 ETH

migrate を実行すると↑のように実行結果が表示されます。この中から Hello コントラクトの `contract address` 
を控えて置いてください。実際にコントラクトを操作するときに使います。

おめでとうございます！あなたのはじめてのスマートコントラクトがデプロイできました！

> Note  
> 一度 migrate 下あとにもう一度 migrate を実行しようとすると `Error: Returned values aren't valid, did it run Out of Gas?`
> のようなエラーが出ることがあります。この場合は、 `--reset` オプションをつけて `> migrate --reset` を試してみてください。

## DApp のフロントエンドを作る

次にブラウザで操作するインターフェースを作っていきます。

いくつかフロントエンドで使う package を追加します。

    $ npm install babel-polyfill truffle-hdwallet-provider web3@1.0.0-beta.37 --save
    $ npm install babel-core babel-preset-env parcel-bundler --save-dev
    
今回は babel, parcel を使っていますが、もちろん実際に DApp を開発するサインにはお好みのツールを使ってフロントエンドを作ることができます。

フロントエンドのソースコードを配置するディレクトリを作ります。

    $ mkdir src
    
`src/index.html` `src/index.js` を本リポジトリから src 以下にコピーしてください。

コピーができたら各ファイルの内容を確認し、何をやっているか把握しましょう。

軽く把握できたら実際に動かしていきます。`index.js` を編集します。エディタはお好みでどうぞ。

    $ vi src/index.js 

```js
import "babel-polyfill";
import Web3 from "web3";

// ブロックチェーンにデプロイしたスマートコントラクトのアドレス
var smartContractAddress = "0xf55c6c6C7...";  // ← Hello コントラクトのコントラクトアドレスを指定 

// ABI(Application Binary Interface) はブロックチェーンの外からコントラクトを利用するための
// インターフェースの定義です。
var abi = [];                                // ← build/contracts/Hello.json の abi 要素で置き換える   

// 以下略... 
``` 
    
`smartContractAddress` に文字列を代入している場所に、先程デプロイした Hello コントラクトのコントラクトアドレス

次に、 `abi` 変数に `build/contracts/Hello.json` の abi 要素を代入するように書き換えます。 
    
    {
      "contractName": "Hello",
      "abi": [                      // ← これ
        {
          "constant": true,
          "inputs": [],
          "name": "message",
          "outputs": [
            {
              "name": "",
    // 以下略 ...           

ここまでで準備ができました。 Webサーバを起動してブラウザからアクセスしてみましょう。次のコマンドで percel の
開発用サーバを起動します。

    $(npm bin)/parcel src/index.html

起動したら http://localhost:1234 にアクセスしてください。

## Ethereum シミュレーターにつないで DApp を動かす

このままだとこの DApp はローカルで動作している Ethereum シミュレータに接続されていません。 `src/index.js` 
から分かる通り、ブロックチェーンへ接続するための adapter を MetaMask から取得しています。MetaMask の設定
を変更し、Ethereum シミュレータへ接続する必要があります。 

やっていきます。まず、 `truffle develop` を起動したときに表示される URL を確認します。これがローカルに起動している Ethereum 
シミュレーターのRPCのエンドポイントです。これを MetaMask に設定します。

    $ $(npm bin)/truffle develop
    Truffle Develop started at http://127.0.0.1:9545/                ← これ
    
    Accounts:
    (0) 0xc40326bf811ed6876cba72a4a49788844685d862

![MetaMask](https://raw.githubusercontent.com/rantan/meti-hackathon/master/images/04.png "MetaMask")

![MetaMask](https://raw.githubusercontent.com/rantan/meti-hackathon/master/images/05.png "MetaMask")

![MetaMask](https://raw.githubusercontent.com/rantan/meti-hackathon/master/images/06.png "MetaMask")

![MetaMask](https://raw.githubusercontent.com/rantan/meti-hackathon/master/images/07.png "MetaMask")

「保存」を押して設定完了。MetaMask 上部の選択中のネットワークが今入力したURL担ったと思います。

ここまできたらデモ画面の「Refresh message value」ボタンを押してみてください。その上に「Hello」と表示されたら成功です。

次にデモ画面のその下の 「enter new message value here」に適当な文字列を入力して、コントラクトのデータを書き換えてみましょう。
「update message value」ボタンを押してみてください。

すると、MetaMaskのダイアログが表示されたかと思います。しかし「残高不足」となってしまいます。コントラクトの
データを書き換えるためにはトランザクションの発行が必要ですが、そのためにはガス代を支払う必要があります。
しかし、今の MetaMask のアカウントには ETH がありません。送金する必要があります。

truffle の開発コンソールから送金をしましょう。送金には `web3.eth.sendTransaction` を使います。

    truffle(develop)> await web3.eth.sendTransaction({from: '0xc4032...', to: '0x1630814....', value: web3.utils.toWei('1', 'ether')})Ω
    
from で指定したアカウントから、to で指定したアカウントへ 1 ether 送ります。 

これで MetaMask のアカウントに ETH が入りましたので、DApp を実行できます。

## テストネットで DApp を動かす

Ethereum のテストネットは複数ありますが、今回は Ropsten を使います。

### INFURA.io へサインアップする

Ropsten への接続は [INFURA.io](https://infura.io/ )
を利用して行います。基本的に Ethereum のブロックチェーンへアクセスするためには、フルノードを用意するしかありませんが、
フルノードのセットアップにはそれなりのパワーが有るマシンと時間がかかります。INFURA.io はフルノードの RPC の
エンドポイントを提供してくれるサービスです。

1. [INFURA.io](https://infura.io/) へアクセスしサインアプしてください。
2. INFURA 上でプロジェクトを作成してください。

プロジェクト作成し `PROJECT ID`  が確認できれば INFURA.io の準備は完了です。

### Truffle の Ropsten への接続設定をする

`truffle-config.js` から、２箇所のコメントされている場所のコメントを外します。

```js

...

↓１箇所目
// const HDWalletProvider = require('truffle-hdwallet-provider');
// const infuraKey = "fj4jll3k.....";
//
// const fs = require('fs');
// const mnemonic = fs.readFileSync(".secret").toString().trim();

 ...

     ↓2箇所目 
    // ropsten: {
      // provider: () => new HDWalletProvider(mnemonic, `https://ropsten.infura.io/${infuraKey}`),
      // network_id: 3,       // Ropsten's id
      // gas: 5500000,        // Ropsten has a lower block limit than mainnet
      // confirmations: 2,    // # of confs to wait between deployments. (default: 0)
      // timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
      // skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    // }, 
```

1箇所目にある `infuraKey` に INFURA.io で作成したプロジェクトの PROJECT ID をセットしてください。   

```js
const infuraKey = "[INFURA.io から PROJECT ID を貼り付ける]";
```

次にアカウントの設定をします。MetaMask には最初に Faucet から入手した ETH が入っている Ropsten のアカウン
トがあると思います。コントラクトのデプロイにはガスの支払いが必要なため、このアカウントを使って、Truffle か
らデプロイを試みます。  

先程コメントを外したコードを見見ると、 `.secret` というファイルからニーモニックを読み出してウォレットを
作っていることがわかります。これを動作させるために、 MetamMask のニーモニックを `.secret` という名前の
ファイルとしてプロジェクト直下に保存してください。

### Ropsten へ Truffle から接続する

準備ができたので接続してみます。以下のコマンドを使います。

    $ truffle console --network ropsten

アカウントと残高を確認してみましょう。

    truffle(ropsten)> accounts = await web3.eth.getAccounts()
    undefined
    truffle(ropsten)> accounts
    [ '0x16308...' ]
    truffle(ropsten)> balance = await web3.eth.getBalance(accounts[0])
    undefined
    truffle(ropsten)> web3.utils.fromWei(balance)
    '5.982954351'

残高もあることが確認できました。

### Ropsten へデプロイする

やり方は一緒です。

    truffle(ropsten)> migrate

シミュレータとは違って、ブロックへの取り込みに時間がかるため、デプロイにも時間がかかります。どきどきしますね。  

うまくいきましたか？

うまく行ったら [Ropsten のエクスプローラー](https://ropsten.etherscan.io) で今デプロイしたコントラクトを
探してみましょう。ページを開いて、コントラクトアドレスを右上の検索に入れてみてください。見つかりましたか？
みつかったら、間違いなくあなたのコントラクトはパブリックなブロックチェーンに（テストネットではあるけど）公開
されたということです！これであなたも **パブリックブロックチェーンプログラマ** です。おめでとうございます！

デプロイに成功したら、最後に `src/index.js` のコントラクトアドレスを、今デプロイしたてのコントラクトのア
ドレスに書き換えましょう。

さて、ブラウザからアクセスしてみましょう。 MetaMask のネットワークの設定は Ropsten にっていますか？OKなら
あとは DApp を動かすだけです。やってみましょう。


動いたら、このワークの内容はすべて完了です！これで、あとはウェブようのアセットをどこかのサーバで公開すれば
世界中の誰もがあなたのはじめての DApp を試すことができます。IPFS などの分散ストレージにデプロイすればなお
良いですね。

## 最後に

お疲れ様でした。いかがでしたか？Ethereum を使った DApp 開発の雰囲気を掴んでいただけたなら幸いです。あなた
がこれをきっかけにインパクトがある新しいブロックチェーンプロダクトの開発に関心を深め、我々と一緒にその可能性
を模索してくことができれば嬉しく思います。

最後にこれから Solidity でスマートコントラクト開発をやっていく際に有用なリソースを紹介して終わります。

* [CryptZombie](https://cryptozombies.io/jp/)  
ゾンビゲームを作りながら Solidity を使ったスマートコントラクトの構築を学べます。豊富なコンテンツ量があり、
これを一通りやるだけで、スマートコントラクトを書く力が実際につくと思います。
* [Smart Contract Security Best Practicces](https://consensys.github.io/smart-contract-best-practices/)  
スマートコントラクトにおいてその性質上、通常のシステムに比較してもよりセキュリティには気にかける必要がありま
す。実際に資産を預かるスマートんトラクトをメインネットにデプロイする前に個々にある内容はしっかりと網羅してお
きましょう。
