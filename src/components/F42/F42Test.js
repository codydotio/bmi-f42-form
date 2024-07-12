import React, { useState, useEffect, useRef } from 'react';

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

export default function F42Form() {
  const [company, setCompany] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [website, setWebsite] = useState('');

  const [formData, setFormData] = useState({});
  const formRef = useRef(null);

  useEffect(() => {
    setFormData({
      company,
      firstName,
      lastName,
      website
    });
  }, [company, firstName, lastName, website]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formElement = formRef.current;
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
          name="website"
        />

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
