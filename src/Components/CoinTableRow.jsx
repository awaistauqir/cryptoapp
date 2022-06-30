import { TableCell } from "@material-ui/core";
import React from "react";

const CoinTableRow = (props) => {
  return (
    <>
      <TableCell
        component={"th"}
        scope="row"
        style={{ display: "flex", gap: 15, alignItems: "center" }}
      >
        <img
          src={props.image}
          alt={props.imageAlt}
          height="50"
          style={{ marginBottom: 10 }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span style={{ textTransform: "uppercase" }}>{props.coinSymbol}</span>
          <span style={{ color: "darkgray" }}>{props.name}</span>
        </div>
      </TableCell>
      <TableCell align="right">
        {props.symbol} {props.price}
      </TableCell>
      <TableCell
        align="right"
        style={{ color: props.profit > 0 ? " rgb(14,203,129)" : "red" }}
      >
        {props.profit && "+"}
        {props.priceChange}%
      </TableCell>
      <TableCell align="right">
        {props.symbol} {props.marketCap} T
      </TableCell>
    </>
  );
};

export default CoinTableRow;
