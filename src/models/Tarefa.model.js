function Tarefa(id, nome, concluida) {
  this.id = id;
  this.nome = nome;
  this.concluida = concluida;

  return {
    id,
    nome,
    concluida,
  };
}

export default Tarefa;
