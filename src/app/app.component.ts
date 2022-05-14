import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Payload } from './model/payload.interface';
import { RandomService } from './services/random.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'custom-input-exercise';
  formGroup: FormGroup;
  description: string | undefined;
  descriptionError: string | undefined;
  topWords: { text: string; occurences: number }[] | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private randomService: RandomService
  ) {
    const nonnumericPattern = '[a-zA-Z]+';
    const urlPattern =
      '(http(s)?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
    this.formGroup = this.formBuilder.group({
      sample: ['', Validators.pattern(nonnumericPattern)],
      url: [this.description, Validators.pattern(urlPattern)],
    });
  }

  get sample() {
    return this.formGroup.get('sample');
  }
  get url() {
    return this.formGroup.get('url');
  }

  get count(): number {
    return String(this.sample?.value).length;
  }

  fetchData() {
    const api = this.url?.value;
    this.randomService.fetchData(api).subscribe({
      next: (data: Payload) => {
        this.description = data.description;
        this.descriptionError = undefined;
        // process data
        this.topWords = this.randomService.countWords(data.description);
        console.log(this.topWords);
      },
      error: (error) => {
        this.description = undefined;
        this.topWords = undefined;
        this.descriptionError = error;
      },
    });
  }

  resetFormStatus() {
    this.formGroup.reset(this.formGroup.value);
  }

  onSubmit() {
    if (this.formGroup.valid) {
      this.fetchData();
      console.log('successfully submited');
    }
    // reset submit
    this.formGroup.reset(this.formGroup.value);
  }
}
