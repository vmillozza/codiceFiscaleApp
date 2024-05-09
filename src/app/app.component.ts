import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Calcola Codice Fiscale';
  userData = {
    name: '',
    surname: '',
    dob: '',
    gender: '',
    birthplace: ''
  };
  codiceFiscale = '';

  calculateCF() {
    const surname = this.extractLetters(this.userData.surname, 'surname');
    const name = this.extractLetters(this.userData.name, 'name');
    const yearCode = this.userData.dob.substring(2, 4);
    console.log('YearCode=> '+ yearCode);
    const monthCode = this.getMonthCode(this.userData.dob.substring(5, 7));
    console.log('monthCode=> '+ monthCode);
    const dayCode = parseInt(this.userData.dob.substring(8, 10)) + (this.userData.gender.toLowerCase() === 'f' ? 40 : 0);
    console.log('dayCode=> '+ dayCode);
    const placeCode = this.getPlaceCode(this.userData.birthplace);
    console.log('placeCode=> '+ placeCode);

    this.codiceFiscale = `${surname}${name}${yearCode}${monthCode}${dayCode}${placeCode}`;

  }

  extractLetters(data: string, type: 'surname' | 'name'): string {
    let letters = data.toUpperCase().replace(/[^A-Z]/gi, ''); // rimuovere caratteri non alfabetici
    let consonants = letters.replace(/[AEIOU]/g, '');
    let vowels = letters.replace(/[^AEIOU]/g, '');

    if (type === 'surname' || (type === 'name' && consonants.length <= 3)) {
      return (consonants + vowels + 'XXX').substring(0, 3);
    } else {

      return consonants.length > 3 ? (consonants[0] + consonants[2] + consonants[3]) : (consonants + vowels + 'XXX').substring(0, 3);
    }
  }

  getMonthCode(month: string): string {
    const monthCodes = ['A', 'B', 'C', 'D', 'E', 'H', 'L', 'M', 'P', 'R', 'S', 'T'];
    return monthCodes[parseInt(month) - 1];
  }

  getPlaceCode(place: string): string {
    // Questo è un esempio fittizio, dovresti avere un modo per ottenere il codice basato sul luogo
    return 'E472';
  }
}
