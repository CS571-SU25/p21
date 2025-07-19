import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Home() {
  const sports = [
    {
      name: "Tennis",
      description: "Professional courts for all skill levels",
      icon: "🎾"
    },
    {
      name: "Badminton",
      description: "Indoor courts with quality equipment",
      icon: "🏸"
    },
    {
      name: "Weight Lifting",
      description: "Modern gym with professional trainers",
      icon: "🏋️"
    },
    {
      name: "Pickleball",
      description: "Fast-growing sport for all ages",
      icon: "🏓"
    }
  ];

  return (
    <Container>
      <Row className="mb-5">
        <Col xs={12} sm={10} md={8} lg={6} className="mx-auto text-center">
          <h1 className="display-4 mb-4">Welcome to Summit Sports Club</h1>
          <p className="lead">
            A vibrant, community-oriented sports club offering premier facilities 
            and programs for tennis, badminton, weight lifting, and pickleball. 
            Join our welcoming community and discover your athletic potential!
          </p>
          <Link to="/events">
            <Button variant="primary" size="lg" className="mt-3">
              View Upcoming Events
            </Button>
          </Link>
        </Col>
      </Row>

      <Row>
        <Col md={12} className="mb-4">
          <h2 className="text-center mb-4">Our Sports</h2>
        </Col>
        {sports.map((sport, index) => (
          <Col md={6} lg={3} key={index} className="mb-4">
            <Card className="h-100 text-center">
              <Card.Body>
                <div style={{ fontSize: '3rem' }} className="mb-3">
                  {sport.icon}
                </div>
                <Card.Title>{sport.name}</Card.Title>
                <Card.Text>{sport.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Row className="mt-5">
        <Col md={8} className="mx-auto text-center">
          <h3>Why Choose Summit Sports Club?</h3>
          <p>
            Our club fosters a supportive environment where members of all skill levels 
            can improve their game, make new friends, and stay active. With flexible 
            scheduling, expert instruction, and top-notch facilities, we make it easy 
            to pursue your passion for sports.
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;