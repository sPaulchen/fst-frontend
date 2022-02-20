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
    svg: {
      display: 'inline-block',
      position: 'absolute',
      top: 0,
      left: 0,
      fill: theme.palette.primary.main,
    },
    container: {
      marginTop: -window.innerWidth / 12,
      display: 'inline-block',
      position: 'relative',
      width: '100%',
      paddingBottom: '26%',
      verticalAlign: 'middle',
      overflow: 'hidden',
    },
    navContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      width: '50%',
      position: 'absolute',
      bottom: 0,
      padding: '2% 4%',
    },
    navPoint: {
      width: '80px',
      height: '80px',
      borderRadius: '100%',
      backgroundColor: '#fff',
      color: theme.palette.primary.main,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  }))
  const classes = useStyles()
  return (
    <>
      <div
        id='header'
        className={classes.container}
      >
        <svg className={classes.svg} viewBox='0 0 500 500' preserveAspectRatio='xMinYMin meet'>
          <path d='M0,100 C150,200 350,0 500,100 L500,00 L0,0 Z' />
        </svg>
        <div className={classes.navContainer}>
          {props.items.map((element: AppSetting, index: number) =>
            <div
              style={{
                marginTop: `${index === 1
                  ? 30
                  : (index === 2
                    ? 15
                    : (index === 3
                    ? 0
                    : 0))}px`,
                width: `${index === 1
                  ? window.innerWidth / 11
                  : (index === 2
                    ? window.innerWidth / 12
                    : (index === 3
                    ? window.innerWidth / 13
                    : window.innerWidth / 10))}px`,
                height: `${index === 1
                  ? window.innerWidth / 11
                  : (index === 2
                    ? window.innerWidth / 12
                    : (index === 3
                    ? window.innerWidth / 13
                      : window.innerWidth / 10))}px`,
              }}
              className={classes.navPoint}
              onClick={() => changeTab(element.path)}
              key={`tab-${element.path}`}
            >
              <Typography>{element.title}</Typography>
            </div>,
          )}
        </div>
      </div>
      <SearchComponent changeSearch={(value?: string) => props.changeSearch && props.changeSearch(value)} />
    </>
  )
}

export default HeaderComponent
