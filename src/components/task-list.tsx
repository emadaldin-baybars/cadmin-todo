import React, { useCallback, useRef } from 'react'
import { Text } from 'native-base';
import { AnimatePresence, View } from 'moti'
import {
  PanGestureHandlerProps,
  ScrollView
} from 'react-native-gesture-handler'
import TaskItem from './task-item'
import { makeStyledComponent } from '../utils/styled'
import { iTaskItem, TaskItem as task } from '../models/taskItemData'

const StyledView = makeStyledComponent(View)
const StyledScrollView = makeStyledComponent(ScrollView)

interface TaskListProps {
  data: Array<task>
  editingItemId?: number 
  onToggleItem: (item: iTaskItem) => void
  onChangeSubject: (item: iTaskItem, newSubject: string) => void
  onFinishEditing: (item: iTaskItem) => void
  onPressLabel: (item: iTaskItem) => void
  onRemoveItem: (item: iTaskItem) => void
}

interface TaskItemProps
  extends Pick<PanGestureHandlerProps, 'simultaneousHandlers'> {
  data: task
  isEditing: boolean
  onToggleItem: (item: iTaskItem) => void
  onChangeSubject: (item: iTaskItem, newSubject: string) => void
  onFinishEditing: (item: iTaskItem) => void
  onPressLabel: (item: iTaskItem) => void
  onRemove: (item: iTaskItem) => void
}

export const AnimatedTaskItem = (props: TaskItemProps) => {
  const {
    simultaneousHandlers,
    data,
    isEditing,
    onToggleItem,
    onChangeSubject,
    onFinishEditing,
    onPressLabel,
    onRemove
  } = props
  const handleToggleCheckbox = useCallback(() => {
    onToggleItem(data)
  }, [data, onToggleItem])
  const handleChangeSubject = useCallback(
    subject => {
      onChangeSubject(data, subject)
    },
    [data, onChangeSubject]
  )
  const handleFinishEditing = useCallback(() => {
    onFinishEditing(data)
  }, [data, onFinishEditing])
  const handlePressLabel = useCallback(() => {
    onPressLabel(data)
  }, [data, onPressLabel])
  const handleRemove = useCallback(() => {
    onRemove(data)
  }, [data, onRemove])
  return (
    <StyledView
      w="full"
      from={{
        opacity: 0,
        scale: 0.5,
        marginBottom: -46
      }}
      animate={{
        opacity: 1,
        scale: 1,
        marginBottom: 0
      }}
      exit={{
        opacity: 0,
        scale: 0.5,
        marginBottom: -46
      }}
    >
      <TaskItem
        simultaneousHandlers={simultaneousHandlers}
        subject={data.description}
        isDone={data.currentTimeEntry?.isFinished}
        isEditing={isEditing}
        onToggleCheckbox={handleToggleCheckbox}
        onChangeSubject={handleChangeSubject}
        onFinishEditing={handleFinishEditing}
        onPressLabel={handlePressLabel}
        onRemove={handleRemove}
      />
    </StyledView>
  )
}

export default function TaskList(props: TaskListProps) {
  const {
    data,
    editingItemId,
    onToggleItem,
    onChangeSubject,
    onFinishEditing,
    onPressLabel,
    onRemoveItem
  } = props
  const refScrollView = useRef(null)

  return (
    <StyledScrollView ref={refScrollView} w="full">
      <AnimatePresence>
        {
          data.length > 0 ?
            data.map(item => (
              <AnimatedTaskItem
                key={item.id}
                data={item}
                simultaneousHandlers={refScrollView}
                isEditing={item.id === editingItemId}
                onToggleItem={onToggleItem}
                onChangeSubject={onChangeSubject}
                onFinishEditing={onFinishEditing}
                onPressLabel={onPressLabel}
                onRemove={onRemoveItem}
              />
            ))
            :
            <View 
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 20,
              }}>
              <Text 
                style={{
                  color: 'lightgray',
                  fontSize: 20,
                }}> No Tasks Added. </Text>
            </View>
        }
      </AnimatePresence>
    </StyledScrollView>
  )
}
