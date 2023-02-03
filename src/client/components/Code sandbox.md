import React, { Fragment, useState } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

type FormElem = React.FormEvent<HTMLFormElement>;

function App(): JSX.Element {
  //so, todos should be an array of type ITodo

  const handleSubmit = (e: FormElem): void => {
    console.log((e.currentTarget.elements[0] as HTMLInputElement).value);
    e.preventDefault();
  };

  return (
    <Fragment>
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input name="email" type="email" autoComplete="email" required />
        <input
          name="password"
          type="password"
          autoComplete="password"
          required
        />
        <button type="submit">Login</button>
      </form>
    </Fragment>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
