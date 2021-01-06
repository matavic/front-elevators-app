import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IRequests } from 'src/app/interfaces/IRequests.interface';
import { Elevator } from 'src/app/models/elevator.model';
import { ElevatorsService } from 'src/app/services/elevators.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  public elevators: Elevator[] = [];
  public requestsData: IRequests[] = [];
  public totalCompletedFloors = 0;

  constructor(
    private elevatorsService: ElevatorsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.elevators = this.elevatorsService.elevators;
    this.requestsData = this.elevatorsService.requestsInfo.sort((a, b) => a.index - b.index);
    this.elevators.forEach((elevator) => {
      this.totalCompletedFloors += elevator.floorsCompleted;
    })
  }

  /**
   * @description Regresar al Home
   * @returns void
   */
  goBack() {
    this.router.navigate(['/']);
  }

}
