// includes function will return true on "" empty string

import { useQuery } from "@tanstack/react-query";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";

export interface IPokemon {
  id: number;
  name: string;
  type: string[];
  hp: number;
  attack: number;
  defense: number;
  special_attack: number;
  special_defense: number;
  speed: number;
}

function usePokemonSource(): {
  pokemons: IPokemon[];
  search: string;
  setSearch: (search: string) => void;
} {
  type PokemonState = {
    search: string;
  };

  const { data: pokemons } = useQuery<IPokemon[]>(
    ["pokemon"],
    () => fetch("/pokemon.json").then((res) => res.json()),
    { initialData: [] }
  );

  type PokemonAction = { type: "setSearch"; payload: string };
  const [{ search }, dispatch] = useReducer(
    (state: PokemonState, action: PokemonAction) => {
      switch (action.type) {
        case "setSearch":
          return { ...state, search: action.payload };
      }
    },
    {
      search: "",
    }
  );

  const setSearch = useCallback((search: string) => {
    dispatch({
      type: "setSearch",
      payload: search,
    });
  }, []);

  const filteredPokemons = useMemo(() => {
    return pokemons
      .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
      .slice(0, 20);
  }, [pokemons, search]);

  const sortedPokemons = useMemo(() => {
    return [...filteredPokemons].sort((a, b) => a.name.localeCompare(b.name));
  }, [filteredPokemons]);

  return { pokemons: sortedPokemons, search, setSearch };
}

export function usePokemon() {
  return useContext(PokemonContext);
}

const PokemonContext = createContext<ReturnType<typeof usePokemonSource>>(
  {} as unknown as ReturnType<typeof usePokemonSource>
);

export function PokemonProvider({ children }: { children: React.ReactNode }) {
  return (
    <PokemonContext.Provider value={usePokemonSource()}>
      {children}
    </PokemonContext.Provider>
  );
}
