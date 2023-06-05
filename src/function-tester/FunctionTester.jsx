import { useState } from "react";
import { CustomTests } from "./CustomTests";
import GivenTests from "./GivenTests";

export function FunctionTester({ fn, input, output, tests, onFinish }) {
  console.log(fn);
  console.log(input);
  console.log(output);
  console.log(tests);
  const [points, setPoints] = useState(0)
  const [customTests, setCustomTests] = useState({})
  const totalPoints = tests.reduce((sum, test) => sum + test.points, 0);
  return (<>
    <div className="columns has-background-dark">
      <div className="column px-6 is-12">
        <div className="container">
          <div className="box my-5">
            <h1 className="title is-1 box hero is-info">FunctionTester</h1>
            <h2 className="title is-2">Function</h2>
            <p className="title is-5 tag is-info">{fn.toString()}</p>
          </div>
          <div className="box my-5">
            <GivenTests fn={fn} tests={tests} points={points} setPoints={setPoints} />
          </div>
          <div className="box my-5">
            <CustomTests fn={fn} input={input} output={output} customTests={customTests} setCustomTests={setCustomTests} />
          </div>
          <div className="content has-text-right">
            <button className="button is-success is-medium"
              onClick={() =>
                onFinish({
                  givenTests: [tests],
                  testResult: { achieved: points, all: totalPoints },
                  customTests: [customTests],
                })
              }>
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  </>);
}
