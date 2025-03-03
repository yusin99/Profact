/* eslint-disable react/no-unescaped-entities */
import Welcome from "../../components/Welcome/welcome";
import "./cgu.css";
import staticInfo from "../../static-info.json"; // Adjust the path as needed
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

function CGU() {
    const { cguWelcomeText } = staticInfo; // Destructure cguText from the static info

    return (
        <div className="wrapper">
            <Welcome
                h1={cguWelcomeText.h1}
                paragraph={cguWelcomeText.paragraph}
            />
            <h2>Conditions Générales d'Utilisation</h2>
            <div className="cgu-content">
              <div className="cgu-file">
                <Worker
                    workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}
                >
                    <Viewer fileUrl="../../cgu.pdf" />
                </Worker>
              </div>
            </div>
        </div>
    );
}

export default CGU;
