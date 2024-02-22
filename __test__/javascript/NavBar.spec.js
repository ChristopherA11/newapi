import { render,screen } from "@testing-library/react"
import NavBar from "../../app/javascript/common/NavBar"
import { BrowserRouter } from "react-router-dom"
import React from "react"

describe("NavBar component", () => {
     const navBar =() => {
         render(<NavBar />, {wrapper:BrowserRouter})
     }
     test("navbar post page", () => {
          navBar()
          const home = screen.getByText(/home/i)
          expect(home).toBeInTheDocument()
          const post = screen.getByText(/post/i)
          expect(post).toBeInTheDocument()
          const search = screen.getByText(/search/i)
          expect(search).toBeInTheDocument()
     })
})