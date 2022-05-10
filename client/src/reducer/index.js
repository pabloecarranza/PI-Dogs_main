const intialState = {
  dogs: [],
  temperaments: [],
  alldogs: [],
  detail: [],
};

export default function rootReducer(state = intialState, action) {
  switch (action.type) {
    case "GET_DOGS":
      return {
        ...state,
        dogs: action.payload,
        alldogs: action.payload,
      };

    case "GET_TEMPERAMENTS_LIST":
      return {
        ...state,
        temperaments: action.payload,
      };
    case "GET_DOGS_BY_TEMP":
      return {
        ...state,
        dogs: action.payload,
      };
    case "GET_DOGS_BY_NAME":
      return {
        ...state,
        dogs: action.payload,
      };
    case "FILTER_CREATED":
      const dogsCatch = state.alldogs;
      const allDos =
        action.payload === "created"
          ? state.dogs.filter((dog) => dog.created)
          : state.dogs.filter((dog) => !dog.created);
      return {
        ...state,
        dogs: action.payload === "all" ? dogsCatch : allDos,
      };
    case "POST_CHARACTER":
      return {
        ...state,
      };
    case "GET_DETAILS":
      return {
        ...state,
        detail: action.payload,
      };
    case "RESET_DETAIL":
      return {
        ...state,
        detail: [],
      };
    case "ORDER_BY_NAME":
      let sortedArr =
        action.payload === "asc"
          ? state.dogs.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : state.dogs.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        dogs: sortedArr,
      };
    default:
      return state;
  }
}
