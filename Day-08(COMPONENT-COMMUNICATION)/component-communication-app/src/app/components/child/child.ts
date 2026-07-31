import { Component } from '@angular/core';
import { SharedService } from '../../services/shared';

@Component({
  selector: 'app-child',
  standalone: true,
  imports: [],
  templateUrl: './child.html',
  styleUrl: './child.css'
})
export class ChildComponent {

  constructor(public service: SharedService) {}

}