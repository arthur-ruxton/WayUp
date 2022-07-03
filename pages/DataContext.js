import { createContext } from 'react';
export const DataContext = createContext(null)

// this is done in it's own file simply to keep other files
// clean and readable. Reacts 'createContext' allows you 
// to make data available to many components without passing 
// it as props through every level of the tree. 
// Read more about createContext here https://reactjs.org/docs/context.html