import React, { useState, useEffect } from "react";
import { FaHeart, FaRegHeart, FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../pages/style/Home.css";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [savedRecipes, setSavedRecipes] = useState(JSON.parse(localStorage.getItem("savedRecipes")) || []);
  const [showModal, setShowModal] = useState(false);
  const [editRecipeId, setEditRecipeId] = useState(null);
  const [newRecipe, setNewRecipe] = useState({ name: "", ingredients: "", method: "", image: null });

  useEffect(() => {
    fetch("http://localhost:5002/api/recipes")
      .then((res) => res.json())
      .then((data) => setRecipes(data))
      .catch((error) => console.error("Error fetching recipes:", error));
  }, []);

  useEffect(() => {
    localStorage.setItem("savedRecipes", JSON.stringify(savedRecipes));
  }, [savedRecipes]);

  const handleImageUpload = (e) => {
    setNewRecipe((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSaveRecipe = async () => {
    if (!newRecipe.name || !newRecipe.ingredients || !newRecipe.method) {
      alert("Please fill out all fields!");
      return;
    }

    const formData = new FormData();
    formData.append("name", newRecipe.name);
    formData.append("ingredients", JSON.stringify(newRecipe.ingredients.split(",")));
    formData.append("method", newRecipe.method);
    if (newRecipe.image) {
      formData.append("image", newRecipe.image);
    }

    try {
      let response;
      if (editRecipeId) {
        response = await fetch(`http://localhost:5002/api/recipes/${editRecipeId}`, {
          method: "PUT",
          body: formData,
        });
      } else {
        response = await fetch("http://localhost:5002/api/recipes", {
          method: "POST",
          body: formData,
        });
      }

      if (!response.ok) throw new Error("Failed to save recipe");

      const data = await response.json();
      setRecipes(editRecipeId ? recipes.map((r) => (r._id === editRecipeId ? data : r)) : [...recipes, data]);
      setShowModal(false);
      setEditRecipeId(null);
      setNewRecipe({ name: "", ingredients: "", method: "", image: null });
    } catch (error) {
      console.error("Error saving recipe:", error);
    }
  };

  const handleEditRecipe = (recipe) => {
    setEditRecipeId(recipe._id);
    setNewRecipe({
      name: recipe.name,
      ingredients: recipe.ingredients.join(", "),
      method: recipe.method,
      image: null,
    });
    setShowModal(true);
  };

  const handleDeleteRecipe = async (id) => {
    if (!window.confirm("Are you sure you want to delete this recipe?")) return;

    try {
      await fetch(`http://localhost:5002/api/recipes/${id}`, { method: "DELETE" });
      setRecipes((prev) => prev.filter((recipe) => recipe._id !== id));
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  const toggleFavorite = (id) => {
    setSavedRecipes(savedRecipes.includes(id) ? savedRecipes.filter((recipeId) => recipeId !== id) : [...savedRecipes, id]);
  };

  const filteredRecipes = recipes.filter(
    (recipe) =>
      recipe.name.toLowerCase().includes(search.toLowerCase()) ||
      recipe.ingredients.join(", ").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <Button variant="primary" className="mb-3" onClick={() => setShowModal(true)}>
        <FaPlus /> Add Recipe
      </Button>

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search recipes by name or ingredient..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editRecipeId ? "Edit Recipe" : "Add a New Recipe"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type="text" className="form-control mb-2" placeholder="Dish Name" value={newRecipe.name} onChange={(e) => setNewRecipe({ ...newRecipe, name: e.target.value })} />
          <input type="text" className="form-control mb-2" placeholder="Ingredients (comma separated)" value={newRecipe.ingredients} onChange={(e) => setNewRecipe({ ...newRecipe, ingredients: e.target.value })} />
          <textarea className="form-control mb-2" placeholder="Method" value={newRecipe.method} onChange={(e) => setNewRecipe({ ...newRecipe, method: e.target.value })} />
          <input type="file" className="form-control mb-2" onChange={handleImageUpload} accept="image/*" />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
          <Button variant="success" onClick={handleSaveRecipe}>{editRecipeId ? "Update" : "Add"} Recipe</Button>
        </Modal.Footer>
      </Modal>

      <div className="row row-cols-1 row-cols-md-3 g-4">
        {filteredRecipes.map((recipe) => (
          <div key={recipe._id} className="col">
            <div className="card h-100 shadow-lg border-0 rounded-3 overflow-hidden position-relative">
              <button onClick={() => toggleFavorite(recipe._id)} className="btn position-absolute top-0 end-0 m-2 shadow">
                {savedRecipes.includes(recipe._id) ? <FaHeart className="text-danger fs-4" /> : <FaRegHeart className="text-muted fs-4" />}
              </button>
              <img src={`http://localhost:5002${recipe.image}`} alt={recipe.name} className="card-img-top img-fluid" />
              <div className="card-body text-center">
                <h5 className="card-title text-primary fw-bold">{recipe.name}</h5>
                <p className="card-text small"><strong>Ingredients:</strong> {recipe.ingredients.join(", ")}</p>
                <p className="card-text small"><strong>Method:</strong> {recipe.method}</p>
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <button className="btn btn-outline-primary" onClick={() => handleEditRecipe(recipe)}><FaEdit /></button>
                  <button className="btn btn-outline-danger" onClick={() => handleDeleteRecipe(recipe._id)}><FaTrash /></button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
