import React, { useEffect, useState } from 'react'
import {
  Theme,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import SettingsIcon from '@mui/icons-material/Settings'

import Timeline from '@mui/lab/Timeline'
import TimelineItem from '@mui/lab/TimelineItem'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineDot from '@mui/lab/TimelineDot'

import TimelineElement from './TimelineElement'
import TimelineDotComponent from './TimelineDotComponent'
import AdminComponent from '~screens/App/Admin/AdminComponent'

export interface DotObject {
  year: number
  active: boolean
  title: string
  description?: string
  caption?: string
  url?: string
  image?: string
  map?: string
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  timeline: {
    width: '738px',
    flexGrow: '0!important',
  },
  settingsIcon: {
    position: 'absolute',
    top: theme.spacing(),
    right: theme.spacing(),
    color: '#fff',
  },
}))

interface Props {
  data: DotObject[]
}

const DashboardComponent: React.FC<Props> = (props) => {
  const classes = useStyles()
  const [data, setData] = useState<DotObject[]>(props.data)
  const [adminMode, setAdminMode] = useState<boolean>(false)

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

  useEffect(() => {
    if (props.data) {
      setData(props.data)
    }
  }, [props.data])

  return (
    <>
      <SettingsIcon
        className={classes.settingsIcon} onClick={() => {
          changeActiveElement()
          setAdminMode(!adminMode)
        }}
      />
      {adminMode
        ? <AdminComponent
          data={data}
          onChangeData={(newData: DotObject[]) => {
            setData(newData)
          }}
        />
        : <div className={classes.root}>
          <Timeline position='alternate' className={classes.timeline}>
            {data.map((element: DotObject, index: number) => {
              const color = 'primary'
              const filled = element.active ? 'filled' : 'outlined'
              return (
                <TimelineItem key={element.year}>
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
                      element={element}
                    />
                  </TimelineContent>
                </TimelineItem>
              )
            },
            )}
          </Timeline>
          </div>}
    </>
  )
}

export default DashboardComponent
