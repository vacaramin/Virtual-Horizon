import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CreditCard from '/home/awais/Desktop/Virtual-Horizon/frontend/src/Components/StudentDashboard/ContentArea/Payment/Creditcard.svg'
import Easypaisa from '/home/awais/Desktop/Virtual-Horizon/frontend/src/Components/StudentDashboard/ContentArea/Payment/easypaisa.svg'


const PaymentCard = ({ iconUrl, title }) => {
  return (
    <Card sx={{ width: "40%"}}>
      <CardMedia
        component="img"
        height="250"
        image={iconUrl}
        alt="Payment Icon"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
};

//payment function which will return the payment cards.
function Payment() {
  return (

    <div style={{ display: 'flex', justifyContent: 'space-around'}}>
      <PaymentCard
        iconUrl={CreditCard} // Replace with the actual URL of your credit card icon
        title="Payment via credit card"
      />
      <PaymentCard lassName="content-area-student"
        iconUrl= {Easypaisa} // Replace with the actual URL of your Easypaisa icon
        title="Payment via Easypaisa"
      />
    </div>
  );
}

export default Payment;
