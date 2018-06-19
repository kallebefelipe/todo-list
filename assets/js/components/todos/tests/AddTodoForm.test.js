import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { mount } from 'enzyme';
import fetchMock from 'fetch-mock';
import React from 'react';
import renderer from 'react-test-renderer';
import setUpStore from '../../../store/configureStore';
import AddTodoForm from '../AddTodoForm';
import { Provider } from 'react-redux';


Enzyme.configure({ adapter: new Adapter() });
const store = setUpStore();


function setup() {
  const props = {
    addNewTodo: jest.fn(),
    token: 'Token'
  }

  const enzymeWrapper = mount(
      <Provider store={store} >
        <AddTodoForm {...props} />
      </Provider>
    )

  return {
    props,
    enzymeWrapper
  }
}

describe('AddTodoForm', () => {
  it('should render form to add todo', () => {
    const { enzymeWrapper } = setup()

    const component = renderer.create(<enzymeWrapper />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })

  it('handleSubmit', () => {
    const { enzymeWrapper, props } = setup()

    const button = enzymeWrapper.find("button")
    button.props().onClick({preventDefault:  () => {}})
    expect(props.addNewTodo.mock.calls.length).toBe(0)
  })
})
