import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ParkingServiceProvider } from '../../providers/parking-service/parking-service';
import { InputDialogServiceProvider } from '../../providers/input-dialog-service/input-dialog-service';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  title = "History";
  events = [];
  errorMessage: string;

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public alertCtrl: AlertController, public dataService: ParkingServiceProvider, public InputDialogService: InputDialogServiceProvider) {
    dataService.dataChanged$.subscribe((dataChanged: boolean) => {
      this.loadEvents();
    });
  }

  ionViewDidLoad() {
    this.loadEvents();
  }

  loadEvents() {
    return this.dataService.getEvents()
      .subscribe(
        events => this.events = events,
        error => this.errorMessage = <any>error);
  }

  removeEvent(id) {
    this.dataService.removeEvent(id);
  }

  addEvent() {
    console.log("adding item...");
  }
}
