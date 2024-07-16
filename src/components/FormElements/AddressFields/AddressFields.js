import React from 'react';
import { Row, Col, Form } from 'react-bootstrap';

const AddressField = React.forwardRef(({ placeholder, type, value, onChange, name, error }, ref) => (
  <Form.Group className="mb-2">
    <Form.Control
      ref={ref}
      type={type}
      className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${error ? 'border-danger' : ''}`}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      name={name}
    />
    {error && <Form.Text className="text-danger">{error}</Form.Text>}
  </Form.Group>
));

const AddressFields = ({ addressType, address, setAddress, errors, refs }) => (
  <div className="mb-4">
    <Row>
      <Col md={12}>
        <AddressField
          ref={refs.street}
          placeholder="Street"
          type="text"
          value={address.street}
          onChange={(e) => setAddress({ ...address, street: e.target.value })}
          name="street"
          error={errors.street}
        />
      </Col>
    </Row>
    <Row>
      <Col md={6}>
        <AddressField
          ref={refs.city}
          placeholder="City"
          type="text"
          value={address.city}
          onChange={(e) => setAddress({ ...address, city: e.target.value })}
          name="city"
          error={errors.city}
        />
      </Col>
      <Col md={3}>
        <AddressField
          ref={refs.state}
          placeholder="State"
          type="text"
          value={address.state}
          onChange={(e) => setAddress({ ...address, state: e.target.value })}
          name="state"
          error={errors.state}
        />
      </Col>
      <Col md={3}>
        <AddressField
          ref={refs.zip}
          placeholder="Zip"
          type="text"
          value={address.zip}
          onChange={(e) => setAddress({ ...address, zip: e.target.value })}
          name="zip"
          error={errors.zip}
        />
      </Col>
    </Row>
  </div>
);

export default AddressFields;
