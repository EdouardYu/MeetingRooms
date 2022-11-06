import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchMeetingRoomsService } from '../search-meeting-rooms/search-meeting-rooms.service';

@Component({
  selector: 'app-available-meeting-rooms',
  templateUrl: 'available-meeting-rooms.component.html',
  styleUrls: ['available-meeting-rooms.component.css']
})
export class AvailableMeetingRoomsComponent implements OnInit {
  roomList: any;
  
  constructor(private http: HttpClient, private router: Router, private data: SearchMeetingRoomsService) { }

  //Initialisation des salles libres :
  ngOnInit(): void {
    let capacity = this.data.capacity | 1;
    let equipement1 = '';
    let equipement2 = '';
    if(this.data.equipement1){
      equipement1 = 'TV';
    } 
    if(this.data.equipement2){
      equipement2 = 'Retro Projecteur';
    } 
    //Ne pas faire attention à l'url, elle a été généré automatiquement par l'hébergeur
    const urlFind =`https://young-reaches-00340.herokuapp.com/api/availableRooms/0?capacity=${capacity}&equipement1=${equipement1}&equipement2=${equipement2}`;
    this.http.get<any>(urlFind).subscribe(roomList => {
      this.roomList = roomList;
    });
  }

  //Réserver une salle libre :
  reserveRoom(roomName : string){
    const httpOptions = {
      headers : new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    //Ne pas faire attention à l'url, elle a été généré automatiquement par l'hébergeur
    const urlUpdate = `https://young-reaches-00340.herokuapp.com/api/switchStateRoom?name=${roomName}`;
    return this.http.put<any>(urlUpdate, {"reserved": true }, httpOptions).subscribe(() => this.router.navigate(['/unavailableRooms']));
  }
}
