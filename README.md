# manila-sinking
An online survival boardgame developed using VueJS. This game draws heavy inspiration from Gamewright's Forbidden Island (https://gamewright.com/product/Forbidden-Island). While core play mechanics remain the same, several thematic elements have been rewritten and simplified. If you liked this game then We advice you to support the original version by going to their website and buying the game.

Online Demo Doc (https://festive-newton-b94041.netlify.app/) [![Netlify Status](https://api.netlify.com/api/v1/badges/78d8fa59-03db-406a-98e7-bdbaef6e9de6/deploy-status)](https://app.netlify.com/sites/festive-newton-b94041/deploys)

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run docs:dev
```

### Compiles and minifies for production
```
npm run docs:build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


## Rulebook
The country is being devastated by the big one, a powerful earth shift the displaced several areas and caused waters to rise and cities to sink into the abyss. Manila's neighboring cities are lost and it is in its final stage of descent. However, it was discovered that great leaders of its past has predicted the crisis and had built a system under the *City hall* which can stabilize the city's foundations. There is just one problem, the key parts are not properly maintained by years of corrupt leadership rendering it useless. The same political elites abandoned the country and hurried back to their foreign masters leaving the remaining Filipinos to survive on their own. A few brave men however remained and braved the elementas to save the city...

### Components
* 28 Discovery cards
  * 5x 'Special Engine Part'
  * 5x 'Special Grade Fuel'
  * 5x 'Nuclear Power Cell'
  * 5x 'S-Grade Tool'
  * 2x 'Diesel Engine Water Pump'
  * 3x 'Jeepney Ride'
  * 3x 'Flood Gates Destroyed'
* 24x Chaos cards (1 for each area)
* 24x Game tiles (1 for each area)
* 4x Survivor character sheets

### Play areas
* Board (City) - dynamic game area using the 24 game tiles randomly placed to form a certain pattern.
* Discovey Deck and discard pile - Contains items (or disasters) that may be encountered
* Chaos Deck and discard pile - Contains the 24 areas that will be vulnerable to the chaos.
* Character Sheets - shows the available actions and abilities of each survivor
* Goal Tracker - monitors the progress of the game

### Game Phase
Upon selecting the number of survivors and dificulty level, a random survivor is picked and the depth level is set. The discovery cards are then shuffled and set aside,  The game begins with the first survivor and moves to the next survivor until the obbjectives are completed, or the depth thershold is reached and everyone drowned into the abyss. Each survivor round has a phase

* **Survivor Action Phase**
  * The active survivor perform 3 actions (You can do any actions multiple times if possible)
    * **Move Location** - moves the survivor to a new area adjacent to its current position
    * **Assist against chaos** - Temporarily supress the chaos occuring in an area
    * **Give Item** - Transfer an item to another nearby survivor
    * **Acquire Objective** - Combine 4 parts of the same item to complete an objective.
      * This can be done on certain locations for each objective type.
      * Once all 4 objectives are completed, the survivors have stopped the chaos and are victorious.
* **Discovery Phase**
  * Discover something from the *Discovery Deck* (If the *Discovery Deck* is out of cards, shuffle the entire *Discovery Discard Pile* first and use it to form a new *Discovery Deck* then draw from it.)
    * If its an item, add the card into the survivor's hand
    * if a 'Flood Gates Destroyed' card was drawn:
      * Increase the depth level marker. 
        * If the depth level has reached the max threshold, the city of manila rumbles one last time before it sinks with the survivors into the abyss.
      * discard the 'Flood Gates Destroyed' card into the discovery dicard pile
    * If the maximum hand limit of the survivor is reached, that survivor must discard a card until the max hand is reached. Note that emergency cards can be used before being discarded.
* **Chaos Phase**
  * draw cards from the *Chaos Deck* equal to the depth level (do not draw altogether and perform the following as you draw a card. if the *Chaos Deck* is out of cards, shuffle the entire *Chaos Discard pile* and use it to form a new *Chaos Deck* then draw from it.)
    * switch the respective area in the board into flooded state.
      * If the area is already in its flooded state, that area is already consumed by the chaos and is out of play.
        * If the *City hall* is consumed by the chaos, the game is lost and the survivors are left only to await their fate.
        * If all tiles that can be used to acquire a certain objective is lost before it is acquired, the system is irrepairable and the survivors lost their chances and game ends.
        * If a survivor is on a tile that got consumed by the chaos, that survivor is also consumed.
          * The survivor discard his entire hand into the *Discovery Discard Pile*
          * The surivor's character sheet is removed from play.
      * discard the *Chaos Card* into the *Chaos Discard Pile*

### Survivor Role
* **Politician** - Surprisingly there are a few good men left. The politician has influential power to send men to aide in times of need.
* **Engineer** - Masters of technology, the engineer carries wisdom and tools that allows them to fix issues they are within.
* **Bearer** - Strongmen who are built for moving things who can carry more than the average man.
* **Athlete** - Agile individuals with high endurance. The athlete can run around faster without tiring.

