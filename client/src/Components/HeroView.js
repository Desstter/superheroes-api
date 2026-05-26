import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Badge, Spinner, Button } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import db from "../api/db";

const heroPlaceholder = (name = "") => {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const palette = ["#c0392b", "#d35400", "#8e44ad", "#2980b9", "#16a085", "#2c3e50"];
  const color = palette[(name.charCodeAt(0) || 0) % palette.length];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="500">
    <rect width="400" height="500" fill="${color}"/>
    <text x="200" y="255" font-family="Arial,sans-serif" font-size="130" font-weight="bold"
      fill="rgba(255,255,255,0.9)" text-anchor="middle" dominant-baseline="middle">${initials}</text>
  </svg>`;
  return `data:image/svg+xml;base64,${btoa(svg)}`;
};

const HeroView = () => {
  const [hero, setHero] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    db.get("data")
      .then((response) => {
        const found = response.data.find((h) => String(h.id) === String(id));
        setHero(found || null);
      })
      .catch(() => setHero(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div id="herosView" className="d-flex align-items-center justify-content-center">
        <Spinner animation="border" variant="light" />
      </div>
    );
  }

  if (!hero) {
    return (
      <div id="herosView" className="d-flex flex-column align-items-center justify-content-center gap-3">
        <h2 className="text-white">Hero not found</h2>
        <Link to="/">
          <Button variant="outline-light">← Back to all heroes</Button>
        </Link>
      </div>
    );
  }

  return (
    <Container fluid id="herosView" className="text-white">
      <Row className="pt-4 pb-2 text-center">
        <Col>
          <Link to="/" className="hero-back-link">← Back</Link>
          <h1 className="mt-2">{hero.nombre}</h1>
        </Col>
      </Row>

      <Row className="mt-4 px-3 pb-5 justify-content-center">
        <Col xs={12} md={5} className="mb-4">
          <Card className="hero-detail-card">
            <Card.Img
              variant="top"
              src={hero.avatarURL}
              className="hero-detail-img"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = heroPlaceholder(hero.nombre);
              }}
            />
          </Card>
        </Col>

        <Col xs={12} md={6} className="ps-md-5">
          <div className="hero-info-block">
            <h3 className="info-label">Real Name</h3>
            <p className="info-value">{hero.nombreReal}</p>
          </div>

          <div className="hero-info-block">
            <h3 className="info-label">Abilities</h3>
            <div className="d-flex gap-2 flex-wrap">
              {hero.puedeVolar && (
                <Badge bg="primary" className="hero-badge">✈ Flight</Badge>
              )}
              <Badge bg="secondary" className="hero-badge">💪 Superhuman Strength</Badge>
              <Badge bg="dark" className="hero-badge">🧠 Tactical Genius</Badge>
            </div>
          </div>

          <div className="hero-info-block">
            <h3 className="info-label">Universe</h3>
            <p className="info-value">
              {["Thor", "Iron Man", "Captain America", "Hulk", "Black Widow",
                "Spiderman", "Wolverine", "Daredevil", "Deadpool", "Human Torch",
                "Punisher", "Mystique"].includes(hero.nombre)
                ? "Marvel"
                : "DC Comics"}
            </p>
          </div>

          <div className="hero-info-block">
            <h3 className="info-label">Flight Capable</h3>
            <p className="info-value">
              {hero.puedeVolar ? "Yes ✈" : "No 🚶"}
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default HeroView;
