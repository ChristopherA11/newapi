import { canDisableSolutionEditAccess, useDisableSolutionEdit } from "../../../app/javascript/common/useDisableSolutionEdit";
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CheckListTable from "../../../app/javascript/common/CheckListTable";


describe('CheckListTable', () => {
  const checklistItems = [
    { name: 'Task 1', description: 'Description 1', is_enabled: true, required: false },
    { name: 'Task 2', description: 'Description 2', is_enabled: false, required: true },
  ];
  const onChecklistChange = jest.fn();

  test('renders checklist items', () => {
    const { getByPlaceholderText } = render(
      <CheckListTable checklistItems={checklistItems} onChecklistChange={onChecklistChange} />
    );

    expect(getByPlaceholderText('Enter task name').value).toBe('Task 1');
    expect(getByPlaceholderText('Enter description').value).toBe('Description 1');
  });

  test('handles input changes', () => {
    const { getByPlaceholderText } = render(
      <CheckListTable checklistItems={checklistItems} onChecklistChange={onChecklistChange} />
    );

    fireEvent.change(getByPlaceholderText('Enter task name'), { target: { value: 'New Task' } });
    expect(onChecklistChange).toHaveBeenCalled();

    fireEvent.change(getByPlaceholderText('Enter description'), { target: { value: 'New Description' } });
    expect(onChecklistChange).toHaveBeenCalled();
  });
});


describe('canDisableSolutionEditAccess', () => {
  it('returns true if the role is admin', () => {
    expect(canDisableSolutionEditAccess('admin')).toBe(true);
  });

  it('returns false if the role is not admin', () => {
    expect(canDisableSolutionEditAccess('user')).toBe(false);
  });

});