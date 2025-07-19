// ==================== App.jsx ====================
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Home from './components/Home';
import EventCalendar from './components/EventCalendar';
import Contact from './components/Contact';
import AboutUs from './components/AboutUs';
import EventSignup from './components/EventSignup';

function App() {
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

  const handleEventRegistration = (eventId, registrationData) => {
    setRegistrations([...registrations, { eventId, ...registrationData }]);
    setEvents(events.map(event => 
      event.id === eventId 
        ? { ...event, availableSpots: event.availableSpots - 1 }
        : event
    ));
  };

  return (
    <Router>
      <div className="app-container">
        <Header />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route 
              path="/events" 
              element={
                <EventCalendar 
                  events={events} 
                  onRegister={handleEventRegistration}
                />
              } 
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