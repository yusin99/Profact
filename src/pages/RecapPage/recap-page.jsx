/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { loadStripe } from "@stripe/stripe-js";
import {
    createCheckoutSession,
    fetchSubscriptionPlans,
} from "../../services/apiServices";
import { openDB } from "idb";
import DOMPurify from "dompurify";

// Initialize Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

function RecapPage() {
    const location = useLocation();
    const navigate = useNavigate();

    // Check if state is passed, if not, redirect back
    const { formData, files, offerTitle, offerPrice, offerPeriod, offerId, fraisParametrage } = location.state || {};
    const [priceId, setPriceId] = useState(null);
    const [isWithdrawalWaiverChecked, setIsWithdrawalWaiverChecked] = useState(false);
    const [hasSeenWarning, setHasSeenWarning] = useState(false);

    useEffect(() => {
        if (!formData) {
            navigate('/');
            return;
        }

        const fetchPriceId = async () => {
            try {
                const fetchedPriceIds = await fetchSubscriptionPlans();
                const selectedOffer = fetchedPriceIds.find(
                    (offer) => offer.id === offerId
                );
                if (selectedOffer) {
                    setPriceId(selectedOffer);
                } else {
                    console.error("Offer not found");
                }
            } catch (error) {
                console.error("Failed to fetch price ID:", error);
            }
        };
        fetchPriceId();
    }, [formData, navigate, offerId]);

    const onSubmit = async (event) => {
        event.preventDefault();

        // Validate all form data
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
            data: {
                ...formData,
                creditAbonnement: parseInt(formData.creditAbonnement, 10),
                refusDroitRetraction: isWithdrawalWaiverChecked,
            },
            ...filesBase64,
        };

        // Open (or create) the IndexedDB
        const db = await openDB("formDataDB", 1, {
            upgrade(db) {
                db.createObjectStore("formDataStore");
            },
        });

        // Store the data in IndexedDB
        await db.put("formDataStore", submissionData, "formData");

        try {
            if (!priceId) {
                throw new Error("Invalid offer title or missing price ID");
            }

            const { sessionId } = await createCheckoutSession(
                priceId.code,
                formData.nomSociete,
                formData.email,
                fraisParametrage
            );

            // Set a flag in sessionStorage to allow access to success/cancel pages
            sessionStorage.setItem("checkoutInProgress", "true");

            const stripe = await stripePromise;
            const { error } = await stripe.redirectToCheckout({ sessionId });

            if (error) {
                console.error("Stripe redirect error:", error);
                Swal.fire({
                    title: "Erreur",
                    text: error.message,
                    icon: "error",
                });
            }
        } catch (error) {
            console.error("Error:", error);
            Swal.fire({
                title: "Erreur",
                text: error.message || "Une erreur est survenue lors de la création de la session de paiement",
                icon: "error",
            });
        }
    };

    const handleWithdrawalWaiverSubmit = (e) => {
        e.preventDefault();
        
        if (!isWithdrawalWaiverChecked && !hasSeenWarning) {
            Swal.fire({
                title: "Renonciation de délais de rétractation",
                html: `
                    <p>Vous n'avez pas coché la case de renonciation. Si elle n'est pas cochée, vous ne bénéficierez des services qu'à l'issue des 14 jours.</p>
                    <p>Voulez-vous consulter nos <a href="/cgu" target="_blank" style="color: blue; text-decoration: underline;">Conditions Générales d'Utilisation</a> ?</p>
                `,
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Continuer",
                cancelButtonText: "Annuler",
            }).then((result) => {
                if (result.isConfirmed) {
                    setHasSeenWarning(true);
                    // Create a synthetic event to pass to onSubmit
                    const syntheticEvent = {
                        preventDefault: () => {},
                    };
                    onSubmit(syntheticEvent);
                }
            });
            return;
        }

        // If checkbox is checked or warning has been seen, proceed directly
        const syntheticEvent = {
            preventDefault: () => {},
        };
        onSubmit(syntheticEvent);
    };

    if (!formData) return null;

    return (
        <section className="section colored contact-form-bg" id="contact">
            <div className="container">
                <div className="contact-form-placement row">
                    <div className="col-lg-12">
                        <div className="center-heading">
                            <h2 className="section-title">Récapitulatif de votre inscription</h2>
                        </div>
                    </div>
                </div>

                <div className="contact-form-placement row">
                    <div className="col-lg-8 col-md-6 col-sm-12">
                        <div className="recap-container">
                            <div className="recap-section">
                                <h3>Informations personnelles</h3>
                                <div className="recap-grid">
                                    <div>
                                        <strong>Email:</strong> {formData.email}
                                    </div>
                                    <div>
                                        <strong>Nom de la société:</strong> {formData.nomSociete}
                                    </div>
                                    <div>
                                        <strong>SIRET:</strong> {formData.siret}
                                    </div>
                                    <div>
                                        <strong>Numéro TVA:</strong> {formData.numTva}
                                    </div>
                                    <div>
                                        <strong>Capital:</strong> {formData.capital}
                                    </div>
                                </div>
                            </div>

                            <div className="recap-section">
                                <h3>Coordonnées du dirigeant</h3>
                                <div className="recap-grid">
                                    <div>
                                        <strong>Nom:</strong> {formData.nomDirigeant}
                                    </div>
                                    <div>
                                        <strong>Prénom:</strong> {formData.prenomDirigeant}
                                    </div>
                                    <div>
                                        <strong>Téléphone:</strong> {formData.telephone}
                                    </div>
                                </div>
                            </div>

                            <div className="recap-section">
                                <h3>Informations financières</h3>
                                <div className="recap-grid">
                                    <div>
                                        <strong>Taux Horaire HT:</strong> {formData.tauxHoraireHt}
                                    </div>
                                    <div>
                                        <strong>Date Kbis:</strong> {formData.dateEditionKbis}
                                    </div>
                                    <div>
                                        <strong>Crédit d'abonnement:</strong> {formData.creditAbonnement} dossiers
                                    </div>
                                </div>
                            </div>

                            <div className="recap-section">
                                <h3>Détails de l'abonnement</h3>
                                <div className="recap-grid">
                                    <div>
                                        <strong>Offre:</strong> {offerTitle}
                                    </div>
                                    <div>
                                        <strong>Prix mensuel:</strong> {offerPrice * 1.2}€ TTC
                                    </div>
                                    <div>
                                        <strong>Prix annuel:</strong> {offerPrice * 1.2 * 12}€ TTC
                                    </div>
                                    <div>
                                        <strong>Période:</strong> {offerPeriod}
                                    </div>
                                </div>
                            </div>

                            <div className="recap-section">
                                <h3>Fichiers joints</h3>
                                <div className="recap-grid">
                                    {Object.keys(files).map((key) => (
                                        <div key={key}>
                                            <strong>{key.toUpperCase()}:</strong>{' '}
                                            {files[key] ? files[key].name : 'Non fourni'}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="recap-section withdrawal-waiver">
                                <div className="checkbox-container">
                                    <input
                                        type="checkbox"
                                        id="withdrawalWaiver"
                                        checked={isWithdrawalWaiverChecked}
                                        onChange={() => setIsWithdrawalWaiverChecked(!isWithdrawalWaiverChecked)}
                                    />
                                    <label htmlFor="withdrawalWaiver">
                                        Je renonce expressément au délai de rétractation conformément à l'article L221-21-8 du Code de la consommation
                                    </label>
                                </div>
                            </div>

                            <div className="buttons-container">
                                <button
                                    type="button"
                                    onClick={() => navigate(-1)}
                                    className="main-button mr-2"
                                >
                                    Retour
                                </button>
                                <button
                                    type="button"
                                    onClick={handleWithdrawalWaiverSubmit}
                                    className="main-button"
                                >
                                    Confirmer et Payer
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default RecapPage;