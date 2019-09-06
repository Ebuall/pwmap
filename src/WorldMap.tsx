import React from "react";
import { useSnackbar } from "notistack";
import Tooltip from "@material-ui/core/Tooltip";
import { Point } from "./data";

// const p1 = "125 236"; // 315 598
// const p2 = "167 278"; // 344 569
// const x0 = 229;
// const y0 = 761;
const r = 0.69;

const PointComponent: React.FC<{ value: Point }> = ({ value }) => {
  const [state, setState] = React.useState(false);
  const s = useSnackbar();
  const active = Number(state);
  const title = Point.show(value);
  return (
    <Tooltip title={title}>
      <div
        style={{
          background: "yellow",
          border: "1px solid black",
          borderRadius: 1,
          position: "absolute",
          cursor: "pointer",
          height: 7 + 4 * active,
          width: 7 + 4 * active,
          left: 229 + value.x * r - 2 * active,
          top: 761 - value.y * r - 2 * active,
        }}
        onMouseEnter={() => setState(true)}
        onMouseLeave={() => setState(false)}
        onClick={() => {
          navigator.clipboard.writeText(title);
          s.enqueueSnackbar("Copied " + title, {
            autoHideDuration: 1500,
            resumeHideDuration: 200,
          });
        }}
      ></div>
    </Tooltip>
  );
};

export const WorldMap: React.FC<{ points: Point[] }> = ({ points }) => {
  return (
    <div style={{ position: "relative" }}>
      <img
        src="http://www.pwdatabase.com/images/maps/ru/world.jpg"
        alt="world-map"
      />
      {points.map((p, i) => (
        <PointComponent value={p} key={"" + p.x + p.y + p.z} />
      ))}
    </div>
  );
};
