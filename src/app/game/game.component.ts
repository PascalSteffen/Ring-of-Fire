import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { AddPlayerdialogComponent } from '../add-playerdialog/add-playerdialog.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  pickCardAnimation = false;
  currentCard: string = '';
  game: Game;
  constructor(public dialog: MatDialog) { }


  ngOnInit(): void {
    this.newGame();
  }


  /**
   * init a new Game on load.
   * 
   */
  newGame() {
    this.game = new Game();
  }

  /**
   * pick the cards and display the animation.
   * display the current user.
   * 
   */
  takeCard() {
    if (!this.pickCardAnimation && this.game.players.length > 1) {
      this.currentCard = this.game.stack.pop();
      this.game.playedCard.push(this.currentCard);
      this.pickCardAnimation = true;
      setTimeout(() => {
        this.pickCardAnimation = false;
        this.game.currentPlayer++;
        this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      }, 1500);
    }
  }


  /**
   * open pop-up.
   * 
   */
  openDialog(): void {
    const dialogRef = this.dialog.open(AddPlayerdialogComponent);
    dialogRef.afterClosed().subscribe(name => {
      if (name && name.length > 0) {
        this.game.players.push(name);
      }
    });
  }


}
