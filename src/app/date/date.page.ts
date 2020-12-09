import { Component, OnInit, ViewChild } from '@angular/core';
import { IonList, AlertController } from "@ionic/angular";
import { Date } from "../interfaces/users";
import { ActivatedRoute } from "@angular/router";
import { DatesService } from '../services/dates.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-date',
  templateUrl: './date.page.html',
  styleUrls: ['./date.page.scss'],
})
export class DatePage implements OnInit {
  @ViewChild(IonList, {static: false}) slidingList: IonList;
  private slug: string;
  public date: Date;
  constructor(
    private alertCtrl: AlertController,
    private route: ActivatedRoute,
    private dataService: DatesService,
//  private userService: UsersService
  ) {}

  ngOnInit() {
    this.slug = this.route.snapshot.paramMap.get('id');
    console.log(this.slug);
    this.loadDate();
  }

  loadDate() {
    if (this.dataService.loaded) {
      this.date = this.dataService.getDate(this.slug);
    } else {
      this.dataService.load().then(() => {
        this.date = this.dataService.getDate(this.slug);
      });
    }
  }

  addDate(): void {
    this.alertCtrl
    .create({
      header: "New Date",
      message: "Enter your name and calorie limit below",

      inputs: [
        {
          placeholder: "Enter the date you which to record here",
          type: "date",
          name: "name",
        },
      ],
      buttons: [
        {
          text: "Cancel",
        },
        {
          text: "Save",
          handler: (data) => {
            this.dataService.addDate(data);
            // this.userService.addDate(data);
          },
        },
      ],
    })
    .then((prompt) => {
      prompt.present();
    });
  }

  

}
