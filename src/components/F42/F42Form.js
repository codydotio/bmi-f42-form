import React, { useState, useEffect, useRef } from 'react';
import { FaCheckSquare, FaSquare } from 'react-icons/fa';
import SignaturePad from '../SignaturePad/SignaturePad';

const Checkbox = ({ checked, onChange, label, name }) => (
  <label className="flex items-center mb-1">
    <input
      type="checkbox"
      className="hidden"
      checked={checked}
      onChange={onChange}
      name={name}
    />
    {checked ? <FaCheckSquare className="mr-2" /> : <FaSquare className="mr-2" />}
    {label}
  </label>
);

const CheckboxGroup = ({ groupName, options, selected, setSelected, otherValue, setOtherValue }) => {
  const handleChange = (value) => {
    setSelected((prevSelected) =>
      prevSelected.includes(value)
        ? prevSelected.filter((item) => item !== value)
        : [...prevSelected, value]
    );
    if (value !== 'other') {
      setOtherValue("");
    }
  }

  return (
    <div className="mb-4">
      <h2 className="font-semibold mb-2">{groupName}</h2>
      {options.map((option) => (
        <Checkbox
          key={option}
          checked={selected.includes(option)}
          onChange={() => handleChange(option)}
          label={option}
        />
      ))}
      <Checkbox
        checked={selected.includes('other')}
        onChange={() => handleChange('other')}
        label="Other"
      />
      {selected.includes('other') && (
        <input
          type="text"
          className="border mt-2 p-1"
          value={otherValue}
          onChange={(e) => setOtherValue(e.target.value)}
          placeholder="Please specify"
        />
      )}
    </div>
  );
};

const InputField = ({ label, type, value, onChange, name }) => (
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>
    <input
      type={type}
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      value={value}
      onChange={onChange}
      name={name}
    />
  </div>
);

const supplierTypeOptions = [
  'Machining (CNC, EDM, Swiss)',
  'Pre-Process Machining (Cutting)',
  'Post-Process Machining (Welding)',
  'Processing (Anodizing, Plating, Laser)',
  'Testing (NDE, C-Scan, USI)'
];

const qualitySystemsOptions = [
  'Documented Quality Management Manual',
  'ISO 9001',
  'ISO 17025',
  'AS9100D',
  'AS9104',
  'AS9120',
  'Nadcap NDT',
  'Nadcap Chemical Processing',
  'Napcap Surface Enhancement',
  'Nadcap Heat Treating',
  'Nadcap AC7004'
];

const certificationsOptions = [
  'ITAR Registered',
  'Exostar',
  'JCP (DD2345)',
  'CMMC Level 1',
  'CMMC Level 2'
];

export default function F42_Test() {
  const [company, setCompany] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [website, setWebsite] = useState('');

  const [supplierTypeSelected, setSupplierTypeSelected] = useState([]);
  const [supplierTypeOtherValue, setSupplierTypeOtherValue] = useState("");
  const [qualitySystemsSelected, setQualitySystemsSelected] = useState([]);
  const [qualitySystemsOtherValue, setQualitySystemsOtherValue] = useState("");
  const [certificationsSelected, setCertificationsSelected] = useState([]);
  const [certificationsOtherValue, setCertificationsOtherValue] = useState("");

  const [signatureData, setSignatureData] = useState(null);

  const [formData, setFormData] = useState({});
  const formRef = useRef(null);

  useEffect(() => {
    setFormData({
      company,
      firstName,
      lastName,
      website,
      supplierType: supplierTypeSelected.includes('other') ? supplierTypeOtherValue : supplierTypeSelected,
      qualitySystems: qualitySystemsSelected.includes('other') ? qualitySystemsOtherValue : qualitySystemsSelected,
      certifications: certificationsSelected.includes('other') ? certificationsOtherValue : certificationsSelected,
      signature: signatureData
    });
  }, [company, firstName, lastName, website, supplierTypeSelected, supplierTypeOtherValue, qualitySystemsSelected, qualitySystemsOtherValue, certificationsSelected, certificationsOtherValue, signatureData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formElement = formRef.current;

    const signatureInput = document.createElement('input');
    signatureInput.type = 'hidden';
    signatureInput.name = '00NVC000001UiRF';
    signatureInput.value = formData.signature;
    formElement.appendChild(signatureInput);


    console.log(formData);

    // Submit to Salesforce Web-to-Lead
    formElement.submit();
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="font-semibold mb-8">Welcome to my app!</h1>
      <form ref={formRef} action="https://test.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8&orgId=00DVC000001Kg8z" method="POST" onSubmit={handleSubmit} className="w-full max-w-lg">
        <input type="hidden" name='captcha_settings' value='{"keyname":"BMI_Supplier_Form","fallback":"true","orgId":"00DVC000001Kg8z","ts":""}' />
        <input type="hidden" name="oid" value="00DVC000001Kg8z" />
        <input type="hidden" name="retURL" value="http://bakermfginc.com/contact" />
        <input type="hidden" id="00NVC000001LVhl" name="00NVC000001LVhl" value={supplierTypeSelected.join('; ')} data-id="supplier_type" />
        <input type="hidden" id="00NVC000001Lc89" name="00NVC000001Lc89" value={qualitySystemsSelected.join('; ')} data-id="quality_systems" />
        <input type="hidden" id="00NVC000001UX61" name="00NVC000001UX61" value={certificationsSelected.join('; ')} data-id="certifications" />
        {/* <input type="hidden" id="00NVC000001UiRF" name="00NVC000001UiRF" value={signatureData} data-id="signature-data" /> */}

        <InputField
          label="Company Name"
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          name="company"
        />
        <InputField
          label="First Name"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          name="first_name"
        />
        <InputField
          label="Last Name"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          name="last_name"
        />
        <InputField
          label="Website"
          type="text"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          name="url"
        />
        <CheckboxGroup
          groupName="Supplier Type"
          options={supplierTypeOptions}
          selected={supplierTypeSelected}
          setSelected={setSupplierTypeSelected}
          otherValue={supplierTypeOtherValue}
          setOtherValue={setSupplierTypeOtherValue}
        />
        <CheckboxGroup
          groupName="Quality Systems"
          options={qualitySystemsOptions}
          selected={qualitySystemsSelected}
          setSelected={setQualitySystemsSelected}
          otherValue={qualitySystemsOtherValue}
          setOtherValue={setQualitySystemsOtherValue}
        />
        <CheckboxGroup
          groupName="Certifications / Audits / Registrations"
          options={certificationsOptions}
          selected={certificationsSelected}
          setSelected={setCertificationsSelected}
          otherValue={certificationsOtherValue}
          setOtherValue={setCertificationsOtherValue}
        />

        <SignaturePad setSignatureData={setSignatureData} />

        <div className="g-recaptcha" data-sitekey="6LeQ__opAAAAAB6h9j5z5IWqUqGajHIc6tOEBbJA"></div>

        <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
      </form>
      <div className="w-full max-w-lg mt-8 p-4 border rounded">
        <h2 className="font-semibold mb-2">Form Data Preview</h2>
        <pre className="text-sm whitespace-pre-wrap">{JSON.stringify(formData, null, 2)}</pre>
      </div>
    </div>
  );
}