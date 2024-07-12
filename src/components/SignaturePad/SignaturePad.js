import React, { useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
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
        <button type="button" onClick={clear}>Clear</button>
        <button type="button" onClick={save}>Save</button>
      </div>
    </div>
  );
};

export default SignaturePad;
