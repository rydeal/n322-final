import { Component, OnInit, ViewChild } from '@angular/core';
import { IonList, AlertController } from "@ionic/angular";
import { User, Date } from "../interfaces/users";
import { ActivatedRoute } from "@angular/router";
import { UsersService } from '../services/users.service';
import { DatesService } from '../services/dates.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  @ViewChild(IonList, {static: false}) slidingList: IonList;
  private userID: string;
  public user: User;
  public date: Date;

  constructor(
    private alertCtrl: AlertController,
    private route: ActivatedRoute,
    private dataService: UsersService,
    public dateService: DatesService
  ) {}

  ngOnInit() {
    this.userID = this.route.snapshot.paramMap.get('id');
    console.log("User id " + this.userID);
    this.loadUser();
  }

  loadUser() {
    if (this.dataService.loaded) {
      this.user = this.dataService.getUser(this.userID);
    } else {
      this.dataService.load().then(() => {
        this.user = this.dataService.getUser(this.userID);
      });
    }
  }

  // trackUser() {
  //   this.userID = this.user.id;
  //   console.log(this.userID);
  //   return this.userID;
  // }

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
            this.dateService.addDate(data);
          },
        },
      ],
    })
    .then((prompt) => {
      prompt.present();
    });
  }
}
