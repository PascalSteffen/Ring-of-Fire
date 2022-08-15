import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { AddPlayerdialogComponent } from '../add-playerdialog/add-playerdialog.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  pickCardAnimation = false;
  lastCard = false;
  currentCard: string = '';
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
        .subscribe((game) => {
          console.log(game);

        });

    });

  }


  /**
   * init a new Game on load.
   * 
   */
  newGame() {
    this.game = new Game();
    // this.firestore.collection('games').add(this.game.toJSON());
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
      this.showlastCard();
      setTimeout(() => {
        this.pickCardAnimation = false;
        this.game.currentPlayer++;
        this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
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
      if (this.game.stack.length == 0) {
        this.lastCard = true;
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
      }
    });
  }


}
