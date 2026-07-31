import { Component } from '@angular/core';
import { SharedService } from '../../services/shared';
import { ChildComponent } from '../child/child';

@Component({
  selector: 'app-parent',
  standalone: true,
  imports: [ChildComponent],
  templateUrl: './parent.html',
  styleUrl: './parent.css'
})
export class ParentComponent {

  constructor(public service: SharedService) {}

}