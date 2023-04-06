import React, {useState} from 'react';
import { View, Text, IconButton, Radio, Select, CheckIcon, Input, TextArea, Divider, Pressable} from 'native-base';
import { Feather } from '@expo/vector-icons'
import { TaskItem } from '../models/taskItemData';
import { iInternalProject, iPosition, iProject } from '../models/project';
import MaskInput from 'react-native-mask-input';
import { iTaskReq } from '../models/task';


const enum ProjectType {
    "internal" = 1,
    "external" = 2
}

export const AddTask = (
    props: {
        setVisible:(x:boolean) => void,
        setData:(item: TaskItem) => void,
        getProjectPositions:(id: number) => void,
        addTask:(task:any) => void,
        internalProjects: Array<iInternalProject>,
        externalProjects: Array<iProject>,
        externalProjectPositions: Array<iPosition>
        modalVisible: boolean,
        navigation: any
    }) => {

    
    const {
        setVisible,
        setData,
        getProjectPositions,
        addTask,
        internalProjects,
        externalProjects,
        externalProjectPositions,
        modalVisible,
        navigation
    } = props


    const [projectType, setProjectType] = useState<string>("1");
    const [project, setProject] = useState<any>(null);
    const [position, setPosition] = useState<any>(null);
    const [desc, setDesc] = useState<string>('');
    const [from, setFrom] = useState<string>('');
    const [to, setTo] = useState<string>('');

    return (
        <View 
            style={{
                flex: 1,
                flexDirection:'column',
                justifyContent: 'flex-end'
            }}>
            <View 
                style={{
                    height: '75%',
                    backgroundColor: '#FFF',
                    borderTopWidth: 1,
                    borderTopColor: '#FFF',
                    borderTopRightRadius: 8,
                    borderTopLeftRadius: 8,
                    padding: 15
                }}>
                <View
                    style={{
                        flexDirection: 'column'
                    }}>
                    <View 
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                        <View
                            style={{
                            }}>
                            <Text
                                style={{
                                    fontSize: 18,
                                    color: '#333',
                                    fontWeight: '500'
                                }}>
                                Add Task
                            </Text>
                        </View>
                        <View>
                            <IconButton
                                onPress={() => {
                                    setVisible(false)
                                }}
                                borderRadius={100}
                                _icon={{
                                    as: Feather,
                                    name: 'x',
                                    size: 6,
                                    color: '#333'
                                }}
                            />
                        </View>
                    </View>

                    <View
                        style={{
                            flexDirection: 'column'
                        }}>
                        
                        <View 
                            style={{
                                flexDirection: 'row'
                            }}>
                            <Radio.Group
                                flexDirection={'row'}
                                justifyContent={'space-between'}
                                name="projectTypeRadioGroup"
                                accessibilityLabel="project type"
                                value={projectType}
                                onChange={(nextValue) => {
                                    setProjectType(nextValue)
                                }}>
                                <Radio value="1" my={1} style={{marginRight: 7}}>
                                    internal
                                </Radio>
                                <Radio value="2" my={1}>
                                    external
                                </Radio>
                            </Radio.Group>
                        </View>

                        <View 
                            style={{
                                margin: 20
                            }}>
                            <Divider />
                        </View>

                        <View>
                            {
                                projectType == "1" ? 
                                // internal one
                                <View>
                                    <Select
                                        selectedValue={project}
                                        minWidth="200"
                                        accessibilityLabel="Choose Project"
                                        placeholder="Choose Project"
                                        _selectedItem={{
                                            bg: "teal.600",
                                            endIcon: <CheckIcon size="5" />,
                                        }}
                                        mt={1}
                                        onValueChange={(itemValue) => {
                                            let p = internalProjects.find(p => p.id == +itemValue)
                                            setProject(itemValue)
                                        }}>
                                        {
                                            internalProjects.map(p => (
                                                <Select.Item 
                                                    key={p.id} 
                                                    label={p.description} 
                                                    value={`${p.id}`} />
                                            ))
                                        }
                                    </Select>
                                </View>
                                :
                                // external one
                                <View>
                                    <Select
                                        selectedValue={project}
                                        minWidth="200"
                                        accessibilityLabel="Choose Project"
                                        placeholder="Choose Project"
                                        _selectedItem={{
                                            bg: "teal.600",
                                            endIcon: <CheckIcon size="5" />,
                                        }}
                                        mt={1}
                                        onValueChange={(itemValue) => {
                                            setProject(itemValue)
                                            getProjectPositions(+itemValue)
                                        }}>
                                        {
                                            externalProjects.map(p => (
                                                <Select.Item 
                                                    key={p.projectId} 
                                                    label={p.projectDescription} 
                                                    value={`${p.projectId}`} />
                                            ))
                                        }
                                    </Select>
                                </View>
                            }
                        </View>


                        <View>
                            <Select
                                selectedValue={position}
                                minWidth="200"
                                accessibilityLabel="Choose Position"
                                placeholder="Choose Position"
                                _selectedItem={{
                                    bg: "teal.600",
                                    endIcon: <CheckIcon size="5" />,
                                }}
                                mt={1}
                                onValueChange={(itemValue) => setPosition(itemValue)}>
                                    {
                                        projectType == "1"?
                                            (
                                                project == null ?
                                                <></> :
                                                internalProjects.find(p => p.id == +project)?.positions?.map(
                                                    p => (
                                                        <Select.Item 
                                                            key={p.id} 
                                                            label={p.description} 
                                                            value={`${p.id}`} />
                                                    )
                                                )
                                            )
                                            : 
                                            externalProjectPositions.map(
                                                p => (
                                                    <Select.Item 
                                                        key={p.id} 
                                                        label={p.description} 
                                                        value={`${p.id}`} />
                                                )
                                            )

                                    }
                            </Select>
                        </View>

                        <View 
                            style={{
                                margin: 20
                            }}>
                            <Divider />
                        </View>

                        <View 
                            style={{
                                marginTop: 10
                            }}>
                            <TextArea 
                                variant="outline" 
                                placeholder="Description"
                                onChangeText={setDesc}/>
                        </View>

                        <View 
                            style={{
                                margin: 20
                            }}>
                            <Divider />
                        </View>

                        <View 
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-evenly',
                                alignItems: 'center'
                            }}>
                            <View>
                                <MaskInput
                                    style= {{
                                        borderWidth: 1,
                                        borderRadius: 8,
                                        fontSize: 15,
                                        borderColor: 'lightgray',
                                        height: 50,
                                        width: 80,
                                        textAlign: 'center'
                                    }}
                                    value={from}
                                    onChangeText={(masked, unmasked) => {
                                        setFrom(masked);
                                    }}
                                    mask={[/\d/, /\d/, ':', /\d/, /\d/]}
                                    />
                            </View>

                            <View>
                                <Text
                                    style={{
                                        fontSize: 20,
                                        fontWeight: '600'
                                    }}>
                                    :
                                </Text>
                            </View>

                            <View>
                                <MaskInput
                                    style= {{
                                        borderWidth: 1,
                                        borderRadius: 8,
                                        fontSize: 15,
                                        borderColor: 'lightgray',
                                        height: 50,
                                        width: 80,
                                        textAlign: 'center'
                                    }}
                                    value={to}
                                    onChangeText={(masked, unmasked) => {
                                        setTo(masked);
                                    }}
                                    mask={[/\d/, /\d/, ':', /\d/, /\d/]}
                                />
                            </View>
                        </View>
                    </View>

                    <View 
                        style={{
                            marginTop: 30,
                            width: '100%',
                            justifyContent: 'flex-end',
                            alignItems: 'center',
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
                            let date = new Date();
                            let fromDate = new Date(`${date.toISOString().split('T')[0]}T${from}`)
                            let toDate = new Date(`${date.toISOString().split('T')[0]}T${to}`)
                            let task: iTaskReq = {
                                costElementId: position,
                                date: date,
                                description: desc,
                                id: null,
                                isDurationBased: false,
                                timeInterval: {
                                    startTime: fromDate,
                                    stopTime: toDate
                                }
                            }
                            
                            addTask(task)
                            setVisible(false)
                        }}>
                        <Text 
                            style={{
                                fontWeight: '500',
                                fontSize: 15
                            }}>
                            Save
                        </Text>
                    </Pressable>
                </View>
                </View>
            </View>
        </View>
    )
}