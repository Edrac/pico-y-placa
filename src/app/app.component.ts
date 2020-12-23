import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

// Validators implemented here since they won't be used anywhere else

/**
 * @description Validator for the ecuadorian license plates
 * @author Edison A.
 * @param {FormControl} control
 * @return {*}  {({ [key: string]: any } | null)}
 */
function licenseValidator(control: FormControl): { [key: string]: any } | null {
  let licensePattern = /^[a-z]{3,4}-[0-9]{3,4}$/gi;

  if (!control.value.match(licensePattern))
    return { 'licenseValidator': true };

  return null;
}

/**
 * @description Validator for the date 'day/month/year', since the requirement is for this field to be of type text instead of type date
 * @author Edison A.
 * @param {FormControl} control
 * @return {*}  {({ [key: string]: any } | null)}
 */
function dateValidator(control: FormControl): { [key: string]: any } | null {
  let datePattern = /^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/g;

  if (!control.value.match(datePattern))
    return { 'dateValidator': true };

  return null;
}

/**
 * @description Validator for time in 24H
 * @author Edison A.
 * @param {FormControl} control
 * @return {*}  {({ [key: string]: any } | null)}
 */
function timeValidator(control: FormControl): { [key: string]: any } | null {
  let timePattern = /^(0?[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

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
  list: LicenseData[];

  ngOnInit() {
    this.list = [];
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

  /**
   * @description Used to check if the fields have met the requirements
   * @author Edison A.
   * @param {string} ctrlName Name of the controller in the form that we wish to check
   * @return {*}  {boolean} True, if the value is invalid
   * @memberof AppComponent
   */
  isInvalid(ctrlName: string): boolean {
    let ctrl = this.form.get(ctrlName);
    return (ctrl.touched || ctrl.dirty) && !ctrl.valid;
  }
/**
 * @description Gather the data and add it to the list
 * @author Edison A.
 * @memberof AppComponent
 */
onFormSubmit(): void {
    if (this.form.valid) {
      let item: LicenseData = new LicenseData(
        this.form.controls.license.value,
        this.form.controls.date.value,
        this.form.controls.time.value
      );

      this.list.unshift(item);
    }
  }
}
class LicenseData {
  canCirculate: boolean;
  license: string;
  date: string;
  time: string;
/**
 * Creates an instance of LicenseData.
 * @author Edison A.
 * @param {string} license
 * @param {string} date
 * @param {string} time
 * @memberof LicenseData
 */
constructor(license: string, date: string, time: string) {
    this.license = license;
    this.date = date;
    this.time = time;
    this.setCanCirculate();
  }
/**
 * @description Checks if the current LicenseData item can circulate with the given parameters
 * @author Edison A.
 * @memberof LicenseData
 */
setCanCirculate() {
    /*
    Rules:
    taken from http://www.amt.gob.ec/index.php/servicios/hoy-no-circula.html

    Time: from 5:00 to 20:00
    0: Sund: any
    1: Mond: 1 & 2
    2: Tues: 3 & 4
    3: Wedn: 5 & 6
    4: Thur: 7 & 8
    5: Frid: 9 & 0
    6: Satu: any
    */

    let dateParts = this.date.split('/');
    let day = dateParts[0];
    let month = dateParts[1];
    let year = dateParts[2];

    let weekDay = (new Date(`${month}/${day}/${year}`)).getDay();

    let lastDigit = parseInt(this.license.charAt(this.license.length - 1));

    let timeInt = parseInt(this.time.split(':').join(''));

    this.canCirculate = false;
    if (
      (weekDay === 0 || weekDay === 6 || timeInt < 500 || timeInt > 2000) ||
      (weekDay === 1 && (lastDigit === 1 || lastDigit === 2)) ||
      (weekDay === 2 && (lastDigit === 3 || lastDigit === 4)) ||
      (weekDay === 3 && (lastDigit === 5 || lastDigit === 6)) ||
      (weekDay === 4 && (lastDigit === 7 || lastDigit === 8)) ||
      (weekDay === 5 && (lastDigit === 9 || lastDigit === 0))
    ) {
      this.canCirculate = true;
    }
  }
}
