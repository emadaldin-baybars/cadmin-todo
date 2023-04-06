import React from 'react'
import {
  ScrollView,
  Box,
  Text,
  VStack,
  Icon,
  Image,
  useColorModeValue
} from 'native-base'
import { Feather } from '@expo/vector-icons'
import AnimatedColorBox from '../components/animated-color-box'
import Navbar from '../components/navbar'
import Masthead from '../components/masthead'
import LinkButton from '../components/link-button'

const AboutScreen = () => {
  return (
    <AnimatedColorBox
      flex={1}
      bg={useColorModeValue('warmGray.50', 'warmGray.900')}
      w="full">
      <Masthead
        title="About this app"
        image={require('../assets/masthead.png')}>
        <Navbar main={false}/>
      </Masthead>
      <ScrollView
        borderTopLeftRadius="20px"
        borderTopRightRadius="20px"
        bg={useColorModeValue('warmGray.50', 'primary.900')}
        mt="-20px"
        pt="30px"
        p={4}>
        <VStack flex={1} space={4}>
          <Box alignItems="center">
            <Image
              source={require('../assets/evoFav.png')}
              borderRadius="full"
              resizeMode="cover"
              w={120}
              h={120}
              alt="author"/>
          </Box>
          <Text fontSize="md" w="full">
            This is a React Native app built on Evolvice Cadmin.
          </Text>
          
          <LinkButton
            colorScheme={useColorModeValue('blue', 'darkBlue')}
            size="lg"
            borderRadius="lg"
            href="https://twitter.com/evolvice"
            leftIcon={
              <Icon as={Feather} name="twitter" size="sm" opacity={0.5} />
            }>
            @Evolvice
          </LinkButton>

          <LinkButton
            colorScheme={useColorModeValue('orange', 'orange')}
            size="lg"
            borderRadius="lg"
            href="https://evolvice.de">
            Evolvice.De
          </LinkButton>
          
        </VStack>
      </ScrollView>
    </AnimatedColorBox>
  )
}

export default AboutScreen
