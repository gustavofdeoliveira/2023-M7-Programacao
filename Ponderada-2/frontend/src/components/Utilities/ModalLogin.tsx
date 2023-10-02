import React, { useState } from "react";
import Modal from "./Modal";

const ModalCreateTask: React.FC<{
  onClose: () => void;

  nameForm: string;
  onConfirm: (email:string, password: string) => void;
}> = ({ onClose, nameForm, onConfirm }) => {
    
  const [emailLogin, setEmail] = useState<string>();
  const [passworLogin, setPassword] = useState<string>();


  const emailLoginRef = React.useRef<HTMLInputElement>(null);
  const passwordLoginRef = React.useRef<HTMLInputElement>(null);



  const loginHandler = (event: React.FormEvent): void => {
    event.preventDefault();

    const emailLogin = emailLoginRef.current!.value || "";
    const passwordLogin = passwordLoginRef.current!.value || "";


      
    onConfirm(emailLogin, passwordLogin);
    onClose();
    
  };
  return (
    <Modal onClose={onClose} title={nameForm}>
      <form
        className="flex flex-col stylesInputsField"
        onSubmit={loginHandler}
      >
        <label>
          E-mail
          <input
            type="text"
            ref={emailLoginRef}
            placeholder="E-mail"
            required
            value={emailLogin}
            onChange={({ target }) => setEmail(target.value)}
            className="w-full"
          />
        </label>
        <label>
          Password
          <input
            type="text"
            ref={passwordLoginRef}
            placeholder="Password"
            required
            value={passworLogin}
            onChange={({ target }) => setPassword(target.value)}
            className="w-full"
          />
        </label>
        
        <button type="submit" className="btn mt-5">
          {nameForm}
        </button>
      </form>
    </Modal>
  );
};

export default ModalCreateTask;
