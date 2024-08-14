/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import Swal from "sweetalert2";
import "../ContactForm/contact-form.css"
import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe (put this outside of your component)
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

function MultiPartForm({ offerTitle, offerPrice, offerPeriod, offerFeatures }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const allowedTypes = ['image/jpeg', 'image/png'];
    const file = files[0];

    if (file && !allowedTypes.includes(file.type)) {
        Swal.fire({
            title: "Erreur",
            text: "Veuillez sélectionner un fichier JPG ou PNG uniquement.",
            icon: "error"
        });
        // Clear the file input
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
    }

    if (step === 2) {
      const numberPattern = /^\d+$/;
      if (!numberPattern.test(formData.siret)) {
        errors.push("Le SIRET doit contenir uniquement des chiffres.");
      }

      if (!numberPattern.test(formData.capital)) {
        errors.push("Le capital doit contenir uniquement des chiffres.");
      }
      
      if (formData.nomSociete.length > 40) {
        errors.push("Le nom de la société ne doit pas dépasser 40 caractères.");
      }
    }

    if (step === 3) {
      const phonePattern = /^\d{10}$/;
      if (!phonePattern.test(formData.telephone)) {
        errors.push("Le téléphone doit contenir 10 chiffres.");
      }
    }

    if (step === 4) {
      const numberPattern = /^\d+$/;
      if (!numberPattern.test(formData.creditAbonnement)) {
        errors.push("Le crédit d'abonnement doit contenir uniquement des chiffres.");
      }
    }

    if (errors.length > 0) {
      Swal.fire({
        title: "Erreur",
        text: errors.join("\n"),
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
  
    const submissionData = {
      ...formData,
      files,
      checkout: {
        offerTitle,
        offerPrice,
      }
    };
  
    sessionStorage.setItem('formData', JSON.stringify(submissionData));
  
    try {
      const response = await fetch(import.meta.env.VITE_API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          offerTitle,
          offerPrice,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create checkout session');
      }
  
      const { sessionId } = await response.json();
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
              <form onSubmit={onSubmit} id="multi-part-form" action="" method="get">
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
                    <div className="col-lg-12">
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
                    <div className="col-lg-12">
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
                          type="text"
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
                    <div className="col-lg-12">
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
