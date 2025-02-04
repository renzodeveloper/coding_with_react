import React, { useState } from "react";
import "./App.css";

type ItemId = `${string}-${string}-${string}-${string}-${string}`;

interface Item {
  id: ItemId;
  timestamp: number;
  text: string;
}

const INITIAL_ITEMS: Item[] = [
  {
    id: crypto.randomUUID(),
    timestamp: Date.now(),
    text: "Videogames 🎮",
  },
  {
    id: crypto.randomUUID(),
    timestamp: Date.now(),
    text: "Books 📚",
  },
  {
    id: crypto.randomUUID(),
    timestamp: Date.now(),
    text: "Series 📺",
  },
  {
    id: crypto.randomUUID(),
    timestamp: Date.now(),
    text: "Movies 📽️",
  },
];

const App = () => {
  const [items, setItems] = useState(INITIAL_ITEMS);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { elements } = event.currentTarget;
    const input = elements.namedItem("item");
    const isInput = input instanceof HTMLInputElement;
    if (!isInput || input.value == null) return;

    const newItem: Item = {
      id: crypto.randomUUID(),
      text: input.value,
      timestamp: Date.now(),
    };

    setItems((prevItems) => {
      return [...prevItems, newItem];
    });

    input.value = "";
  };

  /* const createHandleRemoveItem = (id: ItemId) => () => {
    setItems(
      (prevItems) => {
        return prevItems.filter(currentItem => currentItem.id !== id)
      }
    )
  } */

  function createHandleRemoveItem(id: ItemId) {
    return function () {
      setItems((prevItems) => {
        return prevItems.filter((currentItem) => currentItem.id !== id);
      });
    };
  }

  return (
    <main>
      <aside>
        <h1>React Technical Test</h1>
        <h2>Adding and Removing items in the list</h2>

        <form onSubmit={handleSubmit}>
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
            {items.map((item) => (
              <li key={item.id}>
                <span>{item.text}</span>
                <button onClick={createHandleRemoveItem(item.id)}>
                  Removing item
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
};

export default App;
