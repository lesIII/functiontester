import { createRef, useEffect, useState } from "react";
import TestForm from "./TestForm";
import { CustomTest } from "./CustomTest";

export function CustomTests({ fn, input, output, customTests, setCustomTests }) {

  const [testInput, setTestInput] = useState(input)
  const [testOutput, setTestOutput] = useState(output)
  const [testName, setTestName] = useState('')
  const [state, setState] = useState(false)
  const [edit, setEdit] = useState(false)

  const handleRunAll = () => {
    Object.values(customTests).map((test, i) => {
      test.ref.current.test()
    })
  }

  useEffect(() => {
    console.log(edit)
  }, [edit])

  const handleSubmit = () => {
    Object.values(customTests).map((test) => {
      if (test.name == testName) handleDelete(test)
    })
    const newTest = {
      name: testName,
      input: testInput,
      output: testOutput,
      result: "❓",
      ref: createRef()
    }
    setCustomTests((prevTests) => {
      return {
        ...prevTests,
        [Math.random()] : newTest,
      }
    })
    if (edit) {
      //console.log(Object.values(customTests))
      //console.log(customTests)
      //Object.values(customTests).map((test, index) => {
      //  if (test.id == )
      //})
      //console.log(targetProperty)
      //nem maradt időm megírni 🥺
    }
  }

  const handleEdit = () => {
    setEdit(true)
    setState(!state)
  }

  const handleDelete = (test) => {
    setCustomTests(Object.values(customTests).filter(e => e !== test))
  }

  const handleRun = (test, fn) => {
    return fn(test.input) == test.output ? "✅" : "❌"
  }

  const renderTests = () => {
    return Object.values(customTests).map((test, index) => (
      <CustomTest
        key={index} // Add a unique key prop using the index
        test={test}
        fn={fn}
        handleRun={handleRun}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        ref={test.ref}
      />
    ));
  };

  return (<>
    <div className="content">
      <h2 className="title is-2">Custom tests</h2>
      <table className="table is-hoverable has-text-centered">
        <thead>
          <tr>
            <th className='has-text-left' style={{ width: "30%" }}>Name</th>
            <th>Result</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {renderTests()}
          <tr>
            <td></td>
            <td></td>
            <td>
              {
                Object.keys(customTests).length > 0 ? <button className='button is-link is-rounded' onClick={() => handleRunAll()}>
                  RUN ALL
                </button> : ""
              }
            </td>
          </tr>
        </tbody>
      </table>
      <TestForm input={input} output={output} testOutput={testOutput} setTestOutput={setTestOutput} handleSubmit={handleSubmit} testInput={testInput} setTestInput={setTestInput} testName={testName} setTestName={setTestName} state={state} setState={setState} edit={edit} setEdit={setEdit} />
    </div>
  </>)
}

export default CustomTests