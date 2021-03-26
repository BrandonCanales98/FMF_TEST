import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-instrucciones',
  templateUrl: './instrucciones.component.html',
  styleUrls: ['./instrucciones.component.css']
})
export class InstruccionesComponent implements OnInit {

  constructor(private router: Router) {

  }

  ngOnInit(): void {
  }
  goToExam(){
    this.router.navigate(['pasos']);
  }
}
