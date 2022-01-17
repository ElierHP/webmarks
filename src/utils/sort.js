//Sort state by name - ascending order
export const sortByName = (state, order) => {
  const newArray = state.sort((a, b) => {
    //Sort array: folders first, links second
    let typeA = a.type === "folder" ? 1 : -1;
    let typeB = b.type === "folder" ? 1 : -1;
    if (typeA < typeB) return +1;
    if (typeA > typeB) return -1;

    let nameA = a.title.toUpperCase();
    let nameB = b.title.toUpperCase();
    //Sort array: ascending order
    if (order === "asc") {
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    }
    //Sort array: descending order
    else if (order === "desc") {
      if (nameA < nameB) return 1;
      if (nameA > nameB) return -1;
      return 0;
    }
  });
  return newArray;
};
