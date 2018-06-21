import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { mount } from 'enzyme';
import fetchMock from 'fetch-mock';
import React from 'react';
import renderer from 'react-test-renderer';
import setUpStore from '../../../store/configureStore';
import TaskListRow from '../TaskListRow';
import { Provider } from 'react-redux';


Enzyme.configure({ adapter: new Adapter() });
const store = setUpStore();


function setup() {
  const props = {
    token: 'Token',
    task: {name: '', deadline: '02/04/2018 00:00:00'},
    user: {username: 'users', id: 1}
  }
  const header = {'content-type': 'application/json' }

  fetchMock
      .getOnce('api/user/', {body: [{name: 'user 1', id: 1}], headers: header})

  const enzymeWrapper = mount(
      <Provider store={store} >
        <TaskListRow {...props} />
      </Provider>
    )

  return {
    props,
    enzymeWrapper
  }
}

describe('TaskListRow', () => {
  it('should render task list row', () => {
    const { enzymeWrapper } = setup()

    const component = renderer.create(<enzymeWrapper />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })
})
