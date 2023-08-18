import React, { useEffect, useState, ChangeEvent } from 'react'
import {
  Theme, Paper, Typography, Link, Grid, Table, TableHead, TableBody, TableRow, TableCell, TablePagination,
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
import { useSelector } from 'react-redux'
import { getTheme } from '~store/settings/settings.selectors'
import { Member } from '~shared/types'

export interface DotObject {
  year: number
  active: boolean
  title: string
  description?: string
  caption?: string
  url?: string
  image?: string
  map?: string
  participation: Member[]
}

interface Props {
  data: DotObject[]
}

const EventComponent: React.FC<Props> = (props) => {
  const theme: Theme = useSelector(getTheme)

  const [data, setData] = useState<DotObject[]>(props.data)
  const [adminMode, setAdminMode] = useState<boolean>(false)
  const [position, setPosition] = useState<'alternate' | 'right'>('alternate')
  const [activeEvent, setActiveEvent] = useState<DotObject | undefined>()
  const [imageWidth, setImageWidth] = React.useState<string>('0')
  const [imageHeight, setImageHeight] = React.useState<string>('0')

  const elementWidthValues = {
    full: {
      width: 300,
      height: 200,
    },
  }

  useEffect(() => {
    const img = new Image()

    if (activeEvent && activeEvent.image) {
      img.onload = function () {
        const height = img.height
        const width = img.width
        const ratio = width / height
        if (ratio > 1.5) {
          setImageWidth('auto')
          setImageHeight(`${elementWidthValues.full.height}px`)
        } else {
          setImageWidth(`${elementWidthValues.full.width}px`)
          setImageHeight('auto')
        }
      }
      img.src = activeEvent.image
    }
  }, [activeEvent],
  )

  const useStyles = makeStyles((theme: Theme) => ({
    root: {
      width: '100%',
      display: 'flex',
      justifyContent: position === 'right' ? 'flex-start' : 'center',
    },
    timeline: {
      width: position === 'right' ? 'auto' : '738px',
      flexGrow: '0!important',
    },
    settingsIcon: {
      position: 'absolute',
      top: theme.spacing(),
      right: theme.spacing(),
      color: theme.palette.primary.main,
    },
    paper: {
      margin: '25px 25px 25px 0',
      padding: '25px',
      width: '100%',
    },
    location: {
      textTransform: 'uppercase',
      opacity: '0.8',
      width: '100%',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
    },
    description: {
      cursor: 'pointer',
      textTransform: 'uppercase',
      opacity: '0.8',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
    },
    container: {
      marginTop: theme.spacing(4),
    },
    image: {
      width: imageWidth,
      height: imageHeight,
      cursor: 'pointer',
    },
  }))

  const classes = useStyles()

  const changeActiveElement = (element?: DotObject) => {
    setActiveEvent(element)
    element && setPosition('right')
    !element && setPosition('alternate')
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

  const [rowsPerPage, setRowsPerPage] = React.useState<number>(25)
  const [actualPage, setActualPage] = React.useState<number>(0)

  const getPagedParticipation = () => {
    const temp: Member[] = []
    const partFrom = actualPage * rowsPerPage
    const partTo = partFrom + rowsPerPage
    console.log(partFrom, partTo)
    return temp
  }
  const [pagedParticipation, setPagedParticipation] = React.useState<Member[]>(getPagedParticipation())

  const handleChangePage = (e: React.MouseEvent<HTMLButtonElement> | null, page: number) => {
    setActualPage(page)
  }
  const handleChangePageSize = (e: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(Number.parseInt(e.target.value))
  }

  return (
    <>
      <SettingsIcon
        className={classes.settingsIcon} onClick={() => {
          changeActiveElement()
          setAdminMode(!adminMode)
        }}
      />
      {adminMode
        ? (
          <AdminComponent
            data={data}
            onChangeData={(newData: DotObject[]) => {
              setData(newData)
            }}
          />)
        : (
          <div className={classes.root}>
            <Timeline position={position} className={classes.timeline}>
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
            {activeEvent &&
              <>
                <Paper className={classes.paper}>
                  <div className={classes.location}>
                    <Typography
                      variant='h5'
                      style={{ fontWeight: '501' }}
                    >
                      {activeEvent.title}
                    </Typography>
                  </div>
                  <Typography variant='caption'>
                    <Link
                      style={{ textDecoration: 'none' }}
                      color={theme.palette.grey[600]}
                      href={activeEvent.url}
                      className={classes.description}
                      target='_blank'
                    >{activeEvent.caption}
                    </Link>
                  </Typography>
                  <Grid container className={classes.container}>
                    <Grid item xs={6}>
                      <Typography variant='body1'>{activeEvent.description}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <img
                        className={`${classes.image}`}
                        src={activeEvent.image}
                      />
                    </Grid>
                    <Grid xs={12} item container>
                      <Table size='small'>
                        <TableHead>
                          <TableRow>
                            <TableCell>
                              Vorname
                            </TableCell>
                            <TableCell>
                              Nachname
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {activeEvent.participation.map((member: Member) =>
                            <TableRow key={member.id}>
                              <TableCell>
                                {member.firstname}
                              </TableCell>
                              <TableCell>
                                {member.lastname}
                              </TableCell>
                            </TableRow>,
                          )}
                        </TableBody>
                      </Table>
                      <TablePagination
                        component='div'
                        count={100} // activeEvent.participation.length}
                        rowsPerPage={rowsPerPage}
                        page={actualPage}
                        backIconButtonProps={{
                          'aria-label': 'voherige Seite',
                        }}
                        nextIconButtonProps={{
                          'aria-label': 'nächste Seite',
                        }}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangePageSize}
                      />
                    </Grid>
                  </Grid>
                </Paper>
              </>}
          </div>)}
    </>
  )
}

export default EventComponent
