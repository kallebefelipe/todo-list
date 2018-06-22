import TodoRow from '../AddTodoForm';
import React from 'react';
import renderer from 'react-test-renderer';


describe('TodoRow', () => {
  it('should render todo row', () => {
    const todo = {
      name: 'test',
      tasks: []
    }

    const component = renderer.create(
      <TodoRow
        todo={todo}
        subDeleteTodo={() => {}}
        editForm={() => {}}
        updateShowModal={() => {}}
      />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })
})
