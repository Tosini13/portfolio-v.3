import React from "react";

import styled from "styled-components";

import { mainTheme } from "./styled/config";
import SideBar from "./components/menu/SideBar";
import AboutMe from "./components/main/aboutMe";
import Technologies from "./components/main/technologies";
import Skills from "./components/main/skills";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { LocationConst } from "./models/const";
import Projects from "./components/main/projects";

const Body = styled.div`
  display: flex;
  background-color: ${mainTheme.palette.secondary.main};
  height: 100vh;
  overflow: hidden;
`;
const Main = styled.main`
  flex-grow: 1;
`;

function App() {
  return (
    <BrowserRouter>
      <Body>
        <SideBar />
        <Main>
          <Switch>
            <Route exact path={LocationConst.aboutMe} component={AboutMe} />
            <Route path={LocationConst.skills} component={Skills} />
            <Route path={LocationConst.technologies} component={Technologies} />
            <Route path={LocationConst.projects} component={Projects} />
          </Switch>
        </Main>
      </Body>
    </BrowserRouter>
  );
}

export default App;
