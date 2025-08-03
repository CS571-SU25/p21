import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';

function EventCard({ event, onSignupClick, currentUser, isRegistered }) {
  const getSportColor = (sport) => {
    const colors = {
      tennis: 'success',
      badminton: 'warning',
      weightlifting: 'danger',
      pickleball: 'info'
    };
    return colors[sport] || 'secondary';
  };

  const formatDate = (dateString) => {
    const options = { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const isFullyBooked = event.availableSpots === 0;

  const getButtonText = () => {
    if (isFullyBooked) return "Fully Booked";
    if (isRegistered) return "Already Registered";
    if (!currentUser) return "Sign Up";
    return "Sign Up";
  };

  const getButtonVariant = () => {
    if (isFullyBooked) return "secondary";
    if (isRegistered) return "success";
    if (!currentUser) return "outline-primary";
    return "primary";
  };

  return (
    <Card className="h-100">
      <Card.Header className="d-flex justify-content-between align-items-center">
        <Badge bg={getSportColor(event.sport)} className="text-capitalize">
          {event.sport}
        </Badge>
        <small className="text-muted">
          {event.availableSpots} spots left
        </small>
      </Card.Header>
      <Card.Body className="d-flex flex-column">
        <Card.Title>{event.title}</Card.Title>
        <Card.Text>{event.description}</Card.Text>
        <div className="mt-auto">
          <p className="mb-2">
            <strong>📅 Date:</strong> {formatDate(event.date)}<br/>
            <strong>🕐 Time:</strong> {event.time}<br/>
            <strong>📍 Location:</strong> {event.location}
          </p>
          <Button 
            variant={getButtonVariant()}
            onClick={() => onSignupClick(event)}
            disabled={isFullyBooked || isRegistered}
            className="w-100"
          >
            {getButtonText()}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default EventCard;