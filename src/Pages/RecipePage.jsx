import React from 'react';
import { useParams } from 'react-router-dom';
import RecipeHandler from '../handlers/RecipeHandler';

export default function RecipePage() {
  const { recipeId } = useParams();
  return (
    <RecipeHandler recipeId={recipeId} />
  );
}
