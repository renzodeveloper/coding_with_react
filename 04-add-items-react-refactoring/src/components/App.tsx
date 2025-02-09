import React, { useState } from "react";
import "./App.css";
import { ItemComponent } from "./ItemComponent";
import { useItems } from "../hooks/useItems";
import { useSEO } from "../hooks/useSEO";

export type ItemId = `${string}-${string}-${string}-${string}-${string}`;

export interface Item {
  id: ItemId;
  timestamp: number;
  text: string;
}

const App = () => {
  const { items, addItem, removeItem } = useItems();
  useSEO({
    title: `[${items.length}] React Technical Test`,
    description : "Adding and Removing items in the list"
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { elements } = event.currentTarget;
    const input = elements.namedItem("item");
    const isInput = input instanceof HTMLInputElement;
    if (!isInput || input.value == null) return;

    addItem(input.value);

    input.value = "";
  };

  function createHandleRemoveItem(id: ItemId) {
    return function () {
      removeItem(id);
    };
  }

  return (
    <main>
      <aside>
        <h1>React Technical Test</h1>
        <h2>Adding and Removing items in the list</h2>

        <form onSubmit={handleSubmit} aria-label="Adding items to the list">
          <label>
            Items to add:
            <input
              name="item"
              required
              type="text"
              placeholder="Videogames 🎮"
            />
          </label>
          <button type="submit">Adding items to the list</button>
        </form>
      </aside>

      <section>
        <h2>List of items</h2>
        {items.length === 0 ? (
          <p>
            <strong>No items available.</strong>
          </p>
        ) : (
          <ul>
            {
            items.map((item) => {
              return <ItemComponent {...item} key={item.id} handleClick={createHandleRemoveItem(item.id)} />;
            })
            }
          </ul>
        )}
      </section>
    </main>
  );
};

export default App;
