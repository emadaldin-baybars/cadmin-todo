import React from 'react'
import { ImageSourcePropType } from 'react-native'
import { Box, VStack, HStack, Heading, Image } from 'native-base'

interface Props {
  title: string
  desc?: string
  image: ImageSourcePropType
  children: React.ReactNode
}

const Masthead = ({ title, desc, image, children }: Props) => {
  return (
    <VStack h="300px" pb={5}>
      <Image
        position="absolute"
        left={0}
        right={0}
        bottom={0}
        w="full"
        h="300px"
        resizeMode="cover"
        source={image}
        alt="masthead image"
      />
      <HStack>
        {children}
      </HStack>
      <Box flex={1} />
      <Heading color="white" p={6} size="xl">
        {title}
      </Heading>
      {
        desc != null ? 
        <Heading color="white" p={6} size="lg">
          {desc}
        </Heading>
        : <></>
      }
    </VStack>
  )
}

export default Masthead
