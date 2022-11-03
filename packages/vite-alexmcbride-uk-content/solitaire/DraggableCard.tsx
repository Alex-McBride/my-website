import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { RatingClassKey } from "@mui/material";
import { SupportOptions } from "prettier";
import { ReactNode } from "react";
import { CSSProperties } from "react";
import { FullSizeCard } from "./Card";

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
  const rank = card.charAt(0) as Rank;
  const suit = card.charAt(1) as Suit;
  return {
    rank,
    suit,
  };
}

interface DraggableCardProps {
  card: CardId;
  draggable: boolean; // Used to disable draggability (e.g. if this is not the top card)
  depth: number;
  children?: ReactNode;
}

export function DraggableCard(props: DraggableCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: props.card,
      data: {
        card: props.card,
      },
      disabled: !props.draggable,
    });
  const style: CSSProperties = {
    transform: CSS.Translate.toString(transform),
    touchAction: "manipulation",
    paddingTop: 0,
    paddingBottom: 0,
    marginTop: 0,
    marginBottom: 0,
    // This feels like the wrong way to position these, but it works for now -- TODO revisit
    position: "relative",
    top: `-${props.depth * 75}px`,
    zIndex: isDragging ? 1000 : props.depth,
  };

  return (
    <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {props.children}
    </button>
  );
}
