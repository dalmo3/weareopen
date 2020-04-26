import _debounce from "lodash/debounce"
import { useCallback } from 'react'

export const debounce = useCallback(
  _debounce((fn, arg) => fn(arg), 500),
  []
)