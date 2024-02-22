import {  render, screen, waitFor } from "@testing-library/react"
import { BrowserRouter, BrowserRouter as Router} from "react-router-dom"
import fetchMock from 'jest-fetch-mock'
import React from "react"
import MobileApi from "../../../app/javascript/common/MobileApi"
import MobileList from "../../../app/javascript/common/MobileList"
import axios from 'axios'

describe('App', () => {
    beforeEach(() => {
      fetchMock.resetMocks()
    })
  
    test('renders API call succeed', async () => {
            const fakeMobiles =[
                {id:1, brand: "mi", price:200, spec: "4GB Ram"},
                {id:2, brand: "lava", price:600, spec: "8GB RAM"},
            ] 
           
            fetchMock.mockResolvedValue({status: 200, json:jest.fn(() => fakeMobiles)})
           
            render(<MobileApi /> )
             expect(await screen.getByRole("heading",{name: "mobiles list:"})).toBeInTheDocument()
             expect( screen.getByText("Model:")).toBeInTheDocument()
             const rows = screen.getAllByRole("row")
             expect(rows.length + 1).toBe(fakeMobiles.length)

        })
    test('renders API call fails', async () => {
            fetchMock.mockReject(() => Promise.reject('API error'))
          
            render(<MobileApi />)
          
            expect(await screen.queryByText(/something went wrong/i)).not.toBeInTheDocument()
           
          })
    })
  
afterEach(() => {
  fetchMock.resetMocks()
})

test("render the api success", () => {
  const fakeUsers = [
    {model: "v30", brand: "mi", price: 500, spec: "price "}
  ]
  fetchMock.mockResolvedValue({status: 200, json:jest.fn(() => fakeUsers)})
  render(<MobileApi />)
  const row = screen.getAllByRole("row")
  expect(row.length).toBe(fakeUsers.length)
})



