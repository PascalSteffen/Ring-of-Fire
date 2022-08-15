import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { AddPlayerdialogComponent } from '../add-playerdialog/add-playerdialog.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { EditPlayerComponent } from '../edit-player/edit-player.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  game: Game;
  gameId: string;
  constructor(private route: ActivatedRoute, private firestore: AngularFirestore, public dialog: MatDialog) { }


  ngOnInit(): void {
    this.newGame();
    this.route.params.subscribe((params) => {
      this.gameId = params['id'];


      this.firestore.collection('games')
        .doc(this.gameId)
        .valueChanges()
        .subscribe((game: any) => {
          this.game.currentPlayer = game.currentPlayer;
          this.game.playedCard = game.playedCard;
          this.game.players = game.players;
          this.game.stack = game.stack;
          this.game.lastFiveCards = game.lastFiveCards;
          this.game.pickCardAnimation = game.pickCardAnimation;
          this.game.lastCard = game.lastCard;
          this.game.currentCard = game.currentCard;
        });

    });

  }


  /**
   * init a new Game on load.
   * 
   */
  newGame() {
    this.game = new Game();
  }


  /**
   * update the Game to DB.
   * 
   */
  saveGame() {
    this.firestore.collection('games')
      .doc(this.gameId)
      .update(this.game.toJSON())
  }


  /**
   * pick the cards and display the animation.
   * display the current user.
   * 
   */
  takeCard() {
    if (!this.game.pickCardAnimation && this.game.players.length > 1) {
      this.game.currentCard = this.game.stack.pop();
      this.game.playedCard.push(this.game.currentCard);
      this.game.pickCardAnimation = true;
      this.showlastCard();
      this.saveGame();
      setTimeout(() => {
        this.game.pickCardAnimation = false;
        this.game.currentPlayer++;
        this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
        this.saveGame();
      }, 1500);
    }
  }


  /**
   * delete one card from the gamefield
   * when the stack <=5
   */
  showlastCard() {
    if (this.game.stack.length <= 5) {
      this.game.lastFiveCards.pop();
      this.saveGame();
      if (this.game.stack.length == 0) {
        this.game.lastCard = true;
        this.saveGame();
      }
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
        this.game.players.sort();
        this.saveGame();
      }
    });
  }


  /**
   * Delete player
   * @param i - index
   */
  deletePlayer(i: number) {
    const dialogRef = this.dialog.open(EditPlayerComponent);
    dialogRef.afterClosed().subscribe(change => {
      if (change && change.length > 0) {
        this.game.players.splice(i, 1);
        this.game.players.push(change);
        this.game.players.sort();
      } if (change == 'DELETE') {
        this.game.players.splice(i, 1);
        this.game.players.sort();
      }
      this.saveGame();
    });
  }

}