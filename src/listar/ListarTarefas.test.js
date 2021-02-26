import React from "react";
import ReactDOM from "react-dom";
import ListarTarefas from "./ListarTarefas";
import Tarefa from "../models/Tarefa.model";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

describe.skip("Teste do componente de listagem de tarefas", () => {
  const nomePrimmeiraTarefa = "Primeira tarefa";
  const nomeSegundaTarefa = "Segunda tarefa";
  const nomeTerceiraTarefa = "Terceira tarefa";

  beforeEach(() => {
    localStorage["tarefas"] = JSON.stringify([
      new Tarefa(1, nomePrimmeiraTarefa, false),
      new Tarefa(2, nomeSegundaTarefa, false),
      new Tarefa(3, nomeTerceiraTarefa, false),
    ]);
  });

  afterEach(() => {
    delete localStorage["tarefas"];
  });

  it("Deve renderizar o componente sem erros", () => {
    const div = document.createElement("div");
    ReactDOM.render(<ListarTarefas />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("Deve exibir uma tabela contendo 3 tarefas", () => {
    const { getByTestId } = render(<ListarTarefas />);
    const tabela = getByTestId("tabela");
    expect(tabela).toHaveTextContent(nomePrimmeiraTarefa);
    expect(tabela).toHaveTextContent(nomeSegundaTarefa);
    expect(tabela).toHaveTextContent(nomeTerceiraTarefa);
  });

  it("Deve filtrar os dados da tabela de tarefas", () => {
    const { getByTestId } = render(<ListarTarefas />);
    fireEvent.change(getByTestId("txt-tarefa"), {
      target: { value: nomePrimmeiraTarefa },
    });
    const tabela = getByTestId("tabela");
    expect(tabela).toHaveTextContent(nomePrimmeiraTarefa);
    expect(tabela).not.toHaveTextContent(nomeSegundaTarefa);
    expect(tabela).not.toHaveTextContent(nomeTerceiraTarefa);
  });
});
