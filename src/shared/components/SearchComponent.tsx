/**
 * SearchInput
 *
 */

import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Grid, InputAdornment, TextField, Theme } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { makeStyles } from '@mui/styles'

interface Props {
  disabled?: boolean
  changeSearch?: (searchInput: string) => void
}

const useStyles = makeStyles((theme: Theme) => ({
  search: {
    margin: theme.spacing(4),
  },
}))

const SearchComponent: React.FC<Props> = (props) => {
  const { t } = useTranslation()
  const classes = useStyles()

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
        className={classes.search}
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
