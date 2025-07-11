import { Component } from '@angular/core';
import { CanComponentDeactivate } from '../can-deactivate';

@Component({
  selector: 'app-form',
  imports: [],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent implements CanComponentDeactivate {
  unsavedChanges = true;

  canDeactivate(): boolean {
    return (
      !this.unsavedChanges || confirm('You have unsaved changes. Leave anyway?')
    );
  }
}
