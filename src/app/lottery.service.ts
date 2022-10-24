import { Injectable } from '@angular/core';
import { ethers } from 'ethers';
import LotteryJson from "../assets/Lottery.json";

const LOTTERY_CONTRACT_ADDRESS = "0x9f64ab5fdD0919c6E777B07283afC88D93E785f4";

@Injectable({
  providedIn: 'root'
})
export class LotteryService {
  wallet: ethers.Wallet | undefined;
  provider: ethers.providers.BaseProvider;
  lottery: ethers.Contract;

  constructor() {
    this.provider = ethers.getDefaultProvider("goerli");
    this.lottery = new ethers.Contract(LOTTERY_CONTRACT_ADDRESS, LotteryJson.abi, this.provider);
   }

  getContractAddress(): string {
    return this.lottery.address;
  }
}
