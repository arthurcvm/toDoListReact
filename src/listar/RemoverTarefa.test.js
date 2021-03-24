import React from "react";
import ReactDOM from "react-dom";
import RemoverTarefa from "./RemoverTarefa";
import Tarefa from "../models/Tarefa.model";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import axiosMock from "axios";

describe("Teste do componente de remoção de tarefas", () => {
  const nomeTarefa = "Tarefa de teste";
  const tarefa = new Tarefa(1, nomeTarefa, false);

  it("Deve remover uma tarefa", async () => {
    const { getByTestId, findByTestId } = render(
      <RemoverTarefa tarefa={tarefa} recarregarTarefas={() => false} />
    );
    fireEvent.click(getByTestId("btn-abrir-modal"));
    fireEvent.click(getByTestId("btn-remover"));
    await findByTestId("modal");
    expect(axiosMock.delete).toHaveBeenCalledTimes(1);
  });
});
