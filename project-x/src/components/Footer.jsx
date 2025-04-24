
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from '@mui/material';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer bg-dark text-light py-4">
      <Container>
        <Row>
          <Col md={4} className="text-center text-md-start">
            <h5>Rajapakse Pharmacy</h5>
            <p>Your trusted online pharmacy for all your medical needs.</p>
          </Col>
          <Col md={4} className="text-center">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link href="#" color="inherit">Home</Link></li>
              <li><Link href="#" color="inherit">Store</Link></li>
              <li><Link href="#" color="inherit">E-Channeling</Link></li>
              <li><Link href="#" color="inherit">Contact Us</Link></li>
            </ul>
          </Col>
          <Col md={4} className="text-center text-md-end">
            <h5>Contact Us</h5>
            <p>Email: support@rajapaksepharmacy.com</p>
            <p>Phone: 032-2247647</p>
          </Col>
        </Row>
        <Row className="mt-3 text-center">
          <Col>
            <p className="mb-0">&copy; {new Date().getFullYear()} Pharmacy. All Rights Reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
