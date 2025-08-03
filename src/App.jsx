// ==================== App.jsx ====================
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Home from './components/Home';
import EventCalendar from './components/EventCalendar';
import Contact from './components/Contact';
import AboutUs from './components/AboutUs';
import Login from './components/Login';
import Register from './components/Register';
import UserDashboard from './components/UserDashboard';
import PostsList from './components/PostsList';
import CreatePost from './components/CreatePost';
import { safeSessionStorageGet, safeSessionStorageSet } from './utils/helpers';


function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Tennis Beginner Class",
      sport: "tennis",
      date: "2024-08-15",
      time: "10:00 AM",
      location: "Court 1",
      availableSpots: 8,
      maxSpots: 10,
      description: "Perfect for beginners looking to learn tennis basics"
    },
    {
      id: 2,
      title: "Badminton Tournament",
      sport: "badminton",
      date: "2024-08-18",
      time: "2:00 PM",
      location: "Indoor Court A",
      availableSpots: 4,
      maxSpots: 16,
      description: "Monthly tournament for all skill levels"
    },
    {
      id: 3,
      title: "Weight Lifting Workshop",
      sport: "weightlifting",
      date: "2024-08-20",
      time: "6:00 PM",
      location: "Gym Floor",
      availableSpots: 12,
      maxSpots: 15,
      description: "Learn proper form and technique"
    },
    {
      id: 4,
      title: "Pickleball Social Hour",
      sport: "pickleball",
      date: "2024-08-22",
      time: "7:00 PM",
      location: "Court 2",
      availableSpots: 6,
      maxSpots: 12,
      description: "Casual games and socializing"
    }
  ]);

  const [registrations, setRegistrations] = useState([]);

  // Load current user from session storage on app start
  React.useEffect(() => {
    // Load current user
    const storedUser = safeSessionStorageGet('currentUser', null);
    if (storedUser) {
      setCurrentUser(storedUser);
    }

    // Load or initialize events
    const storedEvents = safeSessionStorageGet('events', null);
    if (storedEvents && storedEvents.length > 0) {
      setEvents(storedEvents);
    } else {
      // Initialize events in session storage
      safeSessionStorageSet('events', events);
    }

    // Load existing registrations
    const storedRegistrations = safeSessionStorageGet('registrations', []);
    setRegistrations(storedRegistrations);
  }, []);

  // Sync events to session storage whenever events state changes
  React.useEffect(() => {
    safeSessionStorageSet('events', events);
  }, [events]);

  const handleEventRegistration = (eventId, registrationData) => {
    // Double-check conditions with latest data from session storage to prevent race conditions
    const latestRegistrations = safeSessionStorageGet('registrations', []);
    const latestEvents = safeSessionStorageGet('events', []);
    
    // Check if user is already registered 
    const existingRegistration = latestRegistrations.find(
      reg => reg.eventId === eventId && reg.userId === currentUser?.id
    );
    
    if (existingRegistration) {
      console.warn('User already registered for this event');
      return false;
    }

    // Check if event exists and has available spots
    const event = latestEvents.find(e => e.id === eventId);
    if (!event) {
      console.warn('Event not found');
      return false;
    }
    
    if (event.availableSpots <= 0) {
      console.warn('Event is fully booked');
      return false;
    }

    // Validate registration data
    if (!currentUser?.id || !registrationData.firstName || !registrationData.lastName || !registrationData.email) {
      console.warn('Invalid registration data');
      return false;
    }

    const newRegistration = {
      ...registrationData,
      eventId,
      userId: currentUser.id,
      registrationDate: new Date().toISOString()
    };

    // Atomic update: Update both registrations and events together
    const updatedRegistrations = [...latestRegistrations, newRegistration];
    const updatedEvents = latestEvents.map(evt =>
      evt.id === eventId
        ? { ...evt, availableSpots: Math.max(0, evt.availableSpots - 1) }
        : evt
    );

    // Update session storage first (atomic-like operation)
    safeSessionStorageSet('registrations', updatedRegistrations);
    safeSessionStorageSet('events', updatedEvents);
    
    // Then update state
    setRegistrations(updatedRegistrations);
    setEvents(updatedEvents);
    
    return true;
  };

  const handleLogin = (user) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    sessionStorage.removeItem('currentUser');
  };

  return (
    <Router>
      <div className="app-container">
        <Header currentUser={currentUser} onLogout={handleLogout} />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/events"
              element={
                <EventCalendar
                  events={events}
                  onRegister={handleEventRegistration}
                  currentUser={currentUser}
                />
              }
            />
            <Route
              path="/login"
              element={<Login onLogin={handleLogin} />}
            />
            <Route
              path="/register"
              element={<Register onLogin={handleLogin} />}
            />
            <Route
              path="/dashboard"
              element={<UserDashboard currentUser={currentUser} />}
            />
            <Route
              path="/posts"
              element={<PostsList currentUser={currentUser} />}
            />
            <Route
              path="/posts/create"
              element={<CreatePost currentUser={currentUser} />}
            />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<AboutUs />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;