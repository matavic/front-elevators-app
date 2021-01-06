import { Component, OnInit } from '@angular/core';
import { Elevator } from 'src/app/models/elevator.model';
import { ElevatorsService } from 'src/app/services/elevators.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  public elevators: Elevator[];

  constructor(
    private elevatorsService: ElevatorsService
  ) { }

  ngOnInit(): void {
    this.elevators = this.elevatorsService.elevators;
  }

}
