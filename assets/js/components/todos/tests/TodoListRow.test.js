import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { mount } from 'enzyme';
import fetchMock from 'fetch-mock';
import React from 'react';
import renderer from 'react-test-renderer';
import setUpStore from '../../../store/configureStore';
import TodoListRow from '../TodoListRow';
import { Provider } from 'react-redux';


Enzyme.configure({ adapter: new Adapter() });
const store = setUpStore();


function setup() {
  const props = {
    mapDeleteTodo: jest.fn(),
    mapUpdateTodo: jest.fn(),
    token: 'Token',
    todos: [{name: 'Todo 1'}],
    todo: [name: 'Todo 1']
  }
  const header = {'content-type': 'application/json' }

  const enzymeWrapper = mount(
      <Provider store={store} >
        <TodoListRow {...props} />
      </Provider>
    )

  return {
    props,
    enzymeWrapper
  }
}

describe('TodoListRow', () => {
  it('should render todo list row', () => {
    const { enzymeWrapper } = setup()

    const component = renderer.create(<enzymeWrapper />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })
})
