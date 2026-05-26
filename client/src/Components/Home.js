import React, { useEffect, useState, useCallback } from "react";
import { Container, Col, Row, Card, Spinner } from "react-bootstrap";
import NavBar from "./NavBar";
import db from "../api/db";
import { Link } from "react-router-dom";

const heroPlaceholder = (name) => {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const palette = ["#c0392b", "#d35400", "#8e44ad", "#2980b9", "#16a085", "#2c3e50"];
  const color = palette[name.charCodeAt(0) % palette.length];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400">
    <rect width="400" height="400" fill="${color}"/>
    <text x="200" y="215" font-family="Arial,sans-serif" font-size="130" font-weight="bold"
      fill="rgba(255,255,255,0.9)" text-anchor="middle" dominant-baseline="middle">${initials}</text>
  </svg>`;
  return `data:image/svg+xml;base64,${btoa(svg)}`;
};

const Home = () => {
  const [heroes, setHeroes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [type, setType] = useState("All");

  useEffect(() => {
    db.get("data")
      .then((response) => setHeroes(response.data))
      .catch(() => setHeroes([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = heroes.filter((hero) => {
    const matchesSearch = hero.nombre.toLowerCase().includes(searchValue.toLowerCase());
    const matchesType = type === "All" || hero.puedeVolar === type;
    return matchesSearch && matchesType;
  });

  const renderCards = useCallback(() => {
    const rows = [];
    for (let i = 0; i < filtered.length; i += 3) {
      const chunk = filtered.slice(i, i + 3);
      rows.push(
        <Row className="mt-4 g-4" key={i}>
          {chunk.map((hero) => (
            <Col xs={12} sm={6} lg={4} key={hero.id}>
              <Link to={`/hero/${hero.id}`} style={{ textDecoration: "none" }}>
                <Card className="hero-card h-100">
                  <Card.Img
                    variant="top"
                    src={hero.avatarURL}
                    className="hero-card-img"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = heroPlaceholder(hero.nombre);
                    }}
                  />
                  <Card.Body>
                    <Card.Title className="mb-1">{hero.nombre}</Card.Title>
                    <small className="text-muted">
                      {hero.puedeVolar ? "✈ Can fly" : "🚶 Ground hero"}
                    </small>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      );
    }
    return rows;
  }, [filtered]);

  return (
    <>
      <NavBar setSearchValue={setSearchValue} setType={setType} />
      <Container className="pb-5">
        {loading ? (
          <div className="text-center mt-5">
            <Spinner animation="border" variant="light" />
          </div>
        ) : filtered.length === 0 ? (
          <p className="text-center text-white mt-5">No heroes found.</p>
        ) : (
          renderCards()
        )}
      </Container>
    </>
  );
};

export default Home;
