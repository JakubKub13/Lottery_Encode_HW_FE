import { Component, OnInit } from '@angular/core';
import { ethers } from 'ethers';
import LotteryJson from "../../assets/Lottery.json";
import { LotteryService } from '../lottery.service';
// import * as LotteryTokenJson from "../../assets/LotteryToken.json";

const LOTTERY_CONTRACT_ADDRESS = "0x9f64ab5fdD0919c6E777B07283afC88D93E785f4";



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  loteryContractAddress: string; 
  walletAddress: string;
  wallet: ethers.Wallet | undefined;
  etherBalance: string;
  provider: ethers.providers.BaseProvider;
  lottery: ethers.Contract;
  
  constructor(private lotteryService: LotteryService) { 
    this.walletAddress = "Loading........";
    this.etherBalance = "Loading........";
    this.provider = ethers.getDefaultProvider("goerli");
    this.lottery = new ethers.Contract(LOTTERY_CONTRACT_ADDRESS, LotteryJson.abi, this.provider);
    this.loteryContractAddress = "Loading........";
  }

  ngOnInit(): void {
    this.wallet = ethers.Wallet.createRandom();
    this.walletAddress = this.wallet.address;
    this.provider.getBalance(this.walletAddress).then((balanceBN) => {
      this.etherBalance = ethers.utils.formatEther(balanceBN) + " ETH";
    });
    this.loteryContractAddress = this.lotteryService.getContractAddress();
  }

  doAction() {
    this.wallet = ethers.Wallet.createRandom();
    this.walletAddress =this.wallet.address;
  }

}
