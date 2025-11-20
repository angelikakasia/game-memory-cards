# Pseudocode
This file contains planning logic for my game.
### 1. Game Setup
- Create 18 matching Paris: a term and a meaning  
- Duplicate them → 36 total cards  
- Assign each pair a matching background color  
- Shuffle the cards  
- Render them into a 6×6 grid  
- Set timer (10 minutes) and move limit (40 moves)

### 2. When the Player Clicks a Card
- If card is already matched or face-up → ignore  
- Otherwise flip card  
- Store flipped card in temporary list  

### 3. When Two Cards Are Flipped
- Lock the board  
- Compare the two cards  
- If matching:
  - Mark as “matched”
  - Increase matched-pairs count
  - If all 18 matched → display “You Won”
- If not matching:
  - Wait 1 second
  - Flip both back
- Unlock the board  

### 4. Restarting the Game
- Reset matched pairs, moves, and time  
- Flip all cards face-down  
- Shuffle again  
- Re-render the board  
