import React from 'react';
import { Row, Col, Form } from 'react-bootstrap';

const RadioButtonGroup = ({ selectedValue, setSelectedValue, question, id }) => {
  const handleChange = (e) => {
    setSelectedValue(e.target.value);
  };

  return (
    <Row className="mb-2">
      <Col className="flex-row" md={3}>
        <Form.Check
          inline
          type="radio"
          label="Yes"
          value="1"
          checked={selectedValue === '1'}
          onChange={handleChange}
          className="mr-4"
          id={id + '-1'}
        />
        <Form.Check
          inline
          type="radio"
          label="No"
          value="0"
          checked={selectedValue === '0'}
          onChange={handleChange}
          id={id + '-0'}
        />

      </Col>
      <Col>
        <p className="mb-0">{question}</p>
      </Col>
    </Row>
  );
};

export default RadioButtonGroup;
