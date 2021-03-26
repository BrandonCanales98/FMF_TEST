import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { of } from 'rxjs';
import { NgWizardConfig, NgWizardService, StepChangedArgs, StepValidationArgs, STEP_STATE, THEME } from 'ng-wizard';
import { NgModule } from '@angular/core';
import { Genero } from '../../models/genero';
import { Club } from '../../models/club';
import { Nacionalidad } from '../../models/nacionalidad';
import { generos } from '../../data/generos';
import { clubes } from '../../data/clubes';
import { nacionalidades } from '../../data/nacionalidades';
import { Jugador } from 'src/app/models/jugador';
import { jsPDF } from 'jspdf';




const ngWizardConfig: NgWizardConfig = {
  theme: THEME.circles
};

export class AppModule { }

@Component({
  selector: 'app-pasos',
  templateUrl: './pasos.component.html',
  styleUrls: ['./pasos.component.css']
})
export class PasosComponent implements OnInit {
  generoArray: Genero[] = generos;
  clubArray: Club[] = clubes;
  nacionalidadArray: Nacionalidad[] = nacionalidades;
  jugadorArray: Jugador[] = [];

  newJugador: Jugador = new Jugador();

  @ViewChild('ficha', { static: false }) el!: ElementRef;


  stepStates = {
    normal: STEP_STATE.normal,
    disabled: STEP_STATE.disabled,
    error: STEP_STATE.error,
    hidden: STEP_STATE.hidden
  };
  config: NgWizardConfig = {
    lang: { next: 'Siguiente', previous: 'Anterior' },
    selected: 0,
    theme: THEME.circles,
    toolbarSettings: {
      showNextButton:false,
      showPreviousButton:false

    }
  };



  constructor(private ngWizardService: NgWizardService) {
  }

  ngOnInit(): void {

  }
  addJugador(club, nacionalidad, genero) {
    this.jugadorArray.push(this.newJugador);
    this.showNextStep();
    this.loadInfoClub(club, nacionalidad, genero);
    this.config.toolbarSettings.showNextButton = true;


  }
  validaEdad(fecha) {
    const fechaSeleccionada = new Date(fecha);



    function isDate18orMoreYearsOld(day, month, year) {
      return new Date(year + 18, month - 1, day) <= new Date();
    }


    if (isDate18orMoreYearsOld(fechaSeleccionada.getDay(), fechaSeleccionada.getMonth(), fechaSeleccionada.getFullYear())) {
      document.getElementById("divRfc").removeAttribute("hidden");
      document.getElementById("rfc").setAttribute("required", "true")
    } else {
      document.getElementById("divRfc").setAttribute("hidden", "true");
      document.getElementById("rfc").removeAttribute("required")
    }


  }

  loadInfoClub(club: number, nacionalidad: number, genero: number) {

    var clu = this.clubArray.find(x => x.id == club);
    var nac = this.nacionalidadArray.find(x => x.id == nacionalidad);
    var gen = this.generoArray.find(x => x.id == genero);

    document.getElementById("logo_club").setAttribute("src", clu.logo)
    document.getElementById("club_text").innerHTML = clu.nombre
    document.getElementById("genero_text").innerHTML = gen.nombre;

    document.getElementById("nacionalidad_text").innerHTML = nac.nombre;



  }

  generaPdf() {
    var id = document.getElementById("ficha");

    var pdf = new jsPDF('p', 'pt', 'a4');
    
    
    pdf.html(this.el.nativeElement, {
      callback: (pdf) => {
        
        pdf.save("ficha.pdf");
      }
    });


  }


  showPreviousStep(event?: Event) {
    this.ngWizardService.previous();
  }

  showNextStep(event?: Event) {
    this.ngWizardService.next();
  }

  resetWizard(event?: Event) {
    this.ngWizardService.reset();
  }

  setTheme(theme: THEME) {
    this.ngWizardService.theme(theme);
  }

  stepChanged(args: StepChangedArgs) {
    console.log(args.step);
  }

  isValidTypeBoolean: boolean = true;

  isValidFunctionReturnsBoolean(args: StepValidationArgs) {
    return true;
  }

  isValidFunctionReturnsObservable(args: StepValidationArgs) {
    return of(true);
  }
}


