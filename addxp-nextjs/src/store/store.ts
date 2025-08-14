import { createStore } from "redux";
import rootReducer from "./reducers"; // Create your root reducer

const store = createStore(rootReducer);

export default store;
