import { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useParams } from "react-router";
import db from "../api/db";

const HeroView = () => {
  const [dataHero, setDataHero] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const getDataHero = async () => {
      const response = await db.get("data");
      setDataHero(await response.data[id]);
    };
    getDataHero();
  }, [id]);

  return (
    <Container fluid id="herosView" className="text-white">
      <Row className="pt-5 text-center">
        <h1>{dataHero.nombre}</h1>
      </Row>
      <Row className="mt-5">
        <Col xs={12} md={5}>
          <Card>
            <Card.Img variant="top" src={dataHero.avatarURL} height="400px" />
          </Card>
        </Col>
        <Col className="mt-5">
          <Row>
            <h1>Nombre Real:</h1>
            <p>{dataHero.nombreReal}</p>
          </Row>
          <Row>
            <h2>Info:</h2>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
          </Row>
          <Row></Row>
        </Col>
      </Row>
    </Container>
  );
};

export default HeroView;
