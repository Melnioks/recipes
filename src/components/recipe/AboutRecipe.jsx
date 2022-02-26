import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function AboutRecipe({ title, description, fileCover, authors, id }) {
  const downloadHandler = (e) => {
    e.preventDefault();
    window.open(`${process.env.REACT_APP_URL}/api/recipes/${id}/download`);
  };

  const dowloadBtn = !localStorage.mail ? null : (
    <Button onClick={downloadHandler}>Dowload recipe</Button>
  );
  return (
    <Container className="mt-3">
      <Row>
        <Col md={5}>
          <img src={fileCover} alt="recipe cover" style={{ maxWidth: '100%' }} />
        </Col>
        <Col md={7}>
          <h2>{title}</h2>
          <p>{description}</p>
          <p>{authors}</p>
          {dowloadBtn}
        </Col>
      </Row>
    </Container>
)
}

AboutRecipe.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  fileCover: PropTypes.string.isRequired,
  authors: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
