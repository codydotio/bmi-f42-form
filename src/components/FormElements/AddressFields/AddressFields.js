import React from 'react';
import { Row, Col } from 'react-bootstrap';
import AddressField from '../AddressField/AddressField';

const AddressFields = ({ addressType, address, setAddress }) => (
  <div className="mb-4">
    <Row>
      <Col md={12}>
        <AddressField
          placeholder="Street"
          type="text"
          value={address.street}
          onChange={(e) => setAddress({ ...address, street: e.target.value })}
          name="street"
        />
      </Col>
    </Row>

    <Row>
      <Col md={6}>
        <AddressField
          placeholder="City"
          type="text"
          value={address.city}
          onChange={(e) => setAddress({ ...address, city: e.target.value })}
          name="city"
        />
      </Col>
      <Col md={3}>
        <AddressField
          placeholder="State"
          type="text"
          value={address.state}
          onChange={(e) => setAddress({ ...address, state: e.target.value })}
          name="state"
        />
      </Col>
      <Col md={3}>
        <AddressField
          placeholder="Zip"
          type="text"
          value={address.zip}
          onChange={(e) => setAddress({ ...address, zip: e.target.value })}
          name="zip"
        />
      </Col>
    </Row>
  </div>
);

export default AddressFields;
