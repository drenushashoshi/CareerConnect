import React from "react";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";

const Footer = () => (
  <footer className="page-footer font-small blue pt-4" style={{ backgroundColor: '#e3f2fd' }}>
    <div className="container-fluid text-center text-md-left">
      <div className="row justify-content-between">
        <div className="col-md-4 mt-md-0 mt-3">
          <h5>CareerConnect</h5>
          <p>Oferta më e mirë për biznesin dhe karierën tuaj!</p>
        </div>

        <div className="col-md-4 mb-md-0 mb-3">
          <h5>Na ndiqni në rrjetet sociale:</h5>
          <ul className="list-unstyled">
            <li><a href="#!" style={{ fontSize: '24px' }}><FaInstagram /></a></li>
            <li><a href="#!" style={{ fontSize: '24px' }}><FaXTwitter /></a></li>
            <li><a href="#!" style={{ fontSize: '24px' }}><FaFacebook /></a></li>
          </ul>
        </div>

        <div className="col-md-4 mb-md-0 mb-3">
          <h5>Na vizitoni në zyret tona:</h5>
          <ul className="list-unstyled">
            <li><p>Adresa: Dragodan, Prishtine</p></li>
            <li><p>Email adresa: careerconnect@gmail.com</p></li>
          </ul>
        </div>
      </div>
    </div><br/>

    <div className="footer-copyright text-center py-3">© 2020 Copyright:
      <a href="/"> CareerConnect.com</a>
    </div>
  </footer>
);

export default Footer;
