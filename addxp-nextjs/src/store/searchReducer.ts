// Initial state
const initialState = {
   keyword: "",
};

// Reducer function
const searchreducer = (state = initialState, action: any) => {
   switch (action.type) {
      case "SET_KEYWORD":
         return {
            ...state,
            keyword: action.payload,
         };
      default:
         return state;
   }
};
export default searchreducer;
