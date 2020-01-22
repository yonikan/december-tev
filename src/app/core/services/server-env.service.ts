import { Injectable } from '@angular/core';
import { AppConsts } from '../../../app/app.consts';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServerEnvService {
  private currentServerEnv;

  constructor() { }

  initServerEnv() {
    if (!environment.production) {
      this.currentServerEnv = 'dev';
      return;
    };

    const URL_HOSTNAME = window.location.hostname;
    const SUB_DOMAIN = URL_HOSTNAME.split('.')[0];
    const TOP_LEVEL_DOMAIN = URL_HOSTNAME.split('.')[2];

    if (TOP_LEVEL_DOMAIN.includes('cn')) {
      this.currentServerEnv = 'ch';
    } else {
      if (SUB_DOMAIN.includes('dev')) {
        this.currentServerEnv = 'dev';
      } else if (SUB_DOMAIN.includes('stage')) {
        this.currentServerEnv = 'stage';
      } else if (SUB_DOMAIN.includes('prod')) {
        this.currentServerEnv = 'prod';
      } else {
        this.currentServerEnv = 'dev';
      }
    };
  }

  getUrlVersion(url, v) {
	  return url.replace(`{version}`, v);
  }

  getBaseUrl(serverEnv = 2): string {
    if (this.currentServerEnv === 'dev') {
      return this.getUrlVersion(AppConsts.devBaseUrl, serverEnv)
    } else if (this.currentServerEnv === 'stage') {
		return this.getUrlVersion(AppConsts.stageBaseUrl, serverEnv)
    } else if (this.currentServerEnv === 'prod') {
		return this.getUrlVersion(AppConsts.prodBaseUrl, serverEnv)
	}

	return AppConsts.devBaseUrl2;
  }
}
