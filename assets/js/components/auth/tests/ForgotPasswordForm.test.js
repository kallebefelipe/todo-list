import ForgotPasswordForm from '../ForgotPasswordForm';
import React from 'react';
import renderer from 'react-test-renderer';


describe('ForgotPassword', () => {
  it('should render forgot password', () => {

    const component = renderer.create(
      <ForgotPasswordForm
        showMessage={() => {}}
        updateEmail={() => {}}
        hdlSubmit={() => {}}
      />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })
})
