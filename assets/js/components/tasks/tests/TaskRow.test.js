import TaskRow from '../TaskRow';
import React from 'react';
import renderer from 'react-test-renderer';


describe('TaskRow', () => {
  it('should render add task row', () => {
    const task = {
      name: 'name',
      deadline: 'deadline',
      user: 1,
      done: false}

    const component = renderer.create(
      <TaskRow
        task={task}
        getAssignName={() => {}}
        deleteTask={() => {}}
        editForm={() => {}}
        updateDoneTask={() => {}}
      />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })
})
