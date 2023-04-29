// // includes function will return true on "" empty string

// import {
//   createContext,
//   useCallback,
//   useContext,
//   useEffect,
//   useMemo,
//   useReducer,
// } from "react";

// export interface IPokemon {
//   id: number;
//   name: string;
//   type: string[];
//   hp: number;
//   attack: number;
//   defense: number;
//   special_attack: number;
//   special_defense: number;
//   speed: number;
// }

// function usePokemonSource(): {
//   pokemons: IPokemon[];
//   search: string;
//   setSearch: (search: string) => void;
// } {
//   type PokemonState = {
//     pokemons: IPokemon[];
//     search: string;
//   };

//   type PokemonAction =
//     | { type: "setPokemon"; payload: IPokemon[] }
//     | { type: "setSearch"; payload: string };
//   const [{ pokemons, search }, dispatch] = useReducer(
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
//       search: "",
//     }
//   );

//   useEffect(() => {
//     fetch("/pokemon.json")
//       .then((response) => response.json())
//       .then((data) =>
//         dispatch({
//           type: "setPokemon",
//           payload: data,
//         })
//       );
//   }, []);

//   const setSearch = useCallback((search: string) => {
//     dispatch({
//       type: "setSearch",
//       payload: search,
//     });
//   }, []);

//   const filteredPokemons = useMemo(() => {
//     return pokemons
//       .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
//       .slice(0, 20);
//   }, [pokemons, search]);

//   const sortedPokemons = useMemo(() => {
//     return [...filteredPokemons].sort((a, b) => a.name.localeCompare(b.name));
//   }, [filteredPokemons]);

//   return { pokemons: sortedPokemons, search, setSearch };
// }

// export function usePokemon() {
//   return useContext(PokemonContext);
// }

// const PokemonContext = createContext<ReturnType<typeof usePokemonSource>>(
//   {} as unknown as ReturnType<typeof usePokemonSource>
// );

// export function PokemonProvider({ children }: { children: React.ReactNode }) {
//   return (
//     <PokemonContext.Provider value={usePokemonSource()}>
//       {children}
//     </PokemonContext.Provider>
//   );
// }
