import { CanDeactivateFn } from '@angular/router';
import { CanComponentDeactivate } from './can-deactivate';

export const deactivateGuard: CanDeactivateFn<CanComponentDeactivate> = (
  component,
  currentRoute,
  currentState,
  nextState
) => {
  return component.canDeactivate();
};
