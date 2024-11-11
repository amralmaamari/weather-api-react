import { configureStore } from "@reduxjs/toolkit";
import weatherSlice from "../features/weather/weatherSlice";
export default configureStore({
  reducer: {
    Weather: weatherSlice,
  },
});
