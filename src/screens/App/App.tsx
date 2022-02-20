import React, { useEffect, useState } from 'react'
import { Route, Switch, useHistory } from 'react-router-dom'
import { CssBaseline, ThemeProvider, Theme } from '@mui/material'

import DashboardComponent, { DotObject } from './Dashboard/DashboardComponent'
import AdminComponent from './Admin/AdminComponent'
import HeaderComponent from '../../shared/components/HeaderComponent'
import { getAppTheme } from '~shared/config/getAppTheme'
import Gallery from '~screens/App/Gallery/Gallery'
import LoginComponent from '~screens/App/Login/LoginComponent'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from '~store/settings/settings.selectors'

export interface AppSetting {
  title: string
  path: string
}

const App: React.FC = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const theme: Theme = getAppTheme()
  const appName = 'admin_console'

  const user = useSelector(getUser)

  useEffect(() => {
    let pathname = 'apps'

    if (!user) {
      pathname = 'login'
    }

    switch (pathname) {
      case 'login':
        history.push('/login')
        break
      default:
        history.push('/')
        break
    }
  }, [history, user],
  )

  const settings: AppSetting[] = [
    {
      title: 'Skatturniere',
      path: '/',
    },
    {
      title: 'Galerie',
      path: '/gallery',
    },
    {
      title: 'Statistiken',
      path: '/statistics',
    },
    {
      title: 'Stammbaum',
      path: '/stammbaum',
    },
  ]

  const generateData = (limit: number) => {
    const dataArray: DotObject[] = []
    for (let i = 2021; i >= limit; i -= 1) {
      if (i === 2021) {
        dataArray.push({
          year: i,
          active: false,
          title: 'Dreiskau-Muckern',
          url: 'https://landschulheim-dreiskau-muckern.de/',
          caption: 'landschulheim-dreiskau-muckern.de',
          image: 'https://landschulheim-dreiskau-muckern.de/assets/images/trauf1-600x450.jpg',
        })
      }
      if (i === 2020) {
        dataArray.push({
          year: i,
          active: false,
          title: 'Naturerlebnispark Gristow',
          url: 'https://naturerlebnispark-gristow.de/',
          caption: 'naturerlebnispark-gristow.de',
          image: 'https://naturerlebnispark-gristow.de/sites/default/files/styles/tiles_fullscreen/public/media/image/gristow-farmhaus.jpg?itok=TAHkOde0',
        })
      }
      if (i !== 2020 && i !== 2021) {
        dataArray.push({
          year: i,
          active: false,
          title: `Location ${i}`,
          url: 'https://www.jugendherberge.de/?gclid=Cj0KCQiAr5iQBhCsARIsAPcwRONMSvMS8RMiHJSClBXMKhIEuGl7fl9f2nvqO7k12xF5utu5vi8DIe0aApTKEALw_wcB',
          caption: 'jugendherberge.de',
          image: 'https://media-cdn.holidaycheck.com/w_768,h_432,c_fill,q_auto,f_auto/ugc/images/910ec71b-e3ad-4933-a194-79955ab564b6',
        })
      }
    }
    return dataArray
  }

  const [data, setData] = useState<DotObject[]>(generateData(2010))
  const [filteredData, setFilteredData] = useState<DotObject[]>(generateData(2010))
  const [search, setSearch] = useState<string | undefined>('')

  const filterData = (searchInput: string) => {
    const newFilteredData: DotObject[] = []
    const regExp = new RegExp((searchInput || '').replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'), 'i')
    data && data.map((element:DotObject) => {
      if ((element.year.toString()).search(regExp) !== -1 || (element.caption && (element.caption).search(regExp) !== -1) || (element.title).search(regExp) !== -1) {
        newFilteredData.push(element)
      }
    })
    setFilteredData(newFilteredData)
  }

  useEffect(() => {
    search && filterData(search)
  }, [data])

  const LoginApp = () => (<LoginComponent />)
  const DashboardApp = () => (<DashboardComponent data={filteredData} />)
  const GalleryApp = () => (<Gallery />)

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Route exact path='/login' component={LoginApp} />
        {user &&
          <>
            <HeaderComponent items={settings} changeSearch={(value?: string) => setSearch(value)} />
            <div className='main'>
              <Switch>
                <Route exact path='/' component={DashboardApp} />
                <Route exact path='/gallery' component={GalleryApp} />
                <Route exact path='/statistics' component={DashboardApp} />
              </Switch>
            </div>
          </>}
      </ThemeProvider>
    </>
  )
}

export default App
