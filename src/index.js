import React from "react";
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";

import { StateProvider } from "providers/StateProvider";
import reducer from "reducers/state_reducer";


const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Router>
      <StateProvider reducer={reducer}>
        <App />
      </StateProvider>
    </Router>
  </React.StrictMode>
);
