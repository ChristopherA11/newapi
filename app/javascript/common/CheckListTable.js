import React from 'react';
import { ForgeTextField, ForgeSwitch } from '@tylertech/forge-react';
import { useDisableSolutionEdit } from './useDisableSolutionEdit';



function CheckListTable(props) {
  const { checklistItems, onChecklistChange } = props;  // checkList item enter the value checklistItems= [{}]
  const disableSolutionEdit = useDisableSolutionEdit();
  
  const updateChecklistValue = (index, type, value) => {
    const newChecklist = _.clone(checklistItems);
    newChecklist[index] = {
      ...checklistItems[index],
      [type]: value,
      isUpdatedItem: true
    };
    onChecklistChange(newChecklist);
  };

  const handleToggleClick = (listItem, index) => {
    const toggleValue = !_.get(listItem, 'is_enabled', false);
    updateChecklistValue(index, 'is_enabled', toggleValue);
  };

  const handleInputChange = async (event, type, index) => {
    const currentValue = event.target.value;
    updateChecklistValue(index, type, currentValue);
  };

  const renderRow = (listItem, index) => {
    const disableList = _.get(listItem, 'required', false) || disableSolutionEdit;
    return (
      <tr key={index}>
        <td />
        <td className="align-top ps-5 pt-4">
          <ForgeSwitch
            data-testid="toggle-switch-0"
            className="mt-2"
            selected={_.get(listItem, 'is_enabled', false)}
            disabled={disableList}
            on-forge-switch-select={() => handleToggleClick(listItem, index)}
          />
        </td>
        <td className="align-top">
          <ForgeTextField className="flex-grow-1">
            <input
              type="text"
              value={_.get(listItem, 'name')}
              name="newDomain"
              placeholder="Enter task name"
              onChange={(e) => handleInputChange(e, 'name', index)}
              disabled={disableList}
            />
          </ForgeTextField> 
        </td>
        <td className="align-top">
          <ForgeTextField className="flex-grow-1">
            <textarea
              placeholder="Enter description"
              className="pt-2"
              autoComplete="off"
              rows={8}
              value={_.get(listItem, 'description')}
              onChange={(e) => handleInputChange(e, 'description', index)}
              disabled={disableList}
            />
          </ForgeTextField>
        </td>
      </tr>
    );
  };

  const renderRows = () => {
    return _.map(_.orderBy(checklistItems, 'order', 'asc'), (listItem, index) => {
      return renderRow(listItem, index);
    });
  };

  const renderChecklistItems = () => {
    return (
      <table className="table checklist-table table-borderless">
        <thead>
          <tr>
            <th />
            <th>Appears in checklist</th>
            <th>Task name</th>
            <th>Instructions (optional)</th>
          </tr>
        </thead>
        <tbody>
          {renderRows()}
        </tbody>
      </table>
    );
  };

  return (
    _.isEmpty(checklistItems) ? <div /> : renderChecklistItems()
  );
}

CheckListTable.propTypes = {};

export default CheckListTable;

