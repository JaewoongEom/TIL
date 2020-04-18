

const express=require('express');
const router=express.Router();

const Sponsor = require( "../truffle/build/contracts/Sponsor.json");
const Web3= require( "web3");
let web3=new Web3();
let accounts=null;
let contract =null;

router.post('/add',async(req,res)=>{    
    try {
        web3.setProvider(new Web3.providers.HttpProvider('http://localhost:7545'));
        accounts = await web3.eth.getAccounts();
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = Sponsor.networks[networkId];
        contract = new web3.eth.Contract(
            Sponsor.abi,
            deployedNetwork && deployedNetwork.address,
        );
        let amount=parseInt(req.body.amount,10);
        console.log(req.body.amount,amount);
        const sendpay = parseInt(web3.utils.toWei(req.body.amount, 'ether'));
        await web3.eth.sendTransaction({ from: accounts[0], to: req.body.wallet, value: sendpay});
        const total= await contract.methods.get().call();
        let balance = await web3.eth.getBalance(accounts[0]);
        balance = await web3.utils.fromWei(balance, "ether");
        res.send({ msg: balance });
    } catch (error) {
        console.error(error);
        res.send({ msg: error.message });
    }

});


                module.exports = router;
