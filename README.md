# React Minesweeper

This is a React-based version of the classic Minesweeper game. The game state is stored in local storage, so it persists across sessions. Users can choose the size of their game grid by specifying the number of rows and columns.

## How to Play

1. Open the game in your browser.
2. Choose the size of the game grid by entering the number of rows and columns.
3. Click on a cell to reveal it.
4. If the cell contains a mine, the game is over.
5. If the cell does not contain a mine, it will display the number of adjacent mines.
6. Right-click on a cell to flag it as a mine.
7. The game is won when all non-mine cells are revealed.

## Project Structure

- `src/index.js`: Entry point of the application. Renders the `App` component.
- `src/App.js`: Main component that renders the `Game` component.
- `src/Game.js`: Handles the game logic and state.
- `src/Cell.js`: Represents individual cells in the game grid.
- `src/styles.css`: Contains styles for the Minesweeper game.
- `.github/workflows/deploy.yml`: GitHub Actions workflow for deployment.

## Contributing

We welcome contributions to the React Minesweeper project! To contribute, follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Make your changes and commit them with descriptive messages.
4. Push your changes to your forked repository.
5. Create a pull request to the main repository.

Please ensure your code follows the project's coding standards and includes tests for any new functionality.
