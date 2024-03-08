import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Flex, Spacer, Button, ButtonGroup, IconButton, useColorMode, useColorModeValue, Image } from '@chakra-ui/react';
import { FaSun, FaMoon } from 'react-icons/fa';

function NavBar() {
  const { toggleColorMode } = useColorMode();
  const colorModeIcon = useColorModeValue(<FaMoon />, <FaSun />);

  return (
    <Box boxShadow="lg" bg="blue.500" px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Box>
          <Flex alignItems="center">
            <Image src="../src/assets/images/logo.jpg" alt="Logo" h={8} mr={4} />
            <Link to="/">
              <Button colorScheme="blue" variant="ghost">
                Accueil
              </Button>
            </Link>
            <Link to="/connexion">
              <Button colorScheme="blue" variant="ghost">
                Connexion
              </Button>
            </Link>
            <Link to="/inscription">
              <Button colorScheme="blue" variant="ghost">
                Inscription
              </Button>
            </Link>
          </Flex>
        </Box>
        <Spacer />
        <ButtonGroup spacing={4}>
        <Link to="/admin">
              <Button colorScheme="blue" variant="solid">
                Admin
              </Button>
        </Link>
        <Link to="/basket">
              <Button colorScheme="blue" variant="solid">
                Panier
              </Button>
        </Link>
        <IconButton
          aria-label="Toggle color mode"
          icon={colorModeIcon}
          onClick={toggleColorMode}
          variant="ghost"
        />
        </ButtonGroup>
      </Flex>
    </Box>
  );
}

export default NavBar;
