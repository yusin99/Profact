/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import Swal from "sweetalert2";
import "../ContactForm/contact-form.css"
import "./multipartform.css"
import { loadStripe } from '@stripe/stripe-js';
import { openDB } from "idb";
import DOMPurify from 'dompurify';
import { createCheckoutSession } from "../../services/apiServices";

// Initialize Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
const priceIds = {
  '30 dossiers': import.meta.env.VITE_PRICE_30_DOSSIERS,
  '50 dossiers': import.meta.env.VITE_PRICE_50_DOSSIERS,
  '70 dossiers': import.meta.env.VITE_PRICE_70_DOSSIERS,
  '90 dossiers': import.meta.env.VITE_PRICE_90_DOSSIERS,
  '110 dossiers': import.meta.env.VITE_PRICE_110_DOSSIERS,
  '130 dossiers': import.meta.env.VITE_PRICE_130_DOSSIERS,
  '170 dossiers': import.meta.env.VITE_PRICE_170_DOSSIERS,
  '190 dossiers': import.meta.env.VITE_PRICE_190_DOSSIERS,
  '200 dossiers': import.meta.env.VITE_PRICE_200_DOSSIERS,
};

function MultiPartForm({ offerTitle, offerPrice, offerPeriod, offerFeatures }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    nomSociete: "",
    siret: "",
    numTva: "",
    capital: "",
    telephone: "",
    nomDirigeant: "",
    prenomDirigeant: "",
    urlVosFactures: "",
    apiKeyVosFactures: "",
    tauxHoraireHt: "",
    dateEditionKbis: "",
    creditAbonnement: "",
  });
  const [files, setFiles] = useState({
    cachet: null,
    kbis: null,
    rib: null,
    cni: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const sanitizedValue = DOMPurify.sanitize(value);
    setFormData((prevData) => ({ ...prevData, [name]: sanitizedValue }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const allowedTypes = ['image/jpeg', 'image/png'];
    const file = files[0];
    const maxSize = 67000000; // 67MB in bytes

    if (file && !allowedTypes.includes(file.type)) {
      Swal.fire({
        title: "Erreur",
        text: "Veuillez sélectionner un fichier JPG ou PNG uniquement.",
        icon: "error"
      });
      e.target.value = "";
      return;
    }

    if (file && file.size > maxSize) {
      Swal.fire({
        title: "Erreur",
        text: "La taille du fichier ne doit pas dépasser 67 Mo.",
        icon: "error"
      });
      e.target.value = "";
      return;
    }

    if (file && !/^[^./\\]+\.(jpg|jpeg|png)$/i.test(file.name)) {
      Swal.fire({
        title: "Erreur",
        text: "Le nom du fichier ne doit pas contenir de '.', '/' ou '\\' sauf pour l'extension.",
        icon: "error"
      });
      e.target.value = "";
      return;
    }

    setFiles((prevFiles) => ({ ...prevFiles, [name]: file }));
  };

  const validateStep = () => {
    let errors = [];

    if (step === 1) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(formData.email)) {
        errors.push("Veuillez entrer une adresse email valide.");
      }

      const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{10,}$/;
      if (!passwordPattern.test(formData.password)) {
        errors.push("Le mot de passe doit contenir au moins 10 caractères, dont une majuscule, une minuscule, un chiffre et un caractère spécial.");
      }

      if (formData.password !== formData.confirmPassword) {
        errors.push("Les mots de passe ne correspondent pas.");
      }
    }

    if (step === 2) {
      if (!/^[^./\\]{1,40}$/.test(formData.nomSociete)) {
        errors.push("Le nom de la société ne doit pas contenir '/', '.', '\\' et ne pas dépasser 40 caractères.");
      }

      if (!/^\d{1,255}$/.test(formData.siret)) {
        errors.push("Le SIRET doit contenir uniquement des chiffres (max 255 caractères).");
      }

      if (formData.numTva.length > 255) {
        errors.push("Le numéro TVA ne doit pas dépasser 255 caractères.");
      }

      if (!/^\d+$/.test(formData.capital) || formData.capital.length > 255) {
        errors.push("Le capital doit contenir uniquement des chiffres (max 255 caractères) sans espaces ni symbole €.");
      }
    }

    if (step === 3) {
      if (!/^\d{10}$/.test(formData.telephone)) {
        errors.push("Le téléphone doit contenir exactement 10 chiffres sans espaces ni indicatif.");
      }

      if (!/^[a-zA-Z]{1,255}$/.test(formData.nomDirigeant)) {
        errors.push("Le nom du dirigeant ne doit pas contenir de caractères spéciaux (max 255 caractères).");
      }

      if (!/^[a-zA-Z]{1,255}$/.test(formData.prenomDirigeant)) {
        errors.push("Le prénom du dirigeant ne doit pas contenir de caractères spéciaux (max 255 caractères).");
      }

      const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
      if (!urlPattern.test(formData.urlVosFactures) || formData.urlVosFactures.length > 255) {
        errors.push("L'URL VosFactures n'est pas valide ou dépasse 255 caractères.");
      }

      if (formData.apiKeyVosFactures.length > 255) {
        errors.push("L'API Key VosFactures ne doit pas dépasser 255 caractères.");
      }
    }

    if (step === 4) {
      if (!/^\d+(\.\d{1,2})?$/.test(formData.tauxHoraireHt)) {
        errors.push("Le taux horaire HT doit être un nombre décimal avec maximum 2 décimales (ex: 45.50).");
      }

      if (!/^\d{4}-\d{2}-\d{2}$/.test(formData.dateEditionKbis)) {
        errors.push("La date d'édition du Kbis doit être au format YYYY-MM-DD.");
      }

      if (!/^\d+$/.test(formData.creditAbonnement)) {
        errors.push("Le crédit d'abonnement doit être un nombre entier sans décimales.");
      }
    }

    if (errors.length > 0) {
      Swal.fire({
        title: "Erreur",
        html: errors.map(error => `- ${error}`).join('<br> <br>'),
        icon: "error"
      });
      return false;
    }

    return true;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep((prevStep) => prevStep + 1);
    }
  };

  const handlePrevious = () => {
    setStep((prevStep) => prevStep - 1);
  };

