I My WHY behind the choice of the game ----------------------------------------------

    I am building a Memory Matching Game. This game includes 36 total cards arranged in a square grid, with 18 matching pairs. Each pair shares the matching symbol and background color. The player flips two cards at a time and attempts to find all matches.

Why I chose this game:
    a) I want to practice improving my focus and concentration.
    b) Out of all the suggested game options, this one seemed the most fun and interesting to me.
    c) I liked the idea of building something visual and interactive with clear rules.


II Pseudocode -----------------------------------------------------------------------

1 Game Setup

    a) Create 18 unique symbols that will represent each pair.
    b) Duplicate the 18 symbols so there are 36 cards total.
    c) Assign each pair a matching background color.
    d) Shuffle all 36 cards and arrange them face-down in a square grid.

2 When the player clicks a card

    a) Check if the card is already matched or already face-up; if yes, ignore the click.
    b) If it’s a valid card, flip it over to reveal the symbol and color.
    c) Store the flipped card in a temporary list so I can check it later.

3 When two cards are flipped

    a) Pause the game briefly so the player cannot flip more cards immediately.
    b) Compare the two flipped cards by checking their symbol and color.
    c) If they match:

        - Mark both cards as “matched” so they stay face-up.
        -Increase the number of completed pairs.
        -If all 18 pairs are matched, display a “You Won” message.

    d) If they do not match:
        -Wait about one second.
        -Flip both cards back face-down again.
        -Allow the player to continue playing.

4 Restarting the game

    a) Set the matched-pairs count back to zero.
    b) Flip all cards face-down.
    c) Shuffle the cards again.
    d) Re-render the board so the player can start a new game.

III Additional Planning Requirements-------------------------------------------------

1 Game board layout planning

    a) The game board will be a 6 × 6 grid so all 36 cards fit evenly.
    b) Each card will be visually identical when face-down.
    c) When flipped, each card will show:

        -a symbol (to identify the pair)
        -a background color (helps the player visually match pairs)

2 Game logic

    a) Cards must temporarily lock when two are flipped, so the player cannot flip more before the match check.
    b) The game needs to keep track of the state:

        -which cards are flipped
        -which cards are matched
        -how many pairs remain

    c) There must be smooth transitions between flipping, matching, and resetting.
    d) A reset feature must fully restart the game state and reshuffle the cards.

3 Planned eventListeners and game functions

    a) Event listener for clicking a card to flip it.
    b) Event listener for restarting the game.
    c) Functions to:

        -initialize the game
        -shuffle cards
        -render the board
        -handle flip logic
        -check for matches
        -update the game state
        -display win message# game-memory-cards
