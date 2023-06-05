import React from 'react';

const TreeComponent = ({ testInput, setTestInput }) => {

  const handleInput = (event, path) => {
    let { value } = event.target
    if (event.target.type === "checkbox") value = event.target.checked

    setTestInput((prevTestInput) => {
      const updatedTestInput = { ...prevTestInput };

      let parentNode = updatedTestInput
      const lastIndex = path[path.length - 1];
      for (const key of path.slice(0, -1)) {
        parentNode = parentNode[key]
      }
      if (typeof value != "boolean" && !isNaN(value)) value = parseFloat(value)
      if (Array.isArray(parentNode)) {
        parentNode[lastIndex] = value
      } else if (typeof parentNode === 'object') {
        parentNode[lastIndex] = value
      }

      return updatedTestInput
    })
  }

  const handleInputSimple = (event) => {
    let { value } = event.target
    if (event.target.type === "checkbox") value = event.target.checked
    if (typeof value != "boolean" && !isNaN(value)) value = parseFloat(value)
    setTestInput(value)
  }

  const checkIfList = (value) => {
    if (
      typeof value == "string" ||
      typeof value == "number" ||
      typeof value == "boolean" ||
      value == "string" ||
      value == "number" ||
      value == "boolean"
    ) {
      let type = ""
      if (value == "string" || value == "number" || value == "boolean") {
        type = value
      } else if (typeof value == "string" || typeof value == "number" || typeof value == "boolean") {
        type = typeof value
      } else type = "UNSUPPORTED TYPE OF VALUE ⚠"
      let inputType = ""
      switch (type) {
        case "boolean":
          inputType = "checkbox"
          break;
        case "number":
          inputType = "number"
          break;
        default:
          inputType = "text"
          break;
      }
      return <>
        <div className='columns'>
          <div className={`column is-4`}>
            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label className="label">{type}</label>
              </div>
              <div className="field-body">
                <div className="field">
                  <p className="control is-expanded">
                    <input
                      type={inputType}
                      onChange={(event) => handleInputSimple(event)}
                      className={type === "checkbox" ? type : "input"}
                    />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    } else return renderNode(value)
  }

  const renderNode = (node, path = []) => {
    if (Array.isArray(node)) {
      return (
        node.map((item, index) => (
          <React.Fragment key={index}>{renderNode(item, [...path, index])}</React.Fragment>
        ))
      );
    } else if (typeof node === 'object') {
      return (
        Object.entries(node).map(([key, value]) => (
          <React.Fragment key={key}>
            <strong>{key}:</strong> {renderNode(value, [...path, key])}
          </React.Fragment>
        ))
      );
    } else if (node === 'string' || node === 'number' || node === 'boolean') {
      let type = ""
      switch (node) {
        case "boolean":
          type = "checkbox"
          break;
        case "number":
          type = "number"
          break;
        default:
          type = "text"
          break;
      }
      return (<>
        <div className='columns'>
          <div className={`column is-4 is-offset-${path.length - 1}`}>
            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label className="label">{path}</label>
              </div>
              <div className="field-body">
                <div className="field">
                  <p className="control is-expanded">
                    <input
                      type={type}
                      onChange={(event) => handleInput(event, path)}
                      className={type === "checkbox" ? type : "input"}
                    />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>);
    } else if (typeof node === 'string' || typeof node === 'number' || typeof node === 'boolean') {
      let type = ""
      switch (typeof node) {
        case "boolean":
          type = "checkbox"
          break;
        case "number":
          type = "number"
          break;
        default:
          type = "text"
          break;
      }
      return (<>
        <div className='columns'>
          <div className={`column is-4 is-offset-${path.length - 1}`}>
            <div className="field is-horizontal">
              <div className="field-label is-normal">
                <label className="label">{path}</label>
              </div>
              <div className="field-body">
                <div className="field">
                  <p className="control is-expanded">
                    <input
                      type={type}
                      onChange={(event) => handleInput(event, path)}
                      className={type === "checkbox" ? type : "input"}
                    />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>)
    } else {
      return <span>{String(node)}</span>
    }
  }

  return <>{checkIfList(testInput)}</>
}

export default TreeComponent;