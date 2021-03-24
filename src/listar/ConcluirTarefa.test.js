import React from "react";
import ReactDOM from "react-dom";
import ConcluirTarefa from "./ConcluirTarefa";
import Tarefa from "../models/Tarefa.model";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import axiosMock from "axios";

describe("Teste do componente de conclusão de tarefas", () => {
  const nomeTarefa = "Tarefa de teste";
  const tarefa = new Tarefa(1, nomeTarefa, false);

  it("Deve exibir a modal", () => {
    const { getByTestId } = render(
      <ConcluirTarefa
        tarefa={tarefa}
        recarregarTarefas={() => false}
        className={""}
      />
    );
    fireEvent.click(getByTestId("btn-abrir-modal"));
    expect(getByTestId("modal")).toHaveTextContent(nomeTarefa);
  });

  it("Deve concluir uma tarefa", async () => {
    const { getByTestId, findByTestId } = render(
      <ConcluirTarefa
        tarefa={tarefa}
        recarregarTarefas={() => false}
        className={""}
      />
    );
    fireEvent.click(getByTestId("btn-abrir-modal"));
    fireEvent.click(getByTestId("btn-concluir"));
    await findByTestId("modal");
    expect(axiosMock.put).toHaveBeenCalledTimes(1);
  });
});
