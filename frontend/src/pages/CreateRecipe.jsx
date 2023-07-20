import React, { useState } from "react";
import CreateRecipeTitle from "./CreateRecipeTitle";
import CreateRecipeDescription from "./CreateRecipeDescription";

export default function CreateRecipe() {
  const [step, setStep] = useState(1);
  const [formInfo, setFormInfo] = useState({
    title: "",
    description: "",
  });

  const handleChange = (event) => {
    setFormInfo({ ...formInfo, [event.target.name]: event.target.value });
  };
  // Fonction pour passer à l'étape suivante du formulaire
  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  // Fonction pour revenir à l'étape précédente du formulaire
  const prevStep = () => {
    setStep((previousStep) => previousStep - 1);
  };

  // Affichage conditionnel de l'étape du formulaire en fonction de la valeur de 'step'
  switch (step) {
    case 1:
      return (
        <CreateRecipeTitle
          formInfo={formInfo}
          handleChange={handleChange}
          nextStep={nextStep}
        />
      );
    case 2:
      return (
        <div>
          <CreateRecipeDescription
            formInfo={formInfo}
            handleChange={handleChange}
            prevStep={prevStep}
          />
          ;
        </div>
      );
    // Ajoutez d'autres cas pour chaque étape supplémentaire
    default:
      return null;
  }
}
