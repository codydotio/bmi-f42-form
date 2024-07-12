import React, { useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { Button } from "react-bootstrap";
import './SignaturePad.scss';

const SignaturePad = ({ setSignatureData }) => {
  const sigCanvas = useRef({});

  const clear = () => sigCanvas.current.clear();
  const save = () => {
    const dataURL = sigCanvas.current.getTrimmedCanvas().toDataURL('image/png');
    setSignatureData(dataURL);
  };

  return (
    <div className="signature-pad">
      <SignatureCanvas
        ref={sigCanvas}
        penColor="black"
        canvasProps={{ width: 500, height: 200, className: 'sigCanvas' }}
      />
      <div className="signature-pad-buttons">
        <Button variant="secondary" onClick={clear} className="mr-2">Clear</Button>
        <Button variant="primary" onClick={save}>Save</Button>
      </div>
    </div>
  );
};

export default SignaturePad;
