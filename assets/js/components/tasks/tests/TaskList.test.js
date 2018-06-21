import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { mount } from 'enzyme';
import fetchMock from 'fetch-mock';
import React from 'react';
import renderer from 'react-test-renderer';
import setUpStore from '../../../store/configureStore';
import TaskList from '../TaskList';
import { Provider } from 'react-redux';


describe('TaskList', () => {
  it('should render task list', () => {

    const component = renderer.create(<TaskList />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })
})
