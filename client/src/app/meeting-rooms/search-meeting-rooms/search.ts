export class SearchRoom {
    capacity: number;
    equipement1: boolean;
    equipement2: boolean;

    constructor(capacity:number = 5, equipement1: boolean = false, equipement2: boolean = false){
      this.capacity = capacity;
      this.equipement1 = equipement1;
      this.equipement2 = equipement2;
    }
  }