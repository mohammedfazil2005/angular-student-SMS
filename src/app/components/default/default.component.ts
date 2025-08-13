import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-default',
  imports: [],
  templateUrl: './default.component.html',
  styleUrl: './default.component.css'
})
export class DefaultComponent {
  ngOnInit(){
    const role=localStorage.getItem("role")
   
  }
  constructor(private router:Router){}
}
