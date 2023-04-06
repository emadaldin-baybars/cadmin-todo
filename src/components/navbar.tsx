import React, { useCallback } from 'react'
import { HStack, IconButton, View, Text } from 'native-base'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { DrawerNavigationProp } from '@react-navigation/drawer'

const NavBar = (props: {
  duration: string, 
  main: boolean,
  endTimeStamping: () => void | null,
  startTimeStamping: () => void | null,
  pauseTimeStamping: () => void | null
}) => {

  const navigation = useNavigation<DrawerNavigationProp<{}>>()
  const handlePressMenuButton = useCallback(() => {
    navigation.openDrawer()
  }, [navigation])

  const handlePressStartButton = useCallback(() => {
    props.startTimeStamping()
  }, [])

  const handlePressEndButton = useCallback(() => {
    props.endTimeStamping()
  }, [])

  const handlePressPauseButton = useCallback(() => {
    props.pauseTimeStamping()
  }, [])

  
  return (
    <HStack h={40} alignItems="center" alignContent="center" p={4}>
      <View 
        style={{
          flexDirection: 'column',
          width: '100%',
          marginTop: 50
        }}>
        <View 
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%'
          }}>
          <View>
            <IconButton
              onPress={handlePressMenuButton}
              borderRadius={100}
              _icon={{
                as: Feather,
                name: 'menu',
                size: 6,
                color: 'white'
              }}
            />
          </View>
          <View 
            style={{
              alignContent: 'center',
              marginTop: 12
            }}>
            <Text 
              style={{
                color: "#F1F1F1",
                fontSize: 18,
                fontWeight: '500'
              }}>
              {props.duration}
            </Text>
          </View>

          {
            props.main?
              <View 
                style={{
                  flexDirection: 'column'
                }}>
                <IconButton
                  onPress={handlePressStartButton}
                  borderRadius={100}
                  _icon={{
                    as: Feather,
                    name: 'play',
                    size: 6,
                    color: 'white'
                  }}
                />
                <IconButton
                  onPress={handlePressPauseButton}
                  borderRadius={100}
                  _icon={{
                    as: Feather,
                    name: 'pause',
                    size: 6,
                    color: 'white'
                  }}
                />
                <IconButton
                  onPress={handlePressEndButton}
                  borderRadius={100}
                  _icon={{
                    as: Feather,
                    name: 'square',
                    size: 6,
                    color: 'white'
                  }}
                />
              </View>
            :
            <></>
          }
        </View>
      </View>
    </HStack>
  )
}

export default NavBar
