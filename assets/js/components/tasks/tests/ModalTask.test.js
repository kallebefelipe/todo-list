import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { mount } from 'enzyme';
import fetchMock from 'fetch-mock';
import React from 'react';
import renderer from 'react-test-renderer';
import setUpStore from '../../../store/configureStore';
import ModalTask from '../ModalTask';
import { Provider } from 'react-redux';


describe('ModalTask', () => {
  it('should render modal task', () => {

    const component = renderer.create(<ModalTask />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })
})
