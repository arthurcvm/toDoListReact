import "./GerenciadorTarefas.css";
import { useRoutes } from "hookrouter";

import ListarTarefas from './listar/ListarTarefas'
import CadastrarTarefa from './cadastrar/CadastrarTarefa'
import AtualizarTarefa from './atualizar/AtualizarTarefa'

const routes = {
  "/": () => <ListarTarefas />,
  "/cadastrar": () => <CadastrarTarefa />,
  "/atualizar/:id": ({ id }) => <AtualizarTarefa id={id} />,
};

function GerenciadorTarefas() {
  return useRoutes(routes);
}

export default GerenciadorTarefas;
