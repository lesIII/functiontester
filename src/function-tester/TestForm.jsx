import React, { useEffect, useState } from "react";
import "bulma/css/bulma.css";
import TreeComponent from "./TreeComponent";

export function TestForm({ input, output, testOutput, setTestOutput, handleSubmit, testInput, setTestInput, testName, setTestName, state, setState, setEdit }) {

  const active = state ? "is-active" : "";

  const handleClick = () => {
    setState(!state)
    setTestInput(input)
    setTestOutput(output)
  };

  const handleInput = (e) => {
    setTestName(e.target.value)
  }

  return (
    <div className="newTest">
      <div className={`modal ${active}`}>
        <div className="modal-background" />
        <div className="modal-card">
          <header className="modal-card-head">
            <h1 className="modal-card-title">New test</h1>
            <button
              onClick={() => {handleClick(), setEdit(false)}}
              className="delete"
              aria-label="close"
            />
          </header>
          <section className="modal-card-body">
            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label className="label">testName</label>
              </div>
              <div className="field-body">
                <div className="field">
                  <p className="control is-expanded">
                    <input value={testName} className="input" onInput={handleInput} name="testName" type="text" placeholder="string" />
                  </p>
                </div>
              </div>
            </div>
            <h4 className="title is-4">Input</h4>
            <TreeComponent testInput={testInput} setTestInput={setTestInput} />
            <h4 className="title is-4">Output</h4>
            <TreeComponent testInput={testOutput} setTestInput={setTestOutput} />
          </section>
          <footer className="modal-card-foot">
            <button className="button is-success" onClick={() => { handleSubmit(), setState(!state) }}>
              Save test
            </button>
            <button onClick={() => {handleClick(), setEdit(false)}} className="button">
              Cancel
            </button>
          </footer>
        </div>
      </div>
      <div className="content has-text-right">
        <button className='button is-primary' onClick={() => handleClick()}>
          Add a new test
        </button>
      </div>
    </div>
  );
}


export default TestForm