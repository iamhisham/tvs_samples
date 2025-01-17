import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from '../service/common-service.service';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-flag-popover',
  templateUrl: './flag-popover.component.html',
  styleUrls: ['./flag-popover.component.scss'],
})
export class FlagPopoverComponent implements OnInit {

  // TODO after get api delete the JSON
  response = [
    {
      "_id": { "$oid": "667d30a7e510cf75f2ac2888" },
      "region_name": "Asia",
      "country_name": "Bangladesh",
      "flag_url": "https://tvsmemsiddevdiag.blob.core.windows.net/images/bangladesh-flag.png",
      "app_url": "https://bd.tvsaccelerator.com",
      "created_at": "2024-06-25T09:15:20Z",
      "modified_at": "2024-06-25T09:15:20Z",
      "is_active": true
    },
    {
      "_id": { "$oid": "667d30a7e510cf75f2ac2888" },
      "region_name": "Asia",
      "country_name": "India",
      "flag_url": "https://tvsmemsiddevdiag.blob.core.windows.net/images/bangladesh-flag.png",
      "app_url": "https://bd.tvsaccelerator.com",
      "created_at": "2024-06-25T09:15:20Z",
      "modified_at": "2024-06-25T09:15:20Z",
      "is_active": true
    },
    {
      "_id": { "$oid": "667d30a7e510cf75f2ac2888" },
      "region_name": "Latin America",
      "country_name": "America",
      "flag_url": "https://tvsmemsiddevdiag.blob.core.windows.net/images/bangladesh-flag.png",
      "app_url": "https://bd.tvsaccelerator.com",
      "created_at": "2024-06-25T09:15:20Z",
      "modified_at": "2024-06-25T09:15:20Z",
      "is_active": true
    }
  ];

  flag: any = [];
  filteredFlag: any[] = [];
  selectedCountryFlag: any = {};
  searchCountry = "";

  constructor(private flagService: CommonServiceService, private popoverController: PopoverController) { }

  ngOnInit() {
    this.getExistingCountryAPI()
  }

  getExistingCountryAPI() {
    //TODO : POST subcribe()
    //import api AFTER The response send tp arguments => this.formatResponse(this.response);    
    this.formatResponse(this.response);
  }

  formatResponse(response: any) {  //Like : [{label:"Asia"; list [ Bengalesh, Inida ]}, {label:"Latin America"; list [ Mexico ] } ]
    const regions: any = {};
    response.forEach((data: any) => {
      if (!regions[data.region_name]) {
        regions[data.region_name] = [];
      }
      regions[data.region_name].push({
        list: data.country_name,
        flag: data.flag_url
      });
    });

    this.flag = Object.keys(regions).map(region => ({
      label: region,
      list: regions[region]
    }));

    console.log(this.flag);

    this.filteredFlag = [...this.flag];
  }

  handleChange(value: any) {
    this.selectedCountryFlag.country = value.list;
    this.selectedCountryFlag.flag = value.flag;

  }

  popoverDismissed(isSubmit: boolean) {
    if (isSubmit)
      this.popoverController.dismiss({
        data: this.selectedCountryFlag
      });
    else {
      this.popoverController.dismiss();
    }
  }

  filterSearch(searchTerm: string) {
    const lowerCaseSearchTerm = searchTerm.toLowerCase().trim();

    this.filteredFlag = this.flag
      .filter(({ list }: any) => {
        console.log(list, 'asd');

        const filteredList = list.filter((country: any) => // Filter countries based on the search term
        {
          console.log(country);

          return country.list.toLowerCase().includes(lowerCaseSearchTerm)
        }
        );
        return filteredList.length > 0; // filtered list has matches
      })
      .map(({ label, list }: any) => ({ // Update the list with filtered countries and region     
        label,
        list: list.filter((country: any) =>
          country.list.toLowerCase().includes(lowerCaseSearchTerm)
        )
      }));
  }
}

