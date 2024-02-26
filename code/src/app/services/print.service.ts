import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PrintService {
  constructor(@Inject(DOCUMENT) private document: HTMLDocument) {}

  init() {
    window.onbeforeprint = () => this.setPrintStyles(true);
    window.onafterprint = () => this.setPrintStyles(false);
  }

  private setPrintStyles(add: boolean) {
    this.document.querySelectorAll('ion-content').forEach((element) => {
      const scroll = element.shadowRoot?.querySelector('.inner-scroll') as HTMLElement | null;
      if (scroll) {
        if (add) {
          scroll.style.position = 'relative';
        } else {
          scroll.style.removeProperty('position');
        }
      }
    });
  }
}