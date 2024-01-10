import {Card, PokerHand, Rank} from "./types"
import {Evaluator} from "./Evaluator";


export class DefaultEvaluator implements Evaluator {

    evaluate(hand: Card[]): number {
        this.sort(hand);

        if (this.isRoyalFlush(hand)) return 10;
        if (this.isStraightFlush(hand)) return 9;
        if (this.isFourOfAKind(hand)) return 8;
        if (this.isFullHouse(hand)) return 7;
        if (this.isFlush(hand)) return 6;
        if (this.isStraight(hand)) return 5;
        if (this.isThreeOfAKind(hand)) return 4;
        if (this.isTwoPair(hand)) return 3;
        if (this.isPair(hand)) return 2;

        return 1; // High card
    }

    evaluateAndGetPokerHand(hand: Card[]): PokerHand {
        this.sort(hand);

        if (this.isRoyalFlush(hand)) return PokerHand.ROYAL_FLUSH;
        if (this.isStraightFlush(hand)) return PokerHand.STRAIGHT_FLUSH;
        if (this.isFourOfAKind(hand)) return PokerHand.FOUR_OF_A_KIND;
        if (this.isFullHouse(hand)) return PokerHand.FULL_HOUSE;
        if (this.isFlush(hand)) return PokerHand.FLUSH;
        if (this.isStraight(hand)) return PokerHand.STRAIGHT;
        if (this.isThreeOfAKind(hand)) return PokerHand.THREE_OF_A_KIND;
        if (this.isTwoPair(hand)) return PokerHand.TWO_PAIR;
        if (this.isPair(hand)) return PokerHand.ONE_PAIR;

        return PokerHand.HIGH_CARD; // High card
    }

    private sort(hand: Card[]): Card[] {
        return hand.sort((a, b) => this.cardValue(a) - this.cardValue(b));
    }

    private cardValue(card: Card): number {
        const cardOrder = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
        return cardOrder.indexOf(card.rank);
    }

    private isRoyalFlush(hand: Card[]): boolean {
        const suits = hand.map(card => card.suit);
        const ranks = hand.map(card => card.rank);

        const isSameSuit = suits.every((suit) => suit === suits[0]);
        const hasRoyalCards = ['A', 'K', 'Q', 'J', '10'].every((rank) => ranks.includes(rank as Rank));

        return isSameSuit && hasRoyalCards;
    }

    private isStraightFlush(hand: Card[]): boolean {
        const suits = hand.map(card => card.suit);
        const ranks = hand.map(card => this.cardValue(card)).sort((a, b) => a - b);

        const isSameSuit = suits.every((suit) => suit === suits[0]);
        const isSequence = ranks.every((rank, index) => index === 0 || rank === ranks[index - 1] + 1);

        return isSameSuit && isSequence;
    }

    private isFourOfAKind(hand: Card[]): boolean {
        const ranks = hand.map(card => card.rank);
        const frequencyMap = this.createFrequencyMap(ranks);

        return Object.values(frequencyMap).includes(4);
    }

    private createFrequencyMap(array: Rank[]): Record<Rank, number> {
        return array.reduce((map, item) => {
            map[item] = (map[item] || 0) + 1;
            return map;
        }, {} as Record<Rank, number>);
    }

    private isFullHouse(hand: Card[]): boolean {
        const ranks = hand.map(card => card.rank);
        const frequencyMap = this.createFrequencyMap(ranks);

        const frequencies = Object.values(frequencyMap);
        return frequencies.includes(3) && frequencies.includes(2);
    }

    private isFlush(hand: Card[]): boolean {
        const suits = hand.map(card => card.suit);
        return suits.every((suit) => suit === suits[0]);
    }

    private isStraight(hand: Card[]): boolean {
        const ranks = hand.map(card => this.cardValue(card)).sort((a, b) => a - b);
        return ranks.every((rank, index) => index === 0 || rank === ranks[index - 1] + 1);
    }

    private isThreeOfAKind(hand: Card[]): boolean {
        const ranks = hand.map(card => card.rank);
        const frequencyMap = this.createFrequencyMap(ranks);

        return Object.values(frequencyMap).includes(3);
    }

    private isTwoPair(hand: Card[]): boolean {
        const ranks = hand.map(card => card.rank);
        const frequencyMap = this.createFrequencyMap(ranks);

        const frequencies = Object.values(frequencyMap);
        return frequencies.filter(frequency => frequency === 2).length === 2;
    }

    private isPair(hand: Card[]): boolean {
        const ranks = hand.map(card => card.rank);
        const frequencyMap = this.createFrequencyMap(ranks);

        return Object.values(frequencyMap).includes(2);
    }
}