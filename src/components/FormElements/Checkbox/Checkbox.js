import React from 'react';
import { Form } from 'react-bootstrap';

const Checkbox = ({ checked, onChange, label, name, id }) => (
  <Form.Check
    type="checkbox"
    label={label}
    checked={checked}
    onChange={onChange}
    name={name}
    id={id}
  />
);

export default Checkbox;