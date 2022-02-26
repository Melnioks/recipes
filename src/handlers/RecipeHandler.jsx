import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AboutRecipe from '../components/recipe/AboutRecipe';

export default function RecipeHandler({ recipeId }) {
  const [recipe, setRecipe] = useState(null);
  const load = () => {
    fetch(`${process.env.REACT_APP_URL}/api/recipes/${recipeId}`)
      .then((res) => res.json())
      .then(setRecipe)
  }

  useEffect(() => load(), []);
  if (!recipe) return <div>Loading...</div>
  return (
    <AboutRecipe
      id={recipeId}
      authors={recipe.authors}
      description={recipe.description}
      title={recipe.title}
      fileCover={recipe.fileCover}
    />
  )
}

RecipeHandler.propTypes = {
  recipeId: PropTypes.string.isRequired,
}
