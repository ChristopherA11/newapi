import { render, screen } from '@testing-library/react';
import Users from '../../app/javascript/common/Users';
import React from 'react';
import Comments from '../../app/javascript/common/Comments';

test("render the user", async () => {

    global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue   ([{ name: 'kamalesh'}, { name: 'kumar' }, { name: 'vinith' }])
    });

    render(<Users />);
    
    const user = await screen.findAllByRole("listitem");
    expect(user).toHaveLength(3);


});

test("render the Comment success", async () => {

    global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue([{ name: 'vizhag' }, { name: 'tn' }])
    });

    render(<Comments />);
    
    const user = await screen.findAllByRole("listitem");
    expect(user).toHaveLength(2);
    
});


