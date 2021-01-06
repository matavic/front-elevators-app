import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ElevatorsService } from 'src/app/services/elevators.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public elevatorsAvailable = [3, 4, 5, 6, 7, 8, 9, 10];
  public loader: boolean;
  public showReport = false;
  public wasRunned = false;
  public buttonText = 'Run simulation';
  
  constructor(
    private elevatorsService: ElevatorsService,
    private router: Router,
  ){
    this.elevatorsService.getLoadingObservable().subscribe(state => {
      this.loader = state;
      if (this.loader === false && this.wasRunned) {
        this.showReport = true;
      }
    });
  }

  ngOnInit(): void {
  }

  /**
   * @description Iniciar simulación del paso de las 24 horas del día
   * @returns void
   */
  public run(numberOfElevators): void {
    this.buttonText = 'Running simulation...';
    this.elevatorsService.elevators = [];
    this.elevatorsService.requestsInfo = [];
    this.elevatorsService.createElevators(numberOfElevators);
    this.elevatorsService.runSimulation();
    this.wasRunned = true;
  }

  /**
   * @description Ir a la página de reportes
   * @returns void
   */
  public watchReport(): void {
    this.router.navigate(['/report']);
  }

}
