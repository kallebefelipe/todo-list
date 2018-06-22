import AddTaskForm from '../AddTaskForm';
import React from 'react';
import renderer from 'react-test-renderer';


describe('AddTaskForm', () => {
  it('should render add task form', () => {

    const component = renderer.create(
      <AddTaskForm
        updateValue={() => {}}
        name={''}
        erroName={false}
        updateDataValue={() => {}}
        deadline={''}
        erroDate={false}
        assignTitle={''}
        generateUserList={() => {}}
        handleSubmit={() => {}}
      />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })
})
