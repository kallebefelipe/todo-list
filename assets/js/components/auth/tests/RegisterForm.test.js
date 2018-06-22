import RegisterForm from '../RegisterForm';
import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router';


describe('RegisterForm', () => {
  it('should render register form', () => {

    const component = renderer.create(
      <MemoryRouter initialEntries={[ '/random' ]}>
        <RegisterForm
          showMessage={() => {}}
          handleSubmit={() => {}}
          updateState={() => {}}
          passwordErro={false}
          usernameErro={false}
          emailErro={false}
        />
      </MemoryRouter>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })
})
