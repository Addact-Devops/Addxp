import { combineReducers } from "redux";
import loaderReducer from "./loaderReducer"; // Import your loader reducer
import formReducer from "./formReducer";
import searchreducer from "./searchReducer";
// Import other reducers as needed

const rootReducer = combineReducers({
   loader: loaderReducer,
   form: formReducer,
   searchKeyword: searchreducer,
   // Add other reducers here
});

export default rootReducer;
