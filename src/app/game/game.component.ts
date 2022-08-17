import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { AddPlayerdialogComponent } from '../add-playerdialog/add-playerdialog.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { EditPlayerComponent } from '../edit-player/edit-player.component';
import { LegacyComponent } from '../legacy/legacy.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  game: Game;
  gameId: string;
  constructor(private route: ActivatedRoute, private firestore: AngularFirestore, public dialog: MatDialog, private router: Router) { }


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
   * restart the Game after gameOver
   * 
   */
  restartGame() {
    let game = new Game();
    this.firestore
      .collection('games')
      .add(game.toJSON())
      .then((gameInfo: any) => {
        this.router.navigateByUrl('/game/' + gameInfo.id);
      });
    this.game.gameOver = false;
    this.saveGame();
  }


  /**
   * update the Game to DB.
   * 
   */
  saveGame() {
    this.firestore.collection('games')
      .doc(this.gameId)
      .update(this.game.toJSON());
  }


  /**
   * pick the cards and display the animation.
   * display the current user.
   * 
   */
  takeCard() {
    if (this.game.stack.length == 1) {
      setTimeout(() => {
        this.game.gameOver = true;
      }, 1500);
      this.saveGame();
    } if (!this.game.pickCardAnimation && this.game.players.length > 1) {
      this.nextCard();
      this.showlastCard();
      this.saveGame();
      setTimeout(() => {
        this.showCurrentPlayer();
      }, 1500);
    }
  }


  /**
   * get next card and splice the card from the stack.
   * 
   */
  nextCard() {
    this.game.currentCard = this.game.stack.pop();
    this.game.playedCard.push(this.game.currentCard);
    this.game.pickCardAnimation = true;
  }


  /**
   * show the current player with an hightlight on the field.
   * 
   */
  showCurrentPlayer() {
    this.game.pickCardAnimation = false;
    this.game.currentPlayer++;
    this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
    this.saveGame();
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
   * open pop-up.
   * 
   */
  openLegacy(): void {
    const dialogRef = this.dialog.open(LegacyComponent);
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
        this.saveGame();
      }
      if (change == 'DELETE') {
        this.game.players.splice(i, 1);
        this.game.players.sort();
        this.saveGame();
      }
    });
  }
}