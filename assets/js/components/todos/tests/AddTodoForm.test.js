import AddTodoForm from '../AddTodoForm';
import React from 'react';
import renderer from 'react-test-renderer';


describe('AddTodoForm', () => {
  it('should render add todo form', () => {

    const component = renderer.create(
      <AddTodoForm
        updateValue={() => {}}
        handleSubmit={() => {}}
      />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })
})
