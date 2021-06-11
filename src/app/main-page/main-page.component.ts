import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FetchService } from '../fetch.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  apiData: any[] = [
    { name: "Plus Minus (Chaorcal)", price: 26, path: "../../assets/Minta-charocal.png" },
    { name: "Preium Ampersand Crewneck", price: 62, path: "../../assets/Minta-red.png" }
  ]

  totalAmount: number = 0;
  errorMessage: string = '';
  isFormActive: boolean = true;
  checkoutForm = this.formBuilder.group({ cardNumber: '', month: '', year: '', CVV: '' });

  constructor(private formBuilder: FormBuilder, private fetchService: FetchService) { }

  ngOnInit(): void {
    for (let i: number = 0; i < this.apiData.length; i++) {
      this.totalAmount += this.apiData[i].price;
    }

  }

  onSubmit(): void {
    if (this.checkoutForm.value.CVV.replace(/\D+/g, " ").trim().length < 2 || this.checkoutForm.value.CVV.trim().length > 5) {
      this.errorMessage = "CVV length incorrect";
    }else if(this.checkoutForm.value.cardNumber.replace(/\D+/g, " ").trim().length < 18){
      this.errorMessage = "Bank card number incorrect";
    }else if(this.checkoutForm.value.month.trim() ===''){
      this.errorMessage = "Expiration date incorrect";
    }else if(this.checkoutForm.value.year.trim() ===''){
      this.errorMessage = "Expiration date incorrect";
    } else {
      this.fetchService.sendForm(
        this.checkoutForm.value.cardNumber.trim(),
        this.checkoutForm.value.month.trim(),
        this.checkoutForm.value.year.trim(),
        this.checkoutForm.value.CVV.trim()
      ).subscribe({
        next: (data: any) => (this.errorMessage = data.message),
        error: (error: any) => (this.errorMessage = error.message),
      });
      this.isFormActive = false;
    }
  }
}
