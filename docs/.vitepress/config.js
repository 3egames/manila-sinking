module.exports = {
  title: '3E Games: Manila is Sinking',
  description: 'A cooperative survival game where players need to retrieve resources and escape before the archipelago completely sinks.',
  themeConfig: {
    repoLabel: 'View code from the official repository',
    repo: 'https://github.com/3egames/manila-sinking',
    docsDir: 'docs',
    search: false,
    nav: [
      { text: 'Home', link: '/'},
      { text: 'Components', link: '/components/'}
    ],
    sidebar: [
      { text: 'Components', link: '/components/', children: [ 
        { text: 'GameBoard', collapsable: true, link: '/components/game-board/'},
        { text: 'GameTile', collapsable: true, link: '/components/game-tile/'},
        { text: 'GameGoalTracker', collapsable: true, link: '/components/game-goal-tracker/'},
        { text: 'GameCharacterSheet', collapsable: true, link: '/components/game-character-sheet/'}  
      ]},
    ],
  }
}