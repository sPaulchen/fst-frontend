import React from 'react'

import { makeStyles } from '@mui/styles'
import { Theme, Typography } from '@mui/material'
import { AppSetting } from '~screens/App/App'
import { useHistory } from 'react-router'
import SearchComponent from '~shared/components/SearchComponent'

interface Props {
  items: AppSetting[]
  user?: any
  changeSearch?: (value?: string) => void
}
const HeaderComponent: React.FC<Props> = (props) => {
  const history = useHistory()

  const changeTab = (value: string) => {
    history.replace(value)
  }

  const useStyles = makeStyles((theme: Theme) => ({
    header: {
      width: '100%',
    },
  }))
  const classes = useStyles()
  return (
    <>
      <div>
        <img src='images/header.jpg' />
      </div>
      <SearchComponent changeSearch={(value?: string) => props.changeSearch && props.changeSearch(value)} />
    </>
  )
}

export default HeaderComponent
