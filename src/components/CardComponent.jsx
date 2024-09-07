import React from 'react';
import { Card, CardContent } from '@mui/material';

const ResponsiveCard = ({ children, opacity }) => {
  return (
    <Card
      sx={{
        maxWidth: { xs: '90%', sm: '80%', md: '70%', lg: '60%', xl: '50%' }, // Increase size on larger screens
        width:'auto',
        minHeight: 'auto',
        margin: { xs: '1rem', sm: '2rem auto' }, // Responsive margin
        padding: { xs: '0.5rem', sm: '1rem' }, // Responsive padding
        boxShadow: 3,
        backgroundColor: `rgba(255, 255, 255, ${opacity || 1})`, // Default opacity to 1 if not provided
        mx: 'auto', // Center horizontally
      }}
    >
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
};

export default ResponsiveCard;
