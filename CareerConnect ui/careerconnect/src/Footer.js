import React from "react"

const Footer = () => (
  <footer className="page-footer font-small blue pt-4" style={{ backgroundColor: '#e3f2fd' }}>
    <div className="container-fluid text-center text-md-left">
      <div className="row justify-content-between">
        <div className="col-md-4 mt-md-0 mt-3">
          <h5>CareerConnect</h5>
          <p>The best offer for your business!</p>
        </div>

        <div className="col-md-4 mb-md-0 mb-3">
          <h5>Follow us on social media</h5>
          <ul className="list-unstyled">
            <li><a href="#!">Instagram</a></li>
            <li><a href="#!">X</a></li>
            <li><a href="#!">Facebook</a></li>
          </ul>
        </div>

        <div className="col-md-4 mb-md-0 mb-3">
          <h5>Come at out office</h5>
          <ul className="list-unstyled">
            <li><p>Address: Dragodan, Prishtine</p></li>
            <li><p>Email: careerconnect@gmail.com</p></li>
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
