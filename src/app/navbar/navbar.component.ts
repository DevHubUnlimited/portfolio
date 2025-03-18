import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{
  public activeTab = 'home';

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
  
  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.resetActiveTab();
      }
    });
  }

  resetActiveTab() {
    this.activeTab = "";
  }
}
