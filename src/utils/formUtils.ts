/**
 * Limpa todos os campos input do formulário
 */
export function handleClearValues(setters: React.Dispatch<React.SetStateAction<string>>[]) {
  setters.forEach(set => set(''))
}

/**
 * Verifica se todos os campos input foram preenchidos no formulário
 */
export function allValuesFilled(...values: string[]) {
  return values.every(value => value.trim() !== '')
}
