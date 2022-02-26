import React from 'react';
import { Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import defaultAddRecipe from '../../img/recipe-icon-png-25.jpg';

export default function AddRecipeCard({ openForm }) {
  if (!localStorage.mail) return null;
  return (
    <Card
      onClick={openForm}
      style={{
        maxWidth: '300px',
        minWidth: '150px',
        textAlign: 'center',
      }}
      className="btn p-0 mt-3"
    >
      <Card.Img
        src={defaultAddRecipe}
        style={{ height: '70%' }}
        className="m-auto"
      />
      <Button variant="warning">Add new</Button>
    </Card>
  );
}
AddRecipeCard.propTypes = {
  openForm: PropTypes.func.isRequired,
};
