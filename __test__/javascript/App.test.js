import React from "react"
import { render, screen } from "@testing-library/react"
import Cont from "../../app/javascript/common/Cont"
import NavBar from "../../app/javascript/common/NavBar"
import { BrowserRouter } from "react-router-dom"


test('render the component', () => {
  render(<Cont name="john" />)
  const word = screen.getByText("welcome john")
  expect(word).toBeInTheDocument()
})

test('render the component', () => {
  render(<Cont />)
  const word = screen.getByText("welcome")
  expect(word).toBeInTheDocument()
})
// heading tag use find the text ("heading", {name: "<h>tag element name"},) or ("heading", {leavel: 1},)  getByRole
test("render headding element & image render", () => {
  render(<Cont />)
  const heading = screen.getByRole("heading", { name: "hello" },)
  expect(heading).toBeInTheDocument()
  const heading3 = screen.getByRole("heading", { name: "world" },)
  expect(heading3).toBeInTheDocument()
  const heading2 = screen.getByRole("heading", { level: 2 },)
  expect(heading2).toBeInTheDocument()

  // same labelText in use selector:"input element"
  const label = screen.getByLabelText("Name")
  expect(label).toBeInTheDocument()

  //getAltText use in alt atribbute use in 
  const image = screen.getByAltText("google image")
  expect(image).toBeInTheDocument()

  //displayValue use in test code
  const value = screen.getByDisplayValue("hello")
  expect(value).toBeInTheDocument()

  const place = screen.getByPlaceholderText("name")
  expect(place).toBeInTheDocument()

})

//add the two value equl to use toBe not equal use to Not.toBe
test("add the number", () => {
  let a = 5;
  let b = 6;
  expect(a + b).toBe(11)
  expect(a + b).toEqual(11)
})


test("shoul return object", () => {
  let user = {
    name: "kumar",
    age: 42
  }
  // expect(user).toEqual({
  //     name:"kumar",
  //     age:42
  // }) // or 
  expect(user).toEqual(
    expect.objectContaining({
      name: expect.any(String),
      age: expect.any(Number)
    })
  )
})







