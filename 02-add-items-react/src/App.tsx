import React, { useState } from "react";
import "./App.css";

interface Item {
  id: `${string}-${string}-${string}-${string}-${string}`;
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
    const input = elements.namedItem('item');
    const isInput = input instanceof HTMLInputElement;
    if (!isInput || input.value == null) return;

    const newItem: Item = {
      id: crypto.randomUUID(),
      text: input.value,
      timestamp: Date.now(),
    };

    setItems(
      (prevItems) => {
        return [...prevItems, newItem];
      }
    );

    input.value = '';
  }

  return (
    <main>
      <aside>
        <h1>React Technical Test</h1>
        <h2>Adding and Deleting items to the list</h2>

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
        <ul>
          {items.map((item) => {
            return (
              <li key={item.id}>
                <span>{item.text}</span>
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
};

export default App;
