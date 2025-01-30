import { configureStore } from '@reduxjs/toolkit'; // Import configureStore
import reducer from './reducer/reducers';

// Create the Redux store using Redux Toolkit
const store = configureStore({
  reducer: reducer,
});

export default store;
