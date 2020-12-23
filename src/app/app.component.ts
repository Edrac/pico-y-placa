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

  isInvalid(ctrlName: string): boolean {
    console.log('evaluating if is invalid', this.form);
    let ctrl = this.form.get(ctrlName);
    return (ctrl.touched || ctrl.dirty) && !ctrl.valid;
  }

  onFormSubmit(): void {
    if (this.form.valid) {

    }
  }
}
