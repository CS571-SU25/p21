import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function UserDashboard({ currentUser }) {
  const [userEvents, setUserEvents] = useState([]);
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    if (currentUser) {
      // Get all events and filter user's registrations
      const allEvents = JSON.parse(sessionStorage.getItem('events') || '[]');
      const registrations = JSON.parse(sessionStorage.getItem('registrations') || '[]');
      
      const userRegistrations = registrations.filter(reg => reg.userId === currentUser.id);
      const registeredEvents = allEvents.filter(event => 
        userRegistrations.some(reg => reg.eventId === event.id)
      );
      
      setUserEvents(registeredEvents);

      // Get user's posts
      const allPosts = JSON.parse(sessionStorage.getItem('posts') || '[]');
      const userSpecificPosts = allPosts.filter(post => post.userId === currentUser.id);
      setUserPosts(userSpecificPosts);
    }
  }, [currentUser]);

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

  if (!currentUser) {
    return (
      <Container>
        <Alert variant="warning" className="text-center">
          Please <Link to="/login">login</Link> to view your dashboard.
        </Alert>
      </Container>
    );
  }

  return (
    <Container>
      <Row className="mb-4">
        <Col md={12}>
          <h1>Welcome back, {currentUser.firstName}!</h1>
          <p className="text-muted">Here's an overview of your activity at Summit Sports Club</p>
        </Col>
      </Row>

      {/* Registered Events Section */}
      <Row className="mb-5">
        <Col md={12}>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3>My Registered Events</h3>
            <Link to="/events">
              <Button variant="outline-primary">Browse More Events</Button>
            </Link>
          </div>
          
          {userEvents.length === 0 ? (
            <Card className="text-center p-4">
              <Card.Body>
                <p className="text-muted">You haven't registered for any events yet.</p>
                <Link to="/events">
                  <Button variant="primary">Explore Events</Button>
                </Link>
              </Card.Body>
            </Card>
          ) : (
            <Row>
              {userEvents.map(event => (
                <Col md={6} lg={4} key={event.id} className="mb-3">
                  <Card className="h-100">
                    <Card.Header className="d-flex justify-content-between">
                      <Badge bg={getSportColor(event.sport)} className="text-capitalize">
                        {event.sport}
                      </Badge>
                      <small className="text-muted">Registered ✓</small>
                    </Card.Header>
                    <Card.Body>
                      <Card.Title>{event.title}</Card.Title>
                      <p className="mb-1"><strong>📅 Date:</strong> {formatDate(event.date)}</p>
                      <p className="mb-1"><strong>🕐 Time:</strong> {event.time}</p>
                      <p className="mb-0"><strong>📍 Location:</strong> {event.location}</p>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Col>
      </Row>

      {/* My Posts Section */}
      <Row>
        <Col md={12}>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3>My Community Posts</h3>
            <Link to="/posts/create">
              <Button variant="outline-success">Create New Post</Button>
            </Link>
          </div>
          
          {userPosts.length === 0 ? (
            <Card className="text-center p-4">
              <Card.Body>
                <p className="text-muted">You haven't created any posts yet.</p>
                <Link to="/posts/create">
                  <Button variant="success">Write Your First Post</Button>
                </Link>
              </Card.Body>
            </Card>
          ) : (
            <Row>
              {userPosts.map(post => (
                <Col md={6} key={post.id} className="mb-3">
                  <Card>
                    <Card.Body>
                      <Card.Title>{post.title}</Card.Title>
                      <Card.Text>
                        {post.content.substring(0, 150)}
                        {post.content.length > 150 ? '...' : ''}
                      </Card.Text>
                      <small className="text-muted">
                        Posted on {formatDate(post.createdAt)}
                      </small>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default UserDashboard; 