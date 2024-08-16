import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  public message$: BehaviorSubject<string> = new BehaviorSubject('');
  public socket = io('https://webshocketchat.onrender.com'); 

  constructor() {}

  public sendMessage(message: string) {
    console.log('sendMessage: ', message);
    this.socket.emit('message', message);
  }

  public getNewMessage(): Observable<string> {
    this.socket.on('message', (message) => {
      this.message$.next(message);
    });

    return this.message$.asObservable();
  }
}
