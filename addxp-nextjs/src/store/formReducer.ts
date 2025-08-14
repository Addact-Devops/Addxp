const initialState = {
    isOpen: false,
  };
  
  const formReducer = (state = initialState, action: any) => {
    switch (action.type) {
      case "SHOW_FORM":
        return { ...state, isOpen: true };
      case "HIDE_FORM":
        return { ...state, isOpen: false };
      default:
        return state;
    }
  };
  
  export default formReducer;