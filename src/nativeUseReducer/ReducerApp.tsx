/* Use Reducer - use when manage the complex state */

import { useReducer } from "react";

export const ReducerApp = () => {
  const [state, dispatch] = useReducer(
    (state: any, action: { type: any; payload: any }) => {
      switch (action.type) {
        case "SET_NAME": {
          return { ...state, name: action.payload };
        }
        case "ADD_NAME": {
          return {
            ...state,
            names: [...state.names, state.name],
            name: "",
          };
        }
      }
    },
    {
      names: [],
      name: "",
    }
  );
  return (
    <div>
      <div>
        {state.names.map((name: any, index: number) => (
          <div key={index}>{name}</div>
        ))}
      </div>

      <input
        type="text"
        value={state.name}
        onChange={(e) =>
          dispatch({ type: "SET_NAME", payload: e.target.value })
        }
      />
      <button onClick={() => dispatch({ type: "ADD_NAME", payload: "" })}>
        Add Name
      </button>
      <div>Name - {state.name}</div>
    </div>
  );
};
