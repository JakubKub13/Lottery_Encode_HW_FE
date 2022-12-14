import { Component, OnInit } from '@angular/core'
import { LotteryService } from '../lottery.service'
import { FormBuilder, Validators } from '@angular/forms'
import { ethers } from 'ethers'
import bigNumberToETHString from '../..//helpers/bigNumberToETHString'

declare var window: any

@Component({
  selector: 'app-wager',
  templateUrl: './wager.component.html',
  styleUrls: ['./wager.component.css'],
})
export class WagerComponent implements OnInit {
  isAttemptingToPurchaseTokens: Boolean
  isAttemptingTokenRedemption: Boolean
  isLoadingBalance: Boolean
  isBettingWindowOpen: Boolean
  currentLotteryTokenBalanceForCurrentWallet: string
  currentWalletBalance: string
  unclaimedLotteryWinning: string
  unclaimedLotteryWinningBN: ethers.BigNumber
  isPlacingBet: Boolean
  isClaimingWinning: Boolean
  isForcingAllowance: Boolean

  buyTokensForm = this.fb.group({
    lotteryTokenAmount: ['', [Validators.required]],
  })

  redeemTokensForm = this.fb.group({
    lotteryTokenAmount: ['', [Validators.required]],
  })

  constructor(
    private contractsService: LotteryService,
    private fb: FormBuilder,
  ) {
    this.isAttemptingToPurchaseTokens = false
    this.isAttemptingTokenRedemption = false
    this.isLoadingBalance = true
    this.isBettingWindowOpen = false
    this.currentLotteryTokenBalanceForCurrentWallet = ''
    this.currentWalletBalance = ''
    this.unclaimedLotteryWinning = ''
    this.isPlacingBet = false
    this.isClaimingWinning = false
    this.unclaimedLotteryWinningBN = ethers.BigNumber.from(0)
    this.isForcingAllowance = false
  }

  async ngOnInit(): Promise<void> {
    this.isBettingWindowOpen = await this.contractsService.isBettingWindowOpen();
    const { ethereum } = window;
    this.currentLotteryTokenBalanceForCurrentWallet = await this.contractsService.getLotteryTokenBalance(ethereum);
    this.currentWalletBalance = await this.contractsService.getWalletBalance(ethereum);
    [this.unclaimedLotteryWinningBN, this.unclaimedLotteryWinning] = await this.contractsService.getUnclaimedWinnings(ethereum)
    this.isLoadingBalance = false
  }

  async attemptTokenPurchase() {
    this.isAttemptingToPurchaseTokens = true
    const { ethereum } = window
    const { lotteryTokenAmount } = this.buyTokensForm.value

    if (Number.isNaN(parseFloat(lotteryTokenAmount!))) {
      console.log('Enter valid token amount!')
      window.alert('Enter valid token amount!')
      this.isAttemptingToPurchaseTokens = false
    }

    const isPurchaseSuccess = await this.contractsService.purchaseLotteryTokens(ethereum, lotteryTokenAmount!)  // check this

    if (isPurchaseSuccess) {
      window.alert('Token purchase successful!')
      this.currentWalletBalance = await this.contractsService.getWalletBalance(ethereum)
    } else window.alert('Token purchase unsuccessful - please try later!')
    this.isAttemptingToPurchaseTokens = false
    await this.ngOnInit()
  }

  async attemptTokenRedemption() {
    this.isAttemptingTokenRedemption = true
    const { ethereum } = window
    const ifRedemptionSuccess = await this.contractsService.redeemTokensToETH(ethereum)
    if (ifRedemptionSuccess) {
      window.alert('Redemption was successful!')
      await this.ngOnInit()
    } else window.alert('Token burn unsuccessful - please try later!')
    this.isAttemptingTokenRedemption = false
  }

  async attemptPlacingBets() {
    this.isPlacingBet = true
    const { ethereum } = window
    const isPlacingBetSuccess = await this.contractsService.placeBets(ethereum)

    if (isPlacingBetSuccess) {
      window.alert('Placed bet successfully!')
      await this.ngOnInit()
    }
    this.isPlacingBet = false
  }

  async attemptWinningClaim() {
    const { ethereum } = window
    this.isClaimingWinning = true
    const isWinningClaimSuccess = await this.contractsService.claimWinning(ethereum, this.unclaimedLotteryWinningBN)

    if (isWinningClaimSuccess) {
      window.alert('Claimed winning successfully!')
      await this.ngOnInit()
    }
    this.isClaimingWinning = false
  }

  async forceAllowance() {
    const { ethereum } = window
    const isForceAllowanceSuccess = await this.contractsService.forceAllowance(ethereum);

    if (isForceAllowanceSuccess) {
      window.alert('Force allowance txn successful - try to bet again!')
      await this.ngOnInit()
    }
    this.isForcingAllowance = false
  }
}