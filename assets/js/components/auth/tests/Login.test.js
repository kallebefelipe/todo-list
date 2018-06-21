import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { mount } from 'enzyme';
import fetchMock from 'fetch-mock';
import React from 'react';
import renderer from 'react-test-renderer';
import setUpStore from '../../../store/configureStore';
import { MemoryRouter } from 'react-router';
import Login from '../Login';
import { Provider } from 'react-redux';


Enzyme.configure({ adapter: new Adapter() });
const store = setUpStore();


function setup() {
  const props = {
    token: 'Token',
  }
  const header = {'content-type': 'application/json' }

  fetchMock
      .getOnce('api/user/', {body: [{name: 'user 1', id: 1}], headers: header})

  const enzymeWrapper = mount(
      <MemoryRouter initialEntries={[ '/random' ]}>
        <Provider store={store} >
          <Login {...props} />
        </Provider>
      </MemoryRouter>
    )

  return {
    props,
    enzymeWrapper
  }
}

describe('Login', () => {
  it('should render login', () => {
    const { enzymeWrapper } = setup()

    const component = renderer.create(<enzymeWrapper />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })
})
