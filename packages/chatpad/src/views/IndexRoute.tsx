import {Center, Container, Text} from '@mantine/core';
import {Logo} from '../components/Logo';

export function IndexRoute() {
  return (
    <>
      <Center py="xl" sx={{height: '100%'}}>
        <Container size="sm">
          <Text>
            <Logo style={{maxWidth: 240}} />
          </Text>
          <Text mt={4} size="xl">
            Welcome to ZDI Chatbot AI
          </Text>
          <Text color="dimmed" mt={4} size="s">
            In here you can chat with ZDI Chatbot AI
          </Text>
          <Text color="dimmed" mt={4} size="s">
            help us to improve our service
          </Text>
        </Container>
      </Center>
    </>
  );
}
