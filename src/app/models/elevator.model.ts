import { EDirection } from '../enums/EDirection.enum';
import { EFloors } from '../enums/EFloors.enum';

export class Elevator {

    public floorsCompleted: number;
    public inService: boolean;
    public currentFloor: EFloors;
    public direction: EDirection = EDirection.Up;
    public index: number

    /**
     * @description Se inicializa el Elevador con sus propiedades por defecto
     */
    constructor(index: number) {
      this.floorsCompleted = 0;
      this.inService = false;
      this.currentFloor = EFloors.Ground;
      this.index = index;
    }

    /**
     * @description Llamar al elevador y realizar el movimiento deseado
     * @returns number
     */
    public callElevator(from: EFloors, to: EFloors): number {
      this.inService = true;
      let floors = 0;
      floors = Math.abs(this.currentFloor - from);
      this.currentFloor = from;
      floors += Math.abs(this.currentFloor - to);
      this.currentFloor = to;
      this.floorsCompleted += floors;
      this.inService = false;
      return floors;
    }

    /**
     * @description Establecer la dirección
     * @returns void
     */
    public setDirection(direction: EDirection): void {
      this.direction = direction;
    }
}