import React from 'react';
import { CardDeck, Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import Recipe from './Recipe';

export default function RecipesDeck({
                                    openForm,
                                    AddRecipeCard,
                                    cards,
                                  }) {
  return (
    <>
      <Container>
        <CardDeck className="d-flex flex-wrap">
          {cards.map((elem) => (
            <Recipe props={elem} key={uuidv4()} />
          ))}
          <AddRecipeCard openForm={openForm} />
        </CardDeck>
      </Container>
    </>
  );
}

RecipesDeck.propTypes = {
  openForm: PropTypes.func,
  AddRecipeCard: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  cards: PropTypes.any.isRequired,
};

RecipesDeck.defaultProps = {
  AddRecipeCard: () => <></>,
  openForm: () => null,
};
