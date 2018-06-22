import LoginForm from '../LoginForm';
import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router';


describe('LoginForm', () => {
  it('should render login form', () => {

    const component = renderer.create(
      <MemoryRouter initialEntries={[ '/random' ]}>
        <LoginForm
          showMessage={() => {}}
          isAuthenticated={() => {}}
          updateState={() => {}}
          handleSubmit={() => {}}
        />
      </MemoryRouter>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })
})
