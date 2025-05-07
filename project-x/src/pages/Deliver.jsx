import  {useState} from 'react'
import { Container, Row, Col, Card, Button, Form, CardBody, FormGroup, FormLabel, FormControl } from 'react-bootstrap'
import { AppBar, Toolbar, Typography,Box } from "@mui/material";
//  



export default function Deliver() {
    const[trackingNo, setTrackingNo] = useState("")
    const[trackingInfo, setTrackingInfo] = useState("")
    const Track=() => {
        const temp = {
            orderId : "1",
            states : "Processing",
            estimatedDate: "March 25th",
            location: "New town, Madampe"
        }
        setTrackingInfo(temp)
    }
  return (
    <div>
      <Typography variant="h4">Deliver Tracking</Typography>
      <Container className="mt-4">
        <Row className="justify-content-md-center">
            <Col md={6}>
                <Card className="p-4 shadow">
                    <CardBody>
                        <Typography variant="h5" className="mb-3">Track Your Order</Typography>
                        <Form>
                            <FormGroup className="mb-3">
                                <FormLabel>Enter Tracking No.</FormLabel>
                                <FormControl type="text" placeholder="Enter Tracking No" value={trackingNo} onChange={(e) => setTrackingNo(e.target.value)}/>
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
                    <TrackingDeatils trackingInfo={trackingInfo}/>
                </Col>
            </Row>
        )}

      </Container>
    </div>
  )
}