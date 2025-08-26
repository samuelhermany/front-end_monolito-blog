import { ChangeEvent, FormEvent } from 'react'
import styles from './Input.module.css'

interface InputProps {
  label: string
  title: string
  value: string
  setValue: (value: string) => void
}

export function Input({ label, title, value, setValue }: InputProps) {
  const handleInputChangeA = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  // Valida números, e apenas um ponto ou vírgula
  function handleInputInvalid(event: FormEvent<HTMLInputElement> & { data: string }) {
    const input = event.currentTarget
    const currentValue = input.value
    const newChar = event.data

    if (!newChar) return

    // Valida mais de um vírgula
    const cursorPos = input.selectionStart ?? currentValue.length
    const finalValue =
      currentValue.slice(0, cursorPos) + newChar + currentValue.slice(cursorPos)

    // Só permite números, ponto ou vírgula
    if (!/^\d*([,]\d*)?$/.test(finalValue)) {
      event.preventDefault()
    }
  }

  return (
    <div className={styles.divInput}>
      <p>{label}</p>
      <input
        type="text"
        name="input field"
        title={title}
        placeholder="Digite um valor"
        onInput={handleInputChangeA}
        onBeforeInput={handleInputInvalid}
        value={value}
        required
      />
    </div>
  )
}
