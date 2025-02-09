import React from 'react';
import { ItemId } from "./App";

export function ItemComponent({id, text, handleClick} : {id: ItemId, text: string, handleClick: () => void}) {
  return (
    <li key={id}>
      {text}
        <button onClick={handleClick}>
            Removing item
        </button>
    </li>
  );
}
