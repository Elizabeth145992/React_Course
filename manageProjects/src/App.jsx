import { useState } from "react";

import ProjectsSideBar from "./components/ProjectsSideBar";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";


function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
     projects: [],
  });

  function hanldAddProject() {
    setProjectsState((prevState) => ({
      ...prevState,
      selectedProjectId: null,
    }));
  }

  let content;
  if (projectsState.selectedProjectId === null) {
    content = <NewProject />;
  } else if(projectsState.selectedProjectId === undefined){
    content = <NoProjectSelected addProject={hanldAddProject} />;
  }
  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSideBar addProject={hanldAddProject} />
      {content}
    </main>
  );
}

export default App;
