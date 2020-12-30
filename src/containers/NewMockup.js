import React, { useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import { useHistory } from "react-router-dom";
import LoaderButton from "../components/LoaderButton";
import { onError } from "../libs/errorLib";
import config from "../config";
import { API } from "aws-amplify";
import { s3Upload } from "../libs/awsLib";
import "./NewMockup.css";


export default function NewScan() {
  const file = useRef(null);
  const history = useHistory();
  const [packageType, setPackageType] = useState("");
  const [projectName, setProjectName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return true // (packageType.length > 0) && file.current && projectName;
  }

  function handleFileChange(event) {
    file.current = event.target.files[0];
    console.log(file.current)
    console.log(packageType)
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
      alert(
        `Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE /
          1000000} MB.`
      );
      return;
    }

    setIsLoading(true);

    try {
        // const attachment = file.current ? await s3Upload(projectName, file.current) : null;

        createMockup({packageType});
        history.push("/");
    } catch(e) {
        onError(e);
        setIsLoading(false);
    }
  }

  function createMockup(packageType) {
      console.log(packageType);
      API.get("blueprint-python-api", "/gen")
         .then(response => {
           console.log(response)
         })
  }
  return (
    <div className="NewMockup">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="projectNameInput">
          <Form.Label><b>Input Project Name</b></Form.Label>
          <Form.Control
            value={projectName}
            as="input"
            onChange= {(e) => setProjectName(e.target.value)}
          >            
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="packageInput">
          <Form.Label><b>Select Package</b></Form.Label>
          <Form.Control
            value={packageType}
            as="select"
            onChange={(e) => setPackageType(e.target.value)}
          >
            <option></option>
            <option>Labor Package</option>
            <option>Corporate Package</option>
            <option>School Package</option>
            <option>Brewery Package</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="file">
          <Form.Label><b>Logo Upload</b></Form.Label>
          <Form.Control onChange={handleFileChange} type="file" />
        </Form.Group>
        <LoaderButton
          block
          type="submit"
          size="lg"
          variant="primary"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Create Mockup Package
        </LoaderButton>
      </Form>
    </div>
  );
}