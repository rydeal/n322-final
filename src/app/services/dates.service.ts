import { Injectable } from '@angular/core';
import { Storage } from "@ionic/storage";
import { Date } from '../interfaces/users';
import { UsersService } from '../services/users.service'

@Injectable({
  providedIn: 'root'
})
export class DatesService {
  public dates: Date[] = [];
  public loaded: boolean = false;
  public val: any;
  public userID: any;
  public pageURL: any;
  public urlArr: Array<any> = [];

  constructor(public storage: Storage, public userService: UsersService) { }

  load(): Promise<boolean> {
    return new Promise((resolve) => {
      this.storage.get("dates").then((dates) => {
        if (dates != null) {
          this.dates = dates;
        }

        this.loaded = true;
        resolve(true);
      });
    });
  }

  addDate(data): void {
    // Grabbing the page URL
    this.pageURL = window.location.href;
    // Splitting the URL up into arrays based on /
    this.urlArr = this.pageURL.split('/');
    // Making the userID variable the last element of urlArr
    for(var x = 0; x < this.urlArr.length; x++) {
      this.userID = this.urlArr[x];
    }
    this.dates.push({
      id: this.generateSlug(data.name),
      name: data.name,
      meals: [],
    });

    // Grabbing the users storage
    this.storage.get('users').then((res) => {
      // Looping through all of the users
      for(var i = 0; i < res.length; i++) {
        // If the ID within users localStorage matches, push in the data --Isn't working for some reason--
        console.log(res[i]);
        if(res[i].id == this.userID) {
          console.log(res[i].dates);
          res[i].dates.push({
            id: this.generateSlug(data.name),
            name: data.name,
            meals: [],
          })
        }
      }
    })
    this.save();
  }

  renameDate(date, data): void {
    let index = this.dates.indexOf(date);

    if (index > -1) {
      this.dates[index].name = data.name;
      this.save();
    }
  }

  getDate(id): Date {
    return this.dates.find((date) => date.id === id);
  }

  save(): void {
    this.storage.set("dates", this.dates);
  }

  removeDate(date): void {
    let index = this.dates.indexOf(date);

    if (index > -1) {
      this.dates.splice(index, 1);
      this.save();
    }
  }

  generateSlug(name): string {
    let slug = name.toLowerCase().replace(`/\s/g, '-'`);
    let exists = this.dates.filter((date) => {
      return date.id.substring(0, slug.length) === slug;
    });

    if (exists.length > 0) {
      slug += exists.length.toString();
    }

    return slug;
  }
}
