import { useEffect, useState } from "react";
import { forwardRef, useImperativeHandle } from 'react';

export const GivenTest = forwardRef(({ test, fn, handleRun, refreshPoints }, ref) => {

  const [result, setResult] = useState("❓")

  useImperativeHandle(ref, () => ({
    test() {
      setResult(handleRun(test, fn))
    },
    isCorrect() {
      return result
    }
  }))

  useEffect(() => {
    refreshPoints()
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
        <button className="button tag is-info" style={{ borderRadius: 0 }} onClick={() => setResult(handleRun(test, fn))}>
          ▶
        </button>
      </td>
      <td>
        {test.points}
      </td>
    </tr>
  );
})