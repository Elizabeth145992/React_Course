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

  function handleCancel() {
    setProjectsState((prevState) => ({
      ...prevState,
      selectedProjectId: undefined,
    }));
  }

  function handleAdd(projectData) {
    setProjectsState(prevState => {
      const idProject = crypto.randomUUID();
      const newProject ={
        ...projectData,
        id: idProject,
      }

      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject],
      }
    });
  }
console.log('PROJECTSTATE: ',projectsState);
  let content;
  if (projectsState.selectedProjectId === null) {
    content = <NewProject onAdd={handleAdd} onCancel={handleCancel} />;
  } else if(projectsState.selectedProjectId === undefined){
    content = <NoProjectSelected addProject={hanldAddProject} />;
  }
  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSideBar addProject={hanldAddProject} projects={projectsState.projects}/>
      {content}
    </main>
  );
}

export default App;
