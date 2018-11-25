# deviget - Minesweeper

This repo is the backend for [this coding challenge](https://github.com/deviget/minesweeper-API)
The code front-end app can be found [here](https://github.com/solanoepalacio/msweeper-ui)
The app demo is deployed [here](https://devigetms.herokuapp.com)

#### Features requested / built:
* Design and implement a documented RESTful API for the game (think of a mobile app for your API) - **built**
* Implement an API client library for the API designed above. Ideally, in a different language, of your preference, to the one used for the API - **built**
* When a cell with no adjacent mines is revealed, all adjacent squares will be revealed (and repeat) - **built**
* Ability to 'flag' a cell with a question mark or red flag - **built**
* Detect when game is over - **built**
* Persistence - **built**
* Time tracking - **not built**
* Ability to start a new game and preserve/resume the old ones - **not built**
* Ability to select the game parameters: number of rows, columns, and mines - **built**
* Ability to support multiple users/accounts - **not built**

#### how it works:
* To start playing select the number of rows and columns using the slider and press "start"
* left click on any square to sweep. Upon click, adjacent squares with no mines will be sweeped as well. Sweeped squares will be colored in a grey. If a square holds a mine, yo loose. Squares with mines will be marked in red.
* right click on any square to flag or unflag (if already flagged). Flagged squares can not be clicked. Flagged squres are marked with blue.
* When a square holding a mine is sweeped, you loose. The game will be automatically restarted after 2 seconds.

#### design considerations and notes:
The architechture used is CLEAN, with MVP in the presentation layer.

The API exposes two game-logic related endpoints. One that creates a new game with a unique identifier and one that updates an existing game using such identifier.

The end of the game is controlled by this backend logic. This way, even if the logic is if in the UI, the game data can not be easily 'tricked' since, when a mine is sweeped, the game is closed on the backend and it can not be further altered.

The Data-layer only stores the initial state of the game and each action performed after that. This allows for a wide set of features to be implemented on top of this data structure, including:
- Any game could be recovered and/or seen step by step.
- Any action could be undone