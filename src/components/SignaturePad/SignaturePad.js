import React, { useRef, useState, useEffect, forwardRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { Form, Button, Card } from "react-bootstrap";
import './SignaturePad.scss';

const SignaturePad = forwardRef(({ setSignatureData, error }, ref) => {
  const sigCanvas = useRef({});
  const [showEmptyError, setShowEmptyError] = useState(false);
  const [isSignatureSaved, setIsSignatureSaved] = useState(false);

  const clear = () => {
    sigCanvas.current.clear();
    setShowEmptyError(false);
    setIsSignatureSaved(false);
  };

  const save = () => {
    if (sigCanvas.current.isEmpty()) {
      setShowEmptyError(true);
      return;
    }

    const dataURL = sigCanvas.current.getTrimmedCanvas().toDataURL('image/png');
    setSignatureData(dataURL);
    setIsSignatureSaved(true);
    setShowEmptyError(false);
  };

  const handleEnd = () => {
    setShowEmptyError(sigCanvas.current.isEmpty());
    setIsSignatureSaved(false);
  };

  useEffect(() => {
    if (error === "Signature is required") {
      setShowEmptyError(true);
    }
  }, [error]);

  return (
    <Card className="mb-4" ref={ref}>
      <Card.Header>
        <h4>Signature
          <small className="text-muted"> (Sign below)</small>
        </h4>
      </Card.Header>
      <Card.Body className="p-0">
        <div className="signature-pad">
          <SignatureCanvas
            ref={sigCanvas}
            penColor="black"
            canvasProps={{ width: 630, height: 120, className: 'sigCanvas' }}
            onEnd={handleEnd}
          />
          {showEmptyError && (
            <Form.Text className="text-danger">
              {sigCanvas.current.isEmpty() ? "Signature cannot be empty" : "Please save the signature before submitting the form"}
            </Form.Text>
          )}
        </div>
      </Card.Body>
      <Card.Footer>
        <div className="signature-pad-buttons text-center">
          <Button variant="secondary" onClick={clear} className="ms-2">Reset</Button>
          <Button variant="primary" onClick={save} className="ms-2">Save Signature</Button>
        </div>
      </Card.Footer>
    </Card>
  );
});

export default SignaturePad;
