import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import React from "react";
import { matTypes } from "./data";
import { Button } from "@material-ui/core";

// const allTypes = matTypes.flat();

type State = string[];
export const Options: React.FC<{
  state: State;
  setState: React.Dispatch<State>;
}> = ({ state, setState }) => {
  function setTag(tag: string, b: boolean) {
    if (b) {
      setState(state.concat(tag));
    } else {
      setState(state.filter(t => t !== tag));
    }
  }
  // const allSelected = state.length === allTypes.length;

  return (
    <div>
      <h1>Show</h1>
      {/* <FormControlLabel
        label="All"
        control={
          <Checkbox
            checked={!!state.length}
            value="All"
            indeterminate={!!state.length && !allSelected}
            onChange={() => (allSelected ? setState([]) : setState(allTypes))}
          />
        }
      ></FormControlLabel> */}
      {matTypes.map((l, i) => (
        <div key={i}>
          {l.map(t => (
            <FormControlLabel
              key={t}
              label={t}
              control={
                <Checkbox
                  checked={state.includes(t)}
                  value={t}
                  onChange={(_e, v) => setTag(t, v)}
                />
              }
            ></FormControlLabel>
          ))}
        </div>
      ))}
      <Button onClick={() => setState([])}>Reset</Button>
      {/* <pre>{JSON.stringify(state, null, 2)}</pre> */}
    </div>
  );
};
