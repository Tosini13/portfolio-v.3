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
import { autorun } from "mobx";

const MainContainer = styled.div`
  background-color: ${mainTheme.palette.primary.dark};
`;

function App() {
  const [expanded, setExpanded] = useState<boolean>(false);
  const location = useLocation();

  const handleScroll = (e: Event) => {
    const y = window.pageYOffset;
    if (y > 400) {
      setExpanded(true);
    }
    if (y <= 400) {
      setExpanded(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  return (
    <MainContainer>
      <div style={{ width: expanded ? "80%" : "z0%", margin: "auto" }}>
        <Body expanded={expanded} />
        <AboutMe key={LocationConst.aboutMe} />
        <Skills key={LocationConst.skills} />
        <Technologies key={LocationConst.technologies} />
        <Projects key={LocationConst.projects} />
      </div>
    </MainContainer>
  );
}

export default App;
