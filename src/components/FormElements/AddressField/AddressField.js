import React from 'react';
import { Form } from 'react-bootstrap';

const AddressField = ({ placeholder, type, value, onChange, name }) => (
  <Form.Group className="mb-2">
    <Form.Control
      type={type}
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      name={name}
    />
  </Form.Group>
);

export default AddressField;
