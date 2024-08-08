import {CanDeactivateFn} from "@angular/router";

export const ExitGuard: CanDeactivateFn<any> = async (component) => {
  return await component.onExit();
}
