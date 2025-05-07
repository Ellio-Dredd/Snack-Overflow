import { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, CardBody, FormGroup, FormLabel, FormControl } from 'react-bootstrap';
import { Typography } from "@mui/material";
import axios from 'axios';

export default function Deliver() {
  const [trackingNo, setTrackingNo] = useState("");  // same as orderId
  const [trackingInfo, setTrackingInfo] = useState(null);

  const Track = async () => {
    try {
      // Send the tracking number (which is actually the orderId) to the backend
      const response = await axios.get(`http://localhost:3000/api/delivery/${trackingNo}`);
      setTrackingInfo(response.data);  // Save the delivery info in state
    } catch (error) {
      console.error("Error fetching tracking info:", error);
      alert("Order not found");
    }
  };

  return (
    <div>
      <Typography variant="h4">Delivery Tracking</Typography>
      <Container className="mt-4">
        <Row className="justify-content-md-center">
          <Col md={6}>
            <Card className="p-4 shadow">
              <CardBody>
                <Typography variant="h5" className="mb-3">Track Your Order</Typography>
                <Form>
                  <FormGroup className="mb-3">
                    <FormLabel>Enter Order ID </FormLabel>
                    <FormControl 
                      type="text" 
                      placeholder="Enter Order ID (Tracking No.)" 
                      value={trackingNo} 
                      onChange={(e) => setTrackingNo(e.target.value)} 
                    />
                  </FormGroup>
                  <Button variant="primary" onClick={Track}>Track Order</Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>

        {trackingInfo && (
          <Row className="justify-content-md-center mt-4">
            <Col md={6}>
              <TrackingDetails trackingInfo={trackingInfo} />
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
}

function TrackingDetails({ trackingInfo }) {
  return (
    <Card className="p-4 shadow">
      <CardBody>
        <Typography variant="h6" className="mb-3">Tracking Details</Typography>
        <Typography>Order ID: {trackingInfo.orderId}</Typography>
        {/* <Typography>Name: {trackingInfo.name}</Typography> */}
        <Typography>Delivery Person: {trackingInfo.deliveryPerson}</Typography>
        <Typography>Status: {trackingInfo.status}</Typography>
        <Typography>Location: {trackingInfo.deliveryAddress}</Typography>
        <Typography>Estimated Delivery: {new Date(trackingInfo.estimatedDeliveryTime).toLocaleDateString()}</Typography>
        
      </CardBody>
    </Card>
  );
}
