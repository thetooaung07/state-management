import { createContext, useContext, useEffect, useState } from "react";
import { IPokemon } from "./CustomHookReview";

function PokemonSource() {
  const [pokemons, setPokemons] = useState<IPokemon[]>();
  type PokemonState = {
    pokemons: IPokemon[];
  };

  type PokemonAction =
    | { type: "setPokemon"; payload: IPokemon[] }
    | { type: "setSearch"; payload: string };

  //   const [state, dispatch] = useReducer(
  //     (state: PokemonState, action: PokemonAction) => {
  //       switch (action.type) {
  //         case "setPokemon":
  //           return { ...state, pokemons: action.payload };
  //         case "setSearch":
  //           return { ...state, search: action.payload };
  //       }
  //     },
  //     {
  //       pokemons: [],
  //       searchResult: "",
  //     }
  //   );

  useEffect(() => {
    fetch("/pokemon.json")
      .then((response) => response.json())
      .then((data) => setPokemons(data));
  }, []);

  return { pokemons };
}

const PokemonContext = createContext<ReturnType<typeof PokemonSource>>(
  {} as unknown as ReturnType<typeof PokemonSource>
);

export const usePokemon = () => {
  return useContext(PokemonContext);
};

export const PokemonProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <PokemonContext.Provider value={PokemonSource()}>
      {children}
    </PokemonContext.Provider>
  );
};
