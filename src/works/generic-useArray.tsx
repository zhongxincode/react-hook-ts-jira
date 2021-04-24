import React from 'react'
import {useArray} from './index'
interface Person {
  name: string;
  age: number;
}
export const GenericUseArray = () => {
  const persons: Person[] = [
    {name: 'z', age: 18},
    {name: 'x', age: 21}
  ];
  const {value, clear, removeIndex, add} = useArray(persons);

  // 类型“Person[]”上不存在属性“notExist”。ts(2339)
  // console.log(value.notExist);
  
  // 类型“{ name: string; }”的参数不能赋给类型“Person”的参数。
  // 类型 "{ name: string; }" 中缺少属性 "age"，但类型 "Person" 中需要该属性。ts(2345)
  // add({name: 'david'})

  // 类型“string”的参数不能赋给类型“number”的参数。ts(2345)
  // removeIndex("123")
  return (
    <div>
      <button onClick={() => add({name: 'd',age: 18})} >add ddd</button>
      <button onClick={() => removeIndex(0)} >remove 0</button>
      <button onClick={() => clear()} style={{marginBottom: '50px'}} >clear</button>
      {
        value.map((person, index) => (
          <div style={{marginBottom: '30px'}} key={person.name}>
            <span style={{color: 'red'}} >{index}</span>
            <span>{person.name}</span>
            <span>{person.age}</span>
          </div>
        ))
      }
    </div>
  )
}
