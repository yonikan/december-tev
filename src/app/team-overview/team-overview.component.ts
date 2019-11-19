import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { TeamPickerService } from '../core/services/team-picker.service';
import { AuthorizationService } from '../core/services/authorization.service';

@Component({
  selector: 'app-team-overview',
  templateUrl: './team-overview.component.html',
  styleUrls: ['./team-overview.component.scss']
})
export class TeamOverviewComponent implements OnInit, OnDestroy {
  pageName = 'team overview';
  private currentTeamUpdateSub: Subscription;
  isLoading = true;
  isLoadRiskFeatureEnabled = false;
  isPerformanceOvertimeFeatureEnabled = false;
  isLeaderBoardFeatureEnabled = false;

  constructor(
    public teamPickerService: TeamPickerService,
    private authorizationService: AuthorizationService
  ) {}

  ngOnInit() {

    // if (this.authorizationService.isFeatureEnabled('loadRisk')) {
    //   this.isLoadRiskFeatureEnabled = true;
    // } else {
    //   this.isLoadRiskFeatureEnabled = false;
    // }

    this.isLoadRiskFeatureEnabled = this.authorizationService.isFeatureEnabled('loadRisk') ? true : false;
    // this.isLoadRiskFeatureEnabled = true;
    this.isPerformanceOvertimeFeatureEnabled = this.authorizationService.isFeatureEnabled('performanceOvertime') ? true : false;
    // this.isPerformanceOvertimeFeatureEnabled = true;
    this.isLeaderBoardFeatureEnabled = this.authorizationService.isFeatureEnabled('leaderBoard') ? true : false;
    // this.isLeaderBoardFeatureEnabled = true;

    this.isLoading = true;

    this.currentTeamUpdateSub = this.teamPickerService
      .getCurrentTeamUpdateListener()
      .subscribe(currentTeam => {
        // console.log('TEAM OVERVIEW - currentTeam: ', currentTeam);
        this.isLoading = false;
      });
  }

  ngOnDestroy(){
    this.currentTeamUpdateSub.unsubscribe();
  }
}
