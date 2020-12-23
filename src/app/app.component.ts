import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

function licenseValidator(control: FormControl): { [key: string]: any } | null {
  let licensePattern = /^[a-z]{3,4}-[0-9]{3,4}$/gi;

  if (!control.value.match(licensePattern))
    return { 'licenseValidator': true };

  return null;
}

function dateValidator(control: FormControl): { [key: string]: any } | null {
  let datePattern = /^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/g;

  if (!control.value.match(datePattern))
    return { 'dateValidator': true };

  return null;
}

function timeValidator(control: FormControl): { [key: string]: any } | null {
  let timePattern = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

  if (!control.value.match(timePattern))
    return { 'timeValidator': true };

  return null;
}

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
        [Validators.required, licenseValidator]
      ),
      date: new FormControl(
        '',
        [Validators.required, dateValidator]
      ),
      time: new FormControl(
        '',
        [Validators.required, timeValidator]
      )
    });
  }

  isInvalid(ctrlName: string): boolean {
    let ctrl = this.form.get(ctrlName);
    return (ctrl.touched || ctrl.dirty) && !ctrl.valid;
  }

  onFormSubmit(): void {
    if (this.form.valid) {

    }
  }
}
