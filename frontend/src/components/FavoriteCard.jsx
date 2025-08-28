import React from 'react';
import { Flex, Text, Avatar, Card, Box, Button } from '@radix-ui/themes';
import { useLocation, Link, Routes, Route, useParams } from 'react-router-dom';
import '../styles/App.css';

export const FavoriteCard = ({ calories, id, image, ingredientLines, source, label, uri, isEdamam }) => {
  // For Edamam recipes, wrap in { recipe: ... } to match SingleRecipe expectations
  const recipeData = isEdamam
    ? {
        recipe: {
          calories,
          id,
          image,
          ingredientLines,
          source,
          label,
          uri,
          isEdamam,
        },
      }
    : {
        calories,
        id,
        image,
        ingredientLines,
        source,
        label,
        uri,
        isEdamam,
      };

  return (
    <div className="gimme-space">
      <Box maxWidth="800px">
        <Card>
          <Flex gap="4" justify="between" align="start">
            <Box>
              <Text as="div" size="4" weight="bold">
                {label}
              </Text>
              {ingredientLines.map((item, index) => (
                <Text as="div" size="2" color="gray" key={index}>
                  - {item}
                </Text>
              ))}
              <Text as="div" size="2" weight="bold">
                Calories: {calories}
              </Text>
              <Text as="div" size="2" weight="bold">
                {source}
              </Text>
              <br></br>
              <Link to={`/recipe/${id}`} state={{ recipe: recipeData }}>
                <button>View</button>
              </Link>
            </Box>

            <img style={{ width: '200px' }} src={image} fallback="T" />
          </Flex>
        </Card>
      </Box>
    </div>
  );
};
