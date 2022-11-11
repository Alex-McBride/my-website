
export const Suits = {
  Hearts: "♥",
  Clubs: "♣",
  Diamonds: "♦",
  Spades: "♠",
} as const;
export type Suit = typeof Suits[keyof typeof Suits];

export function isRed(suit: Suit): suit is "♥" | "♦" {
  return suit === Suits.Hearts || suit === Suits.Diamonds;
}
export function isBlack(suit: Suit): suit is "♣" | "♠" {
  return suit === Suits.Clubs || suit === Suits.Spades;
}
export function differentColours(a: Suit, b: Suit): boolean {
  return (isRed(a) && isBlack(b)) || (isBlack(a) && isRed(b));
}

export const Ranks = {
  A: 1,
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  "10": 10,
  J: 11,
  Q: 12,
  K: 13,
} as const;

export type Rank = keyof typeof Ranks;

export type CardId = `${Rank}${Suit}`;

export function makeCard(rank: Rank, suit: Suit): CardId {
  return `${rank}${suit}`;
}

export function extract(card: CardId): { rank: Rank; suit: Suit } {
  // This is a total hack to handle the special case of 10 (it takes 2 chars to represent)
  // TODO do this sanely
  const rank = card.length === 3 ? "10" : card.at(0) as Rank;
  const suit = card.at(-1) as Suit;
  return {
    rank,
    suit,
  };
}

export interface PileCard {
  id: CardId,
  isFaceUp: boolean,
  isMoveable: boolean
}

export interface GameState {
  stock: CardId[],
  waste: CardId[]
  foundations: Record<Suit, CardId[]>
  piles: PileCard[][]
}

export function newGame(): GameState {

  console.log("New game time")
  const deck = randomDeck();

  // Generate piles.
  // There are 7 piles, first pile has 1 card, second has two etc. 
  // Cards are dealt face down to piles, except the last card in the pile
  const piles: PileCard[][] = []
  for (let i = 1; i <= 7; i++) {
    const pile: PileCard[] = []
    for (let j = 0; j < i; j++) {
      const drawn = takeCard(deck);
      const isLastCard = j == i - 1;
      pile.push({
        id: drawn,
        isFaceUp: isLastCard,
        isMoveable: isLastCard
      });
    }
    piles.push(pile);
  }

  return {
    stock: deck,
    waste: [],
    foundations: {
      [Suits.Hearts]: [],
      [Suits.Clubs]: [],
      [Suits.Diamonds]: [],
      [Suits.Spades]: [],
    },
    piles
  }
}

export interface FoundationTarget {
  target: "foundation",
  suit: Suit
}
export interface PileTarget {
  target: "pile",
  pileIndex: number
}
export type MoveTarget = FoundationTarget | PileTarget

export function proposeMove(state: GameState, moving: CardId, target: MoveTarget): GameState | undefined {
  switch (target.target) {
    case "foundation": return proposeFoundationMove(state, moving, target);
    case "pile": return proposePileMove(state, moving, target);
    default:
      return assertNever(target);
  }
}

function proposeFoundationMove(state: GameState, moving: CardId, target: FoundationTarget): GameState | undefined {
  // Moving must be same suit as target foundation, and strictly one greater than the mover
  const { suit, rank } = extract(moving);
  if (suit !== target.suit) {
    console.log(`Cannot move ${moving} to foundation ${target.suit} because it's the wrong suit`);
    return undefined;
  }
  const foundationCard = state.foundations[target.suit].at(-1)
  const foundationValue =  foundationCard !== undefined ? Ranks[extract(foundationCard).rank] : 0
  const movingValue = Ranks[rank]
  if (movingValue - foundationValue != 1) {
    console.log(`Cannot move ${moving} to foundation ${target.suit} because it's not one greater (or an Ace)`)
    return undefined;
  }
  if (state.waste.at(-1) === moving) {
    state.waste.pop();
  } else {
    const [movingPileIdx, movingIndexWithinPile] = findCardPosition(moving, state.piles);
  
    // Moving card must also be the topmost card in its pile
    if (movingIndexWithinPile !== state.piles[movingPileIdx].length - 1) {
        console.log(`Cannot move ${moving} because it's not the last item in its pile`)
        return undefined;
    }

    state.piles[movingPileIdx].splice(movingIndexWithinPile);
    const newlyRevealed = state.piles[movingPileIdx].at(-1)
    if (newlyRevealed !== undefined) {
      newlyRevealed.isFaceUp = true;
      newlyRevealed.isMoveable = true;
    }
  }
  const newFoundations = { ...state.foundations }
  newFoundations[suit].push(moving);

  return {
    stock: state.stock,
    waste: state.waste,
    foundations: newFoundations,
    piles: state.piles
  }
}

