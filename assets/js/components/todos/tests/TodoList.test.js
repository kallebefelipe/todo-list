import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { mount } from 'enzyme';
import fetchMock from 'fetch-mock';
import React from 'react';
import renderer from 'react-test-renderer';
import setUpStore from '../../../store/configureStore';
import TodoList from '../TodoList';
import { Provider } from 'react-redux';


Enzyme.configure({ adapter: new Adapter() });
const store = setUpStore();


function setup() {
  const props = {
    fetchTodos: jest.fn(),
    token: 'Token',
    todos: [{name: 'Todo 1'}]
  }
  const header = {'content-type': 'application/json' }

  fetchMock
      .getOnce('/api/todos/', {body: {todos: []}, headers: header})

  const enzymeWrapper = mount(
      <Provider store={store} >
        <TodoList {...props} />
      </Provider>
    )

  return {
    props,
    enzymeWrapper
  }
}

describe('TodoList', () => {
  it('should render todo lists', () => {
    const { enzymeWrapper } = setup()

    const component = renderer.create(<enzymeWrapper />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })
})
