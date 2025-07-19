import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';

function EventCard({ event, onSignupClick }) {
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
            variant={isFullyBooked ? "secondary" : "primary"}
            onClick={() => onSignupClick(event)}
            disabled={isFullyBooked}
            className="w-100"
          >
            {isFullyBooked ? "Fully Booked" : "Sign Up"}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default EventCard;