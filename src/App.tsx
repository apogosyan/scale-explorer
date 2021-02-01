import Layout from "./components/Layout";
import Explorer from "./components/Explorer";
import { chromaticScale } from "./theory";

console.log("Chromatic", chromaticScale);

function App() {
  return (
    <Layout>
      <Explorer />
    </Layout>
  );
}

export default App;
