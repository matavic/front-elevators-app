import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Observable, Subscription } from 'rxjs';
import { finalize, take} from 'rxjs/operators';
import { EFloors } from '../enums/EFloors.enum';
import { Elevator } from '../models/elevator.model';

@Injectable({
  providedIn: 'root'
})
export class ElevatorsService {

  public numberOfElevators: number;
  public elevators: Elevator[] = []; 
  private loadingState$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private subscriptions: Subscription[] = [];
  private readonly minutes = 1000 / 60;
  private readonly fourMinutes = this.minutes * 4;
  private readonly fiveMinutes = this.minutes * 5;
  private readonly sevenMinutes = this.minutes * 7;
  private readonly tenMinutes = this.minutes * 10;
  private readonly twentyMinutes = this.minutes * 20;

  constructor() { }

  public createElevators(n: number) {
    this.numberOfElevators = n;
    for (let index = 0; index < this.numberOfElevators; index++) {
      const elevator = new Elevator();
      this.elevators.push(elevator);
    }
  }

  public runSimulation() {
    this.setLoadingState(true);
    const dayObservable$ = interval(1000);
    const stop = 24;
    const suscription0 = dayObservable$
    .pipe(
      take(stop)
    )  
    .subscribe(x => {
      // arranca a las 09.00 hs simuladas
      if (x === 8) {
        this.request1();
        this.request2();
        this.request3();
      }
      // arranca a las 11.00 hs simuladas
      if (x === 10) {
        this.request4();
      }
      // arranca a las 14.00 hs simuladas
      if (x === 13) {
        this.request5();
      }
      // arranca a las 15.00 hs simuladas
      if (x === 14) {
        this.request6();
        this.request7();
      }
      // arranca a las 18.00 hs simuladas
      if (x === 17) {
        this.request8();
      }
      console.log('ELEVATORS', this.elevators);
    });

    this.subscriptions.push(suscription0);
  }

  public assignElevator(calledFrom: EFloors): Elevator {
    let delta = 4;
    let closerElevator: Elevator = null;
    for (const elevator of this.elevators) {
      if (!elevator.inService) {
        if (Math.abs(elevator.currentFloor - calledFrom) < delta) {
          closerElevator = elevator;
          delta = Math.abs(elevator.currentFloor - calledFrom);
          if(delta === 0) {
            return closerElevator;
          }
        }
      }
    }
    return closerElevator;
  }

  public getElevator(calledFrom: EFloors, directTo: EFloors): void {
    const elevator = this.assignElevator(calledFrom);
    if (elevator) {
      elevator.callElevator(calledFrom, directTo);
    } else {
      console.log('There are no elevators available');
    }
  }

  private request1() {
    // de 09:00 a 11:00 cada 5 minutos se debe ejecutar (120 minutos / 5 minutos) + 1 veces
    const times = ((60 * 2) / 5) + 1;
    const calledFrom = EFloors.Ground;
    const directTo = EFloors.Second;
    const fiveMinutesObservable$ = interval(this.fiveMinutes);
    const suscription1 = fiveMinutesObservable$
      .pipe(
        take(times)
      )  
      .subscribe(x => {
        this.getElevator(calledFrom, directTo);
    });
    this.subscriptions.push(suscription1);
  }

  private request2() {
    // de 09:00 a 11:00 cada 5 minutos se debe ejecutar (120 minutos / 5 minutos) + 1 veces
    const times = ((60 * 2) / 5) + 1;
    const calledFrom = EFloors.Ground;
    const directTo = EFloors.Third;
    const fiveMinutesObservable$ = interval(this.fiveMinutes);
    const suscription2 = fiveMinutesObservable$
      .pipe(
        take(times)
      )  
      .subscribe(x => {
        this.getElevator(calledFrom, directTo);
    });
    this.subscriptions.push(suscription2);
  }

  private request3() {
    // de 09:00 a 10:00 cada 10 minutos se debe ejecutar (60 minutos / 10 minutos) + 1 veces
    const times = (60 / 10) + 1;
    const calledFrom = EFloors.Ground;
    const directTo = EFloors.First;
    const tenMinutesObservable$ = interval(this.tenMinutes);
    const suscription3 = tenMinutesObservable$
      .pipe(
        take(times)
      )  
      .subscribe(x => {
        this.getElevator(calledFrom, directTo);
    });
    this.subscriptions.push(suscription3);
  }

