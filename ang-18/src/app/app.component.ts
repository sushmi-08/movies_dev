import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FormData } from './models/form.model';
import { FormsModule } from '@angular/forms'
import { submitForm } from './store/actions/form.actions';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { selectFormData, selectFormError, selectSubmitting } from './store/actions/selectors/form.selectors';
import { CommonModule } from '@angular/common';

interface AngInterface {
  id: number;
  name: string;
}
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, StoreModule, EffectsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  // angFeatures = signal<AngInterface[]>([
  //   {id: 1, name: 'Signals'},
  //   {id: 2, name: 'Standalone'},
  //   {id: 3, name: 'Directives'},
  //   {id: 4, name: 'Components'},
  //   {id: 5, name: 'ngRx'},
  //   {id: 6, name: 'Routing'},
  //   {id: 7, name: 'Forms'},
  //   {id: 8, name: 'Testing'},
  //   {id: 9, name: 'Bootstrap'},
  //   {id: 10, name: 'HTTPClient'},
  //   {id: 11, name: 'Styling'},
  //   {id: 12, name: 'Node Modules'}  
  // ]);

  // addFeature() {
  //   const newFeature: AngInterface = {
  //     id: this.angFeatures().length + 1, 
  //     name: 'NewFeature'
  //   };

  //   this.angFeatures.set([...this.angFeatures(), newFeature]);
  // }

  // removeFeature(id: number): void {
  //   const updated = this.angFeatures().filter(feature => feature.id != id);
  //   this.angFeatures.set(updated)
  // }

  formData$!: Observable<FormData | null>;
  submitting$!: Observable<boolean>;
  error$!: Observable<string | null>;

  name: string = '';
  email: string = '';

  constructor(private store: Store) { }

  ngOnInit() {
    const res = this.store.dispatch(submitForm());
    this.formData$ = this.store.select(selectFormData);
    this.submitting$ = this.store.select(selectSubmitting);
    this.error$ = this.store.select(selectFormError);
    console.log(this.formData$, 'submit', this.submitting$);

    this.formData$.subscribe(data => console.log('Form Data:', data));

  }

  submitForm() {
    const formData: FormData = { name: this.name, email: this.email };
    console.log(formData, 'formData');
   const res = this.store.dispatch(submitForm());
   console.log(res,'res');
    
    this.formData$.subscribe(data => console.log('Form Data:', data));
  }

}
