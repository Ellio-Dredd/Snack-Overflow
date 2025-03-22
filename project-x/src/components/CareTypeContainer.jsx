import CareTypeCard from './CareTypeCard';
import Box from '@mui/material/Box';

export default function CareTypeCardContainer() {
  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <CareTypeCard
        image="/static/images/cards/lizard.jpg"
        title="Lizard"
        description="Lizards are a widespread group of squamate reptiles, with over 6,000 species."
      />
      <CareTypeCard
        image="/static/images/cards/turtle.jpg"
        title="Turtle"
        description="Turtles are reptiles with hard shells that protect them from predators."
      />
      <CareTypeCard
        image="/static/images/cards/snake.jpg"
        title="Snake"
        description="Snakes are elongated, legless reptiles that belong to the suborder Serpentes."
      />
    </Box>
  );
}
