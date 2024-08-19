/* eslint-disable no-unused-vars */
import { useState } from "react";
import Swal from "sweetalert2";
import "./contact-form.css";
import { hasEmptyFields } from "../../utils/formUtils";
import { sendFormData } from "../../services/apiServices";

function ContactForm() {
  const [selectedReason, setSelectedReason] = useState("");
  const [customReason, setCustomReason] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
  
    if (hasEmptyFields(formData)) {
      Swal.fire({
        title: "Erreur",
        text: "Veuillez remplir tous les champs obligatoires",
        icon: "error"
      });
      return;
    }
  
    formData.append("access_key", import.meta.env.VITE_CONTACT_FORM_WEB_KEY);
  
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);
  
    try {
      const res = await sendFormData(object);
  
      if (res.success) {
        Swal.fire({
          title: "Succès",
          text: "Message envoyé avec succès",
          icon: "success"
        });
        form.reset();
        setSelectedReason("");
        setCustomReason("");
      } else {
        Swal.fire({
          title: "Erreur",
          text: "Une erreur est survenue, veuillez réessayer plus tard",
          icon: "error"
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Erreur",
        text: "Une erreur est survenue, veuillez réessayer plus tard",
        icon: "error"
      });
    }
  };
  

  return (
    <section className="section colored contact-form-bg" id="contact">
      <div className="container">
        <div className="contact-form-placement row">
          <div className="col-lg-12">
            <div className="center-heading">
              <h2 className="section-title">Contact</h2>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="center-text">
              <p>Maecenas pellentesque ante faucibus lectus vulputate sollicitudin. Cras feugiat hendrerit semper.</p>
            </div>
          </div>
        </div>

        <div className="contact-form-placement row">
          <div className="col-lg-8 col-md-6 col-sm-12">
            <div className="contact-form">
              <form onSubmit={onSubmit} id="contact" action="" method="post">
                <div className="row">
                  <div className="col-lg-6 col-md-12 col-sm-12">
                    <fieldset>
                      <input name="name" type="text" className="form-control" id="name" placeholder="Full Name" required="" />
                    </fieldset>
                  </div>
                  <div className="col-lg-6 col-md-12 col-sm-12">
                    <fieldset>
                      <input name="email" type="email" className="form-control" id="email" placeholder="E-Mail Address" required="" />
                    </fieldset>
                  </div>
                  <div className="col-lg-12">
                    <fieldset>
                      <select
                        name="reason"
                        className="form-control"
                        id="reason"
                        value={selectedReason}
                        onChange={(e) => setSelectedReason(e.target.value)}
                        required
                      >
                        <option value="">Select a reason</option>
                        <option value="Reason 1">Reason 1</option>
                        <option value="Reason 2">Reason 2</option>
                        <option value="None of the above">None of the above</option>
                      </select>
                    </fieldset>
                  </div>
                  {selectedReason === "None of the above" && (
                    <div className="col-lg-12">
                      <fieldset>
                        <input
                          name="customReason"
                          type="text"
                          className="form-control"
                          id="customReason"
                          placeholder="Please specify your reason"
                          value={customReason}
                          onChange={(e) => setCustomReason(e.target.value)}
                          required
                        />
                      </fieldset>
                    </div>
                  )}
                  <div className="col-lg-12">
                    <fieldset>
                      <textarea name="message" rows="6" className="form-control" id="message" placeholder="Your Message" required=""></textarea>
                    </fieldset>
                  </div>
                  <div className="col-lg-12">
                    <fieldset>
                      <button type="submit" id="form-submit" className="main-button">Send Message</button>
                    </fieldset>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactForm;
