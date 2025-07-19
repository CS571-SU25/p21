import React, { useState } from 'react';
import { Modal, Form, Button, Alert } from 'react-bootstrap';

function EventSignup({ show, event, onHide, onSubmit }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    emergencyContact: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setShowSuccess(true);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      emergencyContact: ''
    });
    
    // Hide success message and modal after 2 seconds
    setTimeout(() => {
      setShowSuccess(false);
      onHide();
    }, 2000);
  };

  if (!event) return null;

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Sign Up for {event.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {showSuccess && (
          <Alert variant="success">
            Registration successful! You're signed up for {event.title}.
          </Alert>
        )}
        
        <div className="mb-3 p-3 bg-light rounded">
          <h6>Event Details:</h6>
          <p className="mb-1"><strong>Date:</strong> {event.date}</p>
          <p className="mb-1"><strong>Time:</strong> {event.time}</p>
          <p className="mb-1"><strong>Location:</strong> {event.location}</p>
          <p className="mb-0"><strong>Available Spots:</strong> {event.availableSpots}</p>
        </div>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>First Name *</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Last Name *</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email Address *</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Phone Number *</Form.Label>
            <Form.Control
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Emergency Contact</Form.Label>
            <Form.Control
              type="text"
              name="emergencyContact"
              value={formData.emergencyContact}
              onChange={handleChange}
              placeholder="Name and phone number"
            />
          </Form.Group>

          <div className="d-flex gap-2">
            <Button variant="secondary" onClick={onHide}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Complete Registration
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default EventSignup;