import { Component } from '@angular/core'
import { LotteryService } from './lottery.service'

declare var window: any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'client'
  isWalletLoggedIn: Boolean

  constructor(private contractsService: LotteryService) {
    this.isWalletLoggedIn = false

    const { ethereum } = window
    this.contractsService.checkWalletConnection(ethereum).then((data0) => {
      if (data0) {
        this.isWalletLoggedIn = true
      }
    })

    this.contractsService.loadContractOwner(ethereum)
  }

  // connect to metamask wallet on button click
  async connectMetamaskWallet() {
    this.isWalletLoggedIn = this.contractsService.isLoggedIn

    if (!this.isWalletLoggedIn) {
      const { ethereum } = window
      await this.contractsService.checkWalletConnection(ethereum)
      await this.contractsService.connectToWallet(ethereum)
      this.isWalletLoggedIn = this.contractsService.isLoggedIn
      window.alert('Connected to Wallet!')
    }
  }
}
