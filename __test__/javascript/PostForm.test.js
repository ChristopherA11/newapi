import { fireEvent, getByLabelText, render,screen } from "@testing-library/react"
import PostForm from "../../app/javascript/common/PostForm"
import React from "react"
import '@testing-library/jest-dom'

describe("render the PostForm component", () => {
  const addHandleSubmit= jest.fn()
  const editHandleSubmit= jest.fn()
  const handleSearchBtn= jest.fn()

  const addList = {
    handleSubmit: addHandleSubmit,
    handleEdit: editHandleSubmit,
    handelSearch: handleSearchBtn,
    mobiles: { id: 0, model: 'TestModel', brand: 'TestBrand', price: 0, spec: 'TestSpec' },
    addMobiles:{model:"", brand: "", price: 0, spec: ""},
    setAddMobiles:jest.fn()
  }
 // label test code
  test("label render", () => {
    render(<PostForm {...addList}/>)
    const model = screen.getByLabelText(/model/i)
    expect(model).toBeInTheDocument()
    expect(screen.getByLabelText(/brand/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/price/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/spec/i)).toBeInTheDocument()
  });



  //post button test code
  test("handleSubmit button", () => {
    render(<PostForm {...addList}/>)
    const submitButton = screen.getByText(/submit/i)
    fireEvent.click(submitButton)
    expect(addHandleSubmit).toHaveBeenCalledWith(addList.addMobiles)    
  });

//handleEdit button test code
 
  // test("render the handleEdit component", () => {
  //       render(<PostForm {...addList} handleEdit/>)
  //   const editBtn = screen.getByText(/submit/i)
  //   fireEvent.click(editBtn)
  //   expect(editHandleSubmit).toHaveBeenCalledWith(addList.mobiles.id, addList.addMobiles)
  //   console.log(addList.mobiles.id, addList.addMobiles);
  // })
 
 //search button test code 
  test("render the handleSearch", () => {
    render(<PostForm {...addList} handleEdit={null} handleSubmit={null}/>)
    const searchBtn = screen.getByText(/search/i)
    fireEvent.click(searchBtn)
    expect(handleSearchBtn).toHaveBeenCalled()
  })
  

  
// more text box use in should be uesd in  {name: "labelName or aria-label or text content of button ele"}
  test("text name", () => {
    render(<PostForm {...addList}/>)
    const model = screen.getByRole("textbox", {
      name:"Model",})
    expect(model).toBeInTheDocument()
    const brand= screen.getByRole("textbox", {
      name:"Brand",})
    expect(brand).toBeInTheDocument()
   const price= screen.getByRole("textbox",{
    name:"Price"
   })
    expect(price).toBeInTheDocument()
    const spec = screen.getByRole("textbox", {
      name:"Spec",})
    expect(spec).toBeInTheDocument()
  })
})


test('handles input changes', () => {
  const setAddMobiles = jest.fn();
  const addMobiles = { model: '', brand: '', price: '', spec: '' };

  const { getByLabelText } = render(
    <PostForm addMobiles={addMobiles} setAddMobiles={setAddMobiles} />
  );

  fireEvent.change(getByLabelText('Model'), { target: { value: 'iPhone' } });
  expect(setAddMobiles).toHaveBeenCalledWith({ ...addMobiles, model: 'iPhone' });

  fireEvent.change(getByLabelText('Brand'), { target: { value: 'Apple' } });
  expect(setAddMobiles).toHaveBeenCalledWith({ ...addMobiles, brand: 'Apple' });

  fireEvent.change(getByLabelText('Price'), { target: { value: '1000' } });
  expect(setAddMobiles).toHaveBeenCalledWith({ ...addMobiles, price: '1000' });

  fireEvent.change(getByLabelText('Spec'), { target: { value: 'Specs' } });
  expect(setAddMobiles).toHaveBeenCalledWith({ ...addMobiles, spec: 'Specs' });
});

