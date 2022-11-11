import React, { CSSProperties, forwardRef } from "react";
import { CardId, extract, isRed } from "./solitaire";

export interface CardProps {
  card?: CardId;
}

export function FaceUpCard(props: { card: CardId }) {
  const { suit } = extract(props.card);
  const style: CSSProperties = {
    display: "inline-block",
    width: "60px",
    height: "90px",
    margin: "4px",
    color: isRed(suit) ? "red" : "black",
    fontFamily: "roboto",
  };
  return (
    <div style={style}>
      <span
        style={{
          position: "absolute",
          display: "inline-block",
          top: "4px",
          left: "4px",
          width: "1px",
        }}
      >
        {props.card}
      </span>
      {/* TODO add inner pattern (pictures for JQK, pattern for other cards)*/}
      <span
        style={{
          position: "absolute",
          display: "inline-block",
          rotate: "180deg",
          bottom: "4px",
          right: "4px",
        }}
      >
        {props.card}
      </span>
    </div>
  );
}

export function FaceDownCard() {
  const style: CSSProperties = {
    display: "inline-block",
    width: "60px",
    height: "90px",
    margin: "4px",
    fontFamily: "roboto",
  };
  return <div style={style}></div>;
}

export const ClickableCard = forwardRef(function ClickableCard(
  props: CardProps,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  const style: CSSProperties = {
    position: "relative",
    padding: 0,
    margin: 0,
  };
  return (
    <button ref={ref} style={style}>
      {props.card !== undefined ? (
        <FaceUpCard card={props.card} />
      ) : (
        <FaceDownCard />
      )}
    </button>
  );
});
