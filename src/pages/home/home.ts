import { Component } from '@angular/core';
import { NavController, Refresher, reorderArray } from 'ionic-angular';

import {ANIMALES} from "../../data/data.animales";
import {Animal} from "../../interfaces/animal.interface";
import { AlertController } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  animales : Animal[] = [];
  //Audio es un elemento del HTML5
  audio = new Audio();
  audioTime : any;
  ordenando:boolean = false;

  constructor(public navCtrl: NavController, private alertCtrl:AlertController) {

    //copia de la lista
    this.animales = ANIMALES.slice(0);
  }


  reproducir(unAnimal:Animal){

    this.pausar_audio(unAnimal);

    if(unAnimal.reproduciendo){
      unAnimal.reproduciendo = false;
      return;

    }
    console.log(unAnimal);

    this.audio.src = unAnimal.audio;
    this.audio.load();
    this.audio.play();
    unAnimal.reproduciendo = true;

    //Es una FN de javascript
    this.audioTime = setTimeout(() => unAnimal.reproduciendo=false,unAnimal.duracion *1000);

  }
  private pausar_audio(animalSel:Animal){

    clearTimeout(this.audioTime);
    this.audio.pause();
    this.audio.currentTime=0;

    for(let animal of this.animales){
      animal.reproduciendo = false;

    }
  }

  borrar_animal(idx:number){
    //splice elimina una posicion en el arreglo
    this.animales.splice(idx,1);
  }

  recargar_animales(refresher:Refresher){

    console.log("inicio del refresh");

    setTimeout( ()=>{

      console.log("fin del refresh");
      this.animales= ANIMALES.slice(0);
      refresher.complete();
    },1500)

  }

  no_implementado(){
    let alert = this.alertCtrl.create({
      title: 'DO not implement.',
      subTitle: 'TODO',
      buttons: ['OK']
    });
    alert.present();
  }


  reordenar_animales(indices:any){
    console.log(indices);
    this.animales= reorderArray(this.animales, indices);

  }

}