  private request4() {
    // de 11:00 a 18:20 se debe ejecutar (60  * 8 minutos / 20 minutos) + 2 veces
    const times = ((60 * 8) / 20) + 2;
    const calledFrom = EFloors.Ground;
    const directTo = [EFloors.First, EFloors.Second, EFloors.Third];
    const twentyMinutesObservable$ = interval(this.twentyMinutes);
    const suscription4 = twentyMinutesObservable$
      .pipe(
        take(times)
      )  
      .subscribe(x => {
        this.getElevator(calledFrom, directTo[0]);
        this.getElevator(calledFrom, directTo[1]);
        this.getElevator(calledFrom, directTo[2]);
    });
    this.subscriptions.push(suscription4);
  }

  private request5() {
    // de 14:00 a 15:00 se debe ejecutar (60  minutos / 4 minutos) + 1 veces
    const times = (60 / 4) + 1;
    const calledFrom = [EFloors.First, EFloors.Second, EFloors.Third];
    const directTo = EFloors.Ground;
    const fourMinutesObservable$ = interval(this.fourMinutes);
    const suscription5 = fourMinutesObservable$
      .pipe(
        take(times)
      )  
      .subscribe(x => {
        this.getElevator(calledFrom[0], directTo);
        this.getElevator(calledFrom[1], directTo);
        this.getElevator(calledFrom[2], directTo);
    });
    this.subscriptions.push(suscription5);
  }

  private request6() {
    // de 15:00 a 16:00 se debe ejecutar (60  minutos / 7 minutos) + 1 veces
    const times = (60 / 7) + 1;
    const calledFrom = [EFloors.Second, EFloors.Third];
    const directTo = EFloors.Ground;
    const sevenMinutesObservable$ = interval(this.sevenMinutes);
    const suscription6 = sevenMinutesObservable$
      .pipe(
        take(times)
      )  
      .subscribe(x => {
        this.getElevator(calledFrom[0], directTo);
        this.getElevator(calledFrom[1], directTo);
    });
    this.subscriptions.push(suscription6);
  }

  private request7() {
    // de 15:00 a 16:00 se debe ejecutar (60  minutos / 7 minutos) + 1 veces
    const times = (60 / 7) + 1;
    const calledFrom = EFloors.Ground;
    const directTo = [EFloors.First, EFloors.Third];
    const sevenMinutesObservable$ = interval(this.sevenMinutes);
    const suscription7 = sevenMinutesObservable$
      .pipe(
        take(times)
      )  
      .subscribe(x => {
        this.getElevator(calledFrom, directTo[0]);
        this.getElevator(calledFrom, directTo[1]);
    });
    this.subscriptions.push(suscription7);
  }

  private request8() {
    // de 18:00 a 20:00 se debe ejecutar (60 * 2 minutos / 3 minutos) + 1 veces
    const times = ((60 * 2) / 3) + 1;
    const calledFrom = [EFloors.First, EFloors.Second, EFloors.Third];
    const directTo = EFloors.Ground;
    const sevenMinutesObservable$ = interval(this.sevenMinutes);
    const suscription8 = sevenMinutesObservable$
      .pipe(
        take(times),
        finalize(() => {
          this.setLoadingState(false);
        })
      )  
      .subscribe(x => {
        this.getElevator(calledFrom[0], directTo);
        this.getElevator(calledFrom[1], directTo);
        this.getElevator(calledFrom[2], directTo);
    });
    this.subscriptions.push(suscription8);
  }

  /**
   * @description Establecer el estado del proceso de simulación
   * @param state boolean
   * @returns void
   */
  public setLoadingState(state: boolean): void {
    this.loadingState$.next(state);
  }

  /**
   * @description Retorna un observable con el estado del proceso de simulación
   * @returns Observable<boolean>
   */
  public getLoadingObservable(): Observable<boolean> {
    return this.loadingState$.asObservable();
  }

  /**
   * @description Obtener el estado del proceso de simulación
   * @returns Boolean
   */
  public getLoadingState(): boolean {
    return this.loadingState$.value;
  }
}
