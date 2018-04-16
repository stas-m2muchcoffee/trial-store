import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ModalService {

  constructor() { }
  
  navigateAwaySelection$: Subject<boolean> = new Subject<boolean>();

}
