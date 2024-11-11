import { useEffect, useState } from "react";
import "./Weather.css";
import moment, { locale } from "moment";
import Button from "@mui/material/Button";
import React from "react";
import { useTranslation } from "react-i18next";
import CircularProgress from "@mui/material/CircularProgress";
import CloudIcon from "@mui/icons-material/Cloud";
import { useSelector, useDispatch } from "react-redux";
import { fetchWeather } from "../features/weather/weatherSlice";
import "moment/locale/ar"; // Import the Arabic locale

moment.locale("en");

export default function WeatherCard() {
  const dispatch = useDispatch();

  // Accessing weather state correctly
  const temp = useSelector((state) => state.Weather.weather);
  const isLoading = useSelector((state) => state.Weather.isLoading);
  const error = useSelector((state) => state.Weather.error);

  const { t, i18n } = useTranslation();
  const [locale, setlocale] = useState("en");
  function changeLanguage() {
    if (locale === "en") {
      setlocale("ar");
      i18n.changeLanguage("ar");
      moment.locale("ar");
    } else {
      setlocale("en");
      i18n.changeLanguage("en");
      moment.locale("en");
    }
    setTimeDate(moment().format("MMMM Do YYYY, h:mm:ss a"));
  }

  const [timeDate, setTimeDate] = useState("");

  useEffect(() => {
    setTimeDate(moment().format("MMMM Do YYYY, h:mm:ss a"));
    dispatch(fetchWeather());
  }, [dispatch]);
  return (
    <>
      <div
        className="weather-container"
        dir={locale === "ar" ? "rtl" : "ltr"}
        style={{ textAlign: locale === "ar" ? "right" : "left" }}
      >
        <header className="weather-header">
          <h1>{t("بوبال")}</h1>
          <p>{t(timeDate)}</p>
          <hr className="weather-divider" />
        </header>

        <section className="weather-details">
          <div className="weather-summary">
            <div className="temperature-info">
              {isLoading ? <CircularProgress style={{ color: "white" }} /> : ""}
              <h2 className="temperature">{temp.number}</h2>
              <img src={temp.icon} alt="Weather Icon" />
            </div>
            <h4 className="weather-description">{t(temp.description)}</h4>

            <div className="temperature-range">
              <div className="min-temp">
                <h3>{t("Min")}</h3>
                <h3>{temp.min}</h3>
              </div>
              <div className="max-temp">
                <h3>{t("Max")}</h3>
                <h3>{temp.max}</h3>
              </div>
            </div>
          </div>

          <div className="weather-image">
            <CloudIcon sx={{ fontSize: "150px", color: "white" }} />
          </div>
        </section>
      </div>
      <Button
        variant="text"
        style={{
          color: "white",
          fontSize: "22px",
          background: "black",
          marginTop: "7px",
        }}
        onClick={changeLanguage}
      >
        {i18n.language === "ar" ? "انجليزي" : "ِArabic"}
      </Button>
    </>
  );
}
