import { Component } from "@angular/core";
import { Plugins } from "@capacitor/core";
import { UsersService } from "./services/users.service";

const { SplashScreen, StatusBar } = Plugins;

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  constructor(private dataService: UsersService) {
    this.dataService.load();
    SplashScreen.hide().catch((err) => {
      console.warn(err);
    });

    StatusBar.hide().catch((err) => {
      console.warn(err);
    });
  }
}
