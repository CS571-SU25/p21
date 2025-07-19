import React from 'react';
import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';

function AboutUs() {
  return (
    <Container>
      {/* Hero Section */}
      <Row className="mb-5">
        <Col xs={12} md={10} lg={8} className="mx-auto text-center">
          <h1 className="display-4 mb-4">About Summit Sports Club</h1>
          <p className="lead">
            Summit Sports Club began as a dream shared by two brothers who wanted to create a
            welcoming space where sports enthusiasts of all ages could come together, train hard,
            and build lasting friendships.
          </p>
        </Col>
      </Row>

      {/* Story Section */}
      <Row className="mb-5">
        <Col md={12}>
          <Card className="p-4 shadow-sm">
            <Card.Body>
              <h3 className="mb-3">Our Story</h3>
              <p>
                Growing up, the brothers—Jonathan and Vish (now deceased)—spent countless hours on their neighborhood
                courts, bonding over friendly matches and a shared love for competition. They quickly
                realized that sports were more than just games; they were a powerful way to foster
                community, promote healthy lifestyles, and encourage personal growth.
              </p>
              <p>
                Fueled by that passion, they pooled their savings, rallied local supporters, and in
                2015 opened the doors to Summit Sports Club. What started with a single tennis court
                has blossomed into a vibrant facility featuring tennis, badminton, weight lifting, and
                the rapidly growing sport of pickleball. Today, Summit Sports Club stands as a hub for
                athletes and beginners alike, united by a shared commitment to camaraderie, wellness,
                and continuous improvement.
              </p>

              <h3 className="mb-3">Looking Ahead</h3>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  🏆 Expand our facilities with additional courts and state-of-the-art training spaces
                </ListGroup.Item>
                <ListGroup.Item>
                  👦 Launch youth development programs to nurture the next generation of athletes
                </ListGroup.Item>
                <ListGroup.Item>
                  ♿ Introduce adaptive sports initiatives to ensure inclusivity for all abilities
                </ListGroup.Item>
                <ListGroup.Item>
                  🤝 Partner with local schools and non-profits to extend our community outreach
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default AboutUs;
