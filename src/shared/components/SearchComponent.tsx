/**
 * SearchInput
 *
 */

import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Grid, InputAdornment, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

interface Props {
  disabled?: boolean
  changeSearch?: (searchInput: string) => void
}

const SearchComponent: React.FC<Props> = (props) => {
  const { t } = useTranslation()

  const [searchInput, setSearchInput] = useState<string>('')
  const disabled = props.disabled ? props.disabled : false

  useEffect(() => {
    props.changeSearch && props.changeSearch(searchInput)
  },
  [searchInput],
  )

  return (
    <Grid item xs={12}>
      <TextField
        disabled={disabled}
        id='search'
        autoFocus
        label={t('crude:search')}
        name='name'
        color='primary'
        sx={{
          pr: 2,
          width: '300px',
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(event => {
          setSearchInput(event.target.value)
        })}
        size='small'
        value={searchInput}
      />
    </Grid>
  )
}

export default SearchComponent
