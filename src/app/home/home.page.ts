import { Component, ViewChild } from '@angular/core';
import { IonList, AlertController, NavController } from "@ionic/angular";
import { UsersService } from '../services/users.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild(IonList, { static: false }) slidingList: IonList;
  constructor(
    public dataService: UsersService,
    private alertCtrl: AlertController

  ) {}

  addUser(): void {
    this.alertCtrl
    .create({
      header: "New User",
      message: "Enter your name and calorie limit below",

      inputs: [
        {
          placeholder: "Enter your name here",
          type: "text",
          name: "name",
        },
        {
          placeholder: "Enter your calorie limit here",
          type: "number",
          name: "calorieCount",
        },
      ],
      buttons: [
        {
          text: "Cancel",
        },
        {
          text: "Save",
          handler: (data) => {
            this.dataService.addUser(data);
          },
        },
      ],
    })
    .then((prompt) => {
      prompt.present();
    });
  }

  renameUser(user): void {
    this.alertCtrl
      .create({
        header: "Rename User",
        message: "Enter the new name of this checklist below",

        inputs: [
          {
            type: "text",
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
              this.dataService.renameUser(user, data);
            },
          },
        ],
      })
      .then((prompt) => {
        prompt.present();
      });
  }

  removeUser(user): void {
      this.dataService.removeUser(user);
  }

}
