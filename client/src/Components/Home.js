import React, { useEffect, useState } from "react";
import { Container, Col, Row, Card } from "react-bootstrap";
import NavBar from "./NavBar";
import db from "../api/db";
import { Link } from "react-router-dom";

const Home = () => {
  const [content, setContent] = useState();
  const [searchValue, setSearchValue] = useState("");
  let [type, setType] = useState("All");

  useEffect(() => {
    const getData = async () => {
      const response = await db.get("data");

      let data = response.data.filter((val) => {
        if (
          val.nombre.toLowerCase().includes(searchValue.toLowerCase()) &&
          val.puedeVolar === type
        )
          return val;
        if (type === "All") return val;
      });

      const rows = [...Array(Math.ceil(data.length / 3))];
      const imagesRows = rows.map((row, idx) =>
        data.slice(idx * 3, idx * 3 + 3)
      );

      setContent(
        imagesRows.map((row, idx) => (
          <Row className="mt-4">
            {row.map((data) => (
              <Col xs={12} lg={4}>
                <Link to={`/hero/${data.id}`}>
                  <Card>
                    <Card.Img
                      variant="top"
                      src={data.avatarURL}
                      height="400px"
                      className="cardImages"
                    />
                    <Card.Body>
                      <Card.Title>{data.nombre}</Card.Title>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        ))
      );
    };
    getData();
  }, [type, searchValue]);

  return (
    <>
      <NavBar setSearchValue={setSearchValue} setType={setType} />
      <Container>{content >= 0 ? <p>No results</p> : content}</Container>
    </>
  );
};

export default Home;
