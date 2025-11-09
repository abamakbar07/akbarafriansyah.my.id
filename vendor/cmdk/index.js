import {
  Children,
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react'

const CommandContext = createContext(null)

function defaultFilter(search, value, keywords = []) {
  if (!search) return true
  const normalizedSearch = search.toLowerCase()
  const values = [value, ...(Array.isArray(keywords) ? keywords : [keywords])]
  return values
    .filter(Boolean)
    .map((entry) => String(entry).toLowerCase())
    .some((entry) => entry.includes(normalizedSearch))
}

function useMergedRefs(...refs) {
  return useCallback(
    (node) => {
      refs.forEach((ref) => {
        if (!ref) return
        if (typeof ref === 'function') {
          ref(node)
        } else {
          ref.current = node
        }
      })
    },
    [refs]
  )
}

const CommandRoot = forwardRef(function CommandRoot(
  {
    label,
    children,
    loop = true,
    filter = defaultFilter,
    role = 'region',
    onOpenChange,
    onValueChange,
    ...props
  },
  forwardedRef
) {
  const listId = useId()
  const containerRef = useRef(null)
  const mergedRef = useMergedRefs(containerRef, forwardedRef)
  const [query, setQuery] = useState('')
  const [activeValue, setActiveValue] = useState(null)
  const itemsRef = useRef([])
  const visibilityMapRef = useRef(new Map())
  const [renderVersion, setRenderVersion] = useState(0)

  const registerItem = useCallback((item) => {
    itemsRef.current = itemsRef.current.filter((entry) => entry.value !== item.value)
    itemsRef.current.push(item)
    visibilityMapRef.current.set(item.value, true)
    setActiveValue((current) => current ?? item.value)
    setRenderVersion((value) => value + 1)
  }, [])

  const unregisterItem = useCallback((value) => {
    itemsRef.current = itemsRef.current.filter((entry) => entry.value !== value)
    visibilityMapRef.current.delete(value)
    setRenderVersion((state) => state + 1)
  }, [])

  const setItemVisibility = useCallback((value, visible) => {
    const previous = visibilityMapRef.current.get(value)
    if (previous === visible) return
    visibilityMapRef.current.set(value, visible)
    setRenderVersion((state) => state + 1)
  }, [])

  const visibleItems = useMemo(() => {
    return itemsRef.current.filter((item) => visibilityMapRef.current.get(item.value) !== false)
  }, [renderVersion])

  useEffect(() => {
    if (visibleItems.length === 0) {
      setActiveValue(null)
      return
    }
    const hasActive = visibleItems.some((item) => item.value === activeValue)
    if (!hasActive) {
      setActiveValue(visibleItems[0]?.value ?? null)
    }
  }, [visibleItems, activeValue])

  const selectItem = useCallback(
    (value) => {
      const item = itemsRef.current.find((entry) => entry.value === value)
      if (!item) return
      item.onSelect?.(value)
      onValueChange?.(value)
      onOpenChange?.(false)
    },
    [onValueChange, onOpenChange]
  )

  const moveActive = useCallback(
    (direction) => {
      if (visibleItems.length === 0) return
      const currentIndex = visibleItems.findIndex((item) => item.value === activeValue)
      let nextIndex = currentIndex + direction

      if (nextIndex < 0) {
        nextIndex = loop ? visibleItems.length - 1 : 0
      } else if (nextIndex >= visibleItems.length) {
        nextIndex = loop ? 0 : visibleItems.length - 1
      }

      const nextItem = visibleItems[nextIndex]
      if (!nextItem) return
      setActiveValue(nextItem.value)
      nextItem.ref.current?.scrollIntoView({ block: 'nearest' })
    },
    [visibleItems, activeValue, loop]
  )

  const handleKeyDown = useCallback(
    (event) => {
      switch (event.key) {
        case 'ArrowDown': {
          event.preventDefault()
          moveActive(1)
          break
        }
        case 'ArrowUp': {
          event.preventDefault()
          moveActive(-1)
          break
        }
        case 'Enter': {
          if (activeValue) {
            event.preventDefault()
            selectItem(activeValue)
          }
          break
        }
        case 'Escape': {
          onOpenChange?.(false)
          break
        }
        default:
          break
      }
    },
    [moveActive, activeValue, selectItem, onOpenChange]
  )

  const contextValue = useMemo(
    () => ({
      label,
      query,
      setQuery,
      listId,
      filter,
      registerItem,
      unregisterItem,
      setItemVisibility,
      activeValue,
      setActiveValue,
      selectItem,
      visibleValues: visibleItems.map((item) => item.value),
    }),
    [label, query, listId, filter, registerItem, unregisterItem, setItemVisibility, activeValue, selectItem, visibleItems]
  )

  return (
    <CommandContext.Provider value={contextValue}>
      <div
        {...props}
        ref={mergedRef}
        role={role}
        aria-label={label}
        onKeyDown={handleKeyDown}
      >
        {children}
      </div>
    </CommandContext.Provider>
  )
})

const CommandInput = forwardRef(function CommandInput({ value, onValueChange, ...props }, forwardedRef) {
  const context = useContext(CommandContext)
  if (!context) {
    throw new Error('Command.Input must be used within a Command component')
  }

  const { query, setQuery, listId } = context

  const handleChange = useCallback(
    (event) => {
      const next = event.target.value
      setQuery(next)
      onValueChange?.(next)
    },
    [setQuery, onValueChange]
  )

  return (
    <input
      {...props}
      ref={forwardedRef}
      role="combobox"
      aria-controls={listId}
      aria-expanded="true"
      aria-autocomplete="list"
      value={value ?? query}
      onChange={handleChange}
    />
  )
})

function CommandList({ children, ...props }) {
  const context = useContext(CommandContext)
  if (!context) {
    throw new Error('Command.List must be used within a Command component')
  }
  const { listId } = context
  return (
    <div {...props} role="listbox" id={listId}>
      {children}
    </div>
  )
}

function CommandEmpty(props) {
  const context = useContext(CommandContext)
  if (!context) {
    throw new Error('Command.Empty must be used within a Command component')
  }

  if (context.visibleValues.length > 0) {
    return null
  }

  return <div {...props} />
}

function CommandGroup({ heading, headingClassName = '', className = '', children, ...props }) {
  return (
    <div role="group" aria-label={heading} className={className} {...props}>
      {heading ? (
        <div role="presentation" className={headingClassName}>
          {heading}
        </div>
      ) : null}
      {children}
    </div>
  )
}

const CommandItem = forwardRef(function CommandItem(
  { value, keywords, onSelect, children, ...props },
  forwardedRef
) {
  const context = useContext(CommandContext)
  if (!context) {
    throw new Error('Command.Item must be used within a Command component')
  }
  const {
    query,
    filter,
    registerItem,
    unregisterItem,
    setItemVisibility,
    activeValue,
    setActiveValue,
    selectItem,
  } = context

  const itemRef = useRef(null)
  const mergedRef = useMergedRefs(itemRef, forwardedRef)
  const isVisible = filter(query.trim(), value, keywords)
  const isActive = activeValue === value

  useEffect(() => {
    registerItem({ value, ref: itemRef, onSelect })
    return () => unregisterItem(value)
  }, [value, registerItem, unregisterItem, onSelect])

  useEffect(() => {
    setItemVisibility(value, isVisible)
  }, [value, isVisible, setItemVisibility])

  const handlePointerMove = useCallback(() => {
    setActiveValue(value)
  }, [setActiveValue, value])

  const handleClick = useCallback(
    (event) => {
      event.preventDefault()
      selectItem(value)
    },
    [selectItem, value]
  )

  return (
    <div
      {...props}
      ref={mergedRef}
      role="option"
      aria-selected={isActive}
      data-value={value}
      data-active={isActive ? '' : undefined}
      style={{ display: isVisible ? undefined : 'none' }}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setActiveValue(null)}
      onClick={handleClick}
    >
      {Children.map(children, (child) => child)}
    </div>
  )
})

function CommandSeparator(props) {
  return <div role="separator" {...props} />
}

const CommandDialog = forwardRef(function CommandDialog(
  { open = true, onOpenChange, label, children, ...props },
  forwardedRef
) {
  if (!open) return null
  return (
    <CommandRoot
      {...props}
      ref={forwardedRef}
      label={label}
      role="dialog"
      aria-modal="true"
      onOpenChange={onOpenChange}
    >
      {children}
    </CommandRoot>
  )
})

export const Command = Object.assign(CommandRoot, {
  Input: CommandInput,
  List: CommandList,
  Empty: CommandEmpty,
  Group: CommandGroup,
  Item: CommandItem,
  Separator: CommandSeparator,
  Dialog: CommandDialog,
})

export default Command
