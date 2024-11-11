import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchWeather = createAsyncThunk(
  "weather/fetchWeather",
  async (_, { rejectWithValue }) => {
    try {
      const controller = new AbortController();
      const signal = controller.signal;

      // Fetch weather data
      const response = await axios.get(
        "https://api.openweathermap.org/data/2.5/weather?lat=23.25&lon=77.41&appid=a07a758dec9aa0ab6b0311077f88e78c",
        { signal }
      );

      // Parse and convert temperatures
      const responseTemp = Math.round(response.data.main.temp - 273.15); // Correct conversion
      const min = Math.round(response.data.main.temp_min - 273.15);
      const max = Math.round(response.data.main.temp_max - 273.15);
      const description = response.data.weather[0].description;
      const responseIcon = response.data.weather[0].icon;

      return {
        number: responseTemp,
        min,
        max,
        description,
        icon: `https://openweathermap.org/img/wn/${responseIcon}@2x.png`,
      };
    } catch (e) {
      console.error("Error fetching weather data: ", e);
      return rejectWithValue(e.response?.data || "Error fetching weather data");
    }
  }
);

export const weatherSlice = createSlice({
  name: "Weather",
  initialState: {
    result: "empty",
    weather: {},
    isLoading: false,
    error: null,
  },
  reducers: {
    changeResult: (currentState, action) => {
      currentState.result = "hello from the slice";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchWeather.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log("============**********");

        console.log(state, action);
        state.weather = action.payload;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

// Action creators are generated for each case reducer function
export const { changeResult } = weatherSlice.actions;

export default weatherSlice.reducer;
