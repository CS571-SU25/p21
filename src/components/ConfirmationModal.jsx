import React from 'react';
import { Modal, Button, Alert } from 'react-bootstrap';
import { safeFormatDate } from '../utils/helpers';

function ConfirmationModal({ show, event, currentUser, onHide, onConfirm }) {
  if (!event) return null;

  const formatDate = (dateString) => {
    return safeFormatDate(dateString, {
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric'
    });
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Registration</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-3">
          <h5>Are you sure you want to register for this event?</h5>
        </div>
        
        <div className="mb-3 p-3 bg-light rounded">
          <h6>Event Details:</h6>
          <p className="mb-1"><strong>Event:</strong> {event.title}</p>
          <p className="mb-1"><strong>📅 Date:</strong> {formatDate(event.date)}</p>
          <p className="mb-1"><strong>🕐 Time:</strong> {event.time}</p>
          <p className="mb-1"><strong>📍 Location:</strong> {event.location}</p>
          <p className="mb-0"><strong>Available Spots:</strong> {event.availableSpots}</p>
        </div>

        {currentUser && (
          <div className="mb-3 p-3 border rounded">
            <h6>Your Information:</h6>
            <p className="mb-1"><strong>Name:</strong> {currentUser.firstName} {currentUser.lastName}</p>
            <p className="mb-1"><strong>Email:</strong> {currentUser.email}</p>
            <p className="mb-0"><strong>Phone:</strong> {currentUser.phone || 'Not provided'}</p>
          </div>
        )}

        <Alert variant="info" className="mb-0">
          <small>
            By confirming, you agree to attend this event. Please arrive 10 minutes early.
            If you need to cancel, contact us at least 24 hours in advance.
          </small>
        </Alert>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={onConfirm}>
          Confirm Registration
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmationModal;