import React, { useState, useRef } from 'react';
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
  const [isSignatureSaved, setIsSignatureSaved] = useState(false);

  const [formData, setFormData] = useState({});
  const formRef = useRef(null);
  const signaturePadRef = useRef(null);
  const [errors, setErrors] = useState({});

  const companyRef = useRef(null);
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const phoneRef = useRef(null);
  const emailRef = useRef(null);
  const websiteRef = useRef(null);
  const descriptionRef = useRef(null);
  const streetRef = useRef(null);
  const cityRef = useRef(null);
  const stateRef = useRef(null);
  const zipRef = useRef(null);
  const radioGroup1Ref = useRef(null);
  const radioGroup2Ref = useRef(null);
  const radioGroup3Ref = useRef(null);
  const radioGroup4Ref = useRef(null);
  const signatureRef = useRef(null);

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
    const zipRegex = /^\d{5}(?:[-\s]\d{4})?$/;

    if (!company) newErrors.company = "Company name is required";
    if (!firstName) newErrors.firstName = "First name is required";
    if (!lastName) newErrors.lastName = "Last name is required";
    if (!phone) newErrors.phone = "Phone number is required";
    else if (!phoneRegex.test(phone)) newErrors.phone = "Invalid phone number format";
    if (!email) newErrors.email = "Email is required";
    else if (!emailRegex.test(email)) newErrors.email = "Invalid email address";
    if (!website) newErrors.website = "Website is required";
    if (!servicesDescription) newErrors.servicesDescription = "Description is required";
    if (!shippingAddress.street) newErrors.street = "Street address is required";
    if (!shippingAddress.city) newErrors.city = "City is required";
    if (!shippingAddress.state) newErrors.state = "State is required";
    if (!shippingAddress.zip) newErrors.zip = "Zip is required";
    else if (!zipRegex.test(shippingAddress.zip)) newErrors.zip = "Invalid zip code format";
    if (!radioGroup1) newErrors.radioGroup1 = "Please select an option";
    if (!radioGroup2) newErrors.radioGroup2 = "Please select an option";
    if (!radioGroup3) newErrors.radioGroup3 = "Please select an option";
    if (!radioGroup4) newErrors.radioGroup4 = "Please select an option";
    if (!signatureData) newErrors.signature = "Signature is required";

    return newErrors;
  };

  const handlePhoneChange = (e) => {
    const input = e.target.value.replace(/\D/g, '');
    let formattedPhoneNumber = '';

    if (input.length > 0) {
      formattedPhoneNumber += '(' + input.substring(0, 3);
    }
    if (input.length >= 3) {
      formattedPhoneNumber += ') ' + input.substring(3, 6);
    } else if (input.length > 3) {
      formattedPhoneNumber += ') ' + input.substring(3);
    }
    if (input.length >= 6) {
      formattedPhoneNumber += '-' + input.substring(6, 10);
    }

    setPhone(formattedPhoneNumber);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formElement = formRef.current;

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);

      // Scroll to the first error
      const errorField = Object.keys(newErrors)[0];
      const errorRefs = {
        company: companyRef,
        firstName: firstNameRef,
        lastName: lastNameRef,
        phone: phoneRef,
        email: emailRef,
        website: websiteRef,
        servicesDescription: descriptionRef,
        street: streetRef,
        city: cityRef,
        state: stateRef,
        zip: zipRef,
        radioGroup1: radioGroup1Ref,
        radioGroup2: radioGroup2Ref,
        radioGroup3: radioGroup3Ref,
        radioGroup4: radioGroup4Ref,
        signature: signatureRef
      };

      if (errorRefs[errorField] && errorRefs[errorField].current) {
        errorRefs[errorField].current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

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
        <Col md={11} lg={8}>
          <div className="form-header">
            <img src={BakerLogo} alt="Baker Manufacturing Inc." className="bmi-logo" />
            <div className="form-header-info">
              <h1 className="mb-1">Supplier Quality Survey</h1>
              <h5>AS9100 F42 5.9.2024 / QA/QC Department</h5>
            </div>
          </div>
          <hr />
          <p>Please complete this supplier survey so we can get your company on Baker's Approved Supplier List. Our QA Manager will follow up to complete the process. In the meantime, any questions, please email will@bakermfginc.com or call (253) 840-8610.</p>
          <hr />
          <Form ref={formRef} action="https://test.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8&orgId=00DVC000001Kg8z" method="POST" onSubmit={handleSubmit} noValidate className="w-full max-w-lg mb-4">
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
              required
              error={errors.company}
              ref={companyRef}
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
                      required
                      error={errors.firstName}
                      ref={firstNameRef}
                    />
                  </Col>
                  <Col md={6}>
                    <InputField
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      name="last_name"
                      placeholder={"Last Name"}
                      required
                      error={errors.lastName}
                      ref={lastNameRef}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <InputField
                      type="tel"
                      value={phone}
                      onChange={handlePhoneChange}
                      name="phone"
                      placeholder={"Phone"}
                      required
                      error={errors.phone}
                      ref={phoneRef}
                    />
                  </Col>
                  <Col md={6}>
                    <InputField
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      name="email"
                      placeholder={"Email"}
                      required
                      error={errors.email}
                      ref={emailRef}
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
              required
              error={errors.website}
            />

            <InputField
              label="Description"
              type="text"
              value={servicesDescription}
              onChange={(e) => setServicesDescription(e.target.value)}
              name="url"
              placeholder={"A brief description of the services you provide"}
              required
              error={errors.servicesDescription}
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
                  errors={errors}
                  refs={{
                    street: streetRef,
                    city: cityRef,
                    state: stateRef,
                    zip: zipRef
                  }}
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
                  error={errors.radioGroup1}
                  ref={radioGroup1Ref}
                />

                <RadioButtonGroup
                  id="radioGroup2"
                  selectedValue={radioGroup2}
                  setSelectedValue={setRadioGroup2}
                  question="Are quality records kept on file for 10 years?"
                  error={errors.radioGroup2}
                  ref={radioGroup2Ref}
                />

                <RadioButtonGroup
                  id="radioGroup3"
                  selectedValue={radioGroup3}
                  setSelectedValue={setRadioGroup3}
                  question="Is a Certificate of Compliance (CofC) provided with each order?"
                  error={errors.radioGroup3}
                  ref={radioGroup3Ref}
                />

                <RadioButtonGroup
                  id="radioGroup4"
                  selectedValue={radioGroup4}
                  setSelectedValue={setRadioGroup4}
                  question="Is a packing slip with order information provided with each shipment?"
                  error={errors.radioGroup4}
                  ref={radioGroup4Ref}
                />
              </Card.Body>
            </Card>

            <SignaturePad ref={signaturePadRef} setSignatureData={(data) => {
              setSignatureData(data);
              setIsSignatureSaved(true);
            }} error={errors.signature} />

            <hr />

            <Card className="form-submit-card">
              <Card.Body>
                <div className="g-recaptcha" data-sitekey="6LeQ__opAAAAAB6h9j5z5IWqUqGajHIc6tOEBbJA"></div>
                <Button type="submit" className="bg-blue-500 text-white px-5 py-3 rounded">Submit Form</Button>
              </Card.Body>
            </Card>

          </Form>
        </Col>
      </Row>
    </Container>
  );
}
