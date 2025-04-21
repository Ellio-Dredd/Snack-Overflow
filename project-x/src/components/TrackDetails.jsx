
import { Card, CardBody } from 'react-bootstrap';
import { Typography } from '@mui/material';

export default function TrackingDetails({ trackingInfo }) {
  if (!trackingInfo) return null; // Prevents errors if trackingInfo is null

  return (
    <div>
      <Card className="p-4 shadow">
        <CardBody>
          <Typography variant="h5">Order Details</Typography>
          <p><strong>Order ID:</strong> {trackingInfo.orderId}</p>
          <p><strong>Status:</strong> {trackingInfo.states}</p>
          <p><strong>Estimated Arrival Date:</strong> {trackingInfo.estimatedDate}</p>
          <p><strong>Location:</strong> {trackingInfo.location}</p>
        </CardBody>
      </Card>
    </div>
  );
}

