import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import { SnackbarProvider } from "notistack";
import React from "react";
import { Options } from "./Options";
import { WorldMap } from "./WorldMap";
import data from "./data.json";
import { matTypes } from "./data";
import flatMap from "lodash/flatMap";

const App: React.FC = () => {
  const [options, setOptions] = React.useState<string[]>(matTypes[2]);
  const filtered = flatMap(
    Object.entries(data).filter(([k, _v]) => options.includes(k)),
    ([_k, v]) => v,
  );
  return (
    <>
      <CssBaseline />
      <SnackbarProvider maxSnack={3}>
        <div className="App">
          <h1 style={{ textAlign: "center" }}>Interactive pw map</h1>
          <Grid container justify="space-evenly">
            <Grid item>
              <Options state={options} setState={setOptions} />
            </Grid>
            <Grid item>
              <WorldMap points={filtered} />
            </Grid>
          </Grid>
        </div>
      </SnackbarProvider>
    </>
  );
};

export default App;
