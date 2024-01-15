import React, { useState } from 'react';
import { Button, Card, Modal, Form } from 'react-bootstrap';

const Dashboard = ({data, setData}) => {
  const [showModal, setShowModal] = useState(false);
//   const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    supplierInfo: '',
    mfgDate: '',
  });

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const formSubmitHandler = async (event) => {
    event.preventDefault();

    const { name, price, supplierInfo, mfgDate } = formData;

    const itemObject = {
      name,
      price,
      supplierInfo,
      mfgDate,
    };

    const itemResponse = await fetch('http://localhost:8000/item/add', {
      method: 'POST',
      body: JSON.stringify(itemObject),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (itemResponse.status === 200) {
      const item = await itemResponse.json();
      setData((prevData) => [item.data, ...prevData]);
      setShowModal(false);
    }
  };

  const handleDelete = (index) => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
  };

  return (
    <div>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <Button className="add_data " variant="primary" onClick={handleShowModal}>
      Add Data
    </Button>
  </nav>
  

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formSupplierInfo">
              <Form.Label>Supplier Info</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter supplier info"
                name="supplierInfo"
                value={formData.supplierInfo}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formMfgDate">
              <Form.Label>Mfg Date</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter manufacturing date"
                name="mfgDate"
                value={formData.mfgDate}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={formSubmitHandler}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="card-container">
        {data.map((item, index) => (
          <Card key={index} style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>{item.name}</Card.Title>
              <Card.Text>
                Price: {item.price} <br />
                Supplier Info: {item.supplierInfo} <br />
                Mfg Date: {item.mfgDate}
              </Card.Text>
              <Button variant="danger" onClick={() => handleDelete(index)}>
                Delete
              </Button>
              {/* You can add an update button and functionality here */}
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
