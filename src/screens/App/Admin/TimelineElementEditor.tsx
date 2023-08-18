import React, { useEffect, useState } from 'react'
import {
  Grid,
  Theme, Typography,
} from '@mui/material'
import { makeStyles } from '@mui/styles'

import TextInputComponent, { TextFieldType } from '~shared/components/TextInputComponent'
import { DotObject } from '~screens/App/Events/EventComponent'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    padding: '22px 16px',
  },
}))

interface Props {
  data?: DotObject
  onChangeData?: (data: DotObject) => void
}

const TimelineElementEditor: React.FC<Props> = (props) => {
  const classes = useStyles()
  const data: DotObject | undefined = props.data

  const [year, setYear] = useState<number>(new Date().getFullYear())
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string | undefined>('')
  const [caption, setCaption] = useState<string | undefined>('')
  const [url, setUrl] = useState<string | undefined>('')

  useEffect(() => {
    if (props.data) {
      setYear(props.data.year)
      setTitle(props.data.title)
      setDescription(props.data.description)
      setCaption(props.data.caption)
      setUrl(props.data.url)
    }
  }, [props.data])

  return (
    <div className={classes.root}>
      {!data
        ? <Typography>Hier kommt ein Text hin, der erklärt, was man hier tun kann.</Typography>
        : (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextInputComponent
                label='Titel'
                value={title}
                required
                fullWidth
                onChange={(value?: string | number) => {
                  const newValue: string = value as string || ''
                  setTitle(newValue)
                  const newData: DotObject = {
                    ...data,
                    title: newValue,
                  }
                  props.onChangeData && props.onChangeData(newData)
                }}
              />
            </Grid>
            <Grid container item xs={6}>
              <Grid item xs={12}>
                <TextInputComponent
                  label='Jahr'
                  value={year}
                  required
                  type={TextFieldType.number}
                  fullWidth
                  onChange={(value?: string | number) => {
                    if (typeof value === 'number') {
                      setYear(value)
                      const newData: DotObject = {
                        ...data,
                        year: value,
                      }
                      props.onChangeData && props.onChangeData(newData)
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextInputComponent
                  label='Linktitel'
                  value={caption}
                  required
                  fullWidth
                  onChange={(value?: string | number) => {
                    const newValue: string = value as string || ''
                    setCaption(newValue as string)
                    const newData: DotObject = {
                      ...data,
                      caption: newValue,
                    }
                    props.onChangeData && props.onChangeData(newData)
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextInputComponent
                  label='Linkurl'
                  value={url}
                  required
                  fullWidth
                  onChange={(value?: string | number) => {
                    const newValue: string = value as string || ''
                    setUrl(newValue as string)
                    const newData: DotObject = {
                      ...data,
                      url: newValue,
                    }
                    props.onChangeData && props.onChangeData(newData)
                  }}
                />
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <TextInputComponent
                label='Beschreibung'
                value={description}
                required
                fullWidth
                multiline
                minRows={8}
                maxRows={8}
                onChange={(value?: string | number) => {
                  const newValue: string = value as string || ''
                  setDescription(newValue as string)
                  const newData: DotObject = {
                    ...data,
                    description: newValue,
                  }
                  props.onChangeData && props.onChangeData(newData)
                }}
              />
            </Grid>
          </Grid>)}
    </div>
  )
}

export default TimelineElementEditor
