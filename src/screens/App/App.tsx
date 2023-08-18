import React, { useEffect, useState } from 'react'
import { Route, Switch, useHistory } from 'react-router-dom'
import { CssBaseline, ThemeProvider, Theme } from '@mui/material'

import EventComponent, { DotObject } from './Events/EventComponent'
import AdminComponent from './Admin/AdminComponent'
import HeaderComponent from '../../shared/components/HeaderComponent'
import { getAppTheme } from '../../shared/config/getAppTheme'
import Gallery from './Gallery/Gallery'
import LoginComponent from './Login/LoginComponent'

export enum MenuItem {
  family = 'family',
  events = 'events',
  gallery = 'gallery',
  familyTree = 'familyTree',
}

export interface AppSetting {
  title: string
  path: string
  value: string
}

const App: React.FC = () => {
  const history = useHistory()

  const theme: Theme = getAppTheme()

  const user: any = {
    email: 'kristinkatrindietze@gmail.com',
  }

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
      title: 'Familiengeschichte',
      path: '/',
      value: MenuItem.family,
    },
    {
      title: 'Skatturniere',
      path: '/events',
      value: MenuItem.events,
    },
    {
      title: 'Stammbaum',
      path: '/familyTree',
      value: MenuItem.familyTree,
    },
    {
      title: 'Galerie',
      path: '/gallery',
      value: MenuItem.gallery,
    },
  ]

  const generateData = (limit: number) => {
    const dataArray: DotObject[] = []
    for (let i = 2022; i >= limit; i -= 1) {
      if (i === 2022) {
        dataArray.push({
          year: i,
          active: false,
          title: 'Kreisjugendheim Wolfshausen',
          url: 'https://www.bsj-wolfshausen.de/',
          caption: 'bsj-wolfshausen.de/',
          image: 'https://www.bsj-wolfshausen.de/images/anlage.jpg',
          description: 'Das ist ein schöner Text mit reichlich Inhalt und vielen tollen Informationen zu dem Event',
          participation: [
            {
              id: '1',
              firstname: 'Robert',
              lastname: 'Friessleben',
              active: true,
            },
            {
              id: '2',
              firstname: 'Andreas',
              lastname: 'Kuther',
              active: true,
            },
            {
              id: '3',
              firstname: 'Kristin',
              lastname: 'Dietze',
              active: true,
            },
            {
              id: '4',
              firstname: 'Andrea',
              lastname: 'Kuther',
              active: true,
            },
            {
              id: '5',
              firstname: 'Annika',
              lastname: 'Friessleben',
              active: true,
            },
          ],
        })
      }
      if (i === 2021) {
        dataArray.push({
          year: i,
          active: false,
          title: 'Dreiskau-Muckern',
          url: 'https://landschulheim-dreiskau-muckern.de/',
          caption: 'landschulheim-dreiskau-muckern.de',
          image: 'https://landschulheim-dreiskau-muckern.de/assets/images/trauf1-600x450.jpg',
          participation: [],
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
          participation: [],
        })
      }
      if (i !== 2020 && i !== 2021 && i !== 2022) {
        dataArray.push({
          year: i,
          active: false,
          title: `Location ${i}`,
          url: 'https://www.jugendherberge.de/?gclid=Cj0KCQiAr5iQBhCsARIsAPcwRONMSvMS8RMiHJSClBXMKhIEuGl7fl9f2nvqO7k12xF5utu5vi8DIe0aApTKEALw_wcB',
          caption: 'jugendherberge.de',
          image: 'https://media-cdn.holidaycheck.com/w_768,h_432,c_fill,q_auto,f_auto/ugc/images/910ec71b-e3ad-4933-a194-79955ab564b6',
          participation: [],
        })
      }
    }
    return dataArray
  }

  const data: DotObject[] = generateData(1954)
  const [filteredData, setFilteredData] = useState<DotObject[]>(generateData(1954))
  const [search, setSearch] = useState<string | undefined>('')

  const filterData = (searchInput: string) => {
    const newFilteredData: DotObject[] = []
    const regExp = new RegExp((searchInput || '').replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'), 'i')
    data && data.map((element: DotObject) => {
      if ((element.year.toString()).search(regExp) !== -1 || (element.caption && (element.caption).search(regExp) !== -1) || (element.title).search(regExp) !== -1) {
        newFilteredData.push(element)
      }
    })
    setFilteredData(newFilteredData)
  }

  useEffect(() => {
    search && filterData(search)
  }, [data, search])

  const LoginApp = () => (<LoginComponent />)
  const EventApp = () => (<EventComponent data={filteredData} />)
  const AdminApp = () => (<AdminComponent data={filteredData} />)
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
                <Route exact path='/' component={AdminApp} />
                <Route exact path='/gallery' component={GalleryApp} />
                <Route exact path='/events' component={EventApp} />
              </Switch>
            </div>
          </>}
      </ThemeProvider>
    </>
  )
}

export default App
