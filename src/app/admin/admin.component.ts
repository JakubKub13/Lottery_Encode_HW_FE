import { Component, OnInit, NgZone } from '@angular/core';
import { ContractService } from '../contracts.service'
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from 'angular/router';
import { ethers } from 'ethers';
import currentEpoch from 'src/helpers/currentEpoch';

declare var window: any


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  isOwnerLoggedIn: Boolean
  isAttemptingLotteryStart: Boolean
  isLoadingAccumulatedFees: Boolean
  accumulatedFees: string
  isLotteryStartAvailable: Boolean
  ownerLotteryTokenBalance: string
  currentWalletBalance: string
  isAttemptingFeeCredit: Boolean

  startLotteryForm = this.fb.group({
    durationInSeconds: ['', [Validators.required]]
  })

  constructor(
    private contractsService: ContractsService,
    private fb: FormBuilder,
    private ngZone: NgZone,
    private router: Router,
  ) { 
    this.isOwnerLoggedIn = false;
    this.isAttemptingLotteryStart = false;
    this.isLoadingAccumulatedFees = false;
    this.accumulatedFees = '';
    this.isLotteryStartAvailable = false;
    this.ownerLotteryTokenBalance = '';
    this.currentWalletBalance = '';
    this.isAttemptingFeeCredit = false;
  }

  ngOnInit(): void {
  }

}
