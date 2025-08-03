import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { safeSessionStorageGet, safeFormatDate, sanitizeHtml } from '../utils/helpers';

function PostsList({ currentUser }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Load posts from session storage
    const storedPosts = safeSessionStorageGet('posts', []);
    // Sort by most recent first
    storedPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    setPosts(storedPosts);
  }, []);

  const formatDate = (dateString) => {
    return safeFormatDate(dateString, {
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getCategoryColor = (category) => {
    const colors = {
      general: 'primary',
      events: 'success',
      training: 'warning',
      social: 'info',
      equipment: 'secondary'
    };
    return colors[category] || 'primary';
  };

  return (
    <Container>
      <Row className="mb-4">
        <Col md={12}>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1>Community Posts</h1>
              <p className="text-muted">Connect with fellow Summit Sports Club members</p>
            </div>
            {currentUser && (
              <Link to="/posts/create">
                <Button variant="success">Create New Post</Button>
              </Link>
            )}
          </div>
        </Col>
      </Row>

      {posts.length === 0 ? (
        <Row>
          <Col md={8} className="mx-auto text-center">
            <Card className="p-4">
              <Card.Body>
                <h4>No posts yet!</h4>
                <p className="text-muted mb-3">
                  Be the first to share something with the community.
                </p>
                {currentUser ? (
                  <Link to="/posts/create">
                    <Button variant="success">Write the First Post</Button>
                  </Link>
                ) : (
                  <div>
                    <Link to="/login" className="me-2">
                      <Button variant="primary">Login</Button>
                    </Link>
                    <span>to create posts</span>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ) : (
        <Row>
          {posts.map(post => (
            <Col md={6} lg={4} key={post.id} className="mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Header className="d-flex justify-content-between align-items-center">
                  <Badge bg={getCategoryColor(post.category)} className="text-capitalize">
                    {post.category}
                  </Badge>
                  <small className="text-muted">
                    by <span dangerouslySetInnerHTML={{__html: sanitizeHtml(post.authorName)}}></span>
                  </small>
                </Card.Header>
                <Card.Body className="d-flex flex-column">
                  <Card.Title dangerouslySetInnerHTML={{__html: sanitizeHtml(post.title)}}></Card.Title>
                  <Card.Text 
                    className="flex-grow-1"
                    dangerouslySetInnerHTML={{__html: sanitizeHtml(
                      post.content.length > 200 
                        ? `${post.content.substring(0, 200)}...` 
                        : post.content
                    )}}
                  ></Card.Text>
                  <div className="mt-auto">
                    <small className="text-muted">
                      📅 {formatDate(post.createdAt)}
                    </small>
                    {post.content.length > 200 && (
                      <div className="mt-2">
                        <Button variant="outline-primary" size="sm">
                          Read More
                        </Button>
                      </div>
                    )}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {!currentUser && posts.length > 0 && (
        <Row className="mt-4">
          <Col md={8} className="mx-auto text-center">
            <Card className="bg-light">
              <Card.Body>
                <h5>Want to join the conversation?</h5>
                <p className="mb-3">
                  Create an account to share your own posts and connect with the community.
                </p>
                <Link to="/register" className="me-2">
                  <Button variant="success">Sign Up</Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline-primary">Login</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default PostsList; 