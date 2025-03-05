import React, { useState, useEffect, useMemo } from "react";
import { FaHeart } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const SavedRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const savedRecipeIds = useMemo(() => JSON.parse(localStorage.getItem("savedRecipes")) || [], []);

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const response = await fetch("https://eygds-project.onrender.com/api/recipes");
        const data = await response.json();
        const filteredRecipes = data.filter((recipe) => savedRecipeIds.includes(recipe._id));
        setRecipes(filteredRecipes);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchSavedRecipes();
  }, [savedRecipeIds]);

  return (
    <div className="container mt-4">
      <h2 className="text-center text-danger mb-4">❤️ Saved Recipes</h2>
      {recipes.length === 0 ? (
        <p className="text-center text-muted">No saved recipes yet! Start liking some recipes.</p>
      ) : (
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {recipes.map((recipe) => (
            <div key={recipe._id} className="col d-flex">
              <div className="card flex-fill shadow-lg border-0 rounded-4 overflow-hidden position-relative">
                <img
                  src={`http://localhost:5002${recipe.image}`}
                  alt={recipe.name}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body text-center d-flex flex-column" style={{ maxHeight: "350px", overflowY: "auto" }}>
                  <h5 className="card-title fw-bold text-primary">{recipe.name}</h5>
                  <p className="card-text small"><strong>Ingredients:</strong> {recipe.ingredients.join(", ")}</p>
                  <p className="card-text small flex-grow-1"><strong>Method:</strong> {recipe.method}</p>
                </div>
                <div className="card-footer bg-white border-0 text-center">
                  <button className="btn btn-danger rounded-pill px-3">
                    <FaHeart className="me-2" /> Liked
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedRecipes;
