import React, { useEffect, useState } from "react";
import ItensListaTarefas from "./ItensListaTarefas";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { A } from "hookrouter";
import { Form, Table } from "react-bootstrap";
import Ordenacao from "./Ordenacao";
import Paginacao from "./Paginacao";

function ListarTarefas() {
  const ITENS_POR_PAG = 3;

  const [tarefas, setTarefas] = useState([]);
  const [totalItens, setTotalItens] = useState(0);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [ordenarAsc, setOrdenarAsc] = useState(false);
  const [ordenarDesc, setOrdenarDesc] = useState(false);
  const [filtroTarefa, setFiltroTarefa] = useState("");

  function obterTarefas() {
    const tarefasDb = localStorage["tarefas"];
    let listaTarefas = tarefasDb ? JSON.parse(tarefasDb) : [];

    //Filtrar
    listaTarefas = listaTarefas.filter(
      (t) => t.nome.toLowerCase().indexOf(filtroTarefa.toLowerCase()) === 0
    );

    //Ordenar
    if (ordenarAsc) {
      listaTarefas.sort((t1, t2) =>
        t1.nome.toLowerCase() > t2.nome.toLowerCase() ? 1 : -1
      );
    } else if (ordenarDesc) {
      listaTarefas.sort((t1, t2) =>
        t1.nome.toLowerCase() < t2.nome.toLowerCase() ? 1 : -1
      );
    }

    //Paginar
    setTotalItens(listaTarefas.length);
    setTarefas(
      listaTarefas.splice((paginaAtual - 1) * ITENS_POR_PAG, ITENS_POR_PAG)
    );
  }

  useEffect(() => {
    obterTarefas();
  }, [paginaAtual, ordenarAsc, ordenarDesc, filtroTarefa]);

  function handleMudarPagina(pagina) {
    setPaginaAtual(pagina);
  }

  function handleOrdenar(event) {
    event.preventDefault();
    if (!ordenarAsc && !ordenarDesc) {
      setOrdenarAsc(true);
      setOrdenarDesc(false);
    } else if (ordenarAsc) {
      setOrdenarAsc(false);
      setOrdenarDesc(true);
    } else {
      setOrdenarAsc(false);
      setOrdenarDesc(false);
    }
  }

  function handleFiltrar(event) {
    setFiltroTarefa(event.target.value);
  }

  return (
    <div className="text-center">
      <h3>Tarefas a fazer</h3>
      <Table striped bordered hover responsive data-testid="tabela">
        <thead>
          <tr>
            <th>
              <a href="/" onClick={handleOrdenar}>
                Tarefa &nbsp;
                <Ordenacao ordenarAsc={ordenarAsc} ordenarDesc={ordenarDesc} />
              </a>
            </th>
            <th>
              <A
                href="/cadastrar"
                className="btn btn-success btn-sm"
                data-testid="btn-nova-tarefa"
              >
                <FontAwesomeIcon icon={faPlus} />
                &nbsp; Nova tarefa
              </A>
            </th>
          </tr>
          <tr>
            <th>
              <Form.Control
                type="text"
                value={filtroTarefa}
                onChange={handleFiltrar}
                data-testid="txt-tarefa"
                className="filtro-tarefa"
              />
            </th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          <ItensListaTarefas
            tarefas={tarefas}
            recarregarTarefas={obterTarefas}
          />
        </tbody>
      </Table>
      <Paginacao
        totalItens={totalItens}
        itensPorPagina={ITENS_POR_PAG}
        paginaAtual={paginaAtual}
        mudarPagina={handleMudarPagina}
      />
    </div>
  );
}

export default ListarTarefas;
