import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector:'app-board',
  standalone:true,
  imports:[RouterLink],
  templateUrl:'./board.html',
  styleUrl:'./board.css'
})

export class BoardComponent{

tasks=[

{id:1,title:'Learn Angular Routing'},

{id:2,title:'Build Task Manager'},

{id:3,title:'Deploy Project'}

];

}