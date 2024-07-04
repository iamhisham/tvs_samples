import { Component } from '@angular/core';
import { CommonServiceService } from '../service/common-service.service';
import { PopoverController } from '@ionic/angular';
import { FlagPopoverComponent } from '../flag-popover/flag-popover.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  updatedFlag: any= {};
  isShowLogin: any = false;
  constructor(public popoverController: PopoverController) { }

  async presentPopover(isShowPopup:boolean) {

    if(isShowPopup) {
      const popover: any = await this.popoverController.create({
        component: FlagPopoverComponent,
        cssClass: "country-popover",
      });
  
      await popover.present();
  
      await popover.onDidDismiss().then((dataReturned: any) => {
        if (dataReturned !== null) {
          this.updatedFlag = dataReturned.data.data;
        }
      });
    }
  }

  proceedToLogin() {
    // this.isShowLogin = true;
  }
}
