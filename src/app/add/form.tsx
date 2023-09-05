"use client"

import { formatYMDDateString } from "@/functions/helper";
import { useState } from "react";
import { BiTrash } from 'react-icons/bi'

type AddFormEntryProps = {
  index: number
  removeEntry: (index: number) => void
}
type AddFormProps = {
  submitStats: (data: FormData) => void
}

function AddFormEntry({index, removeEntry}: AddFormEntryProps) {
  const inputStyle = 'px-1 rounded'

  return (
    <div className="bg-gray-300 my-3 p-2 flex gap-4">
      <div>
        <label htmlFor={`createdAt-${index}`} className="block">Date</label>
        <input type="date" name={`createdAt-${index}`} defaultValue={formatYMDDateString(new Date())} max={formatYMDDateString(new Date())} className={inputStyle} required />
      </div>
      <div>
        <label htmlFor={`mileage-${index}`} className="block">Mileage</label>
        <input type="text" name={`mileage-${index}`} size={5} className={inputStyle} required />
      </div>
      <div>
        <label htmlFor={`gallons-${index}`} className="block">Gallons</label>
        <input type="text" name={`gallons-${index}`} size={5} className={inputStyle} required />
      </div>
      <div>
        <label htmlFor={`total-${index}`} className="block">Total Cost</label>
        $ <input type="text" name={`total-${index}`} size={5} className={inputStyle} placeholder="0.00" required />
      </div>
      {index > 0 && 
        <button onClick={() => removeEntry(index)}>
          <BiTrash size={24} className="hover:text-red-500" />
        </button>
      }
    </div>
  )
}

export function AddForm({ submitStats } : AddFormProps) {
  const [index, setIndex] = useState(1)
  const [content, setContent] = useState([0])

  function addEntry() {
    setIndex(index+1)
    setContent([...content, index])
  }
  function removeEntry(index: number) {
    let temp = [...content]
    temp = temp.filter((id) => id !== index)
    setContent(temp)
  }

  return (
    <form action={submitStats}>
      {content.map((id) => <AddFormEntry key={id} index={id} removeEntry={removeEntry}/>)}
      <button onClick={addEntry}>Add another +</button>
      <button type='submit'>Save</button>
    </form>
  )
}