import React, { useState } from 'react'

import { AppSetting, MenuItem } from '~screens/App/App'
import SearchComponent from '~shared/components/SearchComponent'
import Navbar from './Navbar'
import { useHistory } from 'react-router-dom'

interface Props {
  items: AppSetting[]
  user?: any
  changeSearch?: (value?: string) => void
}

const HeaderComponent: React.FC<Props> = (props) => {
  const history = useHistory()

  const [tab, setTab] = useState<AppSetting>(props.items[0])

  const changeTab = (value: MenuItem) => {
    const newTab = props.items.find(elem => elem.value === value) || props.items[0]
    setTab(newTab)
    history.replace(newTab.path)
  }

  return (
    <>
      {/* <div>
        <img src='images/header.jpg' />
      </div> */}
      <Navbar items={props.items} changeTab={changeTab} selectedTab={tab} />
      <SearchComponent changeSearch={(value?: string) => props.changeSearch && props.changeSearch(value)} />
    </>
  )
}

export default HeaderComponent
