import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'pico-y-placa';
  form: FormGroup;

  ngOnInit() {
    this.form = new FormGroup({
      license: new FormControl(
        '',
        [Validators.required]
      ),
      date: new FormControl(
        '',
        [Validators.required]
      ),
      time: new FormControl(
        '',
        [Validators.required]
      )
    });
  }

  onFormSubmit(): void {
  }
}
