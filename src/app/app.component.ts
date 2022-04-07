import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { CountdownComponent } from './countdown/countdown.component';
import { UserService } from './user.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  cardImage: string = 'https://www.fillmurray.com/640/360';
  cardTitle: string = 'Meu Card';
  cardDescription: string =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s ";

  showDropdown: boolean = false;

  alerts: string[] = [];

  showAlert = true;

  users: any[];

  page: number = 1;

  results: number = 5;

  constructor(public userService: UserService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  @ViewChild(CountdownComponent) countDown: CountdownComponent;

  alternarShowDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  trocarPagina(valor: number) {
    this.page = valor;
    this.getUsers();
  }

  trocarResult(valor: number) {
    this.results = valor;
    this.getUsers();
    this.showDropdown = false;
  }

  proximo() {
    this.page++;
    this.getUsers();
  }

  anterior() {
    if (this.page > 1) {
      this.page--;
      this.getUsers();
    }
  }

  getUsers() {
    this.userService
      .getUsers(this.page, this.results)
      .subscribe((result: any) => {
        this.users = result.results;
      });
  }

  resetCountDown() {
    this.countDown.count = 100;
  }

  onAlertButtonClick() {
    this.alerts.push('Nice, you triggered this alert message!');
  }

  onClick() {
    this.cardTitle = 'Clicou!';
  }

  onCloseAlert(index: number) {
    this.alerts.splice(index, 1);
  }
}
