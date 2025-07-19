import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    console.log('Contact form submitted:', formData);
    setShowAlert(true);
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });

    // Hide alert after 5 seconds
    setTimeout(() => setShowAlert(false), 5000);
  };

  return (
    <Container>
      <Row>
        <Col md={8} className="mx-auto">
          <h1 className="text-center mb-4">Contact Us</h1>

          {showAlert && (
            <Alert variant="success" className="mb-4">
              Thank you for your message! We'll get back to you within 24 hours.
            </Alert>
          )}

          <Row>
            <Col md={6} className="mb-4">
              <Card>
                <Card.Body>
                  <h5>Get in Touch</h5>
                  <p>
                    Have questions about our programs, facilities, or membership?
                    We'd love to hear from you!
                  </p>
                  <hr />
                  <p className="mb-2">
                    <strong>📍 Address:</strong><br />
                    123 Summit Drive<br />
                    Sports Valley, CA 90210
                  </p>
                  <p className="mb-2">
                    <strong>📞 Phone:</strong> (555) 123-SPORT
                  </p>
                  <p className="mb-2">
                    <strong>✉️ Email:</strong> info@summitsportsclub.com
                  </p>
                  <p className="mb-0">
                    <strong>🕐 Hours:</strong><br />
                    Mon-Fri: 6:00 AM - 10:00 PM<br />
                    Sat-Sun: 8:00 AM - 8:00 PM
                  </p>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6}>
              <Card>
                <Card.Body>
                  <h5>Send us a Message</h5>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Label>Name *</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Email *</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Subject</Form.Label>
                      <Form.Select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                      >
                        <option value="">Select a topic...</option>
                        <option value="membership">Membership Information</option>
                        <option value="programs">Programs & Classes</option>
                        <option value="facilities">Facilities & Equipment</option>
                        <option value="events">Events & Tournaments</option>
                        <option value="feedback">Feedback & Suggestions</option>
                        <option value="other">Other</option>
                      </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Message *</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={4}
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="How can we help you?"
                        required
                      />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="w-100">
                      Send Message
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Contact;