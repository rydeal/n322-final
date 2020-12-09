import { Injectable } from '@angular/core';
import { Storage } from "@ionic/storage";
import { User } from '../interfaces/users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  public users: User[] = [];
  public loaded: boolean = false;


  constructor(private storage: Storage) { }

  load(): Promise<boolean> {
    return new Promise((resolve) => {
      this.storage.get("users").then((users) => {
        if (users != null) {
          this.users = users;
        }

        this.loaded = true;
        resolve(true);
      });
    });
  }

  addUser(data): void {
    this.users.push({
      id: this.generateSlug(data.name),
      name: data.name,
      calorieCount: data.calorieCount,
      dates: [{
        id: "placeholder",
        name: "placeholder",
        meals: []
      }],
    });

    this.save();
  }
  



  renameUser(user, data): void {
    let index = this.users.indexOf(user);

    if (index > -1) {
      this.users[index].name = data.name;
      this.save();
    }
  }

  getUser(id): User {
    return this.users.find((user) => user.id === id);
  }

  save(): void {
    this.storage.set("users", this.users);
  }

  removeUser(user): void {
    let index = this.users.indexOf(user);

    if (index > -1) {
      this.users.splice(index, 1);
      this.save();
    }
  }

  generateSlug(name): string {
    let slug = name.toLowerCase().replace(`/\s/g, '-'`);
    console.log(slug);
    let exists = this.users.filter((user) => {
      return user.id.substring(0, slug.length) === slug;
    });

    if (exists.length > 0) {
      slug += exists.length.toString();
    }

    return slug;
  }
}
