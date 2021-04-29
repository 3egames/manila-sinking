export interface CardType {
  name: string;
  description: string;
  imageUrl?: string;
}

interface CardTypesStruct {
  discover: Record<string, CardType>;
  areas: Record<string, CardType>;
}

const CardTypes: CardTypesStruct = {
  discover: {
    engine: {
      name: 'Special Engine Part',
      description: "An engine part used to complete the pump engine.",
      imageUrl: ''
    },
    fuel: {
      name: 'Special Grade Fuel',
      description: "Collect 4 of this in order to run the engine.",
      imageUrl: ''
    },
    battery: {
      name: 'Nuclear Power Cell',
      description: "Collect 4 of this in order to power up the system.",
      imageUrl: ''
    },
    tools: {
      name: 'S-Grade Tool',
      description: "Locate 4 special unique tools we need to fix the anti-flood control system.",
      imageUrl: ''
    },
    pump: {
      name: 'Diesel Engine Water Pump',
      description: "These Water pumps can be used to assist a flood in any area.",
      imageUrl: ''
    },
    jeepney: {
      name: 'Jeepney Ride',
      description: "Use these higly poluting relics to move 1 or more survivors on a tile to another.",
      imageUrl: ''
    },
    flood: {
      name: 'Flood Gates Crashed!',
      description: "Water pours as one of the flood gates gets destroyed.",
      imageUrl: ''
    },
  },
  areas: {
    sss: {
      name: 'Flood Gates Crashed!',
      description: "Water pours as one of the flood gates gets destroyed",
      imageUrl: ''
    },
  }
}

export default CardTypes