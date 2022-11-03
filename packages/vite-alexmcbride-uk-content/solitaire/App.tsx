import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  Box,
  CssBaseline,
  Stack,
  ThemeProvider,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { useState } from "react";
import { theme } from "../src/theme";
import { FullSizeCard } from "./Card";
import { CardStack } from "./CardStack";
import { Draggable } from "./Draggable";
import {
  makeCard,
  CardId,
  DraggableCard,
  Rank,
  Ranks,
  Suit,
  Suits,
  differentColours,
  extract,
} from "./DraggableCard";

function App() {
  const containers = ["A", "B", "C", "D", "E", "F", "G"];

  const [contents, setContents] = useState<Map<UniqueIdentifier, CardId[]>>(
    new Map([
      [
        "A",
        [
          makeCard("A", Suits.Spades),
          makeCard("K", Suits.Diamonds),
          makeCard("Q", Suits.Clubs),
        ],
      ],
      ["B", []],
      ["C", []],
      ["D", []],
      ["E", []],
      ["F", []],
      ["G", []],
    ])
  );
  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor);
  const kbSensor = useSensor(KeyboardSensor);

  const sensors = useSensors(mouseSensor, touchSensor, kbSensor);

  return (
    <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
      <Stack direction={"row"} spacing={3}>
        {containers.map((id) => (
          <CardStack key={id} id={id} cards={contents.get(id) ?? []} />
        ))}
      </Stack>
    </DndContext>
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    // If the item is dropped over a container, figure out
    if (over !== null) {
      // We pinky promise that the id of the active element is a card
      // TODO validate this
      const movedCard: CardId = active.id as CardId;
      // Maintain the card states manually here -- TODO encapsulate all of this in some sort of "game state"
      setContents((prev) => {
        // Check if the last (topmost) card in the target stack is the right suit (or target stack is empty)
        const targetCard = prev.get(over.id)?.at(-1);
        if (
          targetCard !== undefined &&
          !differentColours(extract(movedCard).suit, extract(targetCard).suit)
        ) {
          console.log(
            `Moved card ${movedCard} is not suit-compatible with target card ${targetCard}`
          );
          return prev;
        }

        // Obviously shouldn't actually mutate previous state here, getting rid of this anyway for the game state
        const [key, vs] = Array.from(prev.entries()).find(([k, v]) => {
          const includes = v.includes(movedCard);
          console.log(includes);
          return includes;
        })!;
        // Move everything including and after the dragged item
        const indexOfMoved = vs.findIndex((c) => c === movedCard);
        console.log(`Moved card at index ${indexOfMoved} in stack ${key}`);
        const toMove = vs.slice(indexOfMoved);
        console.log(`Moving cards ${toMove} to stack ${over.id}`);
        prev.set(key, vs.slice(0, indexOfMoved));
        prev.set(over.id, prev.get(over.id)!.concat(toMove));

        console.log(`New state: ${JSON.stringify([...prev])}`);
        return new Map(prev);
      });
    }
  }
}

export default App;
