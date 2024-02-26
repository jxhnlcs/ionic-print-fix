import { Component, OnInit } from '@angular/core';
import { PrintService } from './services/print.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  
  constructor(
    private printService: PrintService,
  ) {}


  ngOnInit() {
    this.printService.init();
  }
}

