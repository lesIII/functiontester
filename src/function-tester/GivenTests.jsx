import React, { useRef, useState } from 'react'
import { GivenTest } from './GivenTest'

export function GivenTests({ fn, tests, points, setPoints }) {

  const GivenTestRefs = []
  for (var i = 0; i < tests.length; i++) {
    const GivenTestRef = useRef()
    GivenTestRefs.push(GivenTestRef)
  }

  const handleRunAll = () => {
    Object.values(tests).map((test, i) => {
      GivenTestRefs[i].current.test()
    })
  }

  const handleRun = (test, fn) => {
    return test.testFn(fn).toString() == "true" ? "✅" : "❌"
  }

  const refreshPoints = () => {
    setPoints(Object.values(tests).filter((test, i) => GivenTestRefs[i].current.isCorrect() == "✅").map(test => test.points).reduce((a, b) => a + b, 0))
  }

  return (
    <div className='content'>
      <h2 className="title is-2">Tests</h2>
      <table className="table is-hoverable has-text-centered">
        <thead>
          <tr>
            <th className='has-text-left' style={{ width: "20%" }}>Name</th>
            <th>Result</th>
            <th>Action</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(tests).map((test, i) => (
            <GivenTest key={i} test={test} fn={fn} handleRun={handleRun} ref={GivenTestRefs[i]} refreshPoints={refreshPoints} />
          ))}
          <tr>
            <td></td>
            <td></td>
            <td><button className='button is-link is-rounded' onClick={() => (handleRunAll(), refreshPoints())}>
              RUN ALL
            </button></td>
            <td className='title is-6'><b>{points}</b></td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default GivenTests