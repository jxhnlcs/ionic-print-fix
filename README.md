# Ionic Print Test

Este repositório contém códigos relacionados à solução para o problema de quebra de página ao imprimir em aplicações Ionic.

## Print Service

### print.service.ts

O arquivo `print.service.ts` contém um serviço que resolve o problema de quebra de página ao imprimir em aplicações Angular/Ionic. O serviço é chamado no `app.component.ts` para inicialização.

```typescript
// Referências:
// - https://github.com/btsiders/ionic-print-test/issues/7
// - https://stackoverflow.com/questions/65493049/media-print-page-break-before-page-break-after-property-not-working-in-ioni

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
      const scroll = element.shadowRoot.querySelector('.inner-scroll') as HTMLElement;
      if (add) {
        scroll.style.position = 'relative';
      } else {
        scroll.style.removeProperty('position');
      }
    });
  }
}

```

## Global Styling

### global.scss

O arquivo `global.scss` contém estilos globais para resolver questões de layout ao imprimir.

```css

@media print {
  * {
    overflow: visible !important;
  }

  body {
    position: relative !important;
    contain: none !important;
    display: block !important;
    max-width: unset !important;
    height: auto !important;
    max-height: unset !important;
  }

  app-root,
  ion-app,
  ion-router-outlet,
  ion-content,
  ion-split-pane,
  ion-tabs,
  .ion-page:not(.ion-page-hidden),
  .tabs-inner {
    position: relative !important;
    contain: none !important;
    display: block !important;
    height: auto !important;
  }
}
```

## Usage

No `app.component.ts`, adicione o seguinte código no método ngOnInit para inicializar o serviço de impressão.

```typescript

import { PrintService } from 'src/app/services/print.service';

private printService: PrintService,

ngOnInit() {
  this.printService.init();
}
```

## Finishing

Agora é só você usar o page-break-after/before/inside na page que deseja quebrar páginas e irá funcionar, talvez seja necessário fazer estilizações para ajustar o layout da impressão.

```css
@media print {

  .first-page,
  .second-page {
    page-break-after: always;
  }
}

```
