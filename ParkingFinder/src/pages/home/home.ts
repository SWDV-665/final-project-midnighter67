import { Component, ViewChild, ElementRef } from '@angular/core';
import { Content, NavController } from 'ionic-angular';
import { Geolocation, GeolocationOptions, Geoposition, PositionError } from '@ionic-native/geolocation';

declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  options: GeolocationOptions;
  currentPos: Geoposition;
  places: Array<any>
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  constructor(public navCtrl: NavController, private geolocation: Geolocation) {

  }



/* if the code below is commented out it's becaue enabling the code will cause a runtime error
   because I did not enable billing for the google api.  I don't know how the billing/charges
   work for using it and I didn't want to pay money to get this to work. I have no idea how much
   it would cost but I don't want any surprises.  I didn't know there was a fee for using maps
   when I started this project.  I would have chosen something else if I had know but it was too
   late to change by the time I found this out */  

 
  addMap(lat, long) {
    let latLng = new google.maps.LatLng(lat, long);

    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.getParking(latLng).then((results: Array<any>) => {
      this.places = results;
      for(let i = 0; i < results.length; i++)
      {
        this.createMarker(results[i]);
      }
    }, (status) => console.log(status));
    
    this.addMarker();
  }

  addMarker(){
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });

    let content = "<p>This is your current position!</p>";
    let infoWindow = new google.maps.InfoWindow({
      content: Content
    });

    google.maps.event.addListener(marker, 'click', () =>{
      infoWindow.open(this.map, marker);
    })
  }
 
  getUserPosition(){
    this.options = {
      enableHighAccuracy : false
    };

    this.geolocation.getCurrentPosition(this.options).then((pos: Geoposition) => {
      this.currentPos = pos;
      console.log(pos);
      this.addMap(pos.coords.latitude, pos.coords.longitude);
    }, (err: PositionError) => {
      console.log("error: " + err.message);
    
    });
  }

  getParking(latLng){
    var service = new google.maps.places.PlacesService(this.map);
    let request = {
      location: latLng,
      radius: 8047,
      types: ["parking"]
    };
    return new Promise((resolve, reject) => {
      service.nearbySearch(request, function(results, status) {
        if(status === google.maps.places.PlacesServiceStatus.OK)
        {
          resolve(results);
        }else
        {
          reject(status);
        }
      });
    });
  }

  createMarker(place) {
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: place.geometry.location
    })
  }

  ionViewDidEnter(){
    this.getUserPosition();
  }



}
