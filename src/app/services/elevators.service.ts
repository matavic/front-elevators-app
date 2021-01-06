import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Observable, Subscription } from 'rxjs';
import { finalize, take} from 'rxjs/operators';
import { EFloors } from '../enums/EFloors.enum';
import { IRequests } from '../interfaces/IRequests.interface';
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
  public requestsInfo: IRequests[] = [];

  constructor() { }

  /**
   * @description Crear los elevadores de acuerdo a la cantidad ingresada por el usuario
   * @param n number
   * @returns void
   */
  public createElevators(n: number): void {
    this.numberOfElevators = n;
    for (let index = 0; index < this.numberOfElevators; index++) {
      const elevator = new Elevator(index);
      this.elevators.push(elevator);
    }
  }

  /**
   * @description Iniciar simulación
   * @returns void
   */
  public runSimulation(): void {
    this.setLoadingState(true);
    const dayObservable$ = interval(1000);
    const times = 24;
    const suscription0 = dayObservable$
    .pipe(
      take(times),
      finalize(() => {
        this.subscriptions.forEach((subscription) => {
          subscription.unsubscribe();
        })
        this.setLoadingState(false);
      })
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
      console.log(`Hora: ${x}`);
    });
    this.subscriptions.push(suscription0);
  }

  /**
   * @description Asignar el elevador de acuerdo a su posición más cercana al piso desde donde fue llamado
   * @param calledFrom {EFloors} piso desde donde ha sido llamado
   * @returns Elevator
   */
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

  /**
   * @description Obtener el elevador asignado y retornar los pisos recorridos por él
   * @param calledFrom {EFloors} piso desde donde ha sido llamado
   * @param direcTo {EFloors} piso hacia donde se dirige
   * @returns number
   */
  public getElevator(calledFrom: EFloors, directTo: EFloors): number {
    let floors = 0;
    const elevator = this.assignElevator(calledFrom);
    if (elevator) {
      floors = elevator.callElevator(calledFrom, directTo);
    } else {
      console.log('There are no elevators available');
    }
    return floors;
  }

  /**
   * @description Set # 1 de Requests de acuerdo al documento donde se enuncia la prueba
   * @returns void
   */
  private request1(): void {
    // de 09:00 a 11:00 cada 5 minutos se debe ejecutar (120 minutos / 5 minutos) + 1 veces
    const times = ((60 * 2) / 5) + 1;
    const calledFrom = EFloors.Ground;
    const directTo = EFloors.Second;
    let dataForThisRequest: any = {};
    dataForThisRequest.index = 0;
    dataForThisRequest.completedFloors = 0;
    dataForThisRequest.currentFloors = [];
    const fiveMinutesObservable$ = interval(this.fiveMinutes);
    const suscription1 = fiveMinutesObservable$
      .pipe(
        take(times),
        finalize(() => {
          this.elevators.forEach((elevator) => {
            dataForThisRequest.currentFloors.push(elevator.currentFloor);
          });
          this.requestsInfo.push(dataForThisRequest);
        })
      )  
      .subscribe(x => {
        dataForThisRequest.completedFloors += this.getElevator(calledFrom, directTo);
    });
    this.subscriptions.push(suscription1);
  }

  /**
   * @description Set # 2 de Requests de acuerdo al documento donde se enuncia la prueba
   * @returns void
   */
  private request2(): void {
    // de 09:00 a 11:00 cada 5 minutos se debe ejecutar (120 minutos / 5 minutos) + 1 veces
    const times = ((60 * 2) / 5) + 1;
    const calledFrom = EFloors.Ground;
    const directTo = EFloors.Third;
    let dataForThisRequest: any = {};
    dataForThisRequest.index = 1;
    dataForThisRequest.completedFloors = 0;
    dataForThisRequest.currentFloors = [];
    const fiveMinutesObservable$ = interval(this.fiveMinutes);
    const suscription2 = fiveMinutesObservable$
      .pipe(
        take(times),
        finalize(() => {
          this.elevators.forEach((elevator) => {
            dataForThisRequest.currentFloors.push(elevator.currentFloor);
          });
          this.requestsInfo.push(dataForThisRequest);
        })
      )  
      .subscribe(x => {
        dataForThisRequest.completedFloors += this.getElevator(calledFrom, directTo);
    });
    this.subscriptions.push(suscription2);
  }

  /**
   * @description Set # 3 de Requests de acuerdo al documento donde se enuncia la prueba
   * @returns void
   */
  private request3(): void {
    // de 09:00 a 10:00 cada 10 minutos se debe ejecutar (60 minutos / 10 minutos) + 1 veces
    const times = (60 / 10) + 1;
    const calledFrom = EFloors.Ground;
    const directTo = EFloors.First;
    let dataForThisRequest: any = {};
    dataForThisRequest.index = 2;
    dataForThisRequest.completedFloors = 0;
    dataForThisRequest.currentFloors = [];
    const tenMinutesObservable$ = interval(this.tenMinutes);
    const suscription3 = tenMinutesObservable$
      .pipe(
        take(times),
        finalize(() => {
          this.elevators.forEach((elevator) => {
            dataForThisRequest.currentFloors.push(elevator.currentFloor);
          });
          this.requestsInfo.push(dataForThisRequest);
        })
      )  
      .subscribe(x => {
        dataForThisRequest.completedFloors += this.getElevator(calledFrom, directTo);
    });
    this.subscriptions.push(suscription3);
  }

  /**
   * @description Set # 4 de Requests de acuerdo al documento donde se enuncia la prueba
   * @returns void
   */
  private request4(): void {
    // de 11:00 a 18:20 cada 20 minutos se debe ejecutar (60  * 8 minutos / 20 minutos) + 2 veces
    const times = ((60 * 8) / 20) + 2;
    const calledFrom = EFloors.Ground;
    const directTo = [EFloors.First, EFloors.Second, EFloors.Third];
    let dataForThisRequest: any = {};
    dataForThisRequest.index = 3;
    dataForThisRequest.completedFloors = 0;
    dataForThisRequest.currentFloors = [];
    const twentyMinutesObservable$ = interval(this.twentyMinutes);
    const suscription4 = twentyMinutesObservable$
      .pipe(
        take(times),
        finalize(() => {
          this.elevators.forEach((elevator) => {
            dataForThisRequest.currentFloors.push(elevator.currentFloor);
          });
          this.requestsInfo.push(dataForThisRequest);
        })
      )  
      .subscribe(x => {
        dataForThisRequest.completedFloors += this.getElevator(calledFrom, directTo[0]);
        dataForThisRequest.completedFloors += this.getElevator(calledFrom, directTo[1]);
        dataForThisRequest.completedFloors += this.getElevator(calledFrom, directTo[2]);
    });
    this.subscriptions.push(suscription4);
  }

  /**
   * @description Set # 5 de Requests de acuerdo al documento donde se enuncia la prueba
   * @returns void
   */
  private request5(): void {
    // de 14:00 a 15:00 cada 4 minutos se debe ejecutar (60  minutos / 4 minutos) + 1 veces
    const times = (60 / 4) + 1;
    const calledFrom = [EFloors.First, EFloors.Second, EFloors.Third];
    const directTo = EFloors.Ground;
    let dataForThisRequest: any = {};
    dataForThisRequest.index = 4;
    dataForThisRequest.completedFloors = 0;
    dataForThisRequest.currentFloors = [];
    const fourMinutesObservable$ = interval(this.fourMinutes);
    const suscription5 = fourMinutesObservable$
      .pipe(
        take(times),
        finalize(() => {
          this.elevators.forEach((elevator) => {
            dataForThisRequest.currentFloors.push(elevator.currentFloor);
          });
          this.requestsInfo.push(dataForThisRequest);
        })
      )  
      .subscribe(x => {
        dataForThisRequest.completedFloors += this.getElevator(calledFrom[0], directTo);
        dataForThisRequest.completedFloors += this.getElevator(calledFrom[1], directTo);
        dataForThisRequest.completedFloors += this.getElevator(calledFrom[2], directTo);
    });
    this.subscriptions.push(suscription5);
  }

  /**
   * @description Set # 6 de Requests de acuerdo al documento donde se enuncia la prueba
   * @returns void
   */
  private request6(): void {
    // de 15:00 a 16:00 cada 7 minutos se debe ejecutar (60  minutos / 7 minutos) + 1 veces
    const times = (60 / 7) + 1;
    const calledFrom = [EFloors.Second, EFloors.Third];
    const directTo = EFloors.Ground;
    let dataForThisRequest: any = {};
    dataForThisRequest.index = 5;
    dataForThisRequest.completedFloors = 0;
    dataForThisRequest.currentFloors = [];
    const sevenMinutesObservable$ = interval(this.sevenMinutes);
    const suscription6 = sevenMinutesObservable$
      .pipe(
        take(times),
        finalize(() => {
          this.elevators.forEach((elevator) => {
            dataForThisRequest.currentFloors.push(elevator.currentFloor);
          });
          this.requestsInfo.push(dataForThisRequest);
        })
      )  
      .subscribe(x => {
        dataForThisRequest.completedFloors += this.getElevator(calledFrom[0], directTo);
        dataForThisRequest.completedFloors += this.getElevator(calledFrom[1], directTo);
    });
    this.subscriptions.push(suscription6);
  }

  /**
   * @description Set # 7 de Requests de acuerdo al documento donde se enuncia la prueba
   * @returns void
   */
  private request7(): void {
    // de 15:00 a 16:00 cada 7 minutos se debe ejecutar (60  minutos / 7 minutos) + 1 veces
    const times = (60 / 7) + 1;
    const calledFrom = EFloors.Ground;
    const directTo = [EFloors.First, EFloors.Third];
    let dataForThisRequest: any = {};
    dataForThisRequest.index = 6;
    dataForThisRequest.completedFloors = 0;
    dataForThisRequest.currentFloors = [];
    const sevenMinutesObservable$ = interval(this.sevenMinutes);
    const suscription7 = sevenMinutesObservable$
      .pipe(
        take(times),
        finalize(() => {
          this.elevators.forEach((elevator) => {
            dataForThisRequest.currentFloors.push(elevator.currentFloor);
          });
          this.requestsInfo.push(dataForThisRequest);
        })
      )  
      .subscribe(x => {
        dataForThisRequest.completedFloors += this.getElevator(calledFrom, directTo[0]);
        dataForThisRequest.completedFloors += this.getElevator(calledFrom, directTo[1]);
    });
    this.subscriptions.push(suscription7);
  }

  /**
   * @description Set # 8 de Requests de acuerdo al documento donde se enuncia la prueba
   * @returns void
   */
  private request8(): void {
    // de 18:00 a 20:00 cada 3 minutos se debe ejecutar (60 * 2 minutos / 3 minutos) + 1 veces
    const times = ((60 * 2) / 3) + 1;
    const calledFrom = [EFloors.First, EFloors.Second, EFloors.Third];
    const directTo = EFloors.Ground;
    let dataForThisRequest: any = {};
    dataForThisRequest.index = 7;
    dataForThisRequest.completedFloors = 0;
    dataForThisRequest.currentFloors = [];
    const sevenMinutesObservable$ = interval(this.sevenMinutes);
    const suscription8 = sevenMinutesObservable$
      .pipe(
        take(times),
        finalize(() => {
          this.elevators.forEach((elevator) => {
            dataForThisRequest.currentFloors.push(elevator.currentFloor);
          });
          this.requestsInfo.push(dataForThisRequest);
        })
      )  
      .subscribe(x => {
        dataForThisRequest.completedFloors += this.getElevator(calledFrom[0], directTo);
        dataForThisRequest.completedFloors += this.getElevator(calledFrom[1], directTo);
        dataForThisRequest.completedFloors += this.getElevator(calledFrom[2], directTo);
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
