import { createContext } from 'react'

const AppContext = createContext();

// export const AppContextProvider = (props) => {
//     const [state, setState] = useState(initState);

//     const setAppContext = (appContext) => {
//       console.log(state);
//       setState({ ...state, ...appContext });
//     };

//     return (
//       <AppContext.Provider value={{ ...state, setAppContext }}>
//         {props.children}
//       </AppContext.Provider>
//     );
//   };

export default AppContext;