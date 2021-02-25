import React, { useEffect, useState } from "react";
import ItensListaTarefas from "./ItensListaTarefas";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { A } from "hookrouter";
import { Form, Table } from "react-bootstrap";
import Ordenacao from "./Ordenacao";
import Paginacao from "./Paginacao";
import axios from "axios";

function ListarTarefas() {
  const ITENS_POR_PAG = 3;
  const API_URL_LISTAR_TAREFAS = "http://localhost:3001/gerenciador-tarefas";

  const [tarefas, setTarefas] = useState([]);
  const [totalItens, setTotalItens] = useState(0);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [ordenarAsc, setOrdenarAsc] = useState(false);
  const [ordenarDesc, setOrdenarDesc] = useState(false);
  const [filtroTarefa, setFiltroTarefa] = useState("");

  async function obterTarefas() {
    let ordem = "";
    if (ordenarAsc) {
      ordem = "ASC";
    } else if (ordenarDesc) {
      ordem = "DESC";
    }

    try {
      const params = `?pag=${paginaAtual}&ordem=${ordem}&filtro-tarefa=${filtroTarefa}`;
      let { data } = await axios.get(API_URL_LISTAR_TAREFAS + params);
      setTotalItens(data.totalItens);
      setTarefas(data.tarefas);
    } catch (err) {
      setTarefas([]);
    }
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