function proposePileMove(state: GameState, moving: CardId, target: PileTarget): GameState | undefined {
    // First, validate that the pile in question can receive the moving card
    // We can bail if the active card on the target pile isn't strictly one greater than the moving card or isn't the opposite colour
    const targetPile = state.piles[target.pileIndex];
    if (targetPile.length > 0) {
      const activeCard = targetPile.at(-1)!.id;
      if (!differentColours(extract(moving).suit, extract(activeCard).suit)) {
        console.log(`Cannot move ${moving} to pile ${target.pileIndex} because active card ${activeCard} is not an opposite coloured suit`);
        return undefined;
      }
      if (Ranks[extract(activeCard).rank] - Ranks[extract(moving).rank] != 1) {
        console.log(`Cannot move ${moving} to pile ${target.pileIndex} because active card ${activeCard} is not one greater`);
        return undefined;
      }
    }
    console.log(`Would move ${moving} to pile ${target.pileIndex}`);

    let piles: PileCard[][];
    if (state.waste.at(-1) === moving) {
      state.waste.pop();
      targetPile.push({
        id: moving,
        isFaceUp: true,
        isMoveable: true,
      });
      piles = state.piles;
    } else {
      // TODO we can totally grab these indices in one pass
      const fromPileIndex = state.piles.findIndex(pile => pile.find((card) => card.id === moving) !== undefined);
      const indexOfMovingInOldPile = state.piles[fromPileIndex].findIndex((card) => card.id === moving);
      console.log(`Moving ${moving} and all descendents from ${fromPileIndex}`)
      const newPiles = []
      for (let i = 0; i < state.piles.length; i++) {
        if (i === target.pileIndex) {
          const toAdd = state.piles[fromPileIndex].slice(indexOfMovingInOldPile);
          newPiles.push(state.piles[i].concat(toAdd));
        } else if (i === fromPileIndex) {
          newPiles.push(state.piles[i].slice(0, indexOfMovingInOldPile));
          // Not very neat but does the trick
          if (newPiles.at(-1)?.length ?? 0 > 0) {
            newPiles.at(-1)!.at(-1)!.isFaceUp = true;
            newPiles.at(-1)!.at(-1)!.isMoveable = true;
          }
        } else {
          newPiles.push(state.piles[i])
        }
      }
      piles = newPiles;
    }

    return {
      stock: state.stock,
      waste: state.waste,
      foundations: state.foundations,
      piles: piles,
    }
}

function findCardPosition(card: CardId, piles: PileCard[][]): [number, number] {
  const indices: [number, number][] = piles
    .map<[number, number]>((pile, i) => [i, pile.findIndex(pileCard => pileCard.id === card)])
    .filter(([_, targetCardIndex]) => targetCardIndex !== -1);

  if (indices.length === 0) {
    throw Error(`Could not find ${card} in piles ${JSON.stringify(piles)}`);
  } else if (indices.length > 1) {
    throw new Error(`Card ${card} found in piles ${JSON.stringify(indices.map(([pileIndex, _]) => piles[pileIndex]))}`)
  } else {
    return indices[0];
  }
}

export function drawFromStock(state: GameState): GameState {
  const newStock = [...state.stock]
  const drawnCard = takeCard(newStock);
  return {
    stock: newStock,
    waste: [...state.waste, drawnCard],
    foundations: state.foundations,
    piles: state.piles
  }
}
export function recycleWaste(state: GameState): GameState {
  const newStock = [...state.waste]
  const drawnCard = takeCard(newStock);
  return {
    stock: newStock,
    waste: [drawnCard],
    foundations: state.foundations,
    piles: state.piles
  }
}

function assertNever(x: never): never {
  throw new Error(`Unexpected object ${x}`);
}

const orderedDeck: CardId[] = function() {
  return Object.values(Suits).flatMap(suit => {
    return Object.keys(Ranks).map(rank => {
      return `${rank}${suit}` as CardId;
    });
  });
}();

function randomBetween(minInclusive: number, maxExclusive: number): number {
  return Math.floor(minInclusive + (Math.random() * (maxExclusive - minInclusive)));
}

function randomDeck(): CardId[] {
  const randomDeck = [...orderedDeck]
  // Do a Fisher-Yates shuffle
  for (let i = 0; i < orderedDeck.length - 2; i++) {
    const j = randomBetween(i, orderedDeck.length);
    [randomDeck[i], randomDeck[j]] = [randomDeck[j], randomDeck[i]];
  }
  return randomDeck;
}

function takeCard(deck: CardId[]): CardId {
  const card = deck.pop()
  if (card === undefined) throw Error("Deck is empty");
  return card;
}


