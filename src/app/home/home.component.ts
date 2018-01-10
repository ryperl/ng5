import { Component, OnInit } from '@angular/core';
import { trigger, style, transition, keyframes, query, stagger, animate} from '@angular/animations';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
     trigger('goals', [
       transition('* => *', [
         query(':enter', style({ opacity: 0}), {optional: true}), 

         query(':enter', stagger('300ms', [
           animate('.6s ease-in', keyframes([
             style({opacity: 0, transform: 'translateY(-75%)', offset: 0}),
             style({opacity: .5, transform: 'translateY(35px)', offset: .3}),
             style({opacity: 1, transform: 'translateY(0)', offset: 1}),
           ]))]), {optional: true}),

           query(':leave', stagger('300ms', [
            animate('.6s ease-in', keyframes([
              style({opacity: 1, transform: 'translateY(0)', offset: 0}),
              style({opacity: .5, transform: 'translateY(35px)', offset: .3}),
              style({opacity: 0, transform: 'translateY(-75%)', offset: 1}),
            ]))]), {optional: true})
       ])
     ])

  ]
})
export class HomeComponent implements OnInit {

  itemCount: number;
  btnText: string = 'Add an item';
  goalText: string = 'My first life goal';
  goals = [];
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.goal.subscribe(res => this.goals = res);
    this.itemCount = this.goals.length;
    this.dataService.changeGoal(this.goals);
  }

  addItem(): void {
    this.goals.push(this.goalText);
    this.goalText = '';
    this.itemCount = this.goals.length;
    this.dataService.changeGoal(this.goals);
  }

  removeItem(index) {
    this.goals.splice(index, 1);
    this.dataService.changeGoal(this.goals);
    this.itemCount = this.goals.length;
  }
}
