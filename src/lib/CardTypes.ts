export interface CardType {
  name: string;
  description: string;
  imageUrl?: string;
}

interface CardTypesStruct {
  discover: {
    engine: CardType;
    fuel: CardType;
    battery: CardType;
    tools: CardType;
    pump: CardType;
    jeepney: CardType;
    flood: CardType;
  };
  areas: Record<string, CardType>;
}

const CardTypes: CardTypesStruct = {
  discover: {
    engine: {
      name: 'Special Engine Part',
      description: "An engine part used to complete the pump engine.",
      imageUrl: 'https://raw.githubusercontent.com/3egames/manila-sinking/main/docs/assets/cards/3.png'
    },
    fuel: {
      name: 'Special Grade Fuel',
      description: "Collect 4 of this in order to run the engine.",
      imageUrl: 'https://raw.githubusercontent.com/3egames/manila-sinking/main/docs/assets/cards/4.png'
    },
    battery: {
      name: 'Nuclear Power Cell',
      description: "Collect 4 of this in order to power up the system.",
      imageUrl: 'https://raw.githubusercontent.com/3egames/manila-sinking/main/docs/assets/cards/2.png'
    },
    tools: {
      name: 'S-Grade Tool',
      description: "Locate 4 special unique tools we need to fix the anti-flood control system.",
      imageUrl: 'https://raw.githubusercontent.com/3egames/manila-sinking/main/docs/assets/cards/1.png'
    },
    jeepney: {
      name: 'Jeepney Ride',
      description: "Use these higly poluting relics to move 1 or more survivors on a tile to another.",
      imageUrl: 'https://raw.githubusercontent.com/3egames/manila-sinking/main/docs/assets/cards/5.png'
    },
    pump: {
      name: 'Diesel Engine Water Pump',
      description: "These Water pumps can be used to assist a flood in any area.",
      imageUrl: 'https://raw.githubusercontent.com/3egames/manila-sinking/main/docs/assets/cards/6.png'
    },
    flood: {
      name: 'Flood Gates Crashed!',
      description: "Water pours as one of the flood gates gets destroyed.",
      imageUrl: ''
    },
  },
  areas: {
    tondo: {
      name: 'Tondo',
      description: '',
      imageUrl: ''
    },
    santacruz: {
      name: 'Sta. Cruz',
      description: '',
      imageUrl: ''
    },
    binondo: {
      name: 'Binondo',
      description: '',
      imageUrl: ''
    },
    sannicolas: {
      name: 'San Nicolas',
      description: '',
      imageUrl: ''
    },
    sampaloc: {
      name: 'Sampaloc',
      description: '',
      imageUrl: ''
    },
    quiapo: {
      name: 'Quiapo',
      description: '',
      imageUrl: ''
    },
    sanmiguel: {
      name: 'San Miguel',
      description: '',
      imageUrl: ''
    },
    stamesa: {
      name: 'Sta. Mesa',
      description: '',
      imageUrl: ''
    },
    portarea: {
      name: 'Port Area',
      description: '',
      imageUrl: ''
    },
    intramuros: {
      name: 'Intramuros',
      description: '',
      imageUrl: ''
    },
    ermita: {
      name: 'Ermita',
      description: '',
      imageUrl: ''
    },
    malate: {
      name: 'Malate',
      description: '',
      imageUrl: ''
    },
    paco: {
      name: 'Paco',
      description: '',
      imageUrl: ''
    },
    pandacan: {
      name: 'Pandacan',
      description: '',
      imageUrl: ''
    },
    staana: {
      name: 'Sta. Ana',
      description: '',
      imageUrl: ''
    },
    sanandres: {
      name: 'San Andres',
      description: '',
      imageUrl: ''
    },
    divisoria: {
      name: 'Divisoria',
      description: '',
      imageUrl: ''
    },
    chinatown: {
      name: 'Chinatown',
      description: '',
      imageUrl: ''
    },
    universitybelt: {
      name: 'University Belt',
      description: '',
      imageUrl: ''
    },
    malacanang: {
      name: 'Malacanang',
      description: '',
      imageUrl: ''
    },
    cityhall: {
      name: 'City Hall',
      description: '',
      imageUrl: ''
    },
    nationalmuseum: {
      name: 'National Museum',
      description: '',
      imageUrl: ''
    },
    rizalmemorial: {
      name: 'Rizal Memorial',
      description: '',
      imageUrl: ''
    },
    philippinenavy: {
      name: 'Philippine Navy',
      description: '',
      imageUrl: ''
    },
  }
}
export default CardTypes