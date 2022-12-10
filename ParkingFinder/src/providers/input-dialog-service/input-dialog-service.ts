import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { ParkingServiceProvider } from '../parking-service/parking-service';

/*
  Generated class for the InputDialogServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class InputDialogServiceProvider {

  constructor(public alertCtrl: AlertController, public dataService: ParkingServiceProvider) {
    console.log('Hello InputDialogServiceProvider Provider');
  }

  users = [
    {
      first_name: "mike",
      last_name: "wooldridge",
      username: "username",
      password: "password"
    },
    {
      first_name: "rochelle",
      last_name: "massey",
      username: "username2",
      password: "password2"
    },
  ];

  /* NEED TO ADD 'value' FIELD TO INPUTS */
  showPrompt(flag?) {
    const prompt = this.alertCtrl.create({
      title: flag ? 'Sign In ' : 'Create Account ',
      message: flag ? 'Please sign in...' : 'Please enter info...',
      inputs: flag ? [{
                        name: 'username', 
                        placeholder: 'Username'
                      },
                      {
                        name: 'password',
                        placeholder: 'Password'
                      }] : 
                     [{
                        name: 'first', 
                        placeholder: 'First'
                      }, 
                      {
                        name: 'last', 
                        placeholder: 'Last'
                      },
                      {
                        name: 'username', 
                        placeholder: 'Username'
                      },
                      {
                        name: 'password',
                        placeholder: 'Password'
                      }
                    ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Submit',
          handler: flag => {
            console.log('Submit clicked', flag);
            if (flag !== undefined) {
              this.dataService.signIn()

            }
            else {
              this.dataService.createAccount();
            }
          }
        }
      ]
       
    });
    prompt.present();
  }
}
