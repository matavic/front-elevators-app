import { EDirection } from '../enums/EDirection.enum';
import { EFloors } from '../enums/EFloors.enum';

export class Elevator {

    public floorsCompleted: number;
    public inService: boolean;
    public currentFloor: EFloors;
    public direction: EDirection = EDirection.Up;

    constructor() {
      this.floorsCompleted = 0;
      this.inService = false;
      this.currentFloor = EFloors.Ground;
    }

    public callElevator(from: EFloors, to: EFloors) {
      console.log('this.currentfloor INIT', this.currentFloor);
      this.inService = true;
      let floors = 0;
      floors = Math.abs(this.currentFloor - from);
      this.currentFloor = from;
      console.log('this.currentfloor FROM', this.currentFloor);
      floors += Math.abs(this.currentFloor - to);
      this.currentFloor = to;
      console.log('this.currentfloor TO', this.currentFloor);
      this.floorsCompleted += floors;
      console.log('this.floorsCompleted', this.floorsCompleted);
      this.inService = false;
    }

    public setDirection(direction: EDirection) {
      this.direction = direction;
    }
  }