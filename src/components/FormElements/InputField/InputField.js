import React from 'react';
import { Row, Col, Form } from 'react-bootstrap';

const InputField = React.forwardRef(({ label, type, value, onChange, name, placeholder, error }, ref) => (
  <Row className="mb-2">
    {label && (
      <Col md={3}>
        <label className="block text-gray-700 text-sm font-bold mt-2">{label + `:`}</label>
      </Col>
    )}
    <Col md={label ? 9 : 12}>
      <input
        ref={ref}
        type={type}
        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline form-control ${error ? 'border-danger' : ''}`}
        value={value}
        onChange={onChange}
        name={name}
        placeholder={placeholder}
      />
      {error && <Form.Text className="text-danger">{error}</Form.Text>}
    </Col>
  </Row>
));

export default InputField;
