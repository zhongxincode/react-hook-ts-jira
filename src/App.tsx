import React from "react"

import './App.css';
import { ProjectListScreen } from 'screens/project-list';
import { GenericUseArray } from "works/generic-useArray";
import { LoginScreen } from "screens/login";

function App() {
  return (
    <div className="App">
      {/* <ProjectListScreen /> */}
      {/* <GenericUseArray /> */}
      <LoginScreen />
    </div>
  );
}

export default App;
