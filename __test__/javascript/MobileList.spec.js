import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MobileList from '../../app/javascript/common/MobileList';
import { BrowserRouter as Router } from 'react-router-dom';


describe('MobileList component', () => {
  const mobiles = [
    { id: 1, model: '15Max', brand: 'Apple', price: 500, spec: 'premium' },
    { id: 2, model: 'v29', brand: 'Vivo', price: 600, spec: 'camera' },
  ];

// mobiles length find same
  test('renders the mobileList', () => {
    render(
    <Router><MobileList mobiles={mobiles}  /> </Router>);

    // const rows = screen.getAllByRole("row")
    // expect(rows.length -1).toBe(mobiles.length)
  
    
    // expect(screen.getByRole('table')).toBeInTheDocument();
    mobiles.forEach((mobile) => {
      expect(screen.getByText(mobile.model)).toBeInTheDocument();
      expect(screen.getByText(mobile.brand)).toBeInTheDocument();
      expect(screen.getByText(mobile.price.toString())).toBeInTheDocument();
      expect(screen.getByText(mobile.spec)).toBeInTheDocument();
    });
  });

   it('handleDelete', () => {
    const handleDelete = jest.fn();
    render(<Router><MobileList mobiles={mobiles} handleDelete={handleDelete} /></Router>);
    fireEvent.click(screen.getAllByText('Delete')[0]);
    expect(handleDelete).toHaveBeenCalledWith(mobiles[0].id);
  });
});
