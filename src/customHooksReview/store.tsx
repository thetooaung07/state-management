import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { IPokemon } from "./CustomHookReview";

type PokemonState = {
  pokemons: IPokemon[];
  search: string;
};

type PokemonAction =
  | { type: "setPokemon"; payload: IPokemon[] }
  | { type: "setSearch"; payload: string };

const pokemonReducer = (state: PokemonState, action: PokemonAction) => {
  switch (action.type) {
    case "setPokemon":
      return { ...state, pokemons: action.payload };
    case "setSearch":
      return { ...state, search: action.payload };
    default:
      return state;
  }
};

function PokemonSource() {
  const [{ pokemons, search }, dispatch] = useReducer(pokemonReducer, {
    pokemons: [],
    search: "",
  });

  useEffect(() => {
    fetch("/pokemon.json")
      .then((response) => response.json())
      .then((data) => dispatch({ type: "setPokemon", payload: data }));
  }, []);

  const filteredPokemons = useMemo(() => {
    return pokemons.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [pokemons, search]);

  const setSearch = useCallback((searchResult: string) => {
    dispatch({
      type: "setSearch",
      payload: searchResult,
    });
  }, []);

  return { pokemons: filteredPokemons, search, setSearch };
}

const PokemonContext = createContext(
  {} as unknown as ReturnType<typeof PokemonSource>
);

export function usePokemon() {
  return useContext(PokemonContext);
}

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