/**
 * The `onSubmit` function handles form submission by validating form data, converting files to base64,
 * storing data in IndexedDB, and making a POST request to create a checkout session with error
 * handling.
 * @returns The `onSubmit` function is returning either an error message if there is an issue during
 * form submission or payment processing, or it is redirecting the user to the checkout page if the
 * submission is successful.
 */
const onSubmit = async (event) => {
  event.preventDefault();

  if (!validateStep()) return;

  for (let key in formData) {
    if (!formData[key]) {
      Swal.fire({
        title: "Erreur",
        text: "Veuillez remplir tous les champs obligatoires",
        icon: "error",
      });
      return;
    }
  }

  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const filesBase64 = {};

  for (let key in files) {
    if (files[key]) {
      filesBase64[key] = await convertFileToBase64(files[key]);
    }
  }

  const submissionData = {
    data: { ...formData, creditAbonnement: parseInt(formData.creditAbonnement, 10) },
    ...filesBase64
  };

  // Open (or create) the IndexedDB
  const db = await openDB('formDataDB', 1, {
    upgrade(db) {
      db.createObjectStore('formDataStore');
    },
  });

  // Store the data in IndexedDB
  await db.put('formDataStore', submissionData, 'formData');

  try {
    // Get the correct priceId based on the offerTitle
    const priceId = priceIds[offerTitle];

    if (!priceId) {
      throw new Error('Invalid offer title or missing price ID');
    }

    const { sessionId } = await createCheckoutSession(priceId);

    // Set a flag in sessionStorage to allow access to success/cancel pages
    sessionStorage.setItem('checkoutInProgress', 'true');

    const stripe = await stripePromise;
    const { error } = await stripe.redirectToCheckout({ sessionId });

    if (error) {
      console.error('Stripe redirect error:', error);
      Swal.fire({
        title: "Erreur",
        text: error.message,
        icon: "error",
      });
    }
  } catch (error) {
    console.error('Error:', error);
    Swal.fire({
      title: "Erreur",
      text: error.message || "Une erreur est survenue lors de la création de la session de paiement",
      icon: "error",
    });
  }
};
  


  return (
    <section className="section colored contact-form-bg" id="contact">
    <div className="container">
      <div className="contact-form-placement row">
        <div className="col-lg-12">
          <div className="center-heading">
            <h2 className="section-title">Multi Part Form</h2>
          </div>
        </div>
      </div>

      <div className="contact-form-placement row">
        <div className="col-lg-8 col-md-6 col-sm-12">
          <div className="contact-form">
            <form onSubmit={onSubmit} id="multi-part-form" action="" method="post">
              {step === 1 && (
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <fieldset>
                      <label>Email</label>
                      <input
                        name="email"
                        type="email"
                        className="form-control"
                        placeholder="E-Mail Address"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </fieldset>
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <fieldset>
                      <label>Password</label>
                      <input
                        name="password"
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                    </fieldset>
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <fieldset>
                      <label>Confirm Password</label>
                      <input
                        name="confirmPassword"
                        type="password"
                        className="form-control"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                      />
                    </fieldset>
                  </div>
                  <div className="col-lg-12">
                    <fieldset>
                      <button type="button" onClick={handleNext} className="main-button">
                        Next
                      </button>
                    </fieldset>
                  </div>
                </div>
              )}

                {step === 2 && (
                  <div className="row">
                    <div className="col-lg-6 col-md-12 col-sm-12">
                      <fieldset>
                        <label>Nom de la Société</label>
                        <input
                          name="nomSociete"
                          type="text"
                          className="form-control"
                          placeholder="Nom de la Société"
                          value={formData.nomSociete}
                          onChange={handleChange}
                          maxLength="40"
                          required
                        />
                        <p className="note">Si une même entité juridique SIREN dispose de plusieurs centres avec SIRET différent, ajouter "1" ou "2" après le nom.</p>
                      </fieldset>
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12">
                      <fieldset>
                        <label>SIRET</label>
                        <input
                          name="siret"
                          type="text"
                          className="form-control"
                          placeholder="SIRET"
                          value={formData.siret}
                          onChange={handleChange}
                          required
                        />
                      </fieldset>
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12">
                      <fieldset>
                        <label>Numéro TVA</label>
                        <input
                          name="numTva"
                          type="text"
                          className="form-control"
                          placeholder="Numéro TVA"
                          value={formData.numTva}
                          onChange={handleChange}
                          required
                        />
                      </fieldset>
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12">
                      <fieldset>
                        <label>Capital</label>
                        <input
                          name="capital"
                          type="text"
                          className="form-control"
                          placeholder="Capital"
                          value={formData.capital}
                          onChange={handleChange}
                          required
                        />
                      </fieldset>
                    </div>
                    <div className="buttons-container col-lg-12">
                      <fieldset>
                        <button type="button" onClick={handlePrevious} className="main-button">
                          Previous
                        </button>
                        <button type="button" onClick={handleNext} className="main-button">
                          Next
                        </button>
                      </fieldset>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="row">
                    <div className="col-lg-6 col-md-12 col-sm-12">
                      <fieldset>
                        <label>Téléphone</label>
                        <input
                          name="telephone"
                          type="text"
                          className="form-control"
                          placeholder="Téléphone"
                          value={formData.telephone}
                          onChange={handleChange}
                          maxLength="10"
                          required
                        />
                      </fieldset>
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12">
                      <fieldset>
                        <label>Nom Dirigeant</label>
                        <input
                          name="nomDirigeant"
                          type="text"
                          className="form-control"
                          placeholder="Nom Dirigeant"
                          value={formData.nomDirigeant}
                          onChange={handleChange}
                          required
                        />
                      </fieldset>
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12">
                      <fieldset>
                        <label>Prénom Dirigeant</label>
                        <input
                          name="prenomDirigeant"
                          type="text"
                          className="form-control"
                          placeholder="Prénom Dirigeant"
                          value={formData.prenomDirigeant}
                          onChange={handleChange}
                          required
                        />
                      </fieldset>
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12">
                      <fieldset>
                        <label>URL VosFactures</label>
                        <input
                          name="urlVosFactures"
                          type="text"
                          className="form-control"
                          placeholder="URL VosFactures"
                          value={formData.urlVosFactures}
                          onChange={handleChange}
                          required
                        />
                      </fieldset>
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12">
                      <fieldset>
                        <label>API Key VosFactures</label>
                        <input
                          name="apiKeyVosFactures"
                          type="text"
                          className="form-control"
                          placeholder="API Key VosFactures"
                          value={formData.apiKeyVosFactures}
                          onChange={handleChange}
                          required
                        />
                      </fieldset>
                    </div>
                    <div className="buttons-container col-lg-12">
                      <fieldset>
                        <button type="button" onClick={handlePrevious} className="main-button">
                          Previous
                        </button>
                        <button type="button" onClick={handleNext} className="main-button">
                          Next
                        </button>
                      </fieldset>
                    </div>
                  </div>
                )}

                {step === 4 && (
                  <div className="row">
                    <div className="col-lg-6 col-md-12 col-sm-12">
                      <fieldset>
                        <label>Taux Horaire HT</label>
                        <input
                          name="tauxHoraireHt"
                          type="text"
                          className="form-control"
                          placeholder="Taux Horaire HT"
                          value={formData.tauxHoraireHt}
                          onChange={handleChange}
                          required
                        />
                      </fieldset>
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12">
                      <fieldset>
                        <label>Date d'édition du Kbis</label>
                        <input
                          name="dateEditionKbis"
                          type="date"
                          className="form-control"
                          value={formData.dateEditionKbis}
                          onChange={handleChange}
                          required
                        />
                      </fieldset>
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12">
                      <fieldset>
                        <label>Crédit d'Abonnement</label>
                        <input
                          name="creditAbonnement"
                          type="number"
                          className="form-control"
                          placeholder="Crédit d'Abonnement"
                          value={formData.creditAbonnement}
                          onChange={handleChange}
                          required
                        />
                      </fieldset>
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12">
                      <fieldset>
                        <label>Cachet de la société (PNG/JPG)</label>
                        <input
                          name="cachet"
                          type="file"
                          accept=".png, .jpg"
                          className="form-control"
                          onChange={handleFileChange}
                          required
                        />
                      </fieldset>
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12">
                      <fieldset>
                        <label>Kbis (PNG/JPG)</label>
                        <input
                          name="kbis"
                          type="file"
                          accept=".png, .jpg"
                          className="form-control"
                          onChange={handleFileChange}
                          required
                        />
                      </fieldset>
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12">
                      <fieldset>
                        <label>RIB (PNG/JPG)</label>
                        <input
                          name="rib"
                          type="file"
                          accept=".png, .jpg"
                          className="form-control"
                          onChange={handleFileChange}
                          required
                        />
                      </fieldset>
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12">
                      <fieldset>
                        <label>CNI Dirigeant (PNG/JPG)</label>
                        <input
                          name="cni"
                          type="file"
                          accept=".png, .jpg"
                          className="form-control"
                          onChange={handleFileChange}
                          required
                        />
                      </fieldset>
                    </div>
                    <div className="buttons-container col-lg-12">
                      <fieldset>
                        <button type="button" onClick={handlePrevious} className="main-button">
                          Previous
                        </button>
                        <button type="submit" className="main-button">
                          VALIDER
                        </button>
                      </fieldset>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MultiPartForm;
