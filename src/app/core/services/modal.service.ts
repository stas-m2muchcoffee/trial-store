import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';

@Injectable()
export class ModalService {
  navigateAwaySelection$: Subject<boolean> = new Subject<boolean>();
}
