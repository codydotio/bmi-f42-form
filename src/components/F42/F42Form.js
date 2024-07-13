import React, { useState, useEffect, useRef } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import CheckboxGroup from '../FormElements/CheckboxGroup/CheckboxGroup';
import InputField from '../FormElements/InputField/InputField';
import AddressFields from '../FormElements/AddressFields/AddressFields';
import RadioButtonGroup from '../FormElements/RadioButtonGroup/RadioButtonGroup';
import SignaturePad from '../SignaturePad/SignaturePad';
import BakerLogo from '../../assets/images/bmi-logo.png';
import supplierTypeOptions from '../../data/supplierTypeOptions';
import qualitySystemsOptions from '../../data/qualitySystemsOptions';
import certificationsOptions from '../../data/certificationsOptions';
import './F42Form.scss';

export default function F42Form() {
  const [company, setCompany] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [servicesDescription, setServicesDescription] = useState('');

  const [shippingAddress, setShippingAddress] = useState({
    street: '',
    suite: '',
    city: '',
    state: '',
    zip: ''
  });

  const [supplierTypeSelected, setSupplierTypeSelected] = useState([]);
  const [supplierTypeOtherValue, setSupplierTypeOtherValue] = useState("");
  const [qualitySystemsSelected, setQualitySystemsSelected] = useState([]);
  const [qualitySystemsOtherValue, setQualitySystemsOtherValue] = useState("");
  const [certificationsSelected, setCertificationsSelected] = useState([]);
  const [certificationsOtherValue, setCertificationsOtherValue] = useState("");

  const [radioGroup1, setRadioGroup1] = useState('');
  const [radioGroup2, setRadioGroup2] = useState('');
  const [radioGroup3, setRadioGroup3] = useState('');
  const [radioGroup4, setRadioGroup4] = useState('');

  const [signatureData, setSignatureData] = useState(null);

  const [formData, setFormData] = useState({});
  const formRef = useRef(null);

  useEffect(() => {
    setFormData({
      company,
      firstName,
      lastName,
      website,
      shippingAddress,
      supplierType: supplierTypeSelected.includes('other') ? supplierTypeOtherValue : supplierTypeSelected,
      qualitySystems: qualitySystemsSelected.includes('other') ? qualitySystemsOtherValue : qualitySystemsSelected,
      certifications: certificationsSelected.includes('other') ? certificationsOtherValue : certificationsSelected,
      signature: signatureData,
      radioGroup1,
      radioGroup2,
      radioGroup3,
      radioGroup4
    });
  }, [company, firstName, lastName, website, shippingAddress, supplierTypeSelected, supplierTypeOtherValue, qualitySystemsSelected, qualitySystemsOtherValue, certificationsSelected, certificationsOtherValue, signatureData, radioGroup1, radioGroup2, radioGroup3, radioGroup4]);

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
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={11}>
          <img src={BakerLogo} alt="Baker Manufacturing Inc." className="mb-4 bmi-logo" />
          <h1 className="mb-4">Supplier Quality Survey</h1>
          <h5>AS9100 F42 5.9.2024 / QA/QC Department</h5>
          <p>Please complete this supplier survey so we can get your company on Baker's Approved Supplier List. Our QA Manager will follow up to complete the process. In the meantime, any questions, please email will@bakermfginc.com or call (253) 840-8610.</p>
          <Form ref={formRef} action="https://test.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8&orgId=00DVC000001Kg8z" method="POST" onSubmit={handleSubmit} className="w-full max-w-lg">
            <input type="hidden" name='captcha_settings' value='{"keyname":"BMI_Supplier_Form","fallback":"true","orgId":"00DVC000001Kg8z","ts":""}' />
            <input type="hidden" name="oid" value="00DVC000001Kg8z" />
            <input type="hidden" name="retURL" value="http://bakermfginc.com/contact" />
            <input type="hidden" id="00NVC000001LVhl" name="00NVC000001LVhl" value={supplierTypeSelected.join('; ')} data-id="supplier_type" />
            <input type="hidden" id="00NVC000001Lc89" name="00NVC000001Lc89" value={qualitySystemsSelected.join('; ')} data-id="quality_systems" />
            <input type="hidden" id="00NVC000001UX61" name="00NVC000001UX61" value={certificationsSelected.join('; ')} data-id="certifications" />
            {/* <input type="hidden" id="00NVC000001UiRF" name="00NVC000001UiRF" value={signatureData} data-id="signature-data" /> */}
            <input type="hidden" name="00NVC000001V3x7" value={radioGroup1} />
            <input type="hidden" name="00NVC000001V59J" value={radioGroup2} />
            <input type="hidden" name="00NVC000001V5Av" value={radioGroup3} />
            <input type="hidden" name="00NVC000001V5CX" value={radioGroup4} />

            <InputField
              label="Company Name"
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              name="company"
              placeholder={"Company Name"}
            />

            <Row>
              <Col md={3}>
                <label className="block text-gray-700 text-sm font-bold mt-2">Main Contact:</label>
              </Col>
              <Col md={9}>
                <Row>
                  <Col md={6}>
                    <InputField
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      name="first_name"
                      placeholder={"First Name"}
                    />
                  </Col>
                  <Col md={6}>
                    <InputField
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      name="last_name"
                      placeholder={"Last Name"}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <InputField
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      name="phone"
                      placeholder={"Phone"}
                    />
                  </Col>
                  <Col md={6}>
                    <InputField
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      name="email"
                      placeholder={"Email"}
                    />
                  </Col>
                </Row>

              </Col>
            </Row>

            <InputField
              label="Website"
              type="text"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              name="url"
              placeholder={"www.company.com"}
            />

            <InputField
              label="Description"
              type="text"
              value={servicesDescription}
              onChange={(e) => setServicesDescription(e.target.value)}
              name="url"
              placeholder={"A brief description of the services you provide"}
            />

            <hr />

            <Row>
              <Col md={3}>
                <label className="block text-gray-700 text-sm font-bold mt-2">Shipping Address:</label>
              </Col>
              <Col md={9}>
                <AddressFields
                  addressType="Shipping"
                  address={shippingAddress}
                  setAddress={setShippingAddress}
                />
              </Col>
            </Row>

            <Card className="mb-4">
              <Card.Header>
                <h4>Supplier Type
                  <small> (Check all that apply)</small>
                </h4>
              </Card.Header>
              <Card.Body>
                <CheckboxGroup
                  identifier={'SupplierType'}
                  options={supplierTypeOptions}
                  selected={supplierTypeSelected}
                  setSelected={setSupplierTypeSelected}
                  otherValue={supplierTypeOtherValue}
                  setOtherValue={setSupplierTypeOtherValue}
                />
              </Card.Body>
            </Card>

            <Card className="mb-4">
              <Card.Header>
                <h4>Quality Systems
                  <small> (Check all that apply)</small>
                </h4>
              </Card.Header>
              <Card.Body>
                <CheckboxGroup
                  identifier={'QualitySystems'}
                  options={qualitySystemsOptions}
                  selected={qualitySystemsSelected}
                  setSelected={setQualitySystemsSelected}
                  otherValue={qualitySystemsOtherValue}
                  setOtherValue={setQualitySystemsOtherValue}
                />
              </Card.Body>
            </Card>

            <Card className="mb-4">
              <Card.Header>
                <h4>Certifications / Audits / Registrations
                  <small> (Check all that apply)</small>
                </h4>
              </Card.Header>
              <Card.Body>
                <CheckboxGroup
                  identifier={'Certifications'}
                  options={certificationsOptions}
                  selected={certificationsSelected}
                  setSelected={setCertificationsSelected}
                  otherValue={certificationsOtherValue}
                  setOtherValue={setCertificationsOtherValue}
                />
              </Card.Body>
            </Card>

            <Card className="mb-4">
              <Card.Body>
                <RadioButtonGroup
                  id="radioGroup1"
                  selectedValue={radioGroup1}
                  setSelectedValue={setRadioGroup1}
                  question="Does your company adhere to Baker's Procurement Quality Requirements?"
                />

                <RadioButtonGroup
                  id="radioGroup2"
                  selectedValue={radioGroup2}
                  setSelectedValue={setRadioGroup2}
                  question="Are quality records kept on file for 10 years?"
                />

                <RadioButtonGroup
                  id="radioGroup3"
                  selectedValue={radioGroup3}
                  setSelectedValue={setRadioGroup3}
                  question="Is a Certificate of Compliance (CofC) provided with each order?"
                />

                <RadioButtonGroup
                  id="radioGroup4"
                  selectedValue={radioGroup4}
                  setSelectedValue={setRadioGroup4}
                  question="Is a packing slip with order information provided with each shipment?"
                />
              </Card.Body>
            </Card>

            <SignaturePad setSignatureData={setSignatureData} />

            <hr />

            <div className="g-recaptcha" data-sitekey="6LeQ__opAAAAAB6h9j5z5IWqUqGajHIc6tOEBbJA"></div>

            <Button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Submit</Button>
          </Form>
          <div className="w-full max-w-lg mt-8 p-4 border rounded">
            <h2 className="font-semibold mb-2">Form Data Preview</h2>
            <pre className="text-sm whitespace-pre-wrap">{JSON.stringify(formData, null, 2)}</pre>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
