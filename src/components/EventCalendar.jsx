import React, { useState } from 'react';
import { Container, Row, Col, Button, ButtonGroup, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import EventCard from './EventCard';
import ConfirmationModal from './ConfirmationModal';
import { safeSessionStorageGet } from '../utils/helpers';

function EventCalendar({ events, onRegister, currentUser }) {
  const [selectedSport, setSelectedSport] = useState('all');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [registrationError, setRegistrationError] = useState('');
  const navigate = useNavigate();

  const sports = ['all', 'tennis', 'badminton', 'weightlifting', 'pickleball'];

  const filteredEvents = selectedSport === 'all' 
    ? events 
    : events.filter(event => event.sport === selectedSport);

  // Check if user is already registered for an event
  const isUserRegistered = (eventId) => {
    if (!currentUser) return false;
    const registrations = safeSessionStorageGet('registrations', []);
    return registrations.some(reg => reg.eventId === eventId && reg.userId === currentUser.id);
  };

  const handleSignupClick = (event) => {
    setRegistrationError('');
    
    // If user is not logged in, redirect to register page
    if (!currentUser) {
      navigate('/register');
      return;
    }

    // Check if user is already registered for this event
    if (isUserRegistered(event.id)) {
      setRegistrationError('You are already registered for this event!');
      return;
    }

    // Check if event has available spots
    if (event.availableSpots <= 0) {
      setRegistrationError('This event is fully booked!');
      return;
    }

    setSelectedEvent(event);
    setShowConfirmation(true);
  };

  const handleConfirmRegistration = () => {
    // Create registration data from current user
    const registrationData = {
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      email: currentUser.email,
      phone: currentUser.phone || '',
      emergencyContact: ''
    };
    
    const success = onRegister(selectedEvent.id, registrationData);
    
    if (success) {
      setShowConfirmation(false);
      setSelectedEvent(null);
      setRegistrationError('');
    } else {
      setRegistrationError('Registration failed. The event may be full or you may already be registered.');
      setShowConfirmation(false);
    }
  };



  return (
    <Container>
      <Row className="mb-4">
        <Col md={12}>
          <h1 className="text-center mb-4">Upcoming Events</h1>
          
          {registrationError && (
            <Alert variant="warning" dismissible onClose={() => setRegistrationError('')}>
              {registrationError}
            </Alert>
          )}
          
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
                currentUser={currentUser}
                isRegistered={isUserRegistered(event.id)}
              />
            </Col>
          ))
        )}
      </Row>

      <ConfirmationModal
        show={showConfirmation}
        event={selectedEvent}
        currentUser={currentUser}
        onHide={() => setShowConfirmation(false)}
        onConfirm={handleConfirmRegistration}
      />


    </Container>
  );
}

export default EventCalendar;