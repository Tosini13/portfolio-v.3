import React, { useEffect, useMemo, useState } from "react";

import styled from "styled-components";

import { mainTheme } from "./styled/config";
import AboutMe from "./components/main/aboutMe";
import Technologies from "./components/main/technologies";
import Skills from "./components/main/skills";
import { useLocation } from "react-router-dom";
import { LocationConst } from "./models/const";
import Projects from "./components/main/projects";
import Body from "./components/main/Body";

const isBrowser = typeof window !== `undefined`;

function App() {
  const [expanded, setExpanded] = useState<boolean>(false);
  const location = useLocation();

  const handleScroll = () => {
    const y = document?.getElementById("main-container")?.scrollTop;
    console.log(y);
    if (!expanded && y && y > 400) {
      setExpanded(true);
    }
    if (expanded && y && y < 400) {
      setExpanded(false);
    }
  };

  return (
    <Body expanded={expanded} handleScroll={handleScroll}>
      <div id="mainContainer">
        <AboutMe key={LocationConst.aboutMe} />
        <Skills key={LocationConst.skills} />
        <Technologies key={LocationConst.technologies} />
        <Projects key={LocationConst.projects} />
      </div>
    </Body>
  );
}

export default App;
