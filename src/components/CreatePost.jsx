import React, { useState, useRef, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { safeSessionStorageGet, safeSessionStorageSet, generateUniqueId, sanitizeHtml, createCancellableTimeout } from '../utils/helpers';

function CreatePost({ currentUser }) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const cancelTimeoutRef = useRef(null);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (cancelTimeoutRef.current) {
        cancelTimeoutRef.current();
      }
    };
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    if (!currentUser) {
      setError('You must be logged in to create a post');
      setIsSubmitting(false);
      return;
    }

    if (formData.title.trim().length < 5) {
      setError('Title must be at least 5 characters long');
      setIsSubmitting(false);
      return;
    }

    if (formData.content.trim().length < 10) {
      setError('Content must be at least 10 characters long');
      setIsSubmitting(false);
      return;
    }

    // Sanitize input data
    const sanitizedTitle = formData.title.trim();
    const sanitizedContent = formData.content.trim();

    // Create new post with sanitized content
    const newPost = {
      id: generateUniqueId(),
      title: sanitizedTitle,
      content: sanitizedContent,
      category: formData.category,
      authorName: `${currentUser.firstName} ${currentUser.lastName}`,
      userId: currentUser.id,
      createdAt: new Date().toISOString()
    };

    // Save to session storage
    const existingPosts = safeSessionStorageGet('posts', []);
    existingPosts.push(newPost);
    safeSessionStorageSet('posts', existingPosts);

    // Navigate to posts list with cancellable timeout
    cancelTimeoutRef.current = createCancellableTimeout(() => {
      navigate('/posts');
    }, 1000);
  };

  if (!currentUser) {
    return (
      <Container>
        <Row>
          <Col md={8} className="mx-auto text-center">
            <Alert variant="warning">
              <h4>Login Required</h4>
              <p>You need to be logged in to create posts.</p>
              <Link to="/login" className="me-2">
                <Button variant="primary">Login</Button>
              </Link>
              <Link to="/register">
                <Button variant="outline-primary">Sign Up</Button>
              </Link>
            </Alert>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container>
      <Row>
        <Col md={8} className="mx-auto">
          <Card className="shadow">
            <Card.Body className="p-4">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Create New Post</h2>
                <Link to="/posts">
                  <Button variant="outline-secondary">← Back to Posts</Button>
                </Link>
              </div>

              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Category</Form.Label>
                  <Form.Select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                  >
                    <option value="general">General Discussion</option>
                    <option value="events">Events & Tournaments</option>
                    <option value="training">Training Tips</option>
                    <option value="social">Social & Meetups</option>
                    <option value="equipment">Equipment & Gear</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Post Title *</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter a descriptive title for your post"
                    required
                  />
                  <Form.Text className="text-muted">
                    {formData.title.length}/100 characters {formData.title.length > 100 && '(exceeds limit)'}
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Content *</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={8}
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    placeholder="Share your thoughts, tips, experiences, or questions with the community..."
                    required
                  />
                  <Form.Text className="text-muted">
                    {formData.content.length}/1000 characters {formData.content.length > 1000 && '(exceeds limit)'}
                  </Form.Text>
                </Form.Group>

                <div className="d-flex gap-2">
                  <Button 
                    variant="success" 
                    type="submit" 
                    disabled={isSubmitting || formData.title.length > 100 || formData.content.length > 1000}
                  >
                    {isSubmitting ? 'Publishing...' : 'Publish Post'}
                  </Button>
                  <Link to="/posts">
                    <Button variant="secondary">Cancel</Button>
                  </Link>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default CreatePost; 