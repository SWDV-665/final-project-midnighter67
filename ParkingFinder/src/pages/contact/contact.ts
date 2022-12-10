import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ParkingServiceProvider } from '../../providers/parking-service/parking-service';
import { InputDialogServiceProvider } from '../../providers/input-dialog-service/input-dialog-service';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public alertCtrl: AlertController, public dataService: ParkingServiceProvider, public inputDialogService: InputDialogServiceProvider) {

  }

  

  addItem() {
    console.log("Adding Item");
    this.inputDialogService.showPrompt();
  }

  signIn() {
    console.log("Signing in...");
    const toast = this.toastCtrl.create ({
      message: 'Signing in',
      duration: 3000
  });
  toast.present();
  this.inputDialogService.showPrompt(1)
  }

  createAccount() {
    console.log("Signing in...");
    const toast = this.toastCtrl.create ({
      message: 'Signing in',
      duration: 3000
  });
  toast.present();
  this.inputDialogService.showPrompt();
  }
}
