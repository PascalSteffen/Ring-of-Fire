export class Game {
    public pickCardAnimation = false;
    public lastCard = false;
    public currentCard: string = '';
    public gameOver = false;

    public players: string[] = [];
    public stack: string[] = [];
    public playedCard: string[] = [];
    public currentPlayer: number = 0;
    public lastFiveCards = [1, 2, 3, 4, 5];


    constructor() {
        for (let i = 1; i < 3; i++) {
            this.stack.push('spade_' + i);
            this.stack.push('hearts_' + i);
            this.stack.push('clubs_' + i);
            this.stack.push('diamonds_' + i);
        }

        shuffle(this.stack)
    }


    public toJSON() {
        return {
            players: this.players,
            stack: this.stack,
            playedCard: this.playedCard,
            currentPlayer: this.currentPlayer,
            lastFiveCards: this.lastFiveCards,
            pickCardAnimation: this.pickCardAnimation,
            lastCard: this.lastCard,
            currentCard: this.currentCard,
            gameOver: this.gameOver
        }
    }

}




/**
 * shuffle the card-array
 * @param array -
 * @returns 
 * 
 */
export function shuffle<T>(array: T[]): T[] {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
};