import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-count-cards',
  templateUrl: './student-count-cards.component.html',
  styleUrls: ['./student-count-cards.component.scss']
})
export class StudentCountCardsComponent implements OnInit {
  @Input() studentsCount = [];
  @Input() totalCount: any;
  progressBarWith: any[] = [];
  constructor() {
  }

  claculateProgressBarWidth(): void {
    const firstYearPercentage = (this.studentsCount[0] * 100) / this.totalCount;
    const secondYearPercentage = (this.studentsCount[1] * 100) / this.totalCount;
    const thirdYearPercentage = (this.studentsCount[2] * 100) / this.totalCount;
    const fourthYearPercentage = (this.studentsCount[3] * 100) / this.totalCount;
    this.progressBarWith.push(firstYearPercentage, secondYearPercentage, thirdYearPercentage, fourthYearPercentage);
  }

  ngOnInit(): void {
    this.claculateProgressBarWidth()
  }

}
