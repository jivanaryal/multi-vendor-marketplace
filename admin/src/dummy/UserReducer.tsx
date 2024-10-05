import { useReducer } from "react"




function reducer(state, action) {
    switch (action.type) {
        case "incr":
            return { ...state, count: state.count + 1 };
        case "dcr":
            return { ...state, count: state.count - 1 };
        default:
            return "unrecognized command";
      }
}

const initialState = {
    count:0
}


const UserReducer = () => {
    const [state, dispatch] = useReducer(reducer, initialState);


    const handleInr = () => {
        dispatch({ type: "incr" });
    }
    const handleDcr = () => {
        dispatch({ type: "dcr" });
    }
  return (
      <div>
          <h1>count =  {state.count}</h1>
          <button onClick={handleInr} >increment</button> <br /> <br />
          <button onClick={handleDcr}>decrement</button>
    </div>
  )
}

export default UserReducer