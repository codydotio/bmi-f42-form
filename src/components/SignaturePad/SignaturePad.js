import React, { useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { Button, Card } from "react-bootstrap";
import './SignaturePad.scss';

const SignaturePad = ({ setSignatureData }) => {
  const sigCanvas = useRef({});

  const clear = () => sigCanvas.current.clear();
  const save = () => {
    const dataURL = sigCanvas.current.getTrimmedCanvas().toDataURL('image/png');
    setSignatureData(dataURL);
  };

  return (
    <Card className="mb-4">
      <Card.Header>
        <h4>Signature
          <small className="text-muted"> (Sign below)</small>
        </h4>
      </Card.Header>
      <Card.Body>
        <div className="signature-pad">
          <SignatureCanvas
            ref={sigCanvas}
            penColor="black"
            canvasProps={{ width: 500, height: 100, className: 'sigCanvas' }}
          />
        </div>
      </Card.Body>
      <Card.Footer>
        <div className="signature-pad-buttons">
          <Button variant="secondary" onClick={clear} className="mr-2">Clear</Button>
          <Button variant="primary" onClick={save} className="ml-2">Save</Button>
        </div>
      </Card.Footer>
    </Card>

  );
};

export default SignaturePad;
