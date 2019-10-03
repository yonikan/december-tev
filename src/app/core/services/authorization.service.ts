import { Injectable } from '@angular/core';

export type featureTypes = {
  'feature': boolean;
};

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  public features: featureTypes;
  public isTeamShown;
  public isRoleShown;

  constructor() {}

  public isFeatureEnabled(feautureName: any): boolean {
    // const isT = this.featureToggleService.isFeatureEnabled('feature1');
    return this.features[feautureName];
  }

  public isTeamEnabled(): boolean {
    return this.isTeamShown;
  }

  public isRoleEnabled(): boolean {
    return this.isRoleShown;
  }
}
