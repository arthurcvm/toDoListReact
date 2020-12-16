import { render, screen } from '@testing-library/react';
import GerenciadorTarefas from './GerenciadorTarefas';

test('Deve redenrizar o projeto sem erros', () => {
  render(<GerenciadorTarefas />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
