import React, { useEffect, useState } from 'react'

import { Tabs, Tab } from '@mui/material'
import { AppSetting, MenuItem } from '~screens/App/App'

interface Props {
  items: AppSetting[]
  selectedTab?: AppSetting
  changeTab: (tab: MenuItem) => void
}

const Navbar: React.FC<Props> = (props: Props) => {
  const [tab, setTab] = useState<AppSetting>(props.selectedTab || props.items[0])

  useEffect(() => {
    setTab(props.selectedTab || props.items[0])
  }, [props.selectedTab],
  )

  return (
    <Tabs
      value={tab.value}
      onChange={(e, newValue) => {
        props.changeTab(newValue)
      }}
    >
      {props.items &&
        props.items.map((item, index) => <Tab key={index} value={item.value} label={item.title} />)}
    </Tabs>
  )
}

export default Navbar
