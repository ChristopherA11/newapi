import React from 'react';
import { fireEvent, getByText, render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import ListItem from '../../app/javascript/api/ListItem';
import { act } from 'react-dom/test-utils';


jest.mock('axios');

// describe('ListItem Component', () => {

//   // first api list test
//   test('renders userComponent', async () => {
//     const mockUsers = [
//       { id: 1, name: 'panch' },
//       { id: 2, name: 'aasath' },
//     ];
//     axios.get.mockResolvedValueOnce({ data: mockUsers });
//     // axios.get.mockResolvedValueOnce({ data: pricelist });
//     render(<ListItem />);
//     await waitFor(() => {
//       expect(screen.getByText('ListItem')).toBeInTheDocument();
//       expect(screen.getByText('panch')).toBeInTheDocument();
//       expect(screen.getByText('aasath')).toBeInTheDocument();
//       const listLength = screen.getAllByRole("listitem")
//       expect(listLength).toHaveLength(2)
//     });
//   });

//   //second api list test
//   test('renders postComponent ', async () => {
//     const mockPost = [
//       { id: 1, name: 'kumar' },
//       { id: 2, name: 'hari' },
//     ];
//     axios.get.mockResolvedValueOnce({ data: mockPost });
//     render(<ListItem />);
//     await waitFor(() => {
//       expect(screen.getByText('ListItems')).toBeInTheDocument();
//       expect(screen.getByText('kumar')).toBeInTheDocument();
//       expect(screen.getByText('hari')).toBeInTheDocument();
//     });
//   })

//   //post test onCall
//   test('creates a new post', async () => {
//     axios.post.mockResolvedValueOnce({})
//     render(<ListItem />);
//     const postButton = screen.getByText(/post/i)
//     await act(async () => {
//       fireEvent.click(postButton)
//     })
//     expect(axios.post).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/posts', { "name": "" })
//   });

//   //edit test call on
//   test('should onEdit PostList', async () => {
//     const mockedData = [
//       { name: 'User1' },
//       { name: 'User2' },
//     ];

//     axios.get.mockResolvedValueOnce({ data: mockedData });
//     render(<ListItem />);

//     axios.put.mockResolvedValueOnce({});
//     await act(async () => {
//       fireEvent.change(screen.getByPlaceholderText('Enter the name'), {
//         target: { value: 'UpdatedPost' },
//       })
//     })
// fireEvent.click(screen.getByTestId("put1"))
// fireEvent.click(screen.getByText("Edit"))

// expect(screen.getByTestId('put1')).toBeInTheDocument();

//   });

//   // delete test call on
//   it('should call onDelete', async () => {
//     const mockPost = [
//       { id: 1, name: 'panch' },
//       { id: 2, name: 'aasath' },
//     ];
//     // axios.get.mockResolvedValueOnce({ data: ["post 1"] });
//     axios.get.mockResolvedValueOnce({ data: mockPost });
//     axios.delete.mockResolvedValueOnce({});
//     render(<ListItem />);
//     const firstDeleteButton = await screen.findByTestId('delete0');
//     await act(async () => {
//       fireEvent.click(firstDeleteButton);
//     });
//     expect(axios.delete).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/posts/0');
//   });
// });


describe('ListItem Component', () => {

  test('renders userList && postList', async () => {
    const mockUsers = [
      { id: 1, name: 'panch' },
      { id: 2, name: 'aasath' },
    ];
    const mockPost = [
      { id: 1, name: 'kumar' },
      { id: 2, name: 'hari' },
    ];

    axios.get.mockResolvedValueOnce({ data: mockUsers });
    axios.get.mockResolvedValueOnce({ data: mockPost });
    axios.post.mockResolvedValueOnce({})
    axios.delete.mockResolvedValueOnce({})
    axios.put.mockResolvedValueOnce({ data: { name: "UpdatedPost" } })
    render(<ListItem />);
    await waitFor(() => {
      expect(screen.getByText('ListItem')).toBeInTheDocument();
      expect(screen.getByText('panch')).toBeInTheDocument();
      expect(screen.getByText('aasath')).toBeInTheDocument();
      expect(screen.getByText('ListItems')).toBeInTheDocument();
      expect(screen.getByText('kumar')).toBeInTheDocument();
      expect(screen.getByText('hari')).toBeInTheDocument();
      const listLength = screen.getAllByRole("listitem")
      expect(listLength).toHaveLength(4)
      // post
      const postButton = screen.getByText(/post/i)
      fireEvent.click(postButton)
      expect(axios.post).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/posts', { "name": "" })

      //delete
      const firstDeleteButton = screen.getByTestId('delete0');
      fireEvent.click(firstDeleteButton);
      expect(axios.delete).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/posts/0');
    });

    //   //Edit PostList
    await act(async () => {
      fireEvent.change(screen.getByPlaceholderText(/enter the name/i))
      fireEvent.click(screen.getByTestId("put0"))
    })

    expect(axios.post).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/posts', { name: "" })
  });

})