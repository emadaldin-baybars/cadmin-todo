import React, { useCallback, useState, useEffect } from 'react'
import { Icon, VStack, useColorModeValue, Fab, useToast } from 'native-base'
import { Modal } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import AnimatedColorBox from '../components/animated-color-box'
import TaskList from '../components/task-list'
import Masthead from '../components/masthead'
import NavBar from '../components/navbar'
import {iUser} from '../models/loginResponse'
import {api_url} from '../api-params';
import { TaskItem } from '../models/taskItemData'
import { AddTask } from '../components/add-task'
import { iInternalProject, iPosition, Project } from '../models/project'
import { iTaskReq } from '../models/task'
import { StopWatch } from '../utils/stopwatch'


export default function MainScreen(props: {navigation: any, user: iUser}) {

  const [data, setData] = useState<Array<TaskItem>>([])
  const [duration, setDuration] = useState<string>('')
  const [editingItemId, setEditingItemId] = useState<number | undefined>(-1)
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [internalProjects, setInternalProjects] = useState<Array<iInternalProject>>([])
  const [externalProjects, setExternalProjects] = useState<Array<Project>>([])
  const [externalProjectPositions, setExternalProjectPositions] = useState<Array<iPosition>>([])

  const {navigation, user} = props;

  let stopWatch: StopWatch;
  const toast = useToast()

  const handleToggleTaskItem = useCallback(item => {
    setData(prevData => {
      const newData = [...prevData]
      const index = prevData.indexOf(item)
      newData[index] = {
        ...item,
        done: !item.done
      }
      return newData
    })
  }, [])

  const handleChangeTaskItemSubject = useCallback((item, newSubject) => {
    setData(prevData => {
      const newData = [...prevData]
      const index = prevData.indexOf(item)
      newData[index] = {
        ...item,
        desc: newSubject
      }
      return newData
    })
  }, [])

  const handleFinishEditingTaskItem = useCallback(_item => {
    setEditingItemId(-1)
  }, [])
  const handlePressTaskItemLabel = useCallback(item => {
    setEditingItemId(item.id)
  }, [])
  const handleRemoveItem = useCallback(item => {
    removeTask(item.id)
  }, [])

  function removeTask(taskId: number) {
    fetch(
      `${api_url}time-accounting/task/${taskId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer ' + user.jwtBearerToken,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      }) 
      .then(() => {
        setData(prevData => {
          const newData = prevData.filter(i => i.id !== taskId)
          return newData
        })
      })
      .catch((error) => {
          console.error('err', error);
      });
  }

  function getTasks() {
    fetch(
        `${api_url}time-accounting/tasks-by-date`, {
          method: 'POST',
          headers: {
            'Authorization': 'Bearer ' + user.jwtBearerToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({day: new Date()})
        }) 
        .then((response) => response.json())
        .then((json) => {
            let tasks: Array<TaskItem> = [];
            for (let index = 0; index < json.length; index++) {
              tasks.push(new TaskItem(json[index]))
            }
            setData(tasks);
        })
        .catch((error) => {
            console.error('err', error);
        });
  }

  function getDuration() {
    fetch(
        `${api_url}time-stamping/duration`, {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + user.jwtBearerToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }) 
        .then((response) => response.json())
        .then((json) => {
          if(json.lastStartTime != null) {
            let now = new Date().toISOString().split('T')[1]
            let startTime = json.lastStartTime.split('T')[1];
  
            let stopWatch = new StopWatch({
              hr: Math.abs(+now.split(':')[0] - +startTime.split(':')[0]),
              min: Math.abs(+now.split(':')[1] - +startTime.split(':')[1]),
              sec: Math.abs(+now.split(':')[2].split('.')[0] - +startTime.split(':')[2].split('.')[0])
            },
            setDuration)
  
            stopWatch.startTimer();
            setDuration(stopWatch.timer)
          } else if(json.totalSeconds != null) {
            if(json.totalSeconds > 3600){
              setDuration(new Date(json.totalSeconds * 1000).toISOString().substr(11, 8))
            } else {
              setDuration(new Date(json.totalSeconds * 1000).toISOString().substr(14, 5))
            }
          } else {
            setDuration('')
          }
        })
        .catch((error) => {
            console.error('err', error);
        });
  }

  function handleStopWatch(date: string){
    let startDate = new Date(date)
    let startTime = startDate.toISOString().split('T')[1];
    let stopWatch = new StopWatch({
      hr: +startTime.split(':')[0],
      min: +startTime.split(':')[1],
      sec: +startTime.split(':')[2].split('.')[0]
    },
    setDuration)

    stopWatch.startTimer();
    setDuration(stopWatch.timer)
  }

  function getInternalProjects() {
    fetch(
      `${api_url}users/cost-center`, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + user.jwtBearerToken,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }) 
      .then((response) => response.json())
      .then((json) => {
        setInternalProjects([json])
      })
      .catch((error) => {
          console.error('err', error);
      });
  }

  function getExternalProjects() {
    fetch(
      `${api_url}projects/time-accounting`, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + user.jwtBearerToken,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }) 
      .then((response) => response.json())
      .then((json) => {
        setExternalProjects(json)
      })
      .catch((error) => {
          console.error('err', error);
      });
  }

  function endTimeStamping(){
    fetch(
      `${api_url}time-stamping/end`, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + user.jwtBearerToken,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }) 
      .then((response) => response.json())
      .then((json) => {
        let total = json.totalSeconds;
        toast.show({
          description: "Timer stopped!",
        })
        stopWatch.stopTimer();
        if(total > 3600){
          setDuration(new Date(total * 1000).toISOString().substr(11, 8))
        } else {
          setDuration(new Date(total * 1000).toISOString().substr(14, 5))
        }
      })
      .catch((error) => {
          console.error('err', error);
      });
  }

  function startTimeStamping(){
    fetch(
      `${api_url}time-stamping/start`, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + user.jwtBearerToken,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }) 
      .then((response) => response.json())
      .then((json) => {
        let now = new Date().toISOString().split('T')[1]
        let startTime = json.lastStartTime.split('T')[1];

        stopWatch = new StopWatch({
          hr: +now.split(':')[0] - +startTime.split(':')[0],
          min: +now.split(':')[1] - +startTime.split(':')[1],
          sec: +now.split(':')[2].split('.')[0] - +startTime.split(':')[2].split('.')[0]
        },
        setDuration)

        stopWatch.startTimer();
        toast.show({
          description: "Timer started!",
        })
        setDuration(stopWatch.timer)
      })
      .catch((error) => {
          console.error('err', error);
      });
  }

  function pauseTimerStamping(){
    toast.show({
      description: "Timer paused!",
    })
  }

  function getTimeTrackablePositions(projectId: number) {
    let today = new Date();
    let year = today.getFullYear().toString().substring(2,3);
    let date = today.toISOString().split('T')[0]
    fetch(
      `${api_url}projects/get-time-trackable-positions/${projectId}?date=%${year}${date}%${year}`, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + user.jwtBearerToken,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }) 
      .then((response) => response.json())
      .then((json) => {
        setExternalProjectPositions(json)
      })
      .catch((error) => {
          console.error('err', error);
      });
  }

  function addTask(task: iTaskReq){
    fetch(
      `${api_url}time-accounting/task`, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + user.jwtBearerToken,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
      }) 
      .then((response) => response.json())
      .then((json) => {
        setData([
          json,
          ...data
        ])
      })
      .catch((error) => {
          console.error('err', error);
      });
  }
 
  useEffect(() => {
      setData([]);
      getTasks();

      return () => {
        setData([]);
      };
  }, [])

  useEffect(() => {
      setDuration('');
      getDuration();

      return () => {
        setDuration('');
      };
  }, [])

  useEffect(() => {
      setInternalProjects([]);
      getInternalProjects();

      return () => {
        setInternalProjects([]);
      };
  }, [])

  useEffect(() => {
      setExternalProjects([]);
      getExternalProjects();

      return () => {
        setExternalProjects([]);
      };
  }, [])

  return (
    <>
      <AnimatedColorBox
        flex={1}
        bg={useColorModeValue('warmGray.50', 'primary.900')}
        w="full"
      >
        <Masthead
          title={`What's up, ${props.user.firstName}!`}
          image={require('../assets/masthead.png')}
        >
          <NavBar
            startTimeStamping={startTimeStamping} 
            endTimeStamping={endTimeStamping}
            pauseTimeStamping={pauseTimerStamping}
            duration={duration}
            main={true}/>
        </Masthead>
        
        <VStack
          flex={1}
          space={1}
          bg={useColorModeValue('warmGray.50', 'primary.900')}
          mt="-20px"
          borderTopLeftRadius="20px"
          borderTopRightRadius="20px"
          pt="20px"
        >
          <TaskList
            data={data}
            onToggleItem={handleToggleTaskItem}
            onChangeSubject={handleChangeTaskItemSubject}
            onFinishEditing={handleFinishEditingTaskItem}
            onPressLabel={handlePressTaskItemLabel}
            onRemoveItem={handleRemoveItem}
            editingItemId={editingItemId}
          />
        </VStack>

        <Fab
          position="absolute"
          renderInPortal={false}
          size="sm"
          icon={<Icon color="white" as={<AntDesign name="plus" />} size="sm" />}
          colorScheme={useColorModeValue('blue', 'darkBlue')}
          bg={useColorModeValue('blue.500', 'blue.400')}
          onPress={() => {
            setModalVisible(true)
          }}
        />
      </AnimatedColorBox>
      <Modal
          animationType='slide'
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
              setModalVisible(!modalVisible);
          }}>
          <AddTask 
            setData={setData}
            internalProjects={internalProjects}
            externalProjects={externalProjects}
            getProjectPositions={getTimeTrackablePositions}
            externalProjectPositions={externalProjectPositions}
            setVisible={setModalVisible} 
            modalVisible={modalVisible}
            addTask={addTask}
            navigation={navigation}/>
      </Modal>
    </>
  )
}
