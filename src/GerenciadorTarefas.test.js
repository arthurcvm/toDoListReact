import React from "react";
import ReactDOM from "react-dom";
import GerenciadorTarefas from "./GerenciadorTarefas";

test("Deve redenrizar o projeto sem erros", () => {
  const div = document.createElement("div");
  ReactDOM.render(<GerenciadorTarefas />, div);
  ReactDOM.unmountComponentAtNode(div);
});
