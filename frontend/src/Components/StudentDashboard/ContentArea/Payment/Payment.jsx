import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CreditCard from './Creditcard.svg';
import Easypaisa from "./easypaisa.svg";
// Create the PaymentCard component
const PaymentCard = ({ iconUrl, title, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Card
      sx={{
        width: '40%',
        transition: 'transform 0.2s',
        transform: isHovered ? 'scale(1.05)' : 'scale(1)',
        cursor: 'pointer',
        boxShadow: isHovered ? '0px 0px 10px 0px rgba(0,0,0,0.5)' : 'none',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
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

function Payment() {
  const handleCreditCardClick = () => {
    // Handle click for Payment via credit card
    alert('Payment via credit card clicked');
  };

  const handleEasypaisaClick = () => {
    // Handle click for Payment via Easypaisa
    alert('Payment via Easypaisa clicked');
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Payment Options
      </Typography>
      <Typography variant="body1" paragraph>
        Choose your preferred payment method below:<br />
      </Typography>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>

        <PaymentCard
          iconUrl={CreditCard}
          title="Payment via credit card"
          onClick={handleCreditCardClick}
        />
        
        <PaymentCard
          iconUrl={Easypaisa} 
          title="Payment via Easypaisa"
          onClick={handleEasypaisaClick}

        />
      </div>
    </div>
  );
}

export default Payment;
