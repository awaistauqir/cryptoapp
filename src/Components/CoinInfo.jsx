import {
  CircularProgress,
  createTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { HistoricalChart } from "../config/api";
import { ChartDays } from "../config/ChartData";
import ChartButton from "./ChartButton";
const CoinInfo = (props) => {
  const [historicalData, setHistoricalData] = useState();
  const [days, setDays] = useState(1);
  const { currency } = useSelector((state) => state.currency);
  const fetchHistoricalData = async () => {
    const { data } = await axios.get(
      HistoricalChart(props.coin.id, days, currency)
    );

    setHistoricalData(data.prices);
  };
  useEffect(() => {
    fetchHistoricalData();
  }, [currency, days]);
  const theme = createTheme();
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });
  const useStyles = makeStyles(() => ({
    container: {
      width: "70%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 25,
      padding: 40,
      [theme.breakpoints.down("md")]: {
        width: "100%",
        marginTop: 0,
        padding: 20,
        paddingTop: 0,
      },
    },
    daysButtons: {
      display: "flex",
      marginTop: 20,
      justifyContent: "space-around",
      width: "100%",
    },
  }));
  const classes = useStyles();
  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.container}>
        {!historicalData ? (
          <CircularProgress
            style={{ color: "gold" }}
            size={250}
            thickness={1}
          />
        ) : (
          <>
            <Line
              data={{
                labels: historicalData?.map((coin) => {
                  let date = new Date(coin[0]);
                  let time = `${date
                    .getHours()
                    .toString()
                    .padStart(2, "0")} : ${date
                    .getMinutes()
                    .toString()
                    .padStart(2, "0")}`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),
                datasets: [
                  {
                    data: historicalData?.map((coin) => coin[1]),
                    label: `Price (Past ${days} Days) in ${currency}`,
                    borderColor: "#EEBC1D",
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />
          </>
        )}
        <div className={classes.daysButtons}>
          {ChartDays.map((day) => (
            <ChartButton
              key={day.value}
              onClick={() => {
                setDays(day.value);
              }}
              selected={day.value === days}
            >
              {day.label}
            </ChartButton>
          ))}
        </div>
      </div>
    </ThemeProvider>
  );
};

export default CoinInfo;
