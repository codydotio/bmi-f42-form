import React from 'react';
import { Row, Col } from 'react-bootstrap';

const InputField = ({ label, type, value, onChange, name, placeholder }) => (
  <Row className="mb-2">
    {label && (
      <Col md={3}>
        <label className="block text-gray-700 text-sm font-bold mt-2">{label + `:`}</label>
      </Col>
    )}

    <Col md={label ? 9 : 12}>
      <input
        type={type}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline form-control"
        value={value}
        onChange={onChange}
        name={name}
        placeholder={placeholder}
      />
    </Col>
  </Row>
);

export default InputField;
