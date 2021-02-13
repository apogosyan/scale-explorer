import { createContext, useState } from "react";
import { Layout } from "./components/Layout";
import { Explorer } from "./components/Explorer";

export const InstrumentContext = createContext({
  currentInstrument: "chromaboard",
  setCurrentInstrument: (instrument: string) => {},
});

function App() {
  const [currentInstrument, setCurrentInstrument] = useState("chromaboard");
  const setter = (instrument: string) => setCurrentInstrument(instrument);

  const context = { currentInstrument, setCurrentInstrument: setter };

  return (
    <InstrumentContext.Provider value={context}>
      <Layout>
        <Explorer />
      </Layout>
    </InstrumentContext.Provider>
  );
}

export default App;
