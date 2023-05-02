import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";

const initialTasks: ITask[] = [
  { id: 0, text: "Visit Kafka Museum", done: true },
  { id: 1, text: "Watch a puppet show", done: false },
  { id: 2, text: "Lennon Wall pic", done: false },
];
type ITask = {
  id: number;
  text: string;
  done: boolean;
};

type TasksState = {
  tasks: ITask[];
  search: string;
};
type TaskAction =
  | { type: "init"; payload: ITask[] }
  | { type: "add"; payload: ITask }
  | { type: "search"; payload: string }
  | { type: "update"; payload: ITask }
  | { type: "delete"; payload: number };

const taskReducer = (state: TasksState, action: TaskAction): TasksState => {
  switch (action.type) {
    case "init":
      return { tasks: action.payload, search: "" };
    case "add":
      return { tasks: [...state.tasks, action.payload], search: "" };
    case "search":
      return { ...state, search: action.payload };
    case "update":
      return {
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task
        ),
        search: state.search,
      };
    case "delete":
      return {
        tasks: state.tasks.filter((el) => el.id !== action.payload),
        search: state.search,
      };
  }
};

const TaskSource = () => {
  const [{ tasks, search }, dispatch] = useReducer(taskReducer, {
    tasks: [],
    search: "",
  });

  useEffect(() => {
    dispatch({ type: "init", payload: initialTasks });
  }, []);

  const setSearch = useCallback((searchResult: string) => {
    dispatch({
      type: "search",
      payload: searchResult,
    });
  }, []);

  const filterTaskResult = useMemo(() => {
    return tasks.filter((el) =>
      el.text.toLowerCase().includes(search.toLowerCase())
    );
  }, [tasks, search]);

  /// define dispatch function here!!!

  return { tasks: filterTaskResult, search, setSearch, dispatch };
};

export const TaskContext = createContext(
  {} as unknown as ReturnType<typeof TaskSource>
);

const useTaskHook = () => {
  return useContext(TaskContext);
};

const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <TaskContext.Provider value={TaskSource()}>{children}</TaskContext.Provider>
  );
};

export const ToDoApp = () => {
  return (
    <TaskProvider>
      <div className="max-w-lg mx-auto">
        <SearchInput></SearchInput>
        <TaskList></TaskList>
      </div>
    </TaskProvider>
  );
};

export const SearchInput = () => {
  const { search, setSearch } = useTaskHook();
  return (
    <div>
      <label htmlFor="">Search from Tasks</label>

      <input
        className="mt-3 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-800 focus:ring-indigo-800 sm:text-lg p-2"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

export const TaskList = () => {
  const { tasks } = useTaskHook();

  return (
    <div>
      {tasks.map((el) => (
        <TaskItem key={el.id} {...el} />
      ))}
    </div>
  );
};

export const TaskItem = ({ id, done, text }: ITask) => {
  const { dispatch } = useTaskHook();
  const [editMode, setEditMode] = useState(false);
  return (
    <div className="flex items-center">
      <div className="px-2 my-4"></div>
      <input
        type="checkbox"
        checked={done}
        onChange={(e) =>
          dispatch({
            type: "update",
            payload: { id, text, done: e.target.checked },
          })
        }
      />
      <div className="px-2 my-4"></div>
      {editMode ? (
        <input
          className="mt-3 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-800 focus:ring-indigo-800 sm:text-lg p-2"
          placeholder="Search"
          value={text}
          onChange={(e) =>
            dispatch({
              type: "update",
              payload: { id, done, text: e.target.value },
            })
          }
        />
      ) : (
        <h5>{text}</h5>
      )}
      {editMode ? (
        <button
          className="bg-slate-400 mx-2 my-4 px-2 rounded-sm"
          onClick={() => {
            setEditMode(false);
          }}
        >
          Save
        </button>
      ) : (
        <button
          className="bg-slate-400 mx-2 my-4 px-2 rounded-sm"
          onClick={() => {
            setEditMode(true);
          }}
        >
          Edit
        </button>
      )}
      <button
        className="bg-red-500 mx-2 my-4 px-2 rounded-sm"
        onClick={() => dispatch({ type: "delete", payload: id })}
      >
        delete
      </button>
    </div>
  );
};
