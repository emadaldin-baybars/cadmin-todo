import { View, Text, Input, Heading, Pressable, Image, StatusBar } from 'native-base';
import { Vibration } from 'react-native';
import React, { useCallback, useState} from 'react';
import {api_url} from '../api-params';


const initialData = {
    username: undefined,
    password: undefined
}

interface LoginData {
    username: string,
    password: string
}

interface LoginProps {
  setUser: (item: LoginData) => void
}

interface LoginError {
    baseType: string,
    code: string,
    message: string,
    type: string,
    data: any
}

export default function LoginScreen(props: {navigation:any, setUser:any}) {

    const [loginData, setLoginData] = useState(initialData);
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState<LoginError | null>(null)

    const getDayTime = () => {
        let today = new Date();
        let time = today.getHours();

        if(time > 0 && time < 12) {
            return 'Good Morning, Evolvice!'
        } else {
            return 'Good Evening, Evolvice!'
        }
    }

    const login = (data: LoginData) => {
        // validation
        if(data.password == undefined && data.username == undefined){

        } else {
            // calling endpoint
            fetch(`${api_url}security/sign-in`, {
                method: 'POST',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then((response) => response.json())
            .then((json) => {
                if(json.code){
                    setLoginError(json)
                } else {
                    props.setUser(json)
                    setLoginError(null)
                    Vibration.vibrate()
                    props.navigation.navigate("Main")
                }
            })
            .catch((error) => {
                console.error(error);
            })
        }
    }
    
    return (
        <View 
            style={{
                flex: 1,
                backgroundColor: '#13121a',
                paddingHorizontal: 20
            }}>
            
            <Image
                w="30%"
                resizeMode="contain"
                source={require('../assets/logo_wht.png')}
                alt="company logo"
                style={{
                    marginTop: 40
                }}
            />

            <View 
                style={{
                    paddingVertical: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1,
                }}>
                
                <View style={{width: '100%'}}>
                    <Heading color="white" size="2xl" style={{marginBottom:35}}>
                        Let's sign you in.
                    </Heading>
                    <Heading color="white" size="lg">
                        Welcome Back.
                    </Heading>
                    <Heading color="white"  size="lg">
                        You have been missed!
                    </Heading>
                </View>

                <View 
                    style={{
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flex: 1,
                        width: '75%'
                    }}>
                    <View 
                        style={{
                            marginBottom: 10,
                            width: '100%'
                        }}>
                        <Input
                            textAlign={"left"}
                            placeholder="_userName"
                            value={loginData.username}
                            variant="unstyled"
                            color={"#F1F1F1"}
                            style={{
                                borderWidth: 1,
                                borderRadius: 7,
                                borderColor: '#333',
                            }}
                            isFullWidth={true}
                            height={10}
                            fontSize={19}
                            px={1}
                            py={0}
                            blurOnSubmit
                            onChangeText={setUserName}
                        />
                    </View>
                    <View 
                        style={{
                            marginBottom: 10,
                            width: '100%'
                        }}>
                        <Input
                            textAlign={"right"}
                            type='password'
                            color={"#F1F1F1"}
                            placeholder="_password"
                            value={loginData.password}
                            style={{
                                borderWidth: 1,
                                borderRadius: 7,
                                borderColor: '#333'
                            }}
                            isFullWidth={true}
                            height={10}
                            fontSize={19}
                            px={1}
                            py={0}
                            blurOnSubmit
                            onChangeText={setPassword}
                        />
                    </View>
                    
                    {
                        loginError != null ? 
                            <View>
                                <Text
                                    style={{
                                        color: 'orange'
                                    }}>
                                    {loginError.message}
                                </Text>
                            </View>
                        : 
                            <></>
                    }

                </View>
                
                

                <View 
                    style={{
                        width: '100%',
                        justifyContent: 'flex-end',
                        alignItems: 'center'
                    }}>
                    <Pressable
                        style={{
                            width: '80%',
                            backgroundColor: '#F1F1F1',
                            borderColor: '#F1F1F1',
                            borderWidth: 1,
                            borderRadius: 8,
                            marginBottom: 20,
                            height: 50,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        onPress={() => {
                            login({username, password})    
                        }}>
                        <Text 
                            style={{
                                fontWeight: '500',
                                fontSize: 15
                            }}>
                            Sign in
                        </Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}