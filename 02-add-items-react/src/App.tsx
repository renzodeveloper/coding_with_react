import React, { Component } from "react";
import "./App.css";

class App extends Component {
  render() {
    return (
      <main>
        <aside>
          <h1>React Technical Test</h1>
          <h2>Adding and Deletings items to the list</h2>

          <form>
            <label>
              Items to add:
              <input
                name="item"
                required
                type="text"
                placeholder="Videojuegos 🎮"
              />
            </label>
            <button type="submit">Adding item to the list</button>
          </form>
        </aside>

        <section>
          <h2>List of items</h2>
          <ul>
            <li>Videogames 🎮</li>
            <li>Books 📚</li>
            <li>Series 📺</li>
            <li>Movies 📽️</li>
          </ul>
        </section>
      </main>
    );
  }
}

export default App;
