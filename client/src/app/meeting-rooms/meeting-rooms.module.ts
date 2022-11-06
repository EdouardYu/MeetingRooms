import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvailableMeetingRoomsComponent } from './available-meeting-rooms/available-meeting-rooms.component';
import { SearchMeetingRoomsComponent } from './search-meeting-rooms/search-meeting-rooms.component';
import { UnavailableMeetingRoomsComponent } from './unavailable-meeting-rooms/unavailable-meeting-rooms.component';
import { RouterModule, Routes } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { SearchMeetingRoomsService } from './search-meeting-rooms/search-meeting-rooms.service';

const meettingRoomsRoutes: Routes = [

  { path: 'searchAvailableRooms', component: SearchMeetingRoomsComponent},
  { path : 'availableRooms', component: AvailableMeetingRoomsComponent },
  { path : 'unavailableRooms', component: UnavailableMeetingRoomsComponent },
];

@NgModule({
  declarations: [
    SearchMeetingRoomsComponent,
    AvailableMeetingRoomsComponent,
    UnavailableMeetingRoomsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(meettingRoomsRoutes)
  ],
  providers: [SearchMeetingRoomsService]
})
export class MeetingRoomsModule { }
