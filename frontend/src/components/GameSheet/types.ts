interface Game {
  title: string;
  visual: string;
  description: string;
  minplayers: string;
  maxplayers: string;
  idealplayers: string;
  duration: string;
  confrontation: string;
  _id: string;
  userId: string;
}

export type Games = Game[];
