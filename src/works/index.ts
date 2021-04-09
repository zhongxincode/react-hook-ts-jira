import { useState } from 'react';

export const useArray = <T>(value: T[]) => {
  const [persons, setPersons] = useState(value);
  return {
    value,
    clear: () => {
      setPersons([])
    },
    removeIndex: (index: number) => {
      let result = [...persons];
      result.splice(index, 1)
      setPersons(result)
    },
    add: (p: T) => {
      setPersons([...persons, p]);
    }
  }
}