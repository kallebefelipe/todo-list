import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { mount } from 'enzyme';
import ForgotPassword from '../ForgotPassword';
import React from 'react';
import renderer from 'react-test-renderer';
import setUpStore from '../../../store/configureStore';
import { Provider } from 'react-redux';


Enzyme.configure({ adapter: new Adapter() });
const store = setUpStore();


function setup() {
  const props = {
    token: 'Token',
  }
  const enzymeWrapper = mount(
      <Provider store={store} >
        <ForgotPassword {...props} />
      </Provider>
    )

  return {
    props,
    enzymeWrapper
  }
}

describe('ForgotPassword', () => {
  it('should render forgot password', () => {
    const { enzymeWrapper } = setup()

    const component = renderer.create(<enzymeWrapper />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })
})
