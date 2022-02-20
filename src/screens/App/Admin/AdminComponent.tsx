import React, { useState } from 'react'
import {
  Theme, Grid,
} from '@mui/material'
import { makeStyles } from '@mui/styles'

import Timeline from '@mui/lab/Timeline'
import TimelineItem from '@mui/lab/TimelineItem'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineDot from '@mui/lab/TimelineDot'

import TimelineElement from '../Dashboard/TimelineElement'
import TimelineDotComponent from '../Dashboard/TimelineDotComponent'
import TimelineElementEditor from './TimelineElementEditor'

import { DotObject } from '../Dashboard/DashboardComponent'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
  },
}))

interface Props {
  data: DotObject[]
  onChangeData?: (data: DotObject[]) => void
}

const AdminComponent: React.FC<Props> = (props) => {
  const classes = useStyles()

  const [data, setData] = useState<DotObject[]>(props.data)
  const [selectedElement, setSelectedElement] = useState<DotObject | undefined>(props.data.find((element: DotObject) => element.active === true))

  const changeActiveElement = (element?: DotObject) => {
    const newData: DotObject[] = []
    data.map((elem: DotObject) => {
      if (element && element.year === elem.year) {
        newData.push({ ...elem, active: true })
      } else {
        newData.push({ ...elem, active: false })
      }
    })
    setData(newData)
  }

  const changeData = (newData: DotObject) => {
    const newDataArray: DotObject[] = []
    data.map((element: DotObject) => {
      if (selectedElement && element.year === selectedElement.year) {
        newDataArray.push({
          ...newData,
        })
      } else {
        newDataArray.push(element)
      }
    })
    setData(newDataArray)
    props.onChangeData && props.onChangeData(newDataArray)
  }

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={4}>
          <Timeline position='right'>
            {data.map((element: DotObject, index: number) => {
              const color = 'primary'
              const filled = element.active ? 'filled' : 'outlined'
              return (
                <TimelineItem
                  key={element.year} onClick={() => {
                    setSelectedElement({ ...element, active: true })
                  }}
                >
                  <TimelineSeparator>
                    <TimelineDot
                      onClick={() => changeActiveElement(element)}
                      color={color}
                      variant={filled}
                    >
                      <TimelineDotComponent
                        year={element.year}
                        active={element.active}
                      />
                    </TimelineDot>
                    {(index < data.length - 1) && <TimelineConnector />}
                  </TimelineSeparator>
                  <TimelineContent onClick={() => changeActiveElement(element)}>
                    <TimelineElement
                      width='small'
                      element={element}
                    />
                  </TimelineContent>
                </TimelineItem>
              )
            },
            )}
          </Timeline>
        </Grid>
        <Grid item xs={8}>
          <TimelineElementEditor data={selectedElement} onChangeData={changeData} />
        </Grid>
      </Grid>
    </div>
  )
}

export default AdminComponent
