import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unavailable-meeting-rooms',
  templateUrl: 'unavailable-meeting-rooms.component.html',
  styleUrls: ['unavailable-meeting-rooms.component.css']
})
export class UnavailableMeetingRoomsComponent implements OnInit {
  roomList: any;

  constructor(private http: HttpClient, private router: Router){ }

  //Initialisation des salles réservées :
  ngOnInit(): void {
    const urlFind = 'https://meeting-rooms-22.herokuapp.com/api/availableRooms/1';
    this.http.get<any>(urlFind).subscribe(roomList => {
      this.roomList = roomList;
    });
  }

  //Libérer une salle réservée :
  freeUpRoom(roomName : string){
    const httpOptions = {
      headers : new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    const urlUpdate = `https://meeting-rooms-22.herokuapp.com/api/switchStateRoom?name=${roomName}`;
    return this.http.put<any>(urlUpdate, {"reserved": false }, httpOptions).subscribe(() => this.router.navigate(['/searchAvailableRooms']));
  }
}
