import { useEffect, useState } from "react";
import { forwardRef, useImperativeHandle } from 'react';

export const CustomTest = forwardRef(({ test, fn, handleRun, handleEdit, handleDelete }, ref) => {

  const [result, setResult] = useState("❓")

  useImperativeHandle(ref, () => ({
    test() {
      setResult(handleRun(test, fn))
      test.result = result
    },
    getResult() {
      return result
    }
  }))

  useEffect(() => {
    test.result = result
  }, [result])

  return (
    <tr>
      <td className="has-text-left">
        {test.name}
      </td>
      <td className="title is-5">
        {
          result
        }
      </td>
      <td>
        <button className="button tag is-info m-1" style={{ borderRadius: 0 }} onClick={() => setResult(handleRun(test, fn))}>
          ▶
        </button>
        <button className="button tag is-info m-1" style={{ borderRadius: 0 }} onClick={() => handleEdit(test)}>
          ✏
        </button>
        <button className="button tag is-info m-1" style={{ borderRadius: 0 }} onClick={() => handleDelete(test)}>
          ✖
        </button>
      </td>
    </tr>
  );
})

  