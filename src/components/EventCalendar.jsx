import React, { useState } from 'react';
import { Container, Row, Col, Button, ButtonGroup } from 'react-bootstrap';
import EventCard from './EventCard';
import EventSignup from './EventSignup';

function EventCalendar({ events, onRegister }) {
  const [selectedSport, setSelectedSport] = useState('all');
  const [showSignup, setShowSignup] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const sports = ['all', 'tennis', 'badminton', 'weightlifting', 'pickleball'];

  const filteredEvents = selectedSport === 'all' 
    ? events 
    : events.filter(event => event.sport === selectedSport);

  const handleSignupClick = (event) => {
    setSelectedEvent(event);
    setShowSignup(true);
  };

  const handleSignupSubmit = (registrationData) => {
    onRegister(selectedEvent.id, registrationData);
    setShowSignup(false);
    setSelectedEvent(null);
  };

  return (
    <Container>
      <Row className="mb-4">
        <Col md={12}>
          <h1 className="text-center mb-4">Upcoming Events</h1>
          <div className="text-center mb-4">
            <ButtonGroup>
              {sports.map(sport => (
                <Button
                  key={sport}
                  variant={selectedSport === sport ? "primary" : "outline-primary"}
                  onClick={() => setSelectedSport(sport)}
                  className="text-capitalize"
                >
                  {sport === 'all' ? 'All Sports' : sport}
                </Button>
              ))}
            </ButtonGroup>
          </div>
        </Col>
      </Row>

      <Row>
        {filteredEvents.length === 0 ? (
          <Col md={12} className="text-center">
            <p className="text-muted">No events found for the selected sport.</p>
          </Col>
        ) : (
          filteredEvents.map(event => (
            <Col md={6} lg={4} key={event.id} className="mb-4">
              <EventCard 
                event={event} 
                onSignupClick={handleSignupClick}
              />
            </Col>
          ))
        )}
      </Row>

      <EventSignup
        show={showSignup}
        event={selectedEvent}
        onHide={() => setShowSignup(false)}
        onSubmit={handleSignupSubmit}
      />
    </Container>
  );
}

export default EventCalendar;