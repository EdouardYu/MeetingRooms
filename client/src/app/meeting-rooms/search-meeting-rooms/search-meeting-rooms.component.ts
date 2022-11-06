import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SearchRoom } from './search';
import { SearchMeetingRoomsService } from './search-meeting-rooms.service';

@Component({
  selector: 'app-search-meeting-rooms',
  templateUrl: 'search-meeting-rooms.component.html',
  styleUrls: ['search-meeting-rooms.component.css']
})
export class SearchMeetingRoomsComponent {
  searchRoom: SearchRoom = new SearchRoom();

  constructor(private router: Router, private data: SearchMeetingRoomsService) { }

  onSubmit(roomForm: NgForm){
    this.data.capacity = roomForm.value.capacity;
    this.data.equipement1 = roomForm.value.equipement1;
    this.data.equipement2 = roomForm.value.equipement2;
    this.router.navigate(['/availableRooms']);
  }
}
