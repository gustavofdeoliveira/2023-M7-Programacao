import React from "react";
import Menu from "./components/Menu/Menu";
import TasksSection from "./components/TasksSection/TasksSection";
import ModalCreateTask from "./components/Utilities/ModalTask";
import ModalLogin from "./components/Utilities/ModalLogin";
import { Task } from "./interfaces";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { modalActions } from "./store/Modal.store";
import { tasksActions } from "./store/Tasks.store";
import { getAuthenticationToken } from "./components/Service/auth";
import { getTasks } from "./components/Service/task";

const App: React.FC = () => {
  const [token, setToken] = React.useState<string>("");
  const dispatch = useAppDispatch();

  const loadToken = async (email: string, password:string) => {
    const token = await getAuthenticationToken(email ,password);
    if(token.token){
      setToken(token.token);
      localStorage.setItem("token", token.token);
      const {task} = await getTasks(token.token)
      dispatch(tasksActions.setTasks(task));
      return token.token;
    }
  };

  React.useEffect(() => {
    if (token) {
    localStorage.setItem("token", token);
    dispatch(modalActions.closeModalLogin());
  
    } 
  });
  

  const modal = useAppSelector((state) => state.modal);


  const closeModalCreateTask = () => {
    dispatch(modalActions.closeModalCreateTask());
  };
  const closeModalLogin = () => {};

  const createNewTaskHandler = (task: Task) => {
    dispatch(tasksActions.addNewTask(task));
  };

  return (  
    
    <div>
      {!token &&  (
      <ModalLogin onClose={closeModalLogin} nameForm={"Login"} onConfirm={loadToken}                 />
      )}
      <div className="bg-slate-200 min-h-screen text-slate-600 flex dark:bg-slate-900 dark:text-slate-400 xl:text-base sm:text-sm text-xs">
      {modal.modalCreateTaskOpen && (
        <ModalCreateTask
          onClose={closeModalCreateTask}
          nameForm="Add a task"
          onConfirm={createNewTaskHandler}
        />
      )}
      <Menu />
      <TasksSection />
      </div>
    </div>
  );
};

export default App;
