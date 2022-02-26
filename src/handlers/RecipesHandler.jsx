import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Modal } from 'react-bootstrap';
import RecipesDeck from '../components/recipe/RecipesDeck';
import AddRecipeCard from '../components/recipe/AddRecipeCard';
import AddRecipeForm from '../components/recipe/AddRecipeForm';

export default function RecipesHandler() {
  const [recipes, setRecipes] = useState([]);
  const [isFormShown, showForm] = useState(false); // показ добавления книги
  const openForm = () => showForm(true);
  const closeForm = () => showForm(false);

  const fetchRecipes = () => {
    const url = `${process.env.REACT_APP_URL}/api/recipes`;
    fetch(url)
      .then((response) => response.json())
      .then(setRecipes)
  }
  const sendForm = async (form) => {
    const url = `${process.env.REACT_APP_URL}/api/recipes`;
    form.set('key', uuidv4());

    const response = await fetch(url, {
      method: 'POST',
      body: form,
    });

    if (response.ok) {
      closeForm();
      await fetchRecipes();
    } else {
      throw Error(response.statusText);
    }
  };
  useEffect(fetchRecipes, []);

  return (
    <>
      <RecipesDeck
        openForm={openForm}
        AddRecipeCard={AddRecipeCard}
        cards={recipes}
      />
      {isFormShown && (
        <Modal show={isFormShown} onHide={closeForm}>
          <Modal.Header closeButton>
            <Modal.Title>Recipe description</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AddRecipeForm
              closeForm={closeForm}
              sendForm={sendForm}
            />
          </Modal.Body>
        </Modal>
      )}
    </>
  );
}
